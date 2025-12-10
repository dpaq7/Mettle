import React, { useCallback } from 'react';
import './StaminaTracker.css';

interface StaminaTrackerProps {
  current: number;
  max: number;
  temporary: number;
  winded: boolean;
  dying: boolean;
  dyingThreshold: number;
  onCurrentChange: (value: number) => void;
  onMaxChange?: (value: number) => void;
  onTemporaryChange: (value: number) => void;
  onWindedChange: (value: boolean) => void;
  onDyingChange: (value: boolean) => void;
  className?: string;
}

/**
 * Stamina Tracker component matching Draw Steel character sheet.
 * Shows current stamina with adjustment arrows, temporary/max boxes,
 * and Winded/Dying indicators below.
 */
const StaminaTracker: React.FC<StaminaTrackerProps> = ({
  current,
  max,
  temporary,
  winded,
  dying,
  dyingThreshold,
  onCurrentChange,
  onMaxChange,
  onTemporaryChange,
  onWindedChange,
  onDyingChange,
  className = '',
}) => {
  // Auto-calculate winded status: current <= max/2
  const isAutoWinded = current <= Math.floor(max / 2);
  const isAutoDying = current <= dyingThreshold;

  const handleCurrentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // Allow negative values up to -winded threshold (death occurs at negative winded value)
      const minValue = -Math.floor(max / 2);
      onCurrentChange(Math.max(minValue, Math.min(max + temporary, value)));
    }
  }, [max, temporary, onCurrentChange]);

  const handleIncrement = useCallback(() => {
    const maxValue = max + temporary;
    if (current < maxValue) {
      onCurrentChange(current + 1);
    }
  }, [current, max, temporary, onCurrentChange]);

  const handleDecrement = useCallback(() => {
    const minValue = -Math.floor(max / 2);
    if (current > minValue) {
      onCurrentChange(current - 1);
    }
  }, [current, max, onCurrentChange]);

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      onMaxChange?.(value);
    }
  }, [onMaxChange]);

  const handleTemporaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      onTemporaryChange(value);
    } else if (e.target.value === '') {
      onTemporaryChange(0);
    }
  }, [onTemporaryChange]);

  return (
    <div className={`stamina-tracker ${className}`}>
      {/* Main Stamina Box */}
      <div className="stamina-main-box">
        <div className="stamina-current-section">
          <input
            type="number"
            className="stamina-input current"
            value={current}
            onChange={handleCurrentChange}
          />
        </div>

        <div className="stamina-adjust-section">
          <button
            className="stamina-adjust-btn up"
            onClick={handleIncrement}
            disabled={current >= max + temporary}
            aria-label="Increase stamina"
            type="button"
          >
            ▲
          </button>
          <button
            className="stamina-adjust-btn down"
            onClick={handleDecrement}
            disabled={current <= -Math.floor(max / 2)}
            aria-label="Decrease stamina"
            type="button"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Temporary and Max - compact row */}
      <div className="stamina-secondary-row">
        <div className="stamina-box-compact">
          <span className="box-label">Temp</span>
          <input
            type="number"
            className="stamina-input compact"
            value={temporary}
            onChange={handleTemporaryChange}
            min={0}
          />
        </div>

        <div className="stamina-box-compact">
          <span className="box-label">Max</span>
          {onMaxChange ? (
            <input
              type="number"
              className="stamina-input compact"
              value={max}
              onChange={handleMaxChange}
              min={1}
            />
          ) : (
            <div className="stamina-value-compact">{max}</div>
          )}
        </div>
      </div>

      {/* Status Indicators - below boxes */}
      <div className="stamina-status-row">
        <div className="status-indicator">
          <button
            className={`status-diamond ${winded || isAutoWinded ? 'active' : ''}`}
            onClick={() => onWindedChange(!winded)}
            aria-label={`Winded: ${winded || isAutoWinded ? 'active' : 'inactive'}`}
            type="button"
          />
          <span className="status-label">Winded</span>
        </div>

        <div className="status-indicator">
          <button
            className={`status-diamond dying ${dying || isAutoDying ? 'active' : ''}`}
            onClick={() => onDyingChange(!dying)}
            aria-label={`Dying: ${dying || isAutoDying ? 'active' : 'inactive'}`}
            type="button"
          />
          <span className="status-label">Dying</span>
        </div>
      </div>
    </div>
  );
};

export default StaminaTracker;
