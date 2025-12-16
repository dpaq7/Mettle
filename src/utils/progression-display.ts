// Progression Display Utilities
// Builds display data for level progression across all hero classes

import { Hero, HeroClass, isSummonerHero, isFuryHero } from '../types/hero';
import {
  ProgressionDisplayItem,
  LevelProgressionSummary,
  ProgressionItemType,
} from '../types/class-progression';
import { ProgressionChoices, LevelFeature } from '../types/progression';

// Import class-specific progression data
import { levelProgressions as summonerProgressions } from '../data/progression';
import { furyProgressions } from '../data/fury/progression';

/**
 * Build a complete progression history for a hero
 * Returns items grouped by level, from level 1 to current level
 */
export function buildProgressionDisplay(hero: Hero): LevelProgressionSummary[] {
  const summaries: LevelProgressionSummary[] = [];

  for (let level = 1; level <= hero.level; level++) {
    const items = getProgressionItemsForLevel(hero, level);
    if (items.length > 0) {
      summaries.push({ level, items });
    }
  }

  return summaries;
}

/**
 * Get progression items for a specific level based on hero class
 */
function getProgressionItemsForLevel(hero: Hero, level: number): ProgressionDisplayItem[] {
  // Level 1 always gets starting features
  if (level === 1) {
    return getLevel1Features(hero);
  }

  // For levels 2+, get class-specific progression
  switch (hero.heroClass) {
    case 'summoner':
      return getSummonerProgressionItems(hero, level);
    case 'fury':
      return getFuryProgressionItems(hero, level);
    default:
      return getGenericProgressionItems(hero, level);
  }
}

/**
 * Get Level 1 starting features for any hero class
 */
function getLevel1Features(hero: Hero): ProgressionDisplayItem[] {
  const items: ProgressionDisplayItem[] = [];

  // Class name for display
  const className = hero.heroClass.charAt(0).toUpperCase() + hero.heroClass.slice(1);

  // All classes get their heroic resource at level 1
  const resourceNames: Record<HeroClass, { name: string; description: string }> = {
    censor: {
      name: 'Wrath',
      description: 'Your heroic resource. Build Wrath by taking damage and smiting the unjust.',
    },
    conduit: {
      name: 'Piety',
      description: 'Your heroic resource. Gain Piety through prayer and divine connection.',
    },
    elementalist: {
      name: 'Essence',
      description: 'Your heroic resource. Manipulate elemental energy to fuel your powers.',
    },
    fury: {
      name: 'Ferocity',
      description: 'Your heroic resource. Starts equal to Victories. Gain 1d3 per turn, +1/+2/+3 when taking damage.',
    },
    null: {
      name: 'Discipline',
      description: 'Your heroic resource. Channel psionic power through mental focus.',
    },
    shadow: {
      name: 'Insight',
      description: 'Your heroic resource. Gain Insight through stealth and cunning.',
    },
    summoner: {
      name: 'Essence',
      description: 'Your heroic resource. Starts equal to Victories. Gain 2 per turn, +1 when you or ally takes elemental damage.',
    },
    tactician: {
      name: 'Focus',
      description: 'Your heroic resource. Build Focus through tactical maneuvers and leadership.',
    },
    talent: {
      name: 'Clarity',
      description: 'Your heroic resource. Can go negative. Manage strain to avoid psionic backlash.',
    },
    troubadour: {
      name: 'Drama',
      description: 'Your heroic resource. Build Drama through performance and dramatic moments.',
    },
  };

  const resource = resourceNames[hero.heroClass];
  items.push({
    id: `l1-resource-${hero.heroClass}`,
    type: 'resource-upgrade',
    name: resource.name,
    description: resource.description,
    level: 1,
  });

  // Class-specific starting features
  switch (hero.heroClass) {
    case 'summoner':
      items.push(
        {
          id: 'l1-circle',
          type: 'subclass-feature',
          name: 'Summoner Circle',
          description: 'Your summoning tradition: Blight (Demons), Graves (Undead), Spring (Fey), or Storms (Elementals).',
          level: 1,
          isSubclassSpecific: true,
          subclassId: isSummonerHero(hero) ? hero.subclass : undefined,
          isChoice: true,
          chosenOptionName: isSummonerHero(hero) && hero.subclass
            ? hero.subclass.charAt(0).toUpperCase() + hero.subclass.slice(1)
            : undefined,
        },
        {
          id: 'l1-portfolio',
          type: 'feature',
          name: 'Minion Portfolio',
          description: 'Access to your circle\'s minion portfolio. Choose 2 Signature Minions.',
          level: 1,
        },
        {
          id: 'l1-call-forth',
          type: 'feature',
          name: 'Call Forth',
          description: 'Main action to summon minions from your portfolio by spending Essence.',
          level: 1,
        },
        {
          id: 'l1-summoner-strike',
          type: 'feature',
          name: 'Summoner Strike',
          description: 'Signature ranged magic attack using Reason.',
          level: 1,
        },
        {
          id: 'l1-formation',
          type: 'feature',
          name: 'Formation',
          description: 'Choose Horde, Platoon, Elite, or Leader formation style.',
          level: 1,
          isChoice: true,
          chosenOptionName: isSummonerHero(hero)
            ? hero.formation.charAt(0).toUpperCase() + hero.formation.slice(1)
            : undefined,
        }
      );
      break;

    case 'fury':
      items.push(
        {
          id: 'l1-aspect',
          type: 'subclass-feature',
          name: 'Primordial Aspect',
          description: 'Your connection to primordial chaos: Berserker, Reaver, or Stormwight.',
          level: 1,
          isSubclassSpecific: true,
          subclassId: isFuryHero(hero) ? hero.subclass : undefined,
          isChoice: true,
          chosenOptionName: isFuryHero(hero) && hero.subclass
            ? hero.subclass.charAt(0).toUpperCase() + hero.subclass.slice(1)
            : undefined,
        },
        {
          id: 'l1-rage',
          type: 'feature',
          name: 'Growing Ferocity',
          description: 'Gain escalating bonuses at 4+, 8+, 10+, and 12+ Ferocity.',
          level: 1,
        },
        {
          id: 'l1-mighty-strikes',
          type: 'feature',
          name: 'Mighty Strikes',
          description: 'Your weapon attacks deal extra damage based on Ferocity spent.',
          level: 1,
        }
      );
      break;

    case 'censor':
      items.push(
        {
          id: 'l1-order',
          type: 'subclass-feature',
          name: 'Censor Order',
          description: 'Your path of judgment: Inquisitor, Templar, or Zealot.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-judgment',
          type: 'feature',
          name: 'Judgment',
          description: 'Mark enemies for divine punishment.',
          level: 1,
        }
      );
      break;

    case 'conduit':
      items.push(
        {
          id: 'l1-domain',
          type: 'subclass-feature',
          name: 'Divine Domain',
          description: 'Your connection to the divine: one of 11 domains.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-prayer',
          type: 'feature',
          name: 'Prayer',
          description: 'Channel divine power through prayer.',
          level: 1,
        }
      );
      break;

    case 'elementalist':
      items.push(
        {
          id: 'l1-element',
          type: 'subclass-feature',
          name: 'Element',
          description: 'Your elemental specialization: Earth, Fire, Green, or Void.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-persistent',
          type: 'feature',
          name: 'Persistent Magic',
          description: 'Maintain magical effects by locking Essence.',
          level: 1,
        }
      );
      break;

    case 'null':
      items.push(
        {
          id: 'l1-tradition',
          type: 'subclass-feature',
          name: 'Psionic Tradition',
          description: 'Your psionic discipline: Chronokinetic, Cryokinetic, or Metakinetic.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-null-field',
          type: 'feature',
          name: 'Null Field',
          description: 'Project a zone that disrupts and controls the battlefield.',
          level: 1,
        }
      );
      break;

    case 'shadow':
      items.push(
        {
          id: 'l1-college',
          type: 'subclass-feature',
          name: 'Shadow College',
          description: 'Your shadowy tradition: Black Ash, Caustic Alchemy, Harlequin Mask, or Woven Darkness.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-hide',
          type: 'feature',
          name: 'Hide in Shadows',
          description: 'Become hidden and strike from darkness.',
          level: 1,
        }
      );
      break;

    case 'tactician':
      items.push(
        {
          id: 'l1-doctrine',
          type: 'subclass-feature',
          name: 'Doctrine',
          description: 'Your tactical philosophy: Insurgent, Mastermind, or Vanguard.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-mark',
          type: 'feature',
          name: 'Mark Target',
          description: 'Designate enemies for coordinated attacks.',
          level: 1,
        }
      );
      break;

    case 'talent':
      items.push(
        {
          id: 'l1-psi-tradition',
          type: 'subclass-feature',
          name: 'Talent Tradition',
          description: 'Your psionic focus: Empath, Metamorph, or Telekinetic.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-strain',
          type: 'feature',
          name: 'Strain',
          description: 'Push beyond limits at the cost of Clarity.',
          level: 1,
        }
      );
      break;

    case 'troubadour':
      items.push(
        {
          id: 'l1-class-act',
          type: 'subclass-feature',
          name: 'Class Act',
          description: 'Your performance style: Auteur, Duelist, or Virtuoso.',
          level: 1,
          isSubclassSpecific: true,
          isChoice: true,
        },
        {
          id: 'l1-routine',
          type: 'feature',
          name: 'Routines',
          description: 'Maintain ongoing performances that buff allies.',
          level: 1,
        }
      );
      break;
  }

  return items;
}

/**
 * Summoner-specific progression items for levels 2+
 */
function getSummonerProgressionItems(hero: Hero, level: number): ProgressionDisplayItem[] {
  const items: ProgressionDisplayItem[] = [];
  const progression = summonerProgressions.find(p => p.level === level);

  if (!progression) return items;

  // Process each feature in the progression
  for (const feature of progression.features) {
    const item = processFeature(feature, level, hero.progressionChoices);
    items.push(item);
  }

  return items;
}

/**
 * Fury-specific progression items for levels 2+
 */
function getFuryProgressionItems(hero: Hero, level: number): ProgressionDisplayItem[] {
  const items: ProgressionDisplayItem[] = [];
  const progression = furyProgressions.find(p => p.level === level);

  if (!progression) return items;

  // Process each feature in the progression
  for (const feature of progression.features) {
    const item = processFeature(feature, level, hero.progressionChoices);

    // Mark aspect features as subclass-specific
    if (feature.category === 'aspect-feature' ||
        feature.category?.includes('ferocity')) {
      item.isSubclassSpecific = isFuryHero(hero);
      item.subclassId = isFuryHero(hero) ? hero.subclass : undefined;
    }

    items.push(item);
  }

  return items;
}

/**
 * Generic progression items for classes without specific data
 */
function getGenericProgressionItems(hero: Hero, level: number): ProgressionDisplayItem[] {
  const items: ProgressionDisplayItem[] = [];

  // Common progression milestones based on Draw Steel patterns
  switch (level) {
    case 2:
      items.push({
        id: `l2-perk-${hero.heroClass}`,
        type: 'perk',
        name: 'Perk',
        description: 'Gain one crafting, exploration, or intrigue perk.',
        level: 2,
      });
      items.push({
        id: `l2-feature-${hero.heroClass}`,
        type: 'feature',
        name: 'Class Feature',
        description: 'Gain a new class feature.',
        level: 2,
      });
      break;

    case 3:
      items.push({
        id: `l3-ability-${hero.heroClass}`,
        type: 'ability-unlock',
        name: 'Heroic Ability',
        description: 'Unlock a new tier of heroic abilities.',
        level: 3,
      });
      break;

    case 4:
      items.push({
        id: `l4-stats-${hero.heroClass}`,
        type: 'stat-increase',
        name: 'Characteristic Increase',
        description: 'Primary characteristics increase to 3.',
        level: 4,
      });
      items.push({
        id: `l4-perk-${hero.heroClass}`,
        type: 'perk',
        name: 'Perk & Skill',
        description: 'Gain one perk and one skill choice.',
        level: 4,
      });
      break;

    case 5:
      items.push({
        id: `l5-subclass-${hero.heroClass}`,
        type: 'subclass-feature',
        name: 'Subclass Feature',
        description: 'Gain an upgrade to your subclass feature.',
        level: 5,
      });
      break;

    case 6:
      items.push({
        id: `l6-feature-${hero.heroClass}`,
        type: 'feature',
        name: 'Class Feature',
        description: 'Gain exploration and social features.',
        level: 6,
      });
      items.push({
        id: `l6-perk-${hero.heroClass}`,
        type: 'perk',
        name: 'Perk',
        description: 'Gain one perk choice.',
        level: 6,
      });
      break;

    case 7:
      items.push({
        id: `l7-stats-${hero.heroClass}`,
        type: 'stat-increase',
        name: 'All Characteristics +1',
        description: 'All characteristic scores increase by 1 (maximum 4).',
        level: 7,
      });
      items.push({
        id: `l7-skill-${hero.heroClass}`,
        type: 'skill',
        name: 'Skill',
        description: 'Gain one additional skill choice.',
        level: 7,
      });
      break;

    case 8:
      items.push({
        id: `l8-ability-${hero.heroClass}`,
        type: 'ability-unlock',
        name: 'Heroic Ability',
        description: 'Unlock the highest tier of heroic abilities.',
        level: 8,
      });
      items.push({
        id: `l8-perk-${hero.heroClass}`,
        type: 'perk',
        name: 'Perk',
        description: 'Gain one perk choice.',
        level: 8,
      });
      break;

    case 9:
      items.push({
        id: `l9-subclass-${hero.heroClass}`,
        type: 'subclass-feature',
        name: 'Subclass Capstone',
        description: 'Gain the ultimate upgrade to your subclass.',
        level: 9,
      });
      break;

    case 10:
      items.push({
        id: `l10-stats-${hero.heroClass}`,
        type: 'stat-increase',
        name: 'Characteristic Mastery',
        description: 'Primary characteristics increase to 5.',
        level: 10,
      });
      items.push({
        id: `l10-epic-${hero.heroClass}`,
        type: 'epic-resource',
        name: 'Epic Resource',
        description: 'Gain your class\'s epic resource for legendary power.',
        level: 10,
      });
      items.push({
        id: `l10-perk-${hero.heroClass}`,
        type: 'perk',
        name: 'Perk & Skill',
        description: 'Gain one perk and one skill choice.',
        level: 10,
      });
      break;
  }

  return items;
}

/**
 * Process a LevelFeature into a ProgressionDisplayItem
 */
function processFeature(
  feature: LevelFeature,
  level: number,
  choices?: ProgressionChoices
): ProgressionDisplayItem {
  const item: ProgressionDisplayItem = {
    id: feature.id,
    type: mapFeatureCategoryToType(feature.category, feature.name),
    name: feature.name,
    description: feature.description,
    level,
    isChoice: feature.type === 'choice',
  };

  // If it's a choice, check what was selected
  if (feature.type === 'choice' && choices) {
    const choiceId = getChoiceForCategory(choices, feature.category);
    if (choiceId) {
      const chosenOption = feature.choices?.find(c => c.id === choiceId);
      item.chosenOptionId = choiceId;
      item.chosenOptionName = chosenOption?.name;
    }
  }

  return item;
}

/**
 * Map feature category to display type
 */
function mapFeatureCategoryToType(category?: string, name?: string): ProgressionItemType {
  if (!category) {
    // Infer from name
    const lowerName = name?.toLowerCase() || '';
    if (lowerName.includes('perk')) return 'perk';
    if (lowerName.includes('skill')) return 'skill';
    if (lowerName.includes('characteristic') || lowerName.includes('increase')) return 'stat-increase';
    return 'feature';
  }

  switch (category) {
    case 'ward':
    case 'second-ward':
      return 'kit-upgrade';
    case '7-essence':
    case '9-essence':
    case '11-essence':
    case '7-ferocity':
    case '9-ferocity':
    case '11-ferocity':
    case 'aspect-5-ferocity':
    case 'aspect-9-ferocity':
    case 'aspect-11-ferocity':
      return 'ability-choice';
    case 'circle-upgrade':
    case 'aspect-feature':
      return 'subclass-feature';
    case 'stat-boost':
      return 'stat-increase';
    default:
      return 'feature';
  }
}

/**
 * Get the chosen option ID for a progression category
 */
function getChoiceForCategory(choices: ProgressionChoices, category?: string): string | undefined {
  if (!category) return undefined;

  switch (category) {
    // Summoner choices
    case 'ward': return choices.ward;
    case 'second-ward': return choices.secondWard;
    case '7-essence': return choices.sevenEssenceAbility;
    case '9-essence': return choices.nineEssenceAbility;
    case '11-essence': return choices.elevenEssenceAbility;
    case 'circle-upgrade': return choices.circleUpgrade;
    case 'stat-boost': return choices.statBoost;
    // Fury choices
    case '7-ferocity': return choices.sevenFerocityAbility;
    case '9-ferocity': return choices.nineFerocityAbility;
    case '11-ferocity': return choices.elevenFerocityAbility;
    case 'aspect-5-ferocity': return choices.aspectFiveFerocity;
    case 'aspect-9-ferocity': return choices.aspectNineFerocity;
    case 'aspect-11-ferocity': return choices.aspectElevenFerocity;
    default: return undefined;
  }
}
