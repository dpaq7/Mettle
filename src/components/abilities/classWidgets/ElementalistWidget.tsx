import React, { useState, useCallback } from 'react';
import { ElementalistHero, ElementalistElement, PersistentAbility } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface ElementalistWidgetProps {
  hero: ElementalistHero;
}

const ELEMENT_INFO: Record<ElementalistElement, { name: string; description: string; color: string }> = {
  earth: {
    name: 'Earth',
    description: 'Command stone and metal, shaping the world around you.',
    color: '#8d6e63',
  },
  fire: {
    name: 'Fire',
    description: 'Wield flames that burn and consume all in their path.',
    color: '#ff7043',
  },
  green: {
    name: 'Green',
    description: 'Channel nature\'s power through plants and primal energy.',
    color: '#66bb6a',
  },
  void: {
    name: 'Void',
    description: 'Manipulate darkness and the spaces between worlds.',
    color: '#7e57c2',
  },
};

export const ElementalistWidget: React.FC<ElementalistWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, mantleActive, persistentAbilities = [], subclass: element, characteristics } = hero;
  const currentEssence = heroicResource?.current ?? 0;
  const lockedEssence = heroicResource?.persistent ?? 0;
  const availableEssence = currentEssence - lockedEssence;

  // Calculate potency based on Reason
  const reason = characteristics?.reason ?? 2;

  const handleEssenceChange = useCallback((delta: number) => {
    const newValue = Math.max(lockedEssence, currentEssence + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<ElementalistHero>);
  }, [currentEssence, lockedEssence, heroicResource, updateHero]);

  const handleDismissPersistent = useCallback((abilityId: string) => {
    const ability = persistentAbilities.find(a => a.abilityId === abilityId);
    if (ability) {
      const newPersistent = persistentAbilities.filter(a => a.abilityId !== abilityId);
      const newLockedEssence = newPersistent.reduce((sum, a) => sum + a.essenceLocked, 0);
      updateHero({
        persistentAbilities: newPersistent,
        heroicResource: {
          ...heroicResource,
          persistent: newLockedEssence,
        },
      } as Partial<ElementalistHero>);
    }
  }, [persistentAbilities, heroicResource, updateHero]);

  const handleToggleMantle = useCallback(() => {
    updateHero({
      mantleActive: !mantleActive,
    } as Partial<ElementalistHero>);
  }, [mantleActive, updateHero]);

  const elementData = element ? ELEMENT_INFO[element] : null;

  return (
    <div className="class-widget class-widget--elementalist">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Essence</span>
          <span className="class-widget__quick-stat-value">{availableEssence}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Locked</span>
          <span className="class-widget__quick-stat-value">{lockedEssence}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Persistent</span>
          <span className="class-widget__quick-stat-value">{persistentAbilities.length}</span>
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
          <h3 className="class-widget__title">Elementalist</h3>
          {elementData && (
            <span className="class-widget__badge" style={{ background: `${elementData.color}33`, color: elementData.color }}>
              {elementData.name}
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
              disabled={availableEssence <= 0}
            >
              −
            </button>
            <span className="class-widget__resource-value">
              {availableEssence}
              {lockedEssence > 0 && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {' '}({currentEssence} total)
                </span>
              )}
            </span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleEssenceChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Essence Bar Visualization */}
        <div style={{
          marginTop: '0.5rem',
          height: '8px',
          background: 'var(--bg-darkest)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          display: 'flex',
        }}>
          <div style={{
            width: `${Math.min(100, lockedEssence * 10)}%`,
            background: 'var(--warning)',
            transition: 'width 0.2s',
          }} />
          <div style={{
            width: `${Math.min(100 - lockedEssence * 10, availableEssence * 10)}%`,
            background: '#ba68c8',
            transition: 'width 0.2s',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          <span>Locked: {lockedEssence}</span>
          <span>Available: {availableEssence}</span>
        </div>

        {/* Elemental Mantle */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Elemental Mantle</h4>
            <span className={`class-widget__mechanic-status ${mantleActive ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {mantleActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Surround yourself with your element for passive effects and enhanced abilities.
          </p>
          <button
            className="class-widget__target-btn"
            onClick={handleToggleMantle}
            style={{ marginTop: '0.5rem' }}
          >
            {mantleActive ? 'Dismiss Mantle' : 'Activate Mantle'}
          </button>
        </div>

        {/* Persistent Abilities */}
        {persistentAbilities.length > 0 && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--warning)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Persistent Effects</h4>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              {persistentAbilities.map((ability: PersistentAbility) => (
                <div key={ability.abilityId} className="class-widget__active-target" style={{ marginBottom: '0.25rem' }}>
                  <span>
                    <strong>{ability.abilityName}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--warning)', marginLeft: '0.5rem' }}>
                      ({ability.essenceLocked} locked)
                    </span>
                  </span>
                  <button
                    className="class-widget__target-btn class-widget__target-btn--danger"
                    onClick={() => handleDismissPersistent(ability.abilityId)}
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Element Info */}
        {elementData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: elementData.color }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{elementData.name} Specialization</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {elementData.description}
            </p>
          </div>
        )}

        {/* Essence Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Essence Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+2 Essence</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round you take non-holy damage: <strong>+1 Essence</strong>
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

export default ElementalistWidget;
