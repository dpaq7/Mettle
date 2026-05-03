import { useHeroContext } from '@/context/HeroContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn';
import { Minus, Plus, Heart, Shield } from 'lucide-react';
import './ResourcePopovers.css';

interface StaminaPopoverProps {
  children: React.ReactNode;
}

export function StaminaPopover({ children }: StaminaPopoverProps) {
  const { hero, updateHero } = useHeroContext();

  if (!hero) return <>{children}</>;

  const { current, max } = hero.stamina;
  const temporary = hero.stamina.temporary ?? 0;

  // Calculate thresholds per Draw Steel rules
  const windedThreshold = Math.floor(max / 2);
  const deathThreshold = -Math.floor(max / 2);

  // Auto-calculate status
  const isWinded = current <= windedThreshold;
  const isDying = current <= 0;
  const isDead = current <= deathThreshold;

  // Calculate progress percentage
  const progressPercent = Math.max(0, Math.min(100, (current / max) * 100));
  const windedPercent = (windedThreshold / max) * 100;

  const handleCurrentChange = (delta: number) => {
    if (delta < 0 && temporary > 0) {
      const damage = Math.abs(delta);
      const absorbed = Math.min(temporary, damage);
      const remainingDamage = damage - absorbed;
      const newCurrent = Math.max(deathThreshold, current - remainingDamage);

      updateHero({
        stamina: {
          ...hero.stamina,
          current: newCurrent,
          temporary: temporary - absorbed,
        },
      });
      return;
    }

    const newValue = Math.max(deathThreshold, Math.min(max, current + delta));
    updateHero({
      stamina: { ...hero.stamina, current: newValue },
    });
  };

  const handleTemporaryChange = (delta: number) => {
    const newTemporary = Math.max(0, temporary + delta);
    updateHero({
      stamina: { ...hero.stamina, temporary: newTemporary },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="resource-popover stamina-popover">
        {/* Header */}
        <div className="resource-popover-header">
          <Heart size={16} className="resource-popover-icon" />
          <h3 className="resource-popover-title">Stamina</h3>
        </div>

        {/* Progress Bar with Winded Marker */}
        <div className="stamina-progress-container">
          <div className="stamina-progress-bar">
            <div
              className={`stamina-progress-fill ${isDying ? 'dying' : isWinded ? 'winded' : ''}`}
              style={{ width: `${progressPercent}%` }}
            />
            {/* Winded threshold marker */}
            <div
              className="stamina-winded-marker"
              style={{ left: `${windedPercent}%` }}
              title={`Winded at ${windedThreshold}`}
            />
          </div>
        </div>

        {/* Current Value Display */}
        <div className="resource-value-display">
          <span className={`resource-current-large ${isDying ? 'dying' : isWinded ? 'winded' : ''}`}>
            {current}
          </span>
          <span className="resource-separator">/</span>
          <span className="resource-max">{max}</span>
        </div>

        {/* Temporary Stamina */}
        <div className={`temp-stamina-panel ${temporary > 0 ? 'active' : ''}`}>
          <div className="temp-stamina-header">
            <Shield size={14} />
            <span>Temporary</span>
            <strong>+{temporary}</strong>
          </div>
          <div className="resource-controls-grid temp-controls">
            <button
              className="resource-adjust-btn large"
              onClick={() => handleTemporaryChange(-5)}
              disabled={temporary <= 0}
            >
              <Minus size={12} />5
            </button>
            <button
              className="resource-adjust-btn"
              onClick={() => handleTemporaryChange(-1)}
              disabled={temporary <= 0}
            >
              <Minus size={14} />
            </button>
            <button
              className="resource-adjust-btn"
              onClick={() => handleTemporaryChange(1)}
            >
              <Plus size={14} />
            </button>
            <button
              className="resource-adjust-btn large"
              onClick={() => handleTemporaryChange(5)}
            >
              <Plus size={12} />5
            </button>
          </div>
        </div>

        {/* Status Badges */}
        <div className="stamina-status-badges">
          {isWinded && !isDying && (
            <span className="status-badge winded">WINDED</span>
          )}
          {isDying && !isDead && (
            <span className="status-badge dying">DYING</span>
          )}
          {isDead && (
            <span className="status-badge dead">DEAD</span>
          )}
          {temporary > 0 && (
            <span className="status-badge temp">TEMP +{temporary}</span>
          )}
        </div>

        {/* Controls */}
        <div className="resource-controls-grid">
          <button
            className="resource-adjust-btn large"
            onClick={() => handleCurrentChange(-5)}
            disabled={current - 5 < deathThreshold}
          >
            <Minus size={12} />5
          </button>
          <button
            className="resource-adjust-btn"
            onClick={() => handleCurrentChange(-1)}
            disabled={current <= deathThreshold}
          >
            <Minus size={14} />
          </button>
          <button
            className="resource-adjust-btn"
            onClick={() => handleCurrentChange(1)}
            disabled={current >= max}
          >
            <Plus size={14} />
          </button>
          <button
            className="resource-adjust-btn large"
            onClick={() => handleCurrentChange(5)}
            disabled={current + 5 > max}
          >
            <Plus size={12} />5
          </button>
        </div>

        {/* Info Footer */}
        <div className="resource-popover-footer">
          <span className="resource-info">
            Winded at {windedThreshold} | Dead at {deathThreshold} | Temp absorbs damage first
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default StaminaPopover;
