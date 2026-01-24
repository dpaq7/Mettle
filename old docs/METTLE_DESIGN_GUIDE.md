# Mettle Design Guide
## Visual Language for the Anvil VTT Companion App

**Version 1.0 | December 2025**

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Shape Language](#5-shape-language)
6. [Components](#6-components)
7. [Animation & Motion](#7-animation--motion)
8. [Shadows & Depth](#8-shadows--depth)
9. [Implementation Reference](#9-implementation-reference)
10. [Migration Checklist](#10-migration-checklist)

---

## 1. Design Philosophy

### The Core Principle: Professional Creative Tool

Mettle is a **player's companion app** for Anvil VTT. Just as Anvil feels like a film director's console, Mettle should feel like the actor's **script and character book**—professional, focused, and atmospheric.

### What Mettle Is

- A **professional tool** for managing your hero during play
- A **dark, atmospheric interface** where your character is the star
- **Minimal and focused**—every element earns its place
- **Companion to Anvil**—visually unified with the VTT

### What Mettle Is NOT

- A fantasy RPG game interface (no ornate decorations)
- A spreadsheet (no dense data tables)
- A mobile game (no flashy animations or gamification)
- Separate from Anvil (should feel like the same ecosystem)

### Design Inspirations

**Draw From:**
- Linear (minimal task interface)
- Things 3 (clean, focused productivity)
- Figma (professional creative tool)
- Arc Browser (modern, dark, command palette)
- DaVinci Resolve (professional media tools)

**Never Draw From:**
- D&D Beyond (too playful/fantasy themed)
- Fantasy Grounds (too dense)
- Roll20 (too dated)
- Mobile games (too gamified)

### The Atmosphere Rule

> Empty space is design. Content breathes. Less is more.

Every added element is a tax on attention. The hero's stats, abilities, and choices are the "show"—the UI is the theater darkness around them.

---

## 2. Color System

### Philosophy: Color Means Something

Colors are not decoration. They signal:
- **Interactivity** (accent colors)
- **Status** (success, danger, warning)
- **Scene type** (when integrated with Anvil)
- **Hierarchy** (text levels)

If something is colored, it must communicate meaning.

### Base Palette (Dark Mode Only)

Mettle is a dark-mode-only application. No light theme.

```css
/* Background Colors - Layer by elevation */
--bg-void:      #09090b;    /* Absolute black, behind everything */
--bg-deep:      #0f0f12;    /* Main application background */
--bg-surface:   #18181b;    /* Cards, panels, content containers */
--bg-elevated:  #27272a;    /* Hover states, raised elements */
--bg-overlay:   #3f3f46;    /* Dropdowns, modals, command palette */

/* Text Colors - Three levels only */
--text-primary:   #fafafa;  /* Main content, headings, values */
--text-secondary: #a1a1aa;  /* Supporting text, labels */
--text-muted:     #52525b;  /* Disabled, hints, timestamps */

/* Border Colors */
--border-subtle:  #27272a;  /* Dividers, card edges */
--border-default: #3f3f46;  /* Interactive element borders */
--border-focus:   #f59e0b;  /* Focus rings (accent color) */
```

### Accent Color: Gold/Amber

The primary accent color connects Mettle to Anvil and Draw Steel's energy.

```css
/* Primary Accent */
--accent:         #f59e0b;  /* Primary interactive, buttons, links */
--accent-hover:   #fbbf24;  /* Hover state, lighter */
--accent-muted:   #92400e;  /* Subtle accent, badges, backgrounds */
```

### Status Colors

Used sparingly for semantic meaning only.

```css
/* Status Indicators */
--status-success:   #22c55e;  /* Confirmations, positive outcomes */
--status-warning:   #f59e0b;  /* Attention needed (same as accent) */
--status-danger:    #ef4444;  /* Errors, destructive actions, damage */
--status-info:      #3b82f6;  /* Informational, essence/power */
```

### Scene Integration Colors (Anvil Sync)

When connected to Anvil, Mettle can reflect the current scene type through subtle atmospheric tinting.

```css
/* Scene Type Colors - Apply as subtle background tint */
--scene-story:         #eab308;  /* Yellow/Gold - Narrative scenes */
--scene-battle:        #dc2626;  /* Red - Combat encounters */
--scene-montage:       #16a34a;  /* Green - Montage tests */
--scene-negotiation:   #7c3aed;  /* Purple - Social encounters */
--scene-respite:       #ea580c;  /* Orange - Rest/recovery */

/* Applied as very subtle overlay */
--mode-tint: rgba(var(--scene-color-rgb), 0.03);
```

### Action Type Colors

Mettle's action card system uses semantic colors for action types:

```css
/* Action Card Types */
--action-main:        #3b82f6;  /* Blue - Main actions */
--action-maneuver:    #22c55e;  /* Green - Maneuvers */
--action-triggered:   #f97316;  /* Orange - Triggered actions */
--action-free:        #ec4899;  /* Pink - Free triggered */
--action-heroic:      #a855f7;  /* Purple - Class abilities */
--action-signature:   #06b6d4;  /* Cyan - Signature abilities */
--action-villain:     #ef4444;  /* Red - Villain actions */
--action-utility:     #6b7280;  /* Gray - Utility actions */
```

### What to Remove

The current Mettle color system includes elements that conflict with Anvil's philosophy:

- ❌ Multiple theme variants per class (consolidate to one unified theme)
- ❌ Strong glow effects (replace with subtle focus indicators)
- ❌ Gradient backgrounds (use flat colors)
- ❌ Blue-tinted backgrounds (shift to neutral dark)
- ❌ Heavy shadow effects (minimize to essential only)

---

## 3. Typography

### Font Stack

```css
/* Display Font - Headings, titles, hero names */
--font-display: 'Cinzel', 'Times New Roman', Georgia, serif;

/* Body Font - Everything else */
--font-body: 'Source Sans 3', system-ui, -apple-system, sans-serif;

/* Monospace - Stats, numbers, technical text */
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### Type Scale

Pick only from these sizes. Maximum 3 sizes per view.

```css
--text-xs:    0.75rem;   /* 12px - Timestamps, badges, footnotes */
--text-sm:    0.875rem;  /* 14px - Secondary text, labels */
--text-base:  1rem;      /* 16px - Body text, default */
--text-lg:    1.25rem;   /* 20px - Emphasis, subheadings */
--text-xl:    1.5rem;    /* 24px - Section headings */
--text-2xl:   2rem;      /* 32px - Hero name, page titles */
```

### Typographic Rules

1. **Cinzel for display only** - Hero names, section titles. Never body text.
2. **Maximum 3 sizes per view** - Creates clear hierarchy without noise.
3. **Never bold + italic together** - Pick one or the other.
4. **Line height**: 1.5 for body, 1.2 for headings.
5. **Font weights**: 400 (regular), 500 (medium), 600 (semibold).

### Hierarchy Example

```
Hero Name:     Cinzel, 2rem, 600 weight, --text-primary
Section Head:  Source Sans 3, 1.25rem, 600 weight, --text-primary
Body Text:     Source Sans 3, 1rem, 400 weight, --text-secondary
Labels:        Source Sans 3, 0.875rem, 500 weight, --text-muted
Stat Values:   JetBrains Mono, 1rem, 600 weight, --text-primary
```

---

## 4. Spacing & Layout

### The 4px Grid (Information-Dense)

Mettle uses a tighter 4px grid for information density while maintaining readability.

```css
--space-1:   0.25rem;   /*  4px - Default tight spacing */
--space-2:   0.5rem;    /*  8px - Standard gap */
--space-3:   0.75rem;   /* 12px - Comfortable spacing */
--space-4:   1rem;      /* 16px - Section padding */
--space-6:   1.5rem;    /* 24px - Major sections */
--space-8:   2rem;      /* 32px - Page-level spacing */
```

### Layout Philosophy: Utilitarian Density

Unlike the original "breathe" philosophy, Mettle prioritizes **information density** with **clean lines and boxes**. The goal is maximum utility with minimum visual overhead.

**Principles:**

1. **Reduce padding, not content** - Tight spacing, more visible data
2. **Simple rectangles** - No decorative shapes, just clean boxes
3. **Vertical lists over grids** - Scannable, text-first layouts
4. **Master-detail pattern** - Click to drill down, not expand in place
5. **Read-only where possible** - Display data cleanly, edit in focused dialogs

### Mettle Layout Architecture (New)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ TITLE HEADER                                                              │
│ [Logo] Hero Name                            [Combat Toggle] [Menu ▾]     │
├──────────────────────────────────────────────────────────────────────────┤
│ STAT RIBBON (read-only, compact)                                          │
│ MGT +2 │ AGI +1 │ REA +3 │ INT +2 │ PRS +0 │ SPD 5 │ STM 28/42 │ REC 6 │ ⚡12 │
├────────┬─────────────────────────────────────────────────────────────────┤
│        │                                                                  │
│ CMD    │  MASTER LIST              │  DETAIL PANE                        │
│ BAR    │                           │                                      │
│        │  ┌─────────────────────┐  │  ┌────────────────────────────────┐ │
│ ┌────┐ │  │ ▸ Ancestry          │  │  │                                │ │
│ │ 👤 │ │  │ ▸ Culture           │  │  │  Selected Item Details         │ │
│ │Char│ │  │ ▸ Career            │  │  │                                │ │
│ ├────┤ │  │ ▸ Class             │  │  │  Full description, stats,      │ │
│ │ ⚔️ │ │  │ ▸ Subclass          │  │  │  rules text, and any           │ │
│ │Acts│ │  │ ▸ Kit               │  │  │  interactive elements          │ │
│ ├────┤ │  │ ▸ Complications     │  │  │                                │ │
│ │ 📋 │ │  │ ▸ Titles            │  │  │                                │ │
│ │Proj│ │  │ ▸ Languages         │  │  │                                │ │
│ ├────┤ │  │ ▸ Perks             │  │  │                                │ │
│ │ 🎒 │ │  └─────────────────────┘  │  └────────────────────────────────┘ │
│ │Inv │ │                           │                                      │
│ └────┘ │  (scrollable)             │  (scrollable)                        │
│        │                           │                                      │
└────────┴───────────────────────────┴──────────────────────────────────────┘
```

### Component Breakdown

#### 1. Title Header

Minimal header with essential controls only.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [M] Valeria the Bold                        [⚔️ Combat] [⋮]              │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Left**: App logo/icon + Hero name (Cinzel, --text-xl)
- **Right**: Combat mode toggle + overflow menu (character management)
- **Height**: 48px fixed
- **Background**: --bg-void

#### 2. Stat Ribbon (Read-Only)

A compact, single-line display of all critical stats. No interactivity—just glanceable information.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ MGT +2 │ AGI +1 │ REA +3 │ INT +2 │ PRS +0 │ SPD 5 │ STM 28/42 │ REC 6 │ ⚡12 │
└──────────────────────────────────────────────────────────────────────────┘
```

**Contents (left to right):**
1. **Characteristics**: MGT, AGI, REA, INT, PRS (with +/- modifier)
2. **Speed**: Movement speed value
3. **Stamina**: Current/Max (with visual indicator if low)
4. **Recoveries**: Current count
5. **Heroic Resource**: Class-specific (Piety, Focus, Victory, etc.)

**Styling:**
```css
.stat-ribbon {
  display: flex;
  align-items: center;
  gap: 0;
  height: 32px;
  background: var(--bg-deep);
  border-bottom: 1px solid var(--border-subtle);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.stat-ribbon-item {
  padding: 0 var(--space-3);
  border-right: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  white-space: nowrap;
}

.stat-ribbon-item:last-child {
  border-right: none;
}

.stat-ribbon-value {
  color: var(--text-primary);
  font-weight: 600;
}

.stat-ribbon-item.warning {
  color: var(--status-danger);
}
```

#### 3. Command Bar (Left Sidebar)

Slack-style vertical navigation. Always visible, never collapses.

```
┌────────┐
│   👤   │  ← Character (active)
│  Char  │
├────────┤
│   ⚔️   │  ← Actions
│  Acts  │
├────────┤
│   📋   │  ← Projects
│  Proj  │
├────────┤
│   🎒   │  ← Inventory
│  Inv   │
└────────┘
```

**Menu Items:**

| Icon | Label | Content |
|------|-------|---------|
| 👤 | Character | Ancestry, Culture, Career, Class, Kit, etc. |
| ⚔️ | Actions | All abilities grouped by type |
| 📋 | Projects | Active and completed projects |
| 🎒 | Inventory | Equipment, items, currency |

**Styling:**
```css
.command-bar {
  width: 72px;
  min-width: 72px;
  background: var(--bg-void);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  padding: var(--space-2) 0;
}

.command-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-2);
  color: var(--text-muted);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-left: 2px solid transparent;
  transition: all 150ms ease;
}

.command-bar-item:hover {
  color: var(--text-secondary);
  background: var(--bg-surface);
}

.command-bar-item.active {
  color: var(--accent);
  border-left-color: var(--accent);
  background: var(--bg-surface);
}

.command-bar-icon {
  font-size: 1.25rem;
}
```

#### 4. Master-Detail Content Area

The main content area is split into two panes: a master list on the left and a detail pane on the right.

**Split Ratio:** 280px fixed master list, remainder for detail pane

```css
.content-area {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.master-pane {
  width: 280px;
  min-width: 280px;
  background: var(--bg-deep);
  border-right: 1px solid var(--border-subtle);
  overflow-y: auto;
}

.detail-pane {
  flex: 1;
  background: var(--bg-surface);
  overflow-y: auto;
  padding: var(--space-4);
}
```

#### 5. Master List Items

Simple, text-first list items. No cards, no decorations.

```css
.master-list {
  display: flex;
  flex-direction: column;
}

.master-list-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  color: var(--text-secondary);
  font-size: var(--text-base);
  cursor: pointer;
  border-left: 2px solid transparent;
  transition: all 150ms ease;
}

.master-list-item:hover {
  background: var(--bg-surface);
  color: var(--text-primary);
}

.master-list-item.selected {
  background: var(--bg-surface);
  color: var(--text-primary);
  border-left-color: var(--accent);
}

.master-list-item-icon {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.master-list-section {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
}
```

### Content by Command Bar Section

#### Character Section

**Master List Items:**
- Ancestry (e.g., "Human")
- Culture (e.g., "Cosmopolitan")
- Career (e.g., "Soldier")
- Class (e.g., "Tactician")
- Subclass (e.g., "Vanguard")
- Kit (e.g., "Shining Armor")
- Inciting Incident
- Complications (count badge if multiple)
- Titles (count badge if multiple)
- Languages (list)
- Perks (list with level indicators)

**Detail Pane:** Full description of selected item, including all rules text, traits, bonuses, and flavor text.

#### Actions Section

**Master List Items (grouped):**
```
── Main Actions ──────────
  Melee Attack
  Ranged Attack
  [Class abilities...]

── Maneuvers ─────────────
  Defend
  Hide
  [etc...]

── Triggered Actions ─────
  [List...]

── Free Actions ──────────
  [List...]
```

**Detail Pane:** Full action card with cost, range, damage, effects, and any roll buttons.

#### Projects Section

**Master List Items:**
```
── Active ────────────────
  Research Ancient Texts (3/5)
  Build Reputation (1/3)

── Completed ─────────────
  Find the Lost Temple ✓
```

**Detail Pane:** Project details, progress tracking, roll history.

#### Inventory Section

**Master List Items:**
```
── Equipped ──────────────
  Longsword
  Chain Mail
  Shield

── Carried ───────────────
  Healing Potion (3)
  Rope (50ft)

── Currency ──────────────
  Gold: 150
```

**Detail Pane:** Item details, stats, actions, quantity controls.

### Responsive Behavior

**Desktop (> 1024px):** Full three-column layout
**Tablet (768px - 1024px):** Command bar collapses to icons only, master-detail remains
**Mobile (< 768px):** Single pane with back navigation

```css
@media (max-width: 1024px) {
  .command-bar {
    width: 56px;
    min-width: 56px;
  }

  .command-bar-item span {
    display: none;
  }
}

@media (max-width: 768px) {
  .command-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
    flex-direction: row;
    justify-content: space-around;
    border-right: none;
    border-top: 1px solid var(--border-subtle);
  }

  .master-pane {
    width: 100%;
  }

  .detail-pane {
    position: absolute;
    inset: 0;
    transform: translateX(100%);
    transition: transform 200ms ease;
  }

  .detail-pane.visible {
    transform: translateX(0);
  }
}
```

---

## 5. Shape Language

### The Chamfer: Anvil's Visual Signature

The bottom-right chamfer is Anvil's distinctive shape language, borrowed from Draw Steel. Mettle uses this to feel unified with the VTT.

```css
/* Chamfered elements use clip-path */
.chamfered {
  clip-path: polygon(
    0 0,                           /* top-left */
    100% 0,                        /* top-right */
    100% calc(100% - 12px),        /* above chamfer */
    calc(100% - 12px) 100%,        /* chamfer corner */
    0 100%                         /* bottom-left */
  );
}

/* Chamfer sizes */
--chamfer-sm:  8px;   /* Small elements */
--chamfer-md:  12px;  /* Default */
--chamfer-lg:  16px;  /* Large panels */
```

### When to Use Chamfer

- ✅ Primary action buttons
- ✅ Cards and panels
- ✅ Section containers
- ✅ Dialog/modal frames

### When NOT to Use Chamfer

- ❌ Every single element (overuse dilutes impact)
- ❌ Small inline elements
- ❌ Text inputs
- ❌ Circular avatars

### Border Radius (Non-Chamfered Elements)

```css
--radius-sm:    4px;     /* Small elements, badges */
--radius-md:    8px;     /* Buttons, inputs, cards */
--radius-lg:    12px;    /* Panels, dialogs */
--radius-full:  9999px;  /* Pills, avatars */
```

### Shape Rules

- Never fully rounded buttons (save pills for badges)
- Never sharp 0px corners on interactive elements
- Never border radius > 12px on cards

### What to Remove from Current Mettle

- ❌ Pentagon stat boxes (replace with simpler rectangles)
- ❌ Diamond checkboxes (use standard checkboxes)
- ❌ Shield clip-paths (too fantasy-themed)
- ❌ Hexagon buttons (simplify to chamfer or rectangle)

---

## 6. Components

### Buttons

**Variants:**

| Variant | Use Case | Style |
|---------|----------|-------|
| Primary | Main actions | Filled, --accent background |
| Secondary | Alternative actions | Ghost/outlined |
| Tertiary | Minor actions | Text only |
| Danger | Destructive actions | --status-danger background |

**Sizes:**

| Size | Height | Padding | Font |
|------|--------|---------|------|
| Small | 32px | 12px 16px | --text-sm |
| Medium | 40px | 12px 20px | --text-base |
| Large | 48px | 16px 24px | --text-lg |

**States:** Default, Hover, Active, Disabled, Loading

**Implementation:**
```css
.btn-primary {
  background: var(--accent);
  color: var(--bg-void);
  border: none;
  height: 40px;
  padding: 0 var(--space-4);
  font-size: var(--text-base);
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: background 150ms ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-primary.chamfered {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
  border-radius: 0;
}
```

### Cards

**Base Card:**
```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.card:hover {
  background: var(--bg-elevated);
}

.card.selected {
  border-color: var(--accent);
}
```

**Card Variants:**
- Default: Simple content container
- Interactive: Hover states, clickable
- Selected: Accent border highlight

### Input Fields

```css
.input {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  height: 40px;
  padding: 0 var(--space-3);
  font-size: var(--text-base);
}

.input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  outline: none;
}

.input::placeholder {
  color: var(--text-muted);
}
```

### Stat Displays

Simple, readable stat presentation:

```css
.stat-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}
```

### Progress/Tracker Bars

```css
.tracker-bar {
  height: 8px;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.tracker-bar-fill {
  height: 100%;
  background: var(--accent);
  transition: width 200ms ease;
}

.tracker-bar.compact {
  height: 4px;
}
```

### Action Cards

```css
.action-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-left: 3px solid var(--action-type-color);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.action-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.action-card-title {
  font-weight: 600;
  color: var(--text-primary);
}

.action-card-cost {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--space-2);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.badge.accent {
  background: var(--accent-muted);
  color: var(--accent);
}

.badge.danger {
  background: rgba(239, 68, 68, 0.2);
  color: var(--status-danger);
}
```

---

## 7. Animation & Motion

### Philosophy: Motion Is Meaning

Animation should indicate state change, not provide decoration. If unsure whether to animate something, don't.

### Timing

```css
--duration-fast:   150ms;  /* Micro-interactions */
--duration-normal: 200ms;  /* State changes */
--duration-slow:   300ms;  /* Panel transitions */

--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
```

### Rules

1. **Never bounce** - No elastic or spring animations
2. **Never overshoot** - Clean, professional movement
3. **Consistent timing** - Same duration for same interaction types
4. **Subtle** - Animation should be felt, not watched

### Common Patterns

```css
/* Hover state */
.interactive {
  transition: background var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}

/* Panel open/close */
.panel {
  transition: opacity var(--duration-normal) var(--ease-out),
              transform var(--duration-normal) var(--ease-out);
}

/* Value changes */
.stat-value {
  transition: color var(--duration-fast) var(--ease-out);
}
```

### What to Remove

- ❌ Pulse/glow animations (remove combat-pulse, success-pulse)
- ❌ Shimmer effects (use opacity transitions instead)
- ❌ Elaborate keyframe animations
- ❌ Text glow effects

---

## 8. Shadows & Depth

### Philosophy: Minimal Shadows

Elevation is shown through color shifts, not shadows. Use shadows sparingly.

### Elevation via Color (Preferred)

```
--bg-deep      ← Base level
--bg-surface   ← Cards, panels (no shadow needed)
--bg-elevated  ← Hover states
--bg-overlay   ← Modals, dropdowns
```

### Shadow Usage (When Necessary)

```css
--shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md:   0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg:   0 8px 24px rgba(0, 0, 0, 0.5);

/* Focus ring only */
--shadow-focus: 0 0 0 3px rgba(245, 158, 11, 0.3);
```

### When to Use Shadows

- ✅ Focus rings (--shadow-focus)
- ✅ Floating elements (dropdowns, tooltips)
- ✅ Modals (--shadow-lg)

### What to Remove

- ❌ Glow effects (--shadow-glow, --text-glow, --inner-glow)
- ❌ Multiple layered shadows
- ❌ Colored shadows
- ❌ Shadow on every card

---

## 9. Implementation Reference

### New Component Architecture

The layout refactor introduces these new components:

```
src/components/
├── layout/
│   ├── AppShell.tsx              # Main layout container
│   ├── TitleHeader.tsx           # Hero name + controls
│   ├── StatRibbon.tsx            # Read-only stat display
│   ├── CommandBar.tsx            # Left navigation
│   ├── ContentArea.tsx           # Master-detail container
│   ├── MasterPane.tsx            # Left list pane
│   └── DetailPane.tsx            # Right detail pane
├── sections/
│   ├── character/
│   │   ├── CharacterMasterList.tsx
│   │   ├── AncestryDetail.tsx
│   │   ├── CultureDetail.tsx
│   │   ├── CareerDetail.tsx
│   │   ├── ClassDetail.tsx
│   │   ├── SubclassDetail.tsx
│   │   ├── KitDetail.tsx
│   │   ├── ComplicationsDetail.tsx
│   │   ├── TitlesDetail.tsx
│   │   ├── LanguagesDetail.tsx
│   │   └── PerksDetail.tsx
│   ├── actions/
│   │   ├── ActionsMasterList.tsx
│   │   └── ActionDetail.tsx
│   ├── projects/
│   │   ├── ProjectsMasterList.tsx
│   │   └── ProjectDetail.tsx
│   └── inventory/
│       ├── InventoryMasterList.tsx
│       └── ItemDetail.tsx
└── ui/
    ├── MasterListItem.tsx
    ├── MasterListSection.tsx
    └── [existing shadcn components]
```

### File Structure for Changes

**Primary files to modify:**

| File | Purpose | Priority |
|------|---------|----------|
| `/src/App.tsx` | Replace tab layout with AppShell | P0 |
| `/src/App.css` | Remove old layout, add new structure | P0 |
| `/src/styles/theme.css` | Design tokens, CSS variables | P0 |
| `/src/styles/shadcn-theme.css` | Component theming | P1 |
| `/src/styles/ui-components.css` | Utility classes | P1 |
| `/tailwind.config.js` | Tailwind mappings | P1 |
| `/src/data/themes.ts` | Remove class themes | P2 |
| `/src/data/class-tabs.ts` | Remove (no longer needed) | P2 |

**Components to Remove:**

| Component | Reason |
|-----------|--------|
| `StatsDashboard/` | Replaced by TitleHeader + StatRibbon |
| `StatChip.tsx` | No longer used |
| `StatChipsRow.tsx` | Replaced by StatRibbon |
| `PinnedCardsGrid.tsx` | No pinning in new design |
| `cards/*.tsx` | Individual stat cards removed |
| `PentagonStatBox.tsx` | Decorative shape removed |

**Components to Refactor:**

| Component | Change |
|-----------|--------|
| `CharacterDetailsView.tsx` | Split into master list + detail components |
| `AbilitiesView.tsx` | Split into ActionsMasterList + ActionDetail |
| `ProjectsView.tsx` | Split into ProjectsMasterList + ProjectDetail |
| `InventoryView.tsx` | Split into InventoryMasterList + ItemDetail |

### CSS Variable Migration Map

**Current → New:**

| Current Variable | New Variable | Notes |
|------------------|--------------|-------|
| `--bg-darkest` | `--bg-void` | Darker, neutral |
| `--bg-dark` | `--bg-deep` | Main background |
| `--bg-medium` | `--bg-surface` | Cards |
| `--bg-light` | `--bg-elevated` | Hover states |
| `--bg-card` | `--bg-surface` | Consolidate |
| `--accent-bright` | `--accent` | Simplify |
| `--accent-glow` | Remove | No glow effects |
| `--accent-soft` | Remove | Simplify |
| `--accent-dim` | `--accent-muted` | For backgrounds |
| `--text-bone` | Remove | Use --text-secondary |
| `--border-glow` | Remove | No glow |
| `--shadow-glow*` | Remove | No glow effects |

### State Management Changes

**Navigation State:**
```typescript
type CommandBarSection = 'character' | 'actions' | 'projects' | 'inventory';

interface NavigationState {
  activeSection: CommandBarSection;
  selectedItem: string | null;  // ID of selected master list item
}
```

**URL Routing (optional):**
```
/character              → Character section, no selection
/character/ancestry     → Character section, Ancestry selected
/actions                → Actions section
/actions/power-strike   → Actions section, Power Strike selected
/projects               → Projects section
/inventory              → Inventory section
```

### Theme Simplification

**Current:** 11 class-specific themes with unique colors
**New:** Single unified theme with accent color customization only

```typescript
// New simplified theme structure
interface Theme {
  id: string;
  name: string;
  accentColor: string;      // User's preferred accent
  accentColorMuted: string;
}

// Class identity shown through icons/labels, not color schemes
```

---

## 10. Implementation Plan

### Phase 1: Foundation (Design Tokens & Layout Shell)

**Goal:** Establish new color system and empty layout structure

**Tasks:**
- [ ] Update `/src/styles/theme.css` with new color palette
- [ ] Remove glow variables from theme
- [ ] Create `AppShell.tsx` with basic flex structure
- [ ] Create `TitleHeader.tsx` (empty, placeholder content)
- [ ] Create `StatRibbon.tsx` (empty, placeholder content)
- [ ] Create `CommandBar.tsx` with 4 navigation items
- [ ] Create `ContentArea.tsx` with master/detail split
- [ ] Create `MasterPane.tsx` and `DetailPane.tsx` shells
- [ ] Update `App.tsx` to use new AppShell instead of tabs

**Deliverable:** App renders new layout with placeholder content

### Phase 2: Stat Ribbon

**Goal:** Implement read-only stat ribbon with live data

**Tasks:**
- [ ] Connect StatRibbon to hero context
- [ ] Display all 5 characteristics with modifiers
- [ ] Display Speed value
- [ ] Display Stamina current/max with warning state
- [ ] Display Recoveries count
- [ ] Display Heroic Resource (class-specific name + value)
- [ ] Style according to spec (32px height, monospace, separators)
- [ ] Add combat mode indicator (subtle border color change)

**Deliverable:** Stat ribbon shows live hero data

### Phase 3: Command Bar & Navigation

**Goal:** Working navigation between sections

**Tasks:**
- [ ] Implement navigation state management
- [ ] Wire up CommandBar click handlers
- [ ] Add active state styling
- [ ] Implement section switching in ContentArea
- [ ] Add keyboard navigation (1-4 shortcuts)
- [ ] Persist last active section to localStorage

**Deliverable:** Can navigate between all 4 sections

### Phase 4: Character Section

**Goal:** Complete Character master-detail view

**Tasks:**
- [ ] Create `CharacterMasterList.tsx` with all items
- [ ] Create detail components for each character element:
  - [ ] AncestryDetail (traits, abilities, lore)
  - [ ] CultureDetail (languages, skills, lore)
  - [ ] CareerDetail (skills, title, lore)
  - [ ] ClassDetail (features, progression summary)
  - [ ] SubclassDetail (specialization details)
  - [ ] KitDetail (equipment, bonuses, signature ability)
  - [ ] ComplicationsDetail (list with descriptions)
  - [ ] TitlesDetail (earned titles with effects)
  - [ ] LanguagesDetail (list of known languages)
  - [ ] PerksDetail (list grouped by level)
- [ ] Wire up master list selection
- [ ] Style master list items
- [ ] Style detail pane content

**Deliverable:** Full Character section working

### Phase 5: Actions Section

**Goal:** Complete Actions master-detail view

**Tasks:**
- [ ] Create `ActionsMasterList.tsx` with grouped sections
- [ ] Implement section headers (Main, Maneuver, Triggered, Free, etc.)
- [ ] Create `ActionDetail.tsx` with full ability card
- [ ] Include roll buttons in detail view
- [ ] Add action cost/range/damage display
- [ ] Handle kit abilities, class abilities, and base abilities
- [ ] Add search/filter capability in master list

**Deliverable:** Full Actions section working

### Phase 6: Projects Section

**Goal:** Complete Projects master-detail view

**Tasks:**
- [ ] Create `ProjectsMasterList.tsx` with Active/Completed groups
- [ ] Create `ProjectDetail.tsx` with progress tracking
- [ ] Add progress modification controls in detail view
- [ ] Show roll history for project
- [ ] Handle project completion flow

**Deliverable:** Full Projects section working

### Phase 7: Inventory Section

**Goal:** Complete Inventory master-detail view

**Tasks:**
- [ ] Create `InventoryMasterList.tsx` with Equipped/Carried/Currency groups
- [ ] Create `ItemDetail.tsx` with item stats and actions
- [ ] Add quantity controls in detail view
- [ ] Add equip/unequip actions
- [ ] Handle currency display and modification
- [ ] Add item notes/descriptions

**Deliverable:** Full Inventory section working

### Phase 8: Title Header & Controls

**Goal:** Implement header with all controls

**Tasks:**
- [ ] Add hero name display (Cinzel font)
- [ ] Add combat mode toggle button
- [ ] Create overflow menu with:
  - [ ] Character management (switch, create, import)
  - [ ] Export character
  - [ ] Respec character
  - [ ] Respite action
  - [ ] Level up (when available)
  - [ ] About/Settings
- [ ] Add combat mode visual indicator
- [ ] Wire up all menu actions

**Deliverable:** Full header functionality

### Phase 9: Polish & Cleanup

**Goal:** Remove old components and polish interactions

**Tasks:**
- [ ] Remove old StatsDashboard components
- [ ] Remove old tab system
- [ ] Remove class-tabs.ts
- [ ] Remove unused CSS
- [ ] Remove unused theme variants
- [ ] Add loading states
- [ ] Add empty states for each section
- [ ] Test responsive breakpoints
- [ ] Add keyboard shortcuts
- [ ] Performance optimization (virtualization if needed)

**Deliverable:** Clean, polished app

### Phase 10: Combat Mode Integration

**Goal:** Handle combat-specific UI changes

**Tasks:**
- [ ] Add turn tracker in header or ribbon
- [ ] Highlight combat-relevant stats in ribbon
- [ ] Filter/sort actions by combat relevance
- [ ] Add surge tracking display
- [ ] Combat start/end transitions
- [ ] Respite flow integration

**Deliverable:** Full combat mode support

---

## 11. Migration Checklist

### Pre-Migration Checklist

- [ ] Create feature branch for layout refactor
- [ ] Document current component prop interfaces
- [ ] Identify all data flows from hero context
- [ ] List all localStorage keys in use
- [ ] Screenshot current UI for reference

### Quality Checklist (Every Element)

Before shipping any visual change:

- [ ] Uses only colors from the system
- [ ] Uses only type sizes from the scale
- [ ] Spacing aligns to 4px grid
- [ ] Has all states designed (hover, active, disabled, focus)
- [ ] Doesn't add visual noise
- [ ] Would feel at home in Linear, Things 3, or Figma
- [ ] Connects visually to Anvil VTT
- [ ] Works on 1024px+ screens
- [ ] Works on 768px screens (tablet)
- [ ] Works on mobile (if applicable)

### Post-Migration Checklist

- [ ] All hero data displays correctly
- [ ] All interactive features work (level up, respite, combat)
- [ ] Data persists correctly to localStorage
- [ ] No console errors
- [ ] Performance is acceptable (no jank)
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader tested

---

## Appendix: Anti-Patterns

### Never Do These

**Visual Noise:**
- Gradients on backgrounds
- Shadows on every element
- Borders AND shadows AND colors together
- More than 3 colors in a view

**Fantasy Aesthetics:**
- Metallic/leather textures
- Elaborate decorative borders
- Parchment backgrounds
- Glow effects everywhere
- Shield, diamond, pentagon shapes

**Complexity:**
- Toolbars with many icons
- Nested tabs
- Settings panels
- Dense data tables

**Animation Excess:**
- Bouncing
- Elastic/spring effects
- Continuous animations
- Attention-grabbing pulses

---

## Summary: Key Principles

1. **Dark Mode Only** - No light theme, ever
2. **Color Means Something** - No arbitrary colors
3. **8px Grid Everything** - Spacing consistency
4. **Maximum 3 Type Sizes Per View** - Clear hierarchy
5. **Chamfer as Signature** - Use strategically, not everywhere
6. **No Glow Effects** - Clean, professional shadows only
7. **Elevation via Color** - Background tiers, not shadows
8. **Motion Is Meaning** - Animate state changes only
9. **Breathe** - More whitespace, less density
10. **Unified with Anvil** - Same visual language as the VTT

---

*This document should be referenced during all visual development work on Mettle to ensure consistency with the Anvil VTT ecosystem.*
