Directory structure:
└── dpaq7-mettle/
    ├── README.md
    ├── class compendium.md
    ├── eslint.config.js
    ├── index.html
    ├── LICENSE
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── src/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   ├── components/
    │   │   ├── abilities/
    │   │   │   ├── AbilitiesView.css
    │   │   │   ├── AbilitiesView.tsx
    │   │   │   ├── LevelProgressionSection.css
    │   │   │   ├── LevelProgressionSection.tsx
    │   │   │   └── classWidgets/
    │   │   │       ├── CensorWidget.tsx
    │   │   │       ├── ClassAbilityWidget.tsx
    │   │   │       ├── ClassWidgets.css
    │   │   │       ├── ConduitWidget.tsx
    │   │   │       ├── ElementalistWidget.tsx
    │   │   │       ├── FuryWidget.tsx
    │   │   │       ├── index.ts
    │   │   │       ├── NullWidget.tsx
    │   │   │       ├── ShadowWidget.tsx
    │   │   │       ├── SummonerWidget.tsx
    │   │   │       ├── TacticianWidget.tsx
    │   │   │       ├── TalentWidget.tsx
    │   │   │       └── TroubadourWidget.tsx
    │   │   ├── character/
    │   │   │   ├── CharacterDetailsView.css
    │   │   │   ├── CharacterDetailsView.tsx
    │   │   │   ├── CharacterManager.css
    │   │   │   ├── CharacterManager.tsx
    │   │   │   ├── CharacterStatsPanel.css
    │   │   │   ├── CharacterStatsPanel.tsx
    │   │   │   ├── CircularTracker.css
    │   │   │   ├── CircularTracker.tsx
    │   │   │   ├── LevelUp.css
    │   │   │   ├── LevelUp.tsx
    │   │   │   ├── VictoryTracker.css
    │   │   │   └── VictoryTracker.tsx
    │   │   ├── classDetails/
    │   │   │   ├── FuryDetails/
    │   │   │   │   ├── FerocityTrackerView.css
    │   │   │   │   ├── FerocityTrackerView.tsx
    │   │   │   │   └── index.ts
    │   │   │   ├── NullDetails/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── NullFieldView.css
    │   │   │   │   └── NullFieldView.tsx
    │   │   │   ├── TalentDetails/
    │   │   │   │   ├── ClarityGauge.tsx
    │   │   │   │   ├── StrainDamagePreview.tsx
    │   │   │   │   ├── StrainView.css
    │   │   │   │   └── StrainView.tsx
    │   │   │   └── TroubadourDetails/
    │   │   │       ├── index.ts
    │   │   │       ├── RoutinesView.css
    │   │   │       └── RoutinesView.tsx
    │   │   ├── combat/
    │   │   │   ├── ActionEconomyPanel.css
    │   │   │   ├── ActionEconomyPanel.tsx
    │   │   │   ├── CombatView.css
    │   │   │   ├── CombatView.tsx
    │   │   │   ├── EssenceTracker.css
    │   │   │   ├── EssenceTracker.tsx
    │   │   │   ├── SquadTracker.css
    │   │   │   ├── SquadTracker.tsx
    │   │   │   ├── TurnFlowGuide.css
    │   │   │   └── TurnFlowGuide.tsx
    │   │   ├── creation/
    │   │   │   ├── ClassSelector.css
    │   │   │   ├── ClassSelector.tsx
    │   │   │   ├── FuryAspectSelector.css
    │   │   │   ├── FuryAspectSelector.tsx
    │   │   │   ├── SubclassSelector.css
    │   │   │   └── SubclassSelector.tsx
    │   │   ├── inventory/
    │   │   │   ├── ArtifactDisplay.tsx
    │   │   │   ├── CharacterPortrait.tsx
    │   │   │   ├── ConsumablesGrid.tsx
    │   │   │   ├── CustomItemForm.tsx
    │   │   │   ├── EquipmentLayout.tsx
    │   │   │   ├── EquipmentSlot.tsx
    │   │   │   ├── InventoryView.tsx
    │   │   │   ├── ItemSelector.tsx
    │   │   │   ├── PortraitControls.tsx
    │   │   │   ├── PortraitUploader.tsx
    │   │   │   └── slotConfig.ts
    │   │   ├── items/
    │   │   │   ├── MagicItemsView.css
    │   │   │   └── MagicItemsView.tsx
    │   │   ├── portfolio/
    │   │   │   ├── MinionCard.css
    │   │   │   ├── MinionCard.tsx
    │   │   │   ├── PortfolioManager.css
    │   │   │   └── PortfolioManager.tsx
    │   │   ├── projects/
    │   │   │   ├── ProjectsView.css
    │   │   │   └── ProjectsView.tsx
    │   │   ├── shared/
    │   │   │   ├── AbilityCard.css
    │   │   │   ├── AbilityCard.tsx
    │   │   │   ├── DiamondCheckbox.css
    │   │   │   ├── DiamondCheckbox.tsx
    │   │   │   ├── DiceRoller.css
    │   │   │   ├── DiceRoller.tsx
    │   │   │   ├── LegalModal.css
    │   │   │   ├── LegalModal.tsx
    │   │   │   ├── RollHistoryPanel.css
    │   │   │   ├── RollHistoryPanel.tsx
    │   │   │   ├── SectionHeader.css
    │   │   │   ├── SectionHeader.tsx
    │   │   │   ├── StatBox.css
    │   │   │   └── StatBox.tsx
    │   │   ├── theme/
    │   │   │   ├── index.ts
    │   │   │   ├── ThemeSelector.css
    │   │   │   └── ThemeSelector.tsx
    │   │   └── ui/
    │   │       ├── ActionCard.css
    │   │       ├── ActionCard.tsx
    │   │       ├── BoxRowTracker.css
    │   │       ├── BoxRowTracker.tsx
    │   │       ├── CharacterPortrait.css
    │   │       ├── CharacterPortrait.tsx
    │   │       ├── CollapsibleHeader.css
    │   │       ├── CollapsibleHeader.tsx
    │   │       ├── CompactStatBar.css
    │   │       ├── CompactStatBar.tsx
    │   │       ├── ConditionsTable.css
    │   │       ├── ConditionsTable.tsx
    │   │       ├── DrawSteelDice.css
    │   │       ├── DrawSteelDice.tsx
    │   │       ├── EssenceTracker.css
    │   │       ├── EssenceTracker.tsx
    │   │       ├── FixtureCard.css
    │   │       ├── FixtureCard.tsx
    │   │       ├── FlourishCorners.css
    │   │       ├── FlourishCorners.tsx
    │   │       ├── HexResourceBox.css
    │   │       ├── HexResourceBox.tsx
    │   │       ├── index.ts
    │   │       ├── PentagonStatBox.css
    │   │       ├── PentagonStatBox.tsx
    │   │       ├── PotencyIndicator.css
    │   │       ├── PotencyIndicator.tsx
    │   │       ├── ProgressionTracker.css
    │   │       ├── ProgressionTracker.tsx
    │   │       ├── RecoveriesTracker.css
    │   │       ├── RecoveriesTracker.tsx
    │   │       ├── ResourcePanel.css
    │   │       ├── ResourcePanel.tsx
    │   │       ├── SignatureMinionCard.css
    │   │       ├── SignatureMinionCard.tsx
    │   │       ├── SkillsGrid.css
    │   │       ├── SkillsGrid.tsx
    │   │       ├── StaminaTracker.css
    │   │       ├── StaminaTracker.tsx
    │   │       ├── SummonMinionCard.css
    │   │       ├── SummonMinionCard.tsx
    │   │       ├── SurgesTracker.css
    │   │       ├── SurgesTracker.tsx
    │   │       └── shadcn/
    │   │           ├── alert-dialog.tsx
    │   │           ├── badge.tsx
    │   │           ├── button.tsx
    │   │           ├── dialog.tsx
    │   │           ├── dropdown-menu.tsx
    │   │           ├── index.ts
    │   │           ├── input.tsx
    │   │           ├── label.tsx
    │   │           ├── motion-highlight.tsx
    │   │           ├── scroll-area.tsx
    │   │           ├── select.tsx
    │   │           ├── separator.tsx
    │   │           ├── spinner.tsx
    │   │           ├── tabs-radix.tsx
    │   │           ├── tabs.tsx
    │   │           ├── textarea.tsx
    │   │           └── tooltip.tsx
    │   ├── context/
    │   │   ├── CombatContext.tsx
    │   │   ├── HeroContext.tsx
    │   │   ├── RollHistoryContext.tsx
    │   │   └── ThemeContext.tsx
    │   ├── data/
    │   │   ├── action-economy.ts
    │   │   ├── class-mechanics.ts
    │   │   ├── class-tabs.ts
    │   │   ├── conditions.ts
    │   │   ├── formations.ts
    │   │   ├── magicItems.ts
    │   │   ├── progression.ts
    │   │   ├── projects.ts
    │   │   ├── reference-data.ts
    │   │   ├── skills.ts
    │   │   ├── themes.ts
    │   │   ├── abilities/
    │   │   │   └── summoner-abilities.ts
    │   │   ├── classes/
    │   │   │   ├── class-definitions.ts
    │   │   │   └── index.ts
    │   │   ├── fury/
    │   │   │   ├── abilities.ts
    │   │   │   ├── features.ts
    │   │   │   ├── growing-ferocity.ts
    │   │   │   ├── index.ts
    │   │   │   ├── progression.ts
    │   │   │   ├── stormwight-kits.ts
    │   │   │   └── subclasses.ts
    │   │   ├── null/
    │   │   │   ├── augmentations.ts
    │   │   │   ├── enhancements.ts
    │   │   │   ├── features.ts
    │   │   │   ├── index.ts
    │   │   │   ├── psi-boost.ts
    │   │   │   └── traditions.ts
    │   │   ├── portfolios/
    │   │   │   ├── demon.ts
    │   │   │   ├── elemental.ts
    │   │   │   ├── fey.ts
    │   │   │   ├── index.ts
    │   │   │   └── undead.ts
    │   │   └── troubadour/
    │   │       ├── features.ts
    │   │       ├── index.ts
    │   │       ├── routines.ts
    │   │       └── subclasses.ts
    │   ├── hooks/
    │   │   ├── useConditions.ts
    │   │   ├── useCustomItems.ts
    │   │   ├── useEquipment.ts
    │   │   ├── useEssence.ts
    │   │   ├── usePortfolio.ts
    │   │   ├── usePortrait.ts
    │   │   ├── useSquads.ts
    │   │   ├── useStaminaStates.ts
    │   │   └── useSummoner.ts
    │   ├── lib/
    │   │   └── utils.ts
    │   ├── styles/
    │   │   ├── dialog-fantasy.css
    │   │   ├── shadcn-theme.css
    │   │   ├── theme.css
    │   │   └── ui-components.css
    │   ├── types/
    │   │   ├── abilities.ts
    │   │   ├── action.ts
    │   │   ├── class-progression.ts
    │   │   ├── combat.ts
    │   │   ├── common.ts
    │   │   ├── equipment.ts
    │   │   ├── hero.ts
    │   │   ├── index.ts
    │   │   ├── minion.ts
    │   │   ├── portrait.ts
    │   │   ├── progression.ts
    │   │   ├── projects.ts
    │   │   ├── summoner.ts
    │   │   └── theme.ts
    │   └── utils/
    │       ├── calculations.ts
    │       ├── dice.ts
    │       ├── imageProcessing.ts
    │       ├── progression-display.ts
    │       ├── storage.ts
    │       └── themeManager.ts
    ├── src-tauri/
    │   ├── build.rs
    │   ├── Cargo.toml
    │   ├── tauri.conf.json
    │   ├── capabilities/
    │   │   └── default.json
    │   ├── icons/
    │   │   └── android/
    │   │       ├── mipmap-anydpi-v26/
    │   │       │   └── ic_launcher.xml
    │   │       └── values/
    │   │           └── ic_launcher_background.xml
    │   └── src/
    │       ├── lib.rs
    │       └── main.rs
    └── .github/
        └── workflows/
            └── release.yml


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# Mettle

> A comprehensive character manager for [Draw Steel](https://mcdm.gg/DrawSteel) TTRPG by MCDM Productions.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version](https://img.shields.io/badge/version-0.4.1-green.svg)]()

## Features

- **All 10 Hero Classes**: Full support for Censor, Conduit, Elementalist, Fury, Null, Shadow, Summoner, Tactician, Talent, and Troubadour
- **Character Creation**: Step-by-step wizard for ancestry, culture, career, and class selection
- **Combat Tracker**: Stamina, conditions, heroic resources, and action economy
- **Class-Specific Views**: Specialized interfaces for each class's unique mechanics
- **Minion Management**: Full squad and portfolio system for Summoners
- **Progression Tracking**: Level-up flow with feature unlocks and ability choices
- **Theme System**: Multiple color themes with class-specific defaults
- **Offline Support**: Works entirely offline after initial load
- **Import/Export**: Save and share characters as JSON files
- **Desktop App**: Optional native desktop application via Tauri

## Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Type-safe JavaScript |
| [Vite](https://vitejs.dev/) | 7.2 | Build tool & dev server |

### UI Components
| Technology | Version | Purpose |
|------------|---------|---------|
| [shadcn/ui](https://ui.shadcn.com/) | - | Component library |
| [Radix UI](https://www.radix-ui.com/) | 1.x | Accessible primitives |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utility-first CSS |
| [Lucide React](https://lucide.dev/) | 0.513 | Icon library |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| [Sass/SCSS](https://sass-lang.com/) | 1.94 | CSS preprocessor |
| CSS Custom Properties | - | Design tokens & theming |
| [Google Fonts](https://fonts.google.com/) | - | Typography (Cinzel, Source Sans 3) |
| [class-variance-authority](https://cva.style/) | 0.7 | Component variant styling |

### Desktop Application
| Technology | Version | Purpose |
|------------|---------|---------|
| [Tauri](https://tauri.app/) | 2.9 | Native desktop wrapper |
| [Rust](https://www.rust-lang.org/) | 1.77+ | Tauri backend runtime |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| [ESLint](https://eslint.org/) | 9.39 | Code linting |
| [TypeScript-ESLint](https://typescript-eslint.io/) | 8.46 | TS-specific linting rules |

### Data & Storage
| Technology | Purpose |
|------------|---------|
| localStorage | Client-side data persistence |
| JSON | Character import/export format |

### Architecture Highlights

- **Component-Based**: Modular React components organized by feature
- **shadcn/ui Integration**: Accessible, customizable UI components with fantasy theming
- **Context API**: State management via React Context (HeroContext, CombatContext, ThemeContext)
- **Custom Hooks**: Reusable logic (useSquads, useEssence, useConditions, etc.)
- **CSS Architecture**: BEM-inspired naming with CSS custom properties for theming
- **Offline-First**: Full functionality without internet after initial load
- **Type Safety**: Strict TypeScript with comprehensive interface definitions

### shadcn/ui Components

Custom fantasy-themed variants built on Radix UI primitives:

| Component | Variants | Usage |
|-----------|----------|-------|
| Button | `heroic`, `combat`, `chamfered`, `diamond`, `hexagon` | Actions throughout app |
| Dialog | `fantasy`, `scroll` | Modals (LevelUp, CharacterManager, ItemSelector) |
| Select | `fantasy` | Dropdowns (theme, equipment slots) |
| Input/Textarea | `fantasy` | Form fields |
| Tabs | `line`, `enclosed`, `soft` | Navigation (abilities, inventory) |
| Badge | `tier1`, `tier2`, `tier3`, `keyword` | Status indicators |
| DropdownMenu | `fantasy` | Context menus (theme selector) |
| AlertDialog | `fantasy` | Confirmations (respite, delete) |
| Tooltip | - | Help text |
| ScrollArea | - | Scrollable containers |

### Project Structure

```
src/
├── components/          # React components by feature
│   ├── abilities/       # Abilities tab components
│   ├── character/       # Character sheet components
│   ├── classDetails/    # Class-specific views (Null, Talent, etc.)
│   ├── combat/          # Combat management
│   ├── creation/        # Character creator
│   ├── inventory/       # Equipment & items
│   ├── shared/          # Reusable UI components
│   └── ui/
│       └── shadcn/      # shadcn/ui components (Button, Dialog, etc.)
├── context/             # React Context providers
├── data/                # Static game data & class definitions
├── hooks/               # Custom React hooks
├── styles/              # Global styles & theme variables
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

### Scripts

```bash
# Development
npm run dev          # Start Vite dev server

# Production
npm run build        # TypeScript compile + Vite build
npm run preview      # Preview production build

# Desktop App
npm run tauri:dev    # Run Tauri in development
npm run tauri:build  # Build native desktop app

# Code Quality
npm run lint         # Run ESLint
```

## Installation

### Pre-built App (macOS)

Download the latest `.dmg` from the Releases page. Works on both Intel and Apple Silicon Macs.

### Development

Requires Node.js 18+ and npm 9+. Rust toolchain required for Tauri builds.

```bash
# Clone the repository
git clone https://github.com/dpaq7/mettle.git
cd mettle

# Install dependencies
npm install

# Start development server
npm run dev

# Or run with Tauri (desktop)
npm run tauri:dev
```

### Building

```bash
# Web build
npm run build

# Desktop build (requires Rust)
npm run tauri build -- --target universal-apple-darwin
```

## Version History

- **v0.4.1** - iCloud sync fix for Tauri build artifacts
- **v0.4.0** - Complete shadcn/ui migration with fantasy theming, accessible components
- **v0.3.5** - Class progression system, stamina/dying fixes, UI improvements
- **v0.3.4** - Class ability widgets, legal attribution modal, theme fixes
- **v0.3.3** - Standardize hero class system, rename context to HeroContext
- **v0.3.0** - Mettle: Full Draw Steel support for all 10 classes
- **v0.2.x** - Forge Steel Summoner: Summoner-focused character manager
- **v0.1.x** - Initial development

## Attribution

**Mettle** is a fork of [Forge Steel](https://github.com/andyaiken/forgesteel), originally created by [Andy Aiken](https://github.com/andyaiken). We gratefully acknowledge Andy's foundational work that made this project possible.

## Legal

**Mettle** is an independent product published under the [DRAW STEEL Creator License](https://www.mcdmproductions.com/draw-steel-creator-license) and is not affiliated with MCDM Productions, LLC.

**DRAW STEEL** © 2024 MCDM Productions, LLC.

For more information about Draw Steel, visit [MCDM Productions](https://www.mcdmproductions.com).

## License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

This is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

### Third-Party Acknowledgments

- **Forge Steel** by Andy Aiken - Original codebase ([GPL v3 License](https://github.com/andyaiken/forgesteel/blob/main/LICENSE))
- **Draw Steel** by MCDM Productions - Game content ([Creator License](https://www.mcdmproductions.com/draw-steel-creator-license))



================================================
FILE: class compendium.md
================================================
The following compendium details the core mechanics and features for the ten available heroic classes in *Draw Steel*, excluding elements universal to all characters.

| Class | Primary Role | Heroic Resource (HR) | Key Ability/Focus | Starting Stamina (L1) / Per Level | Starting Recoveries | Potency Characteristic |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Censor** | Defender, Warrior | **Wrath** | Divine Judgment (targets enemies) | 21 / 9 | 12 | Presence |
| **Conduit** | Support, Spellcaster | **Piety** | Healing and Divine Domain Magic | 18 / 6 | 8 | Intuition |
| **Elementalist** | Controller, Mage | **Essence** | Elemental Area Control & Damage | 18 / 6 | 8 | Reason |
| **Fury** | Brute, Mobile Warrior | **Ferocity** | High Damage Melee & Forced Movement | 21 / 9 | 10 | Might |
| **Null** | Harrier, Psionic Warrior | **Discipline** | Psionic Defense & Battlefield Control | 21 / 9 | 8 | Intuition |
| **Shadow** | Ambusher, Rogue | **Insight** | Stealth, Mobility, Single-Target Damage | 18 / 6 | 8 | Agility |
| **Summoner** | Controller, Master Class | **Essence** | Summoning and Commanding Minions | 15 / 6 | 8 | Reason |
| **Tactician** | Artillery, Support | **Focus** | Commanding Allies and Marking Targets | 21 / 9 | 10 | Reason |
| **Talent** | Hexer, Psionic Mage | **Clarity** | Psionic Manipulation & Risk/Reward | 18 / 6 | 8 | Reason |
| **Troubadour**| Support, Entertainer | **Drama** | Inspire Allies and Manipulate Narrative | 18 / 6 | 8 | Presence |

***

## Censor
A **Censor** is a trained warrior devoted to a saint or god, specializing in confronting the wicked and locking down single enemies during combat.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Might 2, Presence 2**. |
| **Heroic Resource (Wrath)** | Starts with Wrath equal to **Victories**. Gains **2 Wrath** at the start of each turn. Gains **1 Wrath** the first time per round a creature *judged* deals damage to the Censor, OR the Censor deals damage to a creature *judged*. |
| **Potency Values** | Based on **Presence** (Weak: P-2, Average: P-1, Strong: P). |
| **Core Ability: Judgment** | A signature ability (no HR cost) that *judges* an enemy, marking them until the end of the encounter or dismissed. Triggers additional effects and Wrath gain when dealing damage to or being damaged by the *judged* target. |
| **Advancement** | Gains **Wrath Beyond Wrath** at Level 4 (gains 2 Wrath per trigger instead of 1) and **Focused Wrath** at Level 7 (gains 3 Wrath at start of turn). At Level 10, gains **Virtue** (Epic Resource) and **Wrath of the Gods** (gains 4 Wrath at start of turn). |

## Conduit
A **Conduit** is the devoted spellcasting priest of a saint or god who wields divine magic to smite enemies and support allies, renowned for healing abilities.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Intuition 2**. |
| **Heroic Resource (Piety)** | Starts with Piety equal to **Victories**. Gains **1d3 Piety** at the start of each turn. Can **Pray** (no action) before rolling for Piety for a chance to gain more Piety or activate a **Domain Effect** at the risk of taking psychic damage. |
| **Potency Values** | Based on **Intuition** (Weak: I-2, Average: I-1, Strong: I). |
| **Core Ability: Healing Grace** | A signature ability (no HR cost) that allows a target to spend a Recovery. Can spend Piety to increase the targets or effects. |
| **Advancement** | Gains **The Lists of Heaven** at Level 2, allowing the Conduit to spend a Recovery whenever an ally spends a Recovery. Gains **Blessed Domain** at Level 4 (gains +1 Piety per domain trigger) and **Faithful's Reward** at Level 7 (gains 1d3 + 1 Piety at start of turn). At Level 10, gains **Divine Power** (Epic Resource) and **Most Pious** (gains +1 Piety when praying). |

## Elementalist
An **Elementalist** is a mage who wields elemental forces and possesses a versatile array of tricks to control combat and manipulate the environment.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Reason 2**. |
| **Heroic Resource (Essence)** | Starts with Essence equal to **Victories**. Gains **2 Essence** at the start of each turn. Gains **1 Essence** the first time per round they or an ally takes elemental damage (non-untyped/non-holy damage). |
| **Potency Values** | Based on **Reason** (Weak: R-2, Average: R-1, Strong: R). |
| **Core Mechanic: Persistent Magic** | Allows the Elementalist to actively *maintain* certain heroic abilities past the turn they are used by permanently reducing the amount of Essence gained at the start of their turn by the ability's persistent value. |
| **Advancement** | Gains **Mantle of Essence** at Level 4, which creates an elemental aura (such as **Burning Grounds** or **Quaking Earth**) that affects the battlefield passively while Essence is above 3. Gains **Font of Essence** at Level 4 (+2 Essence per elemental damage trigger) and **Surging Essence** at Level 7 (+3 Essence at start of turn). At Level 10, gains **Breath** (Epic Resource) and **Essential Being** (gains 4 Essence at start of turn). |

## Fury
A **Fury** is a mobile warrior coursing with **Ferocity** who deals damage up close and pushes foes around the battlefield.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Might 2, Agility 2**. |
| **Heroic Resource (Ferocity)** | Starts with Ferocity equal to **Victories**. Gains **1d3 Ferocity** at the start of each turn. Gains **1 Ferocity** the first time per round they take damage. Gains **1d3 Ferocity** the first time per encounter they are winded or dying. |
| **Potency Values** | Based on **Might** (Weak: M-2, Average: M-1, Strong: M). |
| **Core Mechanic: Growing Ferocity** | Grants passive combat benefits that scale based on the current level of Ferocity possessed by the Fury. Benefits include increased push/slide distance, bonus surges, and double edge on maneuvers. |
| **Advancement** | Gains **Damaging Ferocity** at Level 4 (+2 Ferocity per damage trigger), and **Greater Ferocity** at Level 7 (gains 1d3 + 1 Ferocity at start of turn). Gaining a level also grants additional tiers of benefit to **Growing Ferocity**. At Level 10, gains **Primordial Power** (Epic Resource) and **Primordial Ferocity** (+3 Ferocity per damage trigger). |

## Null
A **Null** is an unarmed psionic warrior dedicated to discipline and order. They dampen supernatural effects, resist potencies, and utilize extreme speed and durability.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Agility 2, Intuition 2**. |
| **Heroic Resource (Discipline)** | Starts with Discipline equal to **Victories**. Gains **2 Discipline** at the start of each turn. Gains **1 Discipline** the first time per round an enemy in their Null Field uses a main action OR the Director spends Malice. |
| **Potency Values** | Based on **Intuition** (Weak: I-2, Average: I-1, Strong: I). |
| **Core Ability: Null Field** | A supernatural aura (1 aura, maneuver) projected around the Null that dampens the potencies of enemies by 1. Can spend Discipline to grant temporary tactical benefits. |
| **Advancement** | Gains **Regenerative Field** at Level 4 (+2 Discipline per enemy main action trigger) and **Improved Body** at Level 7 (gains 3 Discipline at start of turn). Gains **Psionic Augmentation** (L1) and **Psi Boost** (L7), allowing the spending of Discipline to enhance abilities (damage, range, potency, etc.). At Level 10, gains **Order** (Epic Resource) and **Manifold Resonance** (can teleport, ignore banes). |

## Shadow
A **Shadow** is an expert infiltrator and thief utilizing magic to remain hidden. They excel at burst damage, battlefield mobility, and getting out of harm's way before a counterattack.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Agility 2**. |
| **Heroic Resource (Insight)** | Starts with Insight equal to **Victories**. Gains **1d3 Insight** at the start of each turn. Gains **1 Insight** the first time per round they deal damage incorporating 1 or more surges. Abilities cost 1 less Insight if the power roll benefits from an edge or double edge. |
| **Potency Values** | Based on **Agility** (Weak: A-2, Average: A-1, Strong: A). |
| **Core Feature: Hesitation Is Weakness** | A free triggered action (L1) that allows the Shadow to spend 1 Insight to immediately take their turn after another hero ends theirs. |
| **Advancement** | Gains **Surge of Insight** at Level 4 (+2 Insight per surge damage trigger) and **Keen Insight** at Level 7 (gains 1d3 + 1 Insight at start of turn). Gains **Careful Observation** (L3) to gain an edge/surge on a strike if they assess the target first. At Level 10, gains **Death Pool** (gains 3 Insight per surge damage trigger) and **Subterfuge** (Epic Resource, allows extra maneuvers). |

## Summoner
The **Summoner** is a rare master class focused on piercing the veil between worlds to summon **Minions** that form an army under their command.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Reason 2**. |
| **Heroic Resource (Essence)** | Starts with Essence equal to **Victories**. Gains **2 Essence** at the start of each turn. Gains **1 Essence** the first time per round a minion dies *unwillingly*. Cost Reduction: Sacrifices minions (reduces cost by 1 per minion sacrificed). |
| **Potency Values** | Based on **Reason** (Weak: R-2, Average: R-1, Strong: R). |
| **Core Mechanic: Minion Management** | Can summon and maintain up to **8 minions** organized into two squads. Minions share a Stamina pool, act together on the Summoner's turn, and attack as a single unit. |
| **Core Feature: Summoner’s Range** | Maximum distance for summoning and certain abilities, equal to **5 + Reason score**. |
| **Advancement** | **Minion Improvement** (L4, L7, L10) increases maximum minions and their Stamina. **Font of Creation** (L7) gains 3 Essence at start of turn. **Summoner’s Kit** (L3) enhances Summoner Strike and grants wards. **Summoner’s Dominion** (L2) allows summoning a unique battlefield **Fixture**. **Portfolio Champion** (L8) grants access to a powerful unique minion. At Level 10, gains **Eidos** (Epic Resource) and **No Matter the Cost** (improved essence cost reduction). |

## Tactician
A **Tactician** is a brilliant strategist and weapons expert who excels at commanding allies and controlling the battle's flow.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Might 2, Reason 2**. |
| **Heroic Resource (Focus)** | Starts with Focus equal to **Victories**. Gains **2 Focus** at the start of each turn. Gains **1 Focus** the first time per round they or an ally damages a target *marked*, OR an ally uses a heroic ability. |
| **Potency Values** | Based on **Reason** (Weak: R-2, Average: R-1, Strong: R). |
| **Core Ability: Mark** | A maneuver (L1) that designates an enemy as *marked*. While marked, allies gain an edge on power rolls against the target. Spending Focus grants allies damage boosts, healing, or movement against the target. |
| **Advancement** | Gains **Focus on Their Weakness** at Level 4 (+2 Focus per damage trigger) and **Heightened Focus** at Level 7 (gains 3 Focus at start of turn). Gains **Field Arsenal** (L1) allowing them to equip and gain benefits from **two kits** simultaneously. Gains **Seize the Initiative** (L7), allowing their side to go first in combat if they aren't surprised. At Level 10, gains **Command** (Epic Resource, boosts power roll outcomes) and **True Focus** (gains 4 Focus at start of turn). |

## Talent
A **Talent** is a master of psionics who can bend the world to their will. Their unique mechanic allows them to spend Clarity they don't have, leading to the condition **Strained**.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Reason 2, Presence 2**. |
| **Heroic Resource (Clarity / Strain)** | Starts with Clarity equal to **Victories**. Gains **1d3 Clarity** at the start of each turn. Gains **1 Clarity** the first time per round a creature is force moved. Can spend Clarity below 0 (up to **1 + Reason score** negative max), becoming **Strained**. |
| **Potency Values** | Based on **Reason** (Weak: R-2, Average: R-1, Strong: R). |
| **Core Mechanic: Strain** | When Clarity is below 0, the Talent is **Strained**, taking 1 damage per negative Clarity point at the end of their turn. Many psionic abilities impose secondary detrimental effects if the Talent is Strained when using them. |
| **Advancement** | Gains **Mind Recovery** at Level 4 (converts Recovery to +3 Clarity when Strained) and **Lucid Mind** at Level 7 (gains 1d3 + 1 Clarity at start of turn). Gains **Psionic Augmentation** (L1) and **Psi Boost** (L6) allowing Clarity to be spent to enhance abilities (range, damage, potency, etc.). At Level 10, gains **Vision** (Epic Resource) and **Clear Mind** (gains 3 Clarity per force move trigger). |

## Troubadour
A **Troubadour** is a storytelling swashbuckler who channels the dynamism of battle into Drama to inspire allies and influence the narrative.

| Core Mechanic | Details |
| :--- | :--- |
| **Starting Characteristics** | **Agility 2, Presence 2**. |
| **Heroic Resource (Drama)** | Starts with Drama equal to **Victories**. Gains **1d3 Drama** at the start of each turn. Gains Drama upon major narrative events: 3+ heroes act on same turn (+2); hero becomes winded (+2); natural 19/20 (+3); hero dies (+10). Can resurrect themselves at 30 Drama. |
| **Potency Values** | Based on **Presence** (Weak: P-2, Average: P-1, Strong: P). |
| **Core Mechanic: Routines** | Allows the Troubadour to activate and maintain up to one passive performance effect per round (such as **Choreography** or **Revitalizing Limerick**) that affects allies within their aura. |
| **Advancement** | Gains **Melodrama** at Level 4 (select two new Drama gain triggers) and **A Muse’s Muse** at Level 7 (gains 1d3 + 1 Drama at start of turn). Gains **Scene Partner** (L1) to form bonds with NPCs for negotiation buffs. Gains **Equal Billing** (L7) to form bonds with heroes for saving throw buffs. At Level 10, gains **Applause** (Epic Resource) and **Dramaturgy** (enhances performances). |

***

To think of these classes collectively, consider them as specialized gears in a complex clockwork machine. The **Fury** is the swinging pendulum generating raw momentum, while the **Tactician** is the main cog coordinating every minute movement. The **Censor** and **Conduit** represent the essential divine structure ensuring the machine operates with moral force, opposite the chaos unleashed by the **Elementalist**'s pure power and the subtle distortions introduced by the **Shadow**. The **Null** acts as a metaphysical shock absorber, protecting the delicate mechanisms, while the **Talent** attempts to wind the whole clock faster—even at the risk of breaking it. Finally, the **Summoner** turns small components (minions) into entire working sub-assemblies, and the **Troubadour** ensures the machine's operation is always the most dramatic story told.


================================================
FILE: eslint.config.js
================================================
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])



================================================
FILE: index.html
================================================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/mettle-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mettle - Draw Steel Character Manager</title>
    <meta name="description" content="Mettle - A comprehensive character manager for Draw Steel TTRPG" />

    <!-- Google Fonts: Cinzel (display) + Source Sans 3 (body) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>



================================================
FILE: package.json
================================================
{
  "name": "mettle",
  "private": true,
  "version": "0.4.1",
  "description": "Mettle - A Draw Steel TTRPG Character Manager",
  "author": "Dan Paquin",
  "license": "GPL-3.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "tauri": "tauri",
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build",
    "tauri:build:mac": "tauri build --target universal-apple-darwin",
    "tauri:build:win": "tauri build --target x86_64-pc-windows-msvc",
    "tauri:build:linux": "tauri build --target x86_64-unknown-linux-gnu"
  },
  "dependencies": {
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tauri-apps/api": "^2.9.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.561.0",
    "motion": "^12.23.26",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@tailwindcss/postcss": "^4.1.18",
    "@tauri-apps/cli": "^2.9.5",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.23",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "sass": "^1.94.2",
    "tailwindcss": "^4.1.18",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}



================================================
FILE: postcss.config.js
================================================
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}



================================================
FILE: tailwind.config.js
================================================
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map shadcn semantic colors to Mettle CSS variables
        border: "var(--border-solid)",
        input: "var(--bg-darkest)",
        ring: "var(--accent-glow)",
        background: "var(--bg-dark)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--accent-bright)",
          foreground: "var(--bg-darkest)",
        },
        secondary: {
          DEFAULT: "var(--bg-medium)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "var(--text-primary)",
        },
        muted: {
          DEFAULT: "var(--bg-dark)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--accent-dim)",
          foreground: "var(--accent-bright)",
        },
        popover: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-primary)",
        },
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-primary)",
        },
        // Mettle-specific colors
        mettle: {
          cyan: {
            bright: "var(--accent-bright)",
            glow: "var(--accent-glow)",
            soft: "var(--accent-soft)",
            dim: "var(--accent-dim)",
          },
          bg: {
            darkest: "var(--bg-darkest)",
            dark: "var(--bg-dark)",
            medium: "var(--bg-medium)",
            light: "var(--bg-light)",
            hover: "var(--bg-hover)",
          },
          text: {
            primary: "var(--text-primary)",
            secondary: "var(--text-secondary)",
            bone: "var(--text-bone)",
            muted: "var(--text-muted)",
          },
          success: "var(--success)",
          danger: "var(--danger)",
          warning: "var(--warning)",
          essence: "var(--essence)",
          xp: "var(--xp)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        display: ["Cinzel", "Times New Roman", "Georgia", "serif"],
        body: ["Source Sans 3", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "var(--shadow-glow)" },
          "50%": { boxShadow: "var(--shadow-glow-strong)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}



================================================
FILE: tsconfig.app.json
================================================
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": false
  },
  "include": ["src"]
}



================================================
FILE: tsconfig.json
================================================
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}



================================================
FILE: tsconfig.node.json
================================================
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}



================================================
FILE: vite.config.ts
================================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Tauri desktop apps load locally, so larger chunks are acceptable
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
  },
})



================================================
FILE: src/App.css
================================================
/* ============================================
   FORGE STEEL SUMMONER - App Styles
   Using theme.css design tokens
   ============================================ */

/* Root Styles - Fixed viewport height approach */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#root {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* ============================================
   APP LAYOUT
   ============================================ */
.app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-dark);
  color: var(--text-primary);
  overflow: hidden;
}

.app.dark-mode {
  background: var(--bg-dark);
  color: var(--text-primary);
}

/* ============================================
   APP HEADER
   ============================================ */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--bg-darkest);
  border-bottom: 1px solid var(--border-solid);
}

.app-header h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--accent-bright);
  text-shadow: var(--text-glow);
}

.app-header button {
  padding: 0.5rem 1rem;
  background: var(--accent-bright);
  color: var(--bg-darkest);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.app-header button:hover {
  background: var(--accent-glow);
  box-shadow: var(--shadow-glow);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.manage-chars-btn {
  padding: 0.5rem 1rem;
  background: var(--accent-bright);
  color: var(--bg-darkest);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all var(--transition-fast);
}

.manage-chars-btn:hover {
  background: var(--accent-glow);
  box-shadow: var(--shadow-glow);
}

.about-button {
  background: none;
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.about-button:hover {
  border-color: var(--accent-bright);
  color: var(--accent-bright);
}

/* Compact Header */
.app-header.compact {
  padding: 0.5rem 1.5rem;
}

.app-header.compact h1 {
  font-size: var(--font-size-lg);
}

.app-header.compact .header-actions {
  gap: 0.75rem;
}

.app-header.compact .manage-chars-btn,
.app-header.compact .start-combat-btn,
.app-header.compact .end-combat-btn {
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-xs);
}

.app-header.compact .about-button {
  padding: 0.3rem 0.5rem;
  font-size: var(--font-size-xs);
}

/* ============================================
   APP MAIN CONTENT
   ============================================ */
.app-main {
  flex: 1 1 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.app-main > * {
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
}

/* ============================================
   CHARACTER CREATION
   ============================================ */
.character-creation {
  width: 100%;
}

.creation-progress {
  margin-bottom: 2rem;
}

.creation-step {
  min-height: 400px;
  width: 100%;
}

/* Name Step */
.creation-step.name-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
  background: linear-gradient(135deg, var(--bg-medium) 0%, var(--bg-dark) 100%);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-solid);
  box-shadow: var(--inner-glow);
}

.creation-step.name-step h2 {
  font-size: 2.5rem;
  color: var(--accent-bright);
  text-shadow: var(--text-glow);
}

.name-input-container {
  width: 100%;
  max-width: 500px;
  margin-top: 1rem;
}

.name-input-container input[type="text"] {
  width: 100%;
  max-width: none;
  padding: 1.25rem 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  background: var(--bg-darkest);
  border: 2px solid var(--border-solid);
  border-radius: var(--radius-xl);
}

.name-input-container input[type="text"]:focus {
  border-color: var(--accent-glow);
  box-shadow: var(--shadow-glow);
}

.creation-step h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--accent-bright);
}

.step-description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.creation-step input[type="text"] {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  font-size: 1.2rem;
  background: var(--bg-darkest);
  border: 2px solid var(--border-solid);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  margin-top: 1rem;
}

.creation-step input[type="text"]:focus {
  outline: none;
  border-color: var(--accent-glow);
  box-shadow: var(--shadow-glow);
}

/* ============================================
   OPTIONS GRID
   ============================================ */
.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
}

@media (max-width: 1000px) {
  .options-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
}

.option-card {
  background: var(--bg-medium);
  border: 2px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.option-card:hover:not(.max-reached):not(.disabled) {
  border-color: var(--accent-bright);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.option-card.selected {
  border-color: var(--accent-bright);
  background: var(--bg-light);
  box-shadow: var(--shadow-glow-strong);
}

/* Max selection reached - dim unselected options */
.option-card.max-reached,
.option-card.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(50%);
}

.option-card.max-reached:not(.selected),
.option-card.disabled:not(.selected) {
  border-color: var(--border-solid);
  background: var(--bg-dark);
}

/* Selection counter styling */
.selection-counter {
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--text-muted);
  display: inline-block;
}

.selection-counter span.complete {
  color: var(--success);
  font-weight: 600;
}

.option-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--accent-bright);
  font-size: 1.3rem;
}

.option-card p {
  margin: 0.5rem 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
}

.option-card em {
  color: var(--text-muted);
  font-style: italic;
}

.option-card ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.option-card li {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

/* ============================================
   NULL TRADITION & AUGMENTATION STEPS
   ============================================ */

.null-tradition-step,
.augmentation-step {
  max-width: 1200px;
}

.null-options,
.augmentation-options {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 900px) {
  .null-options,
  .augmentation-options {
    grid-template-columns: 1fr;
  }
}

/* Tradition Card Styling */
.tradition-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tradition-card .tradition-focus {
  color: var(--null-primary, #7c3aed);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.tradition-card .tradition-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.tradition-card .detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tradition-card .detail-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tradition-card .detail-value {
  font-size: 0.85rem;
  color: var(--text-primary);
}

.tradition-card .mastery-list {
  margin: 0.25rem 0 0 0;
  padding-left: 1rem;
  font-size: 0.85rem;
}

.tradition-card .mastery-list li {
  margin: 0.15rem 0;
}

.tradition-card .more-hint {
  color: var(--text-muted);
  font-style: italic;
  list-style: none;
  margin-left: -1rem;
}

.tradition-card .feature-name {
  font-size: 0.9rem;
  color: var(--null-primary, #7c3aed);
  font-weight: 500;
}

.tradition-card.selected {
  border-color: var(--null-primary, #7c3aed);
  box-shadow: 0 0 12px rgba(124, 58, 237, 0.3);
}

/* Selection Preview */
.selection-preview {
  margin-top: 1.5rem;
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-left: 3px solid var(--null-primary, #7c3aed);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  padding: 1rem 1.25rem;
}

.selection-preview h4 {
  color: var(--null-primary, #7c3aed);
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.selection-preview p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}

/* Augmentation Card Styling */
.augmentation-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.augmentation-card .augmentation-effects {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.augmentation-card .effects-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.augmentation-card .effects-list {
  margin: 0.25rem 0 0 0;
  padding-left: 1rem;
}

.augmentation-card .effect-item {
  color: var(--null-primary, #7c3aed);
  font-weight: 500;
  font-size: 0.95rem;
  margin: 0.2rem 0;
}

.augmentation-card .stat-preview {
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-dark);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-style: italic;
}

.augmentation-card.selected {
  border-color: var(--null-primary, #7c3aed);
  box-shadow: 0 0 12px rgba(124, 58, 237, 0.3);
}

/* Augmentation Note */
.augmentation-note {
  margin-top: 1.5rem;
  background: var(--bg-dark);
  border-left: 3px solid var(--null-primary, #7c3aed);
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.augmentation-note strong {
  color: var(--text-primary);
}

/* ============================================
   CHARACTERISTICS ASSIGNMENT
   ============================================ */
.characteristics {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

@media (max-width: 800px) {
  .characteristics {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 500px) {
  .characteristics {
    grid-template-columns: repeat(2, 1fr);
  }
}

.characteristics div {
  background: var(--bg-medium);
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-solid);
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--accent-bright);
}

.characteristics-step {
  width: 100%;
}

.characteristics-assignment {
  margin-top: 2rem;
}

.available-values {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
}

.available-values h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.value-pool {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}

.value-chip {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-lg);
  background: var(--bg-light);
  border: 2px solid var(--border-solid);
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: bold;
  cursor: not-allowed;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-chip.clickable {
  cursor: pointer;
  border-color: var(--accent-bright);
  background: var(--bg-medium);
}

.value-chip.clickable:hover {
  background: var(--bg-light);
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.value-chip:disabled {
  opacity: 0.5;
}

.all-assigned {
  color: var(--success);
  font-weight: 500;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 1000px) {
  .characteristics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .characteristics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.characteristic-slot {
  background: var(--bg-medium);
  border: 2px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
}

.characteristic-slot:hover {
  border-color: var(--accent-dim);
  background: var(--bg-light);
}

.characteristic-slot.selected {
  border-color: var(--accent-bright);
  background: var(--bg-light);
  box-shadow: var(--shadow-glow);
  animation: pulse-glow 1.5s infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: var(--shadow-glow); }
  50% { box-shadow: var(--shadow-glow-strong); }
}

.characteristic-slot.assigned {
  border-color: var(--success);
  background: var(--success-dark);
}

.characteristic-slot.assigned:hover {
  border-color: var(--danger);
  background: var(--danger-dark);
}

.char-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.char-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.char-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-bright);
}

.characteristic-slot.assigned .char-value {
  color: var(--success);
}

.char-desc {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.3;
}

.clear-hint,
.select-hint,
.click-hint {
  display: block;
  font-size: 0.7rem;
  margin-top: 0.5rem;
  text-transform: uppercase;
}

.clear-hint {
  color: var(--danger);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.characteristic-slot.assigned:hover .clear-hint {
  opacity: 1;
}

.select-hint {
  color: var(--accent-bright);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.click-hint {
  color: var(--text-muted);
}

.characteristic-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.quick-action-btn {
  padding: 0.75rem 1.25rem;
  background: var(--accent-bright);
  color: var(--bg-darkest);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.quick-action-btn:hover {
  background: var(--accent-glow);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.quick-action-btn.secondary {
  background: var(--bg-light);
  color: var(--text-primary);
  border: 1px solid var(--border-solid);
}

.quick-action-btn.secondary:hover {
  background: var(--bg-hover);
  border-color: var(--accent-dim);
}

.characteristic-preview {
  background: var(--success-dark);
  border: 1px solid var(--success);
  border-radius: var(--radius-lg);
  padding: 1rem 1.5rem;
}

.characteristic-preview h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--success);
  text-transform: uppercase;
}

.preview-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.preview-stat {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.preview-stat .stat-name {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.preview-stat .stat-value {
  color: var(--success);
  font-weight: bold;
  font-size: 1.1rem;
}

/* ============================================
   LANGUAGE SELECTION
   ============================================ */
.languages-step {
  width: 100%;
}

.language-info {
  margin-top: 1.5rem;
}

.known-language {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--success-dark);
  border: 1px solid var(--success);
  border-radius: var(--radius-lg);
  max-width: 300px;
}

.known-language .lang-name {
  font-weight: 600;
  color: var(--success);
  font-size: 1.1rem;
}

.known-language .lang-note {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.language-selection {
  margin-top: 1.5rem;
}

.known-languages {
  margin-bottom: 1.5rem;
}

.known-languages h4,
.available-languages h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.language-chip {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: var(--success-dark);
  border: 1px solid var(--success);
  border-radius: var(--radius-lg);
}

.language-chip.default .lang-name {
  color: var(--success);
  font-weight: 600;
}

.language-chip .lang-desc {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.languages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 1000px) {
  .languages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .languages-grid {
    grid-template-columns: 1fr;
  }
}

.language-option {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: var(--bg-medium);
  border: 2px solid var(--border-solid);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.language-option:hover:not(.disabled) {
  border-color: var(--accent-dim);
  background: var(--bg-light);
}

.language-option.selected {
  border-color: var(--success);
  background: var(--success-dark);
}

.language-option.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.language-option .lang-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.language-option.selected .lang-name {
  color: var(--success);
}

.language-option .lang-desc {
  color: var(--text-muted);
  font-size: 0.75rem;
  line-height: 1.3;
}

/* ============================================
   SKILL SELECTION
   ============================================ */
.skills-step {
  width: 100%;
}

.skill-category {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.skill-category h3 {
  margin: 0 0 0.5rem 0;
  color: var(--accent-bright);
  font-size: 1.2rem;
}

.category-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.skill-selection {
  margin-bottom: 1.5rem;
}

.skill-selection h4 {
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
  font-size: 1rem;
}

.skill-selection.fixed h4 {
  color: var(--text-muted);
}

.fixed-skill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--bg-light);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-solid);
}

.fixed-skill .skill-name {
  color: var(--text-primary);
  font-weight: 500;
}

.skill-badge {
  background: rgba(0, 230, 195, 0.15);
  color: var(--accent-bright);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  text-transform: uppercase;
}

.skill-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 1000px) {
  .skill-options {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .skill-options {
    grid-template-columns: 1fr;
  }
}

.skill-option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  background: var(--bg-light);
  border: 2px solid var(--border-solid);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.skill-option:hover {
  border-color: var(--accent-bright);
  background: var(--bg-hover);
}

.skill-option.selected {
  border-color: var(--accent-bright);
  background: var(--bg-light);
  box-shadow: var(--shadow-glow);
}

.skill-option .skill-name {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.skill-option.selected .skill-name {
  color: var(--accent-bright);
}

.skill-option .skill-desc {
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.3;
}

/* ============================================
   CREATION ACTIONS
   ============================================ */
.creation-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-solid);
  width: 100%;
}

.creation-actions button {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.creation-actions button:first-child {
  background: var(--bg-light);
  color: var(--text-primary);
  border: 1px solid var(--border-solid);
}

.creation-actions button:first-child:hover {
  background: var(--bg-hover);
}

.creation-actions button:last-child {
  background: var(--accent-bright);
  color: var(--bg-darkest);
}

.creation-actions button:last-child:hover {
  background: var(--accent-glow);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.creation-actions button:disabled {
  background: var(--bg-light);
  color: var(--text-muted);
  cursor: not-allowed;
  transform: none;
}

.creation-actions button:disabled:hover {
  background: var(--bg-light);
  transform: none;
  box-shadow: none;
}

/* ============================================
   VIEW TABS (shadcn RadixTabs)
   ============================================ */
.view-tabs-container {
  width: 100%;
}

.view-tabs {
  display: flex;
  width: 100%;
  gap: 0;
  padding: 0 1rem;
  background: var(--bg-darkest);
  border-bottom: 1px solid var(--border-solid);
  border-radius: 0;
  clip-path: none;
}

.view-tabs button {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: var(--font-display);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  position: relative;
  clip-path: none;
  border-radius: 0;
}

.view-tabs button:hover {
  color: var(--text-secondary);
  background: rgba(0, 230, 195, 0.02);
}

/* Radix uses data-state attribute instead of .active class */
.view-tabs button[data-state="active"] {
  color: var(--accent-bright);
  border-bottom-color: var(--accent-bright);
  background: rgba(0, 230, 195, 0.08);
  text-shadow: var(--text-glow);
  box-shadow: none;
}

.mode-toggle {
  padding: 0.5rem;
  background: transparent;
  border: 2px solid var(--border-solid);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1.2rem;
  transition: all var(--transition-fast);
}

.mode-toggle:hover {
  border-color: var(--accent-bright);
  color: var(--accent-bright);
}

/* ============================================
   CHARACTER INFO BAR
   ============================================ */
.character-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-darkest);
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-solid);
  gap: 2rem;
  flex-wrap: wrap;
}

.character-basic h2 {
  margin: 0;
  color: var(--accent-bright);
  font-size: 1.5rem;
  text-shadow: var(--text-glow);
}

.character-basic .level,
.character-basic .circle {
  display: inline-block;
  margin-left: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.character-stats-summary {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
}

.stat-value {
  color: var(--accent-bright);
  font-size: 1.2rem;
  font-weight: bold;
}

.start-combat-btn,
.end-combat-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  font-weight: bold;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.start-combat-btn {
  background: var(--success);
  color: var(--bg-darkest);
}

.start-combat-btn:hover {
  background: #66bb6a;
  box-shadow: 0 0 12px rgba(76, 175, 80, 0.4);
}

.end-combat-btn {
  background: var(--danger);
  color: white;
}

.end-combat-btn:hover {
  background: #d32f2f;
  box-shadow: 0 0 12px rgba(244, 67, 54, 0.4);
}

/* ============================================
   CHARACTER VIEW
   ============================================ */
.character-view {
  max-width: 100%;
  margin: 0;
}

.character-layout {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 2rem;
  padding: 2rem;
}

.character-main {
  min-width: 0;
}

.character-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}

.level-up-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, var(--warning) 0%, #e6a300 100%);
  color: var(--bg-darkest);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 2px 8px rgba(240, 198, 116, 0.3);
}

.level-up-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(240, 198, 116, 0.5);
}

.character-view h2 {
  color: var(--accent-bright);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.character-view > p {
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.character-stats,
.portfolio-preview,
.active-squads {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.character-stats h3,
.portfolio-preview h3,
.active-squads h3 {
  color: var(--accent-bright);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.character-stats p,
.portfolio-preview p,
.active-squads p {
  margin: 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

/* ============================================
   STATS GRID
   ============================================ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-box {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.stat-box h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
}

.characteristics-display div,
.combat-stats-display div {
  margin: 0.5rem 0;
  color: var(--text-primary);
}

.formation-info p {
  margin: 0.5rem 0;
  color: var(--text-primary);
}

.command-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-style: italic;
}

.portfolio-info p {
  margin: 0.5rem 0;
  color: var(--text-primary);
}

/* ============================================
   ABILITIES SECTION
   ============================================ */
.abilities-view {
  /* padding handled by .app-main > * */
}

.abilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 700px) {
  .abilities-grid {
    grid-template-columns: 1fr;
  }
}

.info-card {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1rem;
  box-shadow: var(--inner-glow);
}

.info-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: var(--accent-bright);
}

.quick-command strong {
  color: var(--warning);
  font-size: 0.9rem;
}

.quick-command p {
  margin: 0.5rem 0 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.portfolio-summary p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.portfolio-summary strong {
  color: var(--text-secondary);
}

.abilities-section {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: 1rem;
}

.abilities-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--accent-bright);
}

.abilities-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ability-card-compact {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-left: 3px solid var(--accent-dim);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  position: relative;
  transition: all var(--transition-fast);
}

.ability-card-compact:hover {
  background: var(--bg-light);
  border-left-color: var(--accent-bright);
  box-shadow: var(--inner-glow);
}

.ability-card-compact h4 {
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
  font-size: 1.05rem;
  font-weight: 600;
  padding-right: 3rem;
}

.ability-type {
  display: inline-block;
  background: var(--bg-light);
  color: var(--warning);
  font-size: 0.7rem;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  margin-bottom: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.ability-card-compact .essence-cost {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: var(--essence);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.85rem;
}

.ability-description {
  margin: 0.5rem 0 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* ============================================
   COMBAT LAYOUT
   ============================================ */
.combat-view {
  width: 100%;
}

.combat-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 1.5rem;
}

.combat-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.combat-right {
  min-height: 600px;
}

/* Combat toggle in header */
.app-header .combat-toggle {
  display: flex;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .options-grid {
    grid-template-columns: 1fr;
  }

  .creation-actions {
    flex-direction: column;
  }

  .creation-actions button {
    width: 100%;
  }

  .character-info-bar {
    flex-direction: column;
  }

  .combat-layout {
    flex-direction: column;
  }

  .character-layout {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .character-sidebar {
    order: -1;
    padding-top: 0;
    padding-bottom: 2rem;
  }

  .view-tabs {
    padding: 0 1rem;
    overflow-x: auto;
  }

  .view-tabs button {
    padding: 0.75rem 1.25rem;
    font-size: var(--font-size-xs);
    white-space: nowrap;
  }
}

/* ============================================
   GLOBAL MODAL STYLES
   ============================================ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 18, 18, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.respite-modal {
  background: var(--bg-card);
  border: 1px solid var(--color-success);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  width: 90%;
  max-width: 450px;
}

.respite-modal h3 {
  margin: 0 0 var(--space-md) 0;
  color: var(--color-success);
  font-size: var(--font-size-xl);
  text-shadow: 0 0 12px var(--color-success-dim);
}

.respite-description {
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  margin: 0 0 var(--space-sm) 0;
}

.respite-effects {
  margin: 0 0 var(--space-md) 0;
  padding-left: var(--space-lg);
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

.respite-effects li {
  margin-bottom: 0.5rem;
}

.respite-effects strong {
  color: var(--color-xp);
}

.xp-preview {
  background: var(--color-success-dim);
  border: 1px solid var(--color-success);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  color: var(--color-success);
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.respite-actions {
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
}

.respite-actions button {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.respite-actions .confirm-btn {
  background: var(--color-success);
  border: none;
  color: var(--bg-darkest);
}

.respite-actions .confirm-btn:hover {
  box-shadow: 0 0 12px rgba(77, 232, 178, 0.4);
}

.respite-actions .cancel-btn {
  background: transparent;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
}

.respite-actions .cancel-btn:hover {
  border-color: var(--text-muted);
  color: var(--text-secondary);
}



================================================
FILE: src/App.tsx
================================================
import { useState, useEffect } from 'react';
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
import { RoutinesView } from './components/classDetails/TroubadourDetails';
import { FerocityTrackerView } from './components/classDetails/FuryDetails';
import { getTabsForClass, ViewType } from './data/class-tabs';
import { HeroClass } from './types/hero';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
  RadixTabs,
  RadixTabsList,
  RadixTabsTrigger,
  RadixTabsContent,
} from '@/components/ui/shadcn';
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
            <Button variant="ghost" size="sm" onClick={() => setShowCharacterManager(true)}>
              Manage Characters
            </Button>
            <ThemeSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLegalModal(true)}
              aria-label="About Mettle"
            >
              About
            </Button>
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
          <Button variant="ghost" size="sm" onClick={() => setShowCharacterManager(true)}>
            Characters
          </Button>
          <ThemeSelector />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLegalModal(true)}
            aria-label="About Mettle"
          >
            About
          </Button>
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
      <RadixTabs
        value={activeView}
        onValueChange={(value) => setActiveView(value as View)}
        className="view-tabs-container"
      >
        <RadixTabsList variant="fantasy" className="view-tabs">
          {tabs.map((tab) => (
            <RadixTabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </RadixTabsTrigger>
          ))}
        </RadixTabsList>

        {/* Main Content */}
        <main className="app-main">
          <RadixTabsContent value="character">
            <CharacterDetailsView />
          </RadixTabsContent>

          <RadixTabsContent value="abilities">
            <AbilitiesView />
          </RadixTabsContent>

          {/* Summoner-specific: Minions tab */}
          <RadixTabsContent value="minions">
            <CombatView />
          </RadixTabsContent>

          <RadixTabsContent value="projects">
            <ProjectsView />
          </RadixTabsContent>

          <RadixTabsContent value="items">
            <MagicItemsView />
          </RadixTabsContent>

          <RadixTabsContent value="inventory">
            <InventoryView />
          </RadixTabsContent>

          {/* Talent Strain View */}
          <RadixTabsContent value="strain">
            <StrainView />
          </RadixTabsContent>

          {/* Null Field View */}
          <RadixTabsContent value="nullfield">
            <NullFieldView />
          </RadixTabsContent>

          {/* Troubadour Routines View */}
          <RadixTabsContent value="routines">
            <RoutinesView />
          </RadixTabsContent>

          {/* Fury Ferocity View */}
          <RadixTabsContent value="ferocity">
            <FerocityTrackerView />
          </RadixTabsContent>

          {/* Placeholder for other class-specific views */}
          <RadixTabsContent value="judgment">
            <div className="placeholder-view">
              <h2>Judgment</h2>
              <p className="coming-soon">This class-specific feature is coming soon.</p>
            </div>
          </RadixTabsContent>

          <RadixTabsContent value="domain">
            <div className="placeholder-view">
              <h2>Domain</h2>
              <p className="coming-soon">This class-specific feature is coming soon.</p>
            </div>
          </RadixTabsContent>

          <RadixTabsContent value="persistent">
            <div className="placeholder-view">
              <h2>Persistent</h2>
              <p className="coming-soon">This class-specific feature is coming soon.</p>
            </div>
          </RadixTabsContent>

          <RadixTabsContent value="college">
            <div className="placeholder-view">
              <h2>College</h2>
              <p className="coming-soon">This class-specific feature is coming soon.</p>
            </div>
          </RadixTabsContent>

          <RadixTabsContent value="tactics">
            <div className="placeholder-view">
              <h2>Tactics</h2>
              <p className="coming-soon">This class-specific feature is coming soon.</p>
            </div>
          </RadixTabsContent>
        </main>
      </RadixTabs>

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
                  <li>Convert <strong className="text-[var(--accent-bright)]">{hero.victories} victories</strong> to <strong className="text-[var(--xp)]">{hero.victories} XP</strong></li>
                  <li>Restore stamina to maximum ({hero.stamina.max})</li>
                  <li>Restore all recoveries ({hero.recoveries.max})</li>
                  <li>Reset surges to 0</li>
                  {isSummoner && <li>Dismiss all active minions</li>}
                </ul>
                {hero.victories > 0 && (
                  <p className="text-[var(--xp)] font-medium">
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



================================================
FILE: src/index.css
================================================
/* ============================================
   METTLE - Global Styles
   Imports theme and provides base styling
   ============================================ */

/* Import order: theme first, then Tailwind, then components */
@import './styles/theme.css';
@import './styles/shadcn-theme.css';
@import './styles/dialog-fantasy.css';
@import './styles/ui-components.css';
@import "tailwindcss";

/* === GLOBAL RESETS === */
* {
  box-sizing: border-box;
}

html {
  font-family: var(--font-body);
  line-height: var(--line-height-normal);
  font-weight: var(--font-weight-normal);
  color-scheme: dark;
  color: var(--text-primary);
  background-color: var(--bg-dark);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: var(--bg-dark);
  color: var(--text-primary);
  font-family: var(--font-body);
}

/* === HEADINGS - Use Display Font (Cinzel) === */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
  margin: 0;
}

h1 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

h2 {
  font-size: var(--font-size-xl);
}

h3 {
  font-size: var(--font-size-lg);
}

h4 {
  font-size: var(--font-size-md);
}

h5, h6 {
  font-size: var(--font-size-sm);
}

/* === BODY TEXT === */
p, span, div, li, td, th {
  font-family: var(--font-body);
}

/* === BASE ELEMENTS === */
a {
  font-weight: var(--font-weight-medium);
  color: var(--accent-bright);
  text-decoration: inherit;
}

a:hover {
  color: var(--accent-glow);
  text-shadow: var(--text-glow);
}

/* === UI ELEMENTS - Body Font === */
button, input, select, textarea {
  font-family: var(--font-body);
}

/* === BUTTON BASE === */
button {
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-solid);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-body);
  background-color: var(--bg-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

button:hover {
  border-color: var(--accent-bright);
  color: var(--accent-bright);
  background-color: var(--bg-light);
}

button:focus,
button:focus-visible {
  outline: 2px solid var(--accent-bright);
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Primary Button */
button.primary {
  background: var(--accent-bright);
  color: var(--bg-darkest);
  border-color: var(--accent-bright);
}

button.primary:hover {
  background: var(--accent-glow);
  border-color: var(--accent-glow);
  box-shadow: var(--shadow-glow);
}

/* Danger Button */
button.danger {
  background: var(--danger);
  color: white;
  border-color: var(--danger);
}

button.danger:hover {
  background: #d32f2f;
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.4);
}

/* Success Button */
button.success {
  background: var(--success);
  color: var(--bg-darkest);
  border-color: var(--success);
}

button.success:hover {
  background: #66bb6a;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.4);
}

/* === INPUT BASE === */
input, textarea, select {
  background: var(--bg-darkest);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  padding: 0.5rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--accent-glow);
  box-shadow: var(--shadow-glow);
}

input::placeholder {
  color: var(--text-muted);
}

/* === UTILITY CLASSES === */
.text-accent { color: var(--accent-bright); }
.text-danger { color: var(--danger); }
.text-warning { color: var(--warning); }
.text-success { color: var(--success); }
.text-essence { color: var(--essence); }
.text-muted { color: var(--text-muted); }
.text-bone { color: var(--text-bone); }

.glow {
  box-shadow: var(--shadow-glow);
}

.glow-strong {
  box-shadow: var(--shadow-glow-strong);
}

.glow-text {
  text-shadow: var(--text-glow);
}

/* === SECTION HEADER STYLE (Character Sheet) === */
.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--text-muted);
  margin-bottom: var(--space-sm);
}

.section-header::before,
.section-header::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--border-solid) 20%,
    var(--accent-dim) 50%,
    var(--border-solid) 80%,
    transparent
  );
}

.section-header .arrow {
  color: var(--text-muted);
}

/* === DIAMOND CHECKBOX STYLE === */
.diamond {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid var(--border-solid);
  transform: rotate(45deg);
  background: transparent;
  transition: all var(--transition-fast);
}

.diamond.filled {
  background: var(--accent-bright);
  border-color: var(--accent-bright);
  box-shadow: var(--shadow-glow);
}

/* === STAT BOX STYLE (Character Sheet) === */
.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-box .value {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 36px;
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  background: var(--bg-medium);
}

.stat-box .label {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--text-bone);
}

/* === CARD STYLES === */
.card {
  background: var(--bg-medium);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  transition: all var(--transition-fast);
}

.card:hover {
  border-color: var(--accent-dim);
  box-shadow: var(--inner-glow);
}

.card.selected {
  border-color: var(--accent-bright);
  box-shadow: var(--shadow-glow);
}

.card.glow-card {
  box-shadow: var(--inner-glow);
}

.card.glow-card:hover {
  box-shadow: var(--inner-glow), var(--shadow-glow);
}

/* === SCROLLBAR STYLING === */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-darkest);
}

::-webkit-scrollbar-thumb {
  background: var(--border-solid);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-dim);
}

/* === PROGRESS BAR === */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-darkest);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-dim), var(--accent-bright));
  border-radius: var(--radius-sm);
  transition: width var(--transition-normal);
  box-shadow: 0 0 8px rgba(0, 230, 195, 0.3);
}

/* === SPECIAL DISPLAY ELEMENTS - Cinzel === */
.character-name,
.hero-name,
.app-title,
.section-title,
.modal-title,
.card-title {
  font-family: var(--font-display);
}

/* === LABELS & TAGS - Body Font, Uppercase === */
.tag,
.badge,
.label,
.keyword-tag,
.role-tag,
.category-badge {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  font-weight: var(--font-weight-semibold);
}

/* === TYPOGRAPHY UTILITY CLASSES === */

/* Font Family */
.font-display {
  font-family: var(--font-display);
}

.font-body {
  font-family: var(--font-body);
}

/* Font Sizes */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-md { font-size: var(--font-size-md); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }

/* Font Weights */
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

/* Letter Spacing */
.tracking-tight { letter-spacing: var(--letter-spacing-tight); }
.tracking-normal { letter-spacing: var(--letter-spacing-normal); }
.tracking-wide { letter-spacing: var(--letter-spacing-wide); }
.tracking-wider { letter-spacing: var(--letter-spacing-wider); }

/* Text Transform */
.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }
.normal-case { text-transform: none; }



================================================
FILE: src/main.tsx
================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeroProvider } from './context/HeroContext'
import { CombatProvider } from './context/CombatContext'
import { RollHistoryProvider } from './context/RollHistoryContext'
import { ThemeProvider } from './context/ThemeContext'
import { TooltipProvider } from '@/components/ui/shadcn'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider delayDuration={300}>
      <ThemeProvider>
        <HeroProvider>
          <CombatProvider>
            <RollHistoryProvider>
              <App />
            </RollHistoryProvider>
          </CombatProvider>
        </HeroProvider>
      </ThemeProvider>
    </TooltipProvider>
  </StrictMode>,
)



================================================
FILE: src/components/abilities/AbilitiesView.css
================================================
/* ============================================
   ABILITIES VIEW - COMBINED
   ============================================ */

.abilities-view-combined {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ============================================
   CLASS ABILITIES SECTION
   ============================================ */

.class-abilities-section {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header-row h2 {
  margin: 0;
  color: var(--accent-primary);
  font-size: 1.25rem;
  letter-spacing: 0.05em;
}

/* Turn Reminder Pills */
.turn-reminder {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.reminder-label {
  color: var(--text-muted);
  margin-right: 0.25rem;
}

.reminder-action {
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.reminder-action.move {
  background: rgba(129, 199, 132, 0.2);
  color: #81c784;
  border: 1px solid rgba(129, 199, 132, 0.4);
}

.reminder-action.maneuver {
  background: rgba(255, 183, 77, 0.2);
  color: #ffb74d;
  border: 1px solid rgba(255, 183, 77, 0.4);
}

.reminder-action.main {
  background: var(--accent-dim);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
}

.reminder-plus {
  color: var(--text-muted);
  font-weight: 600;
}

/* Abilities Grid */
.class-abilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
}

@media (max-width: 800px) {
  .class-abilities-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   ACTION REFERENCE SECTION
   ============================================ */

.action-reference-section {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  padding: 1rem;
}

.reference-title {
  margin: 0 0 1rem 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Accordion */
.reference-accordion {
  margin-bottom: 0.5rem;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.accordion-header:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-light);
  color: var(--text-primary);
}

.accordion-header.open {
  background: var(--accent-dim);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.accordion-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--accent-primary);
}

.accordion-count {
  margin-left: auto;
  background: var(--bg-darkest);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.accordion-content {
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-top: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  padding: 1rem;
}

.section-note {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-dark);
}

.no-content {
  color: var(--text-muted);
  font-style: italic;
  margin: 0;
}

/* ============================================
   OVERVIEW GRID
   ============================================ */

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

@media (max-width: 1100px) {
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
}

.overview-card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 1rem;
  border-left: 3px solid var(--accent-primary);
}

.overview-card.move {
  border-left-color: #81c784;
}

.overview-card.maneuver {
  border-left-color: #ffb74d;
}

.overview-card.main {
  border-left-color: var(--accent-primary);
}

.overview-card.triggered {
  border-left-color: #ce93d8;
}

.overview-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.overview-card.move h4 { color: #81c784; }
.overview-card.maneuver h4 { color: #ffb74d; }
.overview-card.main h4 { color: var(--accent-primary); }
.overview-card.triggered h4 { color: #ce93d8; }

.overview-card ul {
  margin: 0;
  padding-left: 1rem;
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.overview-card li {
  margin-bottom: 0.2rem;
}

.overview-card li strong {
  color: var(--text-primary);
}

/* Turn Flow */
.turn-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: var(--radius-md);
}

.turn-phase {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.phase-num {
  width: 28px;
  height: 28px;
  background: var(--accent-primary);
  color: var(--bg-darkest);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.phase-name {
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
}

.flow-arrow {
  color: var(--accent-primary);
  font-size: 1.25rem;
  font-weight: bold;
}

@media (max-width: 600px) {
  .turn-flow {
    flex-direction: column;
  }

  .flow-arrow {
    transform: rotate(90deg);
  }
}

/* ============================================
   REFERENCE CARDS GRID
   ============================================ */

.ref-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
}

@media (max-width: 600px) {
  .ref-cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Reference Action Card */
.ref-action-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.ref-action-card.command {
  border-color: #9c27b0;
  background: rgba(156, 39, 176, 0.08);
}

.ref-action-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.ref-action-header h4 {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.ref-action-type {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  text-transform: capitalize;
  font-weight: 600;
}

.ref-action-type.action {
  background: rgba(76, 175, 80, 0.2);
  color: #81c784;
}

.ref-action-type.maneuver {
  background: rgba(255, 183, 77, 0.2);
  color: #ffb74d;
}

.ref-action-type.freeManeuver {
  background: rgba(255, 152, 0, 0.2);
  color: #ffb74d;
}

.ref-action-type.triggered {
  background: rgba(156, 39, 176, 0.2);
  color: #ce93d8;
}

.ref-action-type.freeTriggered {
  background: rgba(186, 104, 200, 0.2);
  color: #ce93d8;
}

.ref-action-trigger {
  background: rgba(156, 39, 176, 0.12);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.ref-action-trigger strong {
  color: #ce93d8;
}

.ref-action-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.meta-item {
  color: var(--text-secondary);
}

.meta-label {
  color: var(--text-muted);
  margin-right: 0.25rem;
}

.ref-action-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.ref-keyword {
  background: var(--accent-dim);
  color: var(--accent-primary);
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
}

.ref-action-effect {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.4;
}

.ref-action-effect strong {
  color: #81c784;
}



================================================
FILE: src/components/abilities/AbilitiesView.tsx
================================================
import React, { useState } from 'react';
import { useSummonerContext } from '../../context/HeroContext';
import { useRollHistory } from '../../context/RollHistoryContext';
import { standardManeuvers, standardTriggeredActions, moveActions, quickCommands } from '../../data/action-economy';
import { Ability } from '../../types';
import { isSummonerHero } from '../../types/hero';
import { PowerRollResult } from '../../utils/dice';
import { ActionType, ActionTag } from '../../types/action';
import AbilityCard from '../shared/AbilityCard';
import ActionCard from '../ui/ActionCard';
import { ClassAbilityWidget } from './classWidgets';
import LevelProgressionSection from './LevelProgressionSection';
import './AbilitiesView.css';

type ReferenceSection = 'overview' | 'moves' | 'maneuvers' | 'triggered' | 'commands' | null;

const AbilitiesView: React.FC = () => {
  const { hero } = useSummonerContext();
  const { addRoll } = useRollHistory();
  const [openSection, setOpenSection] = useState<ReferenceSection>(null);

  if (!hero) return null;

  // Check if Summoner for formation-specific commands
  const isSummoner = isSummonerHero(hero);
  const heroFormation = isSummoner ? hero.formation : null;

  const handleAbilityRoll = (ability: Ability, result: PowerRollResult) => {
    addRoll(result, ability.name, 'ability');
  };

  const toggleSection = (section: ReferenceSection) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  // Filter quick commands for hero's formation (Summoner only)
  const formationCommands = heroFormation
    ? quickCommands.filter(cmd => cmd.formation === heroFormation)
    : [];

  // Map Ability actionType to ActionCard type
  const mapActionType = (actionType: string): ActionType => {
    const typeMap: Record<string, ActionType> = {
      'main': 'main',
      'maneuver': 'maneuver',
      'triggered': 'triggered',
      'freeTriggered': 'free',
      'move': 'utility',
    };
    return typeMap[actionType] || 'utility';
  };

  // Get tags from ability
  const getTags = (ability: Ability): ActionTag[] => {
    const tags: ActionTag[] = [];
    if (ability.keywords.includes('Free Strike')) tags.push('freeStrike');
    return tags;
  };

  const renderActionCard = (ability: Ability) => (
    <ActionCard
      key={ability.id}
      id={ability.id}
      name={ability.name}
      type={mapActionType(ability.actionType)}
      tags={getTags(ability)}
      cost={0}
      target={ability.target}
      distance={ability.distance}
      trigger={ability.trigger}
      effect={ability.effect}
      keywords={ability.keywords}
      characteristicValues={hero.characteristics}
      isCompact={true}
    />
  );

  const renderQuickCommandCard = (cmd: typeof quickCommands[0]) => (
    <ActionCard
      key={cmd.id}
      id={cmd.id}
      name={cmd.name}
      type="triggered"
      tags={[]}
      cost={0}
      trigger={cmd.trigger}
      effect={cmd.effect}
      keywords={['Quick Command', cmd.formation.charAt(0).toUpperCase() + cmd.formation.slice(1)]}
      isCompact={true}
    />
  );

  return (
    <div className="abilities-view-combined">
      {/* Class Abilities Section */}
      <section className="class-abilities-section">
        <div className="section-header-row">
          <h2>Class Abilities</h2>
          <div className="turn-reminder">
            <span className="reminder-label">Each turn:</span>
            <span className="reminder-action move">Move</span>
            <span className="reminder-plus">+</span>
            <span className="reminder-action maneuver">Maneuver</span>
            <span className="reminder-plus">+</span>
            <span className="reminder-action main">Action</span>
          </div>
        </div>

        {/* Class-Specific Widget */}
        <ClassAbilityWidget hero={hero} />

        <div className="class-abilities-grid">
          {hero.abilities.map((ability) => (
            <AbilityCard
              key={ability.id}
              ability={ability}
              characteristics={hero.characteristics}
              onRoll={handleAbilityRoll}
            />
          ))}
        </div>
      </section>

      {/* Action Reference Sections (Collapsible) */}
      <section className="action-reference-section">
        <h3 className="reference-title">Action Reference</h3>

        {/* Overview */}
        <div className="reference-accordion">
          <button
            className={`accordion-header ${openSection === 'overview' ? 'open' : ''}`}
            onClick={() => toggleSection('overview')}
          >
            <span className="accordion-icon">{openSection === 'overview' ? '−' : '+'}</span>
            <span>Turn Structure Overview</span>
          </button>
          {openSection === 'overview' && (
            <div className="accordion-content">
              <div className="overview-grid">
                <div className="overview-card move">
                  <h4>Move Action</h4>
                  <ul>
                    <li><strong>Advance:</strong> Move up to your Speed</li>
                    <li><strong>Disengage:</strong> Shift 1 square safely</li>
                  </ul>
                </div>

                <div className="overview-card maneuver">
                  <h4>Maneuver</h4>
                  <ul>
                    <li>Aid Attack, Catch Breath</li>
                    <li>Drink Potion, Grab</li>
                    <li>Hide, Search, Make Test</li>
                  </ul>
                </div>

                <div className="overview-card main">
                  <h4>Main Action</h4>
                  <ul>
                    <li>Use class ability</li>
                    <li>Call Forth minions</li>
                    <li>Summoner Strike</li>
                  </ul>
                </div>

                <div className="overview-card triggered">
                  <h4>Triggered (1/round)</h4>
                  <ul>
                    <li>Opportunity Attack</li>
                    <li>Free Strike</li>
                    <li>Quick Commands</li>
                  </ul>
                </div>
              </div>

              <div className="turn-flow">
                <div className="turn-phase">
                  <span className="phase-num">1</span>
                  <span className="phase-name">Start of Turn</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="turn-phase">
                  <span className="phase-num">2</span>
                  <span className="phase-name">Your Actions</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="turn-phase">
                  <span className="phase-num">3</span>
                  <span className="phase-name">End of Turn</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Move Actions */}
        <div className="reference-accordion">
          <button
            className={`accordion-header ${openSection === 'moves' ? 'open' : ''}`}
            onClick={() => toggleSection('moves')}
          >
            <span className="accordion-icon">{openSection === 'moves' ? '−' : '+'}</span>
            <span>Move Actions</span>
            <span className="accordion-count">{moveActions.length}</span>
          </button>
          {openSection === 'moves' && (
            <div className="accordion-content">
              <div className="action-cards-grid">
                {moveActions.map(action => renderActionCard(action))}
              </div>
            </div>
          )}
        </div>

        {/* Maneuvers */}
        <div className="reference-accordion">
          <button
            className={`accordion-header ${openSection === 'maneuvers' ? 'open' : ''}`}
            onClick={() => toggleSection('maneuvers')}
          >
            <span className="accordion-icon">{openSection === 'maneuvers' ? '−' : '+'}</span>
            <span>Standard Maneuvers</span>
            <span className="accordion-count">{standardManeuvers.length}</span>
          </button>
          {openSection === 'maneuvers' && (
            <div className="accordion-content">
              <div className="action-cards-grid">
                {standardManeuvers.map(action => renderActionCard(action))}
              </div>
            </div>
          )}
        </div>

        {/* Triggered Actions */}
        <div className="reference-accordion">
          <button
            className={`accordion-header ${openSection === 'triggered' ? 'open' : ''}`}
            onClick={() => toggleSection('triggered')}
          >
            <span className="accordion-icon">{openSection === 'triggered' ? '−' : '+'}</span>
            <span>Triggered Actions</span>
            <span className="accordion-count">{standardTriggeredActions.length}</span>
          </button>
          {openSection === 'triggered' && (
            <div className="accordion-content">
              <p className="section-note">You can use one triggered action per round. Free triggered actions don't count.</p>
              <div className="action-cards-grid">
                {standardTriggeredActions.map(action => renderActionCard(action))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Commands */}
        {/* Quick Commands - Summoner Only */}
        {isSummoner && heroFormation && (
        <div className="reference-accordion">
          <button
            className={`accordion-header ${openSection === 'commands' ? 'open' : ''}`}
            onClick={() => toggleSection('commands')}
          >
            <span className="accordion-icon">{openSection === 'commands' ? '−' : '+'}</span>
            <span>Quick Commands ({heroFormation.charAt(0).toUpperCase() + heroFormation.slice(1)})</span>
            <span className="accordion-count">{formationCommands.length}</span>
          </button>
          {openSection === 'commands' && (
            <div className="accordion-content">
              {formationCommands.length > 0 ? (
                <div className="action-cards-grid">
                  {formationCommands.map(cmd => renderQuickCommandCard(cmd))}
                </div>
              ) : (
                <p className="no-content">No quick commands defined for your formation yet.</p>
              )}
            </div>
          )}
        </div>
        )}
      </section>

      {/* Level Progression Section */}
      <LevelProgressionSection hero={hero} />
    </div>
  );
};

export default AbilitiesView;



================================================
FILE: src/components/abilities/LevelProgressionSection.css
================================================
/* ============================================
   LEVEL PROGRESSION SECTION
   ============================================ */

.level-progression-section {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-top: 2rem;
}

.progression-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.progression-header h3 {
  margin: 0;
  color: var(--accent-primary);
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.progression-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.35rem 0.75rem;
  background: var(--bg-darkest);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  border-color: var(--accent-dim);
  color: var(--text-primary);
}

/* ============================================
   LEVEL ACCORDIONS
   ============================================ */

.progression-levels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.level-accordion {
  background: var(--bg-darkest);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.level-accordion.current {
  border-color: var(--accent-dim);
}

.level-accordion.expanded {
  border-color: var(--accent-primary);
}

.level-accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.level-accordion-header:hover {
  background: var(--bg-medium);
}

.level-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  padding: 0.25rem 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--accent-primary);
}

.level-accordion.current .level-badge {
  background: var(--accent-dim);
  border-color: var(--accent-primary);
}

.level-summary {
  flex: 1;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.accordion-toggle-icon {
  font-size: 1.25rem;
  color: var(--text-muted);
  width: 24px;
  text-align: center;
}

.level-accordion.expanded .accordion-toggle-icon {
  color: var(--accent-bright);
}

/* ============================================
   ACCORDION CONTENT
   ============================================ */

.level-accordion-content {
  padding: 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid var(--border-dark);
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   PROGRESSION ITEMS
   ============================================ */

.progression-item {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  border-left: 3px solid var(--accent-dim);
}

.progression-item.type-feature {
  border-left-color: var(--accent-primary);
}

.progression-item.type-perk {
  border-left-color: #ffb74d;
}

.progression-item.type-skill {
  border-left-color: #64b5f6;
}

.progression-item.type-ability-unlock,
.progression-item.type-ability-choice {
  border-left-color: #ce93d8;
}

.progression-item.type-stat-increase {
  border-left-color: #81c784;
}

.progression-item.type-resource-upgrade {
  border-left-color: var(--accent-bright);
}

.progression-item.type-subclass-feature {
  border-left-color: #4dd0e1;
}

.progression-item.type-kit-upgrade {
  border-left-color: var(--text-bone, #d4c8b0);
}

.progression-item.type-epic-resource {
  border-left-color: #ffd700;
  background: linear-gradient(135deg, var(--bg-card) 0%, rgba(255, 215, 0, 0.05) 100%);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.item-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

.item-type-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.4rem;
  background: var(--bg-darkest);
  border-radius: 2px;
  color: var(--text-muted);
}

.item-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.item-description {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Choice indicator */
.item-choice {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--bg-darkest);
  border-radius: var(--radius-sm);
  display: inline-flex;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.choice-label {
  color: var(--text-muted);
}

.choice-value {
  color: var(--accent-bright);
  font-weight: 600;
}

/* Subclass badge */
.subclass-badge {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.2rem 0.5rem;
  background: var(--accent-dim);
  border: 1px solid var(--accent-primary);
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 600px) {
  .level-progression-section {
    padding: 1rem;
  }

  .progression-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .level-accordion-header {
    padding: 0.6rem 0.75rem;
  }

  .level-badge {
    min-width: 40px;
    font-size: 0.75rem;
  }
}



================================================
FILE: src/components/abilities/LevelProgressionSection.tsx
================================================
import React, { useState, useMemo } from 'react';
import { Hero } from '../../types/hero';
import { buildProgressionDisplay } from '../../utils/progression-display';
import {
  progressionTypeConfig,
  LevelProgressionSummary,
  ProgressionDisplayItem,
} from '../../types/class-progression';
import './LevelProgressionSection.css';

interface LevelProgressionSectionProps {
  hero: Hero;
}

const LevelProgressionSection: React.FC<LevelProgressionSectionProps> = ({ hero }) => {
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set([hero.level]));

  // Build progression data (memoized to prevent recalculation)
  const progressionSummaries = useMemo(() => {
    return buildProgressionDisplay(hero);
  }, [hero.level, hero.heroClass, hero.progressionChoices, hero.subclass]);

  const toggleLevel = (level: number) => {
    setExpandedLevels(prev => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allLevels = new Set(progressionSummaries.map(s => s.level));
    setExpandedLevels(allLevels);
  };

  const collapseAll = () => {
    setExpandedLevels(new Set());
  };

  if (progressionSummaries.length === 0) {
    return null;
  }

  return (
    <section className="level-progression-section">
      <div className="progression-header">
        <h3>Level Progression</h3>
        <div className="progression-controls">
          <button
            className="control-btn"
            onClick={expandAll}
            title="Expand all levels"
          >
            Expand All
          </button>
          <button
            className="control-btn"
            onClick={collapseAll}
            title="Collapse all levels"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="progression-levels">
        {progressionSummaries.map(summary => (
          <LevelAccordion
            key={summary.level}
            summary={summary}
            isExpanded={expandedLevels.has(summary.level)}
            onToggle={() => toggleLevel(summary.level)}
            isCurrentLevel={summary.level === hero.level}
          />
        ))}
      </div>
    </section>
  );
};

interface LevelAccordionProps {
  summary: LevelProgressionSummary;
  isExpanded: boolean;
  onToggle: () => void;
  isCurrentLevel: boolean;
}

const LevelAccordion: React.FC<LevelAccordionProps> = ({
  summary,
  isExpanded,
  onToggle,
  isCurrentLevel,
}) => {
  return (
    <div className={`level-accordion ${isExpanded ? 'expanded' : ''} ${isCurrentLevel ? 'current' : ''}`}>
      <button
        className="level-accordion-header"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="level-badge">Lv {summary.level}</span>
        <span className="level-summary">
          {summary.items.length} {summary.items.length === 1 ? 'feature' : 'features'}
        </span>
        <span className="accordion-toggle-icon">{isExpanded ? '−' : '+'}</span>
      </button>

      {isExpanded && (
        <div className="level-accordion-content">
          {summary.items.map(item => (
            <ProgressionItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ProgressionItemProps {
  item: ProgressionDisplayItem;
}

const ProgressionItem: React.FC<ProgressionItemProps> = ({ item }) => {
  const config = progressionTypeConfig[item.type];

  return (
    <div className={`progression-item type-${item.type}`}>
      <div className="item-header">
        <span
          className="item-icon"
          style={{ color: `var(${config.colorVar})` }}
        >
          {config.icon}
        </span>
        <span className="item-type-label">{config.label}</span>
        <span className="item-name">{item.name}</span>
      </div>

      <p className="item-description">{item.description}</p>

      {item.isChoice && item.chosenOptionName && (
        <div className="item-choice">
          <span className="choice-label">Chosen:</span>
          <span className="choice-value">{item.chosenOptionName}</span>
        </div>
      )}

      {item.isSubclassSpecific && item.subclassId && (
        <span className="subclass-badge">
          {item.subclassId.charAt(0).toUpperCase() + item.subclassId.slice(1)}
        </span>
      )}
    </div>
  );
};

export default LevelProgressionSection;



================================================
FILE: src/components/abilities/classWidgets/CensorWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { CensorHero, CensorOrder } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface CensorWidgetProps {
  hero: CensorHero;
}

const ORDER_INFO: Record<CensorOrder, { name: string; description: string }> = {
  exorcist: {
    name: 'Exorcist',
    description: 'Specialist in banishing supernatural threats and protecting the faithful.',
  },
  oracle: {
    name: 'Oracle',
    description: 'Seer who channels divine visions to guide allies and reveal hidden truths.',
  },
  paragon: {
    name: 'Paragon',
    description: 'Living exemplar of their faith who inspires through heroic deeds.',
  },
};

export const CensorWidget: React.FC<CensorWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [targetInput, setTargetInput] = useState('');

  const { heroicResource, judgment, subclass: order, level, characteristics } = hero;
  const currentWrath = heroicResource?.current ?? 0;
  const judgedTarget = judgment?.targetName ?? null;

  // Calculate potency based on Presence
  const presence = characteristics?.presence ?? 2;

  // Determine wrath gain based on level
  const getWrathGain = () => {
    if (level >= 10) return { start: 4, trigger: 2 };
    if (level >= 7) return { start: 3, trigger: 2 };
    if (level >= 4) return { start: 2, trigger: 2 };
    return { start: 2, trigger: 1 };
  };

  const wrathGain = getWrathGain();

  const handleWrathChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentWrath + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<CensorHero>);
  }, [currentWrath, heroicResource, updateHero]);

  const handleSetJudgment = useCallback(() => {
    if (targetInput.trim()) {
      updateHero({
        judgment: {
          targetId: null,
          targetName: targetInput.trim(),
        },
      } as Partial<CensorHero>);
      setTargetInput('');
    }
  }, [targetInput, updateHero]);

  const handleClearJudgment = useCallback(() => {
    updateHero({
      judgment: {
        targetId: null,
        targetName: null,
      },
    } as Partial<CensorHero>);
  }, [updateHero]);

  const orderData = order ? ORDER_INFO[order] : null;

  return (
    <div className="class-widget class-widget--censor">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Wrath</span>
          <span className="class-widget__quick-stat-value">{currentWrath}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Judged</span>
          <span className="class-widget__quick-stat-value">
            {judgedTarget || '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">P+{presence}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Censor</h3>
          {orderData && (
            <span className="class-widget__badge">{orderData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Wrath Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Wrath</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleWrathChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentWrath}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleWrathChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Judgment Mechanic */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Judgment</h4>
            <span className={`class-widget__mechanic-status ${judgedTarget ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {judgedTarget ? 'Active' : 'None'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Mark an enemy. Gain Wrath when you deal damage to or take damage from your judged target.
          </p>

          {/* Target Input or Display */}
          <div className="class-widget__target">
            {judgedTarget ? (
              <div className="class-widget__active-target">
                <span className="class-widget__active-target-name">{judgedTarget}</span>
                <button
                  className="class-widget__target-btn class-widget__target-btn--danger"
                  onClick={handleClearJudgment}
                >
                  Release
                </button>
              </div>
            ) : (
              <>
                <label className="class-widget__target-label">Judge a target:</label>
                <div className="class-widget__target-input-group">
                  <input
                    type="text"
                    className="class-widget__target-input"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="Target name..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSetJudgment()}
                  />
                  <button
                    className="class-widget__target-btn"
                    onClick={handleSetJudgment}
                    disabled={!targetInput.trim()}
                  >
                    Judge
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Info */}
        {orderData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: '#ef5350' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{orderData.name} Order</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {orderData.description}
            </p>
          </div>
        )}

        {/* Wrath Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Wrath Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+{wrathGain.start} Wrath</strong>
              {level >= 7 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L{level >= 10 ? '10' : '7'}</span>}
            </li>
            <li className="class-widget__gain-item">
              First time/round you deal damage to judged target: <strong>+{wrathGain.trigger} Wrath</strong>
              {level >= 4 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L4+</span>}
            </li>
            <li className="class-widget__gain-item">
              First time/round judged target deals damage to you: <strong>+{wrathGain.trigger} Wrath</strong>
              {level >= 4 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L4+</span>}
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">P-2 ({presence - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">P-1 ({presence - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">P ({presence})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CensorWidget;



================================================
FILE: src/components/abilities/classWidgets/ClassAbilityWidget.tsx
================================================
import React from 'react';
import {
  Hero,
  isCensorHero,
  isConduitHero,
  isElementalistHero,
  isFuryHero,
  isNullHero,
  isShadowHero,
  isSummonerHero,
  isTacticianHero,
  isTalentHero,
  isTroubadourHero,
} from '../../../types/hero';
import { CensorWidget } from './CensorWidget';
import { ConduitWidget } from './ConduitWidget';
import { ElementalistWidget } from './ElementalistWidget';
import { FuryWidget } from './FuryWidget';
import { NullWidget } from './NullWidget';
import { ShadowWidget } from './ShadowWidget';
import { SummonerWidget } from './SummonerWidget';
import { TacticianWidget } from './TacticianWidget';
import { TalentWidget } from './TalentWidget';
import { TroubadourWidget } from './TroubadourWidget';
import './ClassWidgets.css';

interface ClassAbilityWidgetProps {
  hero: Hero;
}

/**
 * ClassAbilityWidget - Routes to the appropriate class-specific widget
 * based on the hero's class type
 */
export const ClassAbilityWidget: React.FC<ClassAbilityWidgetProps> = ({ hero }) => {
  if (isCensorHero(hero)) {
    return <CensorWidget hero={hero} />;
  }

  if (isConduitHero(hero)) {
    return <ConduitWidget hero={hero} />;
  }

  if (isElementalistHero(hero)) {
    return <ElementalistWidget hero={hero} />;
  }

  if (isFuryHero(hero)) {
    return <FuryWidget hero={hero} />;
  }

  if (isNullHero(hero)) {
    return <NullWidget hero={hero} />;
  }

  if (isShadowHero(hero)) {
    return <ShadowWidget hero={hero} />;
  }

  if (isSummonerHero(hero)) {
    return <SummonerWidget hero={hero} />;
  }

  if (isTacticianHero(hero)) {
    return <TacticianWidget hero={hero} />;
  }

  if (isTalentHero(hero)) {
    return <TalentWidget hero={hero} />;
  }

  if (isTroubadourHero(hero)) {
    return <TroubadourWidget hero={hero} />;
  }

  // Fallback for unknown class
  return null;
};

export default ClassAbilityWidget;



================================================
FILE: src/components/abilities/classWidgets/ClassWidgets.css
================================================
/* ============================================
   CLASS ABILITY WIDGETS - Shared Styles
   ============================================ */

/* Base Widget Container */
.class-widget {
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

/* Widget Header */
.class-widget__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--bg-medium);
  border-bottom: 1px solid var(--border-dark);
  cursor: pointer;
  user-select: none;
  transition: background var(--transition-fast);
}

.class-widget__header:hover {
  background: var(--bg-light);
}

.class-widget__header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.class-widget__title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.02em;
}

.class-widget__badge {
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.class-widget__toggle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  font-weight: bold;
  font-size: 1rem;
  transition: transform var(--transition-fast);
}

.class-widget__toggle--open {
  transform: rotate(180deg);
}

/* Widget Content */
.class-widget__content {
  padding: 1rem;
}

.class-widget__content--collapsed {
  display: none;
}

/* Compact Summary (always visible) */
.class-widget__summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--bg-darkest);
  border-bottom: 1px solid var(--border-dark);
}

/* Quick Stat Display */
.class-widget__quick-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.6rem;
  background: var(--bg-medium);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-dark);
}

.class-widget__quick-stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.class-widget__quick-stat-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Resource Tracker */
.class-widget__resource {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-dark);
}

.class-widget__resource-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 70px;
}

.class-widget__resource-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.class-widget__resource-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.class-widget__resource-btn:hover {
  background: var(--bg-light);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.class-widget__resource-btn:active {
  transform: scale(0.95);
}

.class-widget__resource-value {
  min-width: 40px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-primary);
  padding: 0 0.5rem;
}

/* Gain Reminder Section */
.class-widget__gain-section {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--bg-darkest);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-dark);
}

.class-widget__gain-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.class-widget__gain-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.class-widget__gain-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.35rem 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.class-widget__gain-item::before {
  content: '+';
  color: var(--success);
  font-weight: bold;
}

.class-widget__gain-item strong {
  color: var(--accent-primary);
}

/* Mechanic Card */
.class-widget__mechanic {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--accent-primary);
}

.class-widget__mechanic-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.class-widget__mechanic-title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.class-widget__mechanic-status {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.class-widget__mechanic-status--active {
  background: var(--success-dim);
  color: var(--success);
}

.class-widget__mechanic-status--inactive {
  background: var(--bg-dark);
  color: var(--text-muted);
}

.class-widget__mechanic-description {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Target Input (for Judgment, Mark, etc.) */
.class-widget__target {
  margin-top: 0.75rem;
}

.class-widget__target-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.class-widget__target-input-group {
  display: flex;
  gap: 0.5rem;
}

.class-widget__target-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: var(--bg-darkest);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.85rem;
}

.class-widget__target-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--accent-dim);
}

.class-widget__target-btn {
  padding: 0.5rem 0.75rem;
  background: var(--accent-dim);
  border: 1px solid var(--accent-primary);
  border-radius: var(--radius-sm);
  color: var(--accent-primary);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.class-widget__target-btn:hover {
  background: var(--accent-primary);
  color: var(--bg-darkest);
}

.class-widget__target-btn--danger {
  background: var(--danger-dim);
  border-color: var(--danger);
  color: var(--danger);
}

.class-widget__target-btn--danger:hover {
  background: var(--danger);
  color: white;
}

/* Active Target Display */
.class-widget__active-target {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.75rem;
  background: var(--accent-dim);
  border: 1px solid var(--accent-primary);
  border-radius: var(--radius-sm);
  margin-top: 0.5rem;
}

.class-widget__active-target-name {
  font-weight: 600;
  color: var(--accent-primary);
}

/* Tier Display (for Growing Ferocity) */
.class-widget__tiers {
  margin-top: 1rem;
}

.class-widget__tier {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.class-widget__tier--locked {
  opacity: 0.5;
  background: transparent;
}

.class-widget__tier--active {
  background: var(--success-dim);
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.class-widget__tier-threshold {
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
}

.class-widget__tier--active .class-widget__tier-threshold {
  background: var(--success);
  color: white;
}

.class-widget__tier-benefit {
  flex: 1;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.class-widget__tier--active .class-widget__tier-benefit {
  color: var(--text-primary);
}

/* Level Feature Badge */
.class-widget__level-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.4rem;
  background: var(--accent-dim);
  border-radius: var(--radius-sm);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--accent-primary);
}

.class-widget__level-badge--locked {
  background: var(--bg-dark);
  color: var(--text-muted);
}

/* Potency Display */
.class-widget__potency {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: var(--bg-darkest);
  border-radius: var(--radius-sm);
}

.class-widget__potency-item {
  flex: 1;
  text-align: center;
  padding: 0.35rem;
  border-radius: var(--radius-sm);
}

.class-widget__potency-label {
  display: block;
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.15rem;
}

.class-widget__potency-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.class-widget__potency-item--strong {
  background: var(--success-dim);
}

.class-widget__potency-item--strong .class-widget__potency-value {
  color: var(--success);
}

/* === CLASS-SPECIFIC ACCENT COLORS === */

/* Censor - Red/Orange for Wrath */
.class-widget--censor {
  border-color: rgba(244, 67, 54, 0.3);
}
.class-widget--censor .class-widget__header {
  border-bottom-color: rgba(244, 67, 54, 0.3);
}
.class-widget--censor .class-widget__badge {
  background: rgba(244, 67, 54, 0.2);
  color: #ef5350;
}
.class-widget--censor .class-widget__resource-value {
  color: #ef5350;
}

/* Conduit - Gold for Piety */
.class-widget--conduit {
  border-color: rgba(255, 193, 7, 0.3);
}
.class-widget--conduit .class-widget__header {
  border-bottom-color: rgba(255, 193, 7, 0.3);
}
.class-widget--conduit .class-widget__badge {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}
.class-widget--conduit .class-widget__resource-value {
  color: #ffc107;
}

/* Elementalist - Purple for Essence */
.class-widget--elementalist {
  border-color: rgba(156, 39, 176, 0.3);
}
.class-widget--elementalist .class-widget__header {
  border-bottom-color: rgba(156, 39, 176, 0.3);
}
.class-widget--elementalist .class-widget__badge {
  background: rgba(156, 39, 176, 0.2);
  color: #ba68c8;
}
.class-widget--elementalist .class-widget__resource-value {
  color: #ba68c8;
}

/* Fury - Orange/Red for Ferocity */
.class-widget--fury {
  border-color: rgba(255, 87, 34, 0.3);
}
.class-widget--fury .class-widget__header {
  border-bottom-color: rgba(255, 87, 34, 0.3);
}
.class-widget--fury .class-widget__badge {
  background: rgba(255, 87, 34, 0.2);
  color: #ff7043;
}
.class-widget--fury .class-widget__resource-value {
  color: #ff7043;
}

/* Null - Blue/Cyan for Discipline */
.class-widget--null {
  border-color: rgba(0, 188, 212, 0.3);
}
.class-widget--null .class-widget__header {
  border-bottom-color: rgba(0, 188, 212, 0.3);
}
.class-widget--null .class-widget__badge {
  background: rgba(0, 188, 212, 0.2);
  color: #4dd0e1;
}
.class-widget--null .class-widget__resource-value {
  color: #4dd0e1;
}

/* Shadow - Purple/Dark for Insight */
.class-widget--shadow {
  border-color: rgba(103, 58, 183, 0.3);
}
.class-widget--shadow .class-widget__header {
  border-bottom-color: rgba(103, 58, 183, 0.3);
}
.class-widget--shadow .class-widget__badge {
  background: rgba(103, 58, 183, 0.2);
  color: #9575cd;
}
.class-widget--shadow .class-widget__resource-value {
  color: #9575cd;
}

/* Summoner - Green/Teal for Essence */
.class-widget--summoner {
  border-color: rgba(0, 150, 136, 0.3);
}
.class-widget--summoner .class-widget__header {
  border-bottom-color: rgba(0, 150, 136, 0.3);
}
.class-widget--summoner .class-widget__badge {
  background: rgba(0, 150, 136, 0.2);
  color: #4db6ac;
}
.class-widget--summoner .class-widget__resource-value {
  color: #4db6ac;
}

/* Tactician - Blue for Focus */
.class-widget--tactician {
  border-color: rgba(33, 150, 243, 0.3);
}
.class-widget--tactician .class-widget__header {
  border-bottom-color: rgba(33, 150, 243, 0.3);
}
.class-widget--tactician .class-widget__badge {
  background: rgba(33, 150, 243, 0.2);
  color: #64b5f6;
}
.class-widget--tactician .class-widget__resource-value {
  color: #64b5f6;
}

/* Talent - Cyan for Clarity */
.class-widget--talent {
  border-color: rgba(0, 230, 195, 0.3);
}
.class-widget--talent .class-widget__header {
  border-bottom-color: rgba(0, 230, 195, 0.3);
}
.class-widget--talent .class-widget__badge {
  background: rgba(0, 230, 195, 0.2);
  color: var(--accent-primary);
}
.class-widget--talent .class-widget__resource-value {
  color: var(--accent-primary);
}

/* Talent Strained State */
.class-widget--talent.class-widget--strained {
  border-color: rgba(244, 67, 54, 0.5);
}
.class-widget--talent.class-widget--strained .class-widget__resource-value {
  color: var(--danger);
}

/* Troubadour - Pink/Magenta for Drama */
.class-widget--troubadour {
  border-color: rgba(233, 30, 99, 0.3);
}
.class-widget--troubadour .class-widget__header {
  border-bottom-color: rgba(233, 30, 99, 0.3);
}
.class-widget--troubadour .class-widget__badge {
  background: rgba(233, 30, 99, 0.2);
  color: #f06292;
}
.class-widget--troubadour .class-widget__resource-value {
  color: #f06292;
}

/* === RESPONSIVE === */
@media (max-width: 600px) {
  .class-widget__summary {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .class-widget__quick-stat {
    flex: 1 1 auto;
    min-width: 80px;
    justify-content: center;
  }

  .class-widget__potency {
    flex-wrap: wrap;
  }

  .class-widget__potency-item {
    min-width: 70px;
  }
}



================================================
FILE: src/components/abilities/classWidgets/ConduitWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { ConduitHero, ConduitDomain } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface ConduitWidgetProps {
  hero: ConduitHero;
}

const DOMAIN_INFO: Record<ConduitDomain, { name: string; description: string }> = {
  creation: { name: 'Creation', description: 'Shape matter and bring forth wonders.' },
  death: { name: 'Death', description: 'Command the transition between life and death.' },
  fate: { name: 'Fate', description: 'Read and manipulate the threads of destiny.' },
  knowledge: { name: 'Knowledge', description: 'Unlock secrets and grant understanding.' },
  life: { name: 'Life', description: 'Channel vital energy to heal and restore allies.' },
  love: { name: 'Love', description: 'Inspire devotion and forge bonds between hearts.' },
  nature: { name: 'Nature', description: 'Commune with beasts and command the wild.' },
  protection: { name: 'Protection', description: 'Ward allies and shield them from harm.' },
  storm: { name: 'Storm', description: 'Call upon lightning and thunder.' },
  sun: { name: 'Sun', description: 'Radiate holy light that purifies and heals.' },
  trickery: { name: 'Trickery', description: 'Deceive foes with illusions and misdirection.' },
  war: { name: 'War', description: 'Bolster warriors and curse enemies in battle.' },
};

type PrayResult = 'piety' | 'domain' | 'damage';

export const ConduitWidget: React.FC<ConduitWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastPrayResult, setLastPrayResult] = useState<PrayResult | null>(null);

  const { heroicResource, prayState, subclass: domain, characteristics } = hero;
  const currentPiety = heroicResource?.current ?? 0;

  // Calculate potency based on Intuition
  const intuition = characteristics?.intuition ?? 2;

  const handlePietyChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentPiety + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<ConduitHero>);
  }, [currentPiety, heroicResource, updateHero]);

  const handlePray = useCallback(() => {
    // Roll 1d6: 1-2 = damage, 3-4 = domain effect, 5-6 = piety
    const roll = Math.floor(Math.random() * 6) + 1;
    let result: PrayResult;

    if (roll <= 2) {
      result = 'damage';
    } else if (roll <= 4) {
      result = 'domain';
    } else {
      result = 'piety';
      // Add bonus piety on 5-6
      handlePietyChange(2);
    }

    setLastPrayResult(result);
    updateHero({
      prayState: {
        hasPrayedThisTurn: true,
        lastPrayResult: result,
      },
    } as Partial<ConduitHero>);
  }, [handlePietyChange, updateHero]);

  const resetPray = useCallback(() => {
    setLastPrayResult(null);
    updateHero({
      prayState: {
        hasPrayedThisTurn: false,
        lastPrayResult: null,
      },
    } as Partial<ConduitHero>);
  }, [updateHero]);

  const domainData = domain ? DOMAIN_INFO[domain] : null;

  const getPrayResultDisplay = () => {
    switch (lastPrayResult) {
      case 'piety':
        return { text: 'Success! +2 Piety', color: 'var(--success)' };
      case 'domain':
        return { text: `Domain Effect (${domainData?.name || 'Unknown'})`, color: '#ffc107' };
      case 'damage':
        return { text: 'Take damage equal to twice your level', color: 'var(--danger)' };
      default:
        return null;
    }
  };

  const prayResult = getPrayResultDisplay();

  return (
    <div className="class-widget class-widget--conduit">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Piety</span>
          <span className="class-widget__quick-stat-value">{currentPiety}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Domain</span>
          <span className="class-widget__quick-stat-value">
            {domainData?.name || '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">I+{intuition}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Conduit</h3>
          {domainData && (
            <span className="class-widget__badge">{domainData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Piety Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Piety</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handlePietyChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentPiety}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handlePietyChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Prayer Mechanic */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Prayer</h4>
            <span className={`class-widget__mechanic-status ${lastPrayResult ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {lastPrayResult ? 'Used' : 'Ready'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Maneuver: Roll 1d6 to pray. Risk damage for bonus Piety or domain effects.
          </p>

          {/* Prayer Action */}
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              className="class-widget__target-btn"
              onClick={handlePray}
              disabled={!!lastPrayResult}
              style={{ flex: 1 }}
            >
              Pray (Roll 1d6)
            </button>
            {lastPrayResult && (
              <button
                className="class-widget__target-btn class-widget__target-btn--danger"
                onClick={resetPray}
              >
                Reset
              </button>
            )}
          </div>

          {/* Prayer Result */}
          {prayResult && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              background: 'var(--bg-darkest)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              color: prayResult.color,
              fontWeight: 600,
            }}>
              {prayResult.text}
            </div>
          )}

          {/* Prayer Outcomes */}
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div>1-2: Take 2×Level damage</div>
            <div>3-4: Domain effect</div>
            <div>5-6: +2 Piety</div>
          </div>
        </div>

        {/* Domain Info */}
        {domainData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: '#ffc107' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{domainData.name} Domain</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {domainData.description}
            </p>
          </div>
        )}

        {/* Piety Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Piety Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll 1d3 Piety</strong>
            </li>
            <li className="class-widget__gain-item">
              Prayer (5-6): <strong>+2 Piety</strong>
            </li>
            <li className="class-widget__gain-item">
              Domain-specific triggers (varies by domain)
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">I-2 ({intuition - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">I-1 ({intuition - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">I ({intuition})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConduitWidget;



================================================
FILE: src/components/abilities/classWidgets/ElementalistWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { ElementalistHero, ElementalistElement, PersistentAbility } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface ElementalistWidgetProps {
  hero: ElementalistHero;
}

const ELEMENT_INFO: Record<ElementalistElement, { name: string; description: string; color: string }> = {
  earth: {
    name: 'Earth',
    description: 'Command stone and metal, shaping the world around you.',
    color: '#8d6e63',
  },
  fire: {
    name: 'Fire',
    description: 'Wield flames that burn and consume all in their path.',
    color: '#ff7043',
  },
  green: {
    name: 'Green',
    description: 'Channel nature\'s power through plants and primal energy.',
    color: '#66bb6a',
  },
  void: {
    name: 'Void',
    description: 'Manipulate darkness and the spaces between worlds.',
    color: '#7e57c2',
  },
};

export const ElementalistWidget: React.FC<ElementalistWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, mantleActive, persistentAbilities = [], subclass: element, characteristics } = hero;
  const currentEssence = heroicResource?.current ?? 0;
  const lockedEssence = heroicResource?.persistent ?? 0;
  const availableEssence = currentEssence - lockedEssence;

  // Calculate potency based on Reason
  const reason = characteristics?.reason ?? 2;

  const handleEssenceChange = useCallback((delta: number) => {
    const newValue = Math.max(lockedEssence, currentEssence + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<ElementalistHero>);
  }, [currentEssence, lockedEssence, heroicResource, updateHero]);

  const handleDismissPersistent = useCallback((abilityId: string) => {
    const ability = persistentAbilities.find(a => a.abilityId === abilityId);
    if (ability) {
      const newPersistent = persistentAbilities.filter(a => a.abilityId !== abilityId);
      const newLockedEssence = newPersistent.reduce((sum, a) => sum + a.essenceLocked, 0);
      updateHero({
        persistentAbilities: newPersistent,
        heroicResource: {
          ...heroicResource,
          persistent: newLockedEssence,
        },
      } as Partial<ElementalistHero>);
    }
  }, [persistentAbilities, heroicResource, updateHero]);

  const handleToggleMantle = useCallback(() => {
    updateHero({
      mantleActive: !mantleActive,
    } as Partial<ElementalistHero>);
  }, [mantleActive, updateHero]);

  const elementData = element ? ELEMENT_INFO[element] : null;

  return (
    <div className="class-widget class-widget--elementalist">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Essence</span>
          <span className="class-widget__quick-stat-value">{availableEssence}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Locked</span>
          <span className="class-widget__quick-stat-value">{lockedEssence}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Persistent</span>
          <span className="class-widget__quick-stat-value">{persistentAbilities.length}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">R+{reason}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Elementalist</h3>
          {elementData && (
            <span className="class-widget__badge" style={{ background: `${elementData.color}33`, color: elementData.color }}>
              {elementData.name}
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Essence Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Essence</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleEssenceChange(-1)}
              disabled={availableEssence <= 0}
            >
              −
            </button>
            <span className="class-widget__resource-value">
              {availableEssence}
              {lockedEssence > 0 && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {' '}({currentEssence} total)
                </span>
              )}
            </span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleEssenceChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Essence Bar Visualization */}
        <div style={{
          marginTop: '0.5rem',
          height: '8px',
          background: 'var(--bg-darkest)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          display: 'flex',
        }}>
          <div style={{
            width: `${Math.min(100, lockedEssence * 10)}%`,
            background: 'var(--warning)',
            transition: 'width 0.2s',
          }} />
          <div style={{
            width: `${Math.min(100 - lockedEssence * 10, availableEssence * 10)}%`,
            background: '#ba68c8',
            transition: 'width 0.2s',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          <span>Locked: {lockedEssence}</span>
          <span>Available: {availableEssence}</span>
        </div>

        {/* Elemental Mantle */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Elemental Mantle</h4>
            <span className={`class-widget__mechanic-status ${mantleActive ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {mantleActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Surround yourself with your element for passive effects and enhanced abilities.
          </p>
          <button
            className="class-widget__target-btn"
            onClick={handleToggleMantle}
            style={{ marginTop: '0.5rem' }}
          >
            {mantleActive ? 'Dismiss Mantle' : 'Activate Mantle'}
          </button>
        </div>

        {/* Persistent Abilities */}
        {persistentAbilities.length > 0 && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--warning)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Persistent Effects</h4>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              {persistentAbilities.map((ability: PersistentAbility) => (
                <div key={ability.abilityId} className="class-widget__active-target" style={{ marginBottom: '0.25rem' }}>
                  <span>
                    <strong>{ability.abilityName}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--warning)', marginLeft: '0.5rem' }}>
                      ({ability.essenceLocked} locked)
                    </span>
                  </span>
                  <button
                    className="class-widget__target-btn class-widget__target-btn--danger"
                    onClick={() => handleDismissPersistent(ability.abilityId)}
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Element Info */}
        {elementData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: elementData.color }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{elementData.name} Specialization</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {elementData.description}
            </p>
          </div>
        )}

        {/* Essence Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Essence Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+2 Essence</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round you take non-holy damage: <strong>+1 Essence</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">R-2 ({reason - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">R-1 ({reason - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">R ({reason})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalistWidget;



================================================
FILE: src/components/abilities/classWidgets/FuryWidget.tsx
================================================
import React, { useState, useCallback, useMemo } from 'react';
import { FuryHero, FuryAspect } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface FuryWidgetProps {
  hero: FuryHero;
}

const ASPECT_INFO: Record<FuryAspect, { name: string; description: string }> = {
  berserker: {
    name: 'Berserker',
    description: 'Reckless warrior who grows stronger as the battle rages.',
  },
  reaver: {
    name: 'Reaver',
    description: 'Brutal fighter who channels fury into devastating attacks.',
  },
  stormwight: {
    name: 'Stormwight',
    description: 'Lightning-touched warrior who moves like the storm itself.',
  },
};

interface FerocityTier {
  threshold: number;
  benefit: string;
  minLevel: number;
}

const FEROCITY_TIERS: FerocityTier[] = [
  { threshold: 3, benefit: 'Push/pull/slide distance +1', minLevel: 1 },
  { threshold: 6, benefit: '+1 surge when you deal damage', minLevel: 1 },
  { threshold: 9, benefit: 'Double edge on maneuvers', minLevel: 1 },
  { threshold: 12, benefit: 'Reach +1 on melee abilities', minLevel: 4 },
  { threshold: 15, benefit: 'Speed +2', minLevel: 7 },
  { threshold: 18, benefit: '+1 additional surge on damage', minLevel: 10 },
];

export const FuryWidget: React.FC<FuryWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, subclass: aspect, level, characteristics } = hero;
  const currentFerocity = heroicResource?.current ?? 0;

  // Calculate potency based on Might
  const might = characteristics?.might ?? 2;

  // Get active tiers based on current ferocity and level
  const activeTiers = useMemo(() => {
    return FEROCITY_TIERS.filter(tier => tier.minLevel <= level);
  }, [level]);

  const handleFerocityChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentFerocity + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<FuryHero>);
  }, [currentFerocity, heroicResource, updateHero]);

  const aspectData = aspect ? ASPECT_INFO[aspect] : null;

  // Calculate highest active tier
  const highestActiveTier = activeTiers.reduce((highest, tier) => {
    return currentFerocity >= tier.threshold ? tier.threshold : highest;
  }, 0);

  return (
    <div className="class-widget class-widget--fury">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Ferocity</span>
          <span className="class-widget__quick-stat-value">{currentFerocity}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Tier</span>
          <span className="class-widget__quick-stat-value">
            {highestActiveTier > 0 ? `${highestActiveTier}+` : '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">M+{might}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Fury</h3>
          {aspectData && (
            <span className="class-widget__badge">{aspectData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Ferocity Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Ferocity</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleFerocityChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentFerocity}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleFerocityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Growing Ferocity Tiers */}
        <div className="class-widget__tiers">
          <h4 className="class-widget__gain-title">Growing Ferocity</h4>
          {activeTiers.map((tier) => {
            const isActive = currentFerocity >= tier.threshold;
            return (
              <div
                key={tier.threshold}
                className={`class-widget__tier ${isActive ? 'class-widget__tier--active' : 'class-widget__tier--locked'}`}
              >
                <span className="class-widget__tier-threshold">{tier.threshold}+</span>
                <span className="class-widget__tier-benefit">{tier.benefit}</span>
                {tier.minLevel > 1 && (
                  <span className="class-widget__level-badge">L{tier.minLevel}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Aspect Info */}
        {aspectData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{aspectData.name} Aspect</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {aspectData.description}
            </p>
          </div>
        )}

        {/* Ferocity Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Ferocity Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll 1d3 Ferocity</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round you take damage: <strong>+1 Ferocity</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/encounter you become winded or dying: <strong>+1d3 Ferocity</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">M-2 ({might - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">M-1 ({might - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">M ({might})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuryWidget;



================================================
FILE: src/components/abilities/classWidgets/index.ts
================================================
// Class Ability Widgets - Display class-specific mechanics in AbilitiesView
export { ClassAbilityWidget } from './ClassAbilityWidget';
export { CensorWidget } from './CensorWidget';
export { ConduitWidget } from './ConduitWidget';
export { ElementalistWidget } from './ElementalistWidget';
export { FuryWidget } from './FuryWidget';
export { NullWidget } from './NullWidget';
export { ShadowWidget } from './ShadowWidget';
export { SummonerWidget } from './SummonerWidget';
export { TacticianWidget } from './TacticianWidget';
export { TalentWidget } from './TalentWidget';
export { TroubadourWidget } from './TroubadourWidget';



================================================
FILE: src/components/abilities/classWidgets/NullWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { NullHero, NullTradition, PsionicAugmentation } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface NullWidgetProps {
  hero: NullHero;
}

const TRADITION_INFO: Record<NullTradition, { name: string; description: string }> = {
  chronokinetic: {
    name: 'Chronokinetic',
    description: 'Manipulate time to slow enemies and accelerate allies.',
  },
  cryokinetic: {
    name: 'Cryokinetic',
    description: 'Control cold and ice to freeze foes in their tracks.',
  },
  metakinetic: {
    name: 'Metakinetic',
    description: 'Master mental force to crush and manipulate physical matter.',
  },
};

const AUGMENTATION_INFO: Record<PsionicAugmentation, { name: string; effect: string }> = {
  density: {
    name: 'Density',
    effect: 'Increase mass for greater impact and resistance.',
  },
  force: {
    name: 'Force',
    effect: 'Amplify telekinetic power for stronger effects.',
  },
  speed: {
    name: 'Speed',
    effect: 'Accelerate movement and reaction time.',
  },
};

export const NullWidget: React.FC<NullWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, nullField, subclass: tradition, augmentation, characteristics, level } = hero;
  const currentDiscipline = heroicResource?.current ?? 0;
  const isFieldActive = nullField?.isActive ?? false;
  const fieldSize = (nullField?.baseSize ?? 1) + (nullField?.bonusSize ?? 0);

  // Calculate potency based on Intuition
  const intuition = characteristics?.intuition ?? 2;

  const handleDisciplineChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentDiscipline + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<NullHero>);
  }, [currentDiscipline, heroicResource, updateHero]);

  const handleToggleNullField = useCallback(() => {
    updateHero({
      nullField: {
        ...nullField,
        isActive: !isFieldActive,
      },
    } as Partial<NullHero>);
  }, [nullField, isFieldActive, updateHero]);

  const traditionData = tradition ? TRADITION_INFO[tradition] : null;
  const augmentationData = augmentation ? AUGMENTATION_INFO[augmentation] : null;

  return (
    <div className="class-widget class-widget--null">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Discipline</span>
          <span className="class-widget__quick-stat-value">{currentDiscipline}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Null Field</span>
          <span className="class-widget__quick-stat-value">
            {isFieldActive ? `${fieldSize} Aura` : 'Off'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">I+{intuition}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Null</h3>
          {traditionData && (
            <span className="class-widget__badge">{traditionData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Discipline Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Discipline</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDisciplineChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentDiscipline}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDisciplineChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Null Field Status */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Null Field</h4>
            <span className={`class-widget__mechanic-status ${isFieldActive ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {isFieldActive ? `Active (${fieldSize} Aura)` : 'Inactive'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Enemies in your Null Field have <strong>Potency −1</strong> on all power rolls.
          </p>
          <button
            className="class-widget__target-btn"
            onClick={handleToggleNullField}
            style={{ marginTop: '0.5rem' }}
          >
            {isFieldActive ? 'Deactivate Field' : 'Activate Field (Maneuver)'}
          </button>
        </div>

        {/* Inertial Shield */}
        <div className="class-widget__mechanic" style={{ borderLeftColor: '#4dd0e1' }}>
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Inertial Shield</h4>
          </div>
          <p className="class-widget__mechanic-description">
            <strong>Triggered Action (1/round):</strong> When an enemy in your Null Field attacks an ally, spend Discipline to reduce damage.
          </p>
        </div>

        {/* Tradition Info */}
        {traditionData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{traditionData.name} Tradition</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {traditionData.description}
            </p>
          </div>
        )}

        {/* Augmentation Info */}
        {augmentationData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--accent-primary)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Psionic Augmentation: {augmentationData.name}</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {augmentationData.effect}
            </p>
          </div>
        )}

        {/* L10 Order Resource */}
        {level >= 10 && hero.order && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--xp)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Order (Epic Resource)</h4>
              <span className="class-widget__level-badge">L10</span>
            </div>
            <p className="class-widget__mechanic-description">
              Current: <strong>{hero.order.current}</strong> | Can spend Order as Discipline.
            </p>
          </div>
        )}

        {/* Discipline Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Discipline Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+2 Discipline</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round an enemy in Null Field uses main action: <strong>+1 Discipline</strong>
            </li>
            <li className="class-widget__gain-item">
              When Director spends Malice: <strong>+1 Discipline</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">I-2 ({intuition - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">I-1 ({intuition - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">I ({intuition})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NullWidget;



================================================
FILE: src/components/abilities/classWidgets/ShadowWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { ShadowHero, ShadowCollege } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface ShadowWidgetProps {
  hero: ShadowHero;
}

const COLLEGE_INFO: Record<ShadowCollege, { name: string; description: string; icon: string }> = {
  'black-ash': {
    name: 'Black Ash',
    description: 'Teleporting assassins who move through ash and shadow to strike unseen.',
    icon: '🔥',
  },
  'caustic-alchemy': {
    name: 'Caustic Alchemy',
    description: 'Poisoners and alchemists who coat their weapons with deadly substances.',
    icon: '🧪',
  },
  'harlequin-mask': {
    name: 'Harlequin Mask',
    description: 'Deceivers and tricksters who hide in plain sight using charm and misdirection.',
    icon: '🎭',
  },
};

export const ShadowWidget: React.FC<ShadowWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, isHidden, subclass: college, characteristics } = hero;
  const currentInsight = heroicResource?.current ?? 0;

  // Calculate potency based on Agility
  const agility = characteristics?.agility ?? 2;

  const handleInsightChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentInsight + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<ShadowHero>);
  }, [currentInsight, heroicResource, updateHero]);

  const handleToggleHidden = useCallback(() => {
    updateHero({
      isHidden: !isHidden,
    } as Partial<ShadowHero>);
  }, [isHidden, updateHero]);

  const collegeData = college ? COLLEGE_INFO[college] : null;

  return (
    <div className="class-widget class-widget--shadow">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Insight</span>
          <span className="class-widget__quick-stat-value">{currentInsight}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Hidden</span>
          <span className="class-widget__quick-stat-value">
            {isHidden ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">A+{agility}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Shadow</h3>
          {collegeData && (
            <span className="class-widget__badge">
              {collegeData.icon} {collegeData.name}
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Insight Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Insight</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleInsightChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentInsight}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleInsightChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Hidden Status */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Hidden Status</h4>
            <span className={`class-widget__mechanic-status ${isHidden ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {isHidden ? 'Hidden' : 'Visible'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            While hidden, you have edge on attacks and enemies can't target you with attacks.
          </p>
          <button
            className="class-widget__target-btn"
            onClick={handleToggleHidden}
            style={{ marginTop: '0.5rem' }}
          >
            {isHidden ? 'Reveal' : 'Hide'}
          </button>
        </div>

        {/* Cost Reduction Reminder */}
        <div className="class-widget__mechanic" style={{ borderLeftColor: '#9575cd' }}>
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Efficient Killer</h4>
          </div>
          <p className="class-widget__mechanic-description">
            Abilities cost <strong>−1 Insight</strong> when your power roll has edge or double edge.
          </p>
        </div>

        {/* Hesitation Is Weakness */}
        <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--danger)' }}>
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Hesitation Is Weakness</h4>
          </div>
          <p className="class-widget__mechanic-description">
            <strong>Triggered Action:</strong> When you score 2+ surges on a power roll, make a free strike against the same target.
          </p>
        </div>

        {/* College Info */}
        {collegeData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">
                {collegeData.icon} {collegeData.name}
              </h4>
            </div>
            <p className="class-widget__mechanic-description">
              {collegeData.description}
            </p>
          </div>
        )}

        {/* Insight Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Insight Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll 1d3 Insight</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round you deal damage with 1+ surges: <strong>+1 Insight</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">A-2 ({agility - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">A-1 ({agility - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">A ({agility})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowWidget;



================================================
FILE: src/components/abilities/classWidgets/SummonerWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { SummonerHeroV2, Formation } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface SummonerWidgetProps {
  hero: SummonerHeroV2;
}

const FORMATION_INFO: Record<Formation, { name: string; bonus: string }> = {
  horde: { name: 'Horde', bonus: 'Minions deal +1 damage' },
  platoon: { name: 'Platoon', bonus: 'Minions have +2 speed' },
  elite: { name: 'Elite', bonus: 'Minions have +3 Stamina, +1 Stability' },
  leader: { name: 'Leader', bonus: 'You can take excess damage instead of minions dying' },
};

const CIRCLE_INFO: Record<string, { name: string; portfolio: string }> = {
  blight: { name: 'Blight', portfolio: 'Demon' },
  graves: { name: 'Graves', portfolio: 'Undead' },
  spring: { name: 'Spring', portfolio: 'Fey' },
  storms: { name: 'Storms', portfolio: 'Elemental' },
};

export const SummonerWidget: React.FC<SummonerWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, formation, subclass: circle, activeSquads } = hero;
  const currentEssence = heroicResource?.current ?? 0;
  const maxPerTurn = heroicResource?.maxPerTurn ?? 5;

  // Count active minions
  const totalMinions = activeSquads?.reduce((sum, squad) => sum + squad.members.length, 0) ?? 0;
  const squadCount = activeSquads?.length ?? 0;

  const handleEssenceChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentEssence + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<SummonerHeroV2>);
  }, [currentEssence, heroicResource, updateHero]);

  const formationData = formation ? FORMATION_INFO[formation] : null;
  const circleData = circle ? CIRCLE_INFO[circle] : null;

  return (
    <div className="class-widget class-widget--summoner">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Essence</span>
          <span className="class-widget__quick-stat-value">{currentEssence}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Max/Turn</span>
          <span className="class-widget__quick-stat-value">{maxPerTurn}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Squads</span>
          <span className="class-widget__quick-stat-value">{squadCount}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Minions</span>
          <span className="class-widget__quick-stat-value">{totalMinions}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Summoner</h3>
          {circleData && (
            <span className="class-widget__badge">{circleData.name}</span>
          )}
          {formationData && (
            <span className="class-widget__badge" style={{ marginLeft: '0.25rem' }}>
              {formationData.name}
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Essence Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Essence</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleEssenceChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentEssence}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleEssenceChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Formation Bonus */}
        {formationData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">
                {formationData.name} Formation
              </h4>
              <span className="class-widget__mechanic-status class-widget__mechanic-status--active">
                Active
              </span>
            </div>
            <p className="class-widget__mechanic-description">
              {formationData.bonus}
            </p>
          </div>
        )}

        {/* Circle Info */}
        {circleData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--essence)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">
                Circle of {circleData.name}
              </h4>
            </div>
            <p className="class-widget__mechanic-description">
              Portfolio: {circleData.portfolio} minions
            </p>
          </div>
        )}

        {/* Essence Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Essence Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+2 Essence</strong> (max {maxPerTurn}/turn)
            </li>
            <li className="class-widget__gain-item">
              First time/round a minion dies unwillingly: <strong>+1 Essence</strong>
            </li>
          </ul>
        </div>

        {/* Quick Command Reminder */}
        {hero.quickCommand && (
          <div className="class-widget__mechanic" style={{ marginTop: '0.75rem', borderLeftColor: '#ce93d8' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Quick Command</h4>
            </div>
            <p className="class-widget__mechanic-description">
              <strong>{hero.quickCommand.name}:</strong> {hero.quickCommand.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummonerWidget;



================================================
FILE: src/components/abilities/classWidgets/TacticianWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { TacticianHero, TacticianDoctrine } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface TacticianWidgetProps {
  hero: TacticianHero;
}

const DOCTRINE_INFO: Record<TacticianDoctrine, { name: string; description: string }> = {
  insurgent: {
    name: 'Insurgent',
    description: 'Guerrilla leader who uses unconventional tactics and ambushes.',
  },
  mastermind: {
    name: 'Mastermind',
    description: 'Strategic genius who sees the battlefield several moves ahead.',
  },
  vanguard: {
    name: 'Vanguard',
    description: 'Front-line commander who leads from the front.',
  },
};

export const TacticianWidget: React.FC<TacticianWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [targetInput, setTargetInput] = useState('');

  const { heroicResource, markedTargets = [], subclass: doctrine, level, characteristics } = hero;
  const currentFocus = heroicResource?.current ?? 0;

  // Calculate potency based on Reason
  const reason = characteristics?.reason ?? 2;

  const handleFocusChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentFocus + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<TacticianHero>);
  }, [currentFocus, heroicResource, updateHero]);

  const handleAddMark = useCallback(() => {
    if (targetInput.trim() && !markedTargets.includes(targetInput.trim())) {
      updateHero({
        markedTargets: [...markedTargets, targetInput.trim()],
      } as Partial<TacticianHero>);
      setTargetInput('');
    }
  }, [targetInput, markedTargets, updateHero]);

  const handleRemoveMark = useCallback((target: string) => {
    updateHero({
      markedTargets: markedTargets.filter(t => t !== target),
    } as Partial<TacticianHero>);
  }, [markedTargets, updateHero]);

  const doctrineData = doctrine ? DOCTRINE_INFO[doctrine] : null;
  const hasMarks = markedTargets.length > 0;

  return (
    <div className="class-widget class-widget--tactician">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Focus</span>
          <span className="class-widget__quick-stat-value">{currentFocus}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Marked</span>
          <span className="class-widget__quick-stat-value">
            {markedTargets.length > 0 ? markedTargets.length : '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">R+{reason}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Tactician</h3>
          {doctrineData && (
            <span className="class-widget__badge">{doctrineData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Focus Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Focus</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleFocusChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentFocus}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleFocusChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Mark Mechanic */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Mark</h4>
            <span className={`class-widget__mechanic-status ${hasMarks ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {hasMarks ? `${markedTargets.length} Target${markedTargets.length > 1 ? 's' : ''}` : 'None'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Allies have <strong>Edge</strong> on attacks against marked targets.
          </p>

          {/* Active Marks */}
          {hasMarks && (
            <div style={{ marginTop: '0.5rem' }}>
              {markedTargets.map(target => (
                <div key={target} className="class-widget__active-target" style={{ marginBottom: '0.25rem' }}>
                  <span className="class-widget__active-target-name">{target}</span>
                  <button
                    className="class-widget__target-btn class-widget__target-btn--danger"
                    onClick={() => handleRemoveMark(target)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Mark Input */}
          <div className="class-widget__target">
            <label className="class-widget__target-label">Mark a target:</label>
            <div className="class-widget__target-input-group">
              <input
                type="text"
                className="class-widget__target-input"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="Target name..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddMark()}
              />
              <button
                className="class-widget__target-btn"
                onClick={handleAddMark}
                disabled={!targetInput.trim()}
              >
                Mark
              </button>
            </div>
          </div>
        </div>

        {/* Field Arsenal Reminder */}
        <div className="class-widget__mechanic" style={{ borderLeftColor: '#64b5f6' }}>
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Field Arsenal</h4>
          </div>
          <p className="class-widget__mechanic-description">
            You can equip <strong>two different Kits</strong> and switch between them as a maneuver.
          </p>
        </div>

        {/* Doctrine Info */}
        {doctrineData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{doctrineData.name} Doctrine</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {doctrineData.description}
            </p>
          </div>
        )}

        {/* Focus Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Focus Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+2 Focus</strong>
            </li>
            <li className="class-widget__gain-item">
              First time/round an ally deals damage to marked target: <strong>+1 Focus</strong>
            </li>
            <li className="class-widget__gain-item">
              When an ally scores a critical hit: <strong>+1 Focus</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">R-2 ({reason - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">R-1 ({reason - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">R ({reason})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticianWidget;



================================================
FILE: src/components/abilities/classWidgets/TalentWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { TalentHero, TalentTradition } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface TalentWidgetProps {
  hero: TalentHero;
}

const TRADITION_INFO: Record<TalentTradition, { name: string; description: string }> = {
  chronopathy: {
    name: 'Chronopathy',
    description: 'Seer of time who perceives past and future, accelerating allies.',
  },
  telekinesis: {
    name: 'Telekinesis',
    description: 'Master of psychic force who moves objects and creatures with thought.',
  },
  telepathy: {
    name: 'Telepathy',
    description: 'Mind-reader who communicates silently and projects psychic attacks.',
  },
};

export const TalentWidget: React.FC<TalentWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, isStrained, subclass: tradition, level, characteristics } = hero;
  const currentClarity = heroicResource?.current ?? 0;

  // Calculate potency based on Reason
  const reason = characteristics?.reason ?? 2;

  // Calculate minimum clarity: -(1 + Reason)
  const minimumClarity = -(1 + reason);

  // Calculate strain damage if negative
  const strainDamage = currentClarity < 0 ? Math.abs(currentClarity) : 0;

  // Determine clarity gain based on level
  const clarityGainDice = level >= 7 ? '1d3 + 1' : '1d3';
  const forceMoveBonus = level >= 10 ? 3 : 1;

  const handleClarityChange = useCallback((delta: number) => {
    const newValue = Math.max(minimumClarity, currentClarity + delta);
    const newIsStrained = newValue < 0;
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
      isStrained: newIsStrained,
    } as Partial<TalentHero>);
  }, [currentClarity, minimumClarity, heroicResource, updateHero]);

  const traditionData = tradition ? TRADITION_INFO[tradition] : null;

  // Calculate visual position for clarity gauge
  const gaugeWidth = 10 - minimumClarity; // Total range
  const zeroPosition = Math.abs(minimumClarity) / gaugeWidth * 100;
  const clarityPosition = (currentClarity - minimumClarity) / gaugeWidth * 100;

  return (
    <div className={`class-widget class-widget--talent ${isStrained ? 'class-widget--strained' : ''}`}>
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Clarity</span>
          <span className="class-widget__quick-stat-value" style={{ color: currentClarity < 0 ? 'var(--danger)' : undefined }}>
            {currentClarity}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Status</span>
          <span className="class-widget__quick-stat-value" style={{ color: isStrained ? 'var(--danger)' : 'var(--success)' }}>
            {isStrained ? 'STRAINED' : 'Clear'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">R+{reason}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Talent</h3>
          {traditionData && (
            <span className="class-widget__badge">{traditionData.name}</span>
          )}
          {isStrained && (
            <span className="class-widget__badge" style={{ background: 'var(--danger-dim)', color: 'var(--danger)' }}>
              STRAINED
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Clarity Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Clarity</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleClarityChange(-1)}
              disabled={currentClarity <= minimumClarity}
            >
              −
            </button>
            <span className="class-widget__resource-value" style={{ color: currentClarity < 0 ? 'var(--danger)' : undefined }}>
              {currentClarity}
            </span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleClarityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Clarity Gauge Visualization */}
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginBottom: '0.25rem',
          }}>
            <span>{minimumClarity} (min)</span>
            <span>0</span>
            <span>10+</span>
          </div>
          <div style={{
            height: '12px',
            background: 'var(--bg-darkest)',
            borderRadius: 'var(--radius-sm)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Danger zone (negative) */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${zeroPosition}%`,
              background: 'var(--danger-dim)',
              borderRight: '2px solid var(--text-muted)',
            }} />
            {/* Current clarity marker */}
            <div style={{
              position: 'absolute',
              left: `${clarityPosition}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: currentClarity < 0 ? 'var(--danger)' : 'var(--accent-primary)',
              boxShadow: currentClarity < 0
                ? '0 0 8px var(--danger)'
                : '0 0 8px var(--accent-primary)',
            }} />
          </div>
        </div>

        {/* Strain Warning */}
        {isStrained && (
          <div style={{
            marginTop: '0.75rem',
            padding: '0.75rem',
            background: 'var(--danger-dim)',
            border: '1px solid var(--danger)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <div style={{ color: 'var(--danger)', fontWeight: 700, marginBottom: '0.25rem' }}>
              STRAINED
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              End of turn: Take <strong style={{ color: 'var(--danger)' }}>{strainDamage}</strong> damage
            </div>
          </div>
        )}

        {/* Mind Recovery (L4+) */}
        {level >= 4 && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: 'var(--success)' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Mind Recovery</h4>
              <span className="class-widget__level-badge">L4</span>
            </div>
            <p className="class-widget__mechanic-description">
              When Strained, you can spend a Recovery to gain <strong>3 Clarity</strong> instead of regaining Stamina.
            </p>
          </div>
        )}

        {/* Tradition Info */}
        {traditionData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{traditionData.name} Tradition</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {traditionData.description}
            </p>
          </div>
        )}

        {/* Clarity Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Clarity Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll {clarityGainDice} Clarity</strong>
              {level >= 7 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L7</span>}
            </li>
            <li className="class-widget__gain-item">
              First time/round you force move a creature: <strong>+{forceMoveBonus} Clarity</strong>
              {level >= 10 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L10</span>}
            </li>
          </ul>
        </div>

        {/* Strain Mechanics */}
        <div className="class-widget__gain-section" style={{ background: 'var(--danger-dark)', borderColor: 'var(--danger)' }}>
          <h4 className="class-widget__gain-title" style={{ color: 'var(--danger)' }}>Strain Mechanics</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item" style={{ color: 'var(--text-secondary)' }}>
              Minimum Clarity: <strong>{minimumClarity}</strong> (−1 − Reason: {reason})
            </li>
            <li className="class-widget__gain-item" style={{ color: 'var(--text-secondary)' }}>
              At negative Clarity: Take |Clarity| damage at end of turn
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">R-2 ({reason - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">R-1 ({reason - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">R ({reason})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentWidget;



================================================
FILE: src/components/abilities/classWidgets/TroubadourWidget.tsx
================================================
import React, { useState, useCallback } from 'react';
import { TroubadourHero, TroubadourClass, Routine } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface TroubadourWidgetProps {
  hero: TroubadourHero;
}

const CLASS_INFO: Record<TroubadourClass, { name: string; description: string }> = {
  auteur: {
    name: 'Auteur',
    description: 'Storyteller and director who manipulates battlefield positioning.',
  },
  duelist: {
    name: 'Duelist',
    description: 'Acrobatic swordfighter with dramatic flair and tandem attacks.',
  },
  virtuoso: {
    name: 'Virtuoso',
    description: 'Musical performer whose songs empower allies and strike enemies.',
  },
};

const SAMPLE_ROUTINES: Routine[] = [
  { id: 'inspiring', name: 'Inspiring Routine', effect: 'Allies within 5 squares gain +1 to power rolls' },
  { id: 'defensive', name: 'Defensive Routine', effect: 'Allies within 5 squares gain +1 to defenses' },
  { id: 'aggressive', name: 'Aggressive Routine', effect: 'Allies within 5 squares deal +1 damage' },
];

export const TroubadourWidget: React.FC<TroubadourWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const { heroicResource, activeRoutine, scenePartners = [], heroPartners = [], subclass: troubadourClass, characteristics } = hero;
  const currentDrama = heroicResource?.current ?? 0;

  // Calculate potency based on Presence
  const presence = characteristics?.presence ?? 2;

  // Check if can self-resurrect (30+ Drama)
  const canResurrect = currentDrama >= 30;

  const handleDramaChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentDrama + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<TroubadourHero>);
  }, [currentDrama, heroicResource, updateHero]);

  const handleSelectRoutine = useCallback((routine: Routine | null) => {
    updateHero({
      activeRoutine: routine,
    } as Partial<TroubadourHero>);
  }, [updateHero]);

  const classData = troubadourClass ? CLASS_INFO[troubadourClass] : null;

  return (
    <div className="class-widget class-widget--troubadour">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Drama</span>
          <span className="class-widget__quick-stat-value" style={{ color: canResurrect ? 'var(--xp)' : undefined }}>
            {currentDrama}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Routine</span>
          <span className="class-widget__quick-stat-value">
            {activeRoutine?.name.split(' ')[0] || '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Partners</span>
          <span className="class-widget__quick-stat-value">
            {scenePartners.length + heroPartners.length}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">P+{presence}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Troubadour</h3>
          {classData && (
            <span className="class-widget__badge">{classData.name}</span>
          )}
          {canResurrect && (
            <span className="class-widget__badge" style={{ background: 'var(--xp-dim)', color: 'var(--xp)' }}>
              30+ Drama!
            </span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Drama Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Drama</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDramaChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentDrama}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleDramaChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* 30 Drama Resurrection Note */}
        {canResurrect && (
          <div style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            background: 'var(--xp-dim)',
            border: '1px solid var(--xp)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <span style={{ color: 'var(--xp)', fontWeight: 600 }}>
              At 30+ Drama, you can resurrect yourself if you die!
            </span>
          </div>
        )}

        {/* Active Routine */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Active Routine</h4>
            <span className={`class-widget__mechanic-status ${activeRoutine ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {activeRoutine ? 'Active' : 'None'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Activate a routine as a maneuver to provide ongoing benefits to nearby allies.
          </p>

          {/* Current Routine Display */}
          {activeRoutine && (
            <div className="class-widget__active-target" style={{ marginTop: '0.5rem' }}>
              <span>
                <strong>{activeRoutine.name}</strong>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {activeRoutine.effect}
                </span>
              </span>
              <button
                className="class-widget__target-btn class-widget__target-btn--danger"
                onClick={() => handleSelectRoutine(null)}
              >
                End
              </button>
            </div>
          )}

          {/* Routine Selection */}
          {!activeRoutine && (
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {SAMPLE_ROUTINES.map(routine => (
                <button
                  key={routine.id}
                  className="class-widget__target-btn"
                  onClick={() => handleSelectRoutine(routine)}
                  style={{ textAlign: 'left', padding: '0.5rem' }}
                >
                  <strong>{routine.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                    {routine.effect}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scene Partners */}
        {(scenePartners.length > 0 || heroPartners.length > 0) && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: '#f06292' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">Scene Partners</h4>
            </div>
            <p className="class-widget__mechanic-description">
              NPCs: {scenePartners.length} | Heroes: {heroPartners.length}
            </p>
            {scenePartners.length > 0 && (
              <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {scenePartners.map(p => p.name).join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Class Info */}
        {classData && (
          <div className="class-widget__mechanic">
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{classData.name}</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {classData.description}
            </p>
          </div>
        )}

        {/* Drama Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Drama Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>Roll 1d3 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              3+ heroes act on same turn: <strong>+2 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              A hero becomes winded: <strong>+2 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              Natural 19-20 on power roll: <strong>+3 Drama</strong>
            </li>
            <li className="class-widget__gain-item">
              A hero dies: <strong>+10 Drama</strong>
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">P-2 ({presence - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">P-1 ({presence - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">P ({presence})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubadourWidget;



================================================
FILE: src/components/character/CharacterDetailsView.css
================================================
/* ============================================
   CHARACTER DETAILS VIEW - Draw Steel Banner Frame Style
   ============================================ */

/* === DESIGN TOKENS === */
:root {
  --ds-corner-radius: 8px;
  --ds-header-height: 36px;
  --ds-chevron-width: 24px;
  --ds-chevron-depth: 10px;
  --ds-border-color: #3a3a3a;
  --ds-border-width: 1px;
  --ds-section-bg: var(--bg-card, #1a1a1a);
  --ds-header-bg: var(--bg-darkest, #141414);
}

/* === GRID LAYOUT === */
.character-details-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* ============================================
   SECTION FRAME - Base Banner Style
   ============================================ */

.details-section {
  position: relative;
  background: var(--ds-section-bg);
  border: var(--ds-border-width) solid var(--ds-border-color);
  border-radius: var(--ds-corner-radius);
  overflow: hidden;
}

/* === SECTION HEADER WITH CHEVRON === */
.details-section h2 {
  position: relative;
  margin: 0;
  padding: 0.6rem 1rem;
  padding-bottom: calc(0.6rem + var(--ds-chevron-depth));
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  background: var(--ds-header-bg);
  border-bottom: var(--ds-border-width) solid var(--ds-border-color);
}

/* Chevron notch below header text */
.details-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: calc(var(--ds-chevron-width) / 2) solid transparent;
  border-right: calc(var(--ds-chevron-width) / 2) solid transparent;
  border-top: var(--ds-chevron-depth) solid var(--ds-header-bg);
  z-index: 2;
}

/* Separator line positioned above chevron */
.details-section h2::before {
  content: '';
  position: absolute;
  bottom: var(--ds-chevron-depth);
  left: 0;
  right: 0;
  height: var(--ds-border-width);
  background: var(--ds-border-color);
  z-index: 1;
}

/* === SECTION CONTENT AREA === */
.details-section .section-content {
  padding: 1rem;
}

/* Legacy content area (for existing structure) */
.details-section > *:not(h2) {
  padding: 0 1rem;
}

.details-section > *:last-child {
  padding-bottom: 1rem;
}

.details-section > h2 + * {
  padding-top: 1rem;
}

/* === SECTION H4 SUBHEADERS === */
.details-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary, #b8b8b0);
}

/* === DESCRIPTION TEXT === */
.description {
  color: var(--text-muted, #888);
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.85rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* ============================================
   ANCESTRY SECTION - Golden Accent
   ============================================ */

.ancestry-section h2 {
  color: #f0c674;
}

.ancestry-section h2::after {
  border-top-color: var(--ds-header-bg);
}

.ancestry-stats {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  padding: 0 1rem;
}

.ancestry-stats .stat {
  background: rgba(240, 198, 116, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  color: #f0c674;
  font-weight: 500;
  font-size: 0.85rem;
  border: 1px solid rgba(240, 198, 116, 0.2);
}

.feature-block {
  margin: 0 1rem 1rem 1rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.feature-block.signature {
  border-left: 3px solid #f0c674;
}

.feature-block.purchased {
  border-left: 3px solid var(--color-success, #4de8b2);
}

.feature-block h4 {
  margin: 0 0 0.5rem 0;
  color: #f0c674;
}

.feature {
  margin-bottom: 0.5rem;
}

.feature strong {
  color: #f0c674;
}

.feature p {
  margin: 0.25rem 0 0 0;
  color: var(--text-secondary, #b8b8b0);
  font-size: 0.85rem;
  line-height: 1.4;
}

.traits-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.trait strong {
  color: var(--color-success, #4de8b2);
}

.trait .cost {
  color: #f0c674;
  margin-left: 0.5rem;
  font-size: 0.8rem;
}

.trait p {
  margin: 0.25rem 0 0 0;
  color: var(--text-muted, #888);
  font-size: 0.85rem;
}

/* ============================================
   CULTURE SECTION - Purple Accent (3-Column Grid)
   ============================================ */

.culture-section h2 {
  color: #ba68c8;
}

.culture-section h4 {
  color: #ba68c8;
}

/* Main grid container */
.culture-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--ds-border-color, #3a3a3a);
  margin: 1rem;
  padding: 0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--ds-border-color, #3a3a3a);
}

/* Individual culture aspect cells - matches skills-block pattern */
.culture-aspect {
  background: var(--ds-section-bg, #1a1a1a);
  padding: 0.75rem;
  min-width: 0; /* Prevent grid blowout from long content */
}

/* Aspect header */
.culture-aspect h4 {
  margin: 0 0 0.4rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ba68c8;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Base paragraph styling */
.culture-aspect p {
  margin: 0;
  color: var(--text-muted, #888);
  font-size: 0.8rem;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Description text */
.culture-aspect .aspect-description {
  color: var(--text-secondary, #b8b8b0);
  font-style: italic;
}

/* Skills list */
.culture-aspect .aspect-skills {
  margin-top: 0.4rem;
  color: var(--accent-primary, #4de8b2);
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.3;
}

/* Empty state - when aspect is missing */
.culture-aspect--empty {
  opacity: 0.5;
  font-style: italic;
}

/* ============================================
   CAREER SECTION - Orange Accent (2-Column Layout)
   ============================================ */

.career-section h2 {
  color: #ffb74d;
}

.career-section h4 {
  color: #ffb74d;
}

.career-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.career-stat {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  border: 1px solid var(--ds-border-color);
}

.career-stat strong {
  color: #ffb74d;
}

.inciting-incident {
  margin: 0 1rem 1rem 1rem;
  padding: 0.75rem;
  background: rgba(255, 183, 77, 0.08);
  border-radius: 4px;
  border-left: 3px solid #ffb74d;
  position: relative;
}

.inciting-incident h4 {
  margin-bottom: 0.5rem;
}

.inciting-incident p {
  margin: 0;
  color: var(--text-secondary, #b8b8b0);
  font-style: italic;
  font-size: 0.9rem;
}

/* ============================================
   SKILLS & LANGUAGES SECTION - Emerald Accent
   ============================================ */

.skills-section h2 {
  color: var(--accent-primary, #4de8b2);
}

.skills-section h4 {
  color: var(--text-secondary, #b8b8b0);
}

.skills-languages-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--ds-border-color);
  margin: 0 1rem 1rem 1rem;
  border-radius: 4px;
  overflow: hidden;
}

.skills-block, .languages-block {
  background: var(--ds-section-bg);
  padding: 0.75rem;
}

.skills-list, .languages-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skills-list li {
  background: rgba(77, 232, 178, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--accent-primary, #4de8b2);
  border: 1px solid rgba(77, 232, 178, 0.2);
}

.languages-list li {
  background: rgba(186, 104, 200, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #ba68c8;
  border: 1px solid rgba(186, 104, 200, 0.2);
}

/* ============================================
   KIT SECTION - Blue Accent
   ============================================ */

.kit-section h2 {
  color: #90caf9;
}

.kit-section h4 {
  color: #90caf9;
  font-size: 0.8rem;
  margin: 0;
}

/* Stats grid - 4 columns */
.kit-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--ds-border-color, #3a3a3a);
  margin: 0 1rem 0 1rem;
  border-radius: 4px 4px 0 0; /* Rounded top corners only */
  overflow: hidden;
  border: 1px solid var(--ds-border-color, #3a3a3a);
}

/* Individual stat cell */
.kit-stat {
  background: var(--ds-section-bg, #1a1a1a);
  padding: 0.5rem 0.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.15rem;
  min-width: 0; /* Prevent overflow */
}

/* Stat label */
.kit-stat strong {
  display: block;
  color: #90caf9;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Stat value */
.kit-stat .stat-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary, #f5f5f0);
}

/* Equipment container - joins with kit-stats above */
.kit-equipment {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--ds-border-color, #3a3a3a);
  margin: -1px 1rem 1rem 1rem; /* Negative top margin overlaps with kit-stats border */
  border-radius: 0 0 4px 4px; /* Rounded bottom corners only */
  overflow: hidden;
  border: 1px solid var(--ds-border-color, #3a3a3a);
}

/* Equipment row */
.equipment-block {
  padding: 0.6rem 0.75rem;
  background: var(--ds-section-bg, #1a1a1a);
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap; /* Allow wrapping for long lists */
  min-width: 0;
}

.equipment-block h4 {
  margin: 0;
  white-space: nowrap;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.equipment-block p {
  margin: 0;
  color: var(--text-secondary, #b8b8b0);
  font-size: 0.85rem;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;
  flex: 1;
}

/* Empty equipment block */
.equipment-block--empty {
  opacity: 0.5;
  font-style: italic;
}

/* ============================================
   CIRCLE SECTION - Purple Accent
   ============================================ */

.circle-section h2 {
  color: #ce93d8;
}

.circle-section h4 {
  color: #ce93d8;
}

.circle-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.circle-stat {
  font-size: 0.9rem;
}

.circle-stat strong {
  color: #ce93d8;
}

.formation-info {
  margin: 0 1rem 1rem 1rem;
  padding: 0.75rem;
  background: rgba(156, 39, 176, 0.08);
  border-radius: 4px;
  border: 1px solid rgba(206, 147, 216, 0.2);
}

.formation-info h4 {
  margin: 0 0 0.5rem 0;
}

.quick-command-detail strong {
  color: #f0c674;
}

.quick-command-detail p {
  margin: 0.25rem 0 0 0;
  color: var(--text-muted, #888);
  font-size: 0.85rem;
}

/* ============================================
   FORMATION SELECTOR
   ============================================ */

.formation-selector {
  margin: 0 1rem 1rem 1rem;
  padding: 0;
}

.formation-selector h4 {
  color: #ce93d8;
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
}

.formation-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.formation-option {
  background: var(--bg-darkest, #0a1212);
  border: 1px solid var(--ds-border-color, #3a3a3a);
  border-radius: 6px;
  padding: 0.6rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.formation-option:hover {
  border-color: rgba(206, 147, 216, 0.5);
  background: rgba(206, 147, 216, 0.05);
}

.formation-option.selected {
  border-color: #ce93d8;
  background: rgba(206, 147, 216, 0.15);
  box-shadow: 0 0 10px rgba(206, 147, 216, 0.2);
}

.formation-option .formation-name {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-primary, #f5f5f0);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.formation-option.selected .formation-name {
  color: #ce93d8;
}

.formation-option .formation-desc {
  font-size: 0.7rem;
  color: var(--text-secondary, #b8b8b0);
  line-height: 1.3;
  font-style: italic;
}

.formation-option .formation-benefits {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.formation-option .formation-benefits li {
  font-size: 0.65rem;
  color: var(--accent-primary, #4de8b2);
  padding-left: 0.75rem;
  position: relative;
}

.formation-option .formation-benefits li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent-primary, #4de8b2);
}

.formation-option.selected .formation-benefits li {
  color: #ce93d8;
}

.formation-option.selected .formation-benefits li::before {
  color: #ce93d8;
}

@media (max-width: 600px) {
  .formation-options {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   HOVER EFFECTS
   ============================================ */

.details-section {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ancestry-section:hover {
  border-color: rgba(240, 198, 116, 0.4);
  box-shadow: 0 0 15px rgba(240, 198, 116, 0.1);
}

.culture-section:hover {
  border-color: rgba(186, 104, 200, 0.4);
  box-shadow: 0 0 15px rgba(186, 104, 200, 0.1);
}

.career-section:hover {
  border-color: rgba(255, 183, 77, 0.4);
  box-shadow: 0 0 15px rgba(255, 183, 77, 0.1);
}

.skills-section:hover {
  border-color: rgba(77, 232, 178, 0.4);
  box-shadow: 0 0 15px rgba(77, 232, 178, 0.1);
}

.kit-section:hover {
  border-color: rgba(144, 202, 249, 0.4);
  box-shadow: 0 0 15px rgba(144, 202, 249, 0.1);
}

.circle-section:hover {
  border-color: rgba(206, 147, 216, 0.4);
  box-shadow: 0 0 15px rgba(206, 147, 216, 0.1);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 900px) {
  .character-details-view {
    grid-template-columns: 1fr;
  }

  .skills-languages-grid {
    grid-template-columns: 1fr;
  }

  /* Culture: 3 columns → 1 column */
  .culture-details {
    grid-template-columns: 1fr;
  }

  /* Kit stats: 4 columns → 2 columns */
  .kit-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  :root {
    --ds-chevron-width: 20px;
    --ds-chevron-depth: 8px;
  }

  .details-section h2 {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    padding-bottom: calc(0.5rem + var(--ds-chevron-depth));
  }

  .ancestry-stats {
    flex-direction: column;
    gap: 0.4rem;
  }

  .career-details {
    flex-direction: column;
  }

  /* Culture: Reduce padding on mobile */
  .culture-aspect {
    padding: 0.5rem;
  }

  .culture-aspect h4 {
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }

  .culture-aspect p {
    font-size: 0.75rem;
  }

  /* Kit: Reduce padding on mobile */
  .kit-stat {
    padding: 0.4rem 0.2rem;
  }

  .kit-stat strong {
    font-size: 0.55rem;
  }

  .kit-stat .stat-value {
    font-size: 0.8rem;
  }

  /* Equipment: Stack vertically on small screens */
  .equipment-block {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}

/* ============================================
   PRINT STYLES
   ============================================ */

@media print {
  .details-section {
    box-shadow: none !important;
    border: 1px solid #333;
  }

  .details-section h2::after {
    display: none;
  }

  .details-section h2::before {
    display: none;
  }

  .details-section h2 {
    padding-bottom: 0.6rem;
    border-bottom: 1px solid #333;
  }

  .details-section:hover {
    border-color: #333;
    box-shadow: none;
  }
}



================================================
FILE: src/components/character/CharacterDetailsView.tsx
================================================
import React from 'react';
import { useSummonerContext } from '../../context/HeroContext';
import { languages as allLanguages } from '../../data/reference-data';
import { formations } from '../../data/formations';
import { Formation, HeroClass } from '../../types';
import { isSummonerHero, SummonerHeroV2 } from '../../types/hero';
import { classDefinitions } from '../../data/classes/class-definitions';
import './CharacterDetailsView.css';

const CharacterDetailsView: React.FC = () => {
  const { hero, updateHero } = useSummonerContext();

  if (!hero) return null;

  // Get hero class and check if Summoner
  const heroClass: HeroClass = hero.heroClass || 'summoner';
  const isSummoner = isSummonerHero(hero);
  const classDef = classDefinitions[heroClass];

  // Get Summoner-specific data if applicable
  const summonerHero = isSummoner ? (hero as SummonerHeroV2) : null;

  // Handle formation change (Summoner only)
  const handleFormationChange = (newFormation: Formation) => {
    if (!summonerHero || newFormation === summonerHero.formation) return;

    // Get the quick command associated with this formation
    const formationData = formations[newFormation];
    const quickCommand = formationData.quickCommands.find(
      cmd => cmd.formation === newFormation
    ) || formationData.quickCommands[0];

    updateHero({
      formation: newFormation,
      quickCommand: quickCommand,
    });
  };

  // Handle both old and new data structures for ancestry
  const ancestryName = hero.ancestry?.name || 'Unknown';
  const ancestryDescription = hero.ancestry?.description || '';
  const ancestrySize = hero.ancestry?.size || '1M';
  const ancestrySpeed = hero.ancestry?.speed || 5;
  const ancestryPoints = hero.ancestry?.ancestryPoints || 0;
  const signatureFeature = hero.ancestry?.signatureFeature;
  const purchasedTraits = hero.ancestry?.purchasedTraits || [];

  // Handle both old and new data structures for culture
  const cultureName = hero.culture?.name || 'Unknown';
  const cultureDescription = hero.culture?.description || '';
  const cultureEnvironment = hero.culture?.environment;
  const cultureOrganization = hero.culture?.organization;
  const cultureUpbringing = hero.culture?.upbringing;

  // Handle both old and new data structures for career
  const careerName = hero.career?.name || 'Unknown';
  const careerDescription = hero.career?.description || '';
  const careerPerkType = hero.career?.perkType || 'exploration';
  const careerRenown = hero.career?.renown || 0;
  const careerWealth = hero.career?.wealth || 0;
  const careerProjectPoints = hero.career?.projectPoints || 0;
  const careerIncitingIncident = hero.career?.incitingIncident || '';

  // Collect all skills from culture and career
  const cultureSkills = [
    ...(cultureEnvironment?.skills || []),
    ...(cultureUpbringing?.skills || []),
  ];
  const careerSkills = hero.career?.skills || [];
  const allSkills = [...new Set([...cultureSkills, ...careerSkills])];

  // Get language names from hero's language IDs
  const getLanguageName = (langId: string): string => {
    const lang = allLanguages.find(l => l.id === langId);
    return lang?.name || langId;
  };

  // Use hero.languages if available, otherwise fall back to old logic for compatibility
  const heroLanguageIds = hero.languages || ['caelian'];
  const uniqueLanguages = heroLanguageIds.map(getLanguageName);

  // Culture aspect descriptions from Draw Steel rules
  const environmentDescriptions: Record<string, string> = {
    nomadic: 'A community that travels, never settling in one place for long.',
    rural: 'A community in farmland, villages, or countryside settlements.',
    secluded: 'A hidden or isolated community, away from the wider world.',
    urban: 'A community in a city or large town with bustling activity.',
    wilderness: 'A community in untamed lands, forests, or harsh terrain.',
  };

  const organizationDescriptions: Record<string, string> = {
    bureaucratic: 'A community led by officials, laws, and formal hierarchies.',
    communal: 'A community where decisions are made collectively by members.',
  };

  const upbringingDescriptions: Record<string, string> = {
    academic: 'Raised among scholars, books, and formal education.',
    creative: 'Raised among artists, musicians, and craftspeople.',
    labor: 'Raised doing physical work—farming, smithing, or building.',
    lawless: 'Raised outside the law, learning to survive by any means.',
    martial: 'Raised among warriors, soldiers, or guards.',
    noble: 'Raised in privilege with etiquette and social connections.',
  };

  const getEnvironmentDesc = (name: string): string => {
    return environmentDescriptions[name.toLowerCase()] || '';
  };

  const getOrganizationDesc = (name: string): string => {
    return organizationDescriptions[name.toLowerCase()] || '';
  };

  const getUpbringingDesc = (name: string): string => {
    return upbringingDescriptions[name.toLowerCase()] || '';
  };

  return (
    <div className="character-details-view">
      {/* Ancestry Section */}
      <section className="details-section ancestry-section">
        <h2>Ancestry: {ancestryName}</h2>
        {ancestryDescription && <p className="description">{ancestryDescription}</p>}

        <div className="ancestry-stats">
          <span className="stat">Size: {ancestrySize}</span>
          <span className="stat">Base Speed: {ancestrySpeed}</span>
          <span className="stat">Ancestry Points: {ancestryPoints}</span>
        </div>

        {signatureFeature && (
          <div className="feature-block signature">
            <h4>Signature Feature</h4>
            <div className="feature">
              <strong>{signatureFeature.name}</strong>
              <p>{signatureFeature.description}</p>
            </div>
          </div>
        )}

        {purchasedTraits.length > 0 && (
          <div className="feature-block purchased">
            <h4>Available Purchased Traits</h4>
            <div className="traits-list">
              {purchasedTraits.map((trait) => (
                <div key={trait.id} className="trait">
                  <strong>{trait.name}</strong>
                  {trait.cost && <span className="cost">({trait.cost} pts)</span>}
                  <p>{trait.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Culture Section */}
      <section className="details-section culture-section">
        <h2>Culture: {cultureName}</h2>
        {cultureDescription && <p className="description">{cultureDescription}</p>}

        <div className="culture-details">
          {cultureEnvironment && (
            <div className="culture-aspect">
              <h4>Environment: {cultureEnvironment.name}</h4>
              <p className="aspect-description">{getEnvironmentDesc(cultureEnvironment.name)}</p>
              {cultureEnvironment.skills && cultureEnvironment.skills.length > 0 && (
                <p className="aspect-skills">Skills: {cultureEnvironment.skills.join(', ')}</p>
              )}
            </div>
          )}

          {cultureOrganization && (
            <div className="culture-aspect">
              <h4>Organization: {cultureOrganization.name}</h4>
              <p className="aspect-description">{getOrganizationDesc(cultureOrganization.name)}</p>
            </div>
          )}

          {cultureUpbringing && (
            <div className="culture-aspect">
              <h4>Upbringing: {cultureUpbringing.name}</h4>
              <p className="aspect-description">{getUpbringingDesc(cultureUpbringing.name)}</p>
              {cultureUpbringing.skills && cultureUpbringing.skills.length > 0 && (
                <p className="aspect-skills">Skills: {cultureUpbringing.skills.join(', ')}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Career Section */}
      <section className="details-section career-section">
        <h2>Career: {careerName}</h2>
        {careerDescription && <p className="description">{careerDescription}</p>}

        <div className="career-details">
          {careerSkills.length > 0 && (
            <div className="career-stat">
              <strong>Skills:</strong> {careerSkills.join(', ')}
            </div>
          )}
          <div className="career-stat">
            <strong>Perk Type:</strong> {careerPerkType.charAt(0).toUpperCase() + careerPerkType.slice(1)}
          </div>
          {careerRenown > 0 && (
            <div className="career-stat">
              <strong>Renown:</strong> +{careerRenown}
            </div>
          )}
          {careerWealth > 0 && (
            <div className="career-stat">
              <strong>Wealth:</strong> +{careerWealth}
            </div>
          )}
          {careerProjectPoints > 0 && (
            <div className="career-stat">
              <strong>Project Points:</strong> {careerProjectPoints}
            </div>
          )}
        </div>

        {careerIncitingIncident && (
          <div className="inciting-incident">
            <h4>Inciting Incident</h4>
            <p><em>"{careerIncitingIncident}"</em></p>
          </div>
        )}
      </section>

      {/* Skills & Languages Section */}
      <section className="details-section skills-section">
        <h2>Skills & Languages</h2>

        <div className="skills-languages-grid">
          <div className="skills-block">
            <h4>Skills</h4>
            <ul className="skills-list">
              {allSkills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="languages-block">
            <h4>Languages</h4>
            <ul className="languages-list">
              {uniqueLanguages.map((lang, idx) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Kit Section */}
      <section className="details-section kit-section">
        <h2>Kit: {hero.kit.name}</h2>

        <div className="kit-stats">
          <div className="kit-stat">
            <strong>Stamina</strong>
            <span className="stat-value">+{hero.kit.stamina}</span>
          </div>
          <div className="kit-stat">
            <strong>Speed</strong>
            <span className="stat-value">{hero.kit.speed}</span>
          </div>
          <div className="kit-stat">
            <strong>Stability</strong>
            <span className="stat-value">{hero.kit.stability}</span>
          </div>
          <div className="kit-stat">
            <strong>Armor</strong>
            <span className="stat-value">{hero.kit.armor || 'None'}</span>
          </div>
        </div>

        <div className="kit-equipment">
          {hero.kit.weapons && hero.kit.weapons.length > 0 && (
            <div className="equipment-block">
              <h4>Weapons:</h4>
              <p>{hero.kit.weapons.join(', ')}</p>
            </div>
          )}
          {hero.kit.implements && hero.kit.implements.length > 0 && (
            <div className="equipment-block">
              <h4>Implements:</h4>
              <p>{hero.kit.implements.join(', ')}</p>
            </div>
          )}
          {hero.kit.items && hero.kit.items.length > 0 && (
            <div className="equipment-block">
              <h4>Starting Items:</h4>
              <p>{hero.kit.items.join(', ')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Summoner Circle Section - Only for Summoners */}
      {isSummoner && summonerHero && (
        <section className="details-section circle-section">
          <h2>Circle: {summonerHero.subclass ? summonerHero.subclass.charAt(0).toUpperCase() + summonerHero.subclass.slice(1) : 'Unknown'}</h2>

          <div className="circle-info">
            <div className="circle-stat">
              <strong>Portfolio:</strong> {summonerHero.portfolio.type.charAt(0).toUpperCase() + summonerHero.portfolio.type.slice(1)}
            </div>
            <div className="circle-stat">
              <strong>Signature Minions:</strong> {summonerHero.portfolio.signatureMinions.map((m: { name: string }) => m.name).join(', ')}
            </div>
            <div className="circle-stat">
              <strong>Fixture:</strong> {summonerHero.portfolio.fixture?.name || 'Not yet unlocked'}
            </div>
          </div>

          {/* Formation Selector */}
          <div className="formation-selector">
            <h4>Formation</h4>
            <div className="formation-options">
              {(Object.keys(formations) as Formation[]).map((formationKey) => {
                const formationData = formations[formationKey];
                const isSelected = summonerHero.formation === formationKey;
                return (
                  <button
                    key={formationKey}
                    className={`formation-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleFormationChange(formationKey)}
                  >
                    <span className="formation-name">{formationData.name}</span>
                    <span className="formation-desc">{formationData.description}</span>
                    <ul className="formation-benefits">
                      {formationData.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Command for selected formation */}
          <div className="formation-info">
            <h4>Quick Command: {summonerHero.quickCommand.name}</h4>
            <div className="quick-command-detail">
              <p>{summonerHero.quickCommand.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Class Section - For non-Summoners */}
      {!isSummoner && (
        <section className="details-section class-section">
          <h2>Class: {classDef?.name || 'Unknown'}</h2>
          <p className="description">{classDef?.description || ''}</p>

          <div className="class-info">
            <div className="class-stat">
              <strong>Role:</strong> {classDef?.role || 'Unknown'}
            </div>
            <div className="class-stat">
              <strong>Heroic Resource:</strong> {classDef?.heroicResource?.name || 'Unknown'}
            </div>
            <div className="class-stat">
              <strong>Potency:</strong> {classDef?.potencyCharacteristic ?
                classDef.potencyCharacteristic.charAt(0).toUpperCase() + classDef.potencyCharacteristic.slice(1) :
                'Unknown'}
            </div>
          </div>

          <div className="class-feature-note">
            <p className="coming-soon">
              Class-specific features for {classDef?.name || 'this class'} are coming soon.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default CharacterDetailsView;



================================================
FILE: src/components/character/CharacterManager.css
================================================
/* ============================================
   CHARACTER MANAGER - shadcn Dialog Enhancement
   ============================================ */

/* Dialog-specific overrides */
.character-manager-dialog {
  /* Additional dialog customizations if needed */
}

/* Action buttons row */
.manager-actions-new {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .manager-actions-new {
    flex-direction: column;
  }
}

/* Character list scroll area */
.character-list-scroll {
  padding-right: 0.5rem;
}

/* Empty state */
.no-characters-new {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

/* Character card styles */
.character-card-new {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-darkest, #0a1212);
  border: 1px solid var(--border-dark, #2a3a3a);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.character-card-new:hover {
  border-color: var(--accent-dim, #3d8b7a);
  background: var(--bg-dark, #101818);
}

.character-card-new.active {
  border-color: var(--accent-primary, #4de8b2);
  background: rgba(77, 232, 178, 0.08);
  box-shadow: 0 0 15px rgba(77, 232, 178, 0.15);
}

.character-card-info {
  flex: 1;
  min-width: 0;
}

.character-card-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* Active badge */
.active-badge-new {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--accent-dim, #3d8b7a);
  color: var(--accent-bright, #00ff9f);
  border-radius: 3px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .character-card-new {
    flex-direction: column;
    align-items: stretch;
  }

  .character-card-actions {
    justify-content: flex-end;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-dark, #2a3a3a);
    margin-top: 0.75rem;
  }
}

/* ============================================
   DEPRECATED STYLES (migrated to shadcn Dialog)
   Kept for reference, can be removed later
   ============================================

.character-manager-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.character-manager {
  background: #2a2a2a;
  border: 2px solid #4fc3f7;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #3a3a3a;
}

.manager-header h2 {
  margin: 0;
  color: #4fc3f7;
  font-size: 1.8rem;
}

.close-manager {
  background: none;
  border: none;
  color: #888;
  font-size: 2rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-manager:hover {
  background: #3a3a3a;
  color: #4fc3f7;
}

.manager-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 2px solid #3a3a3a;
}

.create-new-btn,
.import-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.create-new-btn {
  background: #4fc3f7;
  color: #1a1a1a;
}

.create-new-btn:hover {
  background: #29b6f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 195, 247, 0.4);
}

.import-btn {
  background: #4caf50;
  color: white;
}

.import-btn:hover {
  background: #388e3c;
  transform: translateY(-2px);
}

.characters-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.no-characters {
  text-align: center;
  padding: 4rem 2rem;
  color: #888;
}

.no-characters p { margin: 0.5rem 0; }
.no-characters .hint { color: #666; font-si