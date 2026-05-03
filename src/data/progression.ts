// Character Progression Data - SRD Section 6

import {
  LevelProgression,
  Ward,
  SevenEssenceAbility,
  NineEssenceAbility,
  ElevenEssenceAbility,
  CircleUpgrade,
} from '../types/progression';

// ============================================================
// WARDS (Level 3 and 9 Kit upgrades)
// ============================================================

export const wards: Ward[] = [
  {
    id: 'conjured',
    name: 'Conjured Ward',
    description: '+3 Stamina. This bonus increases by 3 at 4th, 7th, and 10th levels.',
  },
  {
    id: 'emergency',
    name: 'Emergency Ward',
    description: 'The first time each round you take damage, you can use a free triggered action to shift 1 after the effect resolves and summon a signature minion into the square you left.',
  },
  {
    id: 'howling',
    name: 'Howling Ward',
    description: 'You create a 1-aura vortex when you enter combat. An enemy that starts their turn adjacent to you takes damage equal to your Reason.',
  },
  {
    id: 'snare',
    name: 'Snare Ward',
    description: 'Whenever an adjacent creature deals damage to you, you can use a free triggered action to pull that creature toward one of your minions within Summoner\'s Range a number of squares equal to your Reason.',
  },
];

// ============================================================
// 7-ESSENCE ABILITIES (Level 3)
// ============================================================

export const sevenEssenceAbilities: SevenEssenceAbility[] = [
  {
    id: 'blitz_tactics',
    name: 'Blitz Tactics',
    description: 'Your minions knock enemies prone when moving through their spaces.',
    cost: 7,
  },
  {
    id: 'cavalry_call',
    name: 'Cavalry Call',
    description: 'Summon a temporary squad of 6 Signature Minions that act immediately and disappear at the end of the round.',
    cost: 7,
  },
  {
    id: 'essence_funnel',
    name: 'Essence Funnel',
    description: 'Line 10 area attack. You may sacrifice minions in the line to add +1 damage per minion sacrificed.',
    cost: 7,
  },
  {
    id: 'lead_by_example',
    name: 'Lead By Example',
    description: 'Make a powerful attack that deals high damage and dazes the target.',
    cost: 7,
  },
];

// ============================================================
// 9-ESSENCE ABILITIES - Champions (Level 6)
// ============================================================

export const nineEssenceAbilities: NineEssenceAbility[] = [
  {
    id: 'champions_cry',
    name: "A Champion's Cry",
    description: 'Burst 3 centered on your Champion. All enemies in the area are frightened (save ends).',
    cost: 9,
  },
  {
    id: 'armys_idol',
    name: "Army's Idol",
    description: 'Burst 4 centered on your Champion. All allies in the area gain +2 to saving throws until the end of your next turn.',
    cost: 9,
  },
  {
    id: 'champion_slams_earth',
    name: 'The Champion Slams the Earth',
    description: 'Cube 4 area attack. All creatures in the area take damage and are knocked prone.',
    cost: 9,
  },
  {
    id: 'pall_shrouds_all',
    name: 'Their Pall Shrouds All',
    description: 'Burst 4 centered on your Champion. All enemies are weakened and take half damage from all sources (save ends).',
    cost: 9,
  },
];

// ============================================================
// 11-ESSENCE ABILITIES - Ultimate (Level 9)
// ============================================================

export const elevenEssenceAbilities: ElevenEssenceAbility[] = [
  {
    id: 'ten_thousand_minions',
    name: '10,000 Minions',
    description: 'The entire floor becomes a damaging hazard. Enemies that start their turn on the ground take damage.',
    cost: 11,
  },
  {
    id: 'bodyguard_tactics',
    name: 'Bodyguard Tactics',
    description: 'All allies within 10 squares of you gain Immunity 5 until the end of your next turn.',
    cost: 11,
  },
  {
    id: 'i_abjure_thee',
    name: 'I Abjure Thee',
    description: 'Destroy all enemy minions within range. Enemy leaders and bosses are banished to another plane (save ends).',
    cost: 11,
  },
  {
    id: 'champions_wrath',
    name: "The Champion's Wrath",
    description: 'Massive area of effect attack. All enemies in a burst 6 take heavy damage and are pushed to the edge of the area.',
    cost: 11,
  },
];

// ============================================================
// CIRCLE UPGRADES (Level 5)
// ============================================================

export const circleUpgrades: CircleUpgrade[] = [
  // Blight (Demon)
  {
    id: 'shaping',
    circle: 'blight',
    name: 'Shaping',
    description: 'After a 1-minute ritual, one of your minions can fold their shape and disguise themself as a duplicate of you, including basic Caelian speech. You can disguise a number of minions equal to your Reason.',
  },
  {
    id: 'soul_flense',
    circle: 'blight',
    name: 'Soul Flense',
    description: 'As a maneuver, command one or more demon minions to each deal irreducible free strike damage to an adjacent ally. The ally ends a condition and confers it to the demon. Death Snap can also pass a suffered condition to its target with Presence potency.',
  },
  // Graves (Undead)
  {
    id: 'channel',
    circle: 'graves',
    name: 'Channel',
    description: 'You can host a spirit in your body, gaining access to skills and knowledge the spirit possessed in life.',
  },
  {
    id: 'dread_march',
    circle: 'graves',
    name: 'Dread March',
    description: 'You and your undead minions don\'t spend extra speed in difficult terrain. If one or more undead minions would die while using their move action, they can choose not to die until the end of your turn.',
  },
  // Spring (Fey)
  {
    id: 'flash_powder',
    circle: 'spring',
    name: 'Flash Powder',
    description: 'Each ally who gains temporary Stamina from Pixie Dust also gains one option until the end of their next turn, or 10 minutes outside combat: Flight, Vanish, Water Weird, or Panacea.',
  },
  {
    id: 'pixie_lift',
    circle: 'spring',
    name: 'Pixie Lift',
    description: 'You gain a fly speed equal to your speed and can hover. While flying, you have concealment.',
  },
  // Storms (Elemental)
  {
    id: 'nature_watch',
    circle: 'storms',
    name: 'Nature Watch',
    description: 'Once per day after a 1-minute ritual, summon a beacon elemental mote to patrol. It telepathically reports hostile creatures, hazards, or traps within 20 squares no matter how far away it is. You can have beacons active equal to your level.',
  },
  {
    id: 'split',
    circle: 'storms',
    name: 'Split',
    description: 'Once during your turn as a free maneuver, deal damage to one elemental minion equal to half its maximum Stamina to create one additional copy in an adjacent unoccupied space and add it to the squad, even at minion maximum. You can\'t use this if it would kill one or more minions in the squad.',
  },
];

// ============================================================
// LEVEL PROGRESSION DATA
// ============================================================

export const levelProgressions: LevelProgression[] = [
  // Level 2
  {
    level: 2,
    features: [
      {
        id: 'perk_level2',
        name: 'Perk',
        description: 'Gain 1 Perk of your choice.',
        type: 'automatic',
      },
      {
        id: 'summoners_dominion',
        name: "Summoner's Dominion",
        description: 'You can now summon your portfolio\'s Fixture (The Boil, Primordial Crystal, Glade Pond, or Barrow Gates) once per encounter as a maneuver. Summoning costs 0 essence. Relocate (free maneuver, 1 essence) to move the fixture up to 5 squares.',
        type: 'automatic',
      },
    ],
  },

  // Level 3
  {
    level: 3,
    features: [
      {
        id: 'kit_upgrade',
        name: 'Kit Upgrade',
        description: 'Your Summoner Strike damage increases to 2×R and range extends to Summoner\'s Range. Choose a Ward.',
        type: 'choice',
        choices: wards.map(w => ({
          id: w.id,
          name: w.name,
          description: w.description,
        })),
        category: 'ward',
      },
      {
        id: 'seven_essence_abilities',
        name: '7-Essence Abilities',
        description: 'Choose one 7-Essence ability to add to your repertoire.',
        type: 'choice',
        choices: sevenEssenceAbilities.map(a => ({
          id: a.id,
          name: a.name,
          description: a.description,
        })),
        category: '7-essence',
      },
    ],
  },

  // Level 4 - Minion Improvement (Summoner v1.0 SRD)
  {
    level: 4,
    features: [
      {
        id: 'reason_increase',
        name: 'Reason Increase',
        description: 'Your Reason characteristic is now 3.',
        type: 'automatic',
      },
      {
        id: 'minion_cap_increase',
        name: 'Minion Cap Increase',
        description: 'Your maximum minion count increases by 4 (to 12 total, or 16 with Horde).',
        type: 'automatic',
      },
      {
        id: 'essence_salvage',
        name: 'Essence Salvage',
        description: 'The first minion death each round now grants 2 Essence instead of 1.',
        type: 'automatic',
      },
      {
        id: 'minion_chain',
        name: 'Minion Chain',
        description: 'Your minions can form linked paths and battlefield connections as described by the level 4 Summoner feature.',
        type: 'automatic',
      },
      {
        id: 'minion_stats',
        name: 'Minion Stat Boost',
        description: 'Signature minions gain +1 Stamina. 3-Essence minions gain +3 Stamina. 5-Essence minions gain +2 Stamina.',
        type: 'automatic',
      },
      {
        id: 'stat_boost',
        name: 'Characteristic Boost',
        description: 'Increase one characteristic (other than Reason) by 1.',
        type: 'choice',
        choices: [
          { id: 'might', name: 'Might', description: 'Increase Might by 1.' },
          { id: 'agility', name: 'Agility', description: 'Increase Agility by 1.' },
          { id: 'intuition', name: 'Intuition', description: 'Increase Intuition by 1.' },
          { id: 'presence', name: 'Presence', description: 'Increase Presence by 1.' },
        ],
        category: 'stat-boost',
      },
    ],
    statChanges: {
      reason: 3,
      minionCap: 4,
      signatureStaminaBonus: 1,
      threeEssenceStaminaBonus: 3,
      fiveEssenceStaminaBonus: 2,
    },
  },

  // Level 5 - Circle Feature Upgrade
  {
    level: 5,
    features: [
      {
        id: 'circle_feature_upgrade',
        name: 'Circle Feature Upgrade',
        description: 'Choose an upgrade to your circle\'s features.',
        type: 'choice',
        // Choices will be filtered by circle in the UI
        choices: circleUpgrades.map(u => ({
          id: u.id,
          name: u.name,
          description: u.description,
        })),
        category: 'circle-upgrade',
      },
      {
        id: 'new_portfolio_minion_l5',
        name: 'New Portfolio Minion',
        description: 'Add a new portfolio minion option; your available minion cost tiers now include 7 essence.',
        type: 'automatic',
      },
    ],
  },

  // Level 6
  {
    level: 6,
    features: [
      {
        id: 'return_to_source',
        name: 'Return to the Source',
        description: 'During a Respite, you can teleport yourself and allies to your portfolio\'s home plane.',
        type: 'automatic',
      },
      {
        id: 'minion_machinations',
        name: 'Minion Machinations',
        description: '+2 Follower Cap. You can recruit an Artisan or Sage from your portfolio.',
        type: 'automatic',
      },
      {
        id: 'nine_essence_abilities',
        name: '9-Essence Abilities',
        description: 'Choose one 9-Essence champion-keyword ability. These call on your future champion\'s power before the Portfolio Champion feature unlocks at level 8.',
        type: 'choice',
        choices: nineEssenceAbilities.map(a => ({
          id: a.id,
          name: a.name,
          description: a.description,
        })),
        category: '9-essence',
      },
    ],
  },

  // Level 7 - Minion Improvement II (Summoner v1.0 SRD)
  {
    level: 7,
    features: [
      {
        id: 'characteristic_increase',
        name: 'All Characteristics +1',
        description: 'All your characteristics increase by 1 (maximum 4).',
        type: 'automatic',
      },
      {
        id: 'minion_cap_increase_l7',
        name: 'Minion Cap Increase',
        description: 'Your maximum minion count increases by 4 (to 16 total, or 20 with Horde).',
        type: 'automatic',
      },
      {
        id: 'minion_improvement',
        name: 'Minion Improvement',
        description: 'Your free summon count at the start of your turn increases by 1 (to 4 base).',
        type: 'automatic',
      },
      {
        id: 'font_of_creation',
        name: 'Font of Creation',
        description: 'You now gain 3 Essence at the start of your turn instead of 2.',
        type: 'automatic',
      },
      {
        id: 'minion_stats_l7',
        name: 'Minion Stat Boost II',
        description: 'All minions gain additional Stamina: Signature +1 (total +2), 3-Essence +3 (total +6), 5-Essence +2 (total +4), 7-Essence +5.',
        type: 'automatic',
      },
      {
        id: 'their_life_for_mine',
        name: 'Their Life For Mine',
        description: 'When you or an ally within Summoner\'s Range would die from a non-age-related effect, sacrifice all active minions and all essence, minimum 1 each, to restore life with 1 Stamina per minion and essence spent.',
        type: 'automatic',
      },
    ],
    statChanges: {
      allStats: 1,
      minionCap: 4,
      freeSummonCount: 1,
      essencePerTurn: 3,
      signatureStaminaBonus: 1,
      threeEssenceStaminaBonus: 3,
      fiveEssenceStaminaBonus: 2,
      sevenEssenceStaminaBonus: 5,
    },
  },

  // Level 8
  {
    level: 8,
    features: [
      {
        id: 'perk_level8',
        name: 'Perk',
        description: 'Gain any one Perk of your choice.',
        type: 'automatic',
      },
      {
        id: 'circle_feature_level8',
        name: '8th-Level Circle Feature',
        description: 'Gain your circle\'s 8th-level feature: Abyssal Evolution, Kill the Pain, Celestial Grace, or Control the Elements.',
        type: 'automatic',
      },
      {
        id: 'portfolio_champion',
        name: 'Portfolio Champion',
        description: 'Your portfolio gains its 9-Essence champion: Demon Lord\'s Aspect, Dragon\'s Portent, Celestial Attendant, or Avatar of Death. You can command one champion at a time and must earn a Victory before resummoning after it dies.',
        type: 'automatic',
      },
    ],
  },

  // Level 9
  {
    level: 9,
    features: [
      {
        id: 'kit_improvement',
        name: 'Kit Improvement',
        description: 'Your Summoner Strike now uses Strong potency (R < Strong). Choose a second Ward. You summon a free Signature Minion when you kill an enemy.',
        type: 'choice',
        choices: wards.map(w => ({
          id: w.id,
          name: w.name,
          description: w.description,
        })),
        category: 'second-ward',
      },
      {
        id: 'steward',
        name: 'Steward of Two Worlds',
        description: 'You and your allies are welcome in your circle\'s source manifold. Negotiations with native denizens of that place have their patience increased by 2.',
        type: 'automatic',
      },
      {
        id: 'eleven_essence_abilities',
        name: '11-Essence Abilities (Ultimate)',
        description: 'Choose one 11-Essence ultimate ability to add to your repertoire.',
        type: 'choice',
        choices: elevenEssenceAbilities.map(a => ({
          id: a.id,
          name: a.name,
          description: a.description,
        })),
        category: '11-essence',
      },
    ],
  },

  // Level 10 - Minion Improvement III (Summoner v1.0 SRD)
  {
    level: 10,
    features: [
      {
        id: 'reason_max',
        name: 'Reason Mastery',
        description: 'Your Reason characteristic is now 5.',
        type: 'automatic',
      },
      {
        id: 'minion_cap_increase_l10',
        name: 'Minion Cap Increase',
        description: 'Your maximum minion count increases by 4 (to 20 total, or 24 with Horde).',
        type: 'automatic',
      },
      {
        id: 'minion_improvement_combat',
        name: 'Combat Summon Scaling',
        description: 'Your start of combat free summon now scales with your Victories (+2 per 2 Victories).',
        type: 'automatic',
      },
      {
        id: 'minion_stats_l10',
        name: 'Minion Stat Boost III',
        description: 'All minions gain additional Stamina: Signature +1 (total +3), 3-Essence +3 (total +9), 5-Essence +2 (total +6), 7-Essence +5 (total +10).',
        type: 'automatic',
      },
      {
        id: 'eidos',
        name: 'Eidos',
        description: 'You gain access to the Eidos epic resource. Eidos can be spent as Essence and also summons 2 bonus minions.',
        type: 'automatic',
      },
      {
        id: 'no_matter_the_cost',
        name: 'No Matter the Cost',
        description: 'Whenever you sacrifice minions, the cost reduction now equals the number of sacrificed minions, to a minimum final cost of 1, instead of reducing the cost by only 1 total.',
        type: 'automatic',
      },
      {
        id: 'among_our_ranks',
        name: 'Among Our Ranks',
        description: 'As a respite activity, summon a willing and not-restrained NPC or companion into your army as described by the level 10 Summoner feature.',
        type: 'automatic',
      },
    ],
    statChanges: {
      reason: 5,
      minionCap: 4,
      signatureStaminaBonus: 1,
      threeEssenceStaminaBonus: 3,
      fiveEssenceStaminaBonus: 2,
      sevenEssenceStaminaBonus: 5,
    },
  },
];

// Helper function to get progression for a specific level
export function getProgressionForLevel(level: number): LevelProgression | undefined {
  return levelProgressions.find(p => p.level === level);
}

// Helper function to get all features up to a level
export function getFeaturesUpToLevel(level: number): LevelProgression[] {
  return levelProgressions.filter(p => p.level <= level);
}

// Helper function to get circle-specific upgrades
export function getCircleUpgrades(circle: 'blight' | 'graves' | 'spring' | 'storms'): CircleUpgrade[] {
  return circleUpgrades.filter(u => u.circle === circle);
}
