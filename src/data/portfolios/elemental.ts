import { MinionTemplate, FixtureTemplate, Portfolio, ChampionTemplate } from '../../types';

// =============================================================================
// ELEMENTAL PORTFOLIO - Draw Steel Compendium
// =============================================================================

// -----------------------------------------------------------------------------
// SIGNATURE MINIONS (1 Essence each)
// -----------------------------------------------------------------------------

const elementalMote: MinionTemplate = {
  id: 'elemental_mote',
  name: 'Elemental Mote',
  essenceCost: 1,
  minionsPerSummon: 1,
  size: '1T',
  speed: 5,
  stamina: 1,
  stability: 0,
  freeStrike: 1,
  characteristics: { might: 0, agility: 0, reason: 0, intuition: 0, presence: 2 },
  role: 'hexer',
  keywords: ['Elemental'],
  immunities: [],
  weaknesses: [],
  movementModes: ['Fly'],
  freeStrikeDamageType: 'untyped',
  traits: [
    { name: 'Dweomer Burst', description: 'When the mote is reduced to 0 Stamina, each enemy adjacent to the mote has a bane on their next strike.' },
    { name: 'Catalyst', description: 'Once per turn, the mote can transform into an adjacent allied signature minion, maintaining current Stamina. Alternatively, you can spend 1 essence to transform the mote into any signature minion in the elemental portfolio you do not have, as if you summoned the new minion into the mote\'s space.' },
  ],
};

const briskGale: MinionTemplate = {
  id: 'elemental_brisk_gale',
  name: 'Brisk Gale',
  essenceCost: 1,
  minionsPerSummon: 1,
  size: '1S',
  speed: 5,
  stamina: 2,
  stability: 0,
  freeStrike: 1,
  characteristics: { might: -2, agility: 2, reason: 0, intuition: 0, presence: 1 },
  role: 'harrier',
  keywords: ['Elemental', 'Air'],
  immunities: [{ type: 'sonic', value: undefined }],
  weaknesses: [],
  movementModes: ['Fly'],
  freeStrikeDamageType: 'sonic',
  traits: [
    { name: 'Cutting the Air', description: 'The gale doesn\'t provoke opportunity attacks by moving.' },
    { name: 'Whirlwind', description: 'When the gale is reduced to 0 Stamina, winds whip in their space until the end of the encounter. You or an ally that enters this space or starts their turn there can immediately shift, including vertically.' },
  ],
};

const firePlume: MinionTemplate = {
  id: 'elemental_fire_plume',
  name: 'Fire Plume',
  essenceCost: 1,
  minionsPerSummon: 1,
  size: '1T',
  speed: 5,
  stamina: 1,
  stability: 0,
  freeStrike: 2,
  characteristics: { might: -2, agility: 1, reason: 0, intuition: 0, presence: 2 },
  role: 'artillery',
  keywords: ['Elemental', 'Fire'],
  immunities: [{ type: 'fire', value: undefined }],
  weaknesses: [],
  movementModes: [],
  freeStrikeDamageType: 'fire',
  traits: [
    { name: 'Spitfire Strike', description: "The plume's ranged free strikes have a distance of 10." },
    { name: 'Pyre', description: 'When the plume is reduced to 0 Stamina, their space becomes wreathed in flames until the end of the encounter. An enemy that enters this space or starts their turn there takes 2 fire damage.' },
  ],
};

const walkingBoulder: MinionTemplate = {
  id: 'elemental_walking_boulder',
  name: 'Walking Boulder',
  essenceCost: 1,
  minionsPerSummon: 1,
  size: '2',
  speed: 4,
  stamina: 3,
  stability: 0,
  freeStrike: 1,
  characteristics: { might: 2, agility: -2, reason: 0, intuition: 0, presence: 1 },
  role: 'defender',
  keywords: ['Elemental', 'Earth'],
  immunities: [],
  weaknesses: [],
  movementModes: ['Climb'],
  freeStrikeDamageType: 'untyped',
  traits: [
    { name: 'Obstruct', description: 'The boulder obstructs line of effect for enemies. Pile Up 1 Essence: When one or more boulders is reduced to 0 Stamina, they each leave behind a stone wall equal to their size in their space until the end of the encounter.' },
  ],
};

// -----------------------------------------------------------------------------
// 3-ESSENCE MINIONS (Summon 2)
// -----------------------------------------------------------------------------

const cruxOfAsh: MinionTemplate = {
  id: 'elemental_crux_of_ash',
  name: 'Crux of Ash',
  essenceCost: 3,
  minionsPerSummon: 2,
  size: '1M',
  speed: 5,
  stamina: 6,
  stability: 0,
  freeStrike: 5,
  characteristics: { might: -2, agility: -2, reason: 0, intuition: 0, presence: 1 },
  role: 'ambusher',
  keywords: ['Elemental', 'Fire', 'Air'],
  immunities: [{ type: 'fire', value: undefined }, { type: 'sonic', value: undefined }],
  weaknesses: [],
  movementModes: ['Fly'],
  freeStrikeDamageType: 'untyped',
  traits: [
    { name: 'Soot Strike', description: "The crux's free strikes don't deal damage. Instead, the target is blinded (EoT)." },
  ],
};

const flowOfMagma: MinionTemplate = {
  id: 'elemental_flow_of_magma',
  name: 'Flow of Magma',
  essenceCost: 3,
  minionsPerSummon: 2,
  size: '1L',
  speed: 5,
  stamina: 6,
  stability: 2,
  freeStrike: 4,
  characteristics: { might: 2, agility: -2, reason: 0, intuition: 0, presence: 1 },
  role: 'harrier',
  keywords: ['Elemental', 'Fire', 'Earth'],
  immunities: [{ type: 'fire', value: undefined }],
  weaknesses: [],
  movementModes: ['Climb'],
  freeStrikeDamageType: 'fire',
  traits: [],
};

const desolationOfSand: MinionTemplate = {
  id: 'elemental_desolation_of_sand',
  name: 'Desolation of Sand',
  essenceCost: 3,
  minionsPerSummon: 2,
  size: '1M',
  speed: 5,
  stamina: 5,
  stability: 1,
  freeStrike: 4,
  characteristics: { might: 1, agility: 2, reason: 0, intuition: 0, presence: -2 },
  role: 'hexer',
  keywords: ['Elemental', 'Air', 'Earth'],
  immunities: [{ type: 'sonic', value: undefined }],
  weaknesses: [],
  movementModes: ['Burrow'],
  freeStrikeDamageType: 'untyped',
  traits: [
    { name: 'Burying Strike', description: "The desolation's free strikes inflict slowed (save ends). If the target is already slowed, then they are restrained (EoT)." },
    { name: "Sand Through Your Fingers", description: "The desolation doesn't provoke opportunity attacks by moving. Shifting Sand Pit 1 Essence: When the desolation is reduced to 0 Stamina, the area within 1 square of the desolation becomes difficult terrain for enemies until the end of the encounter. You or an ally that enters the affected area can immediately shift 3." },
  ],
};

// -----------------------------------------------------------------------------
// 5-ESSENCE MINIONS (Summon 3)
// -----------------------------------------------------------------------------

const dancingSilk: MinionTemplate = {
  id: 'elemental_dancing_silk',
  name: 'Dancing Silk',
  essenceCost: 5,
  minionsPerSummon: 3,
  size: '1T',
  speed: 5,
  stamina: 4,
  stability: 0,
  freeStrike: 3,
  characteristics: { might: -1, agility: 2, reason: 3, intuition: 0, presence: -1 },
  role: 'controller',
  keywords: ['Elemental', 'Earth', 'Air', 'Green'],
  immunities: [{ type: 'poison', value: undefined }],
  weaknesses: [],
  movementModes: ['Fly'],
  freeStrikeDamageType: 'untyped',
  traits: [
    { name: 'Entangling Strike', description: "The silk's ranged free strikes inflict restrained (EoT). Each creature adjacent to the target is slowed (EoT). Web 1 Essence: When the silk is reduced to 0 Stamina, they launch ribbons of webbing into an area equal to their size + 1 within 5 before being destroyed. The affected area is considered difficult terrain for enemies until the end of the encounter. An enemy that ends their turn in the webbing is slowed (EoT)." },
  ],
};

const principleOfTheSwamp: MinionTemplate = {
  id: 'elemental_principle_of_the_swamp',
  name: 'Principle of the Swamp',
  essenceCost: 5,
  minionsPerSummon: 3,
  size: '2',
  speed: 4,
  stamina: 5,
  stability: 0,
  freeStrike: 4,
  characteristics: { might: 3, agility: -2, reason: 0, intuition: 2, presence: -2 },
  role: 'brute',
  keywords: ['Elemental', 'Green', 'Water', 'Rot'],
  immunities: [{ type: 'corruption', value: undefined }, { type: 'poison', value: undefined }],
  weaknesses: [],
  movementModes: ['Swim'],
  freeStrikeDamageType: 'untyped',
  traits: [],
};

const quietOfSnow: MinionTemplate = {
  id: 'elemental_quiet_of_snow',
  name: 'Quiet of Snow',
  essenceCost: 5,
  minionsPerSummon: 3,
  size: '1S',
  speed: 5,
  stamina: 4,
  stability: 1,
  freeStrike: 4,
  characteristics: { might: -1, agility: 2, reason: 0, intuition: 0, presence: 3 },
  role: 'artillery',
  keywords: ['Elemental', 'Air', 'Rot', 'Water'],
  immunities: [{ type: 'sonic', value: undefined }, { type: 'cold', value: undefined }],
  weaknesses: [],
  movementModes: ['Fly', 'Hover'],
  freeStrikeDamageType: 'cold',
  traits: [
    { name: 'Cold Surge', description: 'When the quiet is reduced to 0 Stamina, they launch a refreshing blast of air into an area equal to their size + 1 within 5 before being destroyed. Each ally in the affected area gains a surge.' },
  ],
};

// -----------------------------------------------------------------------------
// 7-ESSENCE MINIONS
// -----------------------------------------------------------------------------

const ironReaver: MinionTemplate = {
  id: 'elemental_iron_reaver',
  name: 'Iron Reaver',
  essenceCost: 7,
  minionsPerSummon: 3,
  size: '1L',
  speed: 6,
  stamina: 10,
  stability: 0,
  freeStrike: 6,
  characteristics: { might: 3, agility: 4, reason: 0, intuition: 0, presence: -1 },
  role: 'harrier',
  keywords: ['Elemental', 'Earth', 'Fire', 'Void'],
  immunities: [{ type: 'poison', value: undefined }],
  weaknesses: [],
  movementModes: ['Burrow'],
  freeStrikeDamageType: 'untyped',
  traits: [
    { name: 'Decentralized Segments', description: 'The reaver has cover while adjacent to another reaver they were summoned with. Whenever they receive an effect that allows them to move or shift outside of their move action, they share the effect with each adjacent reaver they were summoned with.' },
    { name: 'Bladed Strike', description: "The reaver's free strikes inflict bleeding (save ends). Each time the reaver inflicts bleeding on a creature, they can shift 2 and make an additional free strike on a new target. Iron Barricade 1 Essence: When the reaver is reduced to 0 Stamina, they create a line equal to 2 × their size centered on their space of iron shards on the ground until the end of the encounter. You or any ally has cover and damage immunity 2 while occupying an affected square." },
  ],
};

const knightOfBlood: MinionTemplate = {
  id: 'elemental_knight_of_blood',
  name: 'Knight of Blood',
  essenceCost: 7,
  minionsPerSummon: 2,
  size: '1L',
  speed: 6,
  stamina: 16,
  stability: 0,
  freeStrike: 7,
  characteristics: { might: 4, agility: 2, reason: 0, intuition: 0, presence: 3 },
  role: 'controller',
  keywords: ['Elemental', 'Earth', 'Fire', 'Rot', 'Water'],
  immunities: [{ type: 'corruption', value: undefined }],
  weaknesses: [],
  movementModes: [],
  freeStrikeDamageType: 'corruption',
  traits: [],
};

const lightOfTheSun: MinionTemplate = {
  id: 'elemental_light_of_the_sun',
  name: 'Light of the Sun',
  essenceCost: 7,
  minionsPerSummon: 2,
  size: '2',
  speed: 6,
  stamina: 17,
  stability: 0,
  freeStrike: 7,
  characteristics: { might: 0, agility: 2, reason: 4, intuition: 0, presence: 3 },
  role: 'support',
  keywords: ['Elemental', 'Air', 'Green', 'Fire', 'Void'],
  immunities: [{ type: 'corruption', value: undefined }, { type: 'fire', value: undefined }],
  weaknesses: [],
  movementModes: ['Fly'],
  freeStrikeDamageType: 'fire',
  traits: [],
};

// -----------------------------------------------------------------------------
// FIXTURE: Primordial Crystal
// -----------------------------------------------------------------------------

const primordialCrystal: FixtureTemplate = {
  id: 'fixture_primordial_crystal',
  name: 'Primordial Crystal',
  portfolioType: 'elemental',
  role: 'Relic Artillery',
  flavorText: 'The storm of elements from Quintessence coalesce into a hardened, crystalline structure. It magnifies the elemental composition of any matter that passes through it and emits supernatural colors while doing so.',
  baseStamina: 20,
  size: 2,
  traits: [
    {
      name: 'Magnetic Pull',
      description: 'Each enemy that starts their turn within 3 squares of the crystal is vertically pulled 3.',
    },
    {
      name: 'Elemental Boost',
      description: 'When you or an ally uses a ranged ability that draws a line through the crystal, the distance increases by 5.',
    },
  ],
  level5Feature: {
    id: 'primordial_crystal_level5',
    name: 'Terra Resonance',
    description: 'Each round, you gain a surge the first time an area of terrain gains a supernatural effect (excluding auras) while you have line of effect to the crystal. You can choose to give the surge to an ally who also has line of effect to the crystal.',
    levelRequired: 5,
  },
  level9Features: [
    {
      id: 'primordial_crystal_level9_size',
      name: 'Size Increase',
      description: 'The crystal is now size 3.',
      levelRequired: 9,
    },
    {
      id: 'primordial_crystal_level9_magnified',
      name: 'Magnified Strike',
      description: 'When you or an ally makes a ranged strike that draws a line through the crystal, the user gains a surge which they can use on the ability.',
      levelRequired: 9,
    },
  ],
};

// -----------------------------------------------------------------------------
// COMPLETE PORTFOLIO
// -----------------------------------------------------------------------------

const dragonsPortent: ChampionTemplate = {
  id: 'elemental_dragons_portent',
  name: "Dragon's Portent",
  portfolioType: 'elemental',
  description: 'A Portent of a dragon yet to manifest, lending elemental ruin and control to your army.',
  essenceCost: 9,
  size: '2',
  speed: 6,
  stamina: 0,
  stability: 4,
  freeStrike: 9,
  characteristics: { might: 2, agility: 2, reason: 5, intuition: 5, presence: 2 },
  role: 'controller',
  keywords: ['Champion', 'Dragon', 'Elemental'],
  immunities: [{ type: 'varies', value: 5 }],
  weaknesses: [],
  movementModes: ['Fly'],
  freeStrikeDamageType: 'varies',
  signatureAbility: {
    id: 'dragons_portent_elemental_tail_swing',
    name: 'Elemental Tail Swing',
    actionType: 'action',
    keywords: ['Charge', 'Melee', 'Strike', 'Weapon'],
    distance: 'Melee 2',
    target: 'Two creatures or objects',
    powerRoll: {
      characteristic: 'reason',
      tier1: '9 affinity damage; push 2',
      tier2: '12 affinity damage; push 4',
      tier3: '14 affinity damage; push 6',
    },
    effect: '',
  },
  traits: [
    { name: 'Affinity', description: 'When summoned, choose acid, cold, corruption, fire, lightning, or poison. This determines the Portent\'s affinity immunity and ability damage type.' },
    { name: 'Sealing Strike', description: 'The Portent\'s free strikes inflict M < Strong slowed (save ends). While slowed this way, the target takes 1d6 affinity damage at the start of each of their turns.' },
    { name: 'Champion\'s Ire', description: 'If the Portent only targets one creature or object with a strike, they deal additional damage to the target equal to your Reason.' },
    { name: 'Searing Wyrmscale', description: 'Whenever an adjacent creature deals damage to the Portent, they take 4 affinity damage.' },
    { name: 'Dragon Heart', description: 'Once per turn, the Portent can take 10 irreducible damage to allow you or an ally within Summoner\'s Range to gain 1 heroic resource.' },
    { name: 'Level 10: A Breath Felt in a Hurricane', description: '1 Eidos, Champion Action: 4 cube within 10. Each enemy and object takes 9 affinity damage that ignores immunity. The area becomes difficult terrain, and enemies have affinity weakness 5 while occupying it.' },
  ],
};

export const elementalPortfolio: Portfolio = {
  type: 'elemental',
  signatureMinions: [elementalMote, briskGale, firePlume, walkingBoulder],
  unlockedMinions: [
    cruxOfAsh, flowOfMagma, desolationOfSand,
    dancingSilk, principleOfTheSwamp, quietOfSnow,
    ironReaver, knightOfBlood, lightOfTheSun,
  ],
  fixture: primordialCrystal,
  champion: dragonsPortent,
};
