/**
 * Hero Reset Utilities
 *
 * Provides functions to reset hero progression while preserving character identity.
 * Used by the Respec Wizard for progression-only respec.
 */

import type { Hero, ProgressionChoices } from '@/types';
import { GameData } from '@/lib/game-rules';

/**
 * Reset a hero's progression while preserving character identity.
 * This returns a partial update object to apply to the hero.
 *
 * Preserves:
 * - id, name, title
 * - ancestry, ancestrySelection, culture, career
 * - kit
 * - heroClass, subclass
 * - portraitUrl, notes, story elements
 * - wealth, gold, renown (non-progression resources)
 * - skills, languages (from ancestry/culture/career)
 *
 * Resets:
 * - level → 1
 * - progressionChoices → {}
 * - selectedPerks → []
 * - stamina/recoveries → recalculated for level 1
 * - characteristics → class base values (TODO: should include ancestry bonuses)
 *
 * @param hero - The hero to reset
 * @returns A partial hero object with reset progression fields
 */
export function getResetProgressionUpdates(hero: Hero): Partial<Hero> {
  const classDef = GameData.getClass(hero.heroClass);
  if (!classDef) {
    throw new Error(`Unknown hero class: ${hero.heroClass}`);
  }

  // Calculate base stats for level 1
  const baseStamina = classDef.baseStats.stamina.level1;
  const kitStaminaBonus = hero.kit?.staminaPerEchelon || 0; // Echelon 1 at level 1
  const maxStamina = baseStamina + kitStaminaBonus;
  const baseRecoveries = classDef.baseStats.recoveries;

  // Get starting characteristics for the class
  const startingCharacteristics = {
    might: classDef.startingCharacteristics.might ?? 0,
    agility: classDef.startingCharacteristics.agility ?? 0,
    reason: classDef.startingCharacteristics.reason ?? 0,
    intuition: classDef.startingCharacteristics.intuition ?? 0,
    presence: classDef.startingCharacteristics.presence ?? 0,
  };

  return {
    level: 1,
    characteristics: startingCharacteristics,
    stamina: {
      ...hero.stamina,
      current: maxStamina,
      max: maxStamina,
      winded: Math.floor(maxStamina / 2),
    },
    recoveries: {
      ...hero.recoveries,
      current: baseRecoveries,
      max: baseRecoveries,
    },
    surges: 0,
    heroTokens: 0,
    activeConditions: [],
    progressionChoices: {} as ProgressionChoices,
    selectedPerks: [],
  };
}

/**
 * Get what will be preserved vs reset during a respec.
 * Useful for displaying confirmation dialogs.
 */
export function getRespecPreservationInfo() {
  return {
    preserved: [
      'Name and identity',
      'Ancestry and traits',
      'Culture and career',
      'Kit selection',
      'Class and subclass',
      'XP and victories',
      'Skills and languages',
      'Inventory and equipment',
      'Portrait and notes',
    ],
    reset: [
      'Level (back to 1)',
      'Progression choices (abilities)',
      'Selected perks',
      'Characteristics (back to class base)',
      'Stamina and recoveries',
      'Combat state',
    ],
  };
}
