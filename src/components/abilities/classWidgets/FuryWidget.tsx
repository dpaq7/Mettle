import React, { useState, useCallback, useMemo } from 'react';
import { FuryHero, FuryAspect } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface FuryWidgetProps {
  hero: FuryHero;
}

const ASPECT_INFO: Record<FuryAspect, { name: string; description: string }> = {
  berserker: {
    name: 'Berserker',
    description: 'Reckless warrior who grows stronger as the battle rages.',
  },
  reaver: {
    name: 'Reaver',
    description: 'Brutal fighter who channels fury into devastating attacks.',
  },
  stormwight: {
    name: 'Stormwight',
    description: 'Lightning-touched warrior who moves like the storm itself.',
  },
};

interface FerocityTier {
  threshold: number;
  benefit: string;
  minLevel: number;
}

const FEROCITY_TIERS: FerocityTier[] = [
  { threshold: 3, benefit: 'Push/pull/slide distance +1', minLevel: 1 },
  { threshold: 6, benefit: '+1 surge when you deal damage', minLevel: 1 },
  { threshold: 9, benefit: 'Double edge on maneuvers', minLevel: 1 },
  { threshold: 12, benefit: 'Reach +1 on melee abilities', minLevel: 4 },
  { threshold: 15, benefit: 'Speed +2', minLevel: 7 },
  { threshold: 18, benefit: '+1 additional surge on damage', minLevel: 10 },
];

export const FuryWidget: React.FC<FuryWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, subclass: aspect, level, characteristics } = hero;
  const currentFerocity = heroicResource?.current ?? 0;

  // Calculate potency based on Might
  const might = characteristics?.might ?? 2;

  // Get active tiers based on current ferocity and level
  const activeTiers = useMemo(() => {
    return FEROCITY_TIERS.filter(tier => tier.minLevel <= level);
  }, [level]);

  const handleFerocityChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentFerocity + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<FuryHero>);
  }, [currentFerocity, heroicResource, updateHero]);

  const aspectData = aspect ? ASPECT_INFO[aspect] : null;

  // Calculate highest active tier
  const highestActiveTier = activeTiers.reduce((highest, tier) => {
    return currentFerocity >= tier.threshold ? tier.threshold : highest;
  }, 0);

  return (
    <div className="class-widget class-widget--fury">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Ferocity</span>
          <span className="class-widget__quick-stat-value">{currentFerocity}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Tier</span>
          <span className="class-widget__quick-stat-value">
            {highestActiveTier > 0 ? `${highestActiveTier}+` : '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">M+{might}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Fury</h3>
          {aspectData && (
            <span className="class-widget__badge">{aspectData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Ferocity Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Ferocity</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleFerocityChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentFerocity}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleFerocityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Growing Ferocity Tiers */}
        <div className="class-widget__tiers">
          <h4 className="class-widget__gain-title">Growing Ferocity</h4>
          {activeTiers.map((tier) => {
            const isActive = currentFerocity >= tier.threshold;
            return (
              <div
                key={tier.threshold}
                className={`class-widget__tier ${isActive ? 'class-widget__tier--active' : 'class-widget__tier--locked'}`}
              >
                <span className="class-widget__tier-threshold">{tier.threshold}+</span>
                <span className="class-widget__tier-benefit">{tier.benefit}</span>
                {tier.minLevel > 1 && (
                  <span className="class-widget__level-badge">L{tier.minLevel}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Aspect Info */}
        {aspectData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{aspectData.name} Aspect</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {aspectData.description}
            </p>
          </div>
        )}

        {/* Ferocity Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Ferocity Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll 1d3 Ferocity</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round you take damage: <strong>+1 Ferocity</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/encounter you become winded or dying: <strong>+1d3 Ferocity</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">M-2 ({might - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">M-1 ({might - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">M ({might})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuryWidget;
