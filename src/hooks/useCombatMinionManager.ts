/**
 * useCombatMinionManager
 *
 * Hook to auto-open the secondary detail pane when a Summoner enters combat.
 * This allows the Combat Minion Manager to be displayed automatically,
 * leaving the main detail pane available for browsing the character sheet.
 *
 * Usage: Call this hook in AppShell or a similar top-level component.
 */

import { useEffect, useRef } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { useSecondaryDetail } from '@/context/SecondaryDetailContext';
import { isSummonerHero } from '@/types/hero';

export function useCombatMinionManager() {
  const { hero } = useHeroContext();
  const { isInCombat } = useCombatContext();
  const { openSecondary, closeSecondary, lockPanel, unlockPanel, type } = useSecondaryDetail();

  // Track previous combat state to detect transition
  const wasInCombat = useRef(false);

  useEffect(() => {
    // Only act on combat state transitions
    const justEnteredCombat = isInCombat && !wasInCombat.current;
    const justExitedCombat = !isInCombat && wasInCombat.current;

    // Update ref for next render
    wasInCombat.current = isInCombat;

    // Only auto-open for Summoner heroes
    if (!hero || !isSummonerHero(hero)) {
      return;
    }

    if (justEnteredCombat) {
      // Open the combat minion manager and lock it in place during combat
      openSecondary('combat-minions', 'summoner');
      lockPanel('combat-minions', 'summoner');
    }

    if (justExitedCombat) {
      // Unlock and close the panel when exiting combat
      unlockPanel();
      if (type === 'combat-minions') {
        closeSecondary();
      }
    }
  }, [isInCombat, hero, openSecondary, closeSecondary, lockPanel, unlockPanel, type]);
}

export default useCombatMinionManager;
