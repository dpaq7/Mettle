import React, { useCallback, useState } from 'react';
import { useSummonerContext } from '../../../context/HeroContext';
import { useCombatContext } from '../../../context/CombatContext';
import { isTacticianHero, TacticianHero, TacticianDoctrine } from '../../../types/hero';
import { TACTICIAN_DOCTRINES } from '../../../data/tactician/doctrines';
import {
  TACTICIAN_LEVEL_FEATURES,
  getFocusGain,
  getMarkTriggerGain,
} from '../../../data/tactician/features';
import './TacticsView.css';

/**
 * TacticsView - Main view for Tactician class's Tactics tab
 * Displays Focus tracking, Mark management, Doctrine info, and level features
 */
export const TacticsView: React.FC = () => {
  const { hero, updateHero } = useSummonerContext();
  const { isInCombat } = useCombatContext();

  // Local state for target input and trigger tracking
  const [targetInput, setTargetInput] = useState('');
  const [focusGainedFromMark, setFocusGainedFromMark] = useState(false);
  const [focusGainedFromHeroic, setFocusGainedFromHeroic] = useState(false);

  // Type guard - only render for Tactician heroes
  if (!hero || !isTacticianHero(hero)) {
    return (
      <div className="tactics-view tactics-view--empty">
        <p>This view is only available for Tactician heroes.</p>
      </div>
    );
  }

  const tacticianHero = hero as TacticianHero;
  const {
    heroicResource,
    subclass: doctrine,
    markedTargets = [],
    kit,
    secondaryKit,
    level,
    characteristics,
  } = tacticianHero;

  const currentFocus = heroicResource?.current ?? 0;
  const focusGain = getFocusGain(level);
  const markTriggerGain = getMarkTriggerGain(level);
  const reasonScore = characteristics?.reason ?? 2;

  // Get doctrine-specific data if doctrine is selected
  const doctrineData = doctrine ? TACTICIAN_DOCTRINES[doctrine] : null;

  // Focus adjustment
  const handleFocusChange = useCallback(
    (delta: number) => {
      const newValue = Math.max(0, currentFocus + delta);
      updateHero({
        heroicResource: {
          ...heroicResource,
          current: newValue,
        },
      } as Partial<TacticianHero>);
    },
    [heroicResource, currentFocus, updateHero]
  );

  // Add marked target
  const handleAddTarget = useCallback(() => {
    if (!targetInput.trim()) return;
    if (markedTargets.includes(targetInput.trim())) return;

    updateHero({
      markedTargets: [...markedTargets, targetInput.trim()],
    } as Partial<TacticianHero>);
    setTargetInput('');
  }, [targetInput, markedTargets, updateHero]);

  // Remove marked target
  const handleRemoveTarget = useCallback(
    (target: string) => {
      updateHero({
        markedTargets: markedTargets.filter((t) => t !== target),
      } as Partial<TacticianHero>);
    },
    [markedTargets, updateHero]
  );

  // Clear all marks
  const handleClearAllMarks = useCallback(() => {
    updateHero({
      markedTargets: [],
    } as Partial<TacticianHero>);
    setFocusGainedFromMark(false);
    setFocusGainedFromHeroic(false);
  }, [updateHero]);

  // Apply start of turn focus gain
  const handleStartOfTurn = useCallback(() => {
    handleFocusChange(focusGain);
    setFocusGainedFromMark(false);
    setFocusGainedFromHeroic(false);
  }, [focusGain, handleFocusChange]);

  // Apply mark damage trigger (1/round)
  const handleMarkDamageTrigger = useCallback(() => {
    if (!focusGainedFromMark && markedTargets.length > 0) {
      handleFocusChange(markTriggerGain);
      setFocusGainedFromMark(true);
    }
  }, [focusGainedFromMark, markedTargets.length, markTriggerGain, handleFocusChange]);

  // Apply ally heroic trigger (1/round)
  const handleAllyHeroicTrigger = useCallback(() => {
    if (!focusGainedFromHeroic) {
      handleFocusChange(1);
      setFocusGainedFromHeroic(true);
    }
  }, [focusGainedFromHeroic, handleFocusChange]);

  // Handle Enter key on target input
  const handleTargetKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTarget();
    }
  };

  return (
    <div className="tactics-view">
      <header className="tactics-view__header">
        <h1 className="tactics-view__title">Tactics</h1>
        <p className="tactics-view__subtitle">
          Coordinate your allies and mark your enemies
        </p>
      </header>

      <div className="tactics-view__content">
        {/* Doctrine Display */}
        <section className="tactics-view__section tactics-view__section--identity">
          <div className="tactics-view__identity-card">
            <h3 className="tactics-view__identity-label">Doctrine</h3>
            {doctrineData ? (
              <>
                <span className="tactics-view__identity-name">{doctrineData.name}</span>
                <p className="tactics-view__identity-theme">{doctrineData.theme}</p>
                <p className="tactics-view__identity-desc">{doctrineData.description}</p>
              </>
            ) : (
              <span className="tactics-view__identity-name tactics-view__identity-name--none">
                Not Selected
              </span>
            )}
          </div>
        </section>

        {/* Focus Tracker */}
        <section className="tactics-view__section tactics-view__section--resource">
          <h2 className="tactics-view__section-title">Focus</h2>

          <div className="tactics-view__resource-controls">
            <button
              className="tactics-view__resource-btn"
              onClick={() => handleFocusChange(-1)}
              disabled={currentFocus <= 0}
            >
              -
            </button>
            <span className="tactics-view__resource-value">{currentFocus}</span>
            <button
              className="tactics-view__resource-btn"
              onClick={() => handleFocusChange(1)}
            >
              +
            </button>
          </div>

          {/* Focus Mechanics */}
          <div className="tactics-view__mechanics-grid">
            <div className="tactics-view__mechanic">
              <span className="tactics-view__mechanic-label">Start of Turn:</span>
              <div className="tactics-view__mechanic-action">
                <span className="tactics-view__mechanic-value">+{focusGain} Focus</span>
                <button className="tactics-view__trigger-btn" onClick={handleStartOfTurn}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mark Section */}
        <section className="tactics-view__section tactics-view__section--mark">
          <h2 className="tactics-view__section-title">Marked Targets</h2>

          {/* Target Input */}
          <div className="tactics-view__mark-input-container">
            <input
              type="text"
              className="tactics-view__mark-input"
              placeholder="Enter target name..."
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              onKeyDown={handleTargetKeyDown}
            />
            <button
              className="tactics-view__mark-btn"
              onClick={handleAddTarget}
              disabled={!targetInput.trim()}
            >
              Mark
            </button>
          </div>

          {/* Marked Targets List */}
          {markedTargets.length > 0 ? (
            <div className="tactics-view__marked-list">
              {markedTargets.map((target) => (
                <div key={target} className="tactics-view__marked-target">
                  <span className="tactics-view__target-name">{target}</span>
                  <span className="tactics-view__target-badge">MARKED</span>
                  <button
                    className="tactics-view__remove-btn"
                    onClick={() => handleRemoveTarget(target)}
                    title="Remove mark"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button className="tactics-view__clear-all-btn" onClick={handleClearAllMarks}>
                Clear All Marks
              </button>
            </div>
          ) : (
            <p className="tactics-view__no-marks">No targets currently marked.</p>
          )}

          {/* Mark Effect Reminder */}
          <div className="tactics-view__mark-effect">
            <strong>Mark Effect:</strong> Allies gain an <em>edge</em> on power rolls against
            marked targets.
            {doctrineData && (
              <p className="tactics-view__doctrine-bonus">
                <strong>Doctrine Bonus:</strong> {doctrineData.markBonus}
              </p>
            )}
          </div>

          {/* Focus Triggers */}
          <div className="tactics-view__focus-triggers">
            <h3 className="tactics-view__triggers-title">Focus Triggers (1/round each)</h3>
            <div className="tactics-view__triggers-grid">
              <button
                className={`tactics-view__trigger-card ${focusGainedFromMark ? 'used' : ''}`}
                onClick={handleMarkDamageTrigger}
                disabled={focusGainedFromMark || markedTargets.length === 0}
              >
                <span className="tactics-view__trigger-label">Ally Damaged Marked Target</span>
                <span className="tactics-view__trigger-gain">+{markTriggerGain} Focus</span>
              </button>
              <button
                className={`tactics-view__trigger-card ${focusGainedFromHeroic ? 'used' : ''}`}
                onClick={handleAllyHeroicTrigger}
                disabled={focusGainedFromHeroic}
              >
                <span className="tactics-view__trigger-label">Ally Used Heroic Ability</span>
                <span className="tactics-view__trigger-gain">+1 Focus</span>
              </button>
            </div>
          </div>
        </section>

        {/* Field Arsenal */}
        <section className="tactics-view__section tactics-view__section--arsenal">
          <h2 className="tactics-view__section-title">Field Arsenal</h2>
          <p className="tactics-view__arsenal-desc">
            You benefit from two kits simultaneously.
          </p>
          <div className="tactics-view__kits-grid">
            <div className="tactics-view__kit-card">
              <span className="tactics-view__kit-label">Primary Kit</span>
              <span className="tactics-view__kit-name">{kit?.name || 'Not Selected'}</span>
            </div>
            <div className="tactics-view__kit-card">
              <span className="tactics-view__kit-label">Secondary Kit</span>
              <span className="tactics-view__kit-name">
                {secondaryKit?.name || 'Not Selected'}
              </span>
            </div>
          </div>
        </section>

        {/* Doctrine L5 Feature */}
        {doctrine && level >= 5 && doctrineData?.level5Feature && (
          <section className="tactics-view__section tactics-view__section--doctrine-feature">
            <h2 className="tactics-view__section-title">
              {doctrineData.name}: {doctrineData.level5Feature.name}
            </h2>
            <p className="tactics-view__doctrine-feature-desc">
              {doctrineData.level5Feature.description}
            </p>
          </section>
        )}

        {/* Seize the Initiative (L7) */}
        {level >= 7 && (
          <section className="tactics-view__section tactics-view__section--initiative">
            <h2 className="tactics-view__section-title">Seize the Initiative</h2>
            <div className="tactics-view__initiative-info">
              <p>
                Once per encounter at the start of combat, you can spend <strong>5 Focus</strong>{' '}
                to let all allies take their first turn before any enemies.
              </p>
              <div className="tactics-view__initiative-cost">
                <span className="tactics-view__initiative-label">Cost:</span>
                <span
                  className={`tactics-view__initiative-value ${
                    currentFocus >= 5 ? 'affordable' : 'unaffordable'
                  }`}
                >
                  5 Focus
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Triumph (L10) */}
        {level >= 10 && (
          <section className="tactics-view__section tactics-view__section--triumph">
            <h2 className="tactics-view__section-title">Triumph (Epic Resource)</h2>
            <div className="tactics-view__triumph-info">
              <p>
                <strong>Gain:</strong> Upon respite, gain Triumph equal to XP gained
              </p>
              <p>
                <strong>Spend:</strong> Automatically grant an ally a tier 3 result on any
                power roll
              </p>
            </div>
            <div className="tactics-view__triumph-abilities">
              <h3>Supreme Commander</h3>
              <p>
                As a maneuver, you can spend 10 Focus to grant all allies within 10 squares an
                immediate free action to use their main action ability.
              </p>
            </div>
          </section>
        )}

        {/* Level Features */}
        <section className="tactics-view__section tactics-view__section--features">
          <h2 className="tactics-view__section-title">Level Features</h2>
          <div className="tactics-view__features-list">
            {TACTICIAN_LEVEL_FEATURES.map((feature) => {
              const isUnlocked = level >= feature.level;
              return (
                <div
                  key={feature.name}
                  className={`tactics-view__feature ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="tactics-view__feature-header">
                    <span
                      className={`tactics-view__feature-level ${
                        feature.category === 'epic' ? 'epic' : ''
                      }`}
                    >
                      L{feature.level}
                    </span>
                    <span className="tactics-view__feature-name">{feature.name}</span>
                    {!isUnlocked && (
                      <span className="tactics-view__feature-locked-badge">Locked</span>
                    )}
                  </div>
                  <p className="tactics-view__feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TacticsView;
