import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { MasterList, MasterListSection, MasterListItem } from '@/components/layout/MasterList';
import { isSummonerHero, isTacticianHero, isFuryHero } from '@/types/hero';
import { canLevelUp, getXpRangeDisplay } from '@/utils/levelProgression';
import type { Hero, HeroClass } from '@/types';

// Character section items
type CharacterItemId =
  | 'ancestry'
  | 'culture'
  | 'career'
  | 'class'
  | 'subclass'
  | 'kit'
  | 'inciting-incident'
  | 'complications'
  | 'titles'
  | 'languages'
  | 'skills'
  | 'perks'
  | 'conditions'
  | 'level-up'
  | 'respec'
  // Class-specific items
  | 'class-mechanics'
  | 'formation'
  | 'minions'
  | 'portfolio'
  | 'marked-targets'
  | 'growing-ferocity';

interface CharacterItem {
  id: CharacterItemId;
  label: string;
  getValue: (hero: Hero) => string | undefined;
  getBadge?: (hero: Hero) => number | undefined;
}

const CHARACTER_ITEMS: CharacterItem[] = [
  {
    id: 'ancestry',
    label: 'Ancestry',
    getValue: (hero) => hero.ancestry?.name,
  },
  {
    id: 'culture',
    label: 'Culture',
    getValue: (hero) => hero.culture?.name,
  },
  {
    id: 'career',
    label: 'Career',
    getValue: (hero) => hero.career?.name,
  },
  {
    id: 'class',
    label: 'Class',
    getValue: (hero) => {
      if (!hero.heroClass) return undefined;
      // Capitalize first letter
      return hero.heroClass.charAt(0).toUpperCase() + hero.heroClass.slice(1);
    },
  },
  {
    id: 'subclass',
    label: 'Subclass',
    getValue: (hero) => hero.subclass as string | undefined,
  },
  {
    id: 'kit',
    label: 'Kit',
    getValue: (hero) => hero.kit?.name,
  },
  {
    id: 'inciting-incident',
    label: 'Inciting Incident',
    getValue: (hero) => {
      if (hero.customIncitingIncident) return 'Custom';
      if (hero.career?.incitingIncident) return 'Set';
      return undefined;
    },
  },
  {
    id: 'complications',
    label: 'Complications',
    getValue: (hero) => hero.complications ? 'Defined' : undefined,
  },
  {
    id: 'titles',
    label: 'Titles',
    getValue: (hero) => hero.title || undefined,
    getBadge: () => undefined,
  },
  {
    id: 'languages',
    label: 'Languages',
    getValue: (hero) => {
      const langs = hero.languages || [];
      if (langs.length === 0) return undefined;
      return `${langs.length}`;
    },
  },
  {
    id: 'skills',
    label: 'Skills',
    getValue: () => undefined,
    getBadge: (hero) => hero.skills?.length || undefined,
  },
  {
    id: 'perks',
    label: 'Perks',
    getValue: () => undefined,
    getBadge: (hero) => hero.selectedPerks?.length || undefined,
  },
  {
    id: 'conditions',
    label: 'Conditions',
    getValue: () => undefined,
    getBadge: (hero) => hero.activeConditions?.length || undefined,
  },
];

// Class-specific items configuration
interface ClassSpecificItem {
  id: CharacterItemId;
  label: string;
  getValue: (hero: Hero) => string | undefined;
  getBadge?: (hero: Hero) => number | undefined;
}

// Get class-specific items based on hero class
function getClassSpecificItems(hero: Hero): ClassSpecificItem[] {
  const items: ClassSpecificItem[] = [];

  // All classes get a "Class Mechanics" overview item
  items.push({
    id: 'class-mechanics',
    label: 'Class Mechanics',
    getValue: () => hero.heroClass ? hero.heroClass.charAt(0).toUpperCase() + hero.heroClass.slice(1) : undefined,
  });

  // Summoner-specific items
  if (isSummonerHero(hero)) {
    items.push({
      id: 'formation',
      label: 'Formation',
      getValue: () => hero.formation ? hero.formation.charAt(0).toUpperCase() + hero.formation.slice(1) : undefined,
    });
    items.push({
      id: 'minions',
      label: 'Minions',
      getValue: () => undefined,
      getBadge: () => {
        const total = hero.activeSquads?.reduce((sum, squad) => sum + squad.members.length, 0) ?? 0;
        return total > 0 ? total : undefined;
      },
    });
    items.push({
      id: 'portfolio',
      label: 'Portfolio',
      getValue: () => hero.portfolio?.type
        ? hero.portfolio.type.charAt(0).toUpperCase() + hero.portfolio.type.slice(1)
        : undefined,
    });
  }

  // Tactician-specific items
  if (isTacticianHero(hero)) {
    items.push({
      id: 'marked-targets',
      label: 'Marked Targets',
      getValue: () => undefined,
      getBadge: () => hero.markedTargets?.length || undefined,
    });
  }

  // Fury-specific items
  if (isFuryHero(hero)) {
    items.push({
      id: 'growing-ferocity',
      label: 'Growing Ferocity',
      getValue: () => {
        const ferocity = hero.heroicResource?.current ?? 0;
        // Determine active tier
        if (ferocity >= 18) return 'Tier 6';
        if (ferocity >= 15) return 'Tier 5';
        if (ferocity >= 12) return 'Tier 4';
        if (ferocity >= 9) return 'Tier 3';
        if (ferocity >= 6) return 'Tier 2';
        if (ferocity >= 3) return 'Tier 1';
        return 'No Tier';
      },
    });
  }

  return items;
}

export function CharacterMasterList() {
  const { hero } = useHeroContext();
  const { selectedItemId, setSelectedItem } = useNavigation();

  if (!hero) {
    return (
      <MasterList>
        <div className="p-4 text-center text-[var(--text-muted)]">
          No character loaded
        </div>
      </MasterList>
    );
  }

  const classSpecificItems = getClassSpecificItems(hero);

  const isLevelUpReady = canLevelUp(hero.level, hero.xp || 0);
  const xpDisplay = getXpRangeDisplay(hero.level, hero.xp || 0);
  const canRespec = hero.level >= 2;

  return (
    <MasterList>
      {/* Progression section - shown when level up ready or can respec */}
      {(isLevelUpReady || canRespec) && (
        <MasterListSection label="Progression">
          {isLevelUpReady && (
            <MasterListItem
              label="Level Up!"
              value={`Lv ${hero.level} → ${hero.level + 1}`}
              selected={selectedItemId === 'level-up'}
              onClick={() => setSelectedItem('level-up')}
            />
          )}
          {canRespec && (
            <MasterListItem
              label="Respec"
              value="Reset choices"
              selected={selectedItemId === 'respec'}
              onClick={() => setSelectedItem('respec')}
            />
          )}
        </MasterListSection>
      )}

      {/* Core Character Items */}
      <MasterListSection label="Character">
        {CHARACTER_ITEMS.map((item) => (
          <MasterListItem
            key={item.id}
            label={item.label}
            value={item.getValue(hero)}
            badge={item.getBadge?.(hero)}
            selected={selectedItemId === item.id}
            onClick={() => setSelectedItem(item.id)}
          />
        ))}
        {/* Level Up - Always visible in list, highlighted when ready */}
        <MasterListItem
          label="Level & XP"
          value={xpDisplay}
          selected={selectedItemId === 'level-up'}
          onClick={() => setSelectedItem('level-up')}
        />
      </MasterListSection>

      {/* Class-Specific Items */}
      {classSpecificItems.length > 0 && (
        <MasterListSection label="Class Features">
          {classSpecificItems.map((item) => (
            <MasterListItem
              key={item.id}
              label={item.label}
              value={item.getValue(hero)}
              badge={item.getBadge?.(hero)}
              selected={selectedItemId === item.id}
              onClick={() => setSelectedItem(item.id)}
            />
          ))}
        </MasterListSection>
      )}
    </MasterList>
  );
}

export default CharacterMasterList;
