// Subclass selection component for character creation
// Supports all 10 hero classes, including multi-select for Conduit (2 domains)

import React from 'react';
import { HeroClass } from '../../types/hero';
import {
  classDefinitions,
  getSubclassSelectCount,
  requiresMultipleSubclasses,
} from '../../data/classes/class-definitions';
import './SubclassSelector.css';

interface SubclassSelectorProps {
  heroClass: HeroClass;
  // Single selection (for most classes)
  selectedSubclass: string | null;
  onSelect: (subclassId: string) => void;
  // Multi-selection (for Conduit)
  selectedSubclasses?: string[];
  onMultiSelect?: (subclassIds: string[]) => void;
}

const SubclassSelector: React.FC<SubclassSelectorProps> = ({
  heroClass,
  selectedSubclass,
  onSelect,
  selectedSubclasses = [],
  onMultiSelect,
}) => {
  const classDef = classDefinitions[heroClass];
  const isMultiSelect = requiresMultipleSubclasses(heroClass);
  const selectCount = getSubclassSelectCount(heroClass);

  if (!classDef) {
    return <div>Unknown class</div>;
  }

  const handleSelect = (subclassId: string) => {
    if (isMultiSelect && onMultiSelect) {
      // Toggle selection for multi-select (Conduit)
      const isSelected = selectedSubclasses.includes(subclassId);
      if (isSelected) {
        onMultiSelect(selectedSubclasses.filter(id => id !== subclassId));
      } else if (selectedSubclasses.length < selectCount) {
        onMultiSelect([...selectedSubclasses, subclassId]);
      }
    } else {
      onSelect(subclassId);
    }
  };

  const isOptionSelected = (subclassId: string): boolean => {
    if (isMultiSelect) {
      return selectedSubclasses.includes(subclassId);
    }
    return selectedSubclass === subclassId;
  };

  const isOptionDisabled = (subclassId: string): boolean => {
    if (isMultiSelect) {
      return selectedSubclasses.length >= selectCount && !selectedSubclasses.includes(subclassId);
    }
    return false;
  };

  const getSelectionStatus = (): string => {
    if (isMultiSelect) {
      return `${selectedSubclasses.length} / ${selectCount} selected`;
    }
    return selectedSubclass ? '1 selected' : 'None selected';
  };

  return (
    <div className="creation-step subclass-selection-step">
      <h2>
        Choose Your {isMultiSelect ? classDef.subclassNamePlural : classDef.subclassName}
      </h2>
      <p className="step-description">
        {isMultiSelect ? (
          <>
            Select {selectCount} {classDef.subclassNamePlural?.toLowerCase() || 'subclasses'} that define your divine connection.
            Your chosen domains determine your ward abilities and triggered actions.
          </>
        ) : (
          <>
            Select a {classDef.subclassName.toLowerCase()} to specialize your {classDef.name}'s abilities.
          </>
        )}
      </p>

      {isMultiSelect && (
        <div className="selection-status">
          {getSelectionStatus()}
        </div>
      )}

      <div className={`subclass-grid ${isMultiSelect ? 'multi-select' : ''} ${classDef.subclasses.length === 3 ? 'three-cols' : ''}`}>
        {classDef.subclasses.map((subclass) => {
          const selected = isOptionSelected(subclass.id);
          const disabled = isOptionDisabled(subclass.id);

          return (
            <div
              key={subclass.id}
              className={`subclass-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && handleSelect(subclass.id)}
            >
              <div className="subclass-header">
                <h3 className="subclass-name">{subclass.name}</h3>
              </div>

              <p className="subclass-description">
                {subclass.description}
              </p>

              {selected && (
                <div className="selected-indicator">
                  {isMultiSelect ? '✓' : 'Selected'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubclassSelector;
