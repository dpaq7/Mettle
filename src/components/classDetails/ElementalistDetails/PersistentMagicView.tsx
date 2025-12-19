import React, { useCallback, useState } from 'react';
import { useSummonerContext } from '../../../context/HeroContext';
import { useCombatContext } from '../../../context/CombatContext';
import {
  isElementalistHero,
  ElementalistHero,
  ElementalistElement,
  PersistentAbility,
} from '../../../types/hero';
import { ELEMENTALIST_ELEMENTS } from '../../../data/elementalist/elements';
import {
  ELEMENTALIST_LEVEL_FEATURES,
  getEssenceGain,
  getEssenceSurgeGain,
  isMantleActive,
} from '../../../data/elementalist/features';
import './PersistentMagicView.css';

/**
 * PersistentMagicView - Main view for Elementalist class's Persistent Magic tab
 * Displays Essence tracking, Persistent abilities, Mantle status, and level features
 */
export const PersistentMagicView: React.FC = () => {
  const { hero, updateHero } = useSummonerContext();
  const { isInCombat } = useCombatContext();

  // Local state for ability input
  const [abilityInput, setAbilityInput] = useState('');
  const [essenceCostInput, setEssenceCostInput] = useState('1');
  const [essenceSurgeGained, setEssenceSurgeGained] = useState(false);

  // Type guard - only render for Elementalist heroes
  if (!hero || !isElementalistHero(hero)) {
    return (
      <div className="persistent-view persistent-view--empty">
        <p>This view is only available for Elementalist heroes.</p>
      </div>
    );
  }

  const elementalistHero = hero as ElementalistHero;
  const {
    heroicResource,
    subclass: element,
    mantleActive = false,
    persistentAbilities = [],
    level,
    characteristics,
  } = elementalistHero;

  const currentEssence = heroicResource?.current ?? 0;
  const lockedEssence = heroicResource?.persistent ?? 0;
  const availableEssence = currentEssence - lockedEssence;
  const baseEssenceGain = getEssenceGain(level);
  const effectiveEssenceGain = Math.max(0, baseEssenceGain - lockedEssence);
  const essenceSurgeGain = getEssenceSurgeGain(level);
  const reasonScore = characteristics?.reason ?? 2;

  // Check if mantle should be active (3+ essence)
  const shouldMantleBeActive = level >= 4 && isMantleActive(availableEssence);

  // Get element-specific data if element is selected
  const elementData = element ? ELEMENTALIST_ELEMENTS[element] : null;

  // Essence adjustment
  const handleEssenceChange = useCallback(
    (delta: number) => {
      const newValue = Math.max(lockedEssence, currentEssence + delta);
      updateHero({
        heroicResource: {
          ...heroicResource,
          current: newValue,
        },
      } as Partial<ElementalistHero>);
    },
    [heroicResource, currentEssence, lockedEssence, updateHero]
  );

  // Apply start of turn essence gain
  const handleStartOfTurn = useCallback(() => {
    handleEssenceChange(effectiveEssenceGain);
    setEssenceSurgeGained(false);
    // Auto-update mantle status
    const newEssence = currentEssence + effectiveEssenceGain;
    const newAvailable = newEssence - lockedEssence;
    const newMantleStatus = level >= 4 && isMantleActive(newAvailable);
    if (mantleActive !== newMantleStatus) {
      updateHero({
        mantleActive: newMantleStatus,
      } as Partial<ElementalistHero>);
    }
  }, [
    effectiveEssenceGain,
    handleEssenceChange,
    currentEssence,
    lockedEssence,
    level,
    mantleActive,
    updateHero,
  ]);

  // Apply essence surge trigger (1/round)
  const handleEssenceSurgeTrigger = useCallback(() => {
    if (!essenceSurgeGained) {
      handleEssenceChange(essenceSurgeGain);
      setEssenceSurgeGained(true);
    }
  }, [essenceSurgeGained, essenceSurgeGain, handleEssenceChange]);

  // Add persistent ability
  const handleAddPersistent = useCallback(() => {
    if (!abilityInput.trim()) return;
    const cost = parseInt(essenceCostInput) || 1;

    const newAbility: PersistentAbility = {
      abilityId: `ability-${Date.now()}`,
      abilityName: abilityInput.trim(),
      essenceLocked: cost,
      activeSince: Date.now(),
    };

    const newPersistentAbilities = [...persistentAbilities, newAbility];
    const newLockedEssence = newPersistentAbilities.reduce(
      (sum, a) => sum + a.essenceLocked,
      0
    );

    updateHero({
      persistentAbilities: newPersistentAbilities,
      heroicResource: {
        ...heroicResource,
        persistent: newLockedEssence,
      },
    } as Partial<ElementalistHero>);

    setAbilityInput('');
    setEssenceCostInput('1');
  }, [abilityInput, essenceCostInput, persistentAbilities, heroicResource, updateHero]);

  // Remove persistent ability
  const handleRemovePersistent = useCallback(
    (abilityId: string) => {
      const newPersistentAbilities = persistentAbilities.filter(
        (a) => a.abilityId !== abilityId
      );
      const newLockedEssence = newPersistentAbilities.reduce(
        (sum, a) => sum + a.essenceLocked,
        0
      );

      updateHero({
        persistentAbilities: newPersistentAbilities,
        heroicResource: {
          ...heroicResource,
          persistent: newLockedEssence,
        },
      } as Partial<ElementalistHero>);
    },
    [persistentAbilities, heroicResource, updateHero]
  );

  // Handle Enter key on ability input
  const handleAbilityKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPersistent();
    }
  };

  return (
    <div className="persistent-view" style={{ '--element-color': elementData?.color } as React.CSSProperties}>
      <header className="persistent-view__header">
        <h1 className="persistent-view__title">Persistent Magic</h1>
        <p className="persistent-view__subtitle">
          Maintain powerful elemental effects by locking your Essence
        </p>
      </header>

      <div className="persistent-view__content">
        {/* Element Display */}
        <section className="persistent-view__section persistent-view__section--identity">
          <div className="persistent-view__identity-card">
            <h3 className="persistent-view__identity-label">Element</h3>
            {elementData ? (
              <>
                <span className="persistent-view__identity-name" style={{ color: elementData.color }}>
                  {elementData.name}
                </span>
                <p className="persistent-view__identity-theme">{elementData.theme}</p>
                <p className="persistent-view__identity-desc">{elementData.description}</p>
                <div className="persistent-view__element-info">
                  <span className="persistent-view__element-damage">
                    Damage Type: <strong>{elementData.damageType}</strong>
                  </span>
                </div>
              </>
            ) : (
              <span className="persistent-view__identity-name persistent-view__identity-name--none">
                Not Selected
              </span>
            )}
          </div>
        </section>

        {/* Essence Tracker */}
        <section className="persistent-view__section persistent-view__section--resource">
          <h2 className="persistent-view__section-title">Essence</h2>

          <div className="persistent-view__resource-display">
            <div className="persistent-view__resource-controls">
              <button
                className="persistent-view__resource-btn"
                onClick={() => handleEssenceChange(-1)}
                disabled={availableEssence <= 0}
              >
                -
              </button>
              <div className="persistent-view__resource-values">
                <span className="persistent-view__resource-available">{availableEssence}</span>
                <span className="persistent-view__resource-total">/ {currentEssence} total</span>
              </div>
              <button
                className="persistent-view__resource-btn"
                onClick={() => handleEssenceChange(1)}
              >
                +
              </button>
            </div>

            {/* Essence Bar */}
            <div className="persistent-view__essence-bar">
              <div
                className="persistent-view__essence-locked"
                style={{ width: `${(lockedEssence / Math.max(currentEssence, 10)) * 100}%` }}
                title={`${lockedEssence} Locked`}
              />
              <div
                className="persistent-view__essence-available"
                style={{ width: `${(availableEssence / Math.max(currentEssence, 10)) * 100}%` }}
                title={`${availableEssence} Available`}
              />
            </div>
            <div className="persistent-view__essence-legend">
              <span className="persistent-view__legend-locked">
                <span className="persistent-view__legend-swatch locked" />
                Locked: {lockedEssence}
              </span>
              <span className="persistent-view__legend-available">
                <span className="persistent-view__legend-swatch available" />
                Available: {availableEssence}
              </span>
            </div>
          </div>

          {/* Essence Mechanics */}
          <div className="persistent-view__mechanics-grid">
            <div className="persistent-view__mechanic">
              <span className="persistent-view__mechanic-label">Start of Turn:</span>
              <div className="persistent-view__mechanic-action">
                <span className="persistent-view__mechanic-value">
                  +{baseEssenceGain} - {lockedEssence} locked = +{effectiveEssenceGain}
                </span>
                <button className="persistent-view__trigger-btn" onClick={handleStartOfTurn}>
                  Apply
                </button>
              </div>
            </div>
            <div className="persistent-view__mechanic">
              <span className="persistent-view__mechanic-label">Elemental Damage Taken:</span>
              <div className="persistent-view__mechanic-action">
                <span className="persistent-view__mechanic-value">+{essenceSurgeGain} Essence</span>
                <button
                  className={`persistent-view__trigger-btn ${essenceSurgeGained ? 'used' : ''}`}
                  onClick={handleEssenceSurgeTrigger}
                  disabled={essenceSurgeGained}
                >
                  {essenceSurgeGained ? 'Triggered' : 'Trigger'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mantle of Essence (L4+) */}
        {level >= 4 && (
          <section className="persistent-view__section persistent-view__section--mantle">
            <div className="persistent-view__mantle-header">
              <h2 className="persistent-view__section-title">Mantle of Essence</h2>
              <span
                className={`persistent-view__mantle-status ${
                  shouldMantleBeActive ? 'active' : 'inactive'
                }`}
              >
                {shouldMantleBeActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="persistent-view__mantle-info">
              <p className="persistent-view__mantle-threshold">
                Requires <strong>3+ Available Essence</strong> at the start of your turn
              </p>
              {elementData && (
                <div className="persistent-view__mantle-bonus">
                  <strong>{elementData.name} Mantle:</strong> {elementData.mantleBonus}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Persistent Abilities */}
        <section className="persistent-view__section persistent-view__section--persistent">
          <h2 className="persistent-view__section-title">Persistent Abilities</h2>

          {/* Add Ability Input */}
          <div className="persistent-view__add-ability">
            <input
              type="text"
              className="persistent-view__ability-input"
              placeholder="Ability name..."
              value={abilityInput}
              onChange={(e) => setAbilityInput(e.target.value)}
              onKeyDown={handleAbilityKeyDown}
            />
            <div className="persistent-view__cost-input-wrapper">
              <label className="persistent-view__cost-label">Cost:</label>
              <input
                type="number"
                className="persistent-view__cost-input"
                min="1"
                max="10"
                value={essenceCostInput}
                onChange={(e) => setEssenceCostInput(e.target.value)}
              />
            </div>
            <button
              className="persistent-view__add-btn"
              onClick={handleAddPersistent}
              disabled={!abilityInput.trim()}
            >
              Activate
            </button>
          </div>

          {/* Active Persistent Abilities */}
          {persistentAbilities.length > 0 ? (
            <div className="persistent-view__abilities-list">
              {persistentAbilities.map((ability) => (
                <div key={ability.abilityId} className="persistent-view__ability-card">
                  <div className="persistent-view__ability-info">
                    <span className="persistent-view__ability-name">{ability.abilityName}</span>
                    <span className="persistent-view__ability-cost">
                      {ability.essenceLocked} Essence Locked
                    </span>
                  </div>
                  <button
                    className="persistent-view__dismiss-btn"
                    onClick={() => handleRemovePersistent(ability.abilityId)}
                    title="Dismiss ability"
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="persistent-view__no-abilities">No persistent abilities active.</p>
          )}

          {/* Persistent Info */}
          <div className="persistent-view__persistent-info">
            <p>
              Persistent abilities lock Essence while active. Your turn-start Essence gain is
              reduced by your total locked Essence.
            </p>
          </div>
        </section>

        {/* Element L5 Feature */}
        {element && level >= 5 && elementData?.level5Feature && (
          <section className="persistent-view__section persistent-view__section--element-feature">
            <h2 className="persistent-view__section-title">
              {elementData.name}: {elementData.level5Feature.name}
            </h2>
            <p className="persistent-view__element-feature-desc">
              {elementData.level5Feature.description}
            </p>
          </section>
        )}

        {/* Primordium (L10) */}
        {level >= 10 && (
          <section className="persistent-view__section persistent-view__section--primordium">
            <h2 className="persistent-view__section-title">Primordium (Epic Resource)</h2>
            <div className="persistent-view__primordium-info">
              <p>
                <strong>Gain:</strong> Upon respite, gain Primordium equal to XP gained
              </p>
              <p>
                <strong>Spend:</strong> Maximize all damage dice on any elemental ability
              </p>
            </div>
            <div className="persistent-view__primordium-abilities">
              <h3>Elemental Cataclysm</h3>
              <p>
                Once per encounter, spend 10 Essence to create a massive elemental effect in a
                5-square burst dealing {10 * reasonScore} damage (10 × Reason).
              </p>
            </div>
          </section>
        )}

        {/* Level Features */}
        <section className="persistent-view__section persistent-view__section--features">
          <h2 className="persistent-view__section-title">Level Features</h2>
          <div className="persistent-view__features-list">
            {ELEMENTALIST_LEVEL_FEATURES.map((feature) => {
              const isUnlocked = level >= feature.level;
              return (
                <div
                  key={feature.name}
                  className={`persistent-view__feature ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="persistent-view__feature-header">
                    <span
                      className={`persistent-view__feature-level ${
                        feature.category === 'epic' ? 'epic' : ''
                      }`}
                    >
                      L{feature.level}
                    </span>
                    <span className="persistent-view__feature-name">{feature.name}</span>
                    {!isUnlocked && (
                      <span className="persistent-view__feature-locked-badge">Locked</span>
                    )}
                  </div>
                  <p className="persistent-view__feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersistentMagicView;
