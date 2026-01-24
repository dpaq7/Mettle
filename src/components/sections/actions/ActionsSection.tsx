import { useState, useMemo, useCallback } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useRollHistory } from '@/context/RollHistoryContext';
import { useDerivedStats } from '@/hooks/useDerivedStats';
import { getResourceConfig } from '@/data/class-resources';
import { getClassAbilities, isAbilitySelected } from '@/data/class-abilities';
import { GameData } from '@/lib/game-rules';
import { Ability, ActionType } from '@/types/abilities';
import { Characteristic } from '@/types/common';
import { isFuryHero } from '@/types/hero';
import { PowerRollResult, performPowerRoll, RollModifier, getTierColor } from '@/utils/dice';
import { standardManeuvers, standardTriggeredActions, moveActions, mainActions } from '@/data/action-economy';
import { Dices, ChevronDown, ChevronRight, Zap, Lock, Check } from 'lucide-react';
import './ActionsSection.css';

// Action type display names
const ACTION_TYPE_LABELS: Record<ActionType, string> = {
  action: 'Action',
  maneuver: 'Maneuver',
  freeManeuver: 'Free Maneuver',
  triggered: 'Triggered',
  freeTriggered: 'Free Triggered',
  move: 'Move',
  noAction: 'Passive',
};

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

// Get ability cost amount (handles both new and legacy formats)
function getAbilityCost(ability: Ability): number {
  if (ability.cost) {
    return ability.cost.amount;
  }
  if (ability.essenceCost) {
    return ability.essenceCost;
  }
  return 0;
}

// Format ability cost for display
function formatCost(ability: Ability, resourceName: string): string | undefined {
  if (ability.cost) {
    const costText = ability.cost.isVariable
      ? `${ability.cost.amount}+`
      : `${ability.cost.amount}`;
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

// Parse kit damage bonus string like "+2/+2/+2" into tier values
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
  heroLevel: number;
  kitMeleeDamageBonus?: string | null;
  kitRangedDamageBonus?: string | null;
  onRoll: (ability: Ability, result: PowerRollResult) => void;
  isKitAbility?: boolean;
  kitPowerRollString?: string;
  isSelected?: boolean;
}

function AbilityGridCard({
  ability,
  characteristics,
  currentResource,
  resourceName,
  heroLevel,
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
  const [isExpanded, setIsExpanded] = useState(false);

  const cost = getAbilityCost(ability);
  const canAfford = currentResource >= cost;
  const costDisplay = formatCost(ability, resourceName);
  const actionTypeLabel = ACTION_TYPE_LABELS[ability.actionType] || ability.actionType;

  // Level gating - check if character level is high enough to use this ability
  const minLevelRequired = cost > 0 ? GameData.getMinLevelForAbilityCost(cost) : 1;
  const isLevelLocked = heroLevel < minLevelRequired;
  const canUse = canAfford && !isLevelLocked;

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
    const charMap: Record<string, string> = {
      might: 'Might',
      agility: 'Agility',
      reason: 'Reason',
      intuition: 'Intuition',
      presence: 'Presence',
    };
    return charMap[char] || char;
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
    <div className={`ability-grid-card ${isExpanded ? 'expanded' : ''} ${!canAfford && cost > 0 ? 'insufficient-resource' : ''} ${isLevelLocked ? 'level-locked' : ''} ${isSelected ? 'selected' : ''}`}>
      {/* Level locked indicator */}
      {isLevelLocked && (
        <div className="ability-level-locked-badge">
          <Lock size={10} />
          <span>Level {minLevelRequired}</span>
        </div>
      )}

      {/* Selected indicator */}
      {isSelected && !isLevelLocked && (
        <div className="ability-selected-badge">
          <Check size={12} />
        </div>
      )}

      {/* Header */}
      <div className="ability-grid-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="ability-grid-title-row">
          <span className="ability-grid-action-type">{actionTypeLabel}</span>
          <h3 className="ability-grid-name">{ability.name}</h3>
          {isKitAbility && <span className="ability-grid-kit-badge">Kit</span>}
        </div>
        <div className="ability-grid-meta-row">
          {costDisplay && (
            <span className={`ability-grid-cost ${canAfford ? '' : 'cannot-afford'}`}>
              <Zap size={12} />
              {costDisplay}
            </span>
          )}
          <span className="ability-grid-distance">{ability.distance}</span>
          <span className="ability-grid-target">{ability.target}</span>
        </div>
        {ability.keywords.length > 0 && (
          <div className="ability-grid-keywords">
            {ability.keywords.map((keyword, i) => (
              <span key={i} className="ability-grid-keyword">{keyword}</span>
            ))}
          </div>
        )}
      </div>

      {/* Power Roll Section */}
      {ability.powerRoll && (
        <div className="ability-grid-power-roll">
          <div className="power-roll-char-row">
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

          <div className="power-roll-tiers-compact">
            <div className={`tier-compact tier-1 ${rollResult?.tier === 1 ? 'active' : ''}`}>
              <span className="tier-label">≤11</span>
              <span className="tier-effect">{adjustedTiers?.tier1 ?? ability.powerRoll.tier1}</span>
            </div>
            <div className={`tier-compact tier-2 ${rollResult?.tier === 2 ? 'active' : ''}`}>
              <span className="tier-label">12-16</span>
              <span className="tier-effect">{adjustedTiers?.tier2 ?? ability.powerRoll.tier2}</span>
            </div>
            <div className={`tier-compact tier-3 ${rollResult?.tier === 3 ? 'active' : ''}`}>
              <span className="tier-label">17+</span>
              <span className="tier-effect">{adjustedTiers?.tier3 ?? ability.powerRoll.tier3}</span>
            </div>
          </div>

          <div className="power-roll-controls">
            <button
              className={`modifier-btn-compact ${getModifierClass()}`}
              onClick={cycleModifier}
              title="Toggle Edge/Bane"
              disabled={isLevelLocked}
            >
              {getModifierLabel()}
            </button>
            <button
              className={`roll-btn-compact ${isRolling ? 'rolling' : ''} ${!canUse && cost > 0 ? 'disabled' : ''}`}
              onClick={handleRoll}
              disabled={isRolling || (!canUse && cost > 0)}
              title={
                isLevelLocked
                  ? `Requires Level ${minLevelRequired}`
                  : !canAfford && cost > 0
                    ? `Need ${cost} ${resourceName}`
                    : 'Roll'
              }
            >
              {!canUse && cost > 0 ? (
                <Lock size={14} />
              ) : (
                <Dices size={14} />
              )}
              <span>{isRolling ? '...' : 'Roll'}</span>
            </button>
          </div>

          {/* Roll Result */}
          {rollResult && (
            <div
              className="roll-result-compact"
              style={{ borderColor: getTierColor(rollResult.tier) }}
            >
              <div className="result-score" style={{ color: getTierColor(rollResult.tier) }}>
                {rollResult.total}
              </div>
              <div className="result-details">
                <span className="result-tier" style={{ color: getTierColor(rollResult.tier) }}>
                  Tier {rollResult.tier}
                  {rollResult.tierAdjustment !== 0 && (
                    <span className={rollResult.tierAdjustment > 0 ? 'tier-bonus' : 'tier-penalty'}>
                      {' '}({rollResult.tierAdjustment > 0 ? '↑' : '↓'})
                    </span>
                  )}
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

      {/* Effect text for non-power-roll abilities */}
      {!ability.powerRoll && ability.effect && (
        <div className="ability-grid-effect-only">
          <p>{ability.effect}</p>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="ability-grid-expanded">
          {ability.trigger && (
            <div className="ability-trigger-section">
              <strong>Trigger:</strong> {ability.trigger}
            </div>
          )}
          {ability.effect && ability.powerRoll && (
            <div className="ability-effect-section">
              <strong>Effect:</strong> {ability.effect}
            </div>
          )}
          {ability.flavorText && (
            <p className="ability-flavor-text">{ability.flavorText}</p>
          )}
        </div>
      )}

      {/* Expand Toggle */}
      <button
        className="ability-expand-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse' : 'Expand'}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
}

// Tier Section Component
interface TierSectionProps {
  title: string;
  abilities: Ability[];
  heroAbilities: Ability[];
  characteristics: Record<Characteristic, number>;
  currentResource: number;
  resourceName: string;
  heroLevel: number;
  kitMeleeDamageBonus?: string | null;
  kitRangedDamageBonus?: string | null;
  onRoll: (ability: Ability, result: PowerRollResult) => void;
}

function TierSection({
  title,
  abilities,
  heroAbilities,
  characteristics,
  currentResource,
  resourceName,
  heroLevel,
  kitMeleeDamageBonus,
  kitRangedDamageBonus,
  onRoll,
}: TierSectionProps) {
  if (abilities.length === 0) return null;

  return (
    <section className="actions-tier-section">
      <h2 className="tier-section-title">{title}</h2>
      <div className="abilities-grid">
        {abilities.map((ability) => (
          <AbilityGridCard
            key={ability.id}
            ability={ability}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceName}
            heroLevel={heroLevel}
            kitMeleeDamageBonus={kitMeleeDamageBonus}
            kitRangedDamageBonus={kitRangedDamageBonus}
            onRoll={onRoll}
            isSelected={isAbilitySelected(ability.id, heroAbilities)}
          />
        ))}
      </div>
    </section>
  );
}

// Reference Section Accordion
interface ReferenceSectionProps {
  title: string;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function ReferenceSection({ title, count, isOpen, onToggle, children }: ReferenceSectionProps) {
  return (
    <div className="reference-accordion">
      <button className={`reference-header ${isOpen ? 'open' : ''}`} onClick={onToggle}>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>{title}</span>
        <span className="reference-count">{count}</span>
      </button>
      {isOpen && <div className="reference-content">{children}</div>}
    </div>
  );
}

export function ActionsSection() {
  const { hero } = useHeroContext();
  const { addRoll } = useRollHistory();
  const { effectiveCharacteristics } = useDerivedStats();
  const [openReference, setOpenReference] = useState<string | null>(null);

  if (!hero) {
    return (
      <div className="actions-section-empty">
        <p>No character loaded</p>
      </div>
    );
  }

  const resourceConfig = getResourceConfig(hero.heroClass);
  const currentResource = hero.heroicResource?.current ?? 0;
  const characteristics = effectiveCharacteristics as Record<Characteristic, number>;
  const heroAbilities = hero.abilities || [];

  // Get subclass for aspect-specific abilities
  const subclass = isFuryHero(hero) ? hero.furyState?.aspect : hero.subclass;

  // Get all class abilities from data
  const classAbilities = useMemo(() => {
    return getClassAbilities(hero.heroClass, subclass);
  }, [hero.heroClass, subclass]);

  const handleAbilityRoll = useCallback((ability: Ability, result: PowerRollResult) => {
    addRoll(result, ability.name, 'ability');
  }, [addRoll]);

  // Convert kit signature ability to Ability format
  const kitSignatureAbility: Ability | null = useMemo(() => {
    const sig = hero.kit?.signatureAbility;
    if (!sig) return null;

    const powerRollInfo = parseKitPowerRoll(sig.powerRoll);

    return {
      id: `kit-sig-${hero.kit.id}`,
      name: sig.name,
      flavorText: sig.description,
      actionType: 'action' as const,
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
  }, [hero.kit]);

  const toggleReference = (section: string) => {
    setOpenReference(prev => prev === section ? null : section);
  };

  // Check if we have any class abilities data
  const hasClassAbilities =
    classAbilities.signature.length > 0 ||
    classAbilities.threeCost.length > 0 ||
    classAbilities.fiveCost.length > 0 ||
    classAbilities.sevenCost.length > 0;

  return (
    <div className="actions-section">
      {/* Resource Status */}
      <div className="actions-resource-bar">
        <span className="resource-label">{resourceConfig.name}</span>
        <span className="resource-value">{currentResource}</span>
      </div>

      {/* Kit Signature Ability */}
      {kitSignatureAbility && (
        <section className="actions-tier-section">
          <h2 className="tier-section-title">
            <span>Kit: {hero.kit.name}</span>
            {hero.kit.meleeDamageBonus && (
              <span className="kit-bonus">Melee {hero.kit.meleeDamageBonus}</span>
            )}
            {hero.kit.rangedDamageBonus && (
              <span className="kit-bonus">Ranged {hero.kit.rangedDamageBonus}</span>
            )}
          </h2>
          <div className="abilities-grid">
            <AbilityGridCard
              ability={kitSignatureAbility}
              characteristics={characteristics}
              currentResource={currentResource}
              resourceName={resourceConfig.name}
              heroLevel={hero.level}
              kitMeleeDamageBonus={hero.kit.meleeDamageBonus}
              kitRangedDamageBonus={hero.kit.rangedDamageBonus}
              onRoll={handleAbilityRoll}
              isKitAbility
              kitPowerRollString={hero.kit.signatureAbility?.powerRoll}
            />
          </div>
        </section>
      )}

      {/* Class Abilities from Data */}
      {hasClassAbilities ? (
        <>
          <TierSection
            title="Signature Abilities"
            abilities={classAbilities.signature}
            heroAbilities={heroAbilities}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            heroLevel={hero.level}
            kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
            onRoll={handleAbilityRoll}
          />

          <TierSection
            title={`3 ${resourceConfig.name} Abilities`}
            abilities={classAbilities.threeCost}
            heroAbilities={heroAbilities}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            heroLevel={hero.level}
            kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
            onRoll={handleAbilityRoll}
          />

          <TierSection
            title={`5 ${resourceConfig.name} Abilities`}
            abilities={classAbilities.fiveCost}
            heroAbilities={heroAbilities}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            heroLevel={hero.level}
            kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
            onRoll={handleAbilityRoll}
          />

          <TierSection
            title={`7 ${resourceConfig.name} Abilities`}
            abilities={classAbilities.sevenCost}
            heroAbilities={heroAbilities}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            heroLevel={hero.level}
            kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
            onRoll={handleAbilityRoll}
          />

          <TierSection
            title={`9 ${resourceConfig.name} Abilities`}
            abilities={classAbilities.nineCost}
            heroAbilities={heroAbilities}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            heroLevel={hero.level}
            kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
            onRoll={handleAbilityRoll}
          />

          <TierSection
            title={`11 ${resourceConfig.name} Abilities`}
            abilities={classAbilities.elevenCost}
            heroAbilities={heroAbilities}
            characteristics={characteristics}
            currentResource={currentResource}
            resourceName={resourceConfig.name}
            heroLevel={hero.level}
            kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
            kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
            onRoll={handleAbilityRoll}
          />
        </>
      ) : (
        /* Fall back to hero.abilities if no class data available */
        heroAbilities.length > 0 && (
          <section className="actions-tier-section">
            <h2 className="tier-section-title">Class Abilities</h2>
            <div className="abilities-grid">
              {heroAbilities.map((ability) => (
                <AbilityGridCard
                  key={ability.id}
                  ability={ability}
                  characteristics={characteristics}
                  currentResource={currentResource}
                  resourceName={resourceConfig.name}
                  heroLevel={hero.level}
                  kitMeleeDamageBonus={hero.kit?.meleeDamageBonus}
                  kitRangedDamageBonus={hero.kit?.rangedDamageBonus}
                  onRoll={handleAbilityRoll}
                  isSelected
                />
              ))}
            </div>
          </section>
        )
      )}

      {/* Reference Sections */}
      <section className="actions-reference-section">
        <h2 className="reference-section-title">Action Reference</h2>

        <ReferenceSection
          title="Main Actions"
          count={mainActions.length}
          isOpen={openReference === 'main'}
          onToggle={() => toggleReference('main')}
        >
          <div className="reference-cards-grid">
            {mainActions.map((action) => (
              <div key={action.id} className="reference-card">
                <h4>{action.name}</h4>
                <p className="reference-target">{action.target}</p>
                <p className="reference-effect">{action.effect}</p>
              </div>
            ))}
          </div>
        </ReferenceSection>

        <ReferenceSection
          title="Movement Actions"
          count={moveActions.length}
          isOpen={openReference === 'moves'}
          onToggle={() => toggleReference('moves')}
        >
          <div className="reference-cards-grid">
            {moveActions.map((action) => (
              <div key={action.id} className="reference-card">
                <h4>{action.name}</h4>
                <p className="reference-distance">{action.distance}</p>
                <p className="reference-effect">{action.effect}</p>
              </div>
            ))}
          </div>
        </ReferenceSection>

        <ReferenceSection
          title="Standard Maneuvers"
          count={standardManeuvers.length}
          isOpen={openReference === 'maneuvers'}
          onToggle={() => toggleReference('maneuvers')}
        >
          <div className="reference-cards-grid">
            {standardManeuvers.map((action) => (
              <div key={action.id} className="reference-card">
                <h4>{action.name}</h4>
                <p className="reference-target">{action.target}</p>
                <p className="reference-effect">{action.effect}</p>
              </div>
            ))}
          </div>
        </ReferenceSection>

        <ReferenceSection
          title="Triggered Actions"
          count={standardTriggeredActions.length}
          isOpen={openReference === 'triggered'}
          onToggle={() => toggleReference('triggered')}
        >
          <div className="reference-cards-grid">
            {standardTriggeredActions.map((action) => (
              <div key={action.id} className="reference-card">
                <h4>{action.name}</h4>
                {action.trigger && <p className="reference-trigger">Trigger: {action.trigger}</p>}
                <p className="reference-effect">{action.effect}</p>
              </div>
            ))}
          </div>
        </ReferenceSection>
      </section>
    </div>
  );
}

export default ActionsSection;
