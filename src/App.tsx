import { useState, useCallback } from 'react';
import { useHeroContext } from './context/HeroContext';
import { useCombatContext } from './context/CombatContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { SecondaryDetailProvider } from './context/SecondaryDetailContext';
import { useDiceRolling } from './hooks/useDiceRolling';
import { useCombatMinionManager } from './hooks/useCombatMinionManager';
import CharacterCreation from './components/creation/CharacterCreation';
import CharacterManager from './components/character/CharacterManager';
import LevelUpWizard from './components/character/LevelUpWizard';
import RollHistoryPanel from './components/shared/RollHistoryPanel';
import LegalModal from './components/shared/LegalModal';
import { ImportCharacterDialog } from './components/shared/ImportCharacterDialog';
import { DeleteCharacterDialog } from './components/shared/DeleteCharacterDialog';
import { RespecConfirmDialog } from './components/shared/RespecConfirmDialog';
import ErrorBoundary from './components/shared/ErrorBoundary';
import {
  downloadCharacterJSON,
  duplicateCharacter,
  saveCharacter,
  deleteCharacter,
  getAllCharacters,
} from './utils/storage';
import type { Hero } from './types';

// New layout components
import { AppShell } from './components/layout';
import {
  CharacterMasterList,
  CharacterDetailPane,
  ActionsMasterList,
  ActionsDetailPane,
  ProjectsMasterList,
  ProjectsDetailPane,
  InventoryMasterList,
  InventoryDetailPane,
  SecondaryDetailPane,
} from './components/sections';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/shadcn';
import './App.css';

// Content renderer based on active section
function SectionContent() {
  const { activeSection } = useNavigation();

  const masterPane = (() => {
    switch (activeSection) {
      case 'character':
        return <CharacterMasterList />;
      case 'actions':
        return <ActionsMasterList />;
      case 'projects':
        return <ProjectsMasterList />;
      case 'inventory':
        return <InventoryMasterList />;
      default:
        return <CharacterMasterList />;
    }
  })();

  const detailPane = (() => {
    switch (activeSection) {
      case 'character':
        return <CharacterDetailPane />;
      case 'actions':
        return <ActionsDetailPane />;
      case 'projects':
        return <ProjectsDetailPane />;
      case 'inventory':
        return <InventoryDetailPane />;
      default:
        return <CharacterDetailPane />;
    }
  })();

  // Secondary detail pane for rules information
  const secondaryPane = <SecondaryDetailPane />;

  return { masterPane, detailPane, secondaryPane, fullWidthPane: undefined };
}

function AppContent() {
  const { hero, setHero, updateHero } = useHeroContext();
  const { endCombat } = useCombatContext();
  const [showCharacterManager, setShowCharacterManager] = useState(false);
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showRespiteConfirm, setShowRespiteConfirm] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<Hero | null>(null);
  const [showRespecDialog, setShowRespecDialog] = useState(false);
  const [respecXpToPreserve, setRespecXpToPreserve] = useState<number>(0);

  // Use centralized dice rolling hook
  const { rollHistory } = useDiceRolling();

  // Auto-open Combat Minion Manager for Summoners entering combat
  useCombatMinionManager();

  const handleCreateNew = () => {
    setHero(null);
    setShowCharacterManager(false);
    setShowCharacterCreation(true);
  };

  const handleCharacterLoaded = () => {
    setShowCharacterManager(false);
    setShowCharacterCreation(false);
  };

  // Character management handlers
  const handleExportCharacter = useCallback(() => {
    if (hero) {
      downloadCharacterJSON(hero);
    }
  }, [hero]);

  const handleImportCharacter = useCallback(() => {
    setShowImportDialog(true);
  }, []);

  const handleImportComplete = useCallback((importedHero: Hero) => {
    setHero(importedHero);
    setShowCharacterCreation(false);
    setShowCharacterManager(false);
  }, [setHero]);

  const handleDuplicateCharacter = useCallback(() => {
    if (hero) {
      const duplicate = duplicateCharacter(hero);
      saveCharacter(duplicate);
      setHero(duplicate);
    }
  }, [hero, setHero]);

  const handleDeleteCharacterClick = useCallback(() => {
    if (hero) {
      setCharacterToDelete(hero);
      setShowDeleteDialog(true);
    }
  }, [hero]);

  const handleConfirmDelete = useCallback(() => {
    if (!characterToDelete) return;
    const allCharacters = getAllCharacters();
    const remainingCharacters = allCharacters.filter(c => c.id !== characterToDelete.id);
    deleteCharacter(characterToDelete.id);
    if (remainingCharacters.length > 0) {
      setHero(remainingCharacters[0].data);
    } else {
      setHero(null);
      setShowCharacterCreation(true);
    }
    setShowDeleteDialog(false);
    setCharacterToDelete(null);
  }, [characterToDelete, setHero]);

  const handleRespecCharacterClick = useCallback(() => {
    if (hero) {
      setShowRespecDialog(true);
    }
  }, [hero]);

  const handleConfirmRespec = useCallback(() => {
    if (!hero) return;
    const totalXp = (hero.xp || 0) + (hero.victories || 0);
    setRespecXpToPreserve(totalXp);
    setShowRespecDialog(false);
    setHero(null);
    setShowCharacterCreation(true);
  }, [hero, setHero]);

  const handleCreationComplete = () => {
    if (respecXpToPreserve > 0) {
      setRespecXpToPreserve(0);
    }
    setShowCharacterCreation(false);
  };

  const handleRespite = () => {
    if (!hero) return;
    const xpGained = hero.victories;
    const newXp = (hero.xp || 0) + xpGained;
    updateHero({
      xp: newXp,
      victories: 0,
      stamina: { ...hero.stamina, current: hero.stamina.max },
      recoveries: { ...hero.recoveries, current: hero.recoveries.max },
      surges: 0,
      activeSquads: [],
      activeConditions: [],
    });
    setShowRespiteConfirm(false);
  };

  const handleEndCombatWithTurnReset = useCallback(() => {
    endCombat();
  }, [endCombat]);

  // Check if can level up
  const canLevelUp = hero ? (hero.xp || 0) >= (hero.level * 3) : false;

  // Get section content - must be called unconditionally (uses hooks)
  const { masterPane, detailPane, secondaryPane, fullWidthPane } = SectionContent();

  // Show character creation if no hero
  if (!hero || showCharacterCreation) {
    return (
      <div className="app dark-mode">
        <main className="app-main-creation">
          <ErrorBoundary componentName="CharacterCreation">
            <CharacterCreation
              onComplete={handleCreationComplete}
              respecXp={respecXpToPreserve}
            />
          </ErrorBoundary>
        </main>
        {showCharacterManager && (
          <CharacterManager
            onClose={() => setShowCharacterManager(false)}
            onCreateNew={handleCreateNew}
            onCharacterLoaded={handleCharacterLoaded}
          />
        )}
        <LegalModal
          isOpen={showLegalModal}
          onClose={() => setShowLegalModal(false)}
        />
        <ImportCharacterDialog
          open={showImportDialog}
          onOpenChange={setShowImportDialog}
          onImport={handleImportComplete}
          existingNames={getAllCharacters().map(c => c.name)}
        />
      </div>
    );
  }

  return (
    <div className="app dark-mode">
      <AppShell
        onManageCharacters={() => setShowCharacterManager(true)}
        onCreateCharacter={handleCreateNew}
        onImportCharacter={handleImportCharacter}
        onExportCharacter={handleExportCharacter}
        onDuplicateCharacter={handleDuplicateCharacter}
        onRespecCharacter={handleRespecCharacterClick}
        onRespite={() => setShowRespiteConfirm(true)}
        onLevelUp={() => setShowLevelUp(true)}
        onShowAbout={() => setShowLegalModal(true)}
        canLevelUp={canLevelUp}
        masterPane={masterPane}
        detailPane={detailPane}
        secondaryPane={secondaryPane}
        fullWidthPane={fullWidthPane}
      />

      {/* Modals */}
      {showCharacterManager && (
        <CharacterManager
          onClose={() => setShowCharacterManager(false)}
          onCreateNew={handleCreateNew}
          onCharacterLoaded={handleCharacterLoaded}
        />
      )}

      {showLevelUp && (
        <LevelUpWizard onClose={() => setShowLevelUp(false)} />
      )}

      {/* Respite Confirmation Modal */}
      <AlertDialog open={showRespiteConfirm} onOpenChange={setShowRespiteConfirm}>
        <AlertDialogContent variant="fantasy">
          <AlertDialogHeader>
            <AlertDialogTitle>Take a Respite?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-left">
                <p className="mb-3">
                  During a respite, you rest and recover. This will:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-3">
                  <li>Convert <strong className="text-[var(--accent)]">{hero.victories} victories</strong> to <strong className="text-[var(--accent)]">{hero.victories} XP</strong></li>
                  <li>Restore stamina to maximum ({hero.stamina.max})</li>
                  <li>Restore all recoveries ({hero.recoveries.max})</li>
                  <li>Reset surges to 0</li>
                  <li>Dismiss all active minions</li>
                </ul>
                {hero.victories > 0 && (
                  <p className="text-[var(--accent)] font-medium">
                    New XP total: {(hero.xp || 0) + hero.victories}
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRespite}>
              Take Respite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Roll History Panel */}
      <RollHistoryPanel />

      {/* Legal/About Modal */}
      <LegalModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
      />

      {/* Import Character Dialog */}
      <ImportCharacterDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImport={handleImportComplete}
        existingNames={getAllCharacters().map(c => c.name)}
      />

      {/* Delete Character Confirmation Dialog */}
      <DeleteCharacterDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        character={characterToDelete}
        onConfirm={handleConfirmDelete}
        isCurrentCharacter={characterToDelete?.id === hero?.id}
      />

      {/* Re-spec Character Confirmation Dialog */}
      <RespecConfirmDialog
        open={showRespecDialog}
        onOpenChange={setShowRespecDialog}
        character={hero}
        onConfirm={handleConfirmRespec}
      />
    </div>
  );
}

function App() {
  return (
    <NavigationProvider>
      <SecondaryDetailProvider>
        <AppContent />
      </SecondaryDetailProvider>
    </NavigationProvider>
  );
}

export default App;
