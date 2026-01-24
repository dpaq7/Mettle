import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Ability } from '@/types/abilities';
import { Kit } from '@/types/common';

// Types for secondary detail content
export type SecondaryDetailType =
  | 'skill'
  | 'condition'
  | 'ability'
  | 'perk'
  | 'keyword'
  | 'ancestry-trait'
  | 'kit-ability'
  | 'combat-minions';

// Data payloads for types that need more than just an ID
export type SecondaryDetailData = {
  ability?: Ability;
  ancestryId?: string; // For ancestry-trait type
  kit?: Kit; // For kit-ability type
};

interface HistoryEntry {
  type: SecondaryDetailType;
  id: string;
  data?: SecondaryDetailData;
}

interface LockedPanel {
  type: SecondaryDetailType;
  id: string;
}

interface SecondaryDetailState {
  isOpen: boolean;
  type: SecondaryDetailType | null;
  id: string | null;
  data?: SecondaryDetailData;
  history: HistoryEntry[];
  lockedPanel: LockedPanel | null;
}

interface SecondaryDetailContextValue {
  // State
  isOpen: boolean;
  type: SecondaryDetailType | null;
  id: string | null;
  data?: SecondaryDetailData;
  historyLength: number;
  lockedPanel: LockedPanel | null;

  // Actions
  openSecondary: (type: SecondaryDetailType, id: string, data?: SecondaryDetailData) => void;
  closeSecondary: () => void;
  goBack: () => void;
  lockPanel: (type: SecondaryDetailType, id: string) => void;
  unlockPanel: () => void;
  returnToLockedPanel: () => void;
}

const SecondaryDetailContext = createContext<SecondaryDetailContextValue | null>(null);

const STORAGE_KEY = 'mettle-secondary-detail';

interface SecondaryDetailProviderProps {
  children: ReactNode;
}

export function SecondaryDetailProvider({ children }: SecondaryDetailProviderProps) {
  const [state, setState] = useState<SecondaryDetailState>(() => {
    // Load from localStorage for session continuity
    // Note: We only persist type/id, not data (abilities), as they may be stale
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          isOpen: parsed.isOpen || false,
          type: parsed.type || null,
          id: parsed.id || null,
          data: undefined, // Don't restore data from storage
          history: [], // Don't restore history with data from storage
          lockedPanel: null, // Don't restore locked panel from storage
        };
      }
    } catch (e) {
      // Ignore parse errors
    }
    return {
      isOpen: false,
      type: null,
      id: null,
      data: undefined,
      history: [],
      lockedPanel: null,
    };
  });

  // Persist to localStorage (only type/id, not data)
  useEffect(() => {
    try {
      const toSave = {
        isOpen: state.isOpen,
        type: state.type,
        id: state.id,
        // Don't persist data or history (contains non-serializable ability objects)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      // Ignore storage errors
    }
  }, [state]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.isOpen) {
        // If there's a locked panel and we're not on it, return to it instead of closing
        if (state.lockedPanel && (state.type !== state.lockedPanel.type || state.id !== state.lockedPanel.id)) {
          setState((prev) => ({
            ...prev,
            type: prev.lockedPanel!.type,
            id: prev.lockedPanel!.id,
            data: undefined,
            history: [],
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isOpen: false,
            type: null,
            id: null,
            data: undefined,
            history: [],
            lockedPanel: null,
          }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, state.lockedPanel, state.type, state.id]);

  const openSecondary = useCallback((type: SecondaryDetailType, id: string, data?: SecondaryDetailData) => {
    setState((prev) => {
      // Add current item to history if we're navigating to a new item
      const newHistory = prev.type && prev.id
        ? [...prev.history, { type: prev.type, id: prev.id, data: prev.data }]
        : prev.history;

      return {
        isOpen: true,
        type,
        id,
        data,
        history: newHistory,
        lockedPanel: prev.lockedPanel, // Preserve locked panel
      };
    });
  }, []);

  const closeSecondary = useCallback(() => {
    setState((prev) => {
      // If there's a locked panel, return to it instead of closing
      if (prev.lockedPanel) {
        return {
          ...prev,
          type: prev.lockedPanel.type,
          id: prev.lockedPanel.id,
          data: undefined,
          history: [],
        };
      }
      return {
        isOpen: false,
        type: null,
        id: null,
        data: undefined,
        history: [],
        lockedPanel: null,
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) {
        // No history - if there's a locked panel, return to it; otherwise close
        if (prev.lockedPanel) {
          return {
            ...prev,
            type: prev.lockedPanel.type,
            id: prev.lockedPanel.id,
            data: undefined,
            history: [],
          };
        }
        return {
          isOpen: false,
          type: null,
          id: null,
          data: undefined,
          history: [],
          lockedPanel: null,
        };
      }

      // Pop the last item from history
      const newHistory = [...prev.history];
      const lastItem = newHistory.pop()!;

      return {
        isOpen: true,
        type: lastItem.type,
        id: lastItem.id,
        data: lastItem.data,
        history: newHistory,
        lockedPanel: prev.lockedPanel,
      };
    });
  }, []);

  const lockPanel = useCallback((type: SecondaryDetailType, id: string) => {
    setState((prev) => ({
      ...prev,
      lockedPanel: { type, id },
    }));
  }, []);

  const unlockPanel = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lockedPanel: null,
    }));
  }, []);

  const returnToLockedPanel = useCallback(() => {
    setState((prev) => {
      if (!prev.lockedPanel) return prev;
      return {
        ...prev,
        isOpen: true,
        type: prev.lockedPanel.type,
        id: prev.lockedPanel.id,
        data: undefined,
        history: [],
      };
    });
  }, []);

  const value: SecondaryDetailContextValue = {
    isOpen: state.isOpen,
    type: state.type,
    id: state.id,
    data: state.data,
    historyLength: state.history.length,
    lockedPanel: state.lockedPanel,
    openSecondary,
    closeSecondary,
    goBack,
    lockPanel,
    unlockPanel,
    returnToLockedPanel,
  };

  return (
    <SecondaryDetailContext.Provider value={value}>
      {children}
    </SecondaryDetailContext.Provider>
  );
}

export function useSecondaryDetail() {
  const context = useContext(SecondaryDetailContext);
  if (!context) {
    throw new Error('useSecondaryDetail must be used within a SecondaryDetailProvider');
  }
  return context;
}

export default SecondaryDetailContext;
