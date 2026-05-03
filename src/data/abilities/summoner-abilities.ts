import { Ability } from '../../types';

const essenceCost = (amount: number, isVariable = false) => ({
  essenceCost: amount,
  cost: { resource: 'Essence' as const, amount, isVariable },
});

// Level 1 class abilities
export const summonerStrike: Ability = {
  id: 'summoner_strike',
  name: 'Summoner Strike',
  flavorText: 'You channel a strike through your summoned army.',
  minLevel: 1,
  actionType: 'action',
  keywords: ['Magic', 'Melee', 'Ranged', 'Strike'],
  distance: 'Melee 1 or Ranged 5',
  target: 'One creature or object',
  powerRoll: {
    characteristic: 'reason',
    tier1: 'R damage',
    tier2: 'R damage',
    tier3: 'R damage',
  },
  effect:
    'If the target has R < Weak, the target is slowed (save ends). At 3rd level, damage becomes twice your Reason and distance becomes your Summoner\'s Range. At 9th level, potency becomes R < Strong. Special: This ability has the Charge keyword when used as a melee strike.',
};

export const strikeForMe: Ability = {
  id: 'strike_for_me',
  name: 'Strike For Me',
  flavorText: 'You direct your minions to act in your place.',
  minLevel: 1,
  actionType: 'freeTriggered',
  trigger: 'You use a triggered action to make a free strike or use a signature ability.',
  keywords: ['Magic'],
  distance: 'Summoner\'s Range',
  target: 'Your minions',
  powerRoll: {
    characteristic: 'reason',
    tier1: 'Up to three targets each make a free strike.',
    tier2: 'Up to five targets each make a free strike.',
    tier3: 'Up to seven targets each make a free strike.',
  },
  effect:
    'The targets act in place of you. Natural 19 or 20: each target can make a free strike.',
};

export const minionBridge: Ability = {
  id: 'minion_bridge',
  name: 'Minion Bridge',
  flavorText: 'Your summons become a route across the battlefield.',
  minLevel: 1,
  actionType: 'maneuver',
  keywords: [],
  distance: 'Melee 1',
  target: 'One of your minions',
  effect:
    'You shift into a square adjacent to the target, including vertically. You can shift into squares that contain one of your minions, even if they occupy difficult terrain. Each time you shift into a square containing one of your minions while using this maneuver, you can shift 1 additional square.',
  additionalEffects: [{ cost: '1 Essence', description: 'An adjacent ally can shift alongside you during this movement and must end adjacent to the last minion you moved through.' }],
};

export const callForth: Ability = {
  id: 'call_forth',
  name: 'Call Forth',
  flavorText: 'You summon minions from your portfolio.',
  minLevel: 1,
  actionType: 'action',
  ...essenceCost(1, true),
  keywords: ['Magic'],
  distance: 'Summoner\'s Range',
  target: 'Special',
  effect:
    'Spend essence equal to the listed cost of one or more minion templates in your portfolio. Each chosen template appears in the listed quantity in unoccupied spaces within distance, subject to your minion maximum and squad limits.',
};

// Level 1 heroic abilities
export const essenceTransfer: Ability = {
  id: 'essence_transfer',
  name: 'Essence Transfer',
  minLevel: 1,
  actionType: 'action',
  ...essenceCost(5),
  keywords: ['Magic', 'Melee', 'Strike'],
  distance: 'Melee 1',
  target: 'One creature',
  powerRoll: {
    characteristic: 'reason',
    tier1: '5 + R corruption damage; 2 charges',
    tier2: '8 + R corruption damage; 3 charges',
    tier3: '11 + R corruption damage; 4 charges',
  },
  effect:
    'Spend charges after the strike: 1 charge lets you or an ally within Summoner\'s Range spend a Recovery; 1 charge grants a surge; 2 charges calls forth a signature minion into an unoccupied space within Summoner\'s Range. Charges disappear after this ability.',
};

export const explosiveParade: Ability = {
  id: 'explosive_parade',
  name: 'Explosive Parade',
  minLevel: 1,
  actionType: 'action',
  ...essenceCost(5),
  keywords: ['Magic', 'Ranged'],
  distance: 'Summoner\'s Range',
  target: 'Special',
  powerRoll: {
    characteristic: 'reason',
    tier1: 'You summon four signature minions.',
    tier2: 'You summon five signature minions.',
    tier3: 'You summon six signature minions.',
  },
  effect:
    'The minions are summoned within distance regardless of minion maximum and without squads. Each moves up to speed toward a creature or object, then explodes when adjacent, targeted by an opportunity attack, or stopped, dealing 2 damage to one adjacent target and pushing 1. Stacked explosions stack. These minions do not trigger death effects or essence gain.',
};

export const distractionTactics: Ability = {
  id: 'distraction_tactics',
  name: 'Distraction Tactics',
  minLevel: 1,
  actionType: 'freeManeuver',
  ...essenceCost(5),
  keywords: ['Magic'],
  distance: 'Self',
  target: 'Special',
  effect:
    'Until the end of the encounter or until you are dying, each minion under your control during the encounter has strikes that can inflict I < Weak taunted (EoT). Potency increases by 1 for each minion that joined the strike.',
};

export const rallyingCry: Ability = {
  id: 'rallying_cry',
  name: 'Rallying Cry',
  minLevel: 1,
  actionType: 'maneuver',
  ...essenceCost(5),
  keywords: ['Magic', 'Ranged'],
  distance: '3 burst',
  target: 'All allies',
  effect:
    'Each target chooses between gaining 2 surges or dealing additional damage equal to your Reason on their next strike.',
};

export const shieldsOfEssence: Ability = {
  id: 'shields_of_essence',
  name: 'Shields of Essence',
  minLevel: 1,
  actionType: 'maneuver',
  ...essenceCost(5),
  keywords: ['Magic', 'Ranged'],
  distance: 'Summoner\'s Range',
  target: 'Special',
  powerRoll: {
    characteristic: 'reason',
    tier1: 'Three creatures',
    tier2: 'Four creatures',
    tier3: 'Five creatures',
  },
  effect:
    'Until the end of the encounter, each target can use a free triggered action when they take damage to reduce the incoming damage by half, then lose this effect.',
};

export const summonersSword: Ability = {
  id: 'summoners_sword',
  name: 'Summoner\'s Sword',
  minLevel: 1,
  actionType: 'action',
  ...essenceCost(5),
  keywords: ['Magic', 'Melee', 'Strike'],
  distance: 'Melee 3',
  target: 'One creature or object',
  powerRoll: {
    characteristic: 'reason',
    tier1: 'R damage',
    tier2: '2 + R damage',
    tier3: '4 + R damage',
  },
  effect: 'This strike deals an additional 2 damage for each ally adjacent to you.',
};

// Feature abilities
export const summonersDominion: Ability = {
  id: 'summoners_dominion',
  name: 'Summoner\'s Dominion',
  minLevel: 2,
  actionType: 'maneuver',
  keywords: ['Magic'],
  distance: 'Summoner\'s Range',
  target: 'Special',
  effect:
    'Once per encounter, summon your portfolio fixture into an unoccupied space on the ground within distance. The fixture stays until the end of the encounter, until it reaches 0 Stamina, or until you are dying. You can spend 1 essence to relocate it as a free maneuver on your turn.',
  additionalEffects: [{ cost: '1 Essence', description: 'Relocate the fixture as a free maneuver.' }],
};

export const summonersKit: Ability = {
  id: 'summoners_kit',
  name: 'Summoner\'s Kit',
  minLevel: 3,
  actionType: 'noAction',
  keywords: [],
  distance: 'Self',
  target: 'Self',
  effect:
    'Your kit improves Summoner Strike: damage becomes twice your Reason, potency becomes R < Weak, and distance becomes your Summoner\'s Range. Choose one ward: Conjured, Emergency, Howling, or Snare.',
};

export const minionChain: Ability = {
  id: 'minion_chain',
  name: 'Minion Chain',
  minLevel: 4,
  actionType: 'noAction',
  keywords: [],
  distance: 'Summoner\'s Range',
  target: 'Your minions',
  effect:
    'Whenever you use Minion Bridge, each minion within Summoner\'s Range can shift up to their speed before the maneuver if they end adjacent to another of your minions. Your minions can also chain together as a ladder or swinging rope until the start of your next turn, until the chain becomes unstable, until a minion in it is destroyed, or until you command them to let go as a free maneuver.',
};

export const minionMachinations: Ability = {
  id: 'minion_machinations',
  name: 'Minion Machinations',
  minLevel: 6,
  actionType: 'noAction',
  keywords: [],
  distance: 'Self',
  target: 'Self',
  effect:
    'Your maximum number of followers increases by 2. You can summon and recruit an artisan follower and a sage follower that share a keyword with a minion you can summon.',
};

export const returnToTheSource: Ability = {
  id: 'return_to_the_source',
  name: 'Return to the Source',
  minLevel: 6,
  actionType: 'noAction',
  keywords: [],
  distance: 'Self',
  target: 'Self and willing allies',
  effect:
    'When you take a respite, teleport to your circle\'s source manifold or origin with willing allies. At the end of the respite, everyone returns to the location where you opened the passage.',
};

export const theirLifeForMine: Ability = {
  id: 'their_life_for_mine',
  name: 'Their Life for Mine',
  minLevel: 7,
  actionType: 'freeTriggered',
  trigger: 'You or an ally within Summoner\'s Range would die from a non-age-related effect.',
  keywords: ['Magic'],
  distance: 'Summoner\'s Range',
  target: 'The triggering creature',
  effect:
    'Sacrifice all active minions, minimum 1, and spend all essence, minimum 1. The target returns to life with 0 Stamina plus 1 Stamina for each minion and essence spent. Requires a fragment of remains and a willing soul. Recharges when you gain a level, or by spending 3 eidos at 10th level.',
};

export const stewardOfTwoWorlds: Ability = {
  id: 'steward_of_two_worlds',
  name: 'Steward of Two Worlds',
  minLevel: 9,
  actionType: 'noAction',
  keywords: [],
  distance: 'Self',
  target: 'Self and allies',
  effect:
    'You and your allies are welcome in your circle\'s source manifold. Negotiations with native denizens of that place have their patience increased by 2.',
};

// Level 3 heroic abilities
export const blitzTactics: Ability = {
  id: 'blitz_tactics',
  name: 'Blitz Tactics',
  minLevel: 3,
  actionType: 'freeManeuver',
  ...essenceCost(7),
  keywords: ['Magic'],
  distance: 'Self',
  target: 'Special',
  effect:
    'Until the end of the encounter or you are dying, each minion under your control can knock enemies prone when moving through their spaces. The first affected enemy can shift 1 or be M < Weak knocked prone; potency increases by 1 for subsequent targets during the same move action.',
};

export const cavalryCall: Ability = {
  id: 'cavalry_call',
  name: 'Cavalry Call',
  minLevel: 3,
  actionType: 'action',
  ...essenceCost(7),
  keywords: ['Magic'],
  distance: 'Summoner\'s Range',
  target: 'Special',
  effect:
    'Summon a temporary squad containing 6 signature minions regardless of minion maximum. Whenever one damages an enemy, the enemy is R < Weak compelled to move 5 squares toward the damage source. Potency increases by 1 if two or more of these minions target the enemy. The minions die at end of turn and do not trigger death effects or essence gain.',
};

export const essenceFunnel: Ability = {
  id: 'essence_funnel',
  name: 'Essence Funnel',
  minLevel: 3,
  actionType: 'action',
  ...essenceCost(7),
  keywords: ['Area', 'Magic'],
  distance: '10 x 1 line within 1',
  target: 'Each enemy and object in the area',
  powerRoll: {
    characteristic: 'reason',
    tier1: '5 damage; push 2',
    tier2: '9 damage; push 4',
    tier3: '12 damage; push 6',
  },
  effect:
    'You can kill any number of your minions within Summoner\'s Range as part of this ability if they have not used a main action or maneuver this turn. Each target takes +1 damage, plus +1 per minion killed this way. These minions do not trigger death effects or essence gain.',
};

export const leadByExample: Ability = {
  id: 'lead_by_example',
  name: 'Lead By Example',
  minLevel: 3,
  actionType: 'action',
  ...essenceCost(7),
  keywords: ['Magic', 'Melee', 'Ranged', 'Strike'],
  distance: 'Melee 1 or Summoner\'s Range',
  target: 'One enemy or object',
  powerRoll: {
    characteristic: 'reason',
    tier1: '8 + R damage; R < Weak dazed (save ends)',
    tier2: '12 + R damage; R < Average dazed (save ends)',
    tier3: '16 + R damage; R < Strong dazed (save ends)',
  },
  effect: 'Your minions watch your implement crackle with power as you lead the attack.',
};

// Level 6 heroic abilities
export const championsCry: Ability = {
  id: 'champions_cry',
  name: 'A Champion\'s Cry',
  minLevel: 6,
  actionType: 'action',
  ...essenceCost(9),
  keywords: ['Area', 'Champion', 'Magic'],
  distance: '3 burst',
  target: 'Each enemy in the area',
  powerRoll: {
    characteristic: 'reason',
    tier1: '2 psychic or sonic damage; I < Weak frightened of you (save ends)',
    tier2: '5 psychic or sonic damage; I < Average frightened of you and all allies (EoT)',
    tier3: '7 psychic or sonic damage; I < Strong frightened of you and all allies (save ends)',
  },
  effect: 'You can use this ability as if in the space of one minion within your Summoner\'s Range.',
};

export const armysIdol: Ability = {
  id: 'armys_idol',
  name: 'Army\'s Idol',
  minLevel: 6,
  actionType: 'maneuver',
  ...essenceCost(9),
  keywords: ['Area', 'Champion', 'Magic'],
  distance: '4 burst',
  target: 'Self and each ally in the area',
  effect:
    'You can use this ability as if in the space of one minion within your Summoner\'s Range. Until the end of the encounter or you become dying, each target has +2 to saving throws. Each target immediately makes each of their saving throws and stands up from prone.',
};

export const championSlamsEarth: Ability = {
  id: 'champion_slams_earth',
  name: 'The Champion Slams the Earth',
  minLevel: 6,
  actionType: 'action',
  ...essenceCost(9),
  keywords: ['Area', 'Champion', 'Magic', 'Weapon'],
  distance: '4 cube within 1',
  target: 'Each enemy and object in the area',
  powerRoll: {
    characteristic: 'reason',
    tier1: '5 damage; M < Weak prone and can\'t stand (save ends)',
    tier2: '8 damage; M < Average prone and can\'t stand (save ends)',
    tier3: '11 damage; M < Strong prone and can\'t stand (save ends)',
  },
  effect:
    'You can use this ability as if in the space of one minion within your Summoner\'s Range. You can change the damage type to a type your champion deals.',
};

export const theirPallShroudsAll: Ability = {
  id: 'their_pall_shrouds_all',
  name: 'Their Pall Shrouds All',
  minLevel: 6,
  actionType: 'maneuver',
  ...essenceCost(9),
  keywords: ['Area', 'Champion', 'Magic'],
  distance: '4 burst',
  target: 'Each enemy in the area',
  effect:
    'You can use this ability as if in the space of one minion within your Summoner\'s Range. Each target is R < Average weakened (save ends). Until the end of the encounter, whenever a target gets a tier 1 result on a strike, they deal half damage; if striking a creature adjacent to one of their allies, they target that ally instead.',
};

// Level 9 heroic abilities
export const tenThousandMinions: Ability = {
  id: 'ten_thousand_minions',
  name: '10,000 Minions',
  minLevel: 9,
  actionType: 'action',
  ...essenceCost(11),
  keywords: ['Magic'],
  distance: 'Special',
  target: 'Special',
  effect:
    'Until the end of the encounter or you are dying, each ground square teems with minions. An enemy that ends their turn in an affected square takes 5 irreducible damage. You can use Minion Bridge treating each affected square as an eligible minion, up to 10 additional squares.',
};

export const bodyguardTactics: Ability = {
  id: 'bodyguard_tactics',
  name: 'Bodyguard Tactics',
  minLevel: 9,
  actionType: 'action',
  ...essenceCost(11),
  keywords: ['Area', 'Magic'],
  distance: '5 burst',
  target: 'Self and each non-minion ally in the area',
  effect:
    'Until the end of the encounter or you are dying, each target has damage immunity 5 and can use a free triggered action once per turn when force moved to reduce the distance by half.',
};

export const iAbjureThee: Ability = {
  id: 'i_abjure_thee',
  name: 'I Abjure Thee',
  minLevel: 9,
  actionType: 'action',
  ...essenceCost(11),
  keywords: ['Area', 'Magic'],
  distance: '3 burst',
  target: 'Special',
  effect:
    'Each enemy minion in the area is permanently removed from the encounter map. Up to three non-leader or non-solo enemies in the area are removed from the encounter for 1 round. A leader or solo enemy with R, I, or P < Average is weakened and slowed (save ends); increase potency by 1 for each adjacent minion you sacrifice as part of this ability.',
};

export const championsWrath: Ability = {
  id: 'champions_wrath',
  name: 'The Champion\'s Wrath',
  minLevel: 9,
  actionType: 'action',
  ...essenceCost(11),
  keywords: ['Area', 'Champion', 'Magic', 'Weapon'],
  distance: '4 burst',
  target: 'Each enemy in the area',
  powerRoll: {
    characteristic: 'reason',
    tier1: '6 damage; push 4; M < Weak push is vertical',
    tier2: '10 damage; push 5; M < Average push is vertical',
    tier3: '14 damage; push 6; M < Strong push is vertical',
  },
  effect:
    'You can use this ability as if in the space of one minion within your Summoner\'s Range. You can change damage type to a type your champion deals. For each enemy reduced to 0 Stamina, an ally within distance can move up to their speed.',
};

export const summonerAbilitiesByLevel: Record<number, Ability[]> = {
  1: [
    summonerStrike,
    strikeForMe,
    minionBridge,
    callForth,
    essenceTransfer,
    explosiveParade,
    distractionTactics,
    rallyingCry,
    shieldsOfEssence,
    summonersSword,
  ],
  2: [summonersDominion],
  3: [summonersKit, blitzTactics, cavalryCall, essenceFunnel, leadByExample],
  4: [minionChain],
  6: [
    minionMachinations,
    returnToTheSource,
    championsCry,
    armysIdol,
    championSlamsEarth,
    theirPallShroudsAll,
  ],
  7: [theirLifeForMine],
  9: [stewardOfTwoWorlds, tenThousandMinions, bodyguardTactics, iAbjureThee, championsWrath],
};

export const allSummonerAbilities: Ability[] = Object.values(summonerAbilitiesByLevel).flat();

export function getSummonerAbilitiesForLevel(level: number): Ability[] {
  return allSummonerAbilities.filter((ability) => (ability.minLevel ?? 1) <= level);
}
