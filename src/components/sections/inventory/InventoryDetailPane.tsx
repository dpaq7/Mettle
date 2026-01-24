import { useCallback, useMemo } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { useEquipment } from '@/hooks/useEquipment';
import { SLOT_LABELS } from '@/types/equipment';
import type { InventoryItem } from '@/types/projects';
import {
  MagicItem,
  getItemById,
  parseItemBonuses,
  CONSUMABLE_ITEMS,
  TRINKET_ITEMS,
  LEVELED_ITEMS,
  ARTIFACT_ITEMS,
} from '@/data/magicItems';
import { Minus, Plus, Trash2, Package, Shield, Zap } from 'lucide-react';
import '../character/CharacterDetailPane.css';
import './InventoryDetailPane.css';

// Get all compendium items
const ALL_COMPENDIUM_ITEMS = [
  ...CONSUMABLE_ITEMS,
  ...TRINKET_ITEMS,
  ...LEVELED_ITEMS,
  ...ARTIFACT_ITEMS,
];

function EmptyState() {
  return (
    <div className="detail-empty">
      <p>Select an item from the list to view details</p>
    </div>
  );
}

// Category display names
const CATEGORY_LABELS: Record<string, string> = {
  weapon: 'Weapon',
  armor: 'Armor',
  implement: 'Implement',
  consumable: 'Consumable',
  treasure: 'Treasure',
  material: 'Material',
  misc: 'Miscellaneous',
  trinket: 'Trinket',
  leveled: 'Leveled Item',
  artifact: 'Artifact',
};

function GoldDisplay() {
  const { hero, updateHero } = useHeroContext();

  const handleGoldChange = (delta: number) => {
    if (!hero) return;
    const newGold = Math.max(0, (hero.gold || 0) + delta);
    updateHero({ gold: newGold });
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Gold</h1>
        <span className="detail-subtitle">Currency</span>
      </header>

      <section className="detail-section">
        <div className="detail-stats-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="detail-stat">
            <span className="detail-stat-label">Current Gold</span>
            <span className="detail-stat-value" style={{ fontSize: 'var(--text-3xl)' }}>
              {hero?.gold || 0}
            </span>
          </div>
        </div>

        <div className="gold-controls">
          <button className="gold-btn" onClick={() => handleGoldChange(-10)}>
            -10
          </button>
          <button className="gold-btn" onClick={() => handleGoldChange(-1)}>
            -1
          </button>
          <button className="gold-btn" onClick={() => handleGoldChange(1)}>
            +1
          </button>
          <button className="gold-btn" onClick={() => handleGoldChange(10)}>
            +10
          </button>
        </div>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">Wealth Level</h2>
        <p className="detail-text">
          Your wealth level is {hero?.wealth || 0}. Wealth represents your ongoing income,
          property, and resources beyond simple gold pieces.
        </p>
        <div
          className="detail-stats-grid"
          style={{ gridTemplateColumns: '1fr', marginTop: 'var(--space-3)' }}
        >
          <div className="detail-stat">
            <span className="detail-stat-label">Wealth</span>
            <span className="detail-stat-value">{hero?.wealth || 0}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

interface EquippedItemDisplayProps {
  itemId: string;
}

function EquippedItemDisplay({ itemId }: EquippedItemDisplayProps) {
  const { hero } = useHeroContext();
  const { equippedItems, unequipItem } = useEquipment();

  const equippedItem = equippedItems.find((e) => e.itemId === itemId);
  const magicItem = getItemById(itemId);

  if (!equippedItem || !hero) {
    return <EmptyState />;
  }

  const slotLabel = SLOT_LABELS[equippedItem.slot as keyof typeof SLOT_LABELS] || equippedItem.slot;
  const categoryLabel = CATEGORY_LABELS[equippedItem.category] || equippedItem.category;

  // Get current bonuses from item
  const bonuses = magicItem ? parseItemBonuses(magicItem, hero.level) : [];

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{equippedItem.name}</h1>
        <div className="item-header-meta">
          <span className="detail-subtitle">{categoryLabel}</span>
          <span className="item-slot-badge">
            <Shield size={12} />
            {slotLabel}
          </span>
        </div>
      </header>

      {/* Effect */}
      <section className="detail-section">
        <h2 className="detail-section-title">Effect</h2>
        <p className="detail-text">{equippedItem.effect}</p>
      </section>

      {/* Stat Bonuses */}
      {bonuses.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Stat Bonuses</h2>
          <div className="item-bonuses-grid">
            {bonuses.map((bonus, idx) => (
              <div key={idx} className="item-bonus">
                <span className="bonus-value">+{bonus.value}</span>
                <span className="bonus-stat">{bonus.stat}</span>
                {bonus.conditional && (
                  <span className="bonus-condition">{bonus.conditional}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Enhancements for leveled items */}
      {magicItem?.enhancements && magicItem.enhancements.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Enhancements</h2>
          <div className="item-enhancements">
            {magicItem.enhancements.map((enhancement, index) => {
              const isActive = hero.level >= enhancement.level;
              return (
                <div
                  key={index}
                  className={`item-enhancement ${isActive ? 'active' : 'locked'}`}
                >
                  <div className="item-enhancement-level">
                    Level {enhancement.level}
                    {isActive && <span className="enhancement-active-badge">Active</span>}
                  </div>
                  <div className="item-enhancement-desc">{enhancement.effect}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Actions */}
      <section className="item-actions">
        <button className="item-action-btn danger" onClick={() => unequipItem(itemId)}>
          Unequip
        </button>
      </section>
    </div>
  );
}

interface InventoryItemDisplayProps {
  item: InventoryItem;
}

function InventoryItemDisplay({ item }: InventoryItemDisplayProps) {
  const { hero, updateHero } = useHeroContext();
  const { setSelectedItem } = useNavigation();

  const categoryLabel = CATEGORY_LABELS[item.category] || item.category;

  const handleQuantityChange = useCallback(
    (delta: number) => {
      if (!hero?.inventory) return;

      const newQuantity = Math.max(0, item.quantity + delta);

      if (newQuantity === 0) {
        // Remove item
        const updatedInventory = hero.inventory.filter((i) => i.id !== item.id);
        updateHero({ inventory: updatedInventory });
        setSelectedItem(null);
      } else {
        // Update quantity
        const updatedInventory = hero.inventory.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
        updateHero({ inventory: updatedInventory });
      }
    },
    [hero, item, updateHero, setSelectedItem]
  );

  const handleUse = useCallback(() => {
    handleQuantityChange(-1);
  }, [handleQuantityChange]);

  const handleDrop = useCallback(() => {
    if (!hero?.inventory) return;
    const updatedInventory = hero.inventory.filter((i) => i.id !== item.id);
    updateHero({ inventory: updatedInventory });
    setSelectedItem(null);
  }, [hero, item.id, updateHero, setSelectedItem]);

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{item.name}</h1>
        <div className="item-header-meta">
          <span className="detail-subtitle">{categoryLabel}</span>
          <span className={`item-rarity ${item.rarity}`}>{item.rarity}</span>
          {item.level && <span className="item-level-badge">Lv {item.level}</span>}
        </div>
      </header>

      {/* Quantity Controls */}
      <section className="detail-section">
        <div className="quantity-control">
          <span className="quantity-label">Quantity</span>
          <div className="quantity-buttons">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 0}
            >
              <Minus size={16} />
            </button>
            <span className="quantity-value">{item.quantity}</span>
            <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Description */}
      {item.description && (
        <section className="detail-section">
          <h2 className="detail-section-title">Description</h2>
          <p className="detail-text">{item.description}</p>
        </section>
      )}

      {/* Enhancements */}
      {item.enhancements && item.enhancements.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Enhancements</h2>
          <div className="item-enhancements">
            {item.enhancements.map((enhancement, index) => (
              <div key={index} className="item-enhancement">
                <div className="item-enhancement-level">Level {enhancement.level}</div>
                <div className="item-enhancement-name">{enhancement.name}</div>
                <div className="item-enhancement-desc">{enhancement.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notes */}
      {item.notes && (
        <section className="detail-section">
          <h2 className="detail-section-title">Notes</h2>
          <p className="detail-text">{item.notes}</p>
        </section>
      )}

      {/* Action Buttons */}
      <section className="item-actions">
        {item.category === 'consumable' && (
          <button className="item-action-btn primary" onClick={handleUse}>
            <Zap size={14} />
            Use
          </button>
        )}
        <button className="item-action-btn danger" onClick={handleDrop}>
          <Trash2 size={14} />
          Drop
        </button>
      </section>
    </div>
  );
}

interface CompendiumItemDisplayProps {
  item: MagicItem;
}

function CompendiumItemDisplay({ item }: CompendiumItemDisplayProps) {
  const { hero, updateHero } = useHeroContext();
  const { equipItem, isEquipped, unequipItem } = useEquipment();

  const categoryLabel = CATEGORY_LABELS[item.category] || item.category;
  const slotLabel = item.slot ? SLOT_LABELS[item.slot as keyof typeof SLOT_LABELS] : null;
  const equipped = isEquipped(item.id);

  // Get bonuses based on hero level
  const bonuses = hero ? parseItemBonuses(item, hero.level) : [];

  const handleEquip = useCallback(() => {
    if (equipped) {
      unequipItem(item.id);
    } else {
      equipItem(item);
    }
  }, [equipped, item, equipItem, unequipItem]);

  const handleAddToInventory = useCallback(() => {
    if (!hero) return;

    const existingItem = hero.inventory?.find((i) => i.name === item.name);

    if (existingItem && item.category === 'consumable') {
      // Increase quantity for consumables
      const updatedInventory = (hero.inventory || []).map((i) =>
        i.id === existingItem.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      updateHero({ inventory: updatedInventory });
    } else {
      // Add new item
      const newItem: InventoryItem = {
        id: `${item.id}-${Date.now()}`,
        name: item.name,
        category: item.category === 'consumable' ? 'consumable' : 'treasure',
        rarity: item.echelon === 1 ? 'common' : item.echelon === 2 ? 'uncommon' : item.echelon === 3 ? 'rare' : 'legendary',
        quantity: 1,
        description: item.effect,
        level: item.echelon,
        enhancements: item.enhancements?.map((e) => ({
          level: e.level,
          name: `Level ${e.level} Enhancement`,
          description: e.effect,
        })),
      };

      updateHero({
        inventory: [...(hero.inventory || []), newItem],
      });
    }
  }, [hero, item, updateHero]);

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{item.name}</h1>
        <div className="item-header-meta">
          <span className="detail-subtitle">{categoryLabel}</span>
          <span className="item-echelon-badge">Echelon {item.echelon}</span>
          {slotLabel && (
            <span className="item-slot-badge">
              <Shield size={12} />
              {slotLabel}
            </span>
          )}
          {equipped && <span className="item-equipped-badge">Equipped</span>}
        </div>
      </header>

      {/* Keywords */}
      {item.keywords && item.keywords.length > 0 && (
        <div className="item-keywords">
          {item.keywords.map((keyword, idx) => (
            <span key={idx} className="item-keyword">
              {keyword}
            </span>
          ))}
        </div>
      )}

      {/* Flavor Text */}
      {item.flavorText && (
        <section className="detail-section">
          <p className="item-flavor">{item.flavorText}</p>
        </section>
      )}

      {/* Effect */}
      <section className="detail-section">
        <h2 className="detail-section-title">Effect</h2>
        <p className="detail-text">{item.effect}</p>
      </section>

      {/* Stat Bonuses */}
      {bonuses.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Stat Bonuses</h2>
          <div className="item-bonuses-grid">
            {bonuses.map((bonus, idx) => (
              <div key={idx} className="item-bonus">
                <span className="bonus-value">+{bonus.value}</span>
                <span className="bonus-stat">{bonus.stat}</span>
                {bonus.conditional && (
                  <span className="bonus-condition">{bonus.conditional}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Enhancements */}
      {item.enhancements && item.enhancements.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Enhancements</h2>
          <div className="item-enhancements">
            {item.enhancements.map((enhancement, index) => {
              const isActive = hero && hero.level >= enhancement.level;
              return (
                <div
                  key={index}
                  className={`item-enhancement ${isActive ? 'active' : 'locked'}`}
                >
                  <div className="item-enhancement-level">
                    Level {enhancement.level}
                    {isActive && <span className="enhancement-active-badge">Active</span>}
                  </div>
                  <div className="item-enhancement-desc">{enhancement.effect}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Prerequisite */}
      {item.prerequisite && (
        <section className="detail-section">
          <h2 className="detail-section-title">Prerequisite</h2>
          <p className="detail-text">{item.prerequisite}</p>
        </section>
      )}

      {/* Craft Goal */}
      {item.projectGoal && (
        <section className="detail-section">
          <div className="item-craft-info">
            <span className="craft-label">Project Goal:</span>
            <span className="craft-value">{item.projectGoal} PP</span>
          </div>
        </section>
      )}

      {/* Actions */}
      <section className="item-actions">
        {item.slot && (
          <button
            className={`item-action-btn ${equipped ? 'ghost' : 'primary'}`}
            onClick={handleEquip}
          >
            <Shield size={14} />
            {equipped ? 'Unequip' : 'Equip'}
          </button>
        )}
        {item.category === 'consumable' && (
          <button className="item-action-btn ghost" onClick={handleAddToInventory}>
            <Package size={14} />
            Add to Inventory
          </button>
        )}
      </section>
    </div>
  );
}

export function InventoryDetailPane() {
  const { hero } = useHeroContext();
  const { selectedItemId } = useNavigation();

  // Parse the selected item ID to determine type
  const parsedSelection = useMemo(() => {
    if (!selectedItemId) return null;

    if (selectedItemId === 'gold') {
      return { type: 'gold' as const };
    }

    if (selectedItemId.startsWith('equipped:')) {
      return { type: 'equipped' as const, id: selectedItemId.replace('equipped:', '') };
    }

    if (selectedItemId.startsWith('inv:')) {
      return { type: 'inventory' as const, id: selectedItemId.replace('inv:', '') };
    }

    if (selectedItemId.startsWith('compendium:')) {
      return { type: 'compendium' as const, id: selectedItemId.replace('compendium:', '') };
    }

    // Legacy support - try to find in inventory
    return { type: 'inventory' as const, id: selectedItemId };
  }, [selectedItemId]);

  if (!hero || !parsedSelection) {
    return <EmptyState />;
  }

  // Handle gold display
  if (parsedSelection.type === 'gold') {
    return <GoldDisplay />;
  }

  // Handle equipped item display
  if (parsedSelection.type === 'equipped') {
    return <EquippedItemDisplay itemId={parsedSelection.id} />;
  }

  // Handle compendium item display
  if (parsedSelection.type === 'compendium') {
    const compendiumItem = ALL_COMPENDIUM_ITEMS.find((i) => i.id === parsedSelection.id);
    if (!compendiumItem) {
      return <EmptyState />;
    }
    return <CompendiumItemDisplay item={compendiumItem} />;
  }

  // Handle inventory item display
  const inventoryItem = hero.inventory?.find((i) => i.id === parsedSelection.id);
  if (!inventoryItem) {
    return <EmptyState />;
  }

  return <InventoryItemDisplay item={inventoryItem} />;
}

export default InventoryDetailPane;
