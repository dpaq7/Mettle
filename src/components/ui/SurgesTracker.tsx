import React, { useCallback } from 'react';
import './SurgesTracker.css';

interface SurgesTrackerProps {
  current: number;
  max: number;
  onCurrentChange: (value: number) => void;
  className?: string;
}

/**
 * Surges Tracker with vertical hexagon indicators.
 * Click hexagons to mark surges as used/available.
 */
const SurgesTracker: React.FC<SurgesTrackerProps> = ({
  current,
  max,
  onCurrentChange,
  className = '',
}) => {
  const handleSurgeClick = useCallback((index: number) => {
    const clickedPosition = index + 1;

    if (clickedPosition <= current) {
      // Clicking on a used surge
      if (clickedPosition === current) {
        // If it's the last used one, restore it (decrease current)
        onCurrentChange(current - 1);
      } else {
        // Clicking earlier surge - set to that amount
        onCurrentChange(clickedPosition);
      }
    } else {
      // Clicking on available surge - use surges up to here
      onCurrentChange(clickedPosition);
    }
  }, [current, onCurrentChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSurgeClick(index);
    }
  }, [handleSurgeClick]);

  return (
    <div className={`surges-tracker ${className}`}>
      <div className="surges-grid">
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            className={`surge-hexagon-wrapper ${i < current ? 'used' : 'available'}`}
            onClick={() => handleSurgeClick(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            aria-label={`Surge ${i + 1}: ${i < current ? 'used' : 'available'}`}
            type="button"
          >
            <div className="surge-hexagon-border" />
            <div className="surge-hexagon-inner">
              <span className="surge-number">{i + 1}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="surges-count">
        {current} / {max} used
      </div>
    </div>
  );
};

export default SurgesTracker;
