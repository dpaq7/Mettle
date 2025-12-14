// Class selection component for character creation
// Displays all 10 Draw Steel hero classes with descriptions

import React from 'react';
import { HeroClass } from '../../types/hero';
import { classDefinitions } from '../../data/classes/class-definitions';
import './ClassSelector.css';

interface ClassSelectorProps {
  selectedClass: HeroClass | null;
  onSelect: (heroClass: HeroClass) => void;
}

// Role descriptions for the legend
const roleDescriptions: Record<string, string> = {
  Defender: 'Protects allies and controls enemy positioning. High stamina and survivability.',
  Support: 'Enhances allies and provides healing or buffs. Enables team synergy.',
  Striker: 'Deals high single-target damage. Mobile and deadly.',
  Controller: 'Manipulates the battlefield with area effects and crowd control.',
};

// Get CSS class name for role
const getRoleClass = (role: string): string => {
  return role.toLowerCase();
};

const ClassSelector: React.FC<ClassSelectorProps> = ({ selectedClass, onSelect }) => {
  const classes = Object.values(classDefinitions);

  return (
    <div className="creation-step class-selection-step">
      <h2>Choose Your Class</h2>
      <p className="step-description">
        Select a heroic class that defines your role in combat and your unique abilities.
      </p>

      {/* Role Legend at the top */}
      <div className="role-legend-box">
        <h4>Combat Roles</h4>
        <div className="role-descriptions">
          {Object.entries(roleDescriptions).map(([role, description]) => (
            <div key={role} className="role-description-item">
              <span className={`role-tag ${getRoleClass(role)}`}>{role}</span>
              <span className="role-desc-text">{description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="options-grid class-grid">
        {classes.map((classDef) => (
          <div
            key={classDef.id}
            className={`option-card class-card ${selectedClass === classDef.id ? 'selected' : ''}`}
            onClick={() => onSelect(classDef.id)}
          >
            <div className="class-header">
              <h3>{classDef.name}</h3>
              <span className={`role-tag ${getRoleClass(classDef.role)}`}>
                {classDef.role}
              </span>
            </div>
            <p className="description">{classDef.description}</p>
            <div className="class-stats">
              <div className="stat-row">
                <span className="stat-label">Stamina:</span>
                <span className="stat-value">{classDef.startingStamina}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Resource:</span>
                <span className="stat-value resource-name">{classDef.heroicResource.name}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Potency:</span>
                <span className="stat-value">
                  {classDef.potencyCharacteristic.charAt(0).toUpperCase() +
                    classDef.potencyCharacteristic.slice(1)}
                </span>
              </div>
            </div>
            <div className="class-subclass">
              <span className="subclass-label">{classDef.subclassName}:</span>
              <span className="subclass-options">
                {classDef.subclasses.slice(0, 3).map((sub) => sub.name).join(', ')}
                {classDef.subclasses.length > 3 && '...'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassSelector;
