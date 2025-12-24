/**
 * Level progression utilities for Draw Steel XP system
 *
 * Draw Steel uses a milestone-based XP system where Victories convert to XP during Respite.
 * Heroes level up when they reach the XP threshold for the next level.
 */

// XP thresholds - total XP needed to reach each level (from Draw Steel Heroic Advancement Table)
// Each level requires 16 XP to progress to the next
export const XP_THRESHOLDS: Record<number, number> = {
  1: 0,    // Starting level (0-15 XP)
  2: 16,   // 16 XP to reach level 2 (16-31 XP)
  3: 32,   // 32 XP to reach level 3 (32-47 XP)
  4: 48,   // 48 XP to reach level 4 (48-63 XP)
  5: 64,   // 64 XP to reach level 5 (64-79 XP)
  6: 80,   // 80 XP to reach level 6 (80-95 XP)
  7: 96,   // 96 XP to reach level 7 (96-111 XP)
  8: 112,  // 112 XP to reach level 8 (112-127 XP)
  9: 128,  // 128 XP to reach level 9 (128-143 XP)
  10: 144, // 144 XP to reach level 10 (144+ XP, max level)
};

export const MAX_LEVEL = 10;

/**
 * Get the XP required to reach a specific level
 */
export function getXpForLevel(level: number): number {
  if (level < 1) return 0;
  if (level > MAX_LEVEL) return XP_THRESHOLDS[MAX_LEVEL];
  return XP_THRESHOLDS[level] ?? 0;
}

/**
 * Get the XP needed for the next level from current level
 * Returns 0 if at max level
 */
export function getXpToNextLevel(currentLevel: number, currentXp: number): number {
  if (currentLevel >= MAX_LEVEL) return 0;
  const nextLevelXp = XP_THRESHOLDS[currentLevel + 1];
  return Math.max(0, nextLevelXp - currentXp);
}

/**
 * Calculate progress percentage toward next level (0-100)
 * Returns 100 if at max level
 */
export function getLevelProgress(currentLevel: number, currentXp: number): number {
  if (currentLevel >= MAX_LEVEL) return 100;

  const currentLevelXp = XP_THRESHOLDS[currentLevel];
  const nextLevelXp = XP_THRESHOLDS[currentLevel + 1];
  const xpInCurrentLevel = currentXp - currentLevelXp;
  const xpRequiredForLevel = nextLevelXp - currentLevelXp;

  if (xpRequiredForLevel <= 0) return 100;

  return Math.min(100, Math.max(0, (xpInCurrentLevel / xpRequiredForLevel) * 100));
}

/**
 * Check if hero can level up (has enough XP for next level)
 */
export function canLevelUp(currentLevel: number, currentXp: number): boolean {
  if (currentLevel >= MAX_LEVEL) return false;
  return currentXp >= XP_THRESHOLDS[currentLevel + 1];
}

/**
 * Get XP range for current level display (e.g., "18/30")
 * Returns "Max" indicator at level 10
 */
export function getXpRangeDisplay(currentLevel: number, currentXp: number): string {
  if (currentLevel >= MAX_LEVEL) return `${currentXp} (Max)`;
  const nextLevelXp = XP_THRESHOLDS[currentLevel + 1];
  return `${currentXp}/${nextLevelXp}`;
}

/**
 * Get the XP required within the current level tier
 * Useful for progress bar calculations
 */
export function getXpRequiredForCurrentLevel(currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) return 0;
  const currentLevelXp = XP_THRESHOLDS[currentLevel];
  const nextLevelXp = XP_THRESHOLDS[currentLevel + 1];
  return nextLevelXp - currentLevelXp;
}

/**
 * Get XP earned within the current level tier
 * Useful for progress bar value calculations
 */
export function getXpWithinCurrentLevel(currentLevel: number, currentXp: number): number {
  const currentLevelXp = XP_THRESHOLDS[currentLevel];
  return Math.max(0, currentXp - currentLevelXp);
}
