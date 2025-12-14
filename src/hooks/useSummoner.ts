import { useCallback } from 'react';
import { useSummonerContext } from '../context/HeroContext';
import { isSummonerHero } from '../types/hero';
import {
  calculateMaxStamina,
  calculateWindedThreshold,
  calculateRecoveryValue,
  calculateMaxRecoveries,
  calculateSpeed,
  calculateStability,
  calculateSummonerRange,
  calculateMaxMinions,
} from '../utils/calculations';

export const useSummoner = () => {
  const { hero, updateHero } = useSummonerContext();

  // Check if hero is a Summoner for Summoner-specific calculations
  const isSummoner = hero && isSummonerHero(hero);

  const dealDamage = useCallback(
    (amount: number) => {
      if (!hero) return;

      // Allow negative stamina for dying state (death occurs at -winded value)
      const newCurrent = hero.stamina.current - amount;
      updateHero({
        stamina: {
          ...hero.stamina,
          current: newCurrent,
        },
      });
    },
    [hero, updateHero]
  );

  const healDamage = useCallback(
    (amount: number) => {
      if (!hero) return;

      const newCurrent = Math.min(hero.stamina.max, hero.stamina.current + amount);
      updateHero({
        stamina: {
          ...hero.stamina,
          current: newCurrent,
        },
      });
    },
    [hero, updateHero]
  );

  const useRecovery = useCallback(() => {
    if (!hero || hero.recoveries.current <= 0) return;

    const healAmount = hero.recoveries.value;
    const newStamina = Math.min(hero.stamina.max, hero.stamina.current + healAmount);

    updateHero({
      stamina: {
        ...hero.stamina,
        current: newStamina,
      },
      recoveries: {
        ...hero.recoveries,
        current: hero.recoveries.current - 1,
      },
    });
  }, [hero, updateHero]);

  const restoreRecoveries = useCallback(() => {
    if (!hero) return;

    updateHero({
      recoveries: {
        ...hero.recoveries,
        current: hero.recoveries.max,
      },
    });
  }, [hero, updateHero]);

  const levelUp = useCallback(() => {
    if (!hero || hero.level >= 10) return;

    const newLevel = hero.level + 1;
    const newMaxStamina = calculateMaxStamina({ ...hero, level: newLevel });
    const newRecoveryValue = calculateRecoveryValue({ ...hero, level: newLevel });
    // Only pass subclass (circle) if hero is a Summoner
    const circle = isSummonerHero(hero) ? hero.subclass : undefined;
    const newMaxRecoveries = calculateMaxRecoveries(circle);

    updateHero({
      level: newLevel,
      stamina: {
        current: newMaxStamina,
        max: newMaxStamina,
        winded: calculateWindedThreshold(newMaxStamina),
      },
      recoveries: {
        current: newMaxRecoveries,
        max: newMaxRecoveries,
        value: newRecoveryValue,
      },
    });
  }, [hero, updateHero]);

  const getStats = useCallback(() => {
    if (!hero) return null;

    // Summoner-specific stats
    const summonerStats = isSummonerHero(hero)
      ? {
          summonerRange: calculateSummonerRange(hero),
          maxMinions: calculateMaxMinions(hero.formation, hero.level),
        }
      : {
          summonerRange: 0,
          maxMinions: 0,
        };

    return {
      maxStamina: hero.stamina.max,
      winded: hero.stamina.winded,
      recoveryValue: hero.recoveries.value,
      speed: calculateSpeed(hero.kit),
      stability: calculateStability(hero.kit),
      ...summonerStats,
    };
  }, [hero]);

  return {
    dealDamage,
    healDamage,
    useRecovery,
    restoreRecoveries,
    levelUp,
    getStats,
  };
};
