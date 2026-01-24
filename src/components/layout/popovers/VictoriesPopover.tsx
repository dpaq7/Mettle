import { useHeroContext } from '@/context/HeroContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn';
import { Minus, Plus, Trophy, ArrowRight, Info } from 'lucide-react';
import './ResourcePopovers.css';

interface VictoriesPopoverProps {
  children: React.ReactNode;
}

export function VictoriesPopover({ children }: VictoriesPopoverProps) {
  const { hero, updateHero } = useHeroContext();

  if (!hero) return <>{children}</>;

  const victories = hero.victories || 0;

  const handleVictoriesChange = (delta: number) => {
    const newValue = Math.max(0, victories + delta);
    updateHero({ victories: newValue });
  };

  const handleConvertToXP = () => {
    if (victories <= 0) return;

    const currentXP = hero.xp || 0;
    updateHero({
      xp: currentXP + victories,
      victories: 0,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="resource-popover victories-popover">
        {/* Header */}
        <div className="resource-popover-header">
          <Trophy size={16} className="resource-popover-icon heroic" />
          <h3 className="resource-popover-title">Victories</h3>
        </div>

        {/* Current Value Display */}
        <div className="resource-value-display">
          <span className={`resource-current-large ${victories > 0 ? 'has-surges' : ''}`}>
            {victories}
          </span>
        </div>

        {/* Controls */}
        <div className="resource-controls-row">
          <button
            className="resource-adjust-btn"
            onClick={() => handleVictoriesChange(-1)}
            disabled={victories <= 0}
          >
            <Minus size={14} />
          </button>
          <button
            className="resource-adjust-btn"
            onClick={() => handleVictoriesChange(1)}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Pending XP Info */}
        {victories > 0 && (
          <div className="victories-pending-info">
            <span className="victories-pending-label">Pending XP:</span>
            <span className="victories-pending-value">+{victories}</span>
          </div>
        )}

        {/* Convert Button */}
        <button
          className={`convert-xp-button ${victories <= 0 ? 'disabled' : ''}`}
          onClick={handleConvertToXP}
          disabled={victories <= 0}
        >
          <span>Convert to XP</span>
          {victories > 0 && (
            <>
              <ArrowRight size={14} />
              <span className="convert-xp-amount">+{victories}</span>
            </>
          )}
        </button>

        {/* Info Footer */}
        <div className="resource-popover-footer victories-footer">
          <Info size={12} className="victories-info-icon" />
          <span className="resource-info">
            Victories convert to XP during Respite
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default VictoriesPopover;
