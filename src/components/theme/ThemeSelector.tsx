import React from 'react';
import { useTheme, setThemeOverride, clearThemeOverride, getDefaultThemeForClass } from '../../context/ThemeContext';
import { useHeroContext } from '../../context/HeroContext';
import { ThemeDefinition, ThemeId } from '../../types/theme';
import { HeroClass } from '../../types/hero';
import { classThemes } from '../../data/themes';
import { applyTheme, isUsingDefaultTheme } from '../../utils/themeManager';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/shadcn';
import { RotateCcw } from 'lucide-react';
import './ThemeSelector.css';

interface ThemeSelectorProps {
  className?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className = '' }) => {
  const { currentTheme, setTheme } = useTheme();
  const { hero } = useHeroContext();

  // Get hero info for theme selection (with defensive defaults)
  const heroId = hero?.id ?? null;
  const heroClass: HeroClass = hero?.heroClass ?? 'summoner';

  // Safely get default theme with fallback
  let defaultTheme: ThemeDefinition;
  try {
    defaultTheme = getDefaultThemeForClass(heroClass);
  } catch {
    // Fallback to summoner theme definition inline if something goes wrong
    defaultTheme = classThemes.find(t => t.id === 'summoner') ?? classThemes[0];
  }

  const isUsingDefault = heroId ? isUsingDefaultTheme(heroId, heroClass) : true;

  const handleThemeSelect = (themeId: string) => {
    const theme = classThemes.find(t => t.id === themeId);
    if (!theme) return;

    // If we have a hero, save the override
    if (heroId) {
      // If selecting the default theme for this class, clear the override
      if (theme.id === defaultTheme.id) {
        clearThemeOverride(heroId);
      } else {
        setThemeOverride(heroId, theme.id);
      }
    }

    applyTheme(theme);
    setTheme(theme.id as ThemeId);
  };

  const handleResetToDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (heroId) {
      clearThemeOverride(heroId);
      applyTheme(defaultTheme);
      setTheme(defaultTheme.id as ThemeId);
    }
  };

  // Use class themes for selection (excludes MCDM theme)
  const selectableThemes = classThemes;

  // Safety check - if no themes available, don't render
  if (!selectableThemes || selectableThemes.length === 0) {
    console.warn('ThemeSelector: No selectable themes available');
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          Themes
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent variant="fantasy" align="end" className="w-72">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Select Theme</span>
          {hero && !isUsingDefault && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={handleResetToDefault}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </DropdownMenuLabel>

        {hero && (
          <p className="px-2 py-1 text-xs text-[var(--text-muted)]">
            Default: <strong className="text-[var(--accent-bright)]">{defaultTheme.name}</strong>
          </p>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={currentTheme} onValueChange={handleThemeSelect}>
          {selectableThemes.map((theme) => {
            const previewColors = theme?.previewColors ?? { bg: '#1a1a1a', primary: '#00e6c3', secondary: '#a87de8' };
            const isDefault = hero ? theme.defaultForClass === heroClass : false;

            return (
              <DropdownMenuRadioItem
                key={theme.id}
                value={theme.id}
                className="py-2 pr-2 cursor-pointer"
              >
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{theme?.name ?? 'Unknown Theme'}</span>
                      {isDefault && (
                        <span className="theme-option__default-badge">Default</span>
                      )}
                    </div>
                    {theme?.description && (
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        {theme.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <div
                      className="theme-option__swatch"
                      style={{ backgroundColor: previewColors.bg }}
                      title="Background"
                    />
                    <div
                      className="theme-option__swatch"
                      style={{ backgroundColor: previewColors.primary }}
                      title="Primary"
                    />
                    <div
                      className="theme-option__swatch"
                      style={{ backgroundColor: previewColors.secondary }}
                      title="Secondary"
                    />
                  </div>
                </div>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>

        {hero && (
          <>
            <DropdownMenuSeparator />
            <p className="px-2 py-1.5 text-xs text-[var(--text-dim)]">
              {isUsingDefault ? '✓ Using class default' : 'Custom theme selected'}
            </p>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
