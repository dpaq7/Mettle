/**
 * CombatManagerHeader
 *
 * Displays the resource status for the Summoner in combat:
 * - Current essence (with icon)
 * - Minion count: current/max
 * - Squad count: current/2
 * - Turn number
 */

import { memo } from 'react';
import { Sparkles, Users, Flag, Clock } from 'lucide-react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { isSummonerHero } from '@/types/hero';
import { useEssence } from '@/hooks/useEssence';

export const CombatManagerHeader = memo(function CombatManagerHeader() {
  const { hero } = useHeroContext();
  const { turnState, combatTurnNumber } = useCombatContext();
  const { currentEssence, getMinionCounts, getSquadCount } = useEssence();

  if (!hero || !isSummonerHero(hero)) {
    return null;
  }

  const { current: currentMinions, max: maxMinions } = getMinionCounts();
  const squadCount = getSquadCount();
  const maxSquads = 2;

  // Determine if any resources are at limit
  const isAtMinionLimit = currentMinions >= maxMinions;
  const isAtSquadLimit = squadCount >= maxSquads;

  return (
    <div className="combat-manager-header">
      <h2 className="combat-manager-title">Combat Minions</h2>

      <div className="combat-manager-resources">
        {/* Essence */}
        <div className="combat-resource-item combat-resource-item--essence">
          <div className="combat-resource-icon">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="combat-resource-value">{currentEssence}</span>
            <span className="combat-resource-label"> Essence</span>
          </div>
        </div>

        {/* Turn */}
        <div className="combat-resource-item">
          <div className="combat-resource-icon">
            <Clock size={16} />
          </div>
          <div>
            <span className="combat-resource-value">Turn {combatTurnNumber}</span>
          </div>
        </div>

        {/* Minion Count */}
        <div className={`combat-resource-item ${isAtMinionLimit ? 'combat-resource-item--warning' : ''}`}>
          <div className="combat-resource-icon">
            <Users size={16} />
          </div>
          <div>
            <span className="combat-resource-value">{currentMinions}/{maxMinions}</span>
            <span className="combat-resource-label"> Minions</span>
          </div>
        </div>

        {/* Squad Count */}
        <div className={`combat-resource-item ${isAtSquadLimit ? 'combat-resource-item--warning' : ''}`}>
          <div className="combat-resource-icon">
            <Flag size={16} />
          </div>
          <div>
            <span className="combat-resource-value">{squadCount}/{maxSquads}</span>
            <span className="combat-resource-label"> Squads</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CombatManagerHeader;
