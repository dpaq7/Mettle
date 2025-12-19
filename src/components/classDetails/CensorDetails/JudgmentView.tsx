import React, { useCallback, useState } from 'react';
import { useSummonerContext } from '../../../context/HeroContext';
import { useCombatContext } from '../../../context/CombatContext';
import { isCensorHero, CensorHero, CensorOrder } from '../../../types/hero';
import { CENSOR_ORDERS } from '../../../data/censor/orders';
import {
  CENSOR_LEVEL_FEATURES,
  getWrathGain,
  getJudgmentTriggerGain,
} from '../../../data/censor/features';
import './JudgmentView.css';

/**
 * JudgmentView - Main view for Censor class's Judgment tab
 * Displays Wrath tracking, Judgment target, Order info, and level features
 */
export const JudgmentView: React.FC = () => {
  const { hero, updateHero } = useSummonerContext();
  const { isInCombat } = useCombatContext();

  // Local state for target input
  const [targetInput, setTargetInput] = useState('');
  const [wrathGainedDamageDealt, setWrathGainedDamageDealt] = useState(false);
  const [wrathGainedDamageTaken, setWrathGainedDamageTaken] = useState(false);

  // Type guard - only render for Censor heroes
  if (!hero || !isCensorHero(hero)) {
    return (
      <div className="judgment-view judgment-view--empty">
        <p>This view is only available for Censor heroes.</p>
      </div>
    );
  }

  const censorHero = hero as CensorHero;
  const {
    heroicResource,
    subclass: order,
    judgment,
    level,
    characteristics,
  } = censorHero;

  const currentWrath = heroicResource?.current ?? 0;
  const wrathGain = getWrathGain(level);
  const triggerGain = getJudgmentTriggerGain(level);
  const presenceScore = characteristics?.presence ?? 2;

  // Get order-specific data if order is selected
  const orderData = order ? CENSOR_ORDERS[order] : null;

  // Provide defaults for judgment if not present
  const judgmentState = judgment ?? { targetId: null, targetName: null };

  // Wrath adjustment
  const handleWrathChange = useCallback(
    (delta: number) => {
      const newValue = Math.max(0, currentWrath + delta);
      updateHero({
        heroicResource: {
          ...heroicResource,
          current: newValue,
        },
      } as Partial<CensorHero>);
    },
    [heroicResource, currentWrath, updateHero]
  );

  // Set judgment target
  const handleSetTarget = useCallback(() => {
    if (!targetInput.trim()) return;
    updateHero({
      judgment: {
        targetId: `target-${Date.now()}`,
        targetName: targetInput.trim(),
      },
    } as Partial<CensorHero>);
    setTargetInput('');
  }, [targetInput, updateHero]);

  // Clear judgment target
  const handleClearTarget = useCallback(() => {
    updateHero({
      judgment: {
        targetId: null,
        targetName: null,
      },
    } as Partial<CensorHero>);
    setWrathGainedDamageDealt(false);
    setWrathGainedDamageTaken(false);
  }, [updateHero]);

  // Apply start of turn wrath gain
  const handleStartOfTurn = useCallback(() => {
    handleWrathChange(wrathGain);
    setWrathGainedDamageDealt(false);
    setWrathGainedDamageTaken(false);
  }, [wrathGain, handleWrathChange]);

  // Apply damage dealt trigger (1/round)
  const handleDamageDealtTrigger = useCallback(() => {
    if (!wrathGainedDamageDealt && judgmentState.targetName) {
      handleWrathChange(triggerGain);
      setWrathGainedDamageDealt(true);
    }
  }, [wrathGainedDamageDealt, judgmentState.targetName, triggerGain, handleWrathChange]);

  // Apply damage taken trigger (1/round)
  const handleDamageTakenTrigger = useCallback(() => {
    if (!wrathGainedDamageTaken && judgmentState.targetName) {
      handleWrathChange(triggerGain);
      setWrathGainedDamageTaken(true);
    }
  }, [wrathGainedDamageTaken, judgmentState.targetName, triggerGain, handleWrathChange]);

  // Handle Enter key on target input
  const handleTargetKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSetTarget();
    }
  };

  return (
    <div className="judgment-view">
      <header className="judgment-view__header">
        <h1 className="judgment-view__title">Judgment</h1>
        <p className="judgment-view__subtitle">
          Mark your enemies and deliver divine retribution
        </p>
      </header>

      <div className="judgment-view__content">
        {/* Order Display */}
        <section className="judgment-view__section judgment-view__section--identity">
          <div className="judgment-view__identity-card">
            <h3 className="judgment-view__identity-label">Order</h3>
            {orderData ? (
              <>
                <span className="judgment-view__identity-name">{orderData.name}</span>
                <p className="judgment-view__identity-theme">{orderData.theme}</p>
                <p className="judgment-view__identity-desc">{orderData.description}</p>
              </>
            ) : (
              <span className="judgment-view__identity-name judgment-view__identity-name--none">
                Not Selected
              </span>
            )}
          </div>
        </section>

        {/* Wrath Tracker */}
        <section className="judgment-view__section judgment-view__section--resource">
          <h2 className="judgment-view__section-title">Wrath</h2>

          <div className="judgment-view__resource-controls">
            <button
              className="judgment-view__resource-btn"
              onClick={() => handleWrathChange(-1)}
              disabled={currentWrath <= 0}
            >
              -
            </button>
            <span className="judgment-view__resource-value">{currentWrath}</span>
            <button
              className="judgment-view__resource-btn"
              onClick={() => handleWrathChange(1)}
            >
              +
            </button>
          </div>

          {/* Wrath Mechanics */}
          <div className="judgment-view__mechanics-grid">
            <div className="judgment-view__mechanic">
              <span className="judgment-view__mechanic-label">Start of Turn:</span>
              <div className="judgment-view__mechanic-action">
                <span className="judgment-view__mechanic-value">+{wrathGain} Wrath</span>
                <button className="judgment-view__trigger-btn" onClick={handleStartOfTurn}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Judgment Section */}
        <section className="judgment-view__section judgment-view__section--judgment">
          <h2 className="judgment-view__section-title">Judged Target</h2>

          {judgmentState.targetName ? (
            <div className="judgment-view__target-display">
              <div className="judgment-view__target-info">
                <span className="judgment-view__target-name">{judgmentState.targetName}</span>
                <span className="judgment-view__target-status">JUDGED</span>
              </div>
              {orderData && (
                <p className="judgment-view__target-bonus">
                  <strong>Order Bonus:</strong> {orderData.judgmentBonus}
                </p>
              )}
              <button className="judgment-view__clear-btn" onClick={handleClearTarget}>
                Release Judgment
              </button>
            </div>
          ) : (
            <div className="judgment-view__target-input-container">
              <input
                type="text"
                className="judgment-view__target-input"
                placeholder="Enter target name..."
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                onKeyDown={handleTargetKeyDown}
              />
              <button
                className="judgment-view__judge-btn"
                onClick={handleSetTarget}
                disabled={!targetInput.trim()}
              >
                Judge
              </button>
            </div>
          )}

          {/* Judgment Wrath Triggers */}
          {judgmentState.targetName && (
            <div className="judgment-view__judgment-triggers">
              <h3 className="judgment-view__triggers-title">Wrath Triggers (1/round each)</h3>
              <div className="judgment-view__triggers-grid">
                <button
                  className={`judgment-view__trigger-card ${wrathGainedDamageDealt ? 'used' : ''}`}
                  onClick={handleDamageDealtTrigger}
                  disabled={wrathGainedDamageDealt}
                >
                  <span className="judgment-view__trigger-label">Dealt Damage to Target</span>
                  <span className="judgment-view__trigger-gain">+{triggerGain} Wrath</span>
                </button>
                <button
                  className={`judgment-view__trigger-card ${wrathGainedDamageTaken ? 'used' : ''}`}
                  onClick={handleDamageTakenTrigger}
                  disabled={wrathGainedDamageTaken}
                >
                  <span className="judgment-view__trigger-label">Target Dealt Damage to You</span>
                  <span className="judgment-view__trigger-gain">+{triggerGain} Wrath</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Divine Retribution */}
        <section className="judgment-view__section judgment-view__section--retribution">
          <h2 className="judgment-view__section-title">Divine Retribution</h2>
          <div className="judgment-view__retribution-info">
            <p>
              When your judged target uses a <strong>main action</strong>, they take holy damage
              equal to your Presence score.
            </p>
            <div className="judgment-view__retribution-damage">
              <span className="judgment-view__retribution-label">Holy Damage:</span>
              <span className="judgment-view__retribution-value">{presenceScore}</span>
            </div>
          </div>
        </section>

        {/* Order L5 Feature */}
        {order && level >= 5 && orderData?.level5Feature && (
          <section className="judgment-view__section judgment-view__section--order-feature">
            <h2 className="judgment-view__section-title">
              {orderData.name}: {orderData.level5Feature.name}
            </h2>
            <p className="judgment-view__order-feature-desc">
              {orderData.level5Feature.description}
            </p>
          </section>
        )}

        {/* Anathema (L10) */}
        {level >= 10 && (
          <section className="judgment-view__section judgment-view__section--anathema">
            <h2 className="judgment-view__section-title">Anathema (Epic Resource)</h2>
            <div className="judgment-view__anathema-info">
              <p>
                <strong>Gain:</strong> Upon respite, gain Anathema equal to XP gained
              </p>
              <p>
                <strong>Spend:</strong> Automatically deal maximum damage on any attack against
                your judged target
              </p>
            </div>
            <div className="judgment-view__anathema-abilities">
              <h3>Final Judgment</h3>
              <p>
                When your judged target drops to 0 Stamina, you can choose to immediately
                execute them (no death saves). This ability can only be used once per encounter.
              </p>
            </div>
          </section>
        )}

        {/* Level Features */}
        <section className="judgment-view__section judgment-view__section--features">
          <h2 className="judgment-view__section-title">Level Features</h2>
          <div className="judgment-view__features-list">
            {CENSOR_LEVEL_FEATURES.map((feature) => {
              const isUnlocked = level >= feature.level;
              return (
                <div
                  key={feature.name}
                  className={`judgment-view__feature ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="judgment-view__feature-header">
                    <span
                      className={`judgment-view__feature-level ${
                        feature.category === 'epic' ? 'epic' : ''
                      }`}
                    >
                      L{feature.level}
                    </span>
                    <span className="judgment-view__feature-name">{feature.name}</span>
                    {!isUnlocked && (
                      <span className="judgment-view__feature-locked-badge">Locked</span>
                    )}
                  </div>
                  <p className="judgment-view__feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default JudgmentView;
