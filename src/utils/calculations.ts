import { SummonerHero, Formation, Kit, SummonerCircle } from '../types';
import { GameData, type KitDefinition } from '@/lib/game-rules';

// Type for kit-like objects with shared properties
type KitLike = Kit | KitDefinition;

/**
 * Calculate max stamina for a Summoner hero
 * Base: from GameData (Summoner class)
 * Kit: varies by kit
 * Level: +perLevel per level-up (level - 1)
 */
export const calculateMaxStamina = (hero: Partial<SummonerHero>): number => {
  const summonerClass = GameData.getClass('summoner');
  const baseClassStamina = summonerClass?.baseStats.stamina.level1 ?? 15;
  const staminaPerLevel = summonerClass?.baseStats.stamina.perLevel ?? 6;
  const level = hero.level || 1;
  const echelon = Math.ceil(level / 3);
  const kitStamina = (hero.kit?.staminaPerEchelon || 0) * echelon;
  // Each level-up (after level 1) grants stamina per level
  const levelBonus = (level - 1) * staminaPerLevel;
  return baseClassStamina + kitStamina + levelBonus;
};

/**
 * Calculate winded threshold (half of max stamina, rounded down)
 */
export const calculateWindedThreshold = (maxStamina: number): number => {
  return Math.floor(maxStamina / 2);
};

/**
 * Calculate recovery value (1/3 of max stamina, rounded down)
 * Draw Steel: Recovery value = 1/3 of max stamina
 */
export const calculateRecoveryValue = (hero: Partial<SummonerHero>): number => {
  return Math.floor(calculateMaxStamina(hero) / 3);
};

/**
 * Calculate summoner's range for minion summoning
 * Formula: 5 + Reason (SRD specification)
 */
export const calculateSummonerRange = (hero: Partial<SummonerHero>): number => {
  const reason = hero.characteristics?.reason || 2; // Default Reason is 2
  return 5 + reason;
};

/**
 * Calculate maximum number of minions based on formation and level
 * Summoner v1.0 SRD:
 * - Base: 8 minions
 * - Level 4+: +4 (12 total)
 * - Level 7+: +4 (16 total)
 * - Level 10: +4 (20 total)
 * - Horde Formation: +4 additional
 */
export const calculateMaxMinions = (formation: Formation, level: number = 1): number => {
  let max = 8;

  // Minion Improvement bonuses at levels 4, 7, and 10
  if (level >= 4) max += 4;
  if (level >= 7) max += 4;
  if (level >= 10) max += 4;

  // Horde formation allows +4 more
  if (formation === 'horde') {
    max += 4;
  }

  return max;
};

/**
 * Calculate number of signature minions spawned at turn start
 * Summoner v1.0 SRD:
 * - Base: 3 minions
 * - Level 7+ (Minion Improvement): +1 (4 total)
 * - Horde Formation: +1 additional
 */
export const calculateSignatureMinionsPerTurn = (
  formation: Formation,
  level: number = 1
): number => {
  let count = 3;

  // Level 7 Minion Improvement: +1 free summon
  if (level >= 7) count += 1;

  // Horde formation: +1 additional
  if (formation === 'horde') count += 1;

  return count;
};

/**
 * Calculate essence gained per turn
 * Summoner v1.0 SRD:
 * - Base: +2 essence
 * - Level 7+ (Font of Creation): +3 essence instead
 */
export const calculateEssencePerTurn = (level: number): number => {
  return level >= 7 ? 3 : 2;
};

/**
 * Calculate essence gained from minion death
 * Summoner v1.0 SRD:
 * - Base: +1 essence when any minion dies unwillingly within Summoner's Range
 * - Level 4+ (Essence Salvage): +2 essence instead
 * - Limit once per round
 */
export const calculateMinionDeathEssence = (level: number): number => {
  return level >= 4 ? 2 : 1;
};

/**
 * Calculate free signature minions summoned at combat start
 * Summoner v1.0 SRD:
 * - Base: 2 signature minions
 * - Level 10 (Minion Improvement): +2 per 2 Victories
 */
export const calculateCombatStartMinions = (level: number, victories: number): number => {
  let count = 2;

  // Level 10 bonus: +2 per 2 Victories
  if (level >= 10) {
    count += Math.floor(victories / 2) * 2;
  }

  return count;
};

/**
 * Calculate minion stamina bonus from level (Minion Improvement feature)
 * Summoner v1.0 SRD:
 * These bonuses are cumulative and applied at levels 4, 7, and 10.
 *
 * @param essenceCost - The minion's essence cost (1=signature, 3, 5, 7)
 * @param level - The summoner's level
 * @returns Total stamina bonus to add to base stamina
 */
export const calculateMinionLevelStaminaBonus = (
  essenceCost: number,
  level: number
): number => {
  // Signature minions (1 essence): +1 at L4, +1 at L7, +1 at L10
  if (essenceCost === 1) {
    let bonus = 0;
    if (level >= 4) bonus += 1;
    if (level >= 7) bonus += 1;
    if (level >= 10) bonus += 1;
    return bonus;
  }

  // 3-essence minions: +3 at L4, +3 at L7, +3 at L10
  if (essenceCost === 3) {
    let bonus = 0;
    if (level >= 4) bonus += 3;
    if (level >= 7) bonus += 3;
    if (level >= 10) bonus += 3;
    return bonus;
  }

  // 5-essence minions: +2 at L4, +2 at L7, +2 at L10
  if (essenceCost === 5) {
    let bonus = 0;
    if (level >= 4) bonus += 2;
    if (level >= 7) bonus += 2;
    if (level >= 10) bonus += 2;
    return bonus;
  }

  // 7-essence minions: +5 at L7, +5 at L10 (no L4 bonus)
  if (essenceCost === 7) {
    let bonus = 0;
    if (level >= 7) bonus += 5;
    if (level >= 10) bonus += 5;
    return bonus;
  }

  return 0;
};

/**
 * Calculate maximum recoveries
 * Base: from GameData (Summoner class)
 * Circle of Spring: +2 recoveries (Pixie Dust feature)
 */
export const calculateMaxRecoveries = (circle?: SummonerCircle): number => {
  const summonerClass = GameData.getClass('summoner');
  const baseRecoveries = summonerClass?.baseStats.recoveries ?? 8;
  const circleBonus = circle === 'spring' ? 2 : 0; // Pixie Dust feature
  return baseRecoveries + circleBonus;
};

/**
 * Calculate speed from kit (base speed 5 + kit bonus)
 */
export const calculateSpeed = (kit: KitLike | undefined): number => {
  return 5 + (kit?.speedBonus || 0);
};

/**
 * Calculate stability from kit
 */
export const calculateStability = (kit: KitLike | undefined): number => {
  return kit?.stabilityBonus || 0;
};

/**
 * Get kit stamina bonus per echelon
 */
export const getKitStaminaPerEchelon = (kit: Kit | undefined): number => {
  return kit?.staminaPerEchelon || 0;
};

/**
 * Calculate essence cost with formation modifications
 * Summoner v1.0 formations do not modify essence costs.
 */
export const calculateEssenceCost = (
  baseCost: number,
  _formation: Formation
): number => {
  return baseCost;
};

/**
 * Calculate minion bonus stamina from formation
 * Elite formation grants +3 stamina to all minions (SRD)
 */
export const calculateMinionBonusStamina = (formation: Formation): number => {
  return formation === 'elite' ? 3 : 0;
};

/**
 * Calculate minion characteristic bonus from formation
 * Formations do not modify minion characteristics in Summoner v1.0.
 */
export const calculateMinionCharacteristicBonus = (_formation: Formation): number => {
  return 0;
};

/**
 * Calculate minion free strike bonus from formation
 * Platoon adds Reason-score damage to one target of a squad's damaging ability;
 * it does not change the minion stat block free strike value.
 */
export const calculateMinionFreeStrikeBonus = (_formation: Formation): number => {
  return 0;
};

/**
 * Calculate fixture stamina based on level
 * Base: 20 + level
 */
export const calculateFixtureStamina = (level: number): number => {
  return 20 + level;
};

/**
 * Calculate fixture size based on level
 * Base: 2
 * Level 9+: 3
 */
export const calculateFixtureSize = (level: number): number => {
  return level >= 9 ? 3 : 2;
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// =============================================================================
// SACRIFICE MECHANICS (Summoner v1.0 SRD)
// =============================================================================

/**
 * Calculate sacrifice cost reduction
 * Summoner v1.0 SRD:
 * - Base: Sacrificing one or more minions reduces the cost by 1 total
 * - Level 10 (No Matter the Cost): Cost is reduced by the number of minions sacrificed
 *
 * The minionEssenceCosts parameter is retained for backwards-compatible call sites,
 * but Summoner v1.0 keys the level 10 reduction to sacrificed minion count.
 *
 * @param minionsToSacrifice - Number of minions being sacrificed
 * @param level - Summoner's level
 * @param minionEssenceCosts - Array of essence costs for each sacrificed minion (default: all 1s)
 */
export const calculateSacrificeCostReduction = (
  minionsToSacrifice: number,
  level: number,
  _minionEssenceCosts: number[] = []
): number => {
  if (minionsToSacrifice <= 0) return 0;

  if (level >= 10) {
    return minionsToSacrifice;
  }

  return 1;
};

/**
 * Calculate final essence cost after formation and sacrifice adjustments.
 *
 * At level 10, No Matter the Cost explicitly keeps the reduced cost at a
 * minimum of 1. Before level 10 the base sacrifice rule can reduce a cost by 1.
 */
export const calculateEffectiveEssenceCost = (
  baseCost: number,
  formation: Formation,
  level: number,
  sacrificeCount: number = 0
): number => {
  const formationAdjustedCost = calculateEssenceCost(baseCost, formation);
  const reduction = calculateSacrificeCostReduction(sacrificeCount, level);

  if (reduction <= 0) {
    return formationAdjustedCost;
  }

  const minimumCost = level >= 10 ? 1 : 0;
  return Math.max(minimumCost, formationAdjustedCost - reduction);
};

// =============================================================================
// CHAMPION MECHANICS (Summoner v1.0 SRD)
// =============================================================================

/**
 * Check if champion is unlocked
 * Summoner v1.0 SRD: Champion unlocks at Level 8
 */
export const isChampionUnlocked = (level: number): boolean => {
  return level >= 8;
};

/**
 * Check if Champion Action is unlocked (Level 10)
 * Summoner v1.0 SRD: Champion Action costs eidos, once per encounter
 */
export const isChampionActionUnlocked = (level: number): boolean => {
  return level >= 10;
};

/**
 * Calculate champion stamina (includes level-based bonus)
 * Champions get the same stamina improvements as 9-essence minions
 */
export const calculateChampionStamina = (
  baseStamina: number,
  level: number,
  formation: Formation
): number => {
  // Formation bonus (Elite: +3)
  const formationBonus = calculateMinionBonusStamina(formation);
  // Level-based bonus (same as 9-essence minions - treating as 7-essence tier)
  const levelBonus = calculateMinionLevelStaminaBonus(7, level);

  return baseStamina + formationBonus + levelBonus;
};

// =============================================================================
// OUT-OF-COMBAT MECHANICS (Summoner v1.0 SRD)
// =============================================================================

/**
 * Maximum free minions outside combat
 */
export const OUT_OF_COMBAT_MAX_MINIONS = 4;

/**
 * Check if a non-signature minion can be summoned outside combat
 * Summoner v1.0 SRD: Other minions require Victories >= essence cost
 *
 * @param essenceCost - The minion's essence cost
 * @param victories - Current number of Victories
 */
export const canSummonOutOfCombat = (
  essenceCost: number,
  victories: number,
  isSignature: boolean
): boolean => {
  // Signature minions are always freely summonable
  if (isSignature || essenceCost === 1) return true;

  // Other minions require Victories >= essence cost
  return victories >= essenceCost;
};
