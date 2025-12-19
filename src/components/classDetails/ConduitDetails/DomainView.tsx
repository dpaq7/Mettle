import React, { useCallback, useState } from 'react';
import { useSummonerContext } from '../../../context/HeroContext';
import { useCombatContext } from '../../../context/CombatContext';
import { isConduitHero, ConduitHero, ConduitDomain } from '../../../types/hero';
import { CONDUIT_DOMAINS, getDomainData } from '../../../data/conduit/domains';
import {
  CONDUIT_LEVEL_FEATURES,
  getPietyGainDice,
  getPrayerSuccessThreshold,
} from '../../../data/conduit/features';
import './DomainView.css';

/**
 * DomainView - Main view for Conduit class's Domain tab
 * Displays Piety tracking, Prayer, Domains, and level features
 */
export const DomainView: React.FC = () => {
  const { hero, updateHero } = useSummonerContext();
  const { isInCombat } = useCombatContext();

  // Local state for rolling and prayer
  const [isRolling, setIsRolling] = useState(false);
  const [lastPrayerResult, setLastPrayerResult] = useState<'piety' | 'domain' | 'damage' | null>(
    null
  );
  const [lastPrayerRoll, setLastPrayerRoll] = useState<number | null>(null);

  // Type guard - only render for Conduit heroes
  if (!hero || !isConduitHero(hero)) {
    return (
      <div className="domain-view domain-view--empty">
        <p>This view is only available for Conduit heroes.</p>
      </div>
    );
  }

  const conduitHero = hero as ConduitHero;
  const {
    heroicResource,
    subclass: primaryDomain,
    domains = [],
    prayState,
    level,
    characteristics,
  } = conduitHero;

  const currentPiety = heroicResource?.current ?? 0;
  const pietyGainDice = getPietyGainDice(level);
  const prayerThresholds = getPrayerSuccessThreshold(level);
  const intuitionScore = characteristics?.intuition ?? 2;

  // Get both domain data
  const domain1Data = domains[0] ? getDomainData(domains[0]) : null;
  const domain2Data = domains[1] ? getDomainData(domains[1]) : null;

  // If no domains array, fall back to subclass
  const displayDomains = domains.length > 0 ? domains : primaryDomain ? [primaryDomain] : [];

  // Piety adjustment
  const handlePietyChange = useCallback(
    (delta: number) => {
      const newValue = Math.max(0, currentPiety + delta);
      updateHero({
        heroicResource: {
          ...heroicResource,
          current: newValue,
        },
      } as Partial<ConduitHero>);
    },
    [heroicResource, currentPiety, updateHero]
  );

  // Roll for start of turn piety
  const handleRollPiety = useCallback(() => {
    setIsRolling(true);
    // Roll 1d3 (or 1d3+1/+2 at higher levels)
    const d3Roll = Math.floor(Math.random() * 3) + 1;
    let bonus = 0;
    if (level >= 10) bonus = 2;
    else if (level >= 7) bonus = 1;
    const totalGain = d3Roll + bonus;

    setTimeout(() => {
      handlePietyChange(totalGain);
      setIsRolling(false);
    }, 500);
  }, [level, handlePietyChange]);

  // Pray action
  const handlePray = useCallback(() => {
    setIsRolling(true);
    const d6Roll = Math.floor(Math.random() * 6) + 1;
    setLastPrayerRoll(d6Roll);

    let result: 'piety' | 'domain' | 'damage';
    let pietyGained = 0;

    if (d6Roll >= prayerThresholds.pietyMin) {
      // 5-6: Gain Piety
      result = 'piety';
      const d3Roll = Math.floor(Math.random() * 3) + 1;
      pietyGained = level >= 4 ? d3Roll + 1 : d3Roll;
    } else if (d6Roll >= prayerThresholds.domainMin) {
      // 3-4 (or 3-4 if improved): Domain effect
      result = 'domain';
    } else {
      // 1-2: Damage only
      result = 'damage';
    }

    setTimeout(() => {
      setLastPrayerResult(result);
      if (result === 'piety') {
        handlePietyChange(pietyGained);
      }
      updateHero({
        prayState: {
          hasPrayedThisTurn: true,
          lastPrayResult: result,
        },
      } as Partial<ConduitHero>);
      setIsRolling(false);
    }, 500);
  }, [prayerThresholds, level, handlePietyChange, updateHero]);

  // Reset prayer state for new turn
  const handleNewTurn = useCallback(() => {
    updateHero({
      prayState: {
        hasPrayedThisTurn: false,
        lastPrayResult: null,
      },
    } as Partial<ConduitHero>);
    setLastPrayerResult(null);
    setLastPrayerRoll(null);
  }, [updateHero]);

  return (
    <div className="domain-view">
      <header className="domain-view__header">
        <h1 className="domain-view__title">Divine Domains</h1>
        <p className="domain-view__subtitle">
          Channel the power of your divine patrons
        </p>
      </header>

      <div className="domain-view__content">
        {/* Domains Display */}
        <section className="domain-view__section domain-view__section--identity">
          <h2 className="domain-view__section-title">Your Domains</h2>
          <div className="domain-view__domains-grid">
            {displayDomains.length > 0 ? (
              displayDomains.map((domainId, index) => {
                const domainData = getDomainData(domainId);
                return (
                  <div key={domainId} className="domain-view__domain-card">
                    <div className="domain-view__domain-header">
                      <span className="domain-view__domain-number">Domain {index + 1}</span>
                      <span className="domain-view__domain-name">{domainData.name}</span>
                    </div>
                    <p className="domain-view__domain-theme">{domainData.theme}</p>
                    <p className="domain-view__domain-desc">{domainData.description}</p>
                    <div className="domain-view__domain-details">
                      <div className="domain-view__domain-detail">
                        <span className="domain-view__detail-label">Piety Trigger:</span>
                        <span className="domain-view__detail-value">{domainData.pietyTrigger}</span>
                      </div>
                      <div className="domain-view__domain-detail">
                        <span className="domain-view__detail-label">Prayer Effect:</span>
                        <span className="domain-view__detail-value">{domainData.prayerEffect}</span>
                      </div>
                      <div className="domain-view__domain-detail">
                        <span className="domain-view__detail-label">Healing Grace Bonus:</span>
                        <span className="domain-view__detail-value">{domainData.healingGraceBonus}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="domain-view__no-domains">
                <p>No domains selected. Choose two domains during character creation.</p>
              </div>
            )}
          </div>
        </section>

        {/* Piety Tracker */}
        <section className="domain-view__section domain-view__section--resource">
          <h2 className="domain-view__section-title">Piety</h2>

          <div className="domain-view__resource-controls">
            <button
              className="domain-view__resource-btn"
              onClick={() => handlePietyChange(-1)}
              disabled={currentPiety <= 0}
            >
              -
            </button>
            <span className={`domain-view__resource-value ${isRolling ? 'rolling' : ''}`}>
              {currentPiety}
            </span>
            <button
              className="domain-view__resource-btn"
              onClick={() => handlePietyChange(1)}
            >
              +
            </button>
          </div>

          {/* Piety Mechanics */}
          <div className="domain-view__mechanics-grid">
            <div className="domain-view__mechanic">
              <span className="domain-view__mechanic-label">Start of Turn:</span>
              <div className="domain-view__mechanic-action">
                <span className="domain-view__mechanic-value">+{pietyGainDice}</span>
                <button
                  className={`domain-view__roll-btn ${isRolling ? 'rolling' : ''}`}
                  onClick={handleRollPiety}
                  disabled={isRolling}
                >
                  Roll
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Prayer Section */}
        <section className="domain-view__section domain-view__section--prayer">
          <h2 className="domain-view__section-title">Prayer</h2>
          <div className="domain-view__prayer-content">
            <div className="domain-view__prayer-info">
              <p>
                <strong>Cost:</strong> Take psychic damage equal to your level ({level})
              </p>
              <p>
                <strong>Roll 1d6:</strong>
              </p>
              <ul className="domain-view__prayer-outcomes">
                <li className="domain-view__outcome damage">
                  <span className="domain-view__outcome-range">1-2:</span>
                  <span className="domain-view__outcome-text">Take damage, gain nothing</span>
                </li>
                <li className="domain-view__outcome domain">
                  <span className="domain-view__outcome-range">3-4:</span>
                  <span className="domain-view__outcome-text">Gain domain effect</span>
                </li>
                <li className="domain-view__outcome piety">
                  <span className="domain-view__outcome-range">5-6:</span>
                  <span className="domain-view__outcome-text">
                    Gain {level >= 4 ? '1d3 + 1' : '1d3'} Piety
                  </span>
                </li>
              </ul>
            </div>

            <button
              className={`domain-view__pray-btn ${isRolling ? 'rolling' : ''}`}
              onClick={handlePray}
              disabled={isRolling}
            >
              <span className="domain-view__pray-btn-text">Pray</span>
              <span className="domain-view__pray-btn-cost">-{level} Stamina</span>
            </button>

            {lastPrayerRoll !== null && (
              <div className={`domain-view__prayer-result ${lastPrayerResult}`}>
                <span className="domain-view__result-roll">Rolled: {lastPrayerRoll}</span>
                <span className="domain-view__result-text">
                  {lastPrayerResult === 'piety' && 'Gained Piety!'}
                  {lastPrayerResult === 'domain' && 'Domain Effect Triggered!'}
                  {lastPrayerResult === 'damage' && 'Prayer Failed - Damage Only'}
                </span>
              </div>
            )}

            <button className="domain-view__new-turn-btn" onClick={handleNewTurn}>
              New Turn (Reset)
            </button>
          </div>
        </section>

        {/* Healing Grace */}
        <section className="domain-view__section domain-view__section--healing">
          <h2 className="domain-view__section-title">Healing Grace</h2>
          <div className="domain-view__healing-info">
            <p>
              As a <strong>maneuver</strong>, restore Stamina to one creature within 10 squares.
            </p>
            <div className="domain-view__healing-amount">
              <span className="domain-view__healing-label">Base Healing:</span>
              <span className="domain-view__healing-value">
                {2 * intuitionScore} (2 × Intuition: {intuitionScore})
              </span>
            </div>
            <div className="domain-view__healing-options">
              <p><strong>Spend Piety to enhance:</strong></p>
              <ul>
                <li>+1 Piety: Affect one additional target</li>
                <li>+2 Piety: End one condition on a target</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Lists of Heaven (L2+) */}
        {level >= 2 && (
          <section className="domain-view__section domain-view__section--lists">
            <h2 className="domain-view__section-title">Lists of Heaven</h2>
            <p className="domain-view__lists-desc">
              When an ally within 10 squares spends a Recovery, you can spend a Recovery to allow
              them to regain additional Stamina equal to your Intuition score ({intuitionScore}).
            </p>
          </section>
        )}

        {/* Miracle (L10) */}
        {level >= 10 && (
          <section className="domain-view__section domain-view__section--miracle">
            <h2 className="domain-view__section-title">Miracle (Epic Resource)</h2>
            <div className="domain-view__miracle-info">
              <p>
                <strong>Gain:</strong> Upon respite, gain Miracle equal to XP gained
              </p>
              <p>
                <strong>Spend:</strong> Automatically maximize any healing or resurrect a fallen
                ally
              </p>
            </div>
            <div className="domain-view__miracle-abilities">
              <h3>Divine Intervention</h3>
              <p>
                Once per encounter, spend 10 Piety as a free action to prevent all damage to
                allies within 10 squares until the start of your next turn.
              </p>
            </div>
          </section>
        )}

        {/* Level Features */}
        <section className="domain-view__section domain-view__section--features">
          <h2 className="domain-view__section-title">Level Features</h2>
          <div className="domain-view__features-list">
            {CONDUIT_LEVEL_FEATURES.map((feature) => {
              const isUnlocked = level >= feature.level;
              return (
                <div
                  key={feature.name}
                  className={`domain-view__feature ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="domain-view__feature-header">
                    <span
                      className={`domain-view__feature-level ${
                        feature.category === 'epic' ? 'epic' : ''
                      }`}
                    >
                      L{feature.level}
                    </span>
                    <span className="domain-view__feature-name">{feature.name}</span>
                    {!isUnlocked && (
                      <span className="domain-view__feature-locked-badge">Locked</span>
                    )}
                  </div>
                  <p className="domain-view__feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DomainView;
