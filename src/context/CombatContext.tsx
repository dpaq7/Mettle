import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { EssenceEconomy, TurnState, TurnPhase, Squad, Minion, MinionTemplate } from '../types';
import { useHeroContext } from './HeroContext';
import { isSummonerHero, SummonerHeroV2 } from '../types/hero';
import {
  generateId,
  calculateMinionBonusStamina,
  calculateEssencePerTurn,
  calculateMinionDeathEssence,
  calculateCombatStartMinions,
  calculateSignatureMinionsPerTurn,
  calculateMinionLevelStaminaBonus,
} from '../utils/calculations';

// Note: SRD values are now calculated dynamically based on hero level
// via calculateEssencePerTurn, calculateMinionDeathEssence, etc.

interface CombatContextType {
  essenceState: EssenceEconomy;
  turnState: TurnState;
  isInCombat: boolean;
  combatTurnNumber: number; // Generic turn counter for all classes
  startCombat: () => void;
  endCombat: () => void;
  startNewTurn: () => void;
  advancePhase: () => void;
  spendEssence: (amount: number) => boolean;
  gainEssence: (amount: number) => void;
  onMinionDeath: () => void; // Trigger essence gain from minion death
  setOnCombatStartCallback: (callback: (() => void) | null) => void;
  hasSacrificedThisTurn: boolean;
  sacrificeMinion: () => boolean; // Queue a sacrificed minion to reduce the next summon/essence cost
  clearPendingSacrifices: () => void;
  onEndTurn: () => void; // Generic end-of-turn callback for turn tracker
  selectFreeMinion: (templateId: string) => void; // Select a signature minion from pending free minions
}

const CombatContext = createContext<CombatContextType | undefined>(undefined);

export const useCombatContext = () => {
  const context = useContext(CombatContext);
  if (!context) {
    throw new Error('useCombatContext must be used within a CombatProvider');
  }
  return context;
};

interface CombatProviderProps {
  children: ReactNode;
}

export const CombatProvider: React.FC<CombatProviderProps> = ({ children }) => {
  const { hero: genericHero, updateHero } = useHeroContext();

  // CombatContext is primarily for Summoner; other classes use basic combat tracking
  const hero = genericHero && isSummonerHero(genericHero) ? genericHero : null;

  const [isInCombat, setIsInCombat] = useState(false);
  const [combatTurnNumber, setCombatTurnNumber] = useState(1);
  const [onCombatStartCallback, setOnCombatStartCallbackState] = useState<(() => void) | null>(null);

  const setOnCombatStartCallback = useCallback((callback: (() => void) | null) => {
    setOnCombatStartCallbackState(() => callback);
  }, []);

  const [essenceState, setEssenceState] = useState<EssenceEconomy>({
    currentEssence: 0,
    essenceGainedThisTurn: 0,
    turnNumber: 0,
    signatureMinionsSpawnedThisTurn: false,
    minionDeathEssenceGainedThisRound: false,
    pendingFreeMinions: 0,
    pendingSacrificeCount: 0,
  });

  const [turnState, setTurnState] = useState<TurnState>({
    currentPhase: 'collectResources',
    roundNumber: 0,
    phasesCompleted: [],
  });

  // SYNC: Keep essenceState.currentEssence in sync with hero.heroicResource.current
  // This handles cases where essence is modified externally (e.g., via StatChip)
  useEffect(() => {
    if (hero?.heroicResource?.current !== undefined) {
      const heroEssence = hero.heroicResource.current;
      // Only sync if values differ (avoid infinite loops)
      if (essenceState.currentEssence !== heroEssence) {
        setEssenceState(prev => ({
          ...prev,
          currentEssence: heroEssence,
        }));
      }
    }
  }, [hero?.heroicResource?.current]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper function to create a squad from a minion template
  const createSquadFromTemplate = useCallback((template: MinionTemplate): Squad | null => {
    if (!hero) return null;

    // Formation bonus (Elite: +3)
    const formationBonus = calculateMinionBonusStamina(hero.formation);
    // Level-based bonus (Minion Improvement at L4, L7, L10)
    const levelBonus = calculateMinionLevelStaminaBonus(template.essenceCost, hero.level);

    // Create minion members and calculate total pool
    const members: Minion[] = [];
    let totalStamina = 0;

    for (let i = 0; i < template.minionsPerSummon; i++) {
      const baseStamina = Array.isArray(template.stamina)
        ? template.stamina[i] || template.stamina[0]
        : template.stamina;
      const minionMaxStamina = baseStamina + formationBonus + levelBonus;
      totalStamina += minionMaxStamina;

      members.push({
        id: generateId(),
        templateId: template.id,
        isAlive: true,
        maxStamina: minionMaxStamina,
        conditions: [],
      });
    }

    return {
      id: generateId(),
      templateId: template.id,
      members,
      currentStamina: totalStamina,
      maxStamina: totalStamina,
      hasMoved: false,
      hasActed: false,
      hasUsedManeuver: false,
    };
  }, [hero]);

  // Create a single minion (not a full squad) for free summons
  const createSingleMinion = useCallback((template: MinionTemplate): Minion | null => {
    if (!hero) return null;

    // Formation bonus (Elite: +3)
    const formationBonus = calculateMinionBonusStamina(hero.formation);
    // Level-based bonus (Minion Improvement at L4, L7, L10)
    const levelBonus = calculateMinionLevelStaminaBonus(template.essenceCost, hero.level);

    const baseStamina = Array.isArray(template.stamina)
      ? template.stamina[0]
      : template.stamina;
    const minionMaxStamina = baseStamina + formationBonus + levelBonus;

    return {
      id: generateId(),
      templateId: template.id,
      isAlive: true,
      maxStamina: minionMaxStamina,
      conditions: [],
    };
  }, [hero]);

  // Summon free signature minions (used at combat start and turn start)
  // This counts INDIVIDUAL MINIONS, not squads
  const summonFreeSignatureMinions = useCallback((minionCount: number, existingSquads: Squad[] = []): Squad[] => {
    if (!hero) return existingSquads;

    const signatureMinions = hero.portfolio.signatureMinions || [];
    if (signatureMinions.length === 0) return existingSquads;

    const newSquads = [...existingSquads];
    let summoned = 0;
    let templateIndex = 0;

    // Summon individual minions, cycling through signature templates
    while (summoned < minionCount) {
      const template = signatureMinions[templateIndex % signatureMinions.length];
      const minion = createSingleMinion(template);

      if (minion) {
        // Find existing squad of same type or create new one
        let squad = newSquads.find(s => s.templateId === template.id);

        if (squad) {
          // Add minion to existing squad
          squad.members.push(minion);
          squad.currentStamina += minion.maxStamina;
          squad.maxStamina += minion.maxStamina;
        } else {
          // Create new squad with this single minion
          squad = {
            id: generateId(),
            templateId: template.id,
            members: [minion],
            currentStamina: minion.maxStamina,
            maxStamina: minion.maxStamina,
            hasMoved: false,
            hasActed: false,
            hasUsedManeuver: false,
          };
          newSquads.push(squad);
        }

        summoned++;
      }

      templateIndex++;
      // Safety: prevent infinite loop if no minions can be created
      if (templateIndex > minionCount * 2) break;
    }

    return newSquads;
  }, [hero, createSingleMinion]);

  const startCombat = () => {
    // Set combat state for ALL classes
    setIsInCombat(true);
    setCombatTurnNumber(1);
    setTurnState({
      currentPhase: 'collectResources',
      roundNumber: 1,
      phasesCompleted: [],
    });

    // Summoner-specific: Initialize essence and set up free minion selection
    if (hero) {
      // SRD: Start of Combat - Essence = Current Victories
      const startingEssence = hero.victories || 0;

      // SRD: Start of Combat - Free signature minions (player choice)
      // Base: 2, Level 10: +2 per 2 Victories
      const freeMinionCount = calculateCombatStartMinions(hero.level, hero.victories || 0);

      // Reset champion state for new encounter (Summoner v1.0 SRD)
      const newChampionState = hero.championState ? {
        ...hero.championState,
        summonedThisEncounter: false,
        championActionUsed: false,
        canSummon: !hero.championState.requiresVictoryToResummon,
      } : {
        canSummon: true,
        summonedThisEncounter: false,
        championActionUsed: false,
        requiresVictoryToResummon: false,
      };

      // Dismiss out-of-combat minions (Summoner v1.0 SRD)
      const newOutOfCombatState = hero.outOfCombatState ? {
        ...hero.outOfCombatState,
        activeMinions: [], // Dismissed when combat starts
      } : {
        activeMinions: [],
        usedAbilities: {},
        shouldDismissOnCombatStart: true,
      };

      // Clear any existing squads and set pending free minions for player selection
      updateHero({
        activeSquads: [],
        heroicResource: {
          ...hero.heroicResource,
          current: startingEssence,
        },
        activeChampion: null, // Reset champion at combat start
        championState: newChampionState,
        outOfCombatState: newOutOfCombatState,
      });

      setEssenceState({
        currentEssence: startingEssence,
        essenceGainedThisTurn: 0,
        turnNumber: 1,
        signatureMinionsSpawnedThisTurn: false, // Will be true after player selects
        minionDeathEssenceGainedThisRound: false,
        pendingFreeMinions: freeMinionCount, // Player will select these
        pendingSacrificeCount: 0,
      });
    } else if (genericHero) {
      // Non-Summoner classes: reset their heroic resource at combat start if needed
      // (Most classes keep their resource, but some may have combat-start effects)
    } else {
      // Non-Summoner: Reset essence state to defaults
      setEssenceState({
        currentEssence: 0,
        essenceGainedThisTurn: 0,
        turnNumber: 1,
        signatureMinionsSpawnedThisTurn: false,
        minionDeathEssenceGainedThisRound: false,
        pendingFreeMinions: 0,
        pendingSacrificeCount: 0,
      });
    }

    // Call the combat start callback (e.g., to switch to combat tab)
    if (onCombatStartCallback) {
      onCombatStartCallback();
    }
  };

  const endCombat = () => {
    setIsInCombat(false);

    // Reset squads and increment victories by 1 (assuming combat victory)
    if (hero) {
      const nextChampionState = hero.championState ? {
        ...hero.championState,
        canSummon: true,
        requiresVictoryToResummon: false,
        summonedThisEncounter: false,
        championActionUsed: false,
      } : hero.championState;

      updateHero({
        activeSquads: [],
        fixture: null,
        activeChampion: null,
        championState: nextChampionState,
        heroicResource: {
          ...hero.heroicResource,
          current: 0,
        },
        outOfCombatState: hero.outOfCombatState ? {
          ...hero.outOfCombatState,
          usedAbilities: {},
        } : hero.outOfCombatState,
        victories: (hero.victories || 0) + 1,
      });

      setEssenceState(prev => ({
        ...prev,
        currentEssence: 0,
        essenceGainedThisTurn: 0,
        signatureMinionsSpawnedThisTurn: false,
        minionDeathEssenceGainedThisRound: false,
        pendingFreeMinions: 0,
        pendingSacrificeCount: 0,
      }));
    } else if (genericHero) {
      // Non-Summoner classes also get a victory
      updateHero({
        victories: (genericHero.victories || 0) + 1,
      });
    }
  };

  const startNewTurn = () => {
    if (!hero) return;

    const newTurnNumber = turnState.roundNumber + 1;
    const currentEssence = hero.heroicResource?.current ?? essenceState.currentEssence;

    setTurnState({
      currentPhase: 'collectResources',
      roundNumber: newTurnNumber,
      phasesCompleted: [],
    });

    // SRD: Start of Turn - Gain essence (level-based)
    // Base: +2, Level 7+ (Font of Creation): +3
    const essenceGain = calculateEssencePerTurn(hero.level);
    const newEssence = currentEssence + essenceGain;

    // SRD: Start of Turn - Free signature minions (level-based, player choice)
    // Base: 3, Level 7+ (Minion Improvement): 4, Horde: +1
    const freeMinionCount = calculateSignatureMinionsPerTurn(hero.formation, hero.level);

    setEssenceState(prev => ({
      ...prev,
      currentEssence: newEssence,
      essenceGainedThisTurn: essenceGain,
      turnNumber: newTurnNumber,
      signatureMinionsSpawnedThisTurn: false, // Will be true after player selects
      minionDeathEssenceGainedThisRound: false, // Reset for new round
      pendingFreeMinions: freeMinionCount, // Player will select these
      pendingSacrificeCount: 0,
    }));

    // Reset squad and minion action states (for sacrifice tracking)
    const resetSquads = hero.activeSquads.map(squad => ({
      ...squad,
      hasMoved: false,
      hasActed: false,
      hasUsedManeuver: false,
      // Reset individual minion action states for sacrifice eligibility
      members: squad.members.map(minion => ({
        ...minion,
        hasActedThisTurn: false,
        hasMovedThisTurn: false,
      })),
    }));

    // Reset champion actions if active
    const updatedChampion = hero.activeChampion ? {
      ...hero.activeChampion,
      hasMoved: false,
      hasActed: false,
      hasUsedManeuver: false,
    } : null;

    // Sync heroicResource with the new essence value
    updateHero({
      activeSquads: resetSquads,
      activeChampion: updatedChampion,
      heroicResource: {
        ...hero.heroicResource,
        current: newEssence,
      },
    });
  };

  const advancePhase = () => {
    const phases: TurnPhase[] = ['collectResources', 'summonMinions', 'positionUnits', 'executePlan'];
    const currentIndex = phases.indexOf(turnState.currentPhase);

    if (currentIndex < phases.length - 1) {
      const nextPhase = phases[currentIndex + 1];
      setTurnState(prev => ({
        ...prev,
        currentPhase: nextPhase,
        phasesCompleted: [...prev.phasesCompleted, prev.currentPhase],
      }));
    }
  };

  const spendEssence = (amount: number): boolean => {
    const currentEssence = hero?.heroicResource?.current ?? essenceState.currentEssence;
    if (currentEssence >= amount) {
      // Update both local state and hero.heroicResource for sync
      setEssenceState(prev => ({
        ...prev,
        currentEssence: prev.currentEssence - amount,
      }));
      // Also update hero.heroicResource as the source of truth
      if (genericHero && genericHero.heroicResource) {
        // Type assertion needed due to discriminated union heroicResource types
        const updatedResource = {
          ...genericHero.heroicResource,
          current: (genericHero.heroicResource.current ?? 0) - amount,
        };
        updateHero({ heroicResource: updatedResource } as Partial<typeof genericHero>);
      }
      return true;
    }
    return false;
  };

  const gainEssence = (amount: number) => {
    setEssenceState(prev => ({
      ...prev,
      currentEssence: prev.currentEssence + amount,
      essenceGainedThisTurn: prev.essenceGainedThisTurn + amount,
    }));
    // Also update hero.heroicResource as the source of truth
    if (genericHero && genericHero.heroicResource) {
      // Type assertion needed due to discriminated union heroicResource types
      const updatedResource = {
        ...genericHero.heroicResource,
        current: (genericHero.heroicResource.current ?? 0) + amount,
      };
      updateHero({ heroicResource: updatedResource } as Partial<typeof genericHero>);
    }
  };

  // SRD: Gain essence when any minion dies in Summoner's Range (limit 1/round)
  // Base: +1, Level 4+ (Essence Salvage): +2
  const onMinionDeath = () => {
    if (!essenceState.minionDeathEssenceGainedThisRound && hero) {
      const essenceGain = calculateMinionDeathEssence(hero.level);
      gainEssence(essenceGain);
      setEssenceState(prev => ({
        ...prev,
        minionDeathEssenceGainedThisRound: true,
      }));
    }
  };

  /**
   * Queue a willing sacrifice to reduce the next essence cost.
   * Removing the minion itself is handled by the caller so willing sacrifices
   * don't trigger unwilling-death essence salvage.
   */
  const sacrificeMinion = (): boolean => {
    setEssenceState(prev => ({
      ...prev,
      pendingSacrificeCount: (prev.pendingSacrificeCount ?? 0) + 1,
    }));
    return true;
  };

  const clearPendingSacrifices = useCallback(() => {
    setEssenceState(prev => ({
      ...prev,
      pendingSacrificeCount: 0,
    }));
  }, []);

  // Generic end-of-turn handler for all classes (used by TurnCard in StatsDashboard)
  const onEndTurn = useCallback(() => {
    setCombatTurnNumber((prev) => prev + 1);
  }, []);

  // Select a free signature minion from pending count (player choice at turn/combat start)
  const selectFreeMinion = useCallback((templateId: string) => {
    if (!hero || essenceState.pendingFreeMinions <= 0) return;

    const signatureMinions = hero.portfolio.signatureMinions || [];
    const template = signatureMinions.find(m => m.id === templateId);
    if (!template) return;

    // Create a single minion from the template
    const minion = createSingleMinion(template);
    if (!minion) return;

    // Find existing squad or create new one
    const existingSquads = [...hero.activeSquads];
    let squad = existingSquads.find(s => s.templateId === template.id);

    if (squad) {
      // Add minion to existing squad
      squad.members.push(minion);
      squad.currentStamina += minion.maxStamina;
      squad.maxStamina += minion.maxStamina;
    } else {
      // Create new squad with this single minion
      squad = {
        id: generateId(),
        templateId: template.id,
        members: [minion],
        currentStamina: minion.maxStamina,
        maxStamina: minion.maxStamina,
        hasMoved: false,
        hasActed: false,
        hasUsedManeuver: false,
      };
      existingSquads.push(squad);
    }

    // Update hero with the modified squads
    updateHero({
      activeSquads: existingSquads,
    });

    // Decrement pending count
    const newPending = essenceState.pendingFreeMinions - 1;
    setEssenceState(prev => ({
      ...prev,
      pendingFreeMinions: newPending,
      signatureMinionsSpawnedThisTurn: newPending === 0,
    }));
  }, [hero, essenceState.pendingFreeMinions, createSingleMinion, updateHero]);

  const value: CombatContextType = {
    essenceState,
    turnState,
    isInCombat,
    combatTurnNumber,
    startCombat,
    endCombat,
    startNewTurn,
    advancePhase,
    spendEssence,
    gainEssence,
    onMinionDeath,
    setOnCombatStartCallback,
    hasSacrificedThisTurn: (essenceState.pendingSacrificeCount ?? 0) > 0,
    sacrificeMinion,
    clearPendingSacrifices,
    onEndTurn,
    selectFreeMinion,
  };

  return <CombatContext.Provider value={value}>{children}</CombatContext.Provider>;
};
