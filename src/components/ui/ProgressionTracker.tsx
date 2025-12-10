import React, { useCallback } from 'react';
import CharacterPortrait from './CharacterPortrait';
import './ProgressionTracker.css';

interface ProgressionTrackerProps {
  // Victories
  victories: number;
  maxVictories?: number;
  onVictoriesChange: (count: number) => void;

  // Level
  level: number;

  // Gold
  gold: number;
  onGoldChange?: (gold: number) => void;

  // Renown
  renown: number;
  onRenownChange?: (renown: number) => void;

  // XP
  xp: {
    current: number;
    needed: number;
  };

  // Portrait
  portraitUrl?: string | null;
  onPortraitChange?: (imageUrl: string | null) => void;

  // Optional
  className?: string;
}

/**
 * Progression Tracker component matching Draw Steel character sheet.
 * Displays Victories (with connected box tracker), Level, Wealth, Renown, and XP.
 */
const ProgressionTracker: React.FC<ProgressionTrackerProps> = ({
  victories,
  maxVictories = 12,
  onVictoriesChange,
  level,
  gold,
  onGoldChange,
  renown,
  onRenownChange,
  xp,
  portraitUrl,
  onPortraitChange,
  className = '',
}) => {
  const handleVictoryClick = useCallback((index: number) => {
    const clickedPosition = index + 1;

    if (clickedPosition <= victories) {
      if (clickedPosition === victories) {
        onVictoriesChange(victories - 1);
      } else {
        onVictoriesChange(clickedPosition);
      }
    } else {
      onVictoriesChange(clickedPosition);
    }
  }, [victories, onVictoriesChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleVictoryClick(index);
    }
  }, [handleVictoryClick]);

  const handleGoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 99999) {
      onGoldChange?.(value);
    } else if (e.target.value === '') {
      onGoldChange?.(0);
    }
  };

  const handleRenownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 12) {
      onRenownChange?.(value);
    } else if (e.target.value === '') {
      onRenownChange?.(0);
    }
  };

  // Show portrait section if onPortraitChange callback is provided
  const hasPortrait = onPortraitChange !== undefined;

  return (
    <div className={`progression-tracker ${hasPortrait ? 'with-portrait' : ''} ${className}`}>
      {/* Main progression content */}
      <div className="progression-main">
        {/* Victories Section */}
        <div className="victories-section">
          <div className="victories-label">Victories:</div>
          <div className="victories-boxes">
            {Array.from({ length: maxVictories }, (_, i) => (
              <button
                key={i}
                className={`victory-box ${i < victories ? 'filled' : ''}`}
                onClick={() => handleVictoryClick(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                aria-label={`Victory ${i + 1}${i < victories ? ' (achieved)' : ''}`}
                type="button"
              />
            ))}
            <div className="victory-box-end" aria-hidden="true" />
          </div>
        </div>

        {/* Level Section */}
        <div className="level-section">
          <div className="level-label">Level</div>
          <div className="level-value">{level}</div>
        </div>

        {/* Bottom Stats Row */}
        <div className="stats-row">
          <div className="stat-cell wealth-cell">
            <div className="stat-label">Gold</div>
            <div className="gold-input-row">
              <input
                type="number"
                className="gold-input"
                value={gold}
                onChange={handleGoldChange}
                min={0}
                max={99999}
                placeholder="0"
                aria-label="Gold amount"
              />
              <span className="gold-label">gp</span>
            </div>
          </div>

          <div className="stat-cell renown-cell">
            <div className="stat-label">Renown</div>
            <div className="renown-input-wrapper">
              <input
                type="number"
                className="renown-input"
                value={renown}
                onChange={handleRenownChange}
                min={0}
                max={12}
                aria-label="Renown score"
              />
              <span className="renown-max">/ 12</span>
            </div>
          </div>

          <div className="stat-cell">
            <div className="stat-label">XP / Epic</div>
            <div className="stat-value">
              {xp.current}
              <span className="separator">/</span>
              <span className="secondary">{xp.needed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait Section */}
      {hasPortrait && (
        <div className="portrait-section">
          <CharacterPortrait
            imageUrl={portraitUrl ?? null}
            onImageChange={onPortraitChange}
            shape="octagon"
            size="medium"
            altText="Character portrait"
          />
        </div>
      )}
    </div>
  );
};

export default ProgressionTracker;
