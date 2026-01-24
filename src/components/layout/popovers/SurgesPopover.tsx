import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn';
import { Minus, Plus, Sparkles } from 'lucide-react';
import './ResourcePopovers.css';

interface SurgesPopoverProps {
  children: React.ReactNode;
}

export function SurgesPopover({ children }: SurgesPopoverProps) {
  const { hero, updateHero } = useHeroContext();
  const { isInCombat } = useCombatContext();

  if (!hero) return <>{children}</>;

  const current = hero.surges;

  const handleSurgesChange = (delta: number) => {
    const newValue = Math.max(0, current + delta);
    updateHero({ surges: newValue });
  };

  const handleSpendSurge = () => {
    if (current > 0) {
      updateHero({ surges: current - 1 });
    }
  };

  // Generate hexagon indicators
  const renderHexagons = () => {
    const hexes = [];
    // Show up to 6 hexagon slots (most common surge count)
    const maxDisplay = Math.max(6, current);
    for (let i = 0; i < maxDisplay; i++) {
      hexes.push(
        <span
          key={i}
          className={`surge-hexagon ${i < current ? 'filled' : 'empty'}`}
        >
          ⬡
        </span>
      );
    }
    return hexes;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="resource-popover surges-popover">
        {/* Header */}
        <div className="resource-popover-header">
          <Sparkles size={16} className="resource-popover-icon heroic" />
          <h3 className="resource-popover-title">Surges</h3>
        </div>

        {/* Hexagon Display */}
        <div className="surges-hexagons-row">
          {renderHexagons()}
        </div>

        {/* Current Value Display */}
        <div className="resource-value-display">
          <span className={`resource-current-large ${current > 0 ? 'has-surges' : ''}`}>
            {current}
          </span>
        </div>

        {/* Status Badge */}
        {isInCombat && current > 0 && (
          <div className="surges-available-badge">
            <span className="status-badge surge-ready">READY TO USE</span>
          </div>
        )}

        {/* Controls */}
        <div className="resource-controls-row">
          <button
            className="resource-adjust-btn"
            onClick={() => handleSurgesChange(-1)}
            disabled={current <= 0}
          >
            <Minus size={14} />
          </button>
          <button
            className="resource-adjust-btn"
            onClick={() => handleSurgesChange(1)}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Spend Surge Button (combat only) */}
        {isInCombat && (
          <button
            className={`spend-surge-button ${current <= 0 ? 'disabled' : ''}`}
            onClick={handleSpendSurge}
            disabled={current <= 0}
          >
            <Sparkles size={16} />
            <span>Spend Surge</span>
          </button>
        )}

        {/* Info Footer */}
        <div className="resource-popover-footer">
          <span className="resource-info">
            {isInCombat
              ? 'Spend on abilities or add +3 damage'
              : 'Surges reset at combat start'}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SurgesPopover;
