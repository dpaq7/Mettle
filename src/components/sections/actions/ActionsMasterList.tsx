import { useMemo } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { MasterList, MasterListSection, MasterListItem } from '@/components/layout/MasterList';
import { getResourceConfig } from '@/data/class-resources';
import { getClassAbilities } from '@/data/class-abilities';
import { isFuryHero } from '@/types/hero';

export function ActionsMasterList() {
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

  const resourceConfig = getResourceConfig(hero.heroClass);
  const resourceName = resourceConfig.name;

  // Get subclass for aspect-specific abilities
  const subclass = isFuryHero(hero) ? hero.furyState?.aspect : hero.subclass;

  // Get all class abilities from data
  const classAbilities = useMemo(() => {
    return getClassAbilities(hero.heroClass, subclass);
  }, [hero.heroClass, subclass]);

  // Build tier items with counts
  const tierItems = useMemo(() => {
    const items: { id: string; label: string; count: number }[] = [];

    // Kit ability (always first if exists)
    if (hero.kit?.signatureAbility) {
      items.push({
        id: 'kit',
        label: `Kit: ${hero.kit.name}`,
        count: 1,
      });
    }

    // Signature abilities
    if (classAbilities.signature.length > 0) {
      items.push({
        id: 'signature',
        label: 'Signature Abilities',
        count: classAbilities.signature.length,
      });
    }

    // 3-cost abilities
    if (classAbilities.threeCost.length > 0) {
      items.push({
        id: '3-cost',
        label: `3 ${resourceName}`,
        count: classAbilities.threeCost.length,
      });
    }

    // 5-cost abilities
    if (classAbilities.fiveCost.length > 0) {
      items.push({
        id: '5-cost',
        label: `5 ${resourceName}`,
        count: classAbilities.fiveCost.length,
      });
    }

    // 7-cost abilities
    if (classAbilities.sevenCost.length > 0) {
      items.push({
        id: '7-cost',
        label: `7 ${resourceName}`,
        count: classAbilities.sevenCost.length,
      });
    }

    // 9-cost abilities
    if (classAbilities.nineCost.length > 0) {
      items.push({
        id: '9-cost',
        label: `9 ${resourceName}`,
        count: classAbilities.nineCost.length,
      });
    }

    // 11-cost abilities
    if (classAbilities.elevenCost.length > 0) {
      items.push({
        id: '11-cost',
        label: `11 ${resourceName}`,
        count: classAbilities.elevenCost.length,
      });
    }

    return items;
  }, [classAbilities, resourceName, hero.kit]);

  // If no class abilities data, fall back to hero.abilities grouped by cost
  const heroAbilitiesByTier = useMemo(() => {
    if (tierItems.length > 0) return null;

    const abilities = hero.abilities || [];
    const grouped: Record<string, number> = {};

    abilities.forEach((ability) => {
      const cost = ability.cost?.amount || ability.essenceCost || 0;
      const key = cost === 0 ? 'signature' : `${cost}-cost`;
      grouped[key] = (grouped[key] || 0) + 1;
    });

    return grouped;
  }, [hero.abilities, tierItems]);

  return (
    <MasterList>
      {/* Class Abilities Section */}
      <MasterListSection label="Class Abilities">
        {tierItems.map((item) => (
          <MasterListItem
            key={item.id}
            label={item.label}
            badge={item.count}
            selected={selectedItemId === item.id}
            onClick={() => setSelectedItem(item.id)}
          />
        ))}

        {/* Fallback for classes without data */}
        {heroAbilitiesByTier && Object.entries(heroAbilitiesByTier).map(([tier, count]) => (
          <MasterListItem
            key={tier}
            label={tier === 'signature' ? 'Signature' : tier.replace('-cost', ` ${resourceName}`)}
            badge={count}
            selected={selectedItemId === tier}
            onClick={() => setSelectedItem(tier)}
          />
        ))}
      </MasterListSection>

      {/* Action Reference Section */}
      <MasterListSection label="Action Reference">
        <MasterListItem
          label="Main Actions"
          selected={selectedItemId === 'main'}
          onClick={() => setSelectedItem('main')}
        />
        <MasterListItem
          label="Movement Actions"
          selected={selectedItemId === 'moves'}
          onClick={() => setSelectedItem('moves')}
        />
        <MasterListItem
          label="Standard Maneuvers"
          selected={selectedItemId === 'maneuvers'}
          onClick={() => setSelectedItem('maneuvers')}
        />
        <MasterListItem
          label="Triggered Actions"
          selected={selectedItemId === 'triggered'}
          onClick={() => setSelectedItem('triggered')}
        />
      </MasterListSection>
    </MasterList>
  );
}

export default ActionsMasterList;
