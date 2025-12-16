import React, { useState, useCallback } from 'react';
import { TroubadourHero, TroubadourClass, Routine } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface TroubadourWidgetProps {
  hero: TroubadourHero;
}

const CLASS_INFO: Record<TroubadourClass, { name: string; description: string }> = {
  auteur: {
    name: 'Auteur',
    description: 'Storyteller and director who manipulates battlefield positioning.',
  },
  duelist: {
    name: 'Duelist',
    description: 'Acrobatic swordfighter with dramatic flair and tandem attacks.',
  },
  virtuoso: {
    name: 'Virtuoso',
    description: 'Musical performer whose songs empower allies and strike enemies.',
  },
};

const SAMPLE_ROUTINES: Routine[] = [
  { id: 'inspiring', name: 'Inspiring Routine', effect: 'Allies within 5 squares gain +1 to power rolls' },
  { id: 'defensive', name: 'Defensive Routine', effect: 'Allies within 5 squares gain +1 to defenses' },
  { id: 'aggressive', name: 'Aggressive Routine', effect: 'Allies within 5 squares deal +1 damage' },
];

export const TroubadourWidget: React.FC<TroubadourWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, activeRoutine, scenePartners = [], heroPartners = [], subclass: troubadourClass, characteristics } = hero;
  const currentDrama = heroicResource?.current ?? 0;

  // Calculate potency based on Presence
  const presence = characteristics?.presence ?? 2;

  // Check if can self-resurrect (30+ Drama)
  const canResurrect = currentDrama >= 30;

  const handleDramaChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentDrama + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<TroubadourHero>);
  }, [currentDrama, heroicResource, updateHero]);

  const handleSelectRoutine = useCallback((routine: Routine | null) => {
    updateHero({
      activeRoutine: routine,
    } as Partial<TroubadourHero>);
  }, [updateHero]);

  const classData = troubadourClass ? CLASS_INFO[troubadourClass] : null;

  return (
    <div className="class-widget class-widget--troubadour">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Drama</span>
          <span className="class-widget__quick-stat-value" style={{ color: canResurrect ? 'var(--xp)' : undefined }}>
            {currentDrama}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Routine</span>
          <span className="class-widget__quick-stat-value">
            {activeRoutine?.name.split(' ')[0] || '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Partners</span>
          <span className="class-widget__quick-stat-value">
            {scenePartners.length + heroPartners.length}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">P+{presence}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Troubadour</h3>
          {classData && (
            <span className="class-widget__badge">{classData.name}</span>
          )}
          {canResurrect && (
            <span className="class-widget__badge" style={{ background: 'var(--xp-dim)', color: 'var(--xp)' }}>
              30+ Drama!
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Drama Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Drama</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDramaChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentDrama}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDramaChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* 30 Drama Resurrection Note */}
        {canResurrect && (
          <div style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            background: 'var(--xp-dim)',
            border: '1px solid var(--xp)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <span style={{ color: 'var(--xp)', fontWeight: 600 }}>
              At 30+ Drama, you can resurrect yourself if you die!
            </span>
          </div>
        )}

        {/* Active Routine */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Active Routine</h4>
            <span className={`class-widget__mechanic-status ${activeRoutine ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {activeRoutine ? 'Active' : 'None'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Activate a routine as a maneuver to provide ongoing benefits to nearby allies.
          </p>

          {/* Current Routine Display */}
          {activeRoutine && (
            <div className="class-widget__active-target" style={{ marginTop: '0.5rem' }}>
              <span>
                <strong>{activeRoutine.name}</strong>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {activeRoutine.effect}
                </span>
              </span>
              <button
                className="class-widget__target-btn class-widget__target-btn--danger"
                onClick={() => handleSelectRoutine(null)}
              >
                End
              </button>
            </div>
          )}

          {/* Routine Selection */}
          {!activeRoutine && (
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {SAMPLE_ROUTINES.map(routine => (
                <button
                  key={routine.id}
                  className="class-widget__target-btn"
                  onClick={() => handleSelectRoutine(routine)}
                  style={{ textAlign: 'left', padding: '0.5rem' }}
                >
                  <strong>{routine.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                    {routine.effect}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scene Partners */}
        {(scenePartners.length > 0 || heroPartners.length > 0) && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: '#f06292' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Scene Partners</h4>
            </div>
            <p className="class-widget__mechanic-description">
              NPCs: {scenePartners.length} | Heroes: {heroPartners.length}
            </p>
            {scenePartners.length > 0 && (
              <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {scenePartners.map(p => p.name).join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Class Info */}
        {classData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{classData.name}</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {classData.description}
            </p>
          </div>
        )}

        {/* Drama Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Drama Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll 1d3 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              3+ heroes act on same turn: <strong>+2 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              A hero becomes winded: <strong>+2 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              Natural 19-20 on power roll: <strong>+3 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              A hero dies: <strong>+10 Drama</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">P-2 ({presence - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">P-1 ({presence - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">P ({presence})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubadourWidget;
