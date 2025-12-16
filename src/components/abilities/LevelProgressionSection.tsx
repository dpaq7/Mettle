import React, { useState, useMemo } from 'react';
import { Hero } from '../../types/hero';
import { buildProgressionDisplay } from '../../utils/progression-display';
import {
  progressionTypeConfig,
  LevelProgressionSummary,
  ProgressionDisplayItem,
} from '../../types/class-progression';
import './LevelProgressionSection.css';

interface LevelProgressionSectionProps {
  hero: Hero;
}

const LevelProgressionSection: React.FC<LevelProgressionSectionProps> = ({ hero }) => {
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set([hero.level]));

  // Build progression data (memoized to prevent recalculation)
  const progressionSummaries = useMemo(() => {
    return buildProgressionDisplay(hero);
  }, [hero.level, hero.heroClass, hero.progressionChoices, hero.subclass]);

  const toggleLevel = (level: number) => {
    setExpandedLevels(prev => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allLevels = new Set(progressionSummaries.map(s => s.level));
    setExpandedLevels(allLevels);
  };

  const collapseAll = () => {
    setExpandedLevels(new Set());
  };

  if (progressionSummaries.length === 0) {
    return null;
  }

  return (
    <section className="level-progression-section">
      <div className="progression-header">
        <h3>Level Progression</h3>
        <div className="progression-controls">
          <button
            className="control-btn"
            onClick={expandAll}
            title="Expand all levels"
          >
            Expand All
          </button>
          <button
            className="control-btn"
            onClick={collapseAll}
            title="Collapse all levels"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="progression-levels">
        {progressionSummaries.map(summary => (
          <LevelAccordion
            key={summary.level}
            summary={summary}
            isExpanded={expandedLevels.has(summary.level)}
            onToggle={() => toggleLevel(summary.level)}
            isCurrentLevel={summary.level === hero.level}
          />
        ))}
      </div>
    </section>
  );
};

interface LevelAccordionProps {
  summary: LevelProgressionSummary;
  isExpanded: boolean;
  onToggle: () => void;
  isCurrentLevel: boolean;
}

const LevelAccordion: React.FC<LevelAccordionProps> = ({
  summary,
  isExpanded,
  onToggle,
  isCurrentLevel,
}) => {
  return (
    <div className={`level-accordion ${isExpanded ? 'expanded' : ''} ${isCurrentLevel ? 'current' : ''}`}>
      <button
        className="level-accordion-header"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="level-badge">Lv {summary.level}</span>
        <span className="level-summary">
          {summary.items.length} {summary.items.length === 1 ? 'feature' : 'features'}
        </span>
        <span className="accordion-toggle-icon">{isExpanded ? '−' : '+'}</span>
      </button>

      {isExpanded && (
        <div className="level-accordion-content">
          {summary.items.map(item => (
            <ProgressionItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ProgressionItemProps {
  item: ProgressionDisplayItem;
}

const ProgressionItem: React.FC<ProgressionItemProps> = ({ item }) => {
  const config = progressionTypeConfig[item.type];

  return (
    <div className={`progression-item type-${item.type}`}>
      <div className="item-header">
        <span
          className="item-icon"
          style={{ color: `var(${config.colorVar})` }}
        >
          {config.icon}
        </span>
        <span className="item-type-label">{config.label}</span>
        <span className="item-name">{item.name}</span>
      </div>

      <p className="item-description">{item.description}</p>

      {item.isChoice && item.chosenOptionName && (
        <div className="item-choice">
          <span className="choice-label">Chosen:</span>
          <span className="choice-value">{item.chosenOptionName}</span>
        </div>
      )}

      {item.isSubclassSpecific && item.subclassId && (
        <span className="subclass-badge">
          {item.subclassId.charAt(0).toUpperCase() + item.subclassId.slice(1)}
        </span>
      )}
    </div>
  );
};

export default LevelProgressionSection;
