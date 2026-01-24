# Mettle Codebase Validation Prompt

## Purpose
You are tasked with validating the Mettle application codebase against the authoritative Draw Steel Compendium JSON data. The Compendium contains the ground truth rules for the Draw Steel TTRPG system, and Mettle is a character management application that must accurately implement these rules.

---

## Source Data Locations

### Draw Steel Compendium (Ground Truth)
**Location:** `/Users/danpaquin/Desktop/Projects/Draw Steel Compedium`

**Structure:**
```
Draw Steel Compedium/
├── Heroes/
│   ├── Features/           # Class features organized by class/level
│   │   ├── Censor/
│   │   │   ├── 1st-Level Features/
│   │   │   ├── 2nd-Level Features/
│   │   │   └── ... (through 10th-Level)
│   │   ├── Conduit/
│   │   ├── Elementalist/
│   │   ├── Fury/
│   │   ├── Null/
│   │   ├── Shadow/
│   │   ├── Tactician/
│   │   ├── Talent/
│   │   └── Troubadour/
│   └── Abilities/          # Class abilities and common actions
│       ├── Common/         # Shared actions (Defend, Charge, etc.)
│       ├── Censor/
│       ├── Conduit/
│       └── ... (per class)
│       └── Kits/           # 20+ martial kit definitions
└── Monsters/
    ├── Monsters/           # 52+ monster categories with statblocks
    └── Dynamic Terrain/    # Environmental mechanics
```

### Mettle Application
**Location:** `/Users/danpaquin/Desktop/Projects/Mettle`

**Key Data Files:**
```
Mettle/src/
├── types/
│   ├── hero.ts            # Hero type definitions (507 lines)
│   ├── abilities.ts       # Ability/Feature interfaces
│   ├── common.ts          # Shared types (Characteristics, Conditions, etc.)
│   └── minion.ts          # Summoner minion types
├── data/
│   ├── reference-data.ts  # Languages, Ancestries, Cultures, Careers, Kits
│   ├── censor/features.ts
│   ├── conduit/features.ts
│   ├── elementalist/features.ts
│   ├── fury/features.ts
│   ├── null/features.ts
│   ├── shadow/features.ts
│   ├── tactician/features.ts
│   ├── talent/features.ts
│   ├── troubadour/features.ts
│   └── portfolios/        # Summoner minion data
└── lib/storage.ts         # Import/export validation
```

---

## Compendium JSON Schema Reference

### Hero Feature Schema
```json
{
  "type": "feature",
  "feature_type": "trait" | "ability" | "resource",
  "name": "Feature Name",
  "metadata": {
    "action_type": "feature",
    "class": "censor" | "conduit" | "elementalist" | "fury" | "null" | "shadow" | "tactician" | "talent" | "troubadour",
    "level": 1-10,
    "item_id": "kebab-case-id",
    "scc": ["mcdm.heroes.v1:feature.type.class.level:id"],
    "source": "mcdm.heroes.v1"
  },
  "effects": [
    {
      "effect": "Description text",
      "features": [...] // Nested abilities if applicable
    }
  ]
}
```

### Ability Schema (Nested in Features)
```json
{
  "type": "feature",
  "feature_type": "ability",
  "name": "Ability Name",
  "flavor": "Flavor text",
  "keywords": ["Area", "Magic", "Melee", "Ranged", "Strike", "Weapon", "Triggered"],
  "usage": "Main action" | "Maneuver" | "Free maneuver" | "Triggered action",
  "distance": "Melee 1" | "Ranged 10" | "Self" | "X burst" | "X cube within Y",
  "target": "One creature" | "Each enemy in the area" | "Self",
  "effects": [
    {
      "roll": "Power Roll + Characteristic",
      "tier1": "damage/effect at tier 1",
      "tier2": "damage/effect at tier 2",
      "tier3": "damage/effect at tier 3"
    },
    {
      "name": "Effect",
      "effect": "Additional effect text"
    }
  ]
}
```

### Monster Statblock Schema
```json
{
  "type": "statblock",
  "name": "Monster Name",
  "level": 1-10,
  "roles": ["Solo", "Dual", "Squad", "Mob", "Mook"],
  "ancestry": ["Type1", "Type2"],
  "ev": "Encounter Value",
  "stamina": "Hit Points",
  "speed": 5,
  "size": "1T" | "1S" | "1M" | "1L" | "2" | "3" | "4",
  "stability": 0-5,
  "free_strike": 0-10,
  "might": -5 to +5,
  "agility": -5 to +5,
  "reason": -5 to +5,
  "intuition": -5 to +5,
  "presence": -5 to +5,
  "features": [...]
}
```

---

## Validation Categories

### 1. TYPE DEFINITIONS VALIDATION

**Mettle Types to Validate:**

| Type | Location | Validate Against |
|------|----------|------------------|
| `HeroClass` | `types/hero.ts` | All class folders in Compendium |
| `Characteristic` | `types/common.ts` | Statblock characteristics |
| `ConditionId` | `types/common.ts` | Conditions in ability effects |
| `DamageType` | `types/common.ts` | Damage types in power rolls |
| `ActionType` | `types/abilities.ts` | Usage fields in abilities |
| `Size` | `types/common.ts` | Size fields in statblocks |

**Validation Checks:**
- [ ] All 10 hero classes present: `censor`, `conduit`, `elementalist`, `fury`, `null`, `shadow`, `summoner`, `tactician`, `talent`, `troubadour`
- [ ] All 5 characteristics: `might`, `agility`, `reason`, `intuition`, `presence`
- [ ] All conditions match compendium: `bleeding`, `dazed`, `frightened`, `grabbed`, `prone`, `restrained`, `slowed`, `taunted`, `weakened`
- [ ] All damage types: `corruption`, `fire`, `cold`, `lightning`, `sonic`, `acid`, `poison`, `psychic`, `holy`, `radiant`, `untyped`

---

### 2. SUBCLASS VALIDATION

**Per-Class Subclasses:**

| Class | Subclass Type | Valid Values (Compendium) |
|-------|---------------|---------------------------|
| Censor | `CensorOrder` | `exorcist`, `oracle`, `paragon` |
| Conduit | `ConduitDomain` | `creation`, `death`, `fate`, `knowledge`, `life`, `love`, `nature`, `protection`, `storm`, `sun`, `trickery`, `war` |
| Elementalist | `ElementalistElement` | `earth`, `fire`, `green`, `void` |
| Fury | `FuryAspect` | `berserker`, `reaver`, `stormwight` |
| Null | `NullTradition` | `chronokinetic`, `cryokinetic`, `metakinetic` |
| Shadow | `ShadowCollege` | `black-ash`, `caustic-alchemy`, `harlequin-mask` |
| Summoner | `SummonerCircle` | `blight`, `graves`, `spring`, `storms` |
| Tactician | `TacticianDoctrine` | `insurgent`, `mastermind`, `vanguard` |
| Talent | `TalentTradition` | `chronopathy`, `telekinesis`, `telepathy` |
| Troubadour | `TroubadourClass` | `auteur`, `duelist`, `virtuoso` |

**Validation Checks:**
- [ ] All subclass values in Mettle types match Compendium class folder structures
- [ ] Subclass-specific features are correctly associated
- [ ] Domain/element/tradition names are spelled correctly

---

### 3. HEROIC RESOURCE VALIDATION

| Class | Resource | Mettle Type |
|-------|----------|-------------|
| Censor | Wrath | `HeroicResource<'wrath'>` |
| Conduit | Piety | `HeroicResource<'piety'>` |
| Elementalist | Essence | `ElementalistResource` (with `persistent`) |
| Fury | Ferocity | `HeroicResource<'ferocity'>` |
| Null | Discipline | `HeroicResource<'discipline'>` |
| Shadow | Insight | `HeroicResource<'insight'>` |
| Summoner | Essence | `SummonerResource` (with `maxPerTurn`) |
| Tactician | Focus | `HeroicResource<'focus'>` |
| Talent | Clarity | `TalentResource` (with `minimum`) |
| Troubadour | Drama | `HeroicResource<'drama'>` |

**Validation Checks:**
- [ ] Resource names match Draw Steel SRD terminology
- [ ] Special resource mechanics (persistent, maxPerTurn, minimum) correctly implemented
- [ ] Resource gain/spend rules match compendium feature descriptions

---

### 4. FEATURE COMPLETENESS VALIDATION

For each class, verify:
- [ ] Level 1-10 features exist
- [ ] Feature names match Compendium exactly
- [ ] Feature descriptions accurately summarize Compendium effects
- [ ] Feature categories (`passive`, `active`, `resource`, `epic`) are correctly assigned

**Class Feature Comparison Template:**

```
CLASS: [Class Name]
Compendium Path: Draw Steel Compedium/Heroes/Features/[Class]/

Level 1 Features:
  Compendium: [List from 1st-Level Features folder]
  Mettle: [List from src/data/[class]/features.ts]
  Missing: [Any gaps]
  Mismatched: [Any name/description differences]

Level 2 Features:
  ...

[Continue through Level 10]
```

---

### 5. ABILITY VALIDATION

**Ability Fields to Validate:**

| Field | Compendium | Mettle |
|-------|------------|--------|
| Name | `name` | `name` |
| Keywords | `keywords[]` | `keywords[]` |
| Usage | `usage` | `actionType` |
| Distance | `distance` | `distance` |
| Target | `target` | `target` |
| Power Roll | `roll` | `powerRoll.characteristic` |
| Tier Results | `tier1/tier2/tier3` | `powerRoll.tier1/tier2/tier3` |
| Effect | `effect` | `effect` |
| Trigger | `trigger` | `trigger` |

**Validation Checks:**
- [ ] All signature abilities for each class present
- [ ] Keyword arrays match exactly (case-sensitive)
- [ ] Power roll characteristic matches (`Power Roll + Presence` → `presence`)
- [ ] Tier result formatting consistent
- [ ] Distance/target strings match

---

### 6. REFERENCE DATA VALIDATION

#### Languages
**Compendium Source:** Implicit in various class/ancestry features
**Mettle Location:** `src/data/reference-data.ts` - `languages[]`

Validate:
- [ ] All extant languages present
- [ ] All dead languages marked with `isDead: true`
- [ ] Research focus for dead languages accurate
- [ ] Related ancestry/origin information correct

#### Ancestries
**Compendium Source:** (Cross-reference with monster ancestries and hero features)
**Mettle Location:** `src/data/reference-data.ts` - `ancestries[]`

Validate per ancestry:
- [ ] `size` correct (1M, 1L, etc.)
- [ ] `speed` correct (typically 5)
- [ ] `signatureFeature` name and description accurate
- [ ] All `purchasedTraits` present with correct costs (1 or 2)
- [ ] `ancestryPoints` correct (typically 3)

#### Kits
**Compendium Source:** `Heroes/Abilities/Kits/`
**Mettle Location:** `src/data/reference-data.ts` - `kits[]`

Kits to validate (20+):
`Arcane Archer`, `Battlemind`, `Cloak and Dagger`, `Dual Wielder`, `Guisarmier`, `Martial Artist`, `Mountain`, `Panther`, `Pugilist`, `Raider`, `Ranger`, `Rapid Fire`, `Retiarius`, `Shining Armor`, `Sniper`, `Spellsword`, `Stick and Robe`, `Swashbuckler`, `Sword and Board`, `Warrior Priest`, `Whirlwind`

Per kit validate:
- [ ] Stamina bonus
- [ ] Speed modifier
- [ ] Stability modifier
- [ ] Armor type/stats
- [ ] Weapon options
- [ ] Implement type (if applicable)
- [ ] Kit abilities/features

---

### 7. CONDITION EFFECT SYNTAX VALIDATION

Compendium uses specific syntax for conditions in tier results:

**Condition Application Syntax:**
- `P < 2 frightened (save ends)` - Presence less than 2, apply frightened
- `M < 1 dazed (EoT)` - Might less than 1, apply dazed until end of turn
- `A < 3 bleeding (save ends)` - Agility less than 3, apply bleeding

**Characteristic Abbreviations:**
- `M` = Might
- `A` = Agility
- `R` = Reason
- `I` = Intuition
- `P` = Presence

**Condition End Types:**
- `(save ends)` - Requires saving throw
- `(EoT)` - End of Turn
- `(until end of encounter)` - Lasts entire encounter

**Validation Checks:**
- [ ] Mettle correctly parses condition syntax from compendium
- [ ] Characteristic comparisons handled properly
- [ ] End type indicators preserved in effect descriptions

---

### 8. DISTANCE/RANGE VALIDATION

**Valid Distance Formats:**
- `Melee 1`, `Melee 2`, `Melee 3`
- `Ranged 5`, `Ranged 10`, `Ranged 20`
- `Self`
- `X burst` (e.g., `2 burst`, `3 burst`)
- `X cube within Y` (e.g., `2 cube within 1`)
- `Line X` (e.g., `Line 5`)

**Validation Checks:**
- [ ] All distance strings in Mettle match compendium formats
- [ ] No malformed distance specifications
- [ ] Burst/cube/line mechanics correctly interpreted

---

### 9. MONSTER/MINION VALIDATION (Summoner Focus)

**Compendium Source:** `Monsters/Monsters/`
**Mettle Location:** `src/data/portfolios/`

**Summoner Circles to Portfolio Mapping:**
- Blight → Demon
- Graves → Undead
- Spring → Fey
- Storms → Elemental

**Per Minion Type Validate:**
- [ ] Base stats (stamina, speed, size, stability)
- [ ] Characteristics match
- [ ] Traits/abilities present
- [ ] Formation-specific modifiers correct

---

### 10. PROGRESSION MECHANICS VALIDATION

**Level Progression Elements:**

| Level | Validation Points |
|-------|-------------------|
| 1 | Base class features, signature ability, kit selection |
| 2 | Subclass selection, first perk |
| 3 | Class-specific 3rd level feature |
| 4 | Characteristic increase, additional perk, skill |
| 5 | Subclass feature |
| 6 | Additional abilities, perk |
| 7 | Characteristic increase, advanced features, skill |
| 8 | Perk, domain/subclass abilities |
| 9 | Improved class features |
| 10 | Epic features, characteristic increase, perk, skill |

**Validation Checks:**
- [ ] Stamina progression formulas correct
- [ ] Recovery value calculations accurate
- [ ] Characteristic increase limits enforced
- [ ] Perk/skill acquisition matches level

---

## Validation Output Format

For each validation category, produce a report:

```markdown
## [Category Name] Validation Report

### Summary
- Total Items Checked: X
- Passed: Y
- Failed: Z
- Warnings: W

### Failures
| Item | Expected (Compendium) | Actual (Mettle) | Severity |
|------|----------------------|-----------------|----------|
| ... | ... | ... | Critical/Major/Minor |

### Warnings
| Item | Issue | Recommendation |
|------|-------|----------------|
| ... | ... | ... |

### Passed Items
[List or count of successfully validated items]
```

---

## Validation Priority Order

1. **Critical** - Core type definitions and class structures
2. **High** - Feature/ability accuracy for all classes
3. **High** - Subclass definitions and mechanics
4. **Medium** - Reference data (ancestries, kits, languages)
5. **Medium** - Condition and effect syntax
6. **Lower** - Monster/minion data (Summoner-specific)

---

## Common Discrepancy Patterns to Watch For

1. **Naming Inconsistencies**
   - Compendium: `"Halt Miscreant!"` vs Mettle: `"Halt Miscreant"`
   - Apostrophe variations: `God's Library` vs `Gods Library`

2. **Keyword Case Sensitivity**
   - Compendium keywords are capitalized: `["Area", "Magic", "Melee"]`
   - Mettle should match exactly

3. **Characteristic Abbreviations**
   - Compendium uses: `Power Roll + Presence`, `M + 2 damage`
   - Mettle uses: `characteristic: 'presence'`, effect strings

4. **Legacy Subclass Names**
   - Old names that may need migration:
     - Censor: `inquisitor` → `exorcist`, `templar` → `paragon`, `zealot` → `oracle`
     - Shadow: `woven-darkness` → `black-ash`
     - Null: `chronopath` → `chronokinetic`, `cloister` → `cryokinetic`, `manticore` → `metakinetic`
     - Talent: `empath` → `telepathy`, `metamorph` → `chronopathy`, `telekinetic` → `telekinesis`
     - Troubadour: `dancer` → `virtuoso`, `wordsmith` → `auteur`

5. **Missing Level Features**
   - Some levels may have optional features not implemented
   - Epic (L10) features may be incomplete

---

## Execution Instructions

1. **Start with Type Definitions** - Validate `types/hero.ts`, `types/common.ts`, `types/abilities.ts` against compendium structures

2. **Validate Each Class Sequentially** - For each of the 10 classes:
   - Read all compendium features from `Heroes/Features/[Class]/`
   - Compare against `src/data/[class]/features.ts`
   - Document discrepancies

3. **Cross-Reference Abilities** - Match ability definitions between systems

4. **Validate Reference Data** - Check ancestries, kits, languages, cultures, careers

5. **Produce Final Report** - Aggregate all findings into actionable items

---

## Success Criteria

A successful validation produces:
- Zero critical failures
- Documented list of all minor discrepancies
- Recommendations for data synchronization
- Confidence score for compendium accuracy

---

*This validation prompt was generated to ensure Mettle accurately implements the Draw Steel TTRPG rules as defined in the authoritative Compendium.*
