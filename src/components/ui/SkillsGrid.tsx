import React from 'react';
import './SkillsGrid.css';

export interface Skill {
  name: string;
  trained: boolean;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsGridProps {
  categories: SkillCategory[];
  onSkillChange?: (categoryIndex: number, skillIndex: number, trained: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
}

/**
 * Two-column skill grid with diamond checkboxes.
 * Matches the Draw Steel character sheet skills layout.
 */
const SkillsGrid: React.FC<SkillsGridProps> = ({
  categories,
  onSkillChange,
  disabled = false,
  compact = false,
}) => {
  const handleSkillClick = (categoryIndex: number, skillIndex: number, currentValue: boolean) => {
    if (!disabled && onSkillChange) {
      onSkillChange(categoryIndex, skillIndex, !currentValue);
    }
  };

  return (
    <div className={`skills-grid-container ${compact ? 'compact' : ''} ${disabled ? 'disabled' : ''}`}>
      {categories.map((category, catIndex) => (
        <div key={category.name} className="skills-section">
          <div className="skills-section-header">
            <div className="skills-header-line" />
            <span className="skills-header-text">{category.name}</span>
            <div className="skills-header-line" />
          </div>
          <div className="skills-grid">
            {category.skills.map((skill, skillIndex) => (
              <div
                key={skill.name}
                className={`skill-item ${skill.trained ? 'trained' : ''}`}
                onClick={() => handleSkillClick(catIndex, skillIndex, skill.trained)}
                role="checkbox"
                aria-checked={skill.trained}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSkillClick(catIndex, skillIndex, skill.trained);
                  }
                }}
              >
                <div className={`skill-diamond ${skill.trained ? 'checked' : ''}`} />
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;
