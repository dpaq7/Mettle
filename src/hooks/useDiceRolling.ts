import { useState, useCallback } from 'react';
import type { DiceRoll, DiceType, CharacteristicId, RollModifierState } from '@/components/ui/StatsDashboard/types';
import { CHARACTERISTICS } from '@/components/ui/StatsDashboard/types';
import { useRollHistory } from '@/context/RollHistoryContext';
import type { PowerRollResult, EdgeBaneState } from '@/utils/dice';
import { rollModifierToEdgeBane, resolveEdgeBane } from '@/utils/dice';
import { GameData } from '@/lib/game-rules';

/**
 * Calculate power roll tier from total (Draw Steel SRD rules)
 * @see GameData.getTierForRoll for the authoritative implementation
 */
function calculatePowerRollTier(total: number): { tier: 1 | 2 | 3; label: string } {
  const tier = GameData.getTierForRoll(total);
  return { tier, label: `Tier ${tier}` };
}

/**
 * Get edge/bane bonus and tier adjustment
 * - Edge: +2 to roll
 * - Bane: -2 to roll
 * - Double Edge: Tier +1 (no roll bonus)
 * - Double Bane: Tier -1 (no roll penalty)
 */
function getEdgeBaneEffect(state: RollModifierState): { rollBonus: number; tierAdjustment: number } {
  switch (state) {
    case 'edge': return { rollBonus: 2, tierAdjustment: 0 };
    case 'bane': return { rollBonus: -2, tierAdjustment: 0 };
    case 'doubleEdge': return { rollBonus: 0, tierAdjustment: 1 };
    case 'doubleBane': return { rollBonus: 0, tierAdjustment: -1 };
    default: return { rollBonus: 0, tierAdjustment: 0 };
  }
}

/**
 * Custom hook for dice rolling and roll history management
 * Integrates with RollHistoryContext to persist rolls across the app
 */
export function useDiceRolling() {
  const { addRoll } = useRollHistory();
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const [currentEdgeBane, setCurrentEdgeBane] = useState<RollModifierState>('normal');

  /**
   * Cycle through edge/bane states
   */
  const cycleEdgeBane = useCallback(() => {
    setCurrentEdgeBane((prev) => {
      const states: RollModifierState[] = ['normal', 'edge', 'bane', 'doubleEdge', 'doubleBane'];
      const currentIndex = states.indexOf(prev);
      return states[(currentIndex + 1) % states.length];
    });
  }, []);

  /**
   * Roll dice of a specific type with optional edge/bane
   */
  const handleRoll = useCallback((type: DiceType, label?: string, edgeBane?: RollModifierState) => {
    let results: number[];

    switch (type) {
      case '2d10':
      case 'power':
        results = [
          Math.floor(Math.random() * 10) + 1,
          Math.floor(Math.random() * 10) + 1,
        ];
        break;
      case 'd10':
        results = [Math.floor(Math.random() * 10) + 1];
        break;
      case 'd6':
        results = [Math.floor(Math.random() * 6) + 1];
        break;
      case 'd3':
        results = [Math.floor(Math.random() * 3) + 1];
        break;
      default:
        results = [0];
    }

    const total = results.reduce((a, b) => a + b, 0);
    const isPowerRoll = type === '2d10' || type === 'power';

    // Apply edge/bane effects for power rolls
    const effectiveEdgeBane = edgeBane || 'normal';
    const { rollBonus, tierAdjustment } = isPowerRoll ? getEdgeBaneEffect(effectiveEdgeBane) : { rollBonus: 0, tierAdjustment: 0 };
    const adjustedTotal = total + rollBonus;

    // Calculate tiers
    const baseTierInfo = isPowerRoll ? calculatePowerRollTier(adjustedTotal) : undefined;
    let finalTier = baseTierInfo?.tier;
    if (finalTier !== undefined && tierAdjustment !== 0) {
      finalTier = Math.max(1, Math.min(3, finalTier + tierAdjustment)) as 1 | 2 | 3;
    }

    const rollLabel = label || (isPowerRoll ? 'Power Roll' : type.toUpperCase());

    // Add power rolls to global history context
    if (isPowerRoll && results.length === 2) {
      const edgeBaneState = rollModifierToEdgeBane(effectiveEdgeBane);
      const resolvedEdgeBane = resolveEdgeBane(edgeBaneState);

      const powerRollResult: PowerRollResult = {
        naturalRoll: total,
        dice: [results[0], results[1]],
        modifier: 0,
        edgeBaneBonus: rollBonus,
        total: adjustedTotal,
        baseTier: baseTierInfo!.tier,
        tier: finalTier as 1 | 2 | 3,
        tierAdjustment,
        edgeBaneState,
        resolvedEdgeBane,
        timestamp: Date.now(),
        hadEdge: resolvedEdgeBane.type === 'edge' || resolvedEdgeBane.type === 'doubleEdge',
        hadBane: resolvedEdgeBane.type === 'bane' || resolvedEdgeBane.type === 'doubleBane',
      };
      addRoll(powerRollResult, rollLabel, 'other');
    } else {
      // For non-power rolls (d6, d3, d10 saves), create a simple entry
      // We'll use modifier 0 and just show the result
      const simpleResult: PowerRollResult = {
        naturalRoll: total,
        dice: results.length === 2 ? [results[0], results[1]] : [results[0], 0],
        modifier: 0,
        edgeBaneBonus: 0,
        total,
        baseTier: 1,
        tier: 1,
        tierAdjustment: 0,
        edgeBaneState: { edges: 0, banes: 0 },
        resolvedEdgeBane: { type: 'normal' },
        timestamp: Date.now(),
        hadEdge: false,
        hadBane: false,
      };
      addRoll(simpleResult, rollLabel, 'other');
    }

    const roll: DiceRoll = {
      id: crypto.randomUUID(),
      type,
      results,
      total,
      finalTotal: adjustedTotal,
      tier: finalTier,
      baseTier: baseTierInfo?.tier,
      tierAdjustment: tierAdjustment !== 0 ? tierAdjustment : undefined,
      tierLabel: finalTier ? `Tier ${finalTier}` : undefined,
      edgeBane: effectiveEdgeBane !== 'normal' ? effectiveEdgeBane : undefined,
      timestamp: Date.now(),
      label: rollLabel,
    };

    // Add to history (newest first, keep last 50)
    setRollHistory((prev) => [roll, ...prev].slice(0, 50));
  }, [addRoll]);

  /**
   * Roll a characteristic check (2d10 + modifier) with edge/bane support
   */
  const handleRollCharacteristic = useCallback(
    (characteristicId: CharacteristicId, modifier: number, edgeBane?: RollModifierState) => {
      // Roll 2d10
      const die1 = Math.floor(Math.random() * 10) + 1;
      const die2 = Math.floor(Math.random() * 10) + 1;
      const results = [die1, die2];
      const naturalRoll = die1 + die2;

      // Apply edge/bane effects
      const effectiveEdgeBane = edgeBane || currentEdgeBane;
      const { rollBonus, tierAdjustment } = getEdgeBaneEffect(effectiveEdgeBane);
      const finalTotal = naturalRoll + modifier + rollBonus;

      // Calculate tier based on final total
      const baseTierInfo = calculatePowerRollTier(finalTotal);
      let finalTier = baseTierInfo.tier;
      if (tierAdjustment !== 0) {
        finalTier = Math.max(1, Math.min(3, finalTier + tierAdjustment)) as 1 | 2 | 3;
      }

      // Get characteristic display name
      const charInfo = CHARACTERISTICS.find((c) => c.id === characteristicId);
      const modifierName = charInfo?.name || characteristicId;

      // Convert to EdgeBaneState for PowerRollResult
      const edgeBaneState = rollModifierToEdgeBane(effectiveEdgeBane);
      const resolvedEdgeBane = resolveEdgeBane(edgeBaneState);

      // Create PowerRollResult for context
      const powerRollResult: PowerRollResult = {
        naturalRoll,
        dice: [die1, die2],
        modifier,
        edgeBaneBonus: rollBonus,
        total: finalTotal,
        baseTier: baseTierInfo.tier,
        tier: finalTier,
        tierAdjustment,
        edgeBaneState,
        resolvedEdgeBane,
        timestamp: Date.now(),
        hadEdge: resolvedEdgeBane.type === 'edge' || resolvedEdgeBane.type === 'doubleEdge',
        hadBane: resolvedEdgeBane.type === 'bane' || resolvedEdgeBane.type === 'doubleBane',
      };

      // Add to global roll history context
      addRoll(powerRollResult, `${modifierName} Check`, 'hero');

      // Also update local history for popover display
      const roll: DiceRoll = {
        id: crypto.randomUUID(),
        type: 'power',
        results,
        total: naturalRoll,
        modifier: modifier + rollBonus, // Include edge/bane bonus in modifier display
        modifierName,
        finalTotal,
        tier: finalTier,
        baseTier: baseTierInfo.tier,
        tierAdjustment: tierAdjustment !== 0 ? tierAdjustment : undefined,
        tierLabel: `Tier ${finalTier}`,
        edgeBane: effectiveEdgeBane !== 'normal' ? effectiveEdgeBane : undefined,
        timestamp: Date.now(),
        label: 'Power Roll',
      };

      setRollHistory((prev) => [roll, ...prev].slice(0, 50));
    },
    [currentEdgeBane, addRoll]
  );

  /**
   * Clear all roll history
   */
  const handleClearRollHistory = useCallback(() => {
    setRollHistory([]);
  }, []);

  return {
    rollHistory,
    currentEdgeBane,
    handleRoll,
    handleRollCharacteristic,
    handleClearRollHistory,
    cycleEdgeBane,
  };
}

export default useDiceRolling;
