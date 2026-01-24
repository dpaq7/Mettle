import { describe, it, expect } from 'vitest';
import { GameData } from '../game-rules';

describe('GameData', () => {
  describe('getMinLevelForAbilityCost', () => {
    it('returns level 1 for 3-cost abilities', () => {
      expect(GameData.getMinLevelForAbilityCost(3)).toBe(1);
    });

    it('returns level 1 for 5-cost abilities', () => {
      expect(GameData.getMinLevelForAbilityCost(5)).toBe(1);
    });

    it('returns level 3 for 7-cost abilities', () => {
      expect(GameData.getMinLevelForAbilityCost(7)).toBe(3);
    });

    it('returns level 5 for 9-cost abilities', () => {
      expect(GameData.getMinLevelForAbilityCost(9)).toBe(5);
    });

    it('returns level 8 for 11-cost abilities', () => {
      expect(GameData.getMinLevelForAbilityCost(11)).toBe(8);
    });

    it('returns level 1 for 0-cost abilities', () => {
      expect(GameData.getMinLevelForAbilityCost(0)).toBe(1);
    });
  });

  describe('canUseAbilityAtLevel', () => {
    it('allows level 1 hero to use 3-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(1, 3)).toBe(true);
    });

    it('allows level 1 hero to use 5-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(1, 5)).toBe(true);
    });

    it('prevents level 1 hero from using 7-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(1, 7)).toBe(false);
    });

    it('allows level 3 hero to use 7-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(3, 7)).toBe(true);
    });

    it('prevents level 4 hero from using 9-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(4, 9)).toBe(false);
    });

    it('allows level 5 hero to use 9-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(5, 9)).toBe(true);
    });

    it('prevents level 7 hero from using 11-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(7, 11)).toBe(false);
    });

    it('allows level 8 hero to use 11-cost abilities', () => {
      expect(GameData.canUseAbilityAtLevel(8, 11)).toBe(true);
    });

    it('allows level 10 hero to use all abilities', () => {
      expect(GameData.canUseAbilityAtLevel(10, 3)).toBe(true);
      expect(GameData.canUseAbilityAtLevel(10, 5)).toBe(true);
      expect(GameData.canUseAbilityAtLevel(10, 7)).toBe(true);
      expect(GameData.canUseAbilityAtLevel(10, 9)).toBe(true);
      expect(GameData.canUseAbilityAtLevel(10, 11)).toBe(true);
    });
  });
});
