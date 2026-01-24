// Project Templates and Data

import { ProjectTemplate, LORE_GOALS } from '../types/projects';

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  // ==========================================
  // RESEARCH PROJECTS
  // ==========================================
  {
    id: 'discover-lore-common',
    name: 'Discover Common Lore',
    type: 'research',
    description: 'Research commonly available information about a subject. Common knowledge is generally easy to discover with a day or so of research.',
    fixedGoal: LORE_GOALS.common,
    characteristic: 'reason',
    applicableSkills: ['history', 'monsters', 'nature', 'culture', 'religion', 'rumors', 'psionics', 'magic', 'timescape'],
    prerequisites: 'Access to a library, scholar, or other knowledge source',
    outcome: 'Uncover common knowledge about the subject',
  },
  {
    id: 'discover-lore-obscure',
    name: 'Discover Obscure Lore',
    type: 'research',
    description: 'Research hidden or specialized information known only to experts. Obscure knowledge is known only to specialized sages.',
    fixedGoal: LORE_GOALS.obscure,
    characteristic: 'reason',
    applicableSkills: ['history', 'monsters', 'nature', 'culture', 'religion', 'rumors', 'psionics', 'magic', 'timescape'],
    prerequisites: 'Access to specialized sources or expert tutors',
    outcome: 'Uncover obscure knowledge about the subject',
  },
  {
    id: 'discover-lore-lost',
    name: 'Discover Lost Lore',
    type: 'research',
    description: 'Research ancient or forgotten information thought lost to time. Lost knowledge is so esoteric that even among the most dedicated scholars, there might be only one or two who know it.',
    fixedGoal: LORE_GOALS.lost,
    characteristic: 'reason',
    applicableSkills: ['history', 'monsters', 'nature', 'culture', 'religion', 'rumors', 'psionics', 'magic', 'timescape'],
    prerequisites: 'Access to rare texts, ancient ruins, or powerful entities',
    outcome: 'Uncover lost knowledge about the subject',
  },
  {
    id: 'discover-lore-forbidden',
    name: 'Discover Forbidden Lore',
    type: 'research',
    description: 'Research dangerous or prohibited information actively suppressed. Forbidden knowledge is lore that a powerful individual or organization is attempting to keep secret.',
    fixedGoal: LORE_GOALS.forbidden,
    characteristic: 'reason',
    applicableSkills: ['history', 'monsters', 'nature', 'culture', 'religion', 'rumors', 'psionics', 'magic', 'timescape'],
    prerequisites: 'Access to forbidden archives, dark entities, or sealed vaults',
    outcome: 'Uncover forbidden knowledge about the subject',
  },
  {
    id: 'find-cure',
    name: 'Find a Cure',
    type: 'research',
    description: 'Research and develop an antidote for a specific disease, curse, or affliction caused by a creature or effect.',
    goalRange: { min: 50, max: 500 },
    variableGoalFormula: '50 × creature level',
    characteristic: ['reason', 'intuition'],
    applicableSkills: ['alchemy', 'medicine', 'nature', 'magic'],
    prerequisites: 'Remains of the creature that caused the affliction, or another creature of the same kind',
    outcome: 'Create one dose of an alchemical cure for the affliction',
  },
  {
    id: 'learn-language',
    name: 'Learn New Language',
    type: 'research',
    description: 'Study and become fluent in a new language through intensive study with texts or native speakers.',
    fixedGoal: 120,
    characteristic: ['reason', 'intuition'],
    applicableSkills: ['culture', 'history'],
    prerequisites: 'Access to a native speaker or comprehensive texts in the language',
    outcome: 'Gain fluency in the chosen language',
  },
  {
    id: 'learn-skill',
    name: 'Learn New Skill',
    type: 'research',
    description: 'Learn a new skill through dedicated study and practice.',
    fixedGoal: 120,
    characteristic: ['reason', 'intuition'],
    applicableSkills: [],
    prerequisites: 'Access to texts or instruction that teaches the skill',
    outcome: 'Gain the chosen skill',
  },
  {
    id: 'hone-career-skills',
    name: 'Hone Career Skills',
    type: 'research',
    description: 'Revisit your previous life to freshen up on the experience it provided you.',
    fixedGoal: 240,
    characteristic: 'intuition',
    applicableSkills: [],
    prerequisites: 'Access to training facilities or expert mentor related to your career',
    outcome: 'Gain an edge on tests made using the skills provided by your career',
  },
  {
    id: 'hone-career-skills-advanced',
    name: 'Hone Career Skills (Advanced)',
    type: 'research',
    description: 'Master-level training in career abilities, building on basic career skill training.',
    fixedGoal: 360,
    characteristic: 'intuition',
    applicableSkills: [],
    prerequisites: 'Must have completed Hone Career Skills project',
    outcome: 'Gain double edge on tests using career skills',
  },
  {
    id: 'go-undercover',
    name: 'Go Undercover',
    type: 'research',
    description: 'Infiltrate an organization to spy on their operations and gather information. Each completion increases catch chance by 25%.',
    fixedGoal: 15,
    characteristic: ['intuition', 'presence'],
    applicableSkills: ['criminal underworld', 'rumors', 'lie'],
    prerequisites: 'A disguise, signet ring, tattoo, or other indication of belonging to the organization',
    outcome: 'Gain access to maps, knowledge about operations, or other common/obscure information',
  },
  {
    id: 'learn-from-master-hone',
    name: 'Learn From a Master (Hone Ability)',
    type: 'research',
    description: 'Sharpen the effectiveness of one of your abilities through training with a master.',
    fixedGoal: 120,
    characteristic: ['might', 'agility', 'reason', 'intuition', 'presence'],
    applicableSkills: [],
    prerequisites: 'Access to an NPC of higher level, or records of their teachings',
    outcome: 'Add +1/+1/+1 damage to one ability, or +2 distance to a ranged ability',
  },
  {
    id: 'learn-from-master-control',
    name: 'Learn From a Master (Improve Control)',
    type: 'research',
    description: 'Learn to use one of your heroic abilities more efficiently through intensive training.',
    fixedGoal: 500,
    characteristic: ['might', 'agility', 'reason', 'intuition', 'presence'],
    applicableSkills: [],
    prerequisites: 'Access to an NPC of higher level, or records of their teachings',
    outcome: 'Reduce baseline Heroic Resource cost of one ability by 1 (minimum 1)',
  },
  {
    id: 'learn-from-master-acquire',
    name: 'Learn From a Master (Acquire Ability)',
    type: 'research',
    description: 'Gain a signature ability from a master of another class through extensive training.',
    fixedGoal: 1000,
    characteristic: ['might', 'agility', 'reason', 'intuition', 'presence'],
    applicableSkills: [],
    prerequisites: 'Access to an NPC of higher level from another class, or records of their teachings',
    outcome: 'Gain one signature ability from the master\'s class',
  },

  // ==========================================
  // CRAFTING PROJECTS
  // ==========================================
  {
    id: 'build-airship',
    name: 'Build Airship',
    type: 'crafting',
    description: 'Construct a flying vessel capable of carrying passengers and cargo. The airship can travel 130 miles per day and take 200 damage before destruction.',
    fixedGoal: 3000,
    characteristic: ['might', 'reason', 'presence'],
    applicableSkills: ['architecture', 'mechanics', 'blacksmithing'],
    prerequisites: 'Wind Crystal of Quintessence; access to shipyard and materials',
    outcome: 'Create a functional airship with speed 10 in combat, 130 miles/day out of combat',
  },
  {
    id: 'build-road',
    name: 'Build or Repair Road',
    type: 'crafting',
    description: 'Construct or repair a road connecting two locations. Travel time on the road is halved.',
    goalRange: { min: 10, max: 1000 },
    variableGoalFormula: '10 × miles (half if repairing)',
    characteristic: ['might', 'reason', 'presence'],
    applicableSkills: ['architecture', 'mechanics'],
    prerequisites: 'Three writs of approval from engineers\', masons\', and guards\' guilds',
    outcome: 'Complete road that halves travel time; gain Renown based on length',
  },
  {
    id: 'craft-teleportation-platform',
    name: 'Craft Teleportation Platform',
    type: 'crafting',
    description: 'Create a 3×3 teleportation platform activated by a supernatural password. Can teleport to any known location or other platform.',
    fixedGoal: 1500,
    characteristic: 'reason',
    applicableSkills: ['magic', 'psionics', 'mechanics'],
    prerequisites: 'One spatial navigator',
    outcome: 'Create a permanent teleportation platform with password protection',
  },
  {
    id: 'craft-treasure',
    name: 'Craft Treasure',
    type: 'crafting',
    description: 'Create a supernatural weapon, armor, implement, or consumable treasure.',
    goalRange: { min: 50, max: 500 },
    characteristic: ['might', 'reason', 'intuition'],
    applicableSkills: ['alchemy', 'architecture', 'blacksmithing', 'fletching', 'forgery', 'jewelry', 'mechanics', 'tailoring'],
    prerequisites: 'Appropriate raw materials, crafting tools, and project source',
    outcome: 'Create the specified supernatural treasure',
  },
  {
    id: 'imbue-treasure-1',
    name: 'Imbue Treasure (1st Level)',
    type: 'crafting',
    description: 'Apply a 1st-level enhancement to an existing leveled treasure. Also grants +6 Stamina (armor), +1 damage (weapon/implement).',
    fixedGoal: 150,
    characteristic: ['might', 'reason', 'intuition'],
    applicableSkills: ['alchemy', 'blacksmithing', 'magic', 'jewelry'],
    prerequisites: 'A mundane weapon, armor, or implement',
    outcome: 'Add a 1st-level enhancement to the item',
  },
  {
    id: 'imbue-treasure-5',
    name: 'Imbue Treasure (5th Level)',
    type: 'crafting',
    description: 'Apply a 5th-level enhancement to an existing leveled treasure. Increases Stamina bonus to +12 (armor), damage bonus to +2 (weapon/implement).',
    fixedGoal: 300,
    characteristic: ['might', 'reason', 'intuition'],
    applicableSkills: ['alchemy', 'blacksmithing', 'magic', 'jewelry'],
    prerequisites: 'A leveled treasure with 1st-level enhancement',
    outcome: 'Add a 5th-level enhancement to the item',
  },
  {
    id: 'imbue-treasure-9',
    name: 'Imbue Treasure (9th Level)',
    type: 'crafting',
    description: 'Apply a 9th-level enhancement to an existing leveled treasure. Increases Stamina bonus to +21 (armor), damage bonus to +3 (weapon/implement).',
    fixedGoal: 450,
    characteristic: ['might', 'reason', 'intuition'],
    applicableSkills: ['alchemy', 'blacksmithing', 'magic', 'jewelry'],
    prerequisites: 'A leveled treasure with 5th-level enhancement',
    outcome: 'Add a 9th-level enhancement to the item',
  },
  {
    id: 'perfect-recipe',
    name: 'Perfect New Recipe',
    type: 'crafting',
    description: 'Create a signature dish that grants temporary benefits. Modern recipes are Hearty, vintage are Comforting, ancient are Supernatural Power.',
    fixedGoal: 100,
    characteristic: ['reason', 'intuition'],
    applicableSkills: ['alchemy'],
    prerequisites: 'A recipe in a language you know, or someone to tutor you; quality ingredients',
    outcome: 'Create food that grants temporary benefits (Hearty, Comforting, or Supernatural Power)',
  },

  // ==========================================
  // OTHER PROJECTS
  // ==========================================
  {
    id: 'community-service',
    name: 'Community Service',
    type: 'other',
    description: 'Provide help to people in need: odd jobs, tutoring, cleaning, finding lost valuables, and the like.',
    fixedGoal: 75,
    characteristic: ['might', 'agility', 'reason', 'intuition', 'presence'],
    applicableSkills: ['architecture', 'blacksmithing', 'medicine', 'mechanics'],
    prerequisites: 'Access to a settlement or community in need',
    outcome: 'Receive a random consumable treasure as thanks for your hard work',
  },
  {
    id: 'spend-time-loved-ones',
    name: 'Spend Time with Loved Ones',
    type: 'other',
    description: 'Reconnect with friends and family to restore your spirit. No skills apply—purely personal time.',
    fixedGoal: 60,
    characteristic: 'presence',
    applicableSkills: [],
    prerequisites: 'Access to loved ones or companions',
    outcome: 'Temporarily increase maximum Stamina',
  },
  {
    id: 'fishing',
    name: 'Fishing',
    type: 'other',
    description: 'Fish for sustenance, relaxation, or bragging rights. Points represent fish size; spend on rewards. Breakthrough triggers special event.',
    goalRange: { min: 50, max: 100 },
    variableGoalFormula: '50 for Hearty meal, 100 for Great meal',
    characteristic: ['agility', 'reason', 'intuition'],
    applicableSkills: [],
    prerequisites: 'Access to a body of water and fishing equipment',
    outcome: 'Catch fish to spend on Hearty meal (+1 Recovery) or Great meal (+1 Recovery, +10 temp Stamina)',
  },
];

// Project roll modifiers
export const PROJECT_MODIFIERS = {
  APPLICABLE_SKILL: 2,
  EDGE: 2,
  DOUBLE_EDGE: 4,
  BANE: -2,
  DOUBLE_BANE: -4,
  RELATED_LANGUAGE_BARRIER: -2, // Treated as bane
  UNKNOWN_LANGUAGE_BARRIER: -4, // Treated as double bane
};

// Breakthrough threshold (natural 19 or 20)
export const BREAKTHROUGH_THRESHOLD = 19;

// Automatic breakthrough bonus
export const AUTOMATIC_BREAKTHROUGH_POINTS = 20;

export const getProjectTemplate = (id: string): ProjectTemplate | undefined => {
  return PROJECT_TEMPLATES.find(p => p.id === id);
};

export const getProjectsByType = (type: 'research' | 'crafting' | 'other'): ProjectTemplate[] => {
  return PROJECT_TEMPLATES.filter(p => p.type === type);
};
