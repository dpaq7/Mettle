import { Formation, QuickCommand } from '../types';

export interface FormationData {
  id: Formation;
  name: string;
  description: string;
  benefits: string[];
  quickCommands: QuickCommand[];
}

// SRD Quick Commands - can be selected with any formation
const quickCommands: QuickCommand[] = [
  {
    id: 'qc_focus_fire',
    name: 'Focus Fire!',
    description:
      'Trigger: Ally deals damage. Effect: Target gains 1 Surge per adjacent minion (Max 3). Spend 1 Essence: Add Edge to the triggering power roll.',
    formation: 'horde', // Default assignment
  },
  {
    id: 'qc_halt',
    name: 'Halt!',
    description:
      'Trigger: Creature moves or starts turn in range. Effect: Summon Signature Minion adjacent to target OR Shift existing minion to target. If target force-moved into minion, you can negate collision damage.',
    formation: 'platoon', // Default assignment
  },
  {
    id: 'qc_not_yet',
    name: 'Not Yet!',
    description:
      'Cost: 3 Essence. Trigger: Ally or Minion (if last in squad) would die. Effect: Negate death; target remains at 1 Stamina.',
    formation: 'elite', // Default assignment
  },
  {
    id: 'qc_shield',
    name: 'Shield!',
    description:
      'Trigger: Ally or Self targeted by strike. Effect: Adjacent minion becomes new target. Spend 1 Essence: Summon new Signature Minion adjacent to target to take the hit.',
    formation: 'leader', // Default assignment
  },
];

export const formations: Record<Formation, FormationData> = {
  horde: {
    id: 'horde',
    name: 'Horde',
    description:
      'You overwhelm enemies with sheer numbers and a larger signature-minion cadence.',
    benefits: [
      'Your maximum number of minions increases by 4',
      'You summon up to four signature minions at the start of each turn instead of three',
    ],
    quickCommands: quickCommands,
  },
  platoon: {
    id: 'platoon',
    name: 'Platoon',
    description:
      'Your minions coordinate their attacks to concentrate damage.',
    benefits: [
      'Whenever one of your squads uses a damaging ability, choose one target to take extra damage equal to your Reason',
    ],
    quickCommands: quickCommands,
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    description:
      'All your minions are tougher and more resilient.',
    benefits: [
      'All minions get +3 Stamina',
      'All minions get +1 Stability',
    ],
    quickCommands: quickCommands,
  },
  leader: {
    id: 'leader',
    name: 'Leader',
    description:
      'You fight alongside your minions, protecting them from destruction.',
    benefits: [
      'You are not affected by excess damage after all minions in a squad are dead',
      'If a minion within your Summoner\'s Range takes damage, you can take that damage in place of the minion',
      'You can use light armor treasures and light weapon treasures while you do not have a kit',
    ],
    quickCommands: quickCommands,
  },
};

// Export the unique list of quick commands
export const allQuickCommands: QuickCommand[] = quickCommands;
