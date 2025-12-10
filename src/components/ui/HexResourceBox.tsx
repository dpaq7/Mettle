import React from 'react';
import './HexResourceBox.css';

interface HexResourceBoxProps {
  value: number;
  label: string;
  max?: number;
  onChange?: (value: number) => void;
  onClick?: () => void;
  color?: 'accent' | 'essence' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * Hexagonal resource box for Heroic Resource (Essence), Surges, etc.
 * Matches the Draw Steel character sheet hexagonal containers.
 */
const HexResourceBox: React.FC<HexResourceBoxProps> = ({
  value,
  label,
  max,
  onChange,
  onClick,
  color = 'accent',
  size = 'md',
  disabled = false,
}) => {
  const isClickable = (!!onClick || !!onChange) && !disabled;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onChange && (max === undefined || value < max)) {
      onChange(value + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onChange && value > 0) {
      onChange(value - 1);
    }
  };

  const handleClick = () => {
    if (isClickable && onClick) onClick();
  };

  return (
    <div
      className={`hex-resource-box ${size} ${color} ${isClickable ? 'clickable' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className="hex-shape">
        <span className="hex-label">{label}</span>
        <div className="hex-value-container">
          {onChange && (
            <button
              className="hex-adjust-btn"
              onClick={handleDecrement}
              disabled={disabled || value <= 0}
              aria-label="Decrease"
            >
              −
            </button>
          )}
          <span className="hex-value">
            {value}
            {max !== undefined && <span className="hex-max">/{max}</span>}
          </span>
          {onChange && (
            <button
              className="hex-adjust-btn"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && value >= max)}
              aria-label="Increase"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HexResourceBox;
