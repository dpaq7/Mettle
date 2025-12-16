import React, { useState, useCallback } from 'react';
import { ConduitHero, ConduitDomain } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface ConduitWidgetProps {
  hero: ConduitHero;
}

const DOMAIN_INFO: Record<ConduitDomain, { name: string; description: string }> = {
  creation: { name: 'Creation', description: 'Shape matter and bring forth wonders.' },
  death: { name: 'Death', description: 'Command the transition between life and death.' },
  fate: { name: 'Fate', description: 'Read and manipulate the threads of destiny.' },
  knowledge: { name: 'Knowledge', description: 'Unlock secrets and grant understanding.' },
  life: { name: 'Life', description: 'Channel vital energy to heal and restore allies.' },
  love: { name: 'Love', description: 'Inspire devotion and forge bonds between hearts.' },
  nature: { name: 'Nature', description: 'Commune with beasts and command the wild.' },
  protection: { name: 'Protection', description: 'Ward allies and shield them from harm.' },
  storm: { name: 'Storm', description: 'Call upon lightning and thunder.' },
  sun: { name: 'Sun', description: 'Radiate holy light that purifies and heals.' },
  trickery: { name: 'Trickery', description: 'Deceive foes with illusions and misdirection.' },
  war: { name: 'War', description: 'Bolster warriors and curse enemies in battle.' },
};

type PrayResult = 'piety' | 'domain' | 'damage';

export const ConduitWidget: React.FC<ConduitWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastPrayResult, setLastPrayResult] = useState<PrayResult | null>(null);

  const { heroicResource, prayState, subclass: domain, characteristics } = hero;
  const currentPiety = heroicResource?.current ?? 0;

  // Calculate potency based on Intuition
  const intuition = characteristics?.intuition ?? 2;

  const handlePietyChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentPiety + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<ConduitHero>);
  }, [currentPiety, heroicResource, updateHero]);

  const handlePray = useCallback(() => {
    // Roll 1d6: 1-2 = damage, 3-4 = domain effect, 5-6 = piety
    const roll = Math.floor(Math.random() * 6) + 1;
    let result: PrayResult;

    if (roll <= 2) {
      result = 'damage';
    } else if (roll <= 4) {
      result = 'domain';
    } else {
      result = 'piety';
      // Add bonus piety on 5-6
      handlePietyChange(2);
    }

    setLastPrayResult(result);
    updateHero({
      prayState: {
        hasPrayedThisTurn: true,
        lastPrayResult: result,
      },
    } as Partial<ConduitHero>);
  }, [handlePietyChange, updateHero]);

  const resetPray = useCallback(() => {
    setLastPrayResult(null);
    updateHero({
      prayState: {
        hasPrayedThisTurn: false,
        lastPrayResult: null,
      },
    } as Partial<ConduitHero>);
  }, [updateHero]);

  const domainData = domain ? DOMAIN_INFO[domain] : null;

  const getPrayResultDisplay = () => {
    switch (lastPrayResult) {
      case 'piety':
        return { text: 'Success! +2 Piety', color: 'var(--success)' };
      case 'domain':
        return { text: `Domain Effect (${domainData?.name || 'Unknown'})`, color: '#ffc107' };
      case 'damage':
        return { text: 'Take damage equal to twice your level', color: 'var(--danger)' };
      default:
        return null;
    }
  };

  const prayResult = getPrayResultDisplay();

  return (
    <div className="class-widget class-widget--conduit">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Piety</span>
          <span className="class-widget__quick-stat-value">{currentPiety}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Domain</span>
          <span className="class-widget__quick-stat-value">
            {domainData?.name || '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">I+{intuition}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Conduit</h3>
          {domainData && (
            <span className="class-widget__badge">{domainData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Piety Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Piety</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handlePietyChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentPiety}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handlePietyChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Prayer Mechanic */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Prayer</h4>
            <span className={`class-widget__mechanic-status ${lastPrayResult ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {lastPrayResult ? 'Used' : 'Ready'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Maneuver: Roll 1d6 to pray. Risk damage for bonus Piety or domain effects.
          </p>

          {/* Prayer Action */}
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              className="class-widget__target-btn"
              onClick={handlePray}
              disabled={!!lastPrayResult}
              style={{ flex: 1 }}
            >
              Pray (Roll 1d6)
            </button>
            {lastPrayResult && (
              <button
                className="class-widget__target-btn class-widget__target-btn--danger"
                onClick={resetPray}
              >
                Reset
              </button>
            )}
          </div>

          {/* Prayer Result */}
          {prayResult && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              background: 'var(--bg-darkest)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              color: prayResult.color,
              fontWeight: 600,
            }}>
              {prayResult.text}
            </div>
          )}

          {/* Prayer Outcomes */}
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div>1-2: Take 2×Level damage</div>
            <div>3-4: Domain effect</div>
            <div>5-6: +2 Piety</div>
          </div>
        </div>

        {/* Domain Info */}
        {domainData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: '#ffc107' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{domainData.name} Domain</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {domainData.description}
            </p>
          </div>
        )}

        {/* Piety Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Piety Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll 1d3 Piety</strong>
            </li>
            <li className="class-widget__gain-item">
              Prayer (5-6): <strong>+2 Piety</strong>
            </li>
            <li className="class-widget__gain-item">
              Domain-specific triggers (varies by domain)
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">I-2 ({intuition - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">I-1 ({intuition - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">I ({intuition})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConduitWidget;
