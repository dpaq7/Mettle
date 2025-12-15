import React, { useState, useCallback } from 'react';
import { SummonerHeroV2, Formation } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface SummonerWidgetProps {
  hero: SummonerHeroV2;
}

const FORMATION_INFO: Record<Formation, { name: string; bonus: string }> = {
  horde: { name: 'Horde', bonus: 'Minions deal +1 damage' },
  platoon: { name: 'Platoon', bonus: 'Minions have +2 speed' },
  elite: { name: 'Elite', bonus: 'Minions have +3 Stamina, +1 Stability' },
  leader: { name: 'Leader', bonus: 'You can take excess damage instead of minions dying' },
};

const CIRCLE_INFO: Record<string, { name: string; portfolio: string }> = {
  blight: { name: 'Blight', portfolio: 'Demon' },
  graves: { name: 'Graves', portfolio: 'Undead' },
  spring: { name: 'Spring', portfolio: 'Fey' },
  storms: { name: 'Storms', portfolio: 'Elemental' },
};

export const SummonerWidget: React.FC<SummonerWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, formation, subclass: circle, activeSquads } = hero;
  const currentEssence = heroicResource?.current ?? 0;
  const maxPerTurn = heroicResource?.maxPerTurn ?? 5;

  // Count active minions
  const totalMinions = activeSquads?.reduce((sum, squad) => sum + squad.members.length, 0) ?? 0;
  const squadCount = activeSquads?.length ?? 0;

  const handleEssenceChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentEssence + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<SummonerHeroV2>);
  }, [currentEssence, heroicResource, updateHero]);

  const formationData = formation ? FORMATION_INFO[formation] : null;
  const circleData = circle ? CIRCLE_INFO[circle] : null;

  return (
    <div className="class-widget class-widget--summoner">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Essence</span>
          <span className="class-widget__quick-stat-value">{currentEssence}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Max/Turn</span>
          <span className="class-widget__quick-stat-value">{maxPerTurn}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Squads</span>
          <span className="class-widget__quick-stat-value">{squadCount}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Minions</span>
          <span className="class-widget__quick-stat-value">{totalMinions}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Summoner</h3>
          {circleData && (
            <span className="class-widget__badge">{circleData.name}</span>
          )}
          {formationData && (
            <span className="class-widget__badge" style={{ marginLeft: '0.25rem' }}>
              {formationData.name}
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Essence Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Essence</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleEssenceChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentEssence}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleEssenceChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Formation Bonus */}
        {formationData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">
                {formationData.name} Formation
              </h4>
              <span className="class-widget__mechanic-status class-widget__mechanic-status--active">
                Active
              </span>
            </div>
            <p className="class-widget__mechanic-description">
              {formationData.bonus}
            </p>
          </div>
        )}

        {/* Circle Info */}
        {circleData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--essence)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">
                Circle of {circleData.name}
              </h4>
            </div>
            <p className="class-widget__mechanic-description">
              Portfolio: {circleData.portfolio} minions
            </p>
          </div>
        )}

        {/* Essence Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Essence Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+2 Essence</strong> (max {maxPerTurn}/turn)
            </li>
            <li className="class-widget__gain-item">
              First time/round a minion dies unwillingly: <strong>+1 Essence</strong>
            </li>
          </ul>
        </div>

        {/* Quick Command Reminder */}
        {hero.quickCommand && (
          <div className="class-widget__mechanic" style={{ marginTop: '0.75rem', borderLeftColor: '#ce93d8' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Quick Command</h4>
            </div>
            <p className="class-widget__mechanic-description">
              <strong>{hero.quickCommand.name}:</strong> {hero.quickCommand.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummonerWidget;
