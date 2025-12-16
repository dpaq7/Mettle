import React, { useState, useCallback } from 'react';
import { TalentHero, TalentTradition } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface TalentWidgetProps {
  hero: TalentHero;
}

const TRADITION_INFO: Record<TalentTradition, { name: string; description: string }> = {
  chronopathy: {
    name: 'Chronopathy',
    description: 'Seer of time who perceives past and future, accelerating allies.',
  },
  telekinesis: {
    name: 'Telekinesis',
    description: 'Master of psychic force who moves objects and creatures with thought.',
  },
  telepathy: {
    name: 'Telepathy',
    description: 'Mind-reader who communicates silently and projects psychic attacks.',
  },
};

export const TalentWidget: React.FC<TalentWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, isStrained, subclass: tradition, level, characteristics } = hero;
  const currentClarity = heroicResource?.current ?? 0;

  // Calculate potency based on Reason
  const reason = characteristics?.reason ?? 2;

  // Calculate minimum clarity: -(1 + Reason)
  const minimumClarity = -(1 + reason);

  // Calculate strain damage if negative
  const strainDamage = currentClarity < 0 ? Math.abs(currentClarity) : 0;

  // Determine clarity gain based on level
  const clarityGainDice = level >= 7 ? '1d3 + 1' : '1d3';
  const forceMoveBonus = level >= 10 ? 3 : 1;

  const handleClarityChange = useCallback((delta: number) => {
    const newValue = Math.max(minimumClarity, currentClarity + delta);
    const newIsStrained = newValue < 0;
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
      isStrained: newIsStrained,
    } as Partial<TalentHero>);
  }, [currentClarity, minimumClarity, heroicResource, updateHero]);

  const traditionData = tradition ? TRADITION_INFO[tradition] : null;

  // Calculate visual position for clarity gauge
  const gaugeWidth = 10 - minimumClarity; // Total range
  const zeroPosition = Math.abs(minimumClarity) / gaugeWidth * 100;
  const clarityPosition = (currentClarity - minimumClarity) / gaugeWidth * 100;

  return (
    <div className={`class-widget class-widget--talent ${isStrained ? 'class-widget--strained' : ''}`}>
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Clarity</span>
          <span className="class-widget__quick-stat-value" style={{ color: currentClarity < 0 ? 'var(--danger)' : undefined }}>
            {currentClarity}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Status</span>
          <span className="class-widget__quick-stat-value" style={{ color: isStrained ? 'var(--danger)' : 'var(--success)' }}>
            {isStrained ? 'STRAINED' : 'Clear'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">R+{reason}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Talent</h3>
          {traditionData && (
            <span className="class-widget__badge">{traditionData.name}</span>
          )}
          {isStrained && (
            <span className="class-widget__badge" style={{ background: 'var(--danger-dim)', color: 'var(--danger)' }}>
              STRAINED
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Clarity Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Clarity</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleClarityChange(-1)}
              disabled={currentClarity <= minimumClarity}
            >
              −
            </button>
            <span className="class-widget__resource-value" style={{ color: currentClarity < 0 ? 'var(--danger)' : undefined }}>
              {currentClarity}
            </span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleClarityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Clarity Gauge Visualization */}
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginBottom: '0.25rem',
          }}>
            <span>{minimumClarity} (min)</span>
            <span>0</span>
            <span>10+</span>
          </div>
          <div style={{
            height: '12px',
            background: 'var(--bg-darkest)',
            borderRadius: 'var(--radius-sm)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Danger zone (negative) */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${zeroPosition}%`,
              background: 'var(--danger-dim)',
              borderRight: '2px solid var(--text-muted)',
            }} />
            {/* Current clarity marker */}
            <div style={{
              position: 'absolute',
              left: `${clarityPosition}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: currentClarity < 0 ? 'var(--danger)' : 'var(--accent-primary)',
              boxShadow: currentClarity < 0
                ? '0 0 8px var(--danger)'
                : '0 0 8px var(--accent-primary)',
            }} />
          </div>
        </div>

        {/* Strain Warning */}
        {isStrained && (
          <div style={{
            marginTop: '0.75rem',
            padding: '0.75rem',
            background: 'var(--danger-dim)',
            border: '1px solid var(--danger)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <div style={{ color: 'var(--danger)', fontWeight: 700, marginBottom: '0.25rem' }}>
              STRAINED
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              End of turn: Take <strong style={{ color: 'var(--danger)' }}>{strainDamage}</strong> damage
            </div>
          </div>
        )}

        {/* Mind Recovery (L4+) */}
        {level >= 4 && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--success)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Mind Recovery</h4>
              <span className="class-widget__level-badge">L4</span>
            </div>
            <p className="class-widget__mechanic-description">
              When Strained, you can spend a Recovery to gain <strong>3 Clarity</strong> instead of regaining Stamina.
            </p>
          </div>
        )}

        {/* Tradition Info */}
        {traditionData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{traditionData.name} Tradition</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {traditionData.description}
            </p>
          </div>
        )}

        {/* Clarity Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Clarity Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll {clarityGainDice} Clarity</strong>
              {level >= 7 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L7</span>}
            </li>
            <li className="class-widget__gain-item">
              First time/round you force move a creature: <strong>+{forceMoveBonus} Clarity</strong>
              {level >= 10 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L10</span>}
            </li>
          </ul>
        </div>

        {/* Strain Mechanics */}
        <div className="class-widget__gain-section" style={{ background: 'var(--danger-dark)', borderColor: 'var(--danger)' }}>
          <h4 className="class-widget__gain-title" style={{ color: 'var(--danger)' }}>Strain Mechanics</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item" style={{ color: 'var(--text-secondary)' }}>
              Minimum Clarity: <strong>{minimumClarity}</strong> (−1 − Reason: {reason})
            </li>
            <li className="class-widget__gain-item" style={{ color: 'var(--text-secondary)' }}>
              At negative Clarity: Take |Clarity| damage at end of turn
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">R-2 ({reason - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">R-1 ({reason - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">R ({reason})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentWidget;
