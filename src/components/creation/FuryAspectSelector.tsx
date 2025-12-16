// Fury Aspect (subclass) and Stormwight Kit selection for character creation
import React from 'react';
import { FuryAspect, StormwightKit } from '../../types/hero';
import { furyAspects } from '../../data/fury/subclasses';
import { stormwightKits } from '../../data/fury/stormwight-kits';
import './FuryAspectSelector.css';

interface FuryAspectSelectorProps {
  selectedAspect: FuryAspect | null;
  onSelectAspect: (aspect: FuryAspect) => void;
  selectedKit: StormwightKit | null;
  onSelectKit: (kit: StormwightKit) => void;
}

const FuryAspectSelector: React.FC<FuryAspectSelectorProps> = ({
  selectedAspect,
  onSelectAspect,
  selectedKit,
  onSelectKit,
}) => {
  const aspects = Object.values(furyAspects);
  const kits = Object.values(stormwightKits);

  return (
    <div className="fury-aspect-selector">
      <div className="selection-section">
        <h2>Choose Your Primordial Aspect</h2>
        <p className="section-desc">
          Your Aspect determines your source of primal power and the benefits of Growing Ferocity.
        </p>

        <div className="aspect-grid">
          {aspects.map((aspect) => (
            <div
              key={aspect.id}
              className={`aspect-card ${selectedAspect === aspect.id ? 'selected' : ''}`}
              onClick={() => onSelectAspect(aspect.id)}
            >
              <div className="aspect-name">{aspect.name}</div>
              <div className="aspect-theme">{aspect.theme}</div>
              <div className="aspect-description">{aspect.description}</div>
              <div className="aspect-focus">
                Focus: <span className="focus-char">{aspect.focusCharacteristic}</span>
              </div>
              {selectedAspect === aspect.id && (
                <div className="selected-indicator">Selected</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedAspect === 'stormwight' && (
        <div className="selection-section kit-section">
          <h3>Choose Your Stormwight Kit</h3>
          <p className="section-desc">
            Your Kit determines your animal form and Primordial Storm damage type.
          </p>

          <div className="kit-grid">
            {kits.map((kit) => (
              <div
                key={kit.id}
                className={`kit-card ${selectedKit === kit.id ? 'selected' : ''}`}
                onClick={() => onSelectKit(kit.id)}
              >
                <div className="kit-name">{kit.name}</div>
                <div className="kit-storm">
                  {kit.primordialStormName} ({kit.primordialStorm})
                </div>
                <div className="kit-description">{kit.description}</div>
                <div className="kit-forms">
                  <div className="form-info">
                    <strong>Animal:</strong> {kit.animalFormBenefits}
                  </div>
                  <div className="form-info">
                    <strong>Hybrid:</strong> {kit.hybridFormBenefits}
                  </div>
                </div>
                {selectedKit === kit.id && (
                  <div className="selected-indicator">Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FuryAspectSelector;
