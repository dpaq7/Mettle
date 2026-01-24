import { useHeroContext } from '@/context/HeroContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn';
import { Minus, Plus, Wind, Shield } from 'lucide-react';
import './ResourcePopovers.css';

interface RecoveriesPopoverProps {
  children: React.ReactNode;
}

export function RecoveriesPopover({ children }: RecoveriesPopoverProps) {
  const { hero, updateHero } = useHeroContext();

  if (!hero) return <>{children}</>;

  const { current, max, value } = hero.recoveries;
  const { current: currentStamina, max: maxStamina } = hero.stamina;

  const canCatchBreath = current > 0 && currentStamina < maxStamina;

  const handleRecoveriesChange = (delta: number) => {
    const newValue = Math.max(0, Math.min(max, current + delta));
    updateHero({
      recoveries: { ...hero.recoveries, current: newValue },
    });
  };

  const handleCatchBreath = () => {
    if (!canCatchBreath) return;

    // Spend 1 recovery, heal by recovery value
    const healAmount = value;
    const newStamina = Math.min(maxStamina, currentStamina + healAmount);

    updateHero({
      recoveries: { ...hero.recoveries, current: current - 1 },
      stamina: { ...hero.stamina, current: newStamina },
    });
  };

  // Generate diamond indicators
  const renderDiamonds = () => {
    const diamonds = [];
    for (let i = 0; i < max; i++) {
      diamonds.push(
        <span
          key={i}
          className={`recovery-diamond ${i < current ? 'filled' : 'empty'}`}
        >
          ◆
        </span>
      );
    }
    return diamonds;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="resource-popover recoveries-popover">
        {/* Header */}
        <div className="resource-popover-header">
          <Shield size={16} className="resource-popover-icon" />
          <h3 className="resource-popover-title">Recoveries</h3>
        </div>

        {/* Diamond Display */}
        <div className="recoveries-diamonds-row">
          {renderDiamonds()}
        </div>

        {/* Current Value Display */}
        <div className="resource-value-display">
          <span className="resource-current-large">{current}</span>
          <span className="resource-separator">/</span>
          <span className="resource-max">{max}</span>
        </div>

        {/* Controls */}
        <div className="resource-controls-row">
          <button
            className="resource-adjust-btn"
            onClick={() => handleRecoveriesChange(-1)}
            disabled={current <= 0}
          >
            <Minus size={14} />
          </button>
          <button
            className="resource-adjust-btn"
            onClick={() => handleRecoveriesChange(1)}
            disabled={current >= max}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Recovery Value Info */}
        <div className="recovery-value-info">
          <span className="recovery-value-label">Recovery Value</span>
          <span className="recovery-value-amount">{value}</span>
        </div>

        {/* Catch Breath Button */}
        <button
          className={`catch-breath-button ${!canCatchBreath ? 'disabled' : ''}`}
          onClick={handleCatchBreath}
          disabled={!canCatchBreath}
        >
          <Wind size={16} />
          <span>Catch Breath</span>
          <span className="catch-breath-heal">+{value} HP</span>
        </button>

        {/* Disabled Reason */}
        {!canCatchBreath && (
          <div className="resource-popover-footer">
            <span className="resource-warning">
              {current <= 0
                ? 'No recoveries remaining'
                : 'Already at full stamina'}
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default RecoveriesPopover;
