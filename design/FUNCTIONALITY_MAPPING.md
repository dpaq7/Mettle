# Mettle Functionality Mapping

## Bridging New Design Components to Existing Game Logic

This document maps every interactive element in the new Mettle design to the existing codebase functionality, ensuring all game mechanics are preserved during the UI refactor.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Stat Ribbon Mapping](#2-stat-ribbon-mapping)
3. [Character Section Mapping](#3-character-section-mapping)
4. [Actions Section Mapping](#4-actions-section-mapping)
5. [Projects Section Mapping](#5-projects-section-mapping)
6. [Inventory Section Mapping](#6-inventory-section-mapping)
7. [Combat Mode Integration](#7-combat-mode-integration)
8. [Header Controls Mapping](#8-header-controls-mapping)
9. [State Management Integration](#9-state-management-integration)
10. [Implementation Phases](#10-implementation-phases)

---

## 1. Architecture Overview

### Design Component → Source File Mapping

| New Design Component | Source Logic Files |
|---------------------|-------------------|
| `TitleHeader.tsx` | `DashboardHeader.tsx`, `CharacterManager.tsx` |
| `StatRibbon.tsx` | `StatChipsRow.tsx`, `useStaminaStates.ts`, `statCalculator.ts` |
| `CommandBar.tsx` | `class-tabs.ts` (navigation concept) |
| `MasterPane.tsx` | Various view components split into lists |
| `DetailPane.tsx` | Card components, detail renderers |
| `ActionCard.tsx` | `AbilityCard.tsx`, `ActionCard.tsx` |
| `ProjectCard.tsx` | `ProjectsView.tsx`, project state |
| `ItemCard.tsx` | `InventoryView.tsx`, `MagicItemsView.tsx` |

### Context Dependencies

```
┌─────────────────────────────────────────────────────────┐
│                    App.tsx (New)                        │
├─────────────────────────────────────────────────────────┤
│  HeroProvider (existing)                                │
│    └─ CombatProvider (existing)                         │
│         └─ RollHistoryProvider (existing)               │
│              └─ NavigationProvider (NEW)                │
│                   └─ AppShell                           │
│                        ├─ TitleHeader                   │
│                        ├─ StatRibbon                    │
│                        ├─ CommandBar                    │
│                        └─ ContentArea                   │
│                             ├─ MasterPane               │
│                             └─ DetailPane               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Stat Ribbon Mapping

### Display Requirements

The stat ribbon shows read-only values. All values are computed from hero state.

| Ribbon Item | Source | Calculation | File |
|-------------|--------|-------------|------|
| MGT | `hero.characteristics.might` | Direct value, format as `+N` or `-N` | `types/hero.ts:82` |
| AGI | `hero.characteristics.agility` | Direct value | `types/hero.ts:83` |
| REA | `hero.characteristics.reason` | Direct value | `types/hero.ts:84` |
| INT | `hero.characteristics.intuition` | Direct value | `types/hero.ts:85` |
| PRS | `hero.characteristics.presence` | Direct value | `types/hero.ts:86` |
| SPD | Derived | `calculateSpeed(hero)` | `utils/statCalculator.ts` |
| STM | `hero.stamina.current/max` | Show as `current/max` | `types/hero.ts:40-44` |
| REC | `hero.recoveries.current` | Direct value | `types/hero.ts:46-51` |
| Resource | `hero.heroicResource.current` | Class-specific name + value | `types/hero.ts:27-72` |

### Heroic Resource Names by Class

```typescript
const RESOURCE_NAMES: Record<HeroClass, string> = {
  censor: 'Wrath',
  conduit: 'Piety',
  elementalist: 'Essence',
  fury: 'Rage',
  null: 'Discipline',
  shadow: 'Insight',
  summoner: 'Essence',
  tactician: 'Focus',
  talent: 'Clarity',
  troubadour: 'Drama'
};
```

### Combat Mode Additions

When `hero.inCombat === true`:

| Item | Source | Notes |
|------|--------|-------|
| Turn | `combatTurnNumber` | From App.tsx state |
| Surges | `hero.surges` | Direct value |

### Warning States

```typescript
// Stamina warning (< 25% or winded)
const staminaWarning = hero.stamina.current <= hero.stamina.winded;

// Stamina critical (dying)
const staminaCritical = hero.stamina.current <= 0;

// Stamina dead
const staminaDead = hero.stamina.current <= -(Math.floor(hero.stamina.max / 2));
```

### Implementation

```tsx
// StatRibbon.tsx
import { useHero } from '@/context/HeroContext';
import { calculateSpeed } from '@/utils/statCalculator';
import { RESOURCE_NAMES } from '@/constants/classes';

export function StatRibbon() {
  const { hero } = useHero();

  const characteristics = [
    { label: 'MGT', value: hero.characteristics.might },
    { label: 'AGI', value: hero.characteristics.agility },
    { label: 'REA', value: hero.characteristics.reason },
    { label: 'INT', value: hero.characteristics.intuition },
    { label: 'PRS', value: hero.characteristics.presence },
  ];

  const speed = calculateSpeed(hero);
  const resourceName = RESOURCE_NAMES[hero.class];
  const isWinded = hero.stamina.current <= hero.stamina.winded;
  const isDying = hero.stamina.current <= 0;

  // Render ribbon items...
}
```

---

## 3. Character Section Mapping

### Master List Items

| Item | Source Data | Detail Component |
|------|-------------|------------------|
| Ancestry | `hero.ancestry.ancestryId` | `AncestryDetail` |
| Culture | `hero.culture` | `CultureDetail` |
| Career | `hero.career` | `CareerDetail` |
| Class | `hero.class` | `ClassDetail` |
| Subclass | `hero.subclass` | `SubclassDetail` |
| Kit | `hero.kit` | `KitDetail` |
| Inciting Incident | `hero.incitingIncident` | `IncidentDetail` |
| Complications | `hero.complications[]` | `ComplicationsDetail` |
| Titles | `hero.titles[]` | `TitlesDetail` |
| Languages | `hero.languages[]` | `LanguagesDetail` |
| Perks | `hero.perks[]` | `PerksDetail` |

### Ancestry Detail - Interactive Elements

**Source Files:**
- `src/types/ancestry.ts`
- `src/data/ancestries/*.ts`
- `src/components/character/AncestryTraitSelector.tsx`

**Data Structure:**
```typescript
interface AncestryDefinition {
  id: string;
  name: string;
  description: string;
  signatureTraits: AncestrySignatureTrait[];
  purchasedTraits: AncestryPurchasedTrait[];
  ancestryPoints: number;
  size: Size;
  speed: number;
}

interface HeroAncestry {
  ancestryId: string;
  selectedTraitIds: string[];  // Player's chosen traits
  previousAncestryId?: string; // For Revenant
}
```

**Detail Pane Content:**
```
┌─────────────────────────────────────────────────────────┐
│ Human                                                   │
│ ─────────────────────────────────────────────────────── │
│ Ancestry                                                │
│                                                         │
│ TRAITS                                                  │
│ • Size: Medium (1M)                                     │
│ • Speed: 5                                              │
│ • Ancestry Points: 3                                    │
│                                                         │
│ SIGNATURE TRAITS (Always Active)                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Adaptable                                           │ │
│ │ You gain one additional skill from your career.    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ SELECTED TRAITS                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ✓ Determined (1 point)                              │ │
│ │   When you fail a power roll, you can spend a      │ │
│ │   Recovery to reroll. You must use the new result. │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ✓ Versatile (2 points)                              │ │
│ │   You gain +1 to a characteristic of your choice.  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ LORE                                                    │
│ Humans are the most widespread ancestry in the world... │
└─────────────────────────────────────────────────────────┘
```

**Note:** In the new design, ancestry traits are READ-ONLY after character creation. Editing requires the Respec flow.

### Class Detail - Interactive Elements

**Data Sources:**
- `src/data/classes/*.ts`
- `src/types/hero.ts` (class-specific types)
- `src/utils/levelProgression.ts`

**Detail Pane Content:**
```
┌─────────────────────────────────────────────────────────┐
│ Tactician                                               │
│ ─────────────────────────────────────────────────────── │
│ Class                                                   │
│                                                         │
│ RESOURCE: FOCUS                                         │
│ Maximum: 12 (Level 5)                                   │
│ Gain: 2 per turn                                        │
│                                                         │
│ CLASS FEATURES                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Tactical Doctrine (Level 1)                         │ │
│ │ You can spend Focus to grant allies bonuses...     │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Combat Superiority (Level 3)                        │ │
│ │ When you roll a tier 3 result on an attack...      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ SUBCLASS: Vanguard                                      │
│ [See Subclass detail for specifics]                     │
│                                                         │
│ PROGRESSION                                             │
│ Level 1: Tactical Doctrine, 5 Focus max                 │
│ Level 2: +1 Might or Agility                            │
│ Level 3: Combat Superiority                             │
│ ...                                                     │
└─────────────────────────────────────────────────────────┘
```

### Kit Detail - Interactive Elements

**Data Sources:**
- `src/data/kits/*.ts`
- `src/types/kit.ts`

**Detail Pane Content:**
```
┌─────────────────────────────────────────────────────────┐
│ Shining Armor                                           │
│ ─────────────────────────────────────────────────────── │
│ Kit                                                     │
│                                                         │
│ EQUIPMENT                                               │
│ • Heavy Armor                                           │
│ • Shield                                                │
│ • Melee Weapon (any)                                    │
│                                                         │
│ BONUSES                                                 │
│ ┌──────────────┬──────────────┬──────────────┐         │
│ │ Stamina      │ Speed        │ Stability    │         │
│ │ +12          │ +0           │ +2           │         │
│ └──────────────┴──────────────┴──────────────┘         │
│                                                         │
│ SIGNATURE ABILITY                                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Shield Wall                                         │ │
│ │ Triggered Action • 1 Focus                          │ │
│ │ When an ally within 1 is targeted by an attack,    │ │
│ │ you can use your reaction to impose bane on the    │ │
│ │ attack roll.                                        │ │
│ │                                              [Roll] │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ FLAVOR                                                  │
│ Gleaming plate and a stalwart shield mark you as...    │
└─────────────────────────────────────────────────────────┘
```

### Perks Detail - Interactive Elements

**Data Sources:**
- `src/types/perks.ts`
- `src/data/perks.ts`

**Detail Pane Content:**
```
┌─────────────────────────────────────────────────────────┐
│ Perks                                                   │
│ ─────────────────────────────────────────────────────── │
│ 4 Perks Selected                                        │
│                                                         │
│ LEVEL 1                                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Skill Expertise: Intimidation                       │ │
│ │ You have double edge on Intimidation rolls.        │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ LEVEL 3                                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Tough as Nails                                      │ │
│ │ Your recovery value increases by 2.                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ LEVEL 5                                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Quick Reflexes                                      │ │
│ │ You gain +1 Speed.                                  │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Iron Will                                           │ │
│ │ You have edge on saves against fear effects.       │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Actions Section Mapping

### Master List Organization

**Source Files:**
- `src/types/abilities.ts`
- `src/types/action.ts`
- `src/data/abilities/*.ts`
- `src/components/abilities/AbilitiesView.tsx`

**Grouping Logic:**
```typescript
type ActionType =
  | 'action'        // Main Actions
  | 'maneuver'      // Maneuvers
  | 'move'          // Movement Actions
  | 'triggered'     // Triggered Actions
  | 'freeManeuver'  // Free Maneuvers
  | 'freeTriggered' // Free Triggered
  | 'noAction';     // Passive/No Action

const ACTION_SECTIONS = [
  { id: 'action', label: 'Main Actions' },
  { id: 'maneuver', label: 'Maneuvers' },
  { id: 'move', label: 'Movement' },
  { id: 'triggered', label: 'Triggered Actions' },
  { id: 'freeManeuver', label: 'Free Maneuvers' },
  { id: 'freeTriggered', label: 'Free Triggered' },
];
```

**Ability Sources (merged into single list):**
1. Base abilities (universal to all heroes)
2. Class abilities (based on `hero.class` and `hero.level`)
3. Kit signature ability (based on `hero.kit`)
4. Ancestry abilities (if any, based on selected traits)
5. Subclass abilities (based on `hero.subclass`)

### Action Detail - Interactive Elements

**Core Data Structure:**
```typescript
interface Ability {
  id: string;
  name: string;
  actionType: ActionType;
  cost?: AbilityCost;
  powerRoll?: PowerRoll;
  keywords: string[];
  distance: string;
  target: string;
  effect: string;
  additionalEffects?: AdditionalEffect[];
  source: 'base' | 'class' | 'kit' | 'ancestry' | 'subclass';
}

interface PowerRoll {
  characteristic: Characteristic;
  alternativeCharacteristics?: Characteristic[];
  tier1: TierResult;
  tier2: TierResult;
  tier3: TierResult;
}

interface TierResult {
  damage?: string;      // e.g., "5", "2d6 + MGT"
  effect?: string;      // e.g., "push 1", "target is slowed (EoT)"
  healing?: string;     // e.g., "Recovery value"
}
```

**Detail Pane - Full Action Card:**
```
┌─────────────────────────────────────────────────────────┐
│ Power Strike                                            │
│ ─────────────────────────────────────────────────────── │
│ Main Action                                Cost: 1 Focus│
│                                                         │
│ [Attack] [Melee] [Weapon]                               │
│                                                         │
│ Distance: Reach 1                                       │
│ Target: 1 creature                                      │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ POWER ROLL                              MGT or AGI  │ │
│ │ ───────────────────────────────────────────────────│ │
│ │ 11 or lower    │ 5 damage                          │ │
│ │ 12–16          │ 9 damage                          │ │
│ │ 17 or higher   │ 12 damage; push 1                 │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ EFFECT                                                  │
│ You strike with extra force, pushing your enemy back   │
│ on a strong hit.                                        │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Edge/Bane: Normal ▾]              [Roll Attack]   │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Roll Button Integration

**Source Files:**
- `src/utils/dice.ts`
- `src/hooks/useDiceRolling.ts`
- `src/context/RollHistoryContext.tsx`

**Roll Flow:**
```typescript
// When user clicks "Roll Attack"
function handleRollAction(ability: Ability) {
  const characteristic = ability.powerRoll.characteristic;
  const charValue = hero.characteristics[characteristic];

  // Get current edge/bane state from local state or context
  const { edges, banes } = edgeBaneState;

  // Perform roll
  const result = performPowerRoll(charValue, { edges, banes });

  // Add to roll history
  addRollToHistory({
    abilityName: ability.name,
    result,
    timestamp: Date.now(),
  });

  // Display result (could be inline or modal)
  showRollResult(result, ability);
}
```

**Roll Result Display:**
```
┌─────────────────────────────────────────────────────────┐
│ ROLL RESULT                                             │
│ ─────────────────────────────────────────────────────── │
│                                                         │
│        [8] + [6] = 14                                   │
│         Dice       Base                                 │
│                                                         │
│        + 3 (MGT) = 17                                   │
│         Modifier   Total                                │
│                                                         │
│        ┌─────────────────────┐                          │
│        │     TIER 3          │                          │
│        │   12 damage         │                          │
│        │   push 1            │                          │
│        └─────────────────────┘                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Edge/Bane Selector

**States:**
```typescript
type EdgeBaneDisplay =
  | 'Normal'
  | 'Edge (+2)'
  | 'Bane (-2)'
  | 'Double Edge (Tier +1)'
  | 'Double Bane (Tier -1)';
```

**UI Component:**
```tsx
function EdgeBaneSelector({ value, onChange }) {
  const states = ['normal', 'edge', 'bane', 'doubleEdge', 'doubleBane'];
  const currentIndex = states.indexOf(value);

  return (
    <button onClick={() => onChange(states[(currentIndex + 1) % states.length])}>
      Edge/Bane: {getDisplayLabel(value)} ▾
    </button>
  );
}
```

---

## 5. Projects Section Mapping

### Master List Organization

**Source Files:**
- `src/types/projects.ts`
- `src/data/projects.ts`
- `src/components/projects/ProjectsView.tsx`

**Data Structure:**
```typescript
interface ActiveProject {
  id: string;
  templateId: string;
  name: string;
  type: 'research' | 'crafting' | 'other';
  goal: number;
  currentPoints: number;
  status: 'not_started' | 'in_progress' | 'completed';
  notes: string;
  rollHistory: ProjectRoll[];
  createdAt: number;
  completedAt?: number;
}
```

**Sections:**
```typescript
const PROJECT_SECTIONS = [
  { id: 'active', label: 'Active', filter: p => p.status !== 'completed' },
  { id: 'completed', label: 'Completed', filter: p => p.status === 'completed' },
];
```

### Project Detail - Interactive Elements

**Detail Pane:**
```
┌─────────────────────────────────────────────────────────┐
│ Research Ancient Texts                                  │
│ ─────────────────────────────────────────────────────── │
│ Research Project                                        │
│                                                         │
│ PROGRESS                                       3 / 5    │
│ ████████████░░░░░░░░                            60%     │
│                                                         │
│ DESCRIPTION                                             │
│ Delving into the forbidden archives to uncover the     │
│ truth about the Sundering.                              │
│                                                         │
│ ┌──────────────────────┬──────────────────────┐        │
│ │ Skill                │ Difficulty           │        │
│ │ Reason (Lore)        │ 12                   │        │
│ └──────────────────────┴──────────────────────┘        │
│                                                         │
│ ROLL HISTORY                                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Session 4    ✓ Success    14                       │ │
│ │ Session 3    ✗ Failure    8                        │ │
│ │ Session 2    ✓ Success    16                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ NOTES                                                   │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Found a reference to the Obsidian Codex...         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Adjust Points ±]                [Roll Project]    │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Project Roll Mechanics

**Source:** `src/components/projects/ProjectsView.tsx`

**Roll Flow:**
```typescript
function rollProject(project: ActiveProject) {
  // Roll d20
  const baseRoll = rollD20();

  // Apply modifiers (from dialog selection)
  const modifier = calculateProjectModifier({
    hasSkill: selectedModifiers.skill,
    edge: selectedModifiers.edge,
    bane: selectedModifiers.bane,
    languageBarrier: selectedModifiers.languageBarrier,
  });

  const total = baseRoll + modifier;

  // Check for breakthrough (natural 19-20)
  const isBreakthrough = baseRoll >= 19;
  let bonusRollTotal = 0;
  if (isBreakthrough) {
    bonusRollTotal = rollD20() + modifier;
  }

  // Calculate points earned
  const pointsEarned = total >= project.goal ? 1 : 0;
  const bonusPoints = isBreakthrough ? 1 : 0;

  // Update project
  updateProject(project.id, {
    currentPoints: project.currentPoints + pointsEarned + bonusPoints,
    status: project.currentPoints + pointsEarned + bonusPoints >= project.goal
      ? 'completed'
      : 'in_progress',
    rollHistory: [...project.rollHistory, {
      timestamp: Date.now(),
      baseRoll,
      modifier,
      total,
      isBreakthrough,
      bonusRollTotal: isBreakthrough ? bonusRollTotal : undefined,
    }],
  });
}
```

---

## 6. Inventory Section Mapping

### Master List Organization

**Source Files:**
- `src/types/inventory.ts`
- `src/components/inventory/InventoryView.tsx`

**Sections:**
```typescript
const INVENTORY_SECTIONS = [
  { id: 'equipped', label: 'Equipped', filter: i => i.equipped },
  { id: 'carried', label: 'Carried', filter: i => !i.equipped && i.type !== 'currency' },
  { id: 'currency', label: 'Currency', filter: i => i.type === 'currency' },
];
```

### Item Detail - Interactive Elements

**Detail Pane:**
```
┌─────────────────────────────────────────────────────────┐
│ Longsword                                               │
│ ─────────────────────────────────────────────────────── │
│ Weapon (Martial, Heavy)                    [Equipped]   │
│                                                         │
│ ┌──────────────┬──────────────┬──────────────┐         │
│ │ Damage       │ Range        │ Keywords     │         │
│ │ 1d10 + MGT   │ Reach 1      │ Heavy, Vers. │         │
│ └──────────────┴──────────────┴──────────────┘         │
│                                                         │
│ DESCRIPTION                                             │
│ A well-balanced blade suitable for both one and        │
│ two-handed use.                                         │
│                                                         │
│ SPECIAL PROPERTIES                                      │
│ • Versatile: Can be wielded one or two-handed          │
│ • +1 damage when wielded two-handed                    │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                                      [Unequip]     │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Quantity Items

**For stackable items:**
```
┌─────────────────────────────────────────────────────────┐
│ Healing Potion                                          │
│ ─────────────────────────────────────────────────────── │
│ Consumable                              Quantity: 3     │
│                                                         │
│ EFFECT                                                  │
│ Drink to regain stamina equal to your recovery value.  │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [-]                    3                    [+]    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                                         [Use One]  │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Combat Mode Integration

### Combat State Source

**Files:**
- `src/context/CombatContext.tsx`
- `src/types/combat.ts`
- `src/App.tsx` (combat toggle state)

### Combat Mode Activation

```typescript
// In TitleHeader
function toggleCombat() {
  if (hero.inCombat) {
    endCombat();
  } else {
    startCombat();
  }
}

function startCombat() {
  updateHero({ inCombat: true });
  combatContext.startCombat();
  // Initialize turn number, surges, etc.
}

function endCombat() {
  updateHero({
    inCombat: false,
    victories: hero.victories + 1, // If victorious
  });
  combatContext.endCombat();
}
```

### Stat Ribbon Combat Additions

When `hero.inCombat === true`, add to ribbon:

```tsx
// Additional combat items in StatRibbon
{hero.inCombat && (
  <>
    <StatRibbonItem label="Turn" value={combatTurnNumber} />
    <StatRibbonItem
      label="Surges"
      value={hero.surges}
      highlight={hero.surges > 0}
    />
  </>
)}
```

### Combat Visual Indicators

```css
/* Combat mode styling */
.stat-ribbon.combat {
  border-bottom-color: var(--status-danger);
}

.title-header.combat {
  border-bottom-color: var(--status-danger);
}

.combat-toggle.active {
  background: var(--status-danger);
  color: white;
}
```

### Turn Tracking (Class-Specific)

**Summoner Turn Flow:**
```typescript
interface SummonerTurnState {
  phase: 'collectResources' | 'summonMinions' | 'positionUnits' | 'executePlan';
  essenceGainedThisTurn: number;
  signatureMinionsSpawnedThisTurn: boolean;
  minionDeathEssenceGainedThisRound: boolean;
}
```

---

## 8. Header Controls Mapping

### Title Header Elements

| Element | Source Logic | Action |
|---------|--------------|--------|
| Hero Name | `hero.name` | Display only |
| Combat Toggle | `hero.inCombat` | Toggle combat mode |
| Menu Button | N/A | Open dropdown menu |

### Overflow Menu Items

**Source:** Current `DashboardHeader.tsx` dropdown

```typescript
const MENU_ITEMS = [
  { id: 'switch', label: 'Switch Character', action: openCharacterManager },
  { id: 'create', label: 'Create New', action: openCharacterCreation },
  { id: 'import', label: 'Import Character', action: openImportDialog },
  { id: 'divider' },
  { id: 'export', label: 'Export Character', action: exportCharacter },
  { id: 'duplicate', label: 'Duplicate Character', action: duplicateCharacter },
  { id: 'respec', label: 'Respec Character', action: openRespecDialog },
  { id: 'divider' },
  { id: 'respite', label: 'Take Respite', action: openRespiteDialog },
  { id: 'levelup', label: 'Level Up', action: openLevelUpWizard, condition: canLevelUp },
  { id: 'divider' },
  { id: 'about', label: 'About Mettle', action: openAboutModal },
];
```

### Respite Flow

**Source:** `src/components/shared/RespiteModal.tsx`

**Effects:**
1. Reset stamina to max
2. Reset recoveries to max
3. Remove certain conditions
4. Reset heroic resource (class-dependent)
5. Optionally spend recoveries on projects

### Level Up Flow

**Source:** `src/components/character/LevelUpWizard.tsx`

**Trigger:** `hero.victories >= getLevelThreshold(hero.level + 1)`

---

## 9. State Management Integration

### New Navigation State

```typescript
// New context for navigation
interface NavigationState {
  activeSection: 'character' | 'actions' | 'projects' | 'inventory';
  selectedItemId: string | null;
}

const NavigationContext = createContext<{
  state: NavigationState;
  setActiveSection: (section: NavigationState['activeSection']) => void;
  setSelectedItem: (id: string | null) => void;
}>(...);
```

### Existing Contexts to Preserve

| Context | Purpose | File |
|---------|---------|------|
| `HeroContext` | Hero data CRUD | `src/context/HeroContext.tsx` |
| `CombatContext` | Combat state, essence | `src/context/CombatContext.tsx` |
| `RollHistoryContext` | Dice roll history | `src/context/RollHistoryContext.tsx` |

### Data Flow Diagram

```
User Action (click, input)
       ↓
Component Event Handler
       ↓
Context Action (updateHero, spendEssence, etc.)
       ↓
State Update (React state + localStorage)
       ↓
UI Re-render
       ↓
StatRibbon reflects changes
```

---

## 10. Implementation Phases

### Phase 1: Layout Shell + Navigation

**Create:**
- `src/components/layout/AppShell.tsx`
- `src/components/layout/TitleHeader.tsx` (display only)
- `src/components/layout/StatRibbon.tsx` (read-only display)
- `src/components/layout/CommandBar.tsx`
- `src/components/layout/ContentArea.tsx`
- `src/components/layout/MasterPane.tsx`
- `src/components/layout/DetailPane.tsx`
- `src/context/NavigationContext.tsx`

**Wire up:**
- HeroContext → StatRibbon (characteristics, stamina, etc.)
- NavigationContext → CommandBar, ContentArea

### Phase 2: Character Section

**Create:**
- `src/components/sections/character/CharacterMasterList.tsx`
- `src/components/sections/character/AncestryDetail.tsx`
- `src/components/sections/character/ClassDetail.tsx`
- `src/components/sections/character/KitDetail.tsx`
- `src/components/sections/character/PerksDetail.tsx`
- ... (other detail components)

**Wire up:**
- Hero ancestry data → AncestryDetail
- Hero class/subclass data → ClassDetail
- Hero kit data → KitDetail

### Phase 3: Actions Section

**Create:**
- `src/components/sections/actions/ActionsMasterList.tsx`
- `src/components/sections/actions/ActionDetail.tsx`
- `src/components/sections/actions/PowerRollBox.tsx`
- `src/components/sections/actions/EdgeBaneSelector.tsx`

**Wire up:**
- Ability data sources → ActionsMasterList
- Roll mechanics → ActionDetail
- RollHistoryContext → roll result display

### Phase 4: Projects Section

**Create:**
- `src/components/sections/projects/ProjectsMasterList.tsx`
- `src/components/sections/projects/ProjectDetail.tsx`
- `src/components/sections/projects/ProjectRollDialog.tsx`

**Wire up:**
- Hero projects data → ProjectsMasterList
- Project roll mechanics → ProjectDetail

### Phase 5: Inventory Section

**Create:**
- `src/components/sections/inventory/InventoryMasterList.tsx`
- `src/components/sections/inventory/ItemDetail.tsx`

**Wire up:**
- Hero inventory data → InventoryMasterList
- Item actions → ItemDetail

### Phase 6: Combat Mode + Header

**Create:**
- Full `TitleHeader.tsx` with combat toggle
- Combat-specific StatRibbon items
- Overflow menu with all actions

**Wire up:**
- CombatContext → combat toggle
- All menu actions → respective dialogs/flows

### Phase 7: Dialogs + Modals

**Migrate:**
- `CharacterManager.tsx` → New styling
- `LevelUpWizard.tsx` → New styling
- `RespiteModal.tsx` → New styling
- Roll result display → New styling

### Phase 8: Cleanup

**Remove:**
- Old StatsDashboard components
- Old tab navigation
- Unused CSS
- Old theme variants

---

## Appendix: Key Function Mappings

### Stamina Functions

| UI Action | Function | File |
|-----------|----------|------|
| +1 Stamina | `updateHero({ stamina: { current: current + 1 } })` | HeroContext |
| -1 Stamina | `updateHero({ stamina: { current: current - 1 } })` | HeroContext |
| Use Recovery | `catchYourBreath()` | RecoveriesCard |
| Check Winded | `getStaminaState(current, max)` | useStaminaStates |

### Roll Functions

| UI Action | Function | File |
|-----------|----------|------|
| Power Roll | `performPowerRoll(charValue, edgeBane)` | dice.ts |
| Project Roll | `rollD20()` + modifiers | dice.ts |
| Add to History | `addRollToHistory(result)` | RollHistoryContext |

### Combat Functions

| UI Action | Function | File |
|-----------|----------|------|
| Start Combat | `startCombat()` | CombatContext |
| End Turn | `startNewTurn()` | CombatContext |
| End Combat | `endCombat()` | CombatContext |
| Spend Resource | `spendEssence(amount)` | CombatContext |

---

*This mapping document should be used alongside the METTLE_DESIGN_GUIDE.md during implementation to ensure all interactive functionality is preserved.*
