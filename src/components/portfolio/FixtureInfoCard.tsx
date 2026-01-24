import React from 'react';
import { FixtureTemplate } from '@/types/minion';
import './FixtureInfoCard.css';

interface FixtureInfoCardProps {
  fixture: FixtureTemplate;
  heroLevel: number;
}

export const FixtureInfoCard: React.FC<FixtureInfoCardProps> = ({
  fixture,
  heroLevel,
}) => {
  // Fixture stamina is 20 + hero level
  const actualStamina = fixture.baseStamina + heroLevel;
  // Size becomes 3 at level 9
  const actualSize = heroLevel >= 9 ? 3 : fixture.size;

  const isLevel5Unlocked = heroLevel >= 5;
  const isLevel9Unlocked = heroLevel >= 9;

  return (
    <div className="fixture-info-card">
      {/* Header */}
      <div className="fixture-info-header">
        <div className="fixture-info-name-row">
          <h3 className="fixture-info-name">{fixture.name}</h3>
          <span className="fixture-info-type-badge">{fixture.portfolioType}</span>
        </div>
        <span className="fixture-info-role">{fixture.role}</span>
      </div>

      {/* Flavor Text */}
      {fixture.flavorText && (
        <div className="fixture-info-flavor">
          <p>{fixture.flavorText}</p>
        </div>
      )}

      {/* Stats */}
      <div className="fixture-info-stats">
        <div className="fixture-info-stat">
          <span className="fixture-info-stat-label">Stamina</span>
          <span className="fixture-info-stat-value">{actualStamina}</span>
          <span className="fixture-info-stat-formula">(20 + Level)</span>
        </div>
        <div className="fixture-info-stat">
          <span className="fixture-info-stat-label">Size</span>
          <span className="fixture-info-stat-value">{actualSize}</span>
          {heroLevel >= 9 && (
            <span className="fixture-info-stat-bonus">+1 at L9</span>
          )}
        </div>
      </div>

      {/* Base Traits */}
      {fixture.traits.length > 0 && (
        <div className="fixture-info-traits">
          <span className="fixture-info-section-label">Traits</span>
          {fixture.traits.map((trait, index) => (
            <div key={index} className="fixture-info-trait">
              <span className="trait-name">{trait.name}</span>
              <p className="trait-description">{trait.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Level 5 Feature */}
      <div className={`fixture-info-level-feature ${!isLevel5Unlocked ? 'locked' : ''}`}>
        <div className="level-feature-header">
          <span className="level-badge">Level 5</span>
          {!isLevel5Unlocked && <span className="unlock-note">Unlocks at level 5</span>}
        </div>
        <div className="level-feature-content">
          <span className="feature-name">{fixture.level5Feature.name}</span>
          <p className="feature-description">{fixture.level5Feature.description}</p>
        </div>
      </div>

      {/* Level 9 Features */}
      <div className={`fixture-info-level-feature ${!isLevel9Unlocked ? 'locked' : ''}`}>
        <div className="level-feature-header">
          <span className="level-badge">Level 9</span>
          {!isLevel9Unlocked && <span className="unlock-note">Unlocks at level 9</span>}
        </div>
        {fixture.level9Features.map((feature, index) => (
          <div key={index} className="level-feature-content">
            <span className="feature-name">{feature.name}</span>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixtureInfoCard;
