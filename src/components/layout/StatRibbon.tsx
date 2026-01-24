import React, { useState, forwardRef } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { useRollHistory } from '@/context/RollHistoryContext';
import { calculateSpeed } from '@/utils/calculations';
import { GameData } from '@/lib/game-rules';
import { canLevelUp, getXpRangeDisplay } from '@/utils/levelProgression';
import { Zap, History } from 'lucide-react';
import { DicePopover } from './DicePopover';
import {
  StaminaPopover,
  RecoveriesPopover,
  HeroicResourcePopover,
  SurgesPopover,
  VictoriesPopover,
  XPPopover,
} from './popovers';
import './StatRibbon.css';

interface StatRibbonItemProps {
  label: string;
  value: string | number;
  warning?: boolean;
  critical?: boolean;
  accent?: boolean;
  levelUpReady?: boolean;
  clickable?: boolean;
}

// Use forwardRef so PopoverTrigger can attach ref properly
const StatRibbonItem = React.forwardRef<HTMLButtonElement, StatRibbonItemProps>(
  ({ label, value, warning, critical, accent, levelUpReady, clickable, ...props }, ref) => {
    const classNames = [
      'stat-ribbon-item',
      warning ? 'warning' : '',
      critical ? 'critical' : '',
      accent ? 'accent' : '',
      levelUpReady ? 'level-up-ready' : '',
      clickable ? 'clickable' : '',
    ].filter(Boolean).join(' ');

    // If clickable, render as button for proper popover triggering
    if (clickable) {
      return (
        <button
          ref={ref}
          type="button"
          className={classNames}
          {...props}
        >
          <span className="stat-ribbon-label">{label}</span>
          <span className="stat-ribbon-value">{value}</span>
        </button>
      );
    }

    return (
      <div className={classNames}>
        <span className="stat-ribbon-label">{label}</span>
        <span className="stat-ribbon-value">{value}</span>
      </div>
    );
  }
);

StatRibbonItem.displayName = 'StatRibbonItem';

// Heroic Resource button with forwardRef for popover
interface HeroicResourceButtonProps {
  abbreviation: string;
  value: number;
}

const HeroicResourceButton = forwardRef<HTMLButtonElement, HeroicResourceButtonProps>(
  ({ abbreviation, value, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className="stat-ribbon-item accent clickable"
      {...props}
    >
      <Zap className="stat-ribbon-icon" size={14} />
      <span className="stat-ribbon-label">{abbreviation}</span>
      <span className="stat-ribbon-value">{value}</span>
    </button>
  )
);

HeroicResourceButton.displayName = 'HeroicResourceButton';

export function StatRibbon() {
  const { hero } = useHeroContext();
  const { isInCombat, essenceState } = useCombatContext();
  const { isHistoryOpen, toggleHistory } = useRollHistory();
  const [diceOpen, setDiceOpen] = useState(false);

  if (!hero) {
    return (
      <div className="stat-ribbon stat-ribbon-empty">
        <span className="stat-ribbon-placeholder">No character loaded</span>
      </div>
    );
  }

  const resourceConfig = GameData.getClassResourceConfig(hero.heroClass);
  const speed = calculateSpeed(hero.kit);

  // Calculate stamina state
  const isWinded = hero.stamina.current <= hero.stamina.winded;
  const isDying = hero.stamina.current <= 0;

  // Calculate level up state
  const isLevelUpReady = canLevelUp(hero.level, hero.xp || 0);
  const xpDisplay = getXpRangeDisplay(hero.level, hero.xp || 0);

  // Format characteristic as +N or -N
  const formatMod = (value: number) => (value >= 0 ? `+${value}` : `${value}`);

  return (
    <div className={`stat-ribbon ${isInCombat ? 'combat' : ''}`}>
      {/* Characteristics */}
      <StatRibbonItem label="MGT" value={formatMod(hero.characteristics.might)} />
      <StatRibbonItem label="AGI" value={formatMod(hero.characteristics.agility)} />
      <StatRibbonItem label="REA" value={formatMod(hero.characteristics.reason)} />
      <StatRibbonItem label="INT" value={formatMod(hero.characteristics.intuition)} />
      <StatRibbonItem label="PRS" value={formatMod(hero.characteristics.presence)} />

      {/* Derived Stats */}
      <StatRibbonItem label="SPD" value={speed} />

      {/* Victories - Clickable with Popover */}
      <VictoriesPopover>
        <StatRibbonItem
          label="VIC"
          value={hero.victories || 0}
          accent={(hero.victories || 0) > 0}
          clickable
        />
      </VictoriesPopover>

      {/* Level & XP - Clickable with Popover */}
      <XPPopover>
        <StatRibbonItem
          label={`Lv${hero.level}`}
          value={xpDisplay}
          levelUpReady={isLevelUpReady}
          clickable
        />
      </XPPopover>

      {/* Stamina - Clickable with Popover */}
      <StaminaPopover>
        <StatRibbonItem
          label="STM"
          value={`${hero.stamina.current}/${hero.stamina.max}`}
          warning={isWinded && !isDying}
          critical={isDying}
          clickable
        />
      </StaminaPopover>

      {/* Recoveries - Clickable with Popover */}
      <RecoveriesPopover>
        <StatRibbonItem label="REC" value={hero.recoveries.current} clickable />
      </RecoveriesPopover>

      {/* Heroic Resource - Clickable with Popover */}
      <HeroicResourcePopover>
        <HeroicResourceButton
          abbreviation={resourceConfig.abbreviation}
          value={hero.heroicResource.current}
        />
      </HeroicResourcePopover>

      {/* Combat-only items */}
      {isInCombat && (
        <>
          <div className="stat-ribbon-divider" />
          <StatRibbonItem label="Turn" value={essenceState.turnNumber || 1} />
          <SurgesPopover>
            <StatRibbonItem
              label="Surges"
              value={hero.surges}
              accent={hero.surges > 0}
              clickable
            />
          </SurgesPopover>
        </>
      )}

      {/* Spacer to push dice controls to the right */}
      <div className="stat-ribbon-spacer" />

      {/* Dice Rolling Controls */}
      <div className="stat-ribbon-dice-controls">
        <DicePopover open={diceOpen} onOpenChange={setDiceOpen} />
        <button
          className={`stat-ribbon-history-toggle ${isHistoryOpen ? 'active' : ''}`}
          onClick={toggleHistory}
          title="Toggle Roll History"
        >
          <History size={16} aria-hidden="true" />
          <span>History</span>
        </button>
      </div>
    </div>
  );
}

export default StatRibbon;
