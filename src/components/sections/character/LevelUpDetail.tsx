import { useState, useMemo } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { getProgressionForLevel, getCircleUpgrades } from '@/data/progression';
import { summonerAbilitiesByLevel } from '@/data/abilities/summoner-abilities';
import {
  getFuryProgressionWithAspect,
  calculateFuryStamina,
} from '@/data/fury/progression';
import { furyAbilities } from '@/data/fury/abilities';
import { classPerkAtLevel } from '@/data/perks';
import { GameData } from '@/lib/game-rules';
import { canLevelUp, getLevelProgress, getXpToNextLevel, MAX_LEVEL } from '@/utils/levelProgression';
import { ProgressionChoices, WardType } from '@/types/progression';
import { SelectedPerk } from '@/types/perk';
import { Characteristic } from '@/types/common';
import { isSummonerHero, isFuryHero, SummonerHeroV2, FuryHero } from '@/types/hero';
import { Ability } from '@/types';
import { Sparkles, Check, Award, Star, ChevronUp, Trophy } from 'lucide-react';
import PerkSelector from '@/components/creation/PerkSelector';
import './LevelUpDetail.css';

// Get echelon info
function getEchelon(level: number): { number: number; name: string } {
  if (level <= 3) return { number: 1, name: '1st Echelon' };
  if (level <= 6) return { number: 2, name: '2nd Echelon' };
  if (level <= 9) return { number: 3, name: '3rd Echelon' };
  return { number: 4, name: '4th Echelon' };
}

export function LevelUpDetail() {
  const { hero, updateHero } = useHeroContext();
  const { setSelectedItem } = useNavigation();
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState<'overview' | 'perk'>('overview');
  const [selectedPerk, setSelectedPerk] = useState<SelectedPerk | null>(null);

  if (!hero) {
    return (
      <div className="detail-empty">
        <p>No character loaded</p>
      </div>
    );
  }

  const level = hero.level;
  const xp = hero.xp || 0;
  const isLevelUpReady = canLevelUp(level, xp);
  const progress = getLevelProgress(level, xp);
  const xpToNext = getXpToNextLevel(level, xp);
  const echelon = getEchelon(level);
  const victories = hero.victories || 0;
  const isMaxLevel = level >= MAX_LEVEL;

  // If not ready for level up, show XP progress view
  if (!isLevelUpReady) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Level & Experience</h1>
          <span className="detail-subtitle">{echelon.name}</span>
        </header>

        {/* Current Level Display */}
        <section className="detail-section">
          <div className="level-display">
            <span className="level-number">Level {level}</span>
            <span className="level-echelon-badge">{echelon.name}</span>
          </div>
        </section>

        {/* XP Progress */}
        {!isMaxLevel && (
          <section className="detail-section">
            <h2 className="detail-section-title">Experience Progress</h2>
            <div className="xp-progress-section">
              <div className="xp-progress-bar-large">
                <div
                  className="xp-progress-fill-large"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="xp-progress-info">
                <span className="xp-value-large">{xp} XP</span>
                <span className="xp-to-next-large">{xpToNext} XP to Level {level + 1}</span>
              </div>
            </div>
          </section>
        )}

        {/* Max Level Display */}
        {isMaxLevel && (
          <section className="detail-section">
            <div className="max-level-badge">
              <Star size={20} />
              <span>Maximum Level Reached</span>
            </div>
            <p className="detail-text" style={{ marginTop: 'var(--space-3)', textAlign: 'center' }}>
              You have reached the pinnacle of heroic power at Level 10.
            </p>
          </section>
        )}

        {/* Current Victories */}
        <section className="detail-section">
          <h2 className="detail-section-title">Current Victories</h2>
          <div className="victories-display">
            <Trophy size={20} className="victories-icon" />
            <span className="victories-count">{victories}</span>
            <span className="victories-label">victories</span>
          </div>
          {victories > 0 && (
            <p className="detail-text victories-hint">
              Convert victories to XP during a Respite
            </p>
          )}
        </section>

        {/* Echelon Info */}
        <section className="detail-section">
          <h2 className="detail-section-title">Echelon Progression</h2>
          <div className="echelon-info">
            <div className={`echelon-tier ${echelon.number >= 1 ? 'active' : ''}`}>
              <span className="echelon-range">Lv 1-3</span>
              <span className="echelon-name">1st Echelon</span>
            </div>
            <div className={`echelon-tier ${echelon.number >= 2 ? 'active' : ''}`}>
              <span className="echelon-range">Lv 4-6</span>
              <span className="echelon-name">2nd Echelon</span>
            </div>
            <div className={`echelon-tier ${echelon.number >= 3 ? 'active' : ''}`}>
              <span className="echelon-range">Lv 7-9</span>
              <span className="echelon-name">3rd Echelon</span>
            </div>
            <div className={`echelon-tier ${echelon.number >= 4 ? 'active' : ''}`}>
              <span className="echelon-range">Lv 10</span>
              <span className="echelon-name">4th Echelon</span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Level Up Ready - Show full level up interface
  const isSummoner = isSummonerHero(hero);
  const isFury = isFuryHero(hero);
  const summonerHero = isSummoner ? (hero as SummonerHeroV2) : null;
  const furyHero = isFury ? (hero as FuryHero) : null;

  const nextLevel = hero.level + 1;

  // Check if this level grants a perk
  const grantsPerks = classPerkAtLevel(hero.heroClass, nextLevel);
  const existingPerkIds = (hero.selectedPerks || []).map(p => p.perkId);

  // Handler for perk selection
  const handlePerkSelected = (perk: SelectedPerk) => {
    setSelectedPerk(perk);
    setCurrentStep('overview');
  };

  // Calculate stamina changes - CLASS-SPECIFIC using GameData
  const classDef = GameData.getClass(hero.heroClass);
  const currentStamina = hero.stamina.max;
  const nextEchelon = Math.ceil(nextLevel / 3);
  const kitStamina = (hero.kit?.staminaPerEchelon || 0) * nextEchelon;

  let newMaxStamina: number;
  if (isFury) {
    newMaxStamina = calculateFuryStamina(nextLevel, kitStamina);
  } else {
    const classStartingStamina = classDef?.baseStats.stamina.level1 ?? 18;
    const staminaPerLevel = classDef?.baseStats.stamina.perLevel ?? 6;
    const levelBonus = (nextLevel - 1) * staminaPerLevel;
    newMaxStamina = classStartingStamina + levelBonus + kitStamina;
  }

  // Get new abilities for this level
  let newAbilities: Ability[] = [];
  if (isSummoner) {
    newAbilities = summonerAbilitiesByLevel[nextLevel] || [];
  } else if (isFury) {
    const abilityLevelMap: Record<number, { cost: number }[]> = {
      1: [{ cost: 0 }, { cost: 3 }, { cost: 5 }],
      3: [{ cost: 7 }],
      5: [{ cost: 9 }],
      8: [{ cost: 11 }],
    };
    if (abilityLevelMap[nextLevel]) {
      abilityLevelMap[nextLevel].forEach(({ cost }) => {
        const abilities = furyAbilities.filter(a => (a.essenceCost || 0) === cost);
        newAbilities.push(...abilities);
      });
    }
  }

  // Get progression based on hero class
  const progression = useMemo(() => {
    if (isFury && furyHero?.subclass) {
      return getFuryProgressionWithAspect(nextLevel, furyHero.subclass);
    }
    return getProgressionForLevel(nextLevel);
  }, [nextLevel, isFury, furyHero?.subclass]);

  // Filter class-specific upgrades
  const filteredFeatures = useMemo(() => {
    if (!progression) return [];
    if (isFury) return progression.features;

    return progression.features.map(feature => {
      if (feature.category === 'circle-upgrade' && summonerHero?.subclass) {
        const circleChoices = getCircleUpgrades(summonerHero.subclass);
        return {
          ...feature,
          choices: circleChoices.map(u => ({
            id: u.id,
            name: u.name,
            description: u.description,
          })),
        };
      }
      return feature;
    });
  }, [progression, summonerHero?.subclass, isFury]);

  const automaticFeatures = filteredFeatures.filter(f => f.type === 'automatic');
  const choiceFeatures = filteredFeatures.filter(f => f.type === 'choice');

  const handleChoiceChange = (featureId: string, choiceId: string) => {
    setChoices(prev => ({ ...prev, [featureId]: choiceId }));
  };

  const hasAllRequiredChoices = () => {
    const hasClassChoices = choiceFeatures.every(feature => choices[feature.id] !== undefined);
    const hasPerkChoice = !grantsPerks || selectedPerk !== null;
    return hasClassChoices && hasPerkChoice;
  };

  const handleLevelUp = () => {
    if (!hasAllRequiredChoices()) return;

    const newProgressionChoices: ProgressionChoices = { ...hero.progressionChoices };

    filteredFeatures.forEach(feature => {
      if (feature.type === 'choice' && choices[feature.id]) {
        const choiceId = choices[feature.id];
        switch (feature.category) {
          case 'ward': newProgressionChoices.ward = choiceId as WardType; break;
          case 'second-ward': newProgressionChoices.secondWard = choiceId as WardType; break;
          case '7-essence': newProgressionChoices.sevenEssenceAbility = choiceId; break;
          case '9-essence': newProgressionChoices.nineEssenceAbility = choiceId; break;
          case '11-essence': newProgressionChoices.elevenEssenceAbility = choiceId; break;
          case 'circle-upgrade': newProgressionChoices.circleUpgrade = choiceId; break;
          case 'stat-boost': newProgressionChoices.statBoost = choiceId as Characteristic; break;
          case '7-ferocity': newProgressionChoices.sevenFerocityAbility = choiceId; break;
          case '9-ferocity': newProgressionChoices.nineFerocityAbility = choiceId; break;
          case '11-ferocity': newProgressionChoices.elevenFerocityAbility = choiceId; break;
          case 'aspect-5-ferocity': newProgressionChoices.aspectFiveFerocity = choiceId; break;
          case 'aspect-9-ferocity': newProgressionChoices.aspectNineFerocity = choiceId; break;
          case 'aspect-11-ferocity': newProgressionChoices.aspectElevenFerocity = choiceId; break;
        }
      }
    });

    const updates: Partial<typeof hero> = {
      level: nextLevel,
      progressionChoices: newProgressionChoices,
    };

    if (selectedPerk) {
      updates.selectedPerks = [...(hero.selectedPerks || []), selectedPerk];
    }

    if (progression?.statChanges) {
      const sc = progression.statChanges;

      if (isFury) {
        if (sc.might !== undefined && sc.agility !== undefined) {
          updates.characteristics = {
            ...hero.characteristics,
            might: sc.might,
            agility: sc.agility,
          };
        }
        if (sc.allStats !== undefined) {
          const baseChars = updates.characteristics || hero.characteristics;
          updates.characteristics = {
            ...baseChars,
            might: Math.min(4, baseChars.might + sc.allStats),
            agility: Math.min(4, baseChars.agility + sc.allStats),
            reason: Math.min(4, baseChars.reason + sc.allStats),
            intuition: Math.min(4, baseChars.intuition + sc.allStats),
            presence: Math.min(4, baseChars.presence + sc.allStats),
          };
        }
      } else {
        if (sc.reason !== undefined) {
          updates.characteristics = { ...hero.characteristics, reason: sc.reason };
        }
        if (sc.allStats !== undefined) {
          updates.characteristics = {
            ...hero.characteristics,
            ...(updates.characteristics || {}),
            might: Math.min(4, hero.characteristics.might + sc.allStats),
            agility: Math.min(4, hero.characteristics.agility + sc.allStats),
            reason: Math.min(4, (updates.characteristics?.reason || hero.characteristics.reason) + sc.allStats),
            intuition: Math.min(4, hero.characteristics.intuition + sc.allStats),
            presence: Math.min(4, hero.characteristics.presence + sc.allStats),
          };
        }
        if (newProgressionChoices.statBoost && nextLevel === 4) {
          const stat = newProgressionChoices.statBoost;
          updates.characteristics = {
            ...(updates.characteristics || hero.characteristics),
            [stat]: Math.min(4, (updates.characteristics?.[stat] || hero.characteristics[stat]) + 1),
          };
        }
      }
    }

    updates.stamina = {
      current: newMaxStamina,
      max: newMaxStamina,
      winded: Math.floor(newMaxStamina / 2),
    };

    updateHero(updates);
    // Navigate away after level up
    setSelectedItem('class');
  };

  // Get characteristic preview
  const getCharPreview = () => {
    if (!progression?.statChanges) return null;
    const sc = progression.statChanges;
    const changes: string[] = [];

    if (isFury) {
      if (sc.might !== undefined && sc.might !== hero.characteristics.might) {
        changes.push(`Might: ${hero.characteristics.might} → ${sc.might}`);
      }
      if (sc.agility !== undefined && sc.agility !== hero.characteristics.agility) {
        changes.push(`Agility: ${hero.characteristics.agility} → ${sc.agility}`);
      }
    }

    if (sc.reason !== undefined && sc.reason !== hero.characteristics.reason) {
      changes.push(`Reason: ${hero.characteristics.reason} → ${sc.reason}`);
    }

    if (sc.allStats !== undefined) {
      changes.push(`All Stats: +${sc.allStats}`);
    }

    return changes.length > 0 ? changes : null;
  };

  const charPreview = getCharPreview();

  // Perk selection step
  if (currentStep === 'perk') {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Select a Perk</h1>
          <span className="detail-subtitle">Level {nextLevel}</span>
        </header>
        <PerkSelector
          heroClass={hero.heroClass}
          level={nextLevel}
          existingPerkIds={existingPerkIds}
          onSelect={handlePerkSelected}
          onBack={() => setCurrentStep('overview')}
        />
      </div>
    );
  }

  // Main level up view
  return (
    <div className="detail-content">
      <header className="detail-header">
        <div className="level-up-header">
          <Sparkles className="level-up-icon" size={24} />
          <h1 className="detail-title">Level Up!</h1>
        </div>
        <div className="level-transition">
          <span className="level-badge-old">Lv {hero.level}</span>
          <span className="level-arrow">→</span>
          <span className="level-badge-new">Lv {nextLevel}</span>
        </div>
      </header>

      {/* Stats Changes */}
      <section className="detail-section">
        <h2 className="detail-section-title">Stat Changes</h2>
        <div className="stat-changes-grid">
          <div className="stat-change-item">
            <span className="stat-change-label">Stamina</span>
            <div className="stat-change-values">
              <span className="stat-old">{currentStamina}</span>
              <span className="stat-arrow">→</span>
              <span className="stat-new">{newMaxStamina}</span>
              <span className="stat-delta">(+{newMaxStamina - currentStamina})</span>
            </div>
          </div>
          {charPreview?.map((change, i) => (
            <div key={i} className="stat-change-item characteristic">
              <span className="stat-change-text">{change}</span>
            </div>
          ))}
          {progression?.statChanges?.minionCap && (
            <div className="stat-change-item">
              <span className="stat-change-label">Minion Cap</span>
              <span className="stat-new">+{progression.statChanges.minionCap}</span>
            </div>
          )}
        </div>
      </section>

      {/* New Abilities */}
      {newAbilities.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">New Abilities</h2>
          <div className="new-abilities-list">
            {newAbilities.map((ability: Ability) => (
              <div key={ability.id} className="ability-card">
                <div className="ability-card-header">
                  <span className="ability-card-name">{ability.name}</span>
                  <span className="ability-card-type">{ability.actionType}</span>
                </div>
                {ability.keywords && ability.keywords.length > 0 && (
                  <div className="ability-card-keywords">
                    {ability.keywords.join(' • ')}
                  </div>
                )}
                <div className="ability-card-meta">
                  {ability.essenceCost && (
                    <span className="ability-card-cost">{ability.essenceCost} Essence</span>
                  )}
                  <span>{ability.distance}</span>
                  <span>{ability.target}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Automatic Features */}
      {automaticFeatures.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Automatic Upgrades</h2>
          <div className="automatic-features-list">
            {automaticFeatures.map((feature) => (
              <div key={feature.id} className="automatic-feature-item">
                <span className="feature-icon">✦</span>
                <div className="feature-content">
                  <strong>{feature.name}</strong>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Perk Selection */}
      {grantsPerks && (
        <section className="detail-section">
          <h2 className="detail-section-title">
            <Award size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Select a Perk
          </h2>
          {selectedPerk ? (
            <div className="perk-selected-display">
              <div className="perk-selected-info">
                <span className="perk-selected-label">Selected:</span>
                <strong>{selectedPerk.perkId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</strong>
              </div>
              <button
                type="button"
                className="perk-change-button"
                onClick={() => setCurrentStep('perk')}
              >
                Change
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="perk-select-button"
              onClick={() => setCurrentStep('perk')}
            >
              <Award size={16} />
              Choose Your Perk
            </button>
          )}
        </section>
      )}

      {/* Choice Features */}
      {choiceFeatures.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Make Your Choices</h2>
          {choiceFeatures.map((feature) => (
            <div key={feature.id} className="choice-feature-group">
              <h3 className="choice-feature-title">{feature.name}</h3>
              <p className="choice-feature-description">{feature.description}</p>
              <div className="choice-options">
                {feature.choices?.map((choice) => (
                  <label
                    key={choice.id}
                    className={`choice-option-item ${choices[feature.id] === choice.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={feature.id}
                      value={choice.id}
                      checked={choices[feature.id] === choice.id}
                      onChange={() => handleChoiceChange(feature.id, choice.id)}
                    />
                    <div className="choice-option-content">
                      <strong>{choice.name}</strong>
                      <span>{choice.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Confirm Button */}
      <section className="detail-section level-up-actions">
        <button
          className={`level-up-confirm-button ${!hasAllRequiredChoices() ? 'disabled' : ''}`}
          onClick={handleLevelUp}
          disabled={!hasAllRequiredChoices()}
        >
          <Check size={18} />
          <span>Confirm Level Up</span>
        </button>
        {!hasAllRequiredChoices() && (
          <p className="level-up-requirements-hint">
            Complete all required selections above to level up
          </p>
        )}
      </section>
    </div>
  );
}

export default LevelUpDetail;
