import React, { useCallback } from 'react';
import './RecoveriesTracker.css';

interface RecoveriesTrackerProps {
  stamina: number;     // Stamina regained per recovery
  current: number;     // Current recoveries available
  max: number;         // Maximum recoveries
  onCurrentChange: (value: number) => void;
  onUseRecovery?: () => void;  // Optional callback for using a recovery
  className?: string;
}

/**
 * Recoveries Tracker component matching Draw Steel character sheet.
 * Shows recovery stamina value and current/max recoveries with counter buttons.
 */
const RecoveriesTracker: React.FC<RecoveriesTrackerProps> = ({
  stamina,
  current,
  max,
  onCurrentChange,
  onUseRecovery,
  className = '',
}) => {
  const handleIncrement = useCallback(() => {
    if (current < max) onCurrentChange(current + 1);
  }, [current, max, onCurrentChange]);

  const handleDecrement = useCallback(() => {
    if (current > 0) onCurrentChange(current - 1);
  }, [current, onCurrentChange]);

  const handleUseRecovery = useCallback(() => {
    if (current > 0 && onUseRecovery) {
      onUseRecovery();
    }
  }, [current, onUseRecovery]);

  return (
    <div className={`recoveries-tracker ${className}`}>
      <div className="recoveries-boxes">
        <div className="recovery-box">
          <span className="recovery-label">Stamina</span>
          <span className="recovery-value stamina-value">{stamina}</span>
          <span className="recovery-sublabel">per recovery</span>
        </div>

        <div className="recovery-box editable">
          <span className="recovery-label">Recoveries</span>
          <div className="recovery-counter">
            <button
              className="counter-btn"
              onClick={handleDecrement}
              disabled={current <= 0}
              aria-label="Decrease recoveries"
              type="button"
            >
              -
            </button>
            <span className="recovery-value">{current}</span>
            <button
              className="counter-btn"
              onClick={handleIncrement}
              disabled={current >= max}
              aria-label="Increase recoveries"
              type="button"
            >
              +
            </button>
          </div>
          <span className="recovery-max">/ {max}</span>
        </div>
      </div>

      {onUseRecovery && (
        <button
          className="use-recovery-btn"
          onClick={handleUseRecovery}
          disabled={current <= 0}
          title={`Use recovery to restore ${stamina} stamina`}
          type="button"
        >
          Use Recovery (+{stamina})
        </button>
      )}
    </div>
  );
};

export default RecoveriesTracker;
