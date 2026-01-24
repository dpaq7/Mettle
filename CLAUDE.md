# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Mettle** is a character creation and management tool for the Draw Steel TTRPG by MCDM Productions. It's a GPL-3.0 licensed desktop application supporting all 10 hero classes with features for character creation, combat tracking, minion management, level-up progression, and theming.

## Build Commands

```bash
npm install                               # Install dependencies
npm run dev                               # Vite dev server (web)
npm run tauri:dev                         # Development with native window
npm run build                             # TypeScript + Vite build
npm run tauri:build:mac                   # macOS universal binary
npm run tauri:build:win                   # Windows MSVC
npm run test                              # Vitest watch mode
npm run test:run                          # Single test run
npm run test:run -- src/path/to/test.ts   # Run specific test file
npm run type-check                        # TypeScript checking
npm run lint                              # ESLint
npm run consolidate-data                  # Regenerate game data (run before build)
```

## Architecture

### Tech Stack
- **React 19** + TypeScript + Vite
- **Tauri 2.x** for native desktop builds
- **Tailwind CSS** + Radix UI + shadcn/ui for styling
- **Motion** (Framer Motion) for animations
- **Vitest** for testing

### Project Structure

```
src/
├── components/           # UI organized by feature
│   ├── abilities/        # Class ability widgets and displays
│   ├── character/        # Character sheet components
│   ├── classDetails/     # Class-specific UI (FuryDetails, NullDetails, etc.)
│   ├── combat/           # Combat tracker components
│   ├── creation/         # Character creation wizard
│   ├── inventory/        # Equipment and portrait management
│   ├── layout/           # AppShell, StatRibbon, CommandBar
│   ├── sections/         # Master/detail pane content
│   ├── shared/           # Reusable components (DiceRoller, ErrorBoundary)
│   └── ui/shadcn/        # shadcn/ui components
├── context/              # React Context providers
│   ├── HeroContext.tsx   # Main character state (polymorphic Hero type)
│   ├── CombatContext.tsx # Combat tracking state
│   ├── RollHistoryContext.tsx
│   └── NavigationContext.tsx
├── data/                 # Static game data & class definitions
│   ├── source/           # Symlinks to authoritative game data
│   │   ├── game-json/    # → Anvil/docs/Draw Steel JSON game data
│   │   └── rules-md/     # → Anvil/docs/data-rules-md
│   ├── generated/        # Auto-generated JSON (monsters, skills, etc.)
│   ├── classes/          # Class definitions and mechanics
│   └── [class]/          # Per-class data (fury/, null/, etc.)
├── hooks/                # Custom hooks
├── lib/                  # Core utilities
│   └── game-rules.ts     # GameData API - single source of truth
├── types/                # TypeScript definitions
│   ├── hero.ts           # Polymorphic Hero type with class-specific variants
│   └── game-data.ts      # Game data types
└── utils/                # Utility functions
```

### Key Architectural Patterns

**Polymorphic Hero Type**: The `Hero` type is a discriminated union of all 10 class-specific hero interfaces. Use type guards like `isFuryHero(hero)` to access class-specific properties.

**GameData API**: All game data access goes through `src/lib/game-rules.ts`. Never import JSON data directly.

**Context Hierarchy**: App wraps providers in order: ThemeProvider → HeroProvider → CombatProvider → RollHistoryProvider → NavigationProvider → SecondaryDetailProvider

**Master/Detail Layout**: The app uses a consistent layout with sections (character, actions, projects, inventory) each providing a MasterList and DetailPane component.

## Game Data (IMPORTANT)

Draw Steel rules data is **authoritative**. Never hardcode game values.

### Source Files

- `src/data/source/game-json/` → Abilities, features, monsters (JSON)
- `src/data/source/rules-md/` → Ancestries, careers, kits, rules (Markdown)
- `src/data/generated/` → Auto-generated from source (run `npm run consolidate-data`)

### GameData API Usage

```typescript
import { GameData } from '@/lib/game-rules';

// ✅ Always use GameData:
const ancestry = GameData.getAncestry('human');
const tier = GameData.getTierForRoll(14);
const abilities = GameData.getAbilitiesByClass('fury');
const isWinded = GameData.isWinded(currentStamina, maxStamina);
const stamina = GameData.getStaminaAtLevel('fury', 5);

// ❌ Never do this:
const tier = total >= 17 ? 3 : total >= 12 ? 2 : 1;  // Hardcoded!
import data from '../data/source/game-json/...';     // Direct import!
```

### Source of Truth Hierarchy

| Data Type | Source | Location |
|-----------|--------|----------|
| Abilities & Features | JSON | `game-json/Heroes/Features/` |
| Monster Statblocks | JSON | `game-json/Monsters/` |
| Ancestries, Careers, Kits | Markdown | `rules-md/` |
| Skills, Conditions | Markdown | `rules-md/` |
| Core Rules (tiers, tests) | Markdown | `rules-md/Chapters/` |

**If JSON and MD conflict, ASK before assuming.**

## Code Standards

**TypeScript**: Strict mode, no `any` (use `unknown`). Prefer type inference.

**React**: Hooks at top level. `handle*` for internal handlers, `on*` for callback props.

**Naming**: PascalCase (components, types), camelCase (functions), SCREAMING_SNAKE (constants), kebab-case (filenames)

**Commits**: Conventional format - `feat:`, `fix:`, `refactor:`, `test:`, `docs:`

## Class Implementation Notes

Each of the 10 classes has specific mechanics tracked in the Hero type:

- **Fury**: `furyState` with `GrowingFerocityState`, form tracking for Stormwight
- **Elementalist**: `persistentAbilities` array, `mantleActive` flag
- **Summoner**: Full minion system (`portfolio`, `activeSquads`, `fixture`, `championState`)
- **Null**: `nullField` state, `inertialShield` tracking, `order` (L10 resource)
- **Talent**: `TalentResource` can go negative (strain mechanic)
- **Conduit**: Selects 2 domains (`domains` array), `prayState`
- **Troubadour**: `activeRoutine`, `scenePartners` for negotiation

Class-specific UI components are in `src/components/classDetails/[Class]Details/`.
