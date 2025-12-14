import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ThemeId, ThemeContextType, ThemeDefinition } from '../types/theme';
import { HeroClass } from '../types/hero';
import {
  classThemes,
  getThemeById,
  getDefaultThemeForClass,
  mcdmTheme,
} from '../data/themes';
import {
  applyTheme,
  applyCreatorTheme as applyCreator,
  applyThemeForHero as applyForHero,
  loadSavedTheme,
  getCurrentThemeId as getThemeId,
  setThemeOverride,
  clearThemeOverride,
  isUsingDefaultTheme,
} from '../utils/themeManager';

const THEME_STORAGE_KEY = 'mettle-active-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        // Validate that saved value is a valid theme ID
        const theme = getThemeById(saved);
        if (theme) {
          return saved as ThemeId;
        }
      }
    } catch {
      // localStorage unavailable
    }
    return 'mcdm'; // Default to MCDM theme
  });

  // Apply initial theme on mount
  useEffect(() => {
    loadSavedTheme();
  }, []);

  // Apply theme when currentTheme changes
  useEffect(() => {
    const theme = getThemeById(currentTheme);
    if (theme) {
      applyTheme(theme);
    }
  }, [currentTheme]);

  const setTheme = useCallback((themeId: ThemeId) => {
    const theme = getThemeById(themeId);
    if (theme) {
      setCurrentTheme(themeId);
    } else {
      console.warn(`Invalid theme ID: ${themeId}`);
    }
  }, []);

  const applyThemeForHero = useCallback((heroId: string, heroClass: HeroClass) => {
    applyForHero(heroId, heroClass);
    // Update the state to reflect the applied theme
    const themeId = getThemeId(heroId, heroClass);
    setCurrentTheme(themeId);
  }, []);

  const applyCreatorTheme = useCallback(() => {
    applyCreator();
    setCurrentTheme('mcdm');
  }, []);

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    themes: classThemes, // Only provide class themes for selection
    applyThemeForHero,
    applyCreatorTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Additional hooks for theme management
export const useThemeForHero = (heroId: string | undefined, heroClass: HeroClass | undefined) => {
  const { applyThemeForHero, applyCreatorTheme } = useTheme();

  useEffect(() => {
    if (heroId && heroClass) {
      applyThemeForHero(heroId, heroClass);
    } else {
      applyCreatorTheme();
    }
  }, [heroId, heroClass, applyThemeForHero, applyCreatorTheme]);
};

// Export utility functions for use outside of React components
export {
  setThemeOverride,
  clearThemeOverride,
  isUsingDefaultTheme,
  getDefaultThemeForClass,
};
