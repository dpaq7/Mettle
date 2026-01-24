import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { CommandBarSection } from '@/components/layout/CommandBar';

interface NavigationState {
  activeSection: CommandBarSection;
  selectedItemId: string | null;
}

interface NavigationContextValue {
  activeSection: CommandBarSection;
  selectedItemId: string | null;
  setActiveSection: (section: CommandBarSection) => void;
  setSelectedItem: (id: string | null) => void;
  navigateTo: (section: CommandBarSection, itemId?: string | null) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

const STORAGE_KEY = 'mettle-navigation';

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [state, setState] = useState<NavigationState>(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          activeSection: parsed.activeSection || 'character',
          selectedItemId: parsed.selectedItemId || null,
        };
      }
    } catch (e) {
      // Ignore parse errors
    }
    return {
      activeSection: 'character',
      selectedItemId: null,
    };
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignore storage errors
    }
  }, [state]);

  const setActiveSection = useCallback((section: CommandBarSection) => {
    setState((prev) => ({
      ...prev,
      activeSection: section,
      selectedItemId: null, // Reset selection when changing sections
    }));
  }, []);

  const setSelectedItem = useCallback((id: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedItemId: id,
    }));
  }, []);

  const navigateTo = useCallback((section: CommandBarSection, itemId: string | null = null) => {
    setState({
      activeSection: section,
      selectedItemId: itemId,
    });
  }, []);

  const value: NavigationContextValue = {
    activeSection: state.activeSection,
    selectedItemId: state.selectedItemId,
    setActiveSection,
    setSelectedItem,
    navigateTo,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export default NavigationContext;
