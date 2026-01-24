import { useHeroContext } from '@/context/HeroContext';
import { getResourceConfig } from '@/data/class-resources';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn';
import { Minus, Plus, Zap } from 'lucide-react';
import './ResourcePopovers.css';

interface HeroicResourcePopoverProps {
  children: React.ReactNode;
}

export function HeroicResourcePopover({ children }: HeroicResourcePopoverProps) {
  const { hero, updateHero } = useHeroContext();

  if (!hero) return <>{children}</>;

  const resourceConfig = getResourceConfig(hero.heroClass);
  const { current } = hero.heroicResource;
  const { minValue, name, color } = resourceConfig;

  // Talent-specific: check if strained
  const isStrained = hero.heroClass === 'talent' && current < 0;

  // Get class-specific flavor text
  const getFlavorText = () => {
    switch (hero.heroClass) {
      case 'fury':
        return 'Your rage builds with each strike and wound taken.';
      case 'talent':
        return current < 0
          ? 'You are Strained. Your power strains your mind.'
          : 'Your psionic focus sharpens your abilities.';
      case 'null':
        return 'Your mental discipline controls the battlefield.';
      case 'summoner':
      case 'elementalist':
        return 'Essence fuels your magical abilities.';
      case 'censor':
        return 'Divine wrath empowers your judgment.';
      case 'conduit':
        return 'Your piety channels divine power.';
      case 'tactician':
        return 'Focus enables tactical brilliance.';
      case 'shadow':
        return 'Insight reveals hidden truths.';
      case 'troubadour':
        return 'Drama amplifies your performances.';
      default:
        return 'Your heroic resource fuels your abilities.';
    }
  };

  const handleResourceChange = (delta: number) => {
    const newValue = Math.max(minValue, current + delta);
    // Use type assertion to handle discriminated union complexity
    updateHero({
      heroicResource: { ...hero.heroicResource, current: newValue },
    } as any);
  };

  const handleSetValue = (value: number) => {
    const newValue = Math.max(minValue, value);
    // Use type assertion to handle discriminated union complexity
    updateHero({
      heroicResource: { ...hero.heroicResource, current: newValue },
    } as any);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className={`resource-popover heroic-resource-popover ${isStrained ? 'strained' : ''}`}
        style={{ '--resource-accent': color } as React.CSSProperties}
      >
        {/* Header */}
        <div className="resource-popover-header">
          <Zap size={16} className="resource-popover-icon heroic" style={{ color }} />
          <h3 className="resource-popover-title">{name}</h3>
        </div>

        {/* Current Value Display */}
        <div className="heroic-value-display">
          <input
            type="number"
            className="heroic-value-input"
            value={current}
            onChange={(e) => handleSetValue(parseInt(e.target.value) || 0)}
            style={{ color }}
          />
        </div>

        {/* Strained Warning for Talent */}
        {isStrained && (
          <div className="strained-warning">
            <span className="strained-badge">STRAINED</span>
          </div>
        )}

        {/* Flavor Text */}
        <p className="heroic-flavor-text">{getFlavorText()}</p>

        {/* Controls */}
        <div className="resource-controls-grid">
          <button
            className="resource-adjust-btn large"
            onClick={() => handleResourceChange(-5)}
            disabled={current - 5 < minValue}
          >
            <Minus size={12} />5
          </button>
          <button
            className="resource-adjust-btn"
            onClick={() => handleResourceChange(-1)}
            disabled={current <= minValue}
          >
            <Minus size={14} />
          </button>
          <button
            className="resource-adjust-btn"
            onClick={() => handleResourceChange(1)}
          >
            <Plus size={14} />
          </button>
          <button
            className="resource-adjust-btn large"
            onClick={() => handleResourceChange(5)}
          >
            <Plus size={12} />5
          </button>
        </div>

        {/* Info Footer */}
        {minValue < 0 && (
          <div className="resource-popover-footer">
            <span className="resource-info">
              Can go negative (minimum: {minValue})
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default HeroicResourcePopover;
