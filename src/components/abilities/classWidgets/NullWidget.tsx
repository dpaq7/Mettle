import React, { useState, useCallback } from 'react';
import { NullHero, NullTradition, PsionicAugmentation } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface NullWidgetProps {
  hero: NullHero;
}

const TRADITION_INFO: Record<NullTradition, { name: string; description: string }> = {
  chronokinetic: {
    name: 'Chronokinetic',
    description: 'Manipulate time to slow enemies and accelerate allies.',
  },
  cryokinetic: {
    name: 'Cryokinetic',
    description: 'Control cold and ice to freeze foes in their tracks.',
  },
  metakinetic: {
    name: 'Metakinetic',
    description: 'Master mental force to crush and manipulate physical matter.',
  },
};

const AUGMENTATION_INFO: Record<PsionicAugmentation, { name: string; effect: string }> = {
  density: {
    name: 'Density',
    effect: 'Increase mass for greater impact and resistance.',
  },
  force: {
    name: 'Force',
    effect: 'Amplify telekinetic power for stronger effects.',
  },
  speed: {
    name: 'Speed',
    effect: 'Accelerate movement and reaction time.',
  },
};

export const NullWidget: React.FC<NullWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, nullField, subclass: tradition, augmentation, characteristics, level } = hero;
  const currentDiscipline = heroicResource?.current ?? 0;
  const isFieldActive = nullField?.isActive ?? false;
  const fieldSize = (nullField?.baseSize ?? 1) + (nullField?.bonusSize ?? 0);

  // Calculate potency based on Intuition
  const intuition = characteristics?.intuition ?? 2;

  const handleDisciplineChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentDiscipline + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<NullHero>);
  }, [currentDiscipline, heroicResource, updateHero]);

  const handleToggleNullField = useCallback(() => {
    updateHero({
      nullField: {
        ...nullField,
        isActive: !isFieldActive,
      },
    } as Partial<NullHero>);
  }, [nullField, isFieldActive, updateHero]);

  const traditionData = tradition ? TRADITION_INFO[tradition] : null;
  const augmentationData = augmentation ? AUGMENTATION_INFO[augmentation] : null;

  return (
    <div className="class-widget class-widget--null">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Discipline</span>
          <span className="class-widget__quick-stat-value">{currentDiscipline}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Null Field</span>
          <span className="class-widget__quick-stat-value">
            {isFieldActive ? `${fieldSize} Aura` : 'Off'}
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
          <h3 className="class-widget__title">Null</h3>
          {traditionData && (
            <span className="class-widget__badge">{traditionData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Discipline Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Discipline</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDisciplineChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentDiscipline}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDisciplineChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Null Field Status */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Null Field</h4>
            <span className={`class-widget__mechanic-status ${isFieldActive ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {isFieldActive ? `Active (${fieldSize} Aura)` : 'Inactive'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Enemies in your Null Field have <strong>Potency −1</strong> on all power rolls.
          </p>
          <button
            className="class-widget__target-btn"
            onClick={handleToggleNullField}
            style={{ marginTop: '0.5rem' }}
          >
            {isFieldActive ? 'Deactivate Field' : 'Activate Field (Maneuver)'}
          </button>
        </div>

        {/* Inertial Shield */}
        <div className="class-widget__mechanic" style={{ borderLeftColor: '#4dd0e1' }}>
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Inertial Shield</h4>
          </div>
          <p className="class-widget__mechanic-description">
            <strong>Triggered Action (1/round):</strong> When an enemy in your Null Field attacks an ally, spend Discipline to reduce damage.
          </p>
        </div>

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

        {/* Augmentation Info */}
        {augmentationData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--accent-primary)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Psionic Augmentation: {augmentationData.name}</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {augmentationData.effect}
            </p>
          </div>
        )}

        {/* L10 Order Resource */}
        {level >= 10 && hero.order && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--xp)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Order (Epic Resource)</h4>
              <span className="class-widget__level-badge">L10</span>
            </div>
            <p className="class-widget__mechanic-description">
              Current: <strong>{hero.order.current}</strong> | Can spend Order as Discipline.
            </p>
          </div>
        )}

        {/* Discipline Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Discipline Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+2 Discipline</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round an enemy in Null Field uses main action: <strong>+1 Discipline</strong>
            </li>
            <li className="class-widget__gain-item">
              When Director spends Malice: <strong>+1 Discipline</strong>
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

export default NullWidget;
