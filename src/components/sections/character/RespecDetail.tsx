/**
 * RespecDetail - Multi-level progression respec flow in detail pane
 *
 * Allows players to reset their character's progression choices while
 * preserving character identity (ancestry, culture, career, kit, class).
 * Walks through level-up choices from level 2 to the target level.
 */
import { useState, useMemo, useCallback } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { getProgressionForLevel, getCircleUpgrades } from '@/data/progression';
import {
  getFuryProgressionWithAspect,
  calculateFuryStamina,
} from '@/data/fury/progression';
import { classPerkAtLevel, getAvailablePerkCategories } from '@/data/perks';
import { GameData } from '@/lib/game-rules';
import { getLevelForXp } from '@/utils/levelProgression';
import { getRespecPreservationInfo } from '@/utils/hero-reset';
import { LevelUpChoice } from '@/types/levelup';
import { WardType, ProgressionChoices } from '@/types/progression';
import { SelectedPerk } from '@/types/perk';
import { Characteristic } from '@/types/common';
import { isSummonerHero, isFuryHero, SummonerHeroV2, FuryHero, Hero } from '@/types/hero';
import {
  RefreshCcw,
  AlertTriangle,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from 'lucide-react';
import LevelUpPerkStep from '@/components/character/levelup/LevelUpPerkStep';
import LevelUpChoiceStep from '@/components/character/levelup/LevelUpChoiceStep';
import './RespecDetail.css';

type RespecPhase = 'confirm' | 'leveling' | 'complete';

interface LevelChoices {
  level: number;
  choices: LevelUpChoice[];
}

export function RespecDetail() {
  const { hero, updateHero } = useHeroContext();
  const { setSelectedItem } = useNavigation();

  // State - all hooks MUST be called before any early returns
  const [phase, setPhase] = useState<RespecPhase>('confirm');
  const [currentRespecLevel, setCurrentRespecLevel] = useState(2);
  const [accumulatedChoices, setAccumulatedChoices] = useState<LevelChoices[]>([]);
  const [currentLevelChoices, setCurrentLevelChoices] = useState<LevelUpChoice[]>([]);
  const [currentStep, setCurrentStep] = useState<'overview' | 'ability' | 'perk'>('overview');

  // Derived values that work even if hero is null
  const totalXp = hero ? (hero.xp || 0) + (hero.victories || 0) : 0;
  const targetLevel = hero ? Math.min(getLevelForXp(totalXp), hero.level) : 1;
  const canRespec = hero ? hero.level >= 2 : false;

  // Check hero class for class-specific features
  const isSummoner = hero ? isSummonerHero(hero) : false;
  const isFury = hero ? isFuryHero(hero) : false;
  const summonerHero = isSummoner && hero ? (hero as SummonerHeroV2) : null;
  const furyHero = isFury && hero ? (hero as FuryHero) : null;

  // Get existing perk IDs (accumulated during respec)
  const existingPerkIds = useMemo(() => {
    const accumulated = accumulatedChoices.flatMap((lc) =>
      lc.choices.filter((c) => c.type === 'perk').map((c) => c.id)
    );
    const current = currentLevelChoices
      .filter((c) => c.type === 'perk')
      .map((c) => c.id);
    return [...accumulated, ...current];
  }, [accumulatedChoices, currentLevelChoices]);

  // Get progression for current level being chosen
  const progression = useMemo(() => {
    if (phase !== 'leveling') return null;
    if (isFury && furyHero?.subclass) {
      return getFuryProgressionWithAspect(currentRespecLevel, furyHero.subclass);
    }
    return getProgressionForLevel(currentRespecLevel);
  }, [currentRespecLevel, isFury, furyHero, phase]);

  // Filter class-specific upgrades
  const filteredFeatures = useMemo(() => {
    if (!progression) return [];

    if (isFury) {
      return progression.features;
    }

    return progression.features.map((feature) => {
      if (feature.category === 'circle-upgrade' && summonerHero?.subclass) {
        const circleChoices = getCircleUpgrades(summonerHero.subclass);
        return {
          ...feature,
          choices: circleChoices.map((u) => ({
            id: u.id,
            name: u.name,
            description: u.description,
          })),
        };
      }
      return feature;
    });
  }, [progression, summonerHero, isFury]);

  const choiceFeatures = filteredFeatures.filter((f) => f.type === 'choice');
  const grantsPerks = hero ? classPerkAtLevel(hero.heroClass, currentRespecLevel) : false;

  // Determine steps needed for current level
  const levelSteps = useMemo((): ('overview' | 'ability' | 'perk')[] => {
    const steps: ('overview' | 'ability' | 'perk')[] = ['overview'];
    if (choiceFeatures.length > 0) {
      steps.push('ability');
    }
    if (grantsPerks) {
      steps.push('perk');
    }
    return steps;
  }, [choiceFeatures.length, grantsPerks]);

  // Navigation within a level
  const currentStepIndex = levelSteps.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStepOfLevel = currentStepIndex === levelSteps.length - 1;
  const isLastLevel = currentRespecLevel === targetLevel;

  const goNextStep = useCallback(() => {
    if (!isLastStepOfLevel) {
      setCurrentStep(levelSteps[currentStepIndex + 1]);
    } else if (!isLastLevel) {
      // Save current level choices and move to next level
      setAccumulatedChoices((prev) => [
        ...prev,
        { level: currentRespecLevel, choices: currentLevelChoices },
      ]);
      setCurrentLevelChoices([]);
      setCurrentRespecLevel((prev) => prev + 1);
      setCurrentStep('overview');
    } else {
      // All levels done, move to complete phase
      setAccumulatedChoices((prev) => [
        ...prev,
        { level: currentRespecLevel, choices: currentLevelChoices },
      ]);
      setPhase('complete');
    }
  }, [
    currentStepIndex,
    levelSteps,
    isLastStepOfLevel,
    isLastLevel,
    currentRespecLevel,
    currentLevelChoices,
  ]);

  const goBackStep = useCallback(() => {
    if (!hero) return;
    if (!isFirstStep) {
      setCurrentStep(levelSteps[currentStepIndex - 1]);
    } else if (currentRespecLevel > 2) {
      // Go back to previous level
      const prevLevelChoices = accumulatedChoices[accumulatedChoices.length - 1];
      setAccumulatedChoices((prev) => prev.slice(0, -1));
      setCurrentLevelChoices(prevLevelChoices?.choices || []);
      setCurrentRespecLevel((prev) => prev - 1);
      // Go to last step of previous level
      const prevProgression = isFury && furyHero?.subclass
        ? getFuryProgressionWithAspect(currentRespecLevel - 1, furyHero.subclass)
        : getProgressionForLevel(currentRespecLevel - 1);
      const prevChoiceFeatures = prevProgression?.features.filter((f) => f.type === 'choice') || [];
      const prevGrantsPerks = classPerkAtLevel(hero.heroClass, currentRespecLevel - 1);
      if (prevGrantsPerks) {
        setCurrentStep('perk');
      } else if (prevChoiceFeatures.length > 0) {
        setCurrentStep('ability');
      } else {
        setCurrentStep('overview');
      }
    } else {
      // Go back to confirm phase
      setPhase('confirm');
    }
  }, [
    hero,
    isFirstStep,
    currentStepIndex,
    levelSteps,
    currentRespecLevel,
    accumulatedChoices,
    isFury,
    furyHero,
  ]);

  // Choice handlers
  const addChoice = useCallback((choice: LevelUpChoice) => {
    setCurrentLevelChoices((prev) => {
      const filtered = prev.filter(
        (c) => !(c.type === choice.type && c.category === choice.category)
      );
      return [...filtered, choice];
    });
  }, []);

  // Apply all respec changes
  const handleConfirmRespec = useCallback(() => {
    if (!hero) return;

    const allChoices = [...accumulatedChoices, { level: currentRespecLevel, choices: currentLevelChoices }];

    // Build progression choices from all levels
    const newProgressionChoices: ProgressionChoices = {};
    const newPerks: SelectedPerk[] = [];

    allChoices.forEach(({ level, choices }) => {
      choices.forEach((choice) => {
        switch (choice.category) {
          // Summoner categories
          case 'ward':
            newProgressionChoices.ward = choice.id as WardType;
            break;
          case 'second-ward':
            newProgressionChoices.secondWard = choice.id as WardType;
            break;
          case '7-essence':
            newProgressionChoices.sevenEssenceAbility = choice.id;
            break;
          case '9-essence':
            newProgressionChoices.nineEssenceAbility = choice.id;
            break;
          case '11-essence':
            newProgressionChoices.elevenEssenceAbility = choice.id;
            break;
          case 'circle-upgrade':
            newProgressionChoices.circleUpgrade = choice.id;
            break;
          case 'stat-boost':
            newProgressionChoices.statBoost = choice.id as Characteristic;
            break;
          // Fury categories
          case '7-ferocity':
            newProgressionChoices.sevenFerocityAbility = choice.id;
            break;
          case '9-ferocity':
            newProgressionChoices.nineFerocityAbility = choice.id;
            break;
          case '11-ferocity':
            newProgressionChoices.elevenFerocityAbility = choice.id;
            break;
          case 'aspect-5-ferocity':
            newProgressionChoices.aspectFiveFerocity = choice.id;
            break;
          case 'aspect-9-ferocity':
            newProgressionChoices.aspectNineFerocity = choice.id;
            break;
          case 'aspect-11-ferocity':
            newProgressionChoices.aspectElevenFerocity = choice.id;
            break;
        }

        if (choice.type === 'perk') {
          newPerks.push({
            perkId: choice.id,
            selectedAtLevel: level,
            source: 'class',
          });
        }
      });
    });

    // Calculate final stats for target level
    const classDef = GameData.getClass(hero.heroClass);
    const echelon = Math.ceil(targetLevel / 3);
    const kitStamina = (hero.kit?.staminaPerEchelon || 0) * echelon;

    let newMaxStamina: number;
    if (isFury) {
      newMaxStamina = calculateFuryStamina(targetLevel, kitStamina);
    } else {
      const classStartingStamina = classDef?.baseStats.stamina.level1 ?? 18;
      const staminaPerLevel = classDef?.baseStats.stamina.perLevel ?? 6;
      const levelBonus = (targetLevel - 1) * staminaPerLevel;
      newMaxStamina = classStartingStamina + levelBonus + kitStamina;
    }

    // Calculate characteristics (start from class base and apply stat changes from progression)
    let newCharacteristics = {
      might: classDef?.startingCharacteristics.might ?? 0,
      agility: classDef?.startingCharacteristics.agility ?? 0,
      reason: classDef?.startingCharacteristics.reason ?? 0,
      intuition: classDef?.startingCharacteristics.intuition ?? 0,
      presence: classDef?.startingCharacteristics.presence ?? 0,
    };

    // Apply level-based stat changes
    for (let lvl = 2; lvl <= targetLevel; lvl++) {
      const lvlProgression = isFury && furyHero?.subclass
        ? getFuryProgressionWithAspect(lvl, furyHero.subclass)
        : getProgressionForLevel(lvl);

      if (lvlProgression?.statChanges) {
        const sc = lvlProgression.statChanges;

        if (isFury) {
          if (sc.might !== undefined && sc.agility !== undefined) {
            newCharacteristics.might = sc.might;
            newCharacteristics.agility = sc.agility;
          }
          if (sc.allStats !== undefined) {
            newCharacteristics = {
              ...newCharacteristics,
              might: Math.min(4, newCharacteristics.might + sc.allStats),
              agility: Math.min(4, newCharacteristics.agility + sc.allStats),
              reason: Math.min(4, newCharacteristics.reason + sc.allStats),
              intuition: Math.min(4, newCharacteristics.intuition + sc.allStats),
              presence: Math.min(4, newCharacteristics.presence + sc.allStats),
            };
          }
        } else {
          if (sc.reason !== undefined) {
            newCharacteristics.reason = sc.reason;
          }
          if (sc.allStats !== undefined) {
            newCharacteristics = {
              ...newCharacteristics,
              might: Math.min(4, newCharacteristics.might + sc.allStats),
              agility: Math.min(4, newCharacteristics.agility + sc.allStats),
              reason: Math.min(4, newCharacteristics.reason + sc.allStats),
              intuition: Math.min(4, newCharacteristics.intuition + sc.allStats),
              presence: Math.min(4, newCharacteristics.presence + sc.allStats),
            };
          }
        }
      }

      // Apply stat boost choice (Summoner Level 4)
      if (lvl === 4 && newProgressionChoices.statBoost) {
        const stat = newProgressionChoices.statBoost;
        newCharacteristics[stat] = Math.min(4, newCharacteristics[stat] + 1);
      }
    }

    // Build final hero update
    const updates: Partial<Hero> = {
      level: targetLevel,
      progressionChoices: newProgressionChoices,
      selectedPerks: newPerks,
      characteristics: newCharacteristics,
      stamina: {
        ...hero.stamina,
        current: newMaxStamina,
        max: newMaxStamina,
        winded: Math.floor(newMaxStamina / 2),
      },
      // Reset combat state
      surges: 0,
      heroTokens: 0,
      activeConditions: [],
    };

    updateHero(updates);
    // Navigate back to class view after respec
    setSelectedItem('class');
  }, [
    hero,
    accumulatedChoices,
    currentRespecLevel,
    currentLevelChoices,
    targetLevel,
    isFury,
    furyHero,
    updateHero,
    setSelectedItem,
  ]);

  // Cancel respec and go back
  const handleCancel = useCallback(() => {
    setSelectedItem('class');
  }, [setSelectedItem]);

  // Get preservation info for confirmation screen
  const preservationInfo = useMemo(() => getRespecPreservationInfo(), []);

  // Early returns AFTER all hooks
  if (!hero) {
    return (
      <div className="detail-empty">
        <p>No character loaded</p>
      </div>
    );
  }

  // Can only respec if level >= 2
  if (!canRespec) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Respec Progression</h1>
          <span className="detail-subtitle">Not Available</span>
        </header>
        <section className="detail-section">
          <p className="detail-text text-[var(--text-muted)]">
            Respec is only available for characters at level 2 or higher.
            Your character is currently level {hero.level}.
          </p>
        </section>
      </div>
    );
  }

  // Render confirmation phase
  if (phase === 'confirm') {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <div className="respec-title-row">
            <RefreshCcw className="w-5 h-5 text-[var(--accent-primary)]" />
            <h1 className="detail-title">Respec Progression</h1>
          </div>
          <span className="detail-subtitle">Level {hero.level} {hero.heroClass}</span>
        </header>

        <section className="detail-section">
          <p className="detail-text">
            Reset <strong>{hero.name}'s</strong> progression choices and rebuild from level 2 to level {targetLevel}.
          </p>
        </section>

        <section className="detail-section">
          <div className="respec-xp-display-inline">
            <Trophy className="w-5 h-5 text-[var(--xp)]" />
            <div>
              <div className="font-medium text-[var(--xp)]">XP Total: {totalXp}</div>
              <div className="text-xs text-[var(--text-secondary)]">
                Target Level: {targetLevel}
              </div>
            </div>
          </div>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title respec-section-preserved">
            <Check size={14} />
            Preserved
          </h2>
          <ul className="respec-list">
            {preservationInfo.preserved.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title respec-section-reset">
            <AlertTriangle size={14} />
            Reset
          </h2>
          <ul className="respec-list">
            {preservationInfo.reset.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section respec-actions">
          <button
            className="respec-cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="respec-begin-button"
            onClick={() => {
              setPhase('leveling');
              setCurrentRespecLevel(2);
              setCurrentStep('overview');
            }}
          >
            Begin Respec
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </section>
      </div>
    );
  }

  // Render leveling phase
  if (phase === 'leveling') {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <div className="respec-title-row">
            <Sparkles className="h-5 w-5 text-[var(--accent-primary)]" />
            <h1 className="detail-title">Respec - Level {currentRespecLevel}</h1>
          </div>
          <div className="respec-level-progress-inline">
            {Array.from({ length: targetLevel - 1 }, (_, i) => i + 2).map((lvl) => (
              <div
                key={lvl}
                className={`level-dot ${lvl < currentRespecLevel ? 'completed' : ''} ${lvl === currentRespecLevel ? 'current' : ''}`}
              >
                {lvl < currentRespecLevel ? <Check size={10} /> : lvl}
              </div>
            ))}
          </div>
        </header>

        {currentStep === 'overview' && (
          <div className="respec-step-content">
            <section className="detail-section">
              <h2 className="detail-section-title">Level {currentRespecLevel}</h2>
              <p className="detail-text">
                {choiceFeatures.length > 0 || grantsPerks
                  ? `Make your choices for level ${currentRespecLevel}.`
                  : `No choices needed for level ${currentRespecLevel}.`}
              </p>
            </section>

            {progression?.features && progression.features.length > 0 && (
              <section className="detail-section">
                <h2 className="detail-section-title">Features at this level</h2>
                <ul className="respec-features-list">
                  {progression.features.map((f) => (
                    <li key={f.id}>
                      <strong>{f.name}</strong>
                      {f.type === 'choice' && <span className="choice-indicator"> (Choice)</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {grantsPerks && (
              <section className="detail-section">
                <h2 className="detail-section-title">Perk Selection</h2>
                <p className="detail-text">You will choose a perk at this level.</p>
              </section>
            )}

            <section className="detail-section respec-actions">
              <button className="respec-back-button" onClick={goBackStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </button>
              <button className="respec-continue-button" onClick={goNextStep}>
                {levelSteps.length === 1
                  ? isLastLevel
                    ? 'Finalize'
                    : 'Continue'
                  : 'Begin'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </section>
          </div>
        )}

        {currentStep === 'ability' && (
          <LevelUpChoiceStep
            hero={hero}
            targetLevel={currentRespecLevel}
            choiceFeatures={choiceFeatures}
            currentChoices={currentLevelChoices}
            onSelect={addChoice}
            onBack={goBackStep}
            onContinue={goNextStep}
          />
        )}

        {currentStep === 'perk' && (
          <LevelUpPerkStep
            hero={hero}
            targetLevel={currentRespecLevel}
            allowedCategories={getAvailablePerkCategories(hero.heroClass, currentRespecLevel)}
            existingPerkIds={existingPerkIds}
            selectedPerkId={currentLevelChoices.find((c) => c.type === 'perk')?.id}
            onSelect={(perkId, perkName, description) => {
              addChoice({ type: 'perk', id: perkId, name: perkName, description });
            }}
            onBack={goBackStep}
            onContinue={goNextStep}
          />
        )}
      </div>
    );
  }

  // Render complete phase (confirmation before applying)
  return (
    <div className="detail-content">
      <header className="detail-header">
        <div className="respec-title-row">
          <Check className="w-5 h-5 text-[var(--status-success)]" />
          <h1 className="detail-title">Respec Complete</h1>
        </div>
        <span className="detail-subtitle">Ready to apply</span>
      </header>

      <section className="detail-section">
        <p className="detail-text">
          <strong>{hero.name}</strong> will be updated to level {targetLevel} with your new choices.
        </p>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">Your Choices</h2>
        <div className="respec-choices-summary">
          {[...accumulatedChoices, { level: currentRespecLevel, choices: currentLevelChoices }]
            .filter((lc) => lc.choices.length > 0)
            .map(({ level, choices }) => (
              <div key={level} className="respec-level-summary">
                <strong>Level {level}:</strong>
                <ul>
                  {choices.map((c, i) => (
                    <li key={i}>{c.name}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>

      <section className="detail-section respec-actions">
        <button
          className="respec-back-button"
          onClick={() => setPhase('leveling')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </button>
        <button
          className="respec-confirm-button"
          onClick={handleConfirmRespec}
        >
          <Check className="mr-2 h-4 w-4" />
          Apply Changes
        </button>
      </section>
    </div>
  );
}

export default RespecDetail;
