import React from 'react';
import './PentagonStatBox.css';

interface PentagonStatBoxProps {
  value: number;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  sublabel?: string;
}

/**
 * Pentagon-shaped stat box for main characteristics (Might, Agility, etc.)
 * Matches the Draw Steel character sheet pentagon containers.
 */
const PentagonStatBox: React.FC<PentagonStatBoxProps> = ({
  value,
  label,
  onClick,
  active = false,
  disabled = false,
  sublabel,
}) => {
  const isClickable = !!onClick && !disabled;
  const displayValue = value >= 0 ? `+${value}` : `${value}`;

  const handleClick = () => {
    if (isClickable) onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`pentagon-stat-box ${isClickable ? 'clickable' : ''} ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <svg viewBox="0 0 100 110" className="pentagon-svg">
        <polygon
          points="15,10 85,10 100,30 100,100 0,100 0,30"
          className="pentagon-shape"
        />
        <text x="50" y="65" textAnchor="middle" className="pentagon-value">
          {displayValue}
        </text>
      </svg>
      <span className="pentagon-label">{label}</span>
      {sublabel && <span className="pentagon-sublabel">{sublabel}</span>}
    </div>
  );
};

export default PentagonStatBox;
