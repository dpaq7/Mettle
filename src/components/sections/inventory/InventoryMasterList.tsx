import { useMemo, useState } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { useEquipment } from '@/hooks/useEquipment';
import { MasterList, MasterListSection, MasterListItem } from '@/components/layout/MasterList';
import { SLOT_LABELS, EquippedItem } from '@/types/equipment';
import {
  CONSUMABLE_ITEMS,
  TRINKET_ITEMS,
  LEVELED_ITEMS,
  ARTIFACT_ITEMS,
  ItemCategory,
} from '@/data/magicItems';

type CompendiumCategory = 'all' | ItemCategory;

export function InventoryMasterList() {
  const { hero } = useHeroContext();
  const { selectedItemId, setSelectedItem } = useNavigation();
  const { equippedItems } = useEquipment();
  const [compendiumCategory, setCompendiumCategory] = useState<CompendiumCategory>('all');

  // Group inventory by category
  const inventory = hero?.inventory || [];
  const consumables = inventory.filter((i) => i.category === 'consumable');
  const materials = inventory.filter((i) => i.category === 'material');
  const treasures = inventory.filter((i) => i.category === 'treasure');
  const other = inventory.filter(
    (i) => !['consumable', 'material', 'treasure'].includes(i.category)
  );

  // Group equipped items by slot type
  const groupedEquipped = useMemo(() => {
    const groups: Record<string, EquippedItem[]> = {};
    equippedItems.forEach((item) => {
      const slot = item.slot;
      if (!groups[slot]) groups[slot] = [];
      groups[slot].push(item);
    });
    return groups;
  }, [equippedItems]);

  // Get compendium items based on filter
  const compendiumItems = useMemo(() => {
    switch (compendiumCategory) {
      case 'consumable':
        return CONSUMABLE_ITEMS;
      case 'trinket':
        return TRINKET_ITEMS;
      case 'leveled':
        return LEVELED_ITEMS;
      case 'artifact':
        return ARTIFACT_ITEMS;
      default:
        return [...CONSUMABLE_ITEMS, ...TRINKET_ITEMS, ...LEVELED_ITEMS, ...ARTIFACT_ITEMS];
    }
  }, [compendiumCategory]);

  if (!hero) {
    return (
      <MasterList>
        <div className="p-4 text-center text-[var(--text-muted)]">No character loaded</div>
      </MasterList>
    );
  }

  return (
    <MasterList>
      {/* Equipped Items Section */}
      <MasterListSection label="Equipped">
        {equippedItems.length === 0 ? (
          <div className="p-3 text-center text-[var(--text-muted)] text-sm">
            No items equipped
          </div>
        ) : (
          Object.entries(groupedEquipped).map(([slot, items]) =>
            items.map((item) => (
              <MasterListItem
                key={item.itemId}
                label={item.name}
                value={SLOT_LABELS[item.slot as keyof typeof SLOT_LABELS]}
                selected={selectedItemId === `equipped:${item.itemId}`}
                onClick={() => setSelectedItem(`equipped:${item.itemId}`)}
              />
            ))
          )
        )}
      </MasterListSection>

      {/* Consumables */}
      <MasterListSection label="Consumables">
        {consumables.length === 0 ? (
          <div className="p-3 text-center text-[var(--text-muted)] text-sm">
            No consumables
          </div>
        ) : (
          consumables.map((item) => (
            <MasterListItem
              key={item.id}
              label={item.name}
              badge={item.quantity > 1 ? item.quantity : undefined}
              selected={selectedItemId === `inv:${item.id}`}
              onClick={() => setSelectedItem(`inv:${item.id}`)}
            />
          ))
        )}
      </MasterListSection>

      {/* Materials */}
      {materials.length > 0 && (
        <MasterListSection label="Materials">
          {materials.map((item) => (
            <MasterListItem
              key={item.id}
              label={item.name}
              badge={item.quantity > 1 ? item.quantity : undefined}
              selected={selectedItemId === `inv:${item.id}`}
              onClick={() => setSelectedItem(`inv:${item.id}`)}
            />
          ))}
        </MasterListSection>
      )}

      {/* Treasures */}
      {treasures.length > 0 && (
        <MasterListSection label="Treasures">
          {treasures.map((item) => (
            <MasterListItem
              key={item.id}
              label={item.name}
              badge={item.quantity > 1 ? item.quantity : undefined}
              selected={selectedItemId === `inv:${item.id}`}
              onClick={() => setSelectedItem(`inv:${item.id}`)}
            />
          ))}
        </MasterListSection>
      )}

      {/* Other Items */}
      {other.length > 0 && (
        <MasterListSection label="Other">
          {other.map((item) => (
            <MasterListItem
              key={item.id}
              label={item.name}
              badge={item.quantity > 1 ? item.quantity : undefined}
              selected={selectedItemId === `inv:${item.id}`}
              onClick={() => setSelectedItem(`inv:${item.id}`)}
            />
          ))}
        </MasterListSection>
      )}

      {/* Currency */}
      <MasterListSection label="Currency">
        <MasterListItem
          label="Gold"
          value={String(hero.gold || 0)}
          selected={selectedItemId === 'gold'}
          onClick={() => setSelectedItem('gold')}
        />
      </MasterListSection>

      {/* Compendium Section */}
      <MasterListSection label="Compendium">
        {/* Category Filters */}
        <div className="compendium-filters">
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'all' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('all')}
          >
            All
          </button>
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'consumable' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('consumable')}
          >
            Consumables
          </button>
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'trinket' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('trinket')}
          >
            Trinkets
          </button>
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'leveled' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('leveled')}
          >
            Leveled
          </button>
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'artifact' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('artifact')}
          >
            Artifacts
          </button>
        </div>

        {/* Compendium Items */}
        {compendiumItems.map((item) => (
          <MasterListItem
            key={item.id}
            label={item.name}
            value={`E${item.echelon}`}
            selected={selectedItemId === `compendium:${item.id}`}
            onClick={() => setSelectedItem(`compendium:${item.id}`)}
          />
        ))}
      </MasterListSection>
    </MasterList>
  );
}

export default InventoryMasterList;
