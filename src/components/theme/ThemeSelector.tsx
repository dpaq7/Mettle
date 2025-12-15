import React, { useState, useRef, useEffect } from 'react';
import { useTheme, setThemeOverride, clearThemeOverride, getDefaultThemeForClass } from '../../context/ThemeContext';
import { useHeroContext } from '../../context/HeroContext';
import { ThemeDefinition, ThemeId } from '../../types/theme';
import { HeroClass } from '../../types/hero';
import { classThemes, getThemeById } from '../../data/themes';
import { applyTheme, getCurrentThemeId, isUsingDefaultTheme } from '../../utils/themeManager';
import './ThemeSelector.css';

interface ThemeSelectorProps {
  className?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className = '' }) => {
  const { currentTheme, setTheme, themes } = useTheme();
  const { hero } = useHeroContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (!isOpen) {
        event.preventDefault();
        setIsOpen(true);
      }
    }
  };

  const handleThemeSelect = (theme: ThemeDefinition) => {
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
    setIsOpen(false);
  };

  const handleResetToDefault = () => {
    if (heroId) {
      clearThemeOverride(heroId);
      applyTheme(defaultTheme);
      setTheme(defaultTheme.id as ThemeId);
    }
    setIsOpen(false);
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent, theme: ThemeDefinition) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleThemeSelect(theme);
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
    <div
      className={`theme-selector ${className}`}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <button
        className="theme-selector__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select theme"
      >
        Themes
      </button>

      <div className={`theme-selector__dropdown ${isOpen ? 'theme-selector__dropdown--open' : ''}`}>
        <div className="theme-selector__header">
          <span>Select Theme</span>
          {hero && !isUsingDefault && (
            <button
              className="theme-selector__reset-btn"
              onClick={handleResetToDefault}
              title={`Reset to ${defaultTheme.name} (default for ${heroClass})`}
            >
              Reset
            </button>
          )}
        </div>

        {hero && (
          <div className="theme-selector__hint">
            Default: <strong>{defaultTheme.name}</strong>
          </div>
        )}

        <ul className="theme-selector__list" role="listbox" aria-label="Available themes">
          {selectableThemes.map((theme) => (
            <ThemeOption
              key={theme.id}
              theme={theme}
              isSelected={currentTheme === theme.id}
              isDefault={hero ? theme.defaultForClass === heroClass : false}
              onSelect={() => handleThemeSelect(theme)}
              onKeyDown={(e) => handleOptionKeyDown(e, theme)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ThemeOptionProps {
  theme: ThemeDefinition;
  isSelected: boolean;
  isDefault: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  theme,
  isSelected,
  isDefault,
  onSelect,
  onKeyDown,
}) => {
  // Defensive access to previewColors
  const previewColors = theme?.previewColors ?? { bg: '#1a1a1a', primary: '#00e6c3', secondary: '#a87de8' };

  return (
    <li
      className={`theme-option ${isSelected ? 'theme-option--selected' : ''} ${isDefault ? 'theme-option--default' : ''}`}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      <div className="theme-option__radio">
        {isSelected && <div className="theme-option__radio-dot" />}
      </div>
      <div className="theme-option__content">
        <div className="theme-option__name">
          {theme?.name ?? 'Unknown Theme'}
          {isDefault && <span className="theme-option__default-badge">Default</span>}
        </div>
        <div className="theme-option__description">{theme?.description ?? ''}</div>
      </div>
      <div className="theme-option__swatches">
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
    </li>
  );
};

export default ThemeSelector;
