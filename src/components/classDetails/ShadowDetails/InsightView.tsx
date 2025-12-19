import React, { useCallback, useState } from 'react';
import { useSummonerContext } from '../../../context/HeroContext';
import { useCombatContext } from '../../../context/CombatContext';
import { isShadowHero, ShadowHero, ShadowCollege } from '../../../types/hero';
import { SHADOW_COLLEGES } from '../../../data/shadow/colleges';
import {
  SHADOW_LEVEL_FEATURES,
  getInsightGainDice,
  getSurgeGain,
  getEdgeDiscount,
} from '../../../data/shadow/features';
import './InsightView.css';

/**
 * InsightView - Main view for Shadow class's College tab
 * Displays Insight tracking, Hesitation Is Weakness, College info, and level features
 */
export const InsightView: React.FC = () => {
  const { hero, updateHero } = useSummonerContext();
  const { isInCombat } = useCombatContext();

  // Local state for rolling animation and edge tracking
  const [isRolling, setIsRolling] = useState(false);

  // Type guard - only render for Shadow heroes
  if (!hero || !isShadowHero(hero)) {
    return (
      <div className="insight-view insight-view--empty">
        <p>This view is only available for Shadow heroes.</p>
      </div>
    );
  }

  const shadowHero = hero as ShadowHero;
  const {
    heroicResource,
    subclass: college,
    isHidden = false,
    level,
    characteristics,
  } = shadowHero;

  const currentInsight = heroicResource?.current ?? 0;
  const insightGainDice = getInsightGainDice(level);
  const surgeGain = getSurgeGain(level);

  // Get college-specific data if college is selected
  const collegeData = college ? SHADOW_COLLEGES[college] : null;

  // Insight adjustment
  const handleInsightChange = useCallback(
    (delta: number) => {
      const newValue = Math.max(0, currentInsight + delta);
      updateHero({
        heroicResource: {
          ...heroicResource,
          current: newValue,
        },
      } as Partial<ShadowHero>);
    },
    [heroicResource, currentInsight, updateHero]
  );

  // Roll for start of turn insight
  const handleRollInsight = useCallback(() => {
    setIsRolling(true);
    // Roll 1d3 (or 1d3+1 at L7+)
    const d3Roll = Math.floor(Math.random() * 3) + 1;
    const bonus = level >= 7 ? 1 : 0;
    const totalGain = d3Roll + bonus;

    setTimeout(() => {
      handleInsightChange(totalGain);
      setIsRolling(false);
    }, 500);
  }, [level, handleInsightChange]);

  // Toggle hidden state
  const handleToggleHidden = useCallback(() => {
    updateHero({
      isHidden: !isHidden,
    } as Partial<ShadowHero>);
  }, [isHidden, updateHero]);

  // Use Hesitation Is Weakness (spend 1 insight)
  const handleHesitation = useCallback(() => {
    if (currentInsight >= 1) {
      handleInsightChange(-1);
    }
  }, [currentInsight, handleInsightChange]);

  // Apply surge gain
  const handleSurgeTrigger = useCallback(() => {
    handleInsightChange(surgeGain);
  }, [surgeGain, handleInsightChange]);

  // Filter features by level
  const unlockedFeatures = SHADOW_LEVEL_FEATURES.filter((f) => f.level <= level);
  const lockedFeatures = SHADOW_LEVEL_FEATURES.filter((f) => f.level > level);

  return (
    <div className="insight-view">
      <header className="insight-view__header">
        <h1 className="insight-view__title">Insight</h1>
        <p className="insight-view__subtitle">
          Master the shadows and strike when enemies hesitate
        </p>
      </header>

      <div className="insight-view__content">
        {/* College Display */}
        <section className="insight-view__section insight-view__section--identity">
          <div className="insight-view__identity-card">
            <h3 className="insight-view__identity-label">College</h3>
            {collegeData ? (
              <>
                <span className="insight-view__identity-name">{collegeData.name}</span>
                <p className="insight-view__identity-theme">{collegeData.theme}</p>
                <p className="insight-view__identity-desc">{collegeData.description}</p>
              </>
            ) : (
              <span className="insight-view__identity-name insight-view__identity-name--none">
                Not Selected
              </span>
            )}
          </div>
        </section>

        {/* Insight Tracker */}
        <section className="insight-view__section insight-view__section--resource">
          <h2 className="insight-view__section-title">Insight</h2>

          <div className="insight-view__resource-controls">
            <button
              className="insight-view__resource-btn"
              onClick={() => handleInsightChange(-1)}
              disabled={currentInsight <= 0}
            >
              -
            </button>
            <span className={`insight-view__resource-value ${isRolling ? 'rolling' : ''}`}>
              {currentInsight}
            </span>
            <button
              className="insight-view__resource-btn"
              onClick={() => handleInsightChange(1)}
            >
              +
            </button>
          </div>

          {/* Insight Mechanics */}
          <div className="insight-view__mechanics-grid">
            <div className="insight-view__mechanic">
              <span className="insight-view__mechanic-label">Start of Turn:</span>
              <div className="insight-view__mechanic-action">
                <span className="insight-view__mechanic-value">+{insightGainDice}</span>
                <button
                  className={`insight-view__roll-btn ${isRolling ? 'rolling' : ''}`}
                  onClick={handleRollInsight}
                  disabled={isRolling}
                >
                  Roll
                </button>
              </div>
            </div>
            <div className="insight-view__mechanic">
              <span className="insight-view__mechanic-label">Surge Damage:</span>
              <div className="insight-view__mechanic-action">
                <span className="insight-view__mechanic-value">+{surgeGain} Insight</span>
                <button
                  className="insight-view__trigger-btn"
                  onClick={handleSurgeTrigger}
                >
                  Trigger
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden State */}
        <section className="insight-view__section insight-view__section--hidden">
          <div className="insight-view__hidden-header">
            <h2 className="insight-view__section-title">Stealth</h2>
            <button
              className={`insight-view__hidden-toggle ${isHidden ? 'active' : ''}`}
              onClick={handleToggleHidden}
            >
              {isHidden ? 'HIDDEN' : 'VISIBLE'}
            </button>
          </div>
          <div className="insight-view__hidden-info">
            <p>
              <strong>Hide (Maneuver):</strong> Attempt to become hidden if you have cover or
              concealment from all enemies.
            </p>
            {level >= 6 && (
              <p className="insight-view__hidden-vanish">
                <strong>Vanish (L6):</strong> Spend 2 Insight when taking damage to become
                hidden until the start of your next turn, even without cover.
              </p>
            )}
          </div>
        </section>

        {/* Hesitation Is Weakness */}
        <section className="insight-view__section insight-view__section--hesitation">
          <h2 className="insight-view__section-title">Hesitation Is Weakness</h2>
          <div className="insight-view__hesitation-content">
            <div className="insight-view__hesitation-info">
              <p>
                Spend <strong>1 Insight</strong> as a free triggered action to take your turn
                immediately after another hero finishes their turn.
              </p>
              <p className="insight-view__hesitation-note">
                You can use this even if you have already taken a turn this round.
              </p>
              {level >= 7 && (
                <p className="insight-view__hesitation-anticipation">
                  <strong>Anticipation (L7):</strong> You can also use this to act before an
                  enemy instead of after an ally.
                </p>
              )}
            </div>
            <button
              className="insight-view__hesitation-btn"
              onClick={handleHesitation}
              disabled={currentInsight < 1}
            >
              <span className="insight-view__hesitation-btn-text">Use Hesitation</span>
              <span className="insight-view__hesitation-btn-cost">-1 Insight</span>
            </button>
          </div>
        </section>

        {/* Edge Discount (L4+) */}
        {level >= 4 && (
          <section className="insight-view__section insight-view__section--edge">
            <h2 className="insight-view__section-title">Edge Discount</h2>
            <div className="insight-view__edge-info">
              <p>When you have an edge on a power roll, reduce Insight costs:</p>
              <div className="insight-view__edge-grid">
                <div className="insight-view__edge-tier">
                  <span className="insight-view__edge-type">Edge</span>
                  <span className="insight-view__edge-discount">-1 Insight Cost</span>
                </div>
                <div className="insight-view__edge-tier">
                  <span className="insight-view__edge-type">Double Edge</span>
                  <span className="insight-view__edge-discount">-2 Insight Cost</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* College L5 Feature */}
        {college && level >= 5 && collegeData?.level5Feature && (
          <section className="insight-view__section insight-view__section--college-feature">
            <h2 className="insight-view__section-title">
              {collegeData.name}: {collegeData.level5Feature.name}
            </h2>
            <p className="insight-view__college-feature-desc">
              {collegeData.level5Feature.description}
            </p>
          </section>
        )}

        {/* Vision (L10) */}
        {level >= 10 && (
          <section className="insight-view__section insight-view__section--vision">
            <h2 className="insight-view__section-title">Vision (Epic Resource)</h2>
            <div className="insight-view__vision-info">
              <p>
                <strong>Gain:</strong> Upon respite, gain Vision equal to XP gained
              </p>
              <p>
                <strong>Spend:</strong> Automatically succeed on any test, or gain an extra
                turn
              </p>
            </div>
            <div className="insight-view__vision-abilities">
              <h3>Omniscient Strike</h3>
              <p>
                Once per round, when you make a power roll, you can treat the result as a
                critical success (tier 3 with double edge).
              </p>
            </div>
          </section>
        )}

        {/* Level Features */}
        <section className="insight-view__section insight-view__section--features">
          <h2 className="insight-view__section-title">Level Features</h2>
          <div className="insight-view__features-list">
            {SHADOW_LEVEL_FEATURES.map((feature) => {
              const isUnlocked = level >= feature.level;
              return (
                <div
                  key={feature.name}
                  className={`insight-view__feature ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="insight-view__feature-header">
                    <span
                      className={`insight-view__feature-level ${
                        feature.category === 'epic' ? 'epic' : ''
                      }`}
                    >
                      L{feature.level}
                    </span>
                    <span className="insight-view__feature-name">{feature.name}</span>
                    {!isUnlocked && (
                      <span className="insight-view__feature-locked-badge">Locked</span>
                    )}
                  </div>
                  <p className="insight-view__feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default InsightView;
