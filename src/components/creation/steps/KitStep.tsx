import React from 'react';
import { Kit } from '@/types';
import { GameData } from '@/lib/game-rules';

interface KitStepProps {
  selectedKit: Kit | null;
  onSelect: (kit: Kit) => void;
}

export const KitStep: React.FC<KitStepProps> = ({ selectedKit, onSelect }) => {
  const kits = GameData.getAllKits();

  return (
    <div className="creation-step">
      <h2>Choose Your Kit</h2>
      <p className="step-description">Your kit determines your starting equipment and stats</p>
      <div className="options-grid">
        {kits.map((kit) => (
          <div
            key={kit.id}
            className={`option-card ${selectedKit?.id === kit.id ? 'selected' : ''}`}
            onClick={() => onSelect(kit as Kit)}
          >
            <h3>{kit.name}</h3>
            <p>Stamina: +{kit.staminaPerEchelon}/echelon</p>
            <p>Speed: +{kit.speedBonus} | Stability: +{kit.stabilityBonus}</p>
            <p>Armor: {kit.armor}</p>
            <p>Weapons: {kit.weapons.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitStep;
