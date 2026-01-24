# Mettle UI Design Prompt

## For Figma / AI Design Tools / Nano Banana Pro

---

## Project Overview

**App Name:** Mettle
**Purpose:** Player companion app for Anvil VTT (a virtual tabletop for Draw Steel TTRPG)
**Design Style:** Utilitarian, information-dense, professional dark mode UI
**Inspiration:** Linear, Slack, Figma, Arc Browser

---

## Design Philosophy

Create a **clean, utilitarian interface** that prioritizes:
- Information density over white space
- Simple lines and boxes, no decorative elements
- Text-first layouts with clear hierarchy
- Master-detail navigation pattern
- Professional aesthetic like productivity software, NOT fantasy/game UI

**Never include:**
- Gradients
- Glow effects
- Decorative borders or ornaments
- Fantasy/medieval styling
- Rounded "pill" buttons
- Heavy shadows

---

## Color Palette

### Backgrounds (darkest to lightest)
| Token | Hex | Usage |
|-------|-----|-------|
| bg-void | `#09090b` | Header, command bar (darkest areas) |
| bg-deep | `#0f0f12` | Main background, master pane |
| bg-surface | `#18181b` | Detail pane, cards, selected items |
| bg-elevated | `#27272a` | Hover states |
| bg-overlay | `#3f3f46` | Dropdowns, modals |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| text-primary | `#fafafa` | Headings, values, important content |
| text-secondary | `#a1a1aa` | Body text, labels |
| text-muted | `#52525b` | Hints, disabled, section headers |

### Accent (Gold/Amber)
| Token | Hex | Usage |
|-------|-----|-------|
| accent | `#f59e0b` | Active states, selected borders, buttons |
| accent-hover | `#fbbf24` | Hover on accent elements |
| accent-muted | `#92400e` | Subtle accent backgrounds |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| border-subtle | `#27272a` | Dividers, panel separators |
| border-default | `#3f3f46` | Input borders |
| border-focus | `#f59e0b` | Focus rings |

### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| success | `#22c55e` | Positive outcomes |
| warning | `#f59e0b` | Attention (same as accent) |
| danger | `#ef4444` | Errors, damage, combat |
| info | `#3b82f6` | Informational |

---

## Typography

### Font Families
- **Display:** Cinzel (serif) - Hero names, page titles only
- **Body:** Source Sans 3 (sans-serif) - Everything else
- **Mono:** JetBrains Mono - Stats, numbers, values

### Type Scale
| Size | Pixels | Usage |
|------|--------|-------|
| xs | 12px | Section headers, badges |
| sm | 14px | Labels, stat ribbon |
| base | 16px | Body text, list items |
| lg | 20px | Subheadings |
| xl | 24px | Hero name |
| 2xl | 32px | Not used in main UI |

---

## Layout Structure

### Viewport: 1440 x 900px (desktop)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TITLE HEADER (48px height, bg-void)                                      │
│ [M] Valeria the Bold                              [Combat] [⋮]          │
├─────────────────────────────────────────────────────────────────────────┤
│ STAT RIBBON (32px height, bg-deep)                                       │
│ MGT +2 │ AGI +1 │ REA +3 │ INT +2 │ PRS +0 │ SPD 5 │ STM 28/42 │ REC 6 │ Focus 12 │
├────────┬─────────────────────────┬──────────────────────────────────────┤
│        │                         │                                       │
│ CMD    │     MASTER PANE         │         DETAIL PANE                   │
│ BAR    │     (280px, bg-deep)    │         (flex, bg-surface)           │
│        │                         │                                       │
│ (72px) │  ▸ Ancestry: Human      │  ┌─────────────────────────────────┐ │
│        │    Culture: Cosmopolitan│  │ Human                           │ │
│ [👤]   │    Career: Soldier      │  │ ─────────────────────────────── │ │
│ Char   │    Class: Tactician     │  │ Ancestry                        │ │
│ ────── │    Subclass: Vanguard   │  │                                 │ │
│ [⚔️]   │    Kit: Shining Armor   │  │ TRAITS                          │ │
│ Acts   │    ...                  │  │ • Size: Medium (1M)             │ │
│ ────── │                         │  │ • Speed: 5                      │ │
│ [📋]   │                         │  │ • Languages: Common + 1         │ │
│ Proj   │                         │  │                                 │ │
│ ────── │                         │  │ ANCESTRY FEATURES               │ │
│ [🎒]   │                         │  │ Adaptable                       │ │
│ Inv    │                         │  │ You gain one additional skill...│ │
│        │                         │  │                                 │ │
│        │                         │  └─────────────────────────────────┘ │
└────────┴─────────────────────────┴──────────────────────────────────────┘
```

---

## Component Specifications

### 1. Title Header

**Dimensions:** Full width × 48px
**Background:** bg-void (`#09090b`)
**Border:** 1px solid border-subtle on bottom

**Contents:**
- **Left side:**
  - Logo mark "M" in accent color, 24px
  - Hero name in Cinzel font, 24px, text-primary
- **Right side:**
  - Combat toggle button (ghost style, sword icon)
  - Overflow menu button (ghost style, vertical dots icon)

---

### 2. Stat Ribbon

**Dimensions:** Full width × 32px
**Background:** bg-deep (`#0f0f12`)
**Border:** 1px solid border-subtle on bottom
**Font:** JetBrains Mono, 14px

**Layout:** Horizontal flex, items separated by 1px vertical borders

**Items (left to right):**
1. `MGT +2` (label muted, value primary)
2. `AGI +1`
3. `REA +3`
4. `INT +2`
5. `PRS +0`
6. `SPD 5`
7. `STM 28/42` (show in danger color if stamina < 25%)
8. `REC 6`
9. `⚡ 12` (heroic resource with icon, class-specific name)

**Padding:** 0 12px per item

---

### 3. Command Bar

**Dimensions:** 72px × remaining height
**Background:** bg-void (`#09090b`)
**Border:** 1px solid border-subtle on right

**Items (vertical stack):**

Each item:
- Icon: 20px, centered
- Label: 10px, uppercase, tracking 0.05em, centered below icon
- Padding: 12px vertical, 8px horizontal
- Border-left: 2px (transparent default, accent when active)

| Icon | Label | Section |
|------|-------|---------|
| 👤 (User icon) | CHAR | Character details |
| ⚔️ (Swords icon) | ACTS | Actions/abilities |
| 📋 (Clipboard icon) | PROJ | Projects |
| 🎒 (Backpack icon) | INV | Inventory |

**States:**
- Default: text-muted, transparent background
- Hover: text-secondary, bg-surface background
- Active: accent color, bg-surface, 2px accent left border

---

### 4. Master Pane

**Dimensions:** 280px × remaining height
**Background:** bg-deep (`#0f0f12`)
**Border:** 1px solid border-subtle on right
**Overflow:** Scroll Y, hide scrollbar unless hovering

**Section Headers:**
- Font: 12px, 600 weight, uppercase
- Letter-spacing: 0.1em
- Color: text-muted
- Padding: 8px 12px
- Border-bottom: 1px solid border-subtle
- Sticky to top of scroll area

**List Items:**
- Padding: 8px 12px
- Font: 16px, Source Sans 3
- Border-left: 2px (transparent default, accent when selected)

**Item States:**
- Default: text-secondary
- Hover: text-primary, bg-surface
- Selected: text-primary, bg-surface, accent left border

**Item Variants:**
- Simple: Just label (e.g., "Ancestry")
- With value: Label + value on right (e.g., "Ancestry" ... "Human")
- With badge: Label + count badge (e.g., "Perks" [4])
- With progress: Label + progress indicator (e.g., "Research" 3/5)

---

### 5. Detail Pane

**Dimensions:** Remaining width × remaining height
**Background:** bg-surface (`#18181b`)
**Padding:** 16px
**Overflow:** Scroll Y

**Content Structure:**

```
Title (Cinzel, 24px, text-primary)
Subtitle (12px, uppercase, text-muted)
──────────────────────────────────────

SECTION HEADER (12px, uppercase, text-muted, mb-8)
Content here (16px, text-secondary, line-height 1.5)

SECTION HEADER
• Bullet item
• Bullet item

SECTION HEADER
Feature Name (16px, 600 weight, text-primary)
Description text (16px, text-secondary)
```

---

## Screen States to Generate

### Screen 1: Character - Ancestry Selected
- Command bar: Character active
- Master list: Character items (Ancestry, Culture, Career, Class, Subclass, Kit, etc.)
- Selected: Ancestry row with "Human" value
- Detail: Full ancestry description with traits and features

### Screen 2: Actions - Ability Selected
- Command bar: Actions active
- Master list: Grouped by action type (Main Actions, Maneuvers, Triggered, Free)
- Selected: "Power Strike" under Main Actions
- Detail: Full action card with cost, keywords, power roll tiers, effect text, and Roll button

### Screen 3: Projects - Active Project
- Command bar: Projects active
- Master list: Active projects (with progress) and Completed projects
- Selected: "Research Ancient Texts" showing 3/5 progress
- Detail: Project description, progress bar, skill/difficulty, roll history, Roll button

### Screen 4: Inventory - Equipped Item
- Command bar: Inventory active
- Master list: Equipped items, Carried items (with quantities), Currency
- Selected: "Longsword" under Equipped
- Detail: Item stats, description, Unequip button

### Screen 5: Combat Mode
- Same as any screen above, but with:
- Title header: Combat button shows "End Combat" in red
- Stat ribbon: Additional items for Turn # and Surges
- Subtle red accent on header border bottom
- Stamina/Recoveries values highlighted if low

---

## Visual Examples

### Master List Item (Default)
```
┌────────────────────────────────────┐
│ ▢ Ancestry                   Human │  ← text-secondary
└────────────────────────────────────┘
```

### Master List Item (Hover)
```
┌────────────────────────────────────┐
│ ▢ Ancestry                   Human │  ← text-primary, bg-surface
└────────────────────────────────────┘
```

### Master List Item (Selected)
```
┌────────────────────────────────────┐
│▌▢ Ancestry                   Human │  ← accent border, text-primary, bg-surface
└────────────────────────────────────┘
```

### Command Bar Item (Active)
```
┌──────┐
│▌ 👤  │  ← accent border, accent color
│ CHAR │
└──────┘
```

### Stat Ribbon Item
```
│ MGT +2 │  ← label in text-muted, value in text-primary, mono font
```

---

## Action Card Detail Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Power Strike                                                │
│ ───────────────────────────────────────────────────────────│
│ Main Action                                    Cost: 1 Focus│
│                                                             │
│ [Attack] [Melee] [Weapon]        ← keyword badges           │
│                                                             │
│ Distance: Reach 1                                           │
│ Target: 1 creature                                          │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ POWER ROLL                                   MGT or AGI ││
│ │ ─────────────────────────────────────────────────────── ││
│ │ 11 or lower     │ 5 damage                              ││
│ │ 12–16           │ 9 damage                              ││
│ │ 17 or higher    │ 12 damage; push 1                     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Effect: You strike with extra force, pushing your enemy    │
│ back on a strong hit.                                       │
│                                                             │
│                                         [ Roll Attack ]     │
└─────────────────────────────────────────────────────────────┘
```

---

## Interaction Notes

1. **Transitions:** All state changes use 150ms ease-out
2. **Focus rings:** 3px solid accent with 3px offset
3. **No animations:** No pulse, glow, shimmer, or continuous motion
4. **Scrollbars:** Thin, only visible on hover, same as bg-elevated
5. **Tooltips:** Simple dark bg-overlay, white text, 8px padding
6. **Selections:** Always show left border accent, never outline

---

## File Deliverables

Please generate:
1. **Desktop view (1440×900)** - All 5 screen states
2. **Component library** - Isolated components with all states
3. **Tablet view (1024×768)** - Command bar icons only, no labels
4. **Color palette swatch** - All tokens with hex values

---

## Quality Checklist

Before finalizing, verify:
- [ ] No gradients anywhere
- [ ] No glow or shadow effects (except focus rings)
- [ ] No rounded "pill" shapes
- [ ] No decorative elements
- [ ] Consistent 4px/8px spacing grid
- [ ] JetBrains Mono for all numbers/stats
- [ ] Cinzel only for hero name/titles
- [ ] All interactive elements have hover/active/selected states
- [ ] Dark mode only (no light theme)
