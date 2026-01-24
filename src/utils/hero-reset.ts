/**
 * Hero Reset Utilities
 *
 * Provides functions to reset hero progression while preserving character identity.
 * Used by the Respec Wizard for progression-only respec.
 */

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
