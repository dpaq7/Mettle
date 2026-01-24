/**
 * Standard action economy options from Draw Steel Heroes v1
 * Synced with canonical rules from data-rules-md
 */
import { Ability } from '../types';

// Standard Maneuvers available to all heroes
export const standardManeuvers: Ability[] = [
  {
    id: 'aid-attack',
    name: 'Aid Attack',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Melee 1',
    target: 'One ally',
    effect: 'The target gains an edge on their next attack roll before the end of their next turn.',
  },
  {
    id: 'catch-breath',
    name: 'Catch Breath',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Self',
    target: 'Self',
    effect: 'Spend one Recovery to regain Stamina equal to your Recovery Value.',
  },
  {
    id: 'escape-grab',
    name: 'Escape Grab',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Self',
    target: 'Self',
    powerRoll: {
      characteristic: 'might',
      alternativeCharacteristics: ['agility'],
      tier1: 'No effect.',
      tier2: 'You can escape the grab, but if you do, a creature who has you grabbed can make a melee free strike against you before you are no longer grabbed.',
      tier3: 'You are no longer grabbed.',
    },
    effect: 'You take a bane on this maneuver if your size is smaller than the size of the creature, object, or effect that has you grabbed.',
  },
  {
    id: 'grab',
    name: 'Grab',
    actionType: 'maneuver',
    keywords: ['Melee', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: 'No effect.',
      tier2: 'You can grab the target, but if you do, the target can make a melee free strike against you before they are grabbed.',
      tier3: 'The target is grabbed by you.',
    },
    effect: 'You can usually target only creatures of your size or smaller. If your Might score is 2 or higher, you can target any creature with a size equal to or less than your Might score.',
  },
  {
    id: 'hide',
    name: 'Hide',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Self',
    target: 'Self',
    effect: 'Make an Agility test to become hidden if you are concealed or behind cover. Enemies cannot target you with abilities that require line of sight until you attack or move into the open.',
  },
  {
    id: 'knockback',
    name: 'Knockback',
    actionType: 'maneuver',
    keywords: ['Melee', 'Weapon'],
    distance: 'Melee 1',
    target: 'One creature',
    powerRoll: {
      characteristic: 'might',
      tier1: 'Push 1',
      tier2: 'Push 2',
      tier3: 'Push 3',
    },
    effect: 'You can usually target only creatures of your size or smaller. If your Might score is 2 or higher, you can target any creature with a size equal to or less than your Might score.',
  },
  {
    id: 'make-assist-test',
    name: 'Make or Assist a Test',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Varies',
    target: 'Varies',
    effect: 'Make a skill test (climbing, jumping, etc.) or assist an ally with their test, granting them an edge.',
  },
  {
    id: 'search',
    name: 'Search for Hidden Creatures',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Self',
    target: 'Area within 10 squares',
    effect: 'Make an Intuition test to search for hidden creatures or objects in the area.',
  },
  {
    id: 'stand-up',
    name: 'Stand Up',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Self',
    target: 'Self',
    effect: 'If you are prone, you stand up.',
  },
  {
    id: 'use-consumable',
    name: 'Use Consumable',
    actionType: 'maneuver',
    keywords: [],
    distance: 'Self',
    target: 'Self',
    effect: 'Consume a potion or other consumable you are carrying and gain its effects.',
  },
];

// Standard Triggered Actions available to all heroes
export const standardTriggeredActions: Ability[] = [
  {
    id: 'opportunity_attack',
    name: 'Opportunity Attack',
    actionType: 'triggered',
    trigger: 'An enemy within your reach moves away from you without disengaging',
    keywords: ['Melee', 'Weapon'],
    distance: 'Reach 1',
    target: 'The triggering enemy',
    effect: 'Make a free strike against the target.',
  },
  {
    id: 'free_strike',
    name: 'Free Strike',
    actionType: 'triggered',
    trigger: 'When triggered by an ability or opportunity',
    keywords: ['Weapon'],
    distance: 'Varies by weapon',
    target: 'One creature',
    effect: 'Make a basic attack dealing your weapon damage. Usually triggered by opportunity attacks or abilities that grant free strikes.',
  },
];

// Move action options
export const moveActions: Ability[] = [
  {
    id: 'advance',
    name: 'Advance',
    actionType: 'action',
    keywords: ['Move'],
    distance: 'Self',
    target: 'Self',
    effect: 'Move up to your Speed in squares. Provokes opportunity attacks if you leave an enemy\'s reach.',
  },
  {
    id: 'disengage',
    name: 'Disengage',
    actionType: 'action',
    keywords: ['Move'],
    distance: 'Self',
    target: 'Self',
    effect: 'Shift 1 square. This movement does not provoke opportunity attacks.',
  },
  {
    id: 'ride',
    name: 'Ride',
    actionType: 'action',
    keywords: ['Move'],
    distance: 'Self',
    target: 'Self',
    effect: 'While mounted, cause your mount to move up to their speed, taking you with them. Alternatively, have your mount use the Disengage move action as a free triggered action. You can use the Ride move action only once per round.',
  },
];

// Main actions available to all heroes
export const mainActions: Ability[] = [
  {
    id: 'defend',
    name: 'Defend',
    actionType: 'action',
    keywords: [],
    distance: 'Self',
    target: 'Self',
    effect: 'Ability rolls made against you have a double bane until the start of your next turn. Additionally, you have a double edge on tests to resist environmental effects or a creature\'s traits or abilities. You gain no benefit from this action while another creature is taunted by you.',
  },
  {
    id: 'heal',
    name: 'Heal',
    actionType: 'action',
    keywords: [],
    distance: 'Melee 1',
    target: 'One adjacent creature',
    effect: 'The target can spend a Recovery to regain Stamina, or can make a saving throw against one effect they are suffering that is ended by a saving throw.',
  },
  {
    id: 'charge',
    name: 'Charge',
    actionType: 'action',
    keywords: ['Charge', 'Move'],
    distance: 'Self',
    target: 'Self',
    effect: 'Move up to your speed in a straight line, then make a melee free strike against a target when you end your move. If you have an ability with the Charge keyword, you can use that ability instead of a free strike. You can\'t move through difficult terrain or shift when you charge.',
  },
];

// Summoner-specific quick commands (triggered actions from formations)
export interface QuickCommand {
  id: string;
  name: string;
  formation: string;
  trigger: string;
  effect: string;
}

export const quickCommands: QuickCommand[] = [
  // Horde Formation
  {
    id: 'swarm_strike',
    name: 'Swarm Strike',
    formation: 'horde',
    trigger: 'You use a triggered action to make a Free Strike or use a Signature Ability',
    effect: 'Roll 1d10. On 11+: Up to 3 minion targets make a free strike. On Crit (19-20): Each minion target makes a free strike.',
  },
  {
    id: 'sacrificial_shield',
    name: 'Sacrificial Shield',
    formation: 'horde',
    trigger: 'You would take damage',
    effect: 'Redirect the damage to one of your minions within Summoner\'s Range. The minion takes the damage instead.',
  },
  // Platoon Formation
  {
    id: 'tactical_repositioning',
    name: 'Tactical Repositioning',
    formation: 'platoon',
    trigger: 'An ally ends their turn',
    effect: 'One of your minions within Summoner\'s Range can shift up to 2 squares.',
  },
  {
    id: 'coordinated_assault',
    name: 'Coordinated Assault',
    formation: 'platoon',
    trigger: 'One of your minions hits with an attack',
    effect: 'The next ally to attack that target before the end of your next turn gains an Edge.',
  },
  // Elite Formation
  {
    id: 'champion_strike',
    name: 'Champion Strike',
    formation: 'elite',
    trigger: 'You use your action to command a single minion',
    effect: 'That minion deals +R damage on their next attack this turn.',
  },
  {
    id: 'bodyguard',
    name: 'Bodyguard',
    formation: 'elite',
    trigger: 'An ally within 3 squares of one of your minions would take damage',
    effect: 'Your minion can take some or all of the damage instead.',
  },
  // Leader Formation
  {
    id: 'inspiring_presence',
    name: 'Inspiring Presence',
    formation: 'leader',
    trigger: 'You score a critical hit or reduce an enemy to 0 Stamina',
    effect: 'All your minions within Summoner\'s Range regain 1 Stamina.',
  },
  {
    id: 'rally_the_troops',
    name: 'Rally the Troops',
    formation: 'leader',
    trigger: 'One of your minions would be reduced to 0 Stamina',
    effect: 'That minion is instead reduced to 1 Stamina (once per round).',
  },
];

// All action economy options grouped
export const actionEconomy = {
  mainActions,
  moveActions,
  standardManeuvers,
  standardTriggeredActions,
  quickCommands,
};
