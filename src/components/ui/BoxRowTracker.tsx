import React from 'react';
import './BoxRowTracker.css';

interface BoxRowTrackerProps {
  current: number;
  max: number;
  onChange?: (value: number) => void;
  winded?: number;
  dying?: number;
  label?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * Connected box row tracker for stamina, victories, etc.
 * Matches the Draw Steel character sheet box row style.
 */
const BoxRowTracker: React.FC<BoxRowTrackerProps> = ({
  current,
  max,
  onChange,
  winded,
  dying,
  label,
  showLabels = true,
  size = 'md',
  disabled = false,
}) => {
  const handleClick = (index: number) => {
    if (disabled || !onChange) return;
    // Click on filled = reduce to that point
    // Click on empty = fill up to that point
    const newValue = index < current ? index : index + 1;
    onChange(Math.max(0, Math.min(newValue, max)));
  };

  return (
    <div className={`box-row-tracker ${size} ${disabled ? 'disabled' : ''}`}>
      {label && (
        <div className="box-row-header">
          <span className="box-row-label">{label}</span>
        </div>
      )}
      <div className="box-row">
        {Array.from({ length: max }, (_, i) => {
          const isFilled = i < current;
          const isWindedMarker = winded !== undefined && i === winded - 1;
          const isDyingMarker = dying !== undefined && i === dying - 1;

          return (
            <div
              key={i}
              className={`box-cell
                ${isFilled ? 'filled' : ''}
                ${isWindedMarker ? 'winded-marker' : ''}
                ${isDyingMarker ? 'dying-marker' : ''}
                ${isWindedMarker && current <= winded! ? 'threshold-active' : ''}
                ${isDyingMarker && current <= dying! ? 'threshold-active' : ''}
              `}
              onClick={() => handleClick(i)}
              role="button"
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                  e.preventDefault();
                  handleClick(i);
                }
              }}
              aria-label={`${label || 'Box'} ${i + 1} of ${max}${isFilled ? ', filled' : ', empty'}`}
            />
          );
        })}
      </div>
      {showLabels && (
        <div className="box-row-labels">
          <span>Current: {current}</span>
          {winded !== undefined && <span className="winded-label">Winded: ≤{winded}</span>}
          <span>Max: {max}</span>
        </div>
      )}
    </div>
  );
};

export default BoxRowTracker;
