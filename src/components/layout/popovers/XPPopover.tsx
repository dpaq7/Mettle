import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn';
import { Star, Sparkles, ChevronUp } from 'lucide-react';
import {
  canLevelUp,
  getLevelProgress,
  getXpToNextLevel,
  MAX_LEVEL,
} from '@/utils/levelProgression';
import './ResourcePopovers.css';

interface XPPopoverProps {
  children: React.ReactNode;
}

// Get echelon name based on level
function getEchelon(level: number): { number: number; name: string } {
  if (level <= 3) return { number: 1, name: '1st Echelon' };
  if (level <= 6) return { number: 2, name: '2nd Echelon' };
  if (level <= 9) return { number: 3, name: '3rd Echelon' };
  return { number: 4, name: '4th Echelon' };
}

export function XPPopover({ children }: XPPopoverProps) {
  const { hero } = useHeroContext();
  const { navigateTo } = useNavigation();

  if (!hero) return <>{children}</>;

  const level = hero.level || 1;
  const xp = hero.xp || 0;
  const isMaxLevel = level >= MAX_LEVEL;
  const canLevel = canLevelUp(level, xp);
  const progress = getLevelProgress(level, xp);
  const xpToNext = getXpToNextLevel(level, xp);
  const echelon = getEchelon(level);

  const handleLevelUp = () => {
    // Navigate to character section, level-up item
    navigateTo('character', 'level-up');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="resource-popover xp-popover">
        {/* Header */}
        <div className="resource-popover-header">
          <Star size={16} className="resource-popover-icon heroic" />
          <h3 className="resource-popover-title">Experience</h3>
        </div>

        {/* Level and Echelon */}
        <div className="xp-level-header">
          <span className="xp-level-value">Level {level}</span>
          <span className="xp-echelon-badge">{echelon.name}</span>
        </div>

        {/* XP Progress Bar */}
        {!isMaxLevel && (
          <div className="xp-progress-container">
            <div className="xp-progress-bar">
              <div
                className={`xp-progress-fill ${canLevel ? 'ready' : ''}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="xp-progress-text">
              <span>{Math.floor(progress)}%</span>
            </div>
          </div>
        )}

        {/* XP Value Display */}
        <div className="xp-value-display">
          <span className={`xp-current ${canLevel ? 'ready' : ''}`}>
            {xp}
          </span>
          <span className="xp-label">XP</span>
        </div>

        {/* XP to next level info */}
        {!isMaxLevel && !canLevel && (
          <div className="xp-to-next">
            <ChevronUp size={14} />
            <span>{xpToNext} XP to Level {level + 1}</span>
          </div>
        )}

        {/* Level Up Ready Badge */}
        {canLevel && (
          <div className="xp-ready-badge">
            <Sparkles size={14} />
            <span>Ready to Level Up!</span>
          </div>
        )}

        {/* Max Level Badge */}
        {isMaxLevel && (
          <div className="xp-max-badge">
            <span>Maximum Level</span>
          </div>
        )}

        {/* Level Up / View Details Button */}
        <button
          className={`level-up-button ${!canLevel ? 'view-details' : ''}`}
          onClick={handleLevelUp}
        >
          {canLevel ? (
            <>
              <Sparkles size={16} />
              <span>Level Up!</span>
            </>
          ) : (
            <span>View Details</span>
          )}
        </button>

        {/* Info Footer */}
        <div className="resource-popover-footer">
          <span className="resource-info">
            16 XP per level • Next echelon at Lv {echelon.number === 1 ? 4 : echelon.number === 2 ? 7 : echelon.number === 3 ? 10 : 10}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default XPPopover;
