import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SummonerHero } from '../types';
import { Hero, SummonerHeroV2, isSummonerHero } from '../types/hero';
import { saveCharacter, loadCharacter, getActiveCharacterId, setActiveCharacterId } from '../utils/storage';

// HeroContext supports all 10 Draw Steel hero classes
// The name is kept as SummonerContext for backward compatibility
interface SummonerContextType {
  hero: Hero | null;
  setHero: (hero: Hero | null) => void;
  updateHero: (updates: Partial<Hero>) => void;
  saveCurrentHero: () => void;
  loadHero: (id: string) => void;
  createNewHero: (hero: Hero) => void;
}

const SummonerContext = createContext<SummonerContextType | undefined>(undefined);

export const useSummonerContext = () => {
  const context = useContext(SummonerContext);
  if (!context) {
    throw new Error('useSummonerContext must be used within a SummonerProvider');
  }
  return context;
};

interface SummonerProviderProps {
  children: ReactNode;
}

/**
 * Convert legacy SummonerHero to polymorphic Hero type
 * Handles migration of old character data
 */
const migrateLegacyHero = (data: any): Hero => {
  // If it already has heroClass, it's already migrated
  if (data.heroClass) {
    return data as Hero;
  }

  // Legacy data without heroClass is assumed to be Summoner
  return {
    ...data,
    heroClass: 'summoner' as const,
    heroicResource: {
      type: 'essence' as const,
      current: data.essence?.current ?? 0,
      maxPerTurn: data.essence?.maxPerTurn ?? 5,
    },
  } as SummonerHeroV2;
};

export const SummonerProvider: React.FC<SummonerProviderProps> = ({ children }) => {
  const [hero, setHeroInternal] = useState<Hero | null>(null);

  const setHero = (newHero: Hero | null) => {
    setHeroInternal(newHero);
  };

  // Load active character on mount
  useEffect(() => {
    const activeId = getActiveCharacterId();
    if (activeId) {
      const loaded = loadCharacter(activeId);
      if (loaded) {
        // Migrate legacy data if needed
        const migratedHero = migrateLegacyHero(loaded);
        setHeroInternal(migratedHero);
      }
    }
  }, []);

  // Auto-save when hero changes
  useEffect(() => {
    if (hero) {
      saveCharacter(hero);
    }
  }, [hero]);

  const updateHero = (updates: Partial<Hero>) => {
    setHeroInternal((prev) => (prev ? { ...prev, ...updates } as Hero : null));
  };

  const saveCurrentHero = () => {
    if (hero) {
      saveCharacter(hero);
    }
  };

  const loadHero = (id: string) => {
    const loaded = loadCharacter(id);
    if (loaded) {
      const migratedHero = migrateLegacyHero(loaded);
      setHeroInternal(migratedHero);
      setActiveCharacterId(id);
    }
  };

  const createNewHero = (newHero: Hero) => {
    setHeroInternal(newHero);
    setActiveCharacterId(newHero.id);
    saveCharacter(newHero);
  };

  const value: SummonerContextType = {
    hero,
    setHero,
    updateHero,
    saveCurrentHero,
    loadHero,
    createNewHero,
  };

  return <SummonerContext.Provider value={value}>{children}</SummonerContext.Provider>;
};
