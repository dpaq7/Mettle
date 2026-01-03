# Game Data Audit Findings

**Date:** 2026-01-03
**Purpose:** Identify code that violates the "GameData as single source of truth" pattern

---

## Summary

| Category | Count | Priority |
|----------|-------|----------|
| Hardcoded tier calculations | 7 locations | HIGH |
| Hardcoded stamina values | 5 locations | HIGH |
| Hardcoded recovery values | 1 location | MEDIUM |
| Direct data imports | 22 locations | MEDIUM |

---

## Hardcoded Values Found

### Tier Calculations (HIGH PRIORITY)

These locations duplicate the tier threshold logic that should use `GameData.getTierForRoll()`:

| File | Line | Current Code | Should Be |
|------|------|--------------|-----------|
| `utils/dice.ts` | 42-43 | `if (roll >= 17) return 3; if (roll >= 12) return 2;` | `GameData.getTierForRoll(roll)` |
| `hooks/useDiceRolling.ts` | 15-16 | `if (total >= 17) return { tier: 3, ... }` | `GameData.getTierForRoll(total)` |
| `components/ui/ActionCard.tsx` | 90-91 | `if (total >= 17) tier = 3; else if (total >= 12) tier = 2;` | `GameData.getTierForRoll(total)` |
| `components/ui/ActionCard.tsx` | 134-135 | `if (lastRollResult >= 17) return 3;` | `GameData.getTierForRoll(lastRollResult)` |
| `components/ui/CompactStatBar.tsx` | 46-47 | `if (total >= 17) return 3; if (total >= 12) return 2;` | `GameData.getTierForRoll(total)` |
| `components/sections/character/CharacterMasterList.tsx` | 167 | `if (ferocity >= 12) return 'Tier 4';` | Custom resource tier (may be intentional) |

### Stamina Values (HIGH PRIORITY)

These locations hardcode class stamina values:

| File | Line | Current Code | Should Be |
|------|------|--------------|-----------|
| `utils/calculations.ts` | 10 | `const baseClassStamina = 15;` | `GameData.getClass(heroClass)?.baseStats.stamina.level1` |
| `utils/statCalculator.ts` | 111 | `const classStartingStamina = classDef?.startingStamina ?? 18;` | Use `GameData.getClass()` with proper fallback |
| `data/fury/progression.ts` | 634 | `const baseStamina = 21;` | Reference class definition |
| `data/portfolios/undead.ts` | 557 | `baseStamina: 20` | Portfolio minion data (may be intentional) |
| `components/character/LevelUpWizard.tsx` | 167 | `classDef?.startingStamina ?? 18` | Use `GameData.getStaminaAtLevel()` |
| `components/character/LevelUp.tsx` | 78 | `classDef?.startingStamina ?? 18` | Use `GameData.getStaminaAtLevel()` |
| `components/sections/character/LevelUpDetail.tsx` | 173 | `classDef?.startingStamina ?? 18` | Use `GameData.getStaminaAtLevel()` |

### Recovery Values (MEDIUM PRIORITY)

| File | Line | Current Code | Should Be |
|------|------|--------------|-----------|
| `utils/calculations.ts` | 182 | `const baseRecoveries = 8;` | `GameData.getClass(heroClass)?.baseStats.recoveries` |

---

## Direct Data Imports

These files import game data directly instead of using the `GameData` access layer. They should be migrated to use `GameData.*` functions.

### Reference Data Imports

| File | Line | Current Import |
|------|------|----------------|
| `components/creation/CharacterCreation.tsx` | 6 | `import { ancestries, cultures, careers, kits, ... } from '../../data/reference-data'` |
| `components/character/CharacterDetailsView.tsx` | 4 | `import { languages as allLanguages } from '../../data/reference-data'` |
| `components/creation/steps/LanguagesStep.tsx` | 3 | `import { getSelectableLanguages } from '@/data/reference-data'` |
| `components/creation/steps/CareerStep.tsx` | 3 | `import { careers } from '@/data/reference-data'` |
| `components/creation/steps/CultureStep.tsx` | 3 | `import { cultures } from '@/data/reference-data'` |
| `components/creation/steps/KitStep.tsx` | 3 | `import { kits } from '@/data/reference-data'` |

### Condition Imports

| File | Line | Current Import |
|------|------|----------------|
| `hooks/useConditions.ts` | 4 | `import { CONDITIONS, performSavingThrow, ... } from '../data/conditions'` |
| `hooks/useConditionManagement.ts` | 3 | `import { getDefaultEndType } from '@/data/conditions'` |
| `components/sections/secondary/ConditionRulesDetail.tsx` | 1 | `import { CONDITIONS, ConditionId } from '@/data/conditions'` |
| `components/sections/character/CharacterDetailPane.tsx` | 7 | `import { CONDITIONS, ALL_CONDITIONS, ... } from '@/data/conditions'` |
| `components/character/CharacterStatsPanel.tsx` | 7 | `import { ALL_CONDITIONS, ConditionDefinition } from '../../data/conditions'` |
| `components/ui/StatsDashboard/cards/TurnCard.tsx` | 30 | `import { CONDITIONS, performSavingThrow, ... } from '@/data/conditions'` |
| `components/ui/StatsDashboard/cards/ConditionsCard.tsx` | 25 | `import { CONDITIONS, ALL_CONDITIONS, ... } from '@/data/conditions'` |

### Skill Imports

| File | Line | Current Import |
|------|------|----------------|
| `hooks/useCharacterCreation.ts` | 41 | `import { SkillGroup, findSkillByName, isSkillGroup } from '../data/skills'` |
| `components/sections/secondary/SkillRulesDetail.tsx` | 1 | `import { findSkillByName, getSkillById, skillGroups } from '@/data/skills'` |
| `components/character/CharacterDetailsView.tsx` | 5 | `import { skills as allSkills } from '../../data/skills'` |
| `components/creation/CharacterCreation.tsx` | 14 | `import { skills, getSkillsByGroup, ... } from '../../data/skills'` |

### Class Abilities / Progression Imports

| File | Line | Current Import |
|------|------|----------------|
| `utils/progression-display.ts` | 13 | `import { levelProgressions as summonerProgressions } from '../data/progression'` |
| `components/sections/actions/ActionsSection.tsx` | 6 | `import { getClassAbilities, isAbilitySelected } from '@/data/class-abilities'` |
| `components/sections/actions/ActionsMasterList.tsx` | 6 | `import { getClassAbilities } from '@/data/class-abilities'` |
| `components/sections/actions/ActionsDetailPane.tsx` | 7 | `import { getClassAbilities, isAbilitySelected } from '@/data/class-abilities'` |
| `components/sections/character/LevelUpDetail.tsx` | 4 | `import { getProgressionForLevel, getCircleUpgrades } from '@/data/progression'` |
| `components/character/LevelUpWizard.tsx` | 7 | `import { getProgressionForLevel, getCircleUpgrades } from '../../data/progression'` |
| `components/character/LevelUp.tsx` | 3 | `import { getProgressionForLevel, getCircleUpgrades } from '../../data/progression'` |

---

## Rule Contradictions

No explicit rule contradictions found. The existing data in `data/reference-data.ts`, `data/conditions.ts`, and `data/skills.ts` appears to match the source rules, but should be verified against the authoritative MD sources.

---

## Priority Fixes

### Phase 1: High Priority (Tier Calculations)
1. Create a shared `getTier(roll: number)` function in `GameData`
2. Update all 6 locations using hardcoded tier thresholds
3. **Estimated impact:** Prevents tier calculation bugs if rules change

### Phase 2: High Priority (Stamina/Recovery)
1. Implement `GameData.getStaminaAtLevel(class, level)` with class data
2. Update stamina calculations to use GameData
3. **Estimated impact:** Single source for class base stats

### Phase 3: Medium Priority (Data Imports)
1. Gradually migrate reference-data imports to GameData
2. Update components to use `GameData.getAllAncestries()`, etc.
3. **Estimated impact:** Prepares for canonical data loading from JSON/MD

---

## Notes

- The `data/` directory contains manually transcribed game data that should eventually be replaced with parsed data from the authoritative source files
- Some hardcoded values (like minion stats in portfolios) may be intentional for now
- The `GameData` access layer is implemented but not yet connected to source data
- Next step: Implement data loading from `source/game-json/` and `source/rules-md/`
