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

  // Get hero info for theme selection
  const heroId = hero?.id;
  const heroClass: HeroClass = hero?.heroClass ?? 'summoner';
  const defaultTheme = getDefaultThemeForClass(heroClass);
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
          {theme.name}
          {isDefault && <span className="theme-option__default-badge">Default</span>}
        </div>
        <div className="theme-option__description">{theme.description}</div>
      </div>
      <div className="theme-option__swatches">
        <div
          className="theme-option__swatch"
          style={{ backgroundColor: theme.previewColors.bg }}
          title="Background"
        />
        <div
          className="theme-option__swatch"
          style={{ backgroundColor: theme.previewColors.primary }}
          title="Primary"
        />
        <div
          className="theme-option__swatch"
          style={{ backgroundColor: theme.previewColors.secondary }}
          title="Secondary"
        />
      </div>
    </li>
  );
};

export default ThemeSelector;
