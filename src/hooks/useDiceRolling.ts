import { useState, useCallback } from 'react';
import type { DiceRoll, DiceType, CharacteristicId, RollModifierState } from '@/components/ui/StatsDashboard/types';
import { CHARACTERISTICS } from '@/components/ui/StatsDashboard/types';

/**
 * Calculate power roll tier from total (Draw Steel SRD rules)
 * Tier 1: 2-11
 * Tier 2: 12-16
 * Tier 3: 17+
 */
function calculatePowerRollTier(total: number): { tier: number; label: string } {
  if (total >= 17) return { tier: 3, label: 'Tier 3' };
  if (total >= 12) return { tier: 2, label: 'Tier 2' };
  return { tier: 1, label: 'Tier 1' };
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
 */
export function useDiceRolling() {
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
      finalTier = Math.max(1, Math.min(3, finalTier + tierAdjustment));
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
      label: label || (isPowerRoll ? 'Power Roll' : undefined),
    };

    // Add to history (newest first, keep last 50)
    setRollHistory((prev) => [roll, ...prev].slice(0, 50));
  }, []);

  /**
   * Roll a characteristic check (2d10 + modifier) with edge/bane support
   */
  const handleRollCharacteristic = useCallback(
    (characteristicId: CharacteristicId, modifier: number, edgeBane?: RollModifierState) => {
      // Roll 2d10
      const results = [
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1,
      ];

      const total = results.reduce((a, b) => a + b, 0);

      // Apply edge/bane effects
      const effectiveEdgeBane = edgeBane || currentEdgeBane;
      const { rollBonus, tierAdjustment } = getEdgeBaneEffect(effectiveEdgeBane);
      const finalTotal = total + modifier + rollBonus;

      // Calculate tier based on final total
      const baseTierInfo = calculatePowerRollTier(finalTotal);
      let finalTier = baseTierInfo.tier;
      if (tierAdjustment !== 0) {
        finalTier = Math.max(1, Math.min(3, finalTier + tierAdjustment));
      }

      // Get characteristic display name
      const charInfo = CHARACTERISTICS.find((c) => c.id === characteristicId);
      const modifierName = charInfo?.name || characteristicId;

      const roll: DiceRoll = {
        id: crypto.randomUUID(),
        type: 'power',
        results,
        total,
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
    [currentEdgeBane]
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
