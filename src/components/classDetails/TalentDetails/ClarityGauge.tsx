import React from 'react';
import './StrainView.css';

interface ClarityGaugeProps {
  current: number;
  minimum: number; // Negative max (e.g., -4 for Reason 3)
  maximum?: number; // Positive max for display purposes
  onChange?: (value: number) => void;
}

/**
 * ClarityGauge - Visual gauge for Talent's Clarity resource
 * Shows positive (cyan) and negative (red/strained) zones
 * Unique among all classes: Clarity can go negative
 */
export const ClarityGauge: React.FC<ClarityGaugeProps> = ({
  current,
  minimum,
  maximum = 10,
  onChange,
}) => {
  const isStrained = current < 0;
  const totalRange = maximum - minimum; // e.g., 10 - (-4) = 14

  // Calculate position as percentage (0% = minimum, 100% = maximum)
  const valuePosition = ((current - minimum) / totalRange) * 100;
  const zeroPosition = ((0 - minimum) / totalRange) * 100;

  // Generate tick marks
  const ticks: number[] = [];
  for (let i = minimum; i <= maximum; i++) {
    ticks.push(i);
  }

  const handleIncrement = () => {
    if (onChange && current < maximum) {
      onChange(current + 1);
    }
  };

  const handleDecrement = () => {
    if (onChange && current > minimum) {
      onChange(current - 1);
    }
  };

  return (
    <div className="clarity-gauge">
      <div className="clarity-gauge__header">
        <span className="clarity-gauge__label">Clarity</span>
        <span className={`clarity-gauge__value ${isStrained ? 'strained' : ''}`}>
          {current}
        </span>
      </div>

      <div className="clarity-gauge__track-container">
        {/* Zone labels */}
        <div className="clarity-gauge__zone-labels">
          <span className="clarity-gauge__zone-label strained">Strained</span>
          <span className="clarity-gauge__zone-label normal">Clarity</span>
        </div>

        {/* Main track */}
        <div className="clarity-gauge__track">
          {/* Negative (strained) zone background */}
          <div
            className="clarity-gauge__zone clarity-gauge__zone--strained"
            style={{ width: `${zeroPosition}%` }}
          />

          {/* Positive zone background */}
          <div
            className="clarity-gauge__zone clarity-gauge__zone--positive"
            style={{ left: `${zeroPosition}%`, width: `${100 - zeroPosition}%` }}
          />

          {/* Zero marker */}
          <div
            className="clarity-gauge__zero-marker"
            style={{ left: `${zeroPosition}%` }}
          />

          {/* Current value indicator */}
          <div
            className={`clarity-gauge__indicator ${isStrained ? 'strained' : ''}`}
            style={{ left: `${Math.max(0, Math.min(100, valuePosition))}%` }}
          >
            <div className="clarity-gauge__indicator-pip" />
          </div>

          {/* Fill bar */}
          {isStrained ? (
            <div
              className="clarity-gauge__fill clarity-gauge__fill--strained"
              style={{
                left: `${valuePosition}%`,
                width: `${zeroPosition - valuePosition}%`
              }}
            />
          ) : (
            <div
              className="clarity-gauge__fill clarity-gauge__fill--positive"
              style={{
                left: `${zeroPosition}%`,
                width: `${valuePosition - zeroPosition}%`
              }}
            />
          )}
        </div>

        {/* Tick marks */}
        <div className="clarity-gauge__ticks">
          {ticks.map((tick) => {
            const tickPosition = ((tick - minimum) / totalRange) * 100;
            const isZero = tick === 0;
            const isNegative = tick < 0;
            return (
              <div
                key={tick}
                className={`clarity-gauge__tick ${isZero ? 'zero' : ''} ${isNegative ? 'negative' : ''}`}
                style={{ left: `${tickPosition}%` }}
              >
                <span className="clarity-gauge__tick-label">{tick}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      {onChange && (
        <div className="clarity-gauge__controls">
          <button
            className="clarity-gauge__btn clarity-gauge__btn--decrement"
            onClick={handleDecrement}
            disabled={current <= minimum}
            aria-label="Decrease Clarity"
          >
            -
          </button>
          <button
            className="clarity-gauge__btn clarity-gauge__btn--increment"
            onClick={handleIncrement}
            disabled={current >= maximum}
            aria-label="Increase Clarity"
          >
            +
          </button>
        </div>
      )}

      {/* Range info */}
      <div className="clarity-gauge__range-info">
        <span className="clarity-gauge__min">Min: {minimum}</span>
        <span className="clarity-gauge__max">Max: {maximum}</span>
      </div>
    </div>
  );
};

export default ClarityGauge;
