/**
 * CompactMinionCard
 *
 * Small minion card for the combat minion manager grid.
 * Shows: name, essence cost badge, role indicator, and visual state.
 *
 * Visual states:
 * - available: Can summon (clickable)
 * - selected: Currently selected (for free summon)
 * - disabled: Cannot summon (insufficient essence, at limit, etc.)
 * - locked: Not unlocked by level
 * - free: No essence cost (free summon available)
 */

import { memo } from 'react';
import { Sparkles } from 'lucide-react';
import { MinionTemplate } from '@/types';

export type CompactMinionCardState = 'available' | 'selected' | 'disabled' | 'locked' | 'free';

export interface CompactMinionCardProps {
  template: MinionTemplate;
  state: CompactMinionCardState;
  essenceCost?: number; // Actual cost after formation adjustments
  showAsFree?: boolean;
  reason?: string; // Reason why disabled/locked
  onClick?: () => void;
}

export const CompactMinionCard = memo(function CompactMinionCard({
  template,
  state,
  essenceCost,
  showAsFree = false,
  reason,
  onClick,
}: CompactMinionCardProps) {
  const isDisabled = state === 'disabled' || state === 'locked';
  const displayCost = showAsFree ? 0 : (essenceCost ?? template.essenceCost);

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isDisabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`compact-minion-card compact-minion-card--${state}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-label={`${template.name}, ${showAsFree ? 'free' : `${displayCost} essence`}${reason ? `, ${reason}` : ''}`}
    >
      <div className="compact-minion-header">
        <h4 className="compact-minion-name">{template.name}</h4>
        <div className={`compact-minion-cost ${showAsFree ? 'compact-minion-cost--free' : ''}`}>
          {showAsFree ? (
            'FREE'
          ) : (
            <>
              {displayCost}
              <Sparkles size={10} />
            </>
          )}
        </div>
      </div>

      <div className="compact-minion-footer">
        <span className="compact-minion-role">{template.role}</span>
        {template.minionsPerSummon > 1 && (
          <span className="compact-minion-count">x{template.minionsPerSummon}</span>
        )}
        {reason && state !== 'available' && state !== 'selected' && state !== 'free' && (
          <span className="compact-minion-reason">{reason}</span>
        )}
      </div>
    </div>
  );
});

export default CompactMinionCard;
