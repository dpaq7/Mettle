/**
 * CombatMinionManager
 *
 * Secondary detail pane component that auto-opens when a Summoner enters combat.
 * Displays free signature minion selection at combat start, then transitions
 * to an ongoing summoning/squad management interface.
 *
 * Draw Steel SRD Rules:
 * - Max Minions: 8 base, +4 at L4/L7/L10, Horde formation +4
 * - Max Squads: 2 total
 * - Combat Start: 2 free signature minions, essence = victories
 * - Each Turn: +2 essence, 3 free signature minions (varies by formation/level)
 * - Sacrifice: 1 per turn, reduces essence cost by 1 per minion sacrificed
 */

import { memo } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { isSummonerHero } from '@/types/hero';
import { CombatManagerHeader } from './combat-manager/CombatManagerHeader';
import { FreeMinionSelection } from './combat-manager/FreeMinionSelection';
import { MinionSummoningGrid } from './combat-manager/MinionSummoningGrid';
import { SquadQuickList } from './combat-manager/SquadQuickList';
import './CombatMinionManager.css';

export const CombatMinionManager = memo(function CombatMinionManager() {
  const { hero } = useHeroContext();
  const { essenceState, isInCombat } = useCombatContext();

  // This component is only for Summoner heroes
  if (!hero || !isSummonerHero(hero)) {
    return (
      <div className="combat-minion-manager combat-minion-manager--empty">
        <p className="combat-manager-empty-text">
          Combat Minion Manager is only available for Summoner heroes.
        </p>
      </div>
    );
  }

  if (!isInCombat) {
    return (
      <div className="combat-minion-manager combat-minion-manager--empty">
        <p className="combat-manager-empty-text">
          Enter combat to manage your minions.
        </p>
      </div>
    );
  }

  const hasPendingSelections = essenceState.pendingFreeMinions > 0;

  return (
    <div className="combat-minion-manager">
      <CombatManagerHeader />

      <div className="combat-manager-body">
        <SquadQuickList />

        {hasPendingSelections ? (
          <FreeMinionSelection />
        ) : (
          <MinionSummoningGrid />
        )}
      </div>
    </div>
  );
});

export default CombatMinionManager;
