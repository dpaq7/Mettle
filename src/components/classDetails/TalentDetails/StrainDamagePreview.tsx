import React from 'react';
import './StrainView.css';

interface StrainDamagePreviewProps {
  negativeClarityAmount: number; // How negative (e.g., 3 for Clarity of -3)
}

/**
 * StrainDamagePreview - Warning display when Talent is Strained
 * Shows the damage they will take at end of turn (1 per negative Clarity)
 */
export const StrainDamagePreview: React.FC<StrainDamagePreviewProps> = ({
  negativeClarityAmount,
}) => {
  if (negativeClarityAmount <= 0) {
    return null;
  }

  return (
    <div className="strain-damage-preview">
      <div className="strain-damage-preview__header">
        <span className="strain-damage-preview__icon">!</span>
        <span className="strain-damage-preview__title">STRAINED</span>
      </div>
      <div className="strain-damage-preview__body">
        <p className="strain-damage-preview__description">
          At the end of your turn, you take damage equal to your negative Clarity.
        </p>
        <div className="strain-damage-preview__damage">
          <span className="strain-damage-preview__damage-label">Damage at turn end:</span>
          <span className="strain-damage-preview__damage-value">{negativeClarityAmount}</span>
        </div>
        <p className="strain-damage-preview__note">
          Many abilities have additional negative effects while Strained.
        </p>
      </div>
    </div>
  );
};

export default StrainDamagePreview;
