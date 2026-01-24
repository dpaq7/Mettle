import { useState, useMemo, useCallback } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { useRollHistory } from '@/context/RollHistoryContext';
import { useDerivedStats } from '@/hooks/useDerivedStats';
import { getResourceConfig } from '@/data/class-resources';
import { getClassAbilities, isAbilitySelected } from '@/data/class-abilities';
import { standardManeuvers, standardTriggeredActions, moveActions, mainActions } from '@/data/action-economy';
import { Ability } from '@/types/abilities';
import { Characteristic } from '@/types/common';
import { isFuryHero } from '@/types/hero';
import { PowerRollResult, performPowerRoll, RollModifier, getTierColor } from '@/utils/dice';
import { Dices, Lock, Zap } from 'lucide-react';
import './ActionsDetailPane.css';

// Parse kit power roll characteristic from string like "Might or Agility"
function parseKitPowerRoll(powerRollText: string): { characteristic: Characteristic; alternativeCharacteristics?: Characteristic[] } | null {
  const charMap: Record<string, Characteristic> = {
    'might': 'might',
    'agility': 'agility',
    'reason': 'reason',
    'intuition': 'intuition',
    'presence': 'presence',
  };

  const text = powerRollText.toLowerCase();
  const chars: Characteristic[] = [];

  for (const [name, char] of Object.entries(charMap)) {
    if (text.includes(name)) {
      chars.push(char);
    }
  }

  if (chars.length === 0) return null;

  return {
    characteristic: chars[0],
    alternativeCharacteristics: chars.length > 1 ? chars.slice(1) : undefined,
  };
}

// Get ability cost amount
function getAbilityCost(ability: Ability): number {
  if (ability.cost) return ability.cost.amount;
  if (ability.essenceCost) return ability.essenceCost;
  return 0;
}

// Format ability cost for display
function formatCost(ability: Ability, resourceName: string): string | undefined {
  if (ability.cost) {
    const costText = ability.cost.isVariable ? `${ability.cost.amount}+` : `${ability.cost.amount}`;
    return `${costText} ${ability.cost.resource}`;
  }
  if (ability.essenceCost) {
    return `${ability.essenceCost} ${resourceName}`;
  }
  return undefined;
}

// Apply kit damage bonus to tier effect text
function applyDamageBonusToTier(tierText: string, bonus: number): string {
  if (bonus === 0) return tierText;

  const charPattern = /^(\d+)(\s*\+\s*[A-Z](?:(?:,\s*[A-Z])*(?:\s*,?\s*or\s+[A-Z])?)?)/;
  const charMatch = tierText.match(charPattern);

  if (charMatch) {
    const baseValue = parseInt(charMatch[1], 10);
    const newValue = baseValue + bonus;
    return tierText.replace(charPattern, `${newValue}${charMatch[2]}`);
  }

  const flatPattern = /^(\d+)(\s+damage)/;
  const flatMatch = tierText.match(flatPattern);

  if (flatMatch) {
    const baseValue = parseInt(flatMatch[1], 10);
    const newValue = baseValue + bonus;
    return tierText.replace(flatPattern, `${newValue}${flatMatch[2]}`);
  }

  return tierText;
}

// Parse kit damage bonus string
function parseKitDamageBonus(bonus: string | null | undefined): { tier1: number; tier2: number; tier3: number } {
  if (!bonus) return { tier1: 0, tier2: 0, tier3: 0 };
  const match = bonus.match(/\+(\d+)\/\+(\d+)\/\+(\d+)/);
  if (!match) return { tier1: 0, tier2: 0, tier3: 0 };
  return {
    tier1: parseInt(match[1], 10),
    tier2: parseInt(match[2], 10),
    tier3: parseInt(match[3], 10),
  };
}

interface AbilityCardProps {
  ability: Ability;
  characteristics: Record<Characteristic, number>;
  currentResource: number;
  resourceName: string;
  kitMeleeDamageBonus?: string | null;
  kitRangedDamageBonus?: string | null;
  onRoll: (ability: Ability, result: PowerRollResult) => void;
  isKitAbility?: boolean;
  kitPowerRollString?: string;
  isSelected?: boolean;
}

function AbilityCard({
  ability,
  characteristics,
  currentResource,
  resourceName,
  kitMeleeDamageBonus,
  kitRangedDamageBonus,
  onRoll,
  isKitAbility,
  kitPowerRollString,
  isSelected = false,
}: AbilityCardProps) {
  const [rollResult, setRollResult] = useState<PowerRollResult | null>(null);
  const [rollModifier, setRollModifier] = useState<RollModifier>('normal');
  const [isRolling, setIsRolling] = useState(false);

  const cost = getAbilityCost(ability);
  const canAfford = currentResource >= cost;
  const costDisplay = formatCost(ability, resourceName);

  // Calculate adjusted tier effects with kit damage bonuses
  const adjustedTiers = useMemo(() => {
    if (!ability.powerRoll) return null;

    const lowerKeywords = ability.keywords.map(k => k.toLowerCase());
    const isMelee = lowerKeywords.includes('melee');
    const isRanged = lowerKeywords.includes('ranged');

    const meleeBonus = parseKitDamageBonus(kitMeleeDamageBonus);
    const rangedBonus = parseKitDamageBonus(kitRangedDamageBonus);

    let kitBonus = { tier1: 0, tier2: 0, tier3: 0 };

    if (isMelee && isRanged) {
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
    };
  }, [ability, kitMeleeDamageBonus, kitRangedDamageBonus]);

  const handleRoll = useCallback(() => {
    if (!ability.powerRoll || isRolling) return;

    setIsRolling(true);
    setTimeout(() => {
      const charValue = characteristics[ability.powerRoll!.characteristic];
      const result = performPowerRoll(charValue, rollModifier);
      setRollResult(result);
      setIsRolling(false);
      onRoll(ability, result);
    }, 300);
  }, [ability, characteristics, rollModifier, isRolling, onRoll]);

  const cycleModifier = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const modifiers: RollModifier[] = ['normal', 'edge', 'doubleEdge', 'bane', 'doubleBane'];
    const currentIndex = modifiers.indexOf(rollModifier);
    const nextIndex = (currentIndex + 1) % modifiers.length;
    setRollModifier(modifiers[nextIndex]);
  }, [rollModifier]);

  const getModifierLabel = () => {
    switch (rollModifier) {
      case 'edge': return 'Edge';
      case 'doubleEdge': return '2× Edge';
      case 'bane': return 'Bane';
      case 'doubleBane': return '2× Bane';
      default: return 'Normal';
    }
  };

  const getModifierClass = () => {
    if (rollModifier === 'edge' || rollModifier === 'doubleEdge') return 'edge';
    if (rollModifier === 'bane' || rollModifier === 'doubleBane') return 'bane';
    return '';
  };

  const formatCharacteristic = (char: string): string => {
    return char.charAt(0).toUpperCase() + char.slice(1);
  };

  const getTierResult = () => {
    if (!rollResult || !adjustedTiers) return null;
    switch (rollResult.tier) {
      case 1: return adjustedTiers.tier1;
      case 2: return adjustedTiers.tier2;
      case 3: return adjustedTiers.tier3;
    }
  };

  return (
    <div className={`ability-card ${!canAfford && cost > 0 ? 'insufficient-resource' : ''} ${isSelected ? 'selected' : ''}`}>
      {/* Header */}
      <div className="ability-card-header">
        <h3 className="ability-card-name">{ability.name}</h3>
        {isKitAbility && <span className="ability-card-kit-badge">Kit</span>}
        {costDisplay && (
          <span className={`ability-card-cost ${canAfford ? '' : 'cannot-afford'}`}>
            <Zap size={12} />
            {costDisplay}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="ability-card-meta">
        <span className="ability-card-distance">{ability.distance}</span>
        <span className="ability-card-target">{ability.target}</span>
      </div>

      {/* Keywords */}
      {ability.keywords.length > 0 && (
        <div className="ability-card-keywords">
          {ability.keywords.map((keyword, i) => (
            <span key={i} className="ability-card-keyword">{keyword}</span>
          ))}
        </div>
      )}

      {/* Trigger */}
      {ability.trigger && (
        <div className="ability-card-trigger">
          <strong>Trigger:</strong> {ability.trigger}
        </div>
      )}

      {/* Power Roll Section */}
      {ability.powerRoll && (
        <div className="ability-card-power-roll">
          <div className="power-roll-header">
            <span className="power-roll-char">
              {isKitAbility && kitPowerRollString
                ? kitPowerRollString
                : ability.powerRoll.alternativeCharacteristics
                  ? `${formatCharacteristic(ability.powerRoll.characteristic)} or ${ability.powerRoll.alternativeCharacteristics.map(formatCharacteristic).join(' or ')}`
                  : formatCharacteristic(ability.powerRoll.characteristic)}
            </span>
            <span className="power-roll-value">
              ({characteristics[ability.powerRoll.characteristic] >= 0 ? '+' : ''}{characteristics[ability.powerRoll.characteristic]})
            </span>
          </div>

          <div className="power-roll-tiers">
            <div className={`tier tier-1 ${rollResult?.tier === 1 ? 'active' : ''}`}>
              <span className="tier-label">≤11</span>
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

          <div className="power-roll-controls">
            <button
              className={`modifier-btn ${getModifierClass()}`}
              onClick={cycleModifier}
              title="Toggle Edge/Bane"
            >
              {getModifierLabel()}
            </button>
            <button
              className={`roll-btn ${isRolling ? 'rolling' : ''} ${!canAfford && cost > 0 ? 'disabled' : ''}`}
              onClick={handleRoll}
              disabled={isRolling || (!canAfford && cost > 0)}
              title={!canAfford && cost > 0 ? `Need ${cost} ${resourceName}` : 'Roll'}
            >
              {!canAfford && cost > 0 ? <Lock size={14} /> : <Dices size={14} />}
              <span>{isRolling ? '...' : 'Roll'}</span>
            </button>
          </div>

          {/* Roll Result */}
          {rollResult && (
            <div className="roll-result" style={{ borderColor: getTierColor(rollResult.tier) }}>
              <div className="result-score" style={{ color: getTierColor(rollResult.tier) }}>
                {rollResult.total}
              </div>
              <div className="result-details">
                <span className="result-tier" style={{ color: getTierColor(rollResult.tier) }}>
                  Tier {rollResult.tier}
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
              <div className="result-effect">{getTierResult()}</div>
            </div>
          )}
        </div>
      )}

      {/* Effect */}
      {ability.effect && (
        <div className="ability-card-effect">
          {ability.effect}
        </div>
      )}

      {/* Flavor Text */}
      {ability.flavorText && (
        <p className="ability-card-flavor">{ability.flavorText}</p>
      )}
    </div>
  );
}

// Reference Card for maneuvers/moves/triggered
interface ReferenceCardProps {
  name: string;
  distance?: string;
  target?: string;
  trigger?: string;
  effect: string;
}

function ReferenceCard({ name, distance, target, trigger, effect }: ReferenceCardProps) {
  return (
    <div className="reference-card">
      <h4 className="reference-card-name">{name}</h4>
      {distance && <p className="reference-card-distance">{distance}</p>}
      {target && <p className="reference-card-target">{target}</p>}
      {trigger && <p className="reference-card-trigger">Trigger: {trigger}</p>}
      <p className="reference-card-effect">{effect}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="detail-empty">
      <p>Select an ability tier from the list to view abilities</p>
    </div>
  );
}

export function ActionsDetailPane() {
  const { hero } = useHeroContext();
  const { selectedItemId } = useNavigation();
  const { addRoll } = useRollHistory();
  const { effectiveCharacteristics } = useDerivedStats();

  // All hooks must be called before any conditional returns
  const handleAbilityRoll = useCallback((ability: Ability, result: PowerRollResult) => {
    addRoll(result, ability.name, 'ability');
  }, [addRoll]);

  // Get class abilities - memoized to avoid recalculation
  const classAbilities = useMemo(() => {
    if (!hero) return null;
    const subclass = isFuryHero(hero) ? hero.furyState?.aspect : hero.subclass;
    return getClassAbilities(hero.heroClass, subclass);
  }, [hero]);

  if (!hero || !selectedItemId) {
    return <EmptyState />;
  }

  const resourceConfig = getResourceConfig(hero.heroClass);
  const currentResource = hero.heroicResource?.current ?? 0;
  const characteristics = effectiveCharacteristics as Record<Characteristic, number>;
  const heroAbilities = hero.abilities || [];

  // Handle reference sections
  if (selectedItemId === 'main') {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Main Actions</h1>
          <span className="detail-subtitle">Core combat actions</span>
        </header>
        <div className="reference-grid">
          {mainActions.map((action) => (
            <ReferenceCard
              key={action.id}
              name={action.name}
              distance={action.distance}
              target={action.target}
              effect={action.effect}
            />
          ))}
        </div>
      </div>
    );
  }

  if (selectedItemId === 'moves') {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Movement Actions</h1>
          <span className="detail-subtitle">Available every turn</span>
        </header>
        <div className="reference-grid">
          {moveActions.map((action) => (
            <ReferenceCard
              key={action.id}
              name={action.name}
              distance={action.distance}
              effect={action.effect}
            />
          ))}
        </div>
      </div>
    );
  }

  if (selectedItemId === 'maneuvers') {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Standard Maneuvers</h1>
          <span className="detail-subtitle">Use one per turn</span>
        </header>
        <div className="reference-grid">
          {standardManeuvers.map((action) => (
            <ReferenceCard
              key={action.id}
              name={action.name}
              target={action.target}
              effect={action.effect}
            />
          ))}
        </div>
      </div>
    );
  }

  if (selectedItemId === 'triggered') {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Triggered Actions</h1>
          <span className="detail-subtitle">One per round</span>
        </header>
        <div className="reference-grid">
          {standardTriggeredActions.map((action) => (
            <ReferenceCard
              key={action.id}
              name={action.name}
              trigger={action.trigger}
              effect={action.effect}
            />
          ))}
        </div>
      </div>
    );
  }

  // Handle kit ability
  if (selectedItemId === 'kit' && hero.kit?.signatureAbility) {
    const sig = hero.kit.signatureAbility;
    const powerRollInfo = parseKitPowerRoll(sig.powerRoll);

    const kitAbility: Ability = {
      id: `kit-sig-${hero.kit.id}`,
      name: sig.name,
      flavorText: sig.description,
      actionType: 'action',
      keywords: sig.keywords || [],
      distance: sig.distance,
      target: sig.target,
      powerRoll: powerRollInfo ? {
        characteristic: powerRollInfo.characteristic,
        alternativeCharacteristics: powerRollInfo.alternativeCharacteristics,
        tier1: sig.tier1,
        tier2: sig.tier2,
        tier3: sig.tier3,
      } : undefined,
      effect: sig.effect || '',
    };

    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Kit: {hero.kit.name}</h1>
          <div className="kit-bonuses">
            {hero.kit.meleeDamageBonus && (
              <span className="kit-bonus">Melee {hero.kit.meleeDamageBonus}</span>
            )}
            {hero.kit.rangedDamageBonus && (
              <span className="kit-bonus">Ranged {hero.kit.rangedDamageBonus}</span>
            )}
          </div>
        </header>
        <div className="abilities-grid">
          <AbilityCard
            ability={kitAbility}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            kitMeleeDamageBonus={hero.kit.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit.rangedDamageBonus}
            onRoll={handleAbilityRoll}
            isKitAbility
            kitPowerRollString={sig.powerRoll}
          />
        </div>
      </div>
    );
  }

  // Get abilities for selected tier
  // Note: classAbilities is guaranteed non-null here because we check !hero above
  const safeClassAbilities = classAbilities!;
  let abilities: Ability[] = [];
  let tierTitle = '';

  switch (selectedItemId) {
    case 'signature':
      abilities = safeClassAbilities.signature;
      tierTitle = 'Signature Abilities';
      break;
    case '3-cost':
      abilities = safeClassAbilities.threeCost;
      tierTitle = `3 ${resourceConfig.name} Abilities`;
      break;
    case '5-cost':
      abilities = safeClassAbilities.fiveCost;
      tierTitle = `5 ${resourceConfig.name} Abilities`;
      break;
    case '7-cost':
      abilities = safeClassAbilities.sevenCost;
      tierTitle = `7 ${resourceConfig.name} Abilities`;
      break;
    case '9-cost':
      abilities = safeClassAbilities.nineCost;
      tierTitle = `9 ${resourceConfig.name} Abilities`;
      break;
    case '11-cost':
      abilities = safeClassAbilities.elevenCost;
      tierTitle = `11 ${resourceConfig.name} Abilities`;
      break;
    default:
      // Fallback: try to parse cost from selectedItemId (e.g., "5-cost")
      const match = selectedItemId.match(/^(\d+)-cost$/);
      if (match) {
        const cost = parseInt(match[1], 10);
        abilities = heroAbilities.filter(a => getAbilityCost(a) === cost);
        tierTitle = `${cost} ${resourceConfig.name} Abilities`;
      }
  }

  if (abilities.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{tierTitle}</h1>
        <span className="detail-subtitle">{abilities.length} {abilities.length === 1 ? 'ability' : 'abilities'}</span>
      </header>
      <div className="abilities-grid">
        {abilities.map((ability) => (
          <AbilityCard
            key={ability.id}
            ability={ability}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
            onRoll={handleAbilityRoll}
            isSelected={isAbilitySelected(ability.id, heroAbilities)}
          />
        ))}
      </div>
    </div>
  );
}

export default ActionsDetailPane;
