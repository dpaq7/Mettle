import { useState, useEffect, useMemo } from 'react';
import { useHeroContext } from './context/HeroContext';
import { useCombatContext } from './context/CombatContext';
import { useTheme } from './context/ThemeContext';
import CharacterCreation from './components/creation/CharacterCreation';
import CharacterManager from './components/character/CharacterManager';
import CharacterStatsPanel from './components/character/CharacterStatsPanel';
import CharacterDetailsView from './components/character/CharacterDetailsView';
import LevelUp from './components/character/LevelUp';
import CombatView from './components/combat/CombatView';
import AbilitiesView from './components/abilities/AbilitiesView';
import ProjectsView from './components/projects/ProjectsView';
import MagicItemsView from './components/items/MagicItemsView';
import InventoryView from './components/inventory/InventoryView';
import RollHistoryPanel from './components/shared/RollHistoryPanel';
import LegalModal from './components/shared/LegalModal';
import CollapsibleHeader from './components/ui/CollapsibleHeader';
import { ThemeSelector } from './components/theme';
import { StrainView } from './components/classDetails/TalentDetails/StrainView';
import { NullFieldView } from './components/classDetails/NullDetails/NullFieldView';
import { getTabsForClass, ViewType } from './data/class-tabs';
import { HeroClass } from './types/hero';
import './App.css';

type View = ViewType;

function App() {
  const { hero, setHero, updateHero } = useHeroContext();
  const { isInCombat, startCombat, endCombat, setOnCombatStartCallback, essenceState, gainEssence, spendEssence } = useCombatContext();
  const { applyThemeForHero, applyCreatorTheme } = useTheme();
  const [activeView, setActiveView] = useState<View>('character');
  const [showCharacterManager, setShowCharacterManager] = useState(false);
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showRespiteConfirm, setShowRespiteConfirm] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);

  // Apply theme when hero changes
  useEffect(() => {
    if (hero && !showCharacterCreation) {
      const heroClass: HeroClass = hero?.heroClass ?? 'summoner';
      applyThemeForHero(hero.id, heroClass);
    } else if (!showCharacterCreation) {
      // No hero and not in creation - apply MCDM theme
      applyCreatorTheme();
    }
    // Character creation handles its own theme
  }, [hero, showCharacterCreation, applyThemeForHero, applyCreatorTheme]);

  // Register callback to switch to minions tab when combat starts (Summoner only)
  useEffect(() => {
    // Only switch to minions tab for Summoners
    const heroClass: HeroClass = hero?.heroClass ?? 'summoner';
    if (heroClass === 'summoner') {
      setOnCombatStartCallback(() => setActiveView('minions'));
    } else {
      setOnCombatStartCallback(null);
    }
    return () => setOnCombatStartCallback(null);
  }, [setOnCombatStartCallback, hero]);

  const handleCreateNew = () => {
    setHero(null);
    setShowCharacterManager(false);
    setShowCharacterCreation(true);
  };

  const handleCreationComplete = () => {
    setShowCharacterCreation(false);
  };

  const handleRespite = () => {
    if (!hero) return;
    // Convert victories to XP and reset resources
    const xpGained = hero.victories;
    const newXp = (hero.xp || 0) + xpGained;

    updateHero({
      xp: newXp,
      victories: 0,
      stamina: { ...hero.stamina, current: hero.stamina.max },
      recoveries: { ...hero.recoveries, current: hero.recoveries.max },
      surges: 0,
      activeSquads: [], // Dismiss all minions during respite
    });

    setShowRespiteConfirm(false);
  };

  if (!hero || showCharacterCreation) {
    return (
      <div className="app dark-mode">
        <header className="app-header">
          <h1>Mettle</h1>
          <div className="header-actions">
            <button onClick={() => setShowCharacterManager(true)} className="manage-chars-btn">
              Manage Characters
            </button>
            <ThemeSelector />
            <button
              className="about-button"
              onClick={() => setShowLegalModal(true)}
              aria-label="About Mettle"
            >
              About
            </button>
          </div>
        </header>
        <main className="app-main">
          <CharacterCreation onComplete={handleCreationComplete} />
        </main>
        {showCharacterManager && (
          <CharacterManager
            onClose={() => setShowCharacterManager(false)}
            onCreateNew={handleCreateNew}
          />
        )}
        <LegalModal
          isOpen={showLegalModal}
          onClose={() => setShowLegalModal(false)}
        />
      </div>
    );
  }

  // Type guard for hero
  if (!hero) return null;

  // Get hero class (handle both old SummonerHero and new Hero types)
  const heroClass: HeroClass = hero?.heroClass ?? 'summoner';

  // Get dynamic tabs based on hero's class
  const tabs = getTabsForClass(heroClass);

  // Check if hero is a Summoner
  const isSummoner = heroClass === 'summoner';

  return (
    <div className="app dark-mode">
      {/* Minimal Header */}
      <header className="app-header compact">
        <h1>Mettle</h1>
        <div className="header-actions">
          <button onClick={() => setShowCharacterManager(true)} className="manage-chars-btn">
            Characters
          </button>
          <ThemeSelector />
          <button
            className="about-button"
            onClick={() => setShowLegalModal(true)}
            aria-label="About Mettle"
          >
            About
          </button>
        </div>
      </header>

      {/* Collapsible Character Stats Panel */}
      <CollapsibleHeader
        compactData={{
          name: hero.name,
          level: hero.level,
          portraitUrl: hero.portraitUrl || null,
          stamina: {
            current: hero.stamina.current,
            max: hero.stamina.max,
          },
          essence: essenceState.currentEssence,
          recoveries: {
            current: hero.recoveries.current,
            max: hero.recoveries.max,
          },
          recoveryValue: hero.recoveries.value,
          surges: hero.surges,
          victories: hero.victories,
          maxVictories: 12,
          characteristics: hero.characteristics,
          speed: hero.speed,
          stability: hero.stability,
          isInCombat,
          onStartCombat: startCombat,
          onEndCombat: endCombat,
          onRespite: () => setShowRespiteConfirm(true),
          onEssenceChange: (newEssence: number) => {
            const diff = newEssence - essenceState.currentEssence;
            if (diff > 0) {
              gainEssence(diff);
            } else if (diff < 0) {
              spendEssence(Math.abs(diff));
            }
          },
          onCatchBreath: (healAmount: number) => {
            if (hero.recoveries.current > 0) {
              const newStamina = Math.min(hero.stamina.current + healAmount, hero.stamina.max);
              updateHero({
                stamina: { ...hero.stamina, current: newStamina },
                recoveries: { ...hero.recoveries, current: hero.recoveries.current - 1 },
              });
            }
          },
          onVictoriesChange: (newVictories: number) => {
            updateHero({ victories: newVictories });
          },
        }}
      >
        <CharacterStatsPanel onLevelUp={() => setShowLevelUp(true)} />
      </CollapsibleHeader>

      {/* Navigation Tabs - Dynamic based on hero class */}
      <nav className="view-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeView === tab.id ? 'active' : ''}
            onClick={() => setActiveView(tab.id as View)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {activeView === 'character' && <CharacterDetailsView />}

        {activeView === 'abilities' && <AbilitiesView />}

        {/* Summoner-specific: Minions tab */}
        {activeView === 'minions' && <CombatView />}

        {activeView === 'projects' && <ProjectsView />}

        {activeView === 'items' && <MagicItemsView />}

        {activeView === 'inventory' && <InventoryView />}

        {/* Talent Strain View */}
        {activeView === 'strain' && <StrainView />}

        {/* Null Field View */}
        {activeView === 'nullfield' && <NullFieldView />}

        {/* Placeholder for other class-specific views */}
        {['judgment', 'domain', 'persistent', 'ferocity', 'college', 'tactics', 'routines'].includes(activeView) && (
          <div className="placeholder-view">
            <h2>{tabs.find(t => t.id === activeView)?.label || 'Class Feature'}</h2>
            <p className="coming-soon">This class-specific feature is coming soon.</p>
          </div>
        )}
      </main>

      {/* Modals */}
      {showCharacterManager && (
        <CharacterManager
          onClose={() => setShowCharacterManager(false)}
          onCreateNew={handleCreateNew}
        />
      )}

      {showLevelUp && (
        <LevelUp onClose={() => setShowLevelUp(false)} />
      )}

      {/* Respite Confirmation Modal */}
      {showRespiteConfirm && (
        <div className="modal-overlay" onClick={() => setShowRespiteConfirm(false)}>
          <div className="respite-modal" onClick={e => e.stopPropagation()}>
            <h3>Take a Respite?</h3>
            <p className="respite-description">
              During a respite, you rest and recover. This will:
            </p>
            <ul className="respite-effects">
              <li>Convert <strong>{hero.victories} victories</strong> to <strong>{hero.victories} XP</strong></li>
              <li>Restore stamina to maximum ({hero.stamina.max})</li>
              <li>Restore all recoveries ({hero.recoveries.max})</li>
              <li>Reset surges to 0</li>
              <li>Dismiss all active minions</li>
            </ul>
            {hero.victories > 0 && (
              <p className="xp-preview">
                New XP total: {(hero.xp || 0) + hero.victories}
              </p>
            )}
            <div className="respite-actions">
              <button className="confirm-btn" onClick={handleRespite}>
                Take Respite
              </button>
              <button className="cancel-btn" onClick={() => setShowRespiteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roll History Panel - Available globally */}
      <RollHistoryPanel />

      {/* Legal/About Modal */}
      <LegalModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
      />
    </div>
  );
}

export default App;
