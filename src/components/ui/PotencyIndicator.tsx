import React from 'react';
import './PotencyIndicator.css';

type Potency = 'weak' | 'average' | 'strong';

interface PotencyIndicatorProps {
  value: Potency;
  onChange?: (value: Potency) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Three-segment potency selector (Weak/Average/Strong).
 * Matches the Draw Steel character sheet potency indicator.
 */
const PotencyIndicator: React.FC<PotencyIndicatorProps> = ({
  value,
  onChange,
  disabled = false,
  size = 'md',
}) => {
  const potencies: Potency[] = ['weak', 'average', 'strong'];

  const handleSelect = (potency: Potency) => {
    if (!disabled && onChange) {
      onChange(potency);
    }
  };

  return (
    <div className={`potency-indicator ${size} ${disabled ? 'disabled' : ''}`}>
      {potencies.map((potency) => (
        <button
          key={potency}
          className={`potency-option ${value === potency ? 'selected' : ''}`}
          onClick={() => handleSelect(potency)}
          disabled={disabled}
          type="button"
          aria-pressed={value === potency}
        >
          {potency}
        </button>
      ))}
    </div>
  );
};

export default PotencyIndicator;
export type { Potency };
