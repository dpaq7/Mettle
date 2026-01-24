// ============================================================================
// RULES CONTENT - Keyword and game term definitions from Draw Steel SRD
// ============================================================================

export interface KeywordDefinition {
  id: string;
  name: string;
  category: KeywordCategory;
  description: string;
  rulesText?: string;
}

export type KeywordCategory =
  | 'attack-type'      // Strike, Area
  | 'range'            // Melee, Ranged
  | 'damage-type'      // Fire, Cold, Lightning, etc.
  | 'power-source'     // Magic, Psionic, Weapon
  | 'psionic-domain'   // Animapathy, Chronopathy, etc.
  | 'special'          // Charge, Resistance, etc.
  | 'action';          // Action types

export const KEYWORDS: Record<string, KeywordDefinition> = {
  // Attack Types
  'strike': {
    id: 'strike',
    name: 'Strike',
    category: 'attack-type',
    description: 'An attack made with a weapon or natural attack.',
    rulesText: 'A strike is an attack that benefits from weapon damage bonuses. Most strikes are made with weapons, but some are made with natural attacks like claws or fists.',
  },
  'area': {
    id: 'area',
    name: 'Area',
    category: 'attack-type',
    description: 'An ability that affects multiple targets in a defined area.',
    rulesText: 'Area abilities affect all valid targets within the specified area. Common area types include burst (centered on a point), line (a straight path), and wall (a barrier).',
  },

  // Range Types
  'melee': {
    id: 'melee',
    name: 'Melee',
    category: 'range',
    description: 'Close-range combat within arm\'s reach.',
    rulesText: 'Melee abilities target creatures within the specified reach, typically adjacent squares. A reach of "Melee 1" means adjacent squares, while "Melee 2" extends to 2 squares away.',
  },
  'ranged': {
    id: 'ranged',
    name: 'Ranged',
    category: 'range',
    description: 'Attacks or abilities used at a distance.',
    rulesText: 'Ranged abilities can target creatures at a distance specified by the ability. Making a ranged attack while adjacent to an enemy typically provokes opportunity attacks.',
  },

  // Power Sources
  'magic': {
    id: 'magic',
    name: 'Magic',
    category: 'power-source',
    description: 'Supernatural power drawn from arcane or divine sources.',
    rulesText: 'Magic abilities are supernatural in nature and can be affected by abilities that specifically target or counter magic. They often bypass physical armor.',
  },
  'psionic': {
    id: 'psionic',
    name: 'Psionic',
    category: 'power-source',
    description: 'Mental powers originating from the mind.',
    rulesText: 'Psionic abilities are mental powers. They can be affected by abilities that target or counter psionics. Psionic abilities often target mental attributes and can affect creatures differently than magic.',
  },
  'weapon': {
    id: 'weapon',
    name: 'Weapon',
    category: 'power-source',
    description: 'Attack made using a weapon.',
    rulesText: 'Weapon abilities use your equipped weapon for the attack. Damage is affected by your weapon\'s damage bonus and any weapon-specific effects or enchantments.',
  },

  // Damage Types
  'fire': {
    id: 'fire',
    name: 'Fire',
    category: 'damage-type',
    description: 'Burning damage from flames or heat.',
    rulesText: 'Fire damage burns targets and can ignite flammable materials. Some creatures have immunity or resistance to fire damage.',
  },
  'cold': {
    id: 'cold',
    name: 'Cold',
    category: 'damage-type',
    description: 'Freezing damage from ice or extreme cold.',
    rulesText: 'Cold damage freezes targets and can create difficult terrain or ice effects. Some creatures have immunity or resistance to cold damage.',
  },
  'lightning': {
    id: 'lightning',
    name: 'Lightning',
    category: 'damage-type',
    description: 'Electrical damage from lightning or electricity.',
    rulesText: 'Lightning damage is electrical in nature. It can arc between targets or conduct through metal and water.',
  },
  'acid': {
    id: 'acid',
    name: 'Acid',
    category: 'damage-type',
    description: 'Corrosive damage that dissolves materials.',
    rulesText: 'Acid damage corrodes and dissolves materials. It can damage objects and armor as well as creatures.',
  },
  'poison': {
    id: 'poison',
    name: 'Poison',
    category: 'damage-type',
    description: 'Toxic damage from venoms or poisons.',
    rulesText: 'Poison damage comes from toxins. Many creatures have immunity to poison, particularly undead and constructs.',
  },
  'corruption': {
    id: 'corruption',
    name: 'Corruption',
    category: 'damage-type',
    description: 'Dark, corrupting energy damage.',
    rulesText: 'Corruption damage is a type of dark energy that corrupts and decays. It is particularly effective against living creatures.',
  },
  'holy': {
    id: 'holy',
    name: 'Holy',
    category: 'damage-type',
    description: 'Sacred damage from divine power.',
    rulesText: 'Holy damage comes from divine sources. It is particularly effective against undead and fiends.',
  },
  'psychic': {
    id: 'psychic',
    name: 'Psychic',
    category: 'damage-type',
    description: 'Mental damage affecting the mind.',
    rulesText: 'Psychic damage targets the mind directly. Creatures without minds or with mental protection may be immune or resistant.',
  },
  'void': {
    id: 'void',
    name: 'Void',
    category: 'damage-type',
    description: 'Damage from the emptiness between worlds.',
    rulesText: 'Void damage comes from the space between realities. It is rare and few creatures have resistance to it.',
  },
  'earth': {
    id: 'earth',
    name: 'Earth',
    category: 'damage-type',
    description: 'Damage from stone, rock, or seismic force.',
    rulesText: 'Earth damage comes from stone or seismic forces. It can affect terrain and structures as well as creatures.',
  },

  // Psionic Domains
  'animapathy': {
    id: 'animapathy',
    name: 'Animapathy',
    category: 'psionic-domain',
    description: 'Psionic abilities that connect with animal minds.',
    rulesText: 'Animapathy is the psionic domain of animal communication and control. It allows mental connection with beasts and animals.',
  },
  'chronopathy': {
    id: 'chronopathy',
    name: 'Chronopathy',
    category: 'psionic-domain',
    description: 'Psionic abilities that manipulate time.',
    rulesText: 'Chronopathy is the psionic domain of time manipulation. It can speed, slow, or briefly stop time.',
  },
  'metamorphosis': {
    id: 'metamorphosis',
    name: 'Metamorphosis',
    category: 'psionic-domain',
    description: 'Psionic abilities that transform the body.',
    rulesText: 'Metamorphosis is the psionic domain of physical transformation. It allows the user to alter their own body.',
  },
  'telekinesis': {
    id: 'telekinesis',
    name: 'Telekinesis',
    category: 'psionic-domain',
    description: 'Psionic abilities that move objects with the mind.',
    rulesText: 'Telekinesis is the psionic domain of moving objects with mental power. It can manipulate, throw, or crush objects and creatures.',
  },
  'telepathy': {
    id: 'telepathy',
    name: 'Telepathy',
    category: 'psionic-domain',
    description: 'Psionic abilities for mental communication.',
    rulesText: 'Telepathy is the psionic domain of mental communication. It allows silent communication and reading surface thoughts.',
  },
  'resopathy': {
    id: 'resopathy',
    name: 'Resopathy',
    category: 'psionic-domain',
    description: 'Psionic abilities that affect physical matter.',
    rulesText: 'Resopathy is the psionic domain of matter manipulation. It can alter the physical properties of objects and materials.',
  },

  // Special Keywords
  'charge': {
    id: 'charge',
    name: 'Charge',
    category: 'special',
    description: 'A rushing attack with extra momentum.',
    rulesText: 'When a creature takes the Charge main action, they move up to their speed in a straight line, then make a melee free strike against a target when they end their move. If the creature has an ability with the Charge keyword, they can use that ability against the target instead of a free strike.',
  },
  'resistance': {
    id: 'resistance',
    name: 'Resistance',
    category: 'special',
    description: 'Reduced damage from a specific source.',
    rulesText: 'When a creature has resistance to a damage type, they reduce damage of that type by the resistance value. Resistance is applied after other damage modifications.',
  },
};

// Get keyword by ID (case-insensitive)
export const getKeywordById = (id: string): KeywordDefinition | undefined => {
  const normalizedId = id.toLowerCase().replace(/\s+/g, '-');
  return KEYWORDS[normalizedId];
};

// Get keyword by name (case-insensitive)
export const getKeywordByName = (name: string): KeywordDefinition | undefined => {
  const normalized = name.toLowerCase();
  return Object.values(KEYWORDS).find(k => k.name.toLowerCase() === normalized);
};

// Get all keywords in a category
export const getKeywordsByCategory = (category: KeywordCategory): KeywordDefinition[] => {
  return Object.values(KEYWORDS).filter(k => k.category === category);
};

// Category display names
export const KEYWORD_CATEGORY_NAMES: Record<KeywordCategory, string> = {
  'attack-type': 'Attack Type',
  'range': 'Range',
  'damage-type': 'Damage Type',
  'power-source': 'Power Source',
  'psionic-domain': 'Psionic Domain',
  'special': 'Special',
  'action': 'Action',
};
