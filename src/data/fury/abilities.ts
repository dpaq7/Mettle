// Fury class abilities
import { Ability } from '../../types/abilities';

export const furyAbilities: Ability[] = [
  // Signature Abilities (No cost)
  {
    id: 'brutal-slam',
    name: 'Brutal Slam',
    flavorText: 'You slam into your foe with devastating force.',
    actionType: 'action',
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '2 + M damage; push 1',
      tier2: '6 + M damage; push 2',
      tier3: '9 + M damage; push 4',
    },
    effect: 'You push the target back based on your power roll tier.',
  },
  {
    id: 'hit-and-run',
    name: 'Hit and Run',
    flavorText: 'Strike swiftly and retreat before they can retaliate.',
    actionType: 'action',
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '2 + M damage',
      tier2: '6 + M damage',
      tier3: '9 + M damage; slowed (save ends)',
    },
    effect: 'After the attack, you can shift 1 square.',
  },
  {
    id: 'impaled',
    name: 'Impaled!',
    flavorText: 'Your weapon finds its mark and refuses to let go.',
    actionType: 'action',
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '2 + M damage',
      tier2: '6 + M damage; grabbed (M < Strong)',
      tier3: '9 + M damage; grabbed',
    },
    effect: 'On a successful grab, the target is impaled on your weapon.',
  },
  {
    id: 'to-the-death',
    name: 'To the Death!',
    flavorText: 'You challenge your foe to mutual destruction.',
    actionType: 'action',
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '2 + M damage',
      tier2: '6 + M damage',
      tier3: '9 + M damage',
    },
    effect: "You gain 2 surges. The target can make a free opportunity attack against you.",
  },

  // 3-Ferocity Abilities
  {
    id: 'back',
    name: 'Back!',
    flavorText: 'You force everyone away with primal fury.',
    actionType: 'action',
    essenceCost: 3,
    keywords: ['Area', 'Weapon'],
    distance: '1 burst',
    target: 'All enemies in burst',
    powerRoll: {
      characteristic: 'might',
      tier1: '2 + M damage; push 1',
      tier2: '4 + M damage; push 2',
      tier3: '6 + M damage; push 3',
    },
    effect: 'You push all enemies away from you.',
  },
  {
    id: 'out-of-the-way',
    name: 'Out of the Way!',
    flavorText: 'You hurl your foe aside and take their place.',
    actionType: 'action',
    essenceCost: 3,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '2 + M damage; slide 2',
      tier2: '6 + M damage; slide 3',
      tier3: '9 + M damage; slide 5',
    },
    effect: 'You can move into any squares the target leaves. If the target takes damage from another source during the slide, you take equal damage.',
  },
  {
    id: 'your-entrails-are-your-extrails',
    name: 'Your Entrails Are Your Extrails!',
    flavorText: 'A vicious strike that leaves your foe bleeding.',
    actionType: 'action',
    essenceCost: 3,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '2 + M damage; bleeding (save ends, M < Weak)',
      tier2: '6 + M damage; bleeding (save ends, M < Average)',
      tier3: '9 + M damage; bleeding (save ends)',
    },
    effect: 'While bleeding, the target takes damage equal to your Might at the end of each of their turns.',
  },

  // 5-Ferocity Abilities
  {
    id: 'blood-for-blood',
    name: 'Blood for Blood!',
    flavorText: 'You trade your own vitality for devastating power.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '4 + M damage; bleeding (save ends, M < Weak)',
      tier2: '8 + M damage; bleeding (save ends, M < Average)',
      tier3: '12 + M damage; bleeding and weakened (save ends)',
    },
    effect: 'You can deal 1d6 damage to yourself to add 1d6 damage to the attack.',
  },
  {
    id: 'make-peace-with-your-god',
    name: 'Make Peace With Your God!',
    flavorText: 'You channel absolute conviction into your next strike.',
    actionType: 'freeManeuver',
    essenceCost: 5,
    keywords: ['Fury'],
    distance: 'Self',
    target: 'Self',
    effect: 'Gain 1 surge. Your next ability roll this turn achieves at least a Tier 3 outcome.',
  },
  {
    id: 'to-the-uttermost-end',
    name: 'To the Uttermost End',
    flavorText: 'You strike with everything you have left.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '6 + M damage',
      tier2: '10 + M damage',
      tier3: '14 + M damage',
    },
    effect: 'You can spend 1+ additional Ferocity to deal extra 1d6 (if winded) or 1d10 (if dying) damage per Ferocity spent. You lose 1d6 Stamina.',
  },

  // 7-Ferocity Abilities
  {
    id: 'demon-unleashed',
    name: 'Demon Unleashed',
    flavorText: 'Your fury becomes a palpable aura of terror.',
    actionType: 'maneuver',
    essenceCost: 7,
    keywords: ['Aura', 'Fear', 'Fury'],
    distance: 'Self (3 aura)',
    target: 'Self',
    effect: 'Until the end of the encounter, adjacent enemies with Presence < Strong are frightened of you until the end of their turn.',
  },
  {
    id: 'face-the-storm',
    name: 'Face the Storm!',
    flavorText: 'You become an unstoppable force of nature.',
    actionType: 'maneuver',
    essenceCost: 7,
    keywords: ['Fury', 'Stance'],
    distance: 'Self',
    target: 'Self',
    effect: "Your melee strikes taunt foes (Presence < Victories, end of turn). Strikes against taunted foes deal extra 2xMight damage and have +1 potency.",
  },
  {
    id: 'you-are-already-dead',
    name: 'You Are Already Dead',
    flavorText: "Your strike seals your enemy's fate.",
    actionType: 'action',
    essenceCost: 7,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: 'See effect',
      tier2: 'See effect',
      tier3: 'See effect',
    },
    effect: 'Non-leader/solo creatures are reduced to 0 Stamina at the end of their next turn. Leader/solo creatures grant you 3 surges and a free strike instead.',
  },

  // 9-Ferocity Abilities
  {
    id: 'debilitating-strike',
    name: 'Debilitating Strike',
    flavorText: 'Each step becomes agony for your victim.',
    actionType: 'action',
    essenceCost: 9,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '8 + M damage; slowed (save ends)',
      tier2: '12 + M damage; slowed (save ends)',
      tier3: '16 + M damage; slowed (save ends)',
    },
    effect: 'Slowed targets take 1 damage per square they move.',
  },
  {
    id: 'to-stone',
    name: 'To Stone!',
    flavorText: 'Your fury petrifies the weak-willed.',
    actionType: 'action',
    essenceCost: 9,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '8 + M damage; slowed (save ends)',
      tier2: '12 + M damage; slowed (save ends)',
      tier3: '16 + M damage; restrained (M < Strong, save ends)',
    },
    effect: 'Restrained targets turn to stone permanently if they fail their save.',
  },

  // 11-Ferocity Abilities
  {
    id: 'overkill',
    name: 'Overkill',
    flavorText: 'Excessive force is just enough force.',
    actionType: 'action',
    essenceCost: 11,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '12 + M damage',
      tier2: '18 + M damage',
      tier3: '24 + M damage',
    },
    effect: 'Non-leader/solo or minion/winded creatures are reduced to 0 Stamina before damage is dealt. Excess damage transfers to an adjacent foe.',
  },
  {
    id: 'relentless-death',
    name: 'Relentless Death',
    flavorText: 'You become death incarnate, harvesting all in your path.',
    actionType: 'action',
    essenceCost: 11,
    keywords: ['Area', 'Movement'],
    distance: 'Self (shift up to speed)',
    target: 'All enemies you move adjacent to',
    effect: 'You deal 2xMight damage to all enemies you move adjacent to. Non-leader/solo creatures below 8/11/17 Stamina (by tier) are killed instantly.',
  },
];

export const getAbilityById = (id: string): Ability | undefined => {
  return furyAbilities.find(a => a.id === id);
};

export const getAbilitiesByCost = (maxCost: number): Ability[] => {
  return furyAbilities.filter(a => (a.essenceCost || 0) <= maxCost);
};

export const getSignatureAbilities = (): Ability[] => {
  return furyAbilities.filter(a => !a.essenceCost || a.essenceCost === 0);
};

export const getHeroicAbilities = (): Ability[] => {
  return furyAbilities.filter(a => a.essenceCost && a.essenceCost > 0);
};

// ============================================================
// ASPECT-SPECIFIC ABILITIES
// ============================================================

// Berserker 5-Ferocity Abilities
export const berserkerFiveFerocityAbilities: Ability[] = [
  {
    id: 'crushing-blow',
    name: 'Crushing Blow',
    flavorText: 'Your blow shatters defenses and sends your foe sprawling.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '4 + M damage',
      tier2: '8 + M damage; push 2',
      tier3: '12 + M damage; push 2 and prone (M > S)',
    },
    effect: 'You deliver a crushing blow that can knock your target prone.',
  },
  {
    id: 'rampage',
    name: 'Rampage',
    flavorText: 'You charge through your enemies, striking all in your path.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Melee', 'Movement', 'Weapon'],
    distance: 'Self',
    target: 'Each enemy you move adjacent to',
    effect: 'Move up to your speed. Make a free strike against each enemy you move adjacent to during this movement.',
  },
];

// Reaver 5-Ferocity Abilities
export const reaverFiveFerocityAbilities: Ability[] = [
  {
    id: 'shadow-strike',
    name: 'Shadow Strike',
    flavorText: 'You strike from the shadows and vanish once more.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'agility',
      tier1: '4 + A damage',
      tier2: '8 + A damage',
      tier3: '12 + A damage',
    },
    effect: 'After the attack, you become hidden until the end of your turn.',
  },
  {
    id: 'whirlwind',
    name: 'Whirlwind',
    flavorText: 'You spin in a deadly arc, scattering enemies like leaves.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Area', 'Weapon'],
    distance: '1 burst',
    target: 'All enemies in burst',
    powerRoll: {
      characteristic: 'agility',
      tier1: '3 + A damage',
      tier2: '5 + A damage; slide 1',
      tier3: '7 + A damage; slide 1',
    },
    effect: 'You can slide each enemy hit 1 square.',
  },
];

// Stormwight 5-Ferocity Abilities
export const stormwightFiveFerocityAbilities: Ability[] = [
  {
    id: 'storm-charge',
    name: 'Storm Charge',
    flavorText: 'You surge forward wreathed in primordial energy.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Melee', 'Movement', 'Strike', 'Weapon'],
    distance: 'Self + Melee 1',
    target: 'One creature',
    effect: 'Shift up to your speed in animal or hybrid form. Make a free strike with Primordial Storm damage against the first enemy you reach.',
  },
  {
    id: 'primal-howl',
    name: 'Primal Howl',
    flavorText: 'Your terrifying howl carries the fury of the primordial storms.',
    actionType: 'action',
    essenceCost: 5,
    keywords: ['Area', 'Fear', 'Primordial'],
    distance: '3 burst',
    target: 'All enemies in burst',
    powerRoll: {
      characteristic: 'might',
      tier1: 'M Primordial Storm damage',
      tier2: 'M Primordial Storm damage; frightened (EoT, P < M)',
      tier3: 'M Primordial Storm damage; frightened (save ends, P < M)',
    },
    effect: 'Enemies are frightened of you and take Primordial Storm damage.',
  },
];

// Berserker 9-Ferocity Abilities
export const berserkerNineFerocityAbilities: Ability[] = [
  {
    id: 'meteor-smash',
    name: 'Meteor Smash',
    flavorText: 'You leap into the air and crash down like a meteor.',
    actionType: 'action',
    essenceCost: 9,
    keywords: ['Area', 'Jump', 'Weapon'],
    distance: 'Self + 1 burst',
    target: 'All adjacent enemies after landing',
    effect: 'Jump up to your speed and land in an unoccupied square. All adjacent enemies take 3xM damage and are pushed 3 squares.',
  },
  {
    id: 'unstoppable-onslaught',
    name: 'Unstoppable Onslaught',
    flavorText: 'Nothing can stop your advance.',
    actionType: 'maneuver',
    essenceCost: 9,
    keywords: ['Self', 'Stance'],
    distance: 'Self',
    target: 'Self',
    effect: 'Until end of turn, you cannot be slowed, immobilized, or restrained. Your forced movement distance doubles.',
  },
];

// Reaver 9-Ferocity Abilities
export const reaverNineFerocityAbilities: Ability[] = [
  {
    id: 'assassinate',
    name: 'Assassinate',
    flavorText: 'A single, perfect strike ends your target.',
    actionType: 'action',
    essenceCost: 9,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One surprised or unaware creature',
    powerRoll: {
      characteristic: 'agility',
      tier1: '2xA damage',
      tier2: '4xA damage; bleeding (save ends)',
      tier3: '4xA damage; bleeding (save ends)',
    },
    effect: 'Can only target surprised or unaware enemies. Target is bleeding on tier 2+.',
  },
  {
    id: 'blur-of-blades',
    name: 'Blur of Blades',
    flavorText: 'Your weapons move faster than the eye can follow.',
    actionType: 'action',
    essenceCost: 9,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'Up to 3 different enemies',
    effect: 'Make 3 free strikes against different enemies within reach. You can shift 1 square between each strike.',
  },
];

// Stormwight 9-Ferocity Abilities
export const stormwightNineFerocityAbilities: Ability[] = [
  {
    id: 'unleash-the-storm',
    name: 'Unleash the Storm',
    flavorText: 'You release the full fury of your primordial storm.',
    actionType: 'action',
    essenceCost: 9,
    keywords: ['Area', 'Primordial'],
    distance: '5 burst',
    target: 'All enemies in burst',
    effect: 'All enemies in the burst take 2xM Primordial Storm damage and are pushed 3 squares.',
  },
  {
    id: 'apex-hunter',
    name: 'Apex Hunter',
    flavorText: 'Your primal senses become supernaturally keen.',
    actionType: 'maneuver',
    essenceCost: 9,
    keywords: ['Self', 'Stance', 'Primordial'],
    distance: 'Self',
    target: 'Self',
    effect: 'Until encounter end, you have blindsense 5 and your animal/hybrid form strikes deal extra Primordial Storm damage equal to M.',
  },
];

// Berserker 11-Ferocity Abilities
export const berserkerElevenFerocityAbilities: Ability[] = [
  {
    id: 'world-breaker',
    name: 'World Breaker',
    flavorText: 'Your blow shatters the very earth.',
    actionType: 'action',
    essenceCost: 11,
    keywords: ['Melee', 'Strike', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: '3xM damage',
      tier2: '5xM damage',
      tier3: '5xM damage; terrain effect',
    },
    effect: 'The ground in a 3 burst becomes difficult terrain. Structures and objects take triple damage.',
  },
  {
    id: 'incarnation-of-might',
    name: 'Incarnation of Might',
    flavorText: 'You become a giant among mortals.',
    actionType: 'maneuver',
    essenceCost: 11,
    keywords: ['Self', 'Transformation'],
    distance: 'Self',
    target: 'Self',
    effect: 'Until encounter end, your size increases by 1, you gain +5 stability, and forced movement you impose doubles.',
  },
];

// Reaver 11-Ferocity Abilities
export const reaverElevenFerocityAbilities: Ability[] = [
  {
    id: 'death-from-shadows',
    name: 'Death From Shadows',
    flavorText: 'You emerge from darkness to deliver a killing blow.',
    actionType: 'action',
    essenceCost: 11,
    keywords: ['Melee', 'Strike', 'Teleport', 'Weapon'],
    distance: 'Teleport + Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'agility',
      tier1: '3xA damage',
      tier2: '5xA damage; bleeding and slowed (save ends both)',
      tier3: '5xA damage; bleeding and slowed (save ends both)',
    },
    effect: 'If hidden, teleport up to your speed to an enemy. Target is bleeding and slowed.',
  },
  {
    id: 'phantom-dance',
    name: 'Phantom Dance',
    flavorText: 'You move like a ghost, impossible to pin down.',
    actionType: 'maneuver',
    essenceCost: 11,
    keywords: ['Self', 'Stance'],
    distance: 'Self',
    target: 'Self',
    effect: 'Until encounter end, after taking damage you can shift 2 squares and become hidden. Attacks against you have bane.',
  },
];

// Stormwight 11-Ferocity Abilities
export const stormwightElevenFerocityAbilities: Ability[] = [
  {
    id: 'avatar-of-the-storm',
    name: 'Avatar of the Storm',
    flavorText: 'You become one with the primordial storm.',
    actionType: 'maneuver',
    essenceCost: 11,
    keywords: ['Self', 'Aura', 'Primordial'],
    distance: 'Self (3 aura)',
    target: 'Self',
    effect: 'Until encounter end, allies within 3 squares gain Primordial Storm immunity 10. Enemies within 3 take M Primordial Storm damage at your turn end.',
  },
  {
    id: 'primordial-annihilation',
    name: 'Primordial Annihilation',
    flavorText: 'You unleash a devastating line of primordial energy.',
    actionType: 'action',
    essenceCost: 11,
    keywords: ['Area', 'Primordial'],
    distance: '10 line',
    target: 'All creatures in line',
    effect: 'All creatures in the line take 4xM Primordial Storm damage. You can shift into your animal form as part of this action.',
  },
];

// Get aspect-specific abilities by cost
export const getAspectAbilitiesByCost = (aspect: string, cost: 5 | 9 | 11): Ability[] => {
  switch (aspect) {
    case 'berserker':
      if (cost === 5) return berserkerFiveFerocityAbilities;
      if (cost === 9) return berserkerNineFerocityAbilities;
      if (cost === 11) return berserkerElevenFerocityAbilities;
      break;
    case 'reaver':
      if (cost === 5) return reaverFiveFerocityAbilities;
      if (cost === 9) return reaverNineFerocityAbilities;
      if (cost === 11) return reaverElevenFerocityAbilities;
      break;
    case 'stormwight':
      if (cost === 5) return stormwightFiveFerocityAbilities;
      if (cost === 9) return stormwightNineFerocityAbilities;
      if (cost === 11) return stormwightElevenFerocityAbilities;
      break;
  }
  return [];
};
