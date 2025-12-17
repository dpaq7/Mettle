import React, { useState, useMemo, useEffect } from 'react';
import { MagicItem, EquipmentSlot, ALL_MAGIC_ITEMS, getItemById } from '../../data/magicItems';
import { EquippedItem } from '../../types/equipment';
import { SlotConfig } from './slotConfig';
import { useCustomItems, CustomMagicItem } from '../../hooks/useCustomItems';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  ScrollArea,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn';
import { Search, X, ChevronDown, ChevronRight, Sparkles, Package, Crown, Gem, Star } from 'lucide-react';

// Extended type that includes custom items
type SelectableMagicItem = MagicItem | CustomMagicItem;

interface ItemSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  slotConfig: SlotConfig;
  currentItem: EquippedItem | null;
  onSelectItem: (item: MagicItem) => void;
  onUnequip: () => void;
  equippedItemIds: string[]; // Items already equipped (to prevent duplicates)
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  isOpen,
  onClose,
  slotConfig,
  currentItem,
  onSelectItem,
  onUnequip,
  equippedItemIds,
}) => {
  const { customItems } = useCustomItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [echelonFilter, setEchelonFilter] = useState<number | 'all'>('all');

  // Combine standard items with custom items
  const allItems: SelectableMagicItem[] = useMemo(() => {
    return [...ALL_MAGIC_ITEMS, ...customItems];
  }, [customItems]);

  // Filter items that can be equipped in this slot
  const availableItems = useMemo(() => {
    return allItems.filter((item) => {
      // Must have a slot that matches one of the accepted slots
      if (!item.slot) return false;
      if (!slotConfig.acceptedSlots.includes(item.slot)) return false;

      // Don't show items already equipped elsewhere (except current item)
      if (equippedItemIds.includes(item.id) && item.id !== currentItem?.itemId) {
        return false;
      }

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!item.name.toLowerCase().includes(term) && !item.effect.toLowerCase().includes(term)) {
          return false;
        }
      }

      // Apply category filter
      if (categoryFilter === 'custom') {
        if (!('isCustom' in item)) return false;
      } else if (categoryFilter !== 'all') {
        if (item.category !== categoryFilter) return false;
      }

      // Apply echelon filter
      if (echelonFilter !== 'all' && item.echelon !== echelonFilter) {
        return false;
      }

      return true;
    });
  }, [allItems, slotConfig.acceptedSlots, equippedItemIds, currentItem?.itemId, searchTerm, categoryFilter, echelonFilter]);

  // Group items by category (including custom)
  const groupedItems = useMemo(() => {
    const groups: Record<string, SelectableMagicItem[]> = {
      custom: [],
      artifact: [],
      leveled: [],
      trinket: [],
      consumable: [],
    };

    availableItems.forEach((item) => {
      if ('isCustom' in item && item.isCustom) {
        groups.custom.push(item);
      } else if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });

    return groups;
  }, [availableItems]);

  // Reset filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setCategoryFilter('all');
      setEchelonFilter('all');
    }
  }, [isOpen]);

  // Handler for Dialog's onOpenChange
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  // Get category icon
  const getCategoryIcon = (category: string, isCustom?: boolean) => {
    if (isCustom) return <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" />;
    switch (category) {
      case 'artifact': return <Crown className="h-4 w-4 text-purple-400" />;
      case 'leveled': return <Gem className="h-4 w-4 text-amber-400" />;
      case 'trinket': return <Star className="h-4 w-4 text-blue-400" />;
      case 'consumable': return <Package className="h-4 w-4 text-green-400" />;
      case 'custom': return <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" />;
      default: return <Package className="h-4 w-4 text-[var(--text-muted)]" />;
    }
  };

  // Get category badge variant
  const getCategoryVariant = (category: string): 'default' | 'secondary' | 'outline' | 'tier1' | 'tier2' | 'tier3' | 'keyword' => {
    switch (category) {
      case 'artifact': return 'tier1';
      case 'leveled': return 'tier2';
      case 'trinket': return 'tier3';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent variant="scroll" className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{slotConfig.icon}</span>
            Select {slotConfig.label} Item
          </DialogTitle>
          <DialogDescription>
            {availableItems.length} item{availableItems.length !== 1 ? 's' : ''} available
          </DialogDescription>
        </DialogHeader>

        {/* Current Item */}
        {currentItem && (
          <div className="current-item-section-new">
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Currently Equipped
            </div>
            <div className="flex items-center justify-between gap-3 p-3 bg-[var(--bg-dark)] rounded border border-[var(--accent-dim)]">
              <div className="flex items-center gap-2 min-w-0">
                {getCategoryIcon(currentItem.category)}
                <div className="min-w-0">
                  <span className="block font-medium text-[var(--text-primary)] truncate">
                    {currentItem.name}
                  </span>
                  <Badge variant={getCategoryVariant(currentItem.category)} size="sm" className="capitalize">
                    {currentItem.category}
                  </Badge>
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={onUnequip}>
                Unequip
              </Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="selector-filters-new">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <Input
              variant="fantasy"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-8"
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger variant="fantasy" className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent variant="fantasy">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
              <SelectItem value="trinket">Trinkets</SelectItem>
              <SelectItem value="leveled">Leveled</SelectItem>
              <SelectItem value="artifact">Artifacts</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={echelonFilter === 'all' ? 'all' : String(echelonFilter)}
            onValueChange={(val) => setEchelonFilter(val === 'all' ? 'all' : parseInt(val))}
          >
            <SelectTrigger variant="fantasy" className="w-[110px]">
              <SelectValue placeholder="Echelon" />
            </SelectTrigger>
            <SelectContent variant="fantasy">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">E1</SelectItem>
              <SelectItem value="2">E2</SelectItem>
              <SelectItem value="3">E3</SelectItem>
              <SelectItem value="4">E4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items List */}
        <ScrollArea className="h-[350px] pr-2">
          {availableItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-10 w-10 text-[var(--text-dim)] mb-3" />
              <p className="text-[var(--text-primary)] font-medium">No items available</p>
              <p className="text-sm text-[var(--text-muted)]">
                {searchTerm ? 'Try adjusting your search or filters.' : 'No items found for this slot.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Custom items first */}
              {groupedItems.custom.length > 0 && (
                <ItemGroup
                  title="Custom Items"
                  items={groupedItems.custom}
                  currentItemId={currentItem?.itemId}
                  onSelectItem={onSelectItem}
                  getCategoryIcon={getCategoryIcon}
                  isCustom={true}
                />
              )}

              {/* Artifacts */}
              {groupedItems.artifact.length > 0 && (
                <ItemGroup
                  title="Artifacts"
                  items={groupedItems.artifact}
                  currentItemId={currentItem?.itemId}
                  onSelectItem={onSelectItem}
                  getCategoryIcon={getCategoryIcon}
                  categoryVariant="tier1"
                />
              )}

              {/* Leveled items */}
              {groupedItems.leveled.length > 0 && (
                <ItemGroup
                  title="Leveled Treasures"
                  items={groupedItems.leveled}
                  currentItemId={currentItem?.itemId}
                  onSelectItem={onSelectItem}
                  getCategoryIcon={getCategoryIcon}
                  categoryVariant="tier2"
                />
              )}

              {/* Trinkets */}
              {groupedItems.trinket.length > 0 && (
                <ItemGroup
                  title="Trinkets"
                  items={groupedItems.trinket}
                  currentItemId={currentItem?.itemId}
                  onSelectItem={onSelectItem}
                  getCategoryIcon={getCategoryIcon}
                  categoryVariant="tier3"
                />
              )}
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button variant="chamfered" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Item Group component for categorized items
interface ItemGroupProps {
  title: string;
  items: SelectableMagicItem[];
  currentItemId?: string;
  onSelectItem: (item: MagicItem) => void;
  getCategoryIcon: (category: string, isCustom?: boolean) => React.ReactNode;
  isCustom?: boolean;
  categoryVariant?: 'tier1' | 'tier2' | 'tier3';
}

const ItemGroup: React.FC<ItemGroupProps> = ({
  title,
  items,
  currentItemId,
  onSelectItem,
  getCategoryIcon,
  isCustom,
  categoryVariant,
}) => {
  const borderColor = categoryVariant === 'tier1' ? 'var(--color-tier1, #ce93d8)'
    : categoryVariant === 'tier2' ? 'var(--color-tier2, #ffb74d)'
    : categoryVariant === 'tier3' ? 'var(--color-tier3, #64b5f6)'
    : isCustom ? 'var(--accent-primary)'
    : 'var(--border-solid)';

  return (
    <div className="item-group-new">
      <div
        className="item-group-header-new"
        style={{ borderLeftColor: borderColor }}
      >
        {title}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ItemCardNew
            key={item.id}
            item={item}
            isCurrentItem={item.id === currentItemId}
            onSelect={() => onSelectItem(item as MagicItem)}
            getCategoryIcon={getCategoryIcon}
            isCustom={isCustom || ('isCustom' in item && item.isCustom)}
            categoryVariant={categoryVariant}
          />
        ))}
      </div>
    </div>
  );
};

// Individual item card in the selector
interface ItemCardNewProps {
  item: SelectableMagicItem;
  isCurrentItem: boolean;
  onSelect: () => void;
  getCategoryIcon: (category: string, isCustom?: boolean) => React.ReactNode;
  isCustom?: boolean;
  categoryVariant?: 'tier1' | 'tier2' | 'tier3';
}

const ItemCardNew: React.FC<ItemCardNewProps> = ({
  item,
  isCurrentItem,
  onSelect,
  getCategoryIcon,
  isCustom,
  categoryVariant,
}) => {
  const [expanded, setExpanded] = useState(false);

  const borderColor = categoryVariant === 'tier1' ? 'var(--color-tier1, #ce93d8)'
    : categoryVariant === 'tier2' ? 'var(--color-tier2, #ffb74d)'
    : categoryVariant === 'tier3' ? 'var(--color-tier3, #64b5f6)'
    : isCustom ? 'var(--accent-primary)'
    : 'var(--border-solid)';

  return (
    <div
      className={`item-card-new ${isCurrentItem ? 'item-card-new--current' : ''} ${isCustom ? 'item-card-new--custom' : ''}`}
      style={{ borderLeftColor: borderColor }}
    >
      <div
        className="item-card-header-new"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
          )}
          <span className="font-medium text-[var(--text-primary)] truncate">{item.name}</span>
          <Badge variant="outline" size="sm">E{item.echelon}</Badge>
          {isCustom && (
            <Badge variant="keyword" size="sm">Custom</Badge>
          )}
        </div>
        <Button
          variant={isCurrentItem ? 'outline' : 'default'}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          disabled={isCurrentItem}
        >
          {isCurrentItem ? 'Equipped' : 'Equip'}
        </Button>
      </div>

      {expanded && (
        <div className="item-details-new">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            {item.effect}
          </p>
          {item.enhancements && item.enhancements.length > 0 && (
            <div className="pt-2 border-t border-[var(--border-dark)]">
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Enhancements
              </span>
              <div className="space-y-1">
                {item.enhancements.map((enh, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <span className="text-[var(--color-warning)] font-semibold min-w-[40px]">
                      Lv {enh.level}:
                    </span>
                    <span className="text-[var(--text-secondary)]">{enh.effect}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemSelector;
