# Game Data Audit Findings

**Date:** 2026-01-03
**Updated:** 2026-01-03
**Purpose:** Identify code that violates the "GameData as single source of truth" pattern

---

## Summary

| Category | Original | Fixed | Remaining | Status |
|----------|----------|-------|-----------|--------|
| Hardcoded tier calculations | 7 | 6 | 1* | DONE |
| Hardcoded stamina values | 5 | 5 | 0 | DONE |
| Hardcoded recovery values | 1 | 1 | 0 | DONE |
| Direct classDefinitions imports | 9 | 9 | 0 | DONE |
| Direct reference-data imports | 6 | 4 | 2** | DONE |
| Direct conditions imports | 7 | 0 | 7*** | DEFERRED |
| Direct skills imports | 4 | 0 | 4*** | DEFERRED |

*One tier calculation is intentional (Fury ferocity threshold)
**`cultures` imports remain due to type mismatch (Culture[] vs CultureBenefit[])
***Deferred: richer type definitions in source files than GameData types

---

## Completed Fixes

### Tier Calculations - DONE
Migrated 6 files to use `GameData.getTierForRoll()`:
- `utils/dice.ts`
- `hooks/useDiceRolling.ts`
- `components/ui/ActionCard.tsx`
- `components/ui/CompactStatBar.tsx`

### Stamina/Recovery Values - DONE
All class stamina calculations now use `GameData.getClass(heroClass)?.baseStats`:
- `utils/calculations.ts` - uses GameData for summoner defaults
- `utils/statCalculator.ts` - uses `GameData.getClass()`
- `data/fury/progression.ts` - uses `GameData.getClass('fury')`
- `components/character/LevelUpWizard.tsx` - uses `GameData.getClass()`
- `components/character/LevelUp.tsx` - uses `GameData.getClass()`
- `components/sections/character/LevelUpDetail.tsx` - uses `GameData.getClass()`

### classDefinitions Imports - DONE
Migrated 9 files from direct `classDefinitions` import to `GameData.getClass()`:
- `CharacterDetailsView.tsx`
- `ClassSelector.tsx`
- `CharacterCreation.tsx`
- `SubclassSelector.tsx`
- `CharacteristicsStep.tsx`
- `CharacterManager.tsx`
- `useCharacterCreation.ts`
- `CharacterStatsPanel.tsx`
- `LevelUpWizard.tsx`

Also added new GameData helper functions:
- `getSubclasses()`, `getSubclass()`
- `getSubclassTypeName()`, `getSubclassTypeNamePlural()`
- `getSubclassSelectCount()`, `requiresMultipleSubclasses()`
- `getClassRoleColor()`

### reference-data Imports - DONE (partial)
Migrated 4 files to use GameData:
- `LanguagesStep.tsx` → `GameData.getSelectableLanguages()`
- `KitStep.tsx` → `GameData.getAllKits()`
- `CareerStep.tsx` → `GameData.getAllCareers()`
- `CharacterDetailsView.tsx` → `GameData.getLanguage()`
- `CharacterCreation.tsx` → `GameData.getAllCareers/Kits/Languages()`

**Remaining (type mismatch):**
- `CharacterCreation.tsx` - `cultures` (Culture[] vs CultureBenefit[])
- `CultureStep.tsx` - `cultures` (Culture[] vs CultureBenefit[])

---

## Deferred Items

### Conditions Imports - DEFERRED
The `ConditionDefinition` type in `conditions.ts` is richer than in `game-data.ts`:
- conditions.ts: icon, primaryEffect, saveEnds, saveRequired, affectsActions, actionTriggers, rulesDescription
- game-data.ts: id, name, effect, endTrigger

Components that need icons, save mechanics, or action triggers should continue using `conditions.ts` directly.

Files continuing to use conditions.ts:
- `useConditions.ts`
- `useConditionManagement.ts`
- `ConditionRulesDetail.tsx`
- `CharacterDetailPane.tsx`
- `CharacterStatsPanel.tsx`
- `TurnCard.tsx`
- `ConditionsCard.tsx`

### Skills Imports - DEFERRED
The `Skill` type in `skills.ts` is richer than `SkillDefinition` in `game-data.ts`:
- skills.ts: id, name, group, description, use
- game-data.ts: name, group, description

Files continuing to use skills.ts:
- `useCharacterCreation.ts`
- `SkillRulesDetail.tsx`
- `CharacterDetailsView.tsx`
- `CharacterCreation.tsx`

### Class Abilities / Progression - NOT IN SCOPE
These remain using their specialized data files:
- `utils/progression-display.ts`
- `ActionsSection.tsx`
- `ActionsMasterList.tsx`
- `ActionsDetailPane.tsx`
- `LevelUpDetail.tsx`
- `LevelUpWizard.tsx`
- `LevelUp.tsx`

---

## Commits

1. `7ef4af7` - refactor: use GameData.getTierForRoll for tier calculations
2. `318c794` - refactor: use GameData for stamina/recovery calculations
3. `3309f86` - refactor: migrate classDefinitions imports to GameData API
4. `40a10e4` - refactor: migrate reference-data imports to GameData API

---

## Future Work

1. **Culture Type Alignment** - Consider whether to:
   - Add full Culture[] loading to GameData, or
   - Restructure CultureBenefit to match Culture

2. **Enrich GameData Types** - Consider adding missing fields:
   - ConditionDefinition: icon, saveEnds, actionTriggers
   - SkillDefinition: id, use

3. **Class Abilities Integration** - Load abilities from JSON source:
   - Currently using `data/class-abilities.ts`
   - Should use GameData.getAbilitiesByClass()
