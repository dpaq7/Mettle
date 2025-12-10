import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  title: string;
  showArrow?: boolean;
  variant?: 'default' | 'compact' | 'subtle' | 'accent';
  className?: string;
  onClick?: () => void;
  collapsed?: boolean;
}

/**
 * Decorative section header matching the Draw Steel character sheet style.
 * Features centered text with decorative line dividers and optional arrow.
 *
 * Example: ─────────── SECTION NAME ───────────
 *                         ▼
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showArrow = false,
  variant = 'default',
  className = '',
  onClick,
  collapsed,
}) => {
  const isCollapsible = onClick !== undefined;
  const collapsedClass = collapsed !== undefined ? (collapsed ? 'collapsed' : 'expanded') : '';

  return (
    <div
      className={`section-header-component ${variant} ${isCollapsible ? 'collapsible' : ''} ${collapsedClass} ${className}`}
      onClick={onClick}
      role={isCollapsible ? 'button' : undefined}
      tabIndex={isCollapsible ? 0 : undefined}
      onKeyDown={(e) => {
        if (isCollapsible && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="section-header-line">
        <span className="section-header-text">{title}</span>
      </div>
      {showArrow && (
        <div className="section-header-arrow">▼</div>
      )}
    </div>
  );
};

export default SectionHeader;
