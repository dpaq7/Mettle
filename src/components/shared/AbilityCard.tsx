import React, { useState, useMemo } from 'react';
import { Ability, Characteristic, DamageBonus } from '../../types';
import { PowerRollResult, getTierColor, performPowerRoll, RollModifier } from '../../utils/dice';
import './AbilityCard.css';

interface AbilityCardProps {
  ability: Ability;
  characteristics: Record<Characteristic, number>;
  onRoll?: (ability: Ability, result: PowerRollResult) => void;
  expanded?: boolean;
  // Kit damage bonuses - format: "+2/+2/+2" for tier1/tier2/tier3
  kitMeleeDamageBonus?: DamageBonus | null;
  kitRangedDamageBonus?: DamageBonus | null;
}

/**
 * Parse a kit damage bonus string like "+2/+2/+2" into tier values
 */
function parseKitDamageBonus(bonus: DamageBonus | null | undefined): { tier1: number; tier2: number; tier3: number } {
  if (!bonus) return { tier1: 0, tier2: 0, tier3: 0 };
  const match = bonus.match(/\+(\d+)\/\+(\d+)\/\+(\d+)/);
  if (!match) return { tier1: 0, tier2: 0, tier3: 0 };
  return {
    tier1: parseInt(match[1], 10),
    tier2: parseInt(match[2], 10),
    tier3: parseInt(match[3], 10),
  };
}

/**
 * Apply kit damage bonus to tier effect text
 * Handles patterns like:
 * - "5 + M damage" → "7 + M damage"
 * - "8 + M, R, I, or P lightning damage" → "10 + M, R, I, or P lightning damage"
 * - "4 damage" → "6 damage"
 * - "3 + M or A damage; you can shift 1 square" → "5 + M or A damage; you can shift 1 square"
 */
function applyDamageBonusToTier(tierText: string, bonus: number): string {
  if (bonus === 0) return tierText;

  // Pattern 1: Number + characteristic(s) like "5 + M" or "8 + M, R, I, or P"
  // Matches: "5 + M", "8 + M or A", "5 + M, R, I, or P"
  const charPattern = /^(\d+)(\s*\+\s*[A-Z](?:(?:,\s*[A-Z])*(?:\s*,?\s*or\s+[A-Z])?)?)/;
  const charMatch = tierText.match(charPattern);

  if (charMatch) {
    const baseValue = parseInt(charMatch[1], 10);
    const newValue = baseValue + bonus;
    return tierText.replace(charPattern, `${newValue}${charMatch[2]}`);
  }

  // Pattern 2: Flat damage like "4 damage" (no characteristic)
  const flatPattern = /^(\d+)(\s+damage)/;
  const flatMatch = tierText.match(flatPattern);

  if (flatMatch) {
    const baseValue = parseInt(flatMatch[1], 10);
    const newValue = baseValue + bonus;
    return tierText.replace(flatPattern, `${newValue}${flatMatch[2]}`);
  }

  return tierText;
}

const AbilityCard: React.FC<AbilityCardProps> = ({
  ability,
  characteristics,
  onRoll,
  expanded: initialExpanded = false,
  kitMeleeDamageBonus,
  kitRangedDamageBonus,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [rollResult, setRollResult] = useState<PowerRollResult | null>(null);
  const [rollModifier, setRollModifier] = useState<RollModifier>('normal');
  const [isRolling, setIsRolling] = useState(false);

  // Calculate adjusted tier effects with kit damage bonuses
  const adjustedTiers = useMemo(() => {
    if (!ability.powerRoll) return null;

    const lowerKeywords = ability.keywords.map(k => k.toLowerCase());
    const isMelee = lowerKeywords.includes('melee');
    const isRanged = lowerKeywords.includes('ranged');

    // Parse both melee and ranged bonuses
    const meleeBonus = parseKitDamageBonus(kitMeleeDamageBonus);
    const rangedBonus = parseKitDamageBonus(kitRangedDamageBonus);

    // Determine which bonus to apply:
    // - If ability is both melee and ranged, use the higher bonus for each tier
    // - If ability is only melee, use melee bonus
    // - If ability is only ranged, use ranged bonus
    let kitBonus = { tier1: 0, tier2: 0, tier3: 0 };

    if (isMelee && isRanged) {
      // Use the higher of melee/ranged for each tier
      kitBonus = {
        tier1: Math.max(meleeBonus.tier1, rangedBonus.tier1),
        tier2: Math.max(meleeBonus.tier2, rangedBonus.tier2),
        tier3: Math.max(meleeBonus.tier3, rangedBonus.tier3),
      };
    } else if (isMelee) {
      kitBonus = meleeBonus;
    } else if (isRanged) {
      kitBonus = rangedBonus;
    }

    return {
      tier1: applyDamageBonusToTier(ability.powerRoll.tier1, kitBonus.tier1),
      tier2: applyDamageBonusToTier(ability.powerRoll.tier2, kitBonus.tier2),
      tier3: applyDamageBonusToTier(ability.powerRoll.tier3, kitBonus.tier3),
      hasBonus: kitBonus.tier1 > 0 || kitBonus.tier2 > 0 || kitBonus.tier3 > 0,
    };
  }, [ability, kitMeleeDamageBonus, kitRangedDamageBonus]);

  const getActionTypeIcon = (actionType: string) => {
    switch (actionType) {
      case 'action':
        return 'A';
      case 'maneuver':
        return 'M';
      case 'freeManeuver':
        return 'F';
      case 'triggered':
        return 'T';
      case 'freeTriggered':
        return 'FT';
      default:
        return '?';
    }
  };

  const getActionTypeLabel = (actionType: string) => {
    switch (actionType) {
      case 'action':
        return 'Action';
      case 'maneuver':
        return 'Maneuver';
      case 'freeManeuver':
        return 'Free Maneuver';
      case 'triggered':
        return 'Triggered';
      case 'freeTriggered':
        return 'Free Triggered';
      default:
        return actionType;
    }
  };

  const handleRoll = () => {
    if (!ability.powerRoll) return;

    setIsRolling(true);
    setTimeout(() => {
      const charValue = characteristics[ability.powerRoll!.characteristic];
      const result = performPowerRoll(charValue, rollModifier);
      setRollResult(result);
      setIsRolling(false);
      onRoll?.(ability, result);
    }, 300);
  };

  const cycleModifier = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Cycle: Normal → Edge → 2× Edge → Bane → 2× Bane → Normal
    const modifiers: RollModifier[] = ['normal', 'edge', 'doubleEdge', 'bane', 'doubleBane'];
    const currentIndex = modifiers.indexOf(rollModifier);
    const nextIndex = (currentIndex + 1) % modifiers.length;
    setRollModifier(modifiers[nextIndex]);
  };

  const getModifierClass = () => {
    if (rollModifier === 'edge' || rollModifier === 'doubleEdge') return 'edge';
    if (rollModifier === 'bane' || rollModifier === 'doubleBane') return 'bane';
    return '';
  };

  const getModifierLabel = () => {
    switch (rollModifier) {
      case 'edge': return 'Edge';
      case 'doubleEdge': return '2× Edge';
      case 'bane': return 'Bane';
      case 'doubleBane': return '2× Bane';
      default: return 'Normal';
    }
  };

  const getTierResult = () => {
    if (!rollResult || !adjustedTiers) return null;
    switch (rollResult.tier) {
      case 1:
        return adjustedTiers.tier1;
      case 2:
        return adjustedTiers.tier2;
      case 3:
        return adjustedTiers.tier3;
    }
  };

  return (
    <div className={`ability-card ${expanded ? 'expanded' : ''}`}>
      <div className="ability-header" onClick={() => setExpanded(!expanded)}>
        <div className="ability-action-type" title={getActionTypeLabel(ability.actionType)}>
          {getActionTypeIcon(ability.actionType)}
        </div>
        <div className="ability-title">
          <h4>{ability.name}</h4>
          {ability.essenceCost && (
            <span className="essence-cost">{ability.essenceCost} Essence</span>
          )}
        </div>
        <div className="ability-expand-icon">{expanded ? '−' : '+'}</div>
      </div>

      {expanded && (
        <div className="ability-body">
          {ability.flavorText && (
            <p className="ability-flavor">{ability.flavorText}</p>
          )}

          <div className="ability-meta">
            {ability.keywords.length > 0 && (
              <div className="ability-keywords">
                {ability.keywords.map((keyword) => (
                  <span key={keyword} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            <div className="ability-targeting">
              <span className="target-distance">{ability.distance}</span>
              <span className="target-info">{ability.target}</span>
            </div>
          </div>

          {ability.trigger && (
            <div className="ability-trigger">
              <strong>Trigger:</strong> {ability.trigger}
            </div>
          )}

          {ability.powerRoll && (
            <div className="ability-power-roll">
              <div className="power-roll-header">
                <span className="roll-characteristic">
                  Power Roll + {ability.powerRoll.characteristic.charAt(0).toUpperCase() + ability.powerRoll.characteristic.slice(1)} ({characteristics[ability.powerRoll.characteristic] >= 0 ? '+' : ''}{characteristics[ability.powerRoll.characteristic]})
                </span>
                <div className="roll-controls">
                  <button
                    className={`modifier-btn ${getModifierClass()}`}
                    onClick={cycleModifier}
                    title="Toggle Edge/Bane"
                  >
                    {getModifierLabel()}
                  </button>
                  <button
                    className={`roll-btn ${isRolling ? 'rolling' : ''}`}
                    onClick={handleRoll}
                    disabled={isRolling}
                  >
                    {isRolling ? '...' : 'Roll'}
                  </button>
                </div>
              </div>

              <div className="power-roll-tiers">
                <div className={`tier tier-1 ${rollResult?.tier === 1 ? 'active' : ''}`}>
                  <span className="tier-label">11 or lower</span>
                  <span className="tier-effect">{adjustedTiers?.tier1 ?? ability.powerRoll.tier1}</span>
                </div>
                <div className={`tier tier-2 ${rollResult?.tier === 2 ? 'active' : ''}`}>
                  <span className="tier-label">12-16</span>
                  <span className="tier-effect">{adjustedTiers?.tier2 ?? ability.powerRoll.tier2}</span>
                </div>
                <div className={`tier tier-3 ${rollResult?.tier === 3 ? 'active' : ''}`}>
                  <span className="tier-label">17+</span>
                  <span className="tier-effect">{adjustedTiers?.tier3 ?? ability.powerRoll.tier3}</span>
                </div>
              </div>

              {rollResult && (
                <div
                  className="roll-result"
                  style={{ borderColor: getTierColor(rollResult.tier) }}
                >
                  <div className="result-main">
                    <span
                      className="result-total"
                      style={{ color: getTierColor(rollResult.tier) }}
                    >
                      {rollResult.total}
                    </span>
                    <span className="result-breakdown">
                      ({rollResult.naturalRoll}
                      {rollResult.edgeBaneBonus !== 0 && (
                        <span className={rollResult.edgeBaneBonus > 0 ? 'edge-bonus' : 'bane-penalty'}>
                          {rollResult.edgeBaneBonus > 0 ? '+' : ''}{rollResult.edgeBaneBonus}
                        </span>
                      )}
                      {rollResult.modifier !== 0 && (
                        <> {rollResult.modifier >= 0 ? '+' : ''}{rollResult.modifier}</>
                      )}
                      )
                    </span>
                  </div>
                  <div className="result-tier-label" style={{ color: getTierColor(rollResult.tier) }}>
                    Tier {rollResult.tier}
                    {rollResult.tierAdjustment !== 0 && (
                      <span className={rollResult.tierAdjustment > 0 ? 'tier-bonus' : 'tier-penalty'}>
                        {' '}({rollResult.tierAdjustment > 0 ? '↑' : '↓'} from {rollResult.baseTier})
                      </span>
                    )}
                  </div>
                  <div className="result-effect">{getTierResult()}</div>
                </div>
              )}
            </div>
          )}

          {ability.effect && (
            <div className="ability-effect">
              <strong>Effect:</strong> {ability.effect}
            </div>
          )}

          {ability.spendEssence && (
            <div className="ability-spend-essence">
              <strong>Spend Essence:</strong> {ability.spendEssence}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AbilityCard;
