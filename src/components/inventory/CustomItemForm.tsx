import React, { useState, useCallback, useEffect } from 'react';
import { ItemCategory, EquipmentSlot, ItemEnhancement } from '../../data/magicItems';
import { CustomMagicItem, createBlankCustomItem } from '../../hooks/useCustomItems';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Label,
  ScrollArea,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn';
import { Plus, Save, Sparkles, Crown, Gem, Star, Package, ImageIcon, Zap, HelpCircle } from 'lucide-react';

interface CustomItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<CustomMagicItem, 'id' | 'isCustom' | 'createdAt' | 'updatedAt'>) => void;
  editItem?: CustomMagicItem; // If provided, we're editing an existing item
}

const CATEGORIES: { value: ItemCategory; label: string }[] = [
  { value: 'trinket', label: 'Trinket' },
  { value: 'leveled', label: 'Leveled Treasure' },
  { value: 'consumable', label: 'Consumable' },
  { value: 'artifact', label: 'Artifact' },
];

const EQUIPMENT_SLOTS: { value: EquipmentSlot; label: string }[] = [
  { value: 'head', label: 'Head' },
  { value: 'neck', label: 'Neck' },
  { value: 'armor', label: 'Armor' },
  { value: 'arms', label: 'Arms' },
  { value: 'hands', label: 'Hands' },
  { value: 'waist', label: 'Waist' },
  { value: 'feet', label: 'Feet' },
  { value: 'ring', label: 'Ring' },
  { value: 'held', label: 'Held' },
  { value: 'weapon', label: 'Weapon' },
  { value: 'implement', label: 'Implement' },
  { value: 'mount', label: 'Mount' },
];

// Category icon helper
const getCategoryIcon = (category: ItemCategory) => {
  switch (category) {
    case 'artifact': return <Crown className="h-4 w-4 text-purple-400" />;
    case 'leveled': return <Gem className="h-4 w-4 text-amber-400" />;
    case 'trinket': return <Star className="h-4 w-4 text-blue-400" />;
    case 'consumable': return <Package className="h-4 w-4 text-green-400" />;
    default: return <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" />;
  }
};

// Echelon badge variant helper
const getEchelonVariant = (echelon: number): 'default' | 'secondary' | 'outline' | 'tier1' | 'tier2' | 'tier3' => {
  switch (echelon) {
    case 4: return 'tier1';
    case 3: return 'tier2';
    case 2: return 'tier3';
    default: return 'outline';
  }
};

const CustomItemForm: React.FC<CustomItemFormProps> = ({
  isOpen,
  onClose,
  onSave,
  editItem,
}) => {
  const [formData, setFormData] = useState(() =>
    editItem
      ? {
          name: editItem.name,
          category: editItem.category,
          echelon: editItem.echelon,
          slot: editItem.slot,
          effect: editItem.effect,
          projectGoal: editItem.projectGoal,
          imageUrl: editItem.imageUrl,
          enhancements: editItem.enhancements || [],
        }
      : {
          ...createBlankCustomItem(),
          enhancements: [] as ItemEnhancement[],
        }
  );

  const [showEnhancements, setShowEnhancements] = useState(
    editItem?.category === 'leveled' || false
  );

  // Handler for Dialog's onOpenChange
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  // Reset form when modal opens/closes or editItem changes
  useEffect(() => {
    if (isOpen) {
      if (editItem) {
        setFormData({
          name: editItem.name,
          category: editItem.category,
          echelon: editItem.echelon,
          slot: editItem.slot,
          effect: editItem.effect,
          projectGoal: editItem.projectGoal,
          imageUrl: editItem.imageUrl,
          enhancements: editItem.enhancements || [],
        });
        setShowEnhancements(editItem.category === 'leveled');
      } else {
        setFormData({
          ...createBlankCustomItem(),
          enhancements: [],
        });
        setShowEnhancements(false);
      }
    }
  }, [isOpen, editItem]);

  const handleChange = useCallback(
    (field: string, value: string | number | undefined) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Auto-show enhancements for leveled items
      if (field === 'category' && value === 'leveled') {
        setShowEnhancements(true);
        // Initialize default enhancement levels if empty
        setFormData((prev) => ({
          ...prev,
          category: value as ItemCategory,
          enhancements:
            prev.enhancements && prev.enhancements.length > 0
              ? prev.enhancements
              : [
                  { level: 1, effect: '' },
                  { level: 5, effect: '' },
                  { level: 9, effect: '' },
                ],
        }));
      } else if (field === 'category') {
        setShowEnhancements(false);
      }
    },
    []
  );

  const handleEnhancementChange = useCallback(
    (index: number, effect: string) => {
      setFormData((prev) => {
        const newEnhancements = [...(prev.enhancements || [])];
        newEnhancements[index] = { ...newEnhancements[index], effect };
        return { ...prev, enhancements: newEnhancements };
      });
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.name.trim()) {
        alert('Please enter an item name');
        return;
      }

      if (!formData.effect.trim()) {
        alert('Please enter an item effect/description');
        return;
      }

      const itemData: Omit<CustomMagicItem, 'id' | 'isCustom' | 'createdAt' | 'updatedAt'> = {
        name: formData.name.trim(),
        category: formData.category,
        echelon: formData.echelon,
        slot: formData.category !== 'consumable' ? formData.slot : undefined,
        effect: formData.effect.trim(),
        projectGoal: formData.projectGoal || undefined,
        imageUrl: formData.imageUrl?.trim() || undefined,
        enhancements:
          formData.category === 'leveled' && formData.enhancements?.some((e) => e.effect)
            ? formData.enhancements.filter((e) => e.effect)
            : undefined,
      };

      onSave(itemData);
      onClose();
    },
    [formData, onSave, onClose]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent variant="scroll" className="custom-item-form-dialog max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {editItem ? (
              <>
                <Save className="h-5 w-5 text-[var(--accent-primary)]" />
                Edit Custom Item
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-[var(--accent-primary)]" />
                Create Custom Item
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {editItem
              ? `Editing "${editItem.name}"`
              : 'Create a custom magic item with your own properties'
            }
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="custom-item-form-scroll h-[400px] pr-4">
          <form id="custom-item-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="item-name" className="text-sm font-medium">
                Item Name <span className="text-[var(--color-danger)]">*</span>
              </Label>
              <Input
                id="item-name"
                variant="fantasy"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter item name..."
                required
              />
            </div>

            {/* Category & Echelon Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="item-category" className="text-sm font-medium">
                  Category <span className="text-[var(--color-danger)]">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => handleChange('category', val)}
                >
                  <SelectTrigger variant="fantasy" id="item-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent variant="fantasy">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(cat.value)}
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="item-echelon" className="text-sm font-medium">
                  Echelon <span className="text-[var(--color-danger)]">*</span>
                </Label>
                <Select
                  value={String(formData.echelon)}
                  onValueChange={(val) => handleChange('echelon', parseInt(val))}
                >
                  <SelectTrigger variant="fantasy" id="item-echelon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent variant="fantasy">
                    <SelectItem value="1">1st Echelon</SelectItem>
                    <SelectItem value="2">2nd Echelon</SelectItem>
                    <SelectItem value="3">3rd Echelon</SelectItem>
                    <SelectItem value="4">4th Echelon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Equipment Slot (not for consumables) */}
            {formData.category !== 'consumable' && (
              <div className="space-y-1.5">
                <Label htmlFor="item-slot" className="text-sm font-medium">
                  Equipment Slot
                </Label>
                <Select
                  value={formData.slot || '_none'}
                  onValueChange={(val) => handleChange('slot', val === '_none' ? undefined : val)}
                >
                  <SelectTrigger variant="fantasy" id="item-slot">
                    <SelectValue placeholder="No specific slot" />
                  </SelectTrigger>
                  <SelectContent variant="fantasy">
                    <SelectItem value="_none">-- No specific slot --</SelectItem>
                    {EQUIPMENT_SLOTS.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Effect/Description */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="item-effect" className="text-sm font-medium">
                  Effect / Description <span className="text-[var(--color-danger)]">*</span>
                </Label>
                <span title="Include stat bonuses like '+6 Stamina' for automatic parsing">
                  <HelpCircle className="h-3.5 w-3.5 text-[var(--text-muted)] cursor-help" />
                </span>
              </div>
              <Textarea
                id="item-effect"
                variant="fantasy"
                value={formData.effect}
                onChange={(e) => handleChange('effect', e.target.value)}
                placeholder="Describe the item's effect... Include stat bonuses like '+6 Stamina' or '+2 damage' for automatic parsing."
                className="min-h-[100px]"
                required
              />
              <p className="text-xs text-[var(--text-muted)] italic">
                Tip: Include stat bonuses like "+6 Stamina", "+2 damage" for automatic stat tracking.
              </p>
            </div>

            {/* Enhancements for Leveled Items */}
            {showEnhancements && formData.category === 'leveled' && (
              <div className="enhancements-section-new">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-[var(--color-warning)]" />
                  <Label className="text-sm font-medium uppercase tracking-wider">
                    Enhancement Tiers
                  </Label>
                </div>
                <div className="space-y-2">
                  {[1, 5, 9].map((level, index) => (
                    <div key={level} className="enhancement-tier-new">
                      <Badge variant={getEchelonVariant(Math.ceil(level / 3))} className="min-w-[60px] justify-center">
                        Lv {level}
                      </Badge>
                      <Input
                        variant="fantasy"
                        value={formData.enhancements?.[index]?.effect || ''}
                        onChange={(e) => handleEnhancementChange(index, e.target.value)}
                        placeholder={`Enhancement at level ${level}...`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Goal (crafting) */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="item-project-goal" className="text-sm font-medium">
                  Project Goal (PP)
                </Label>
                <span className="text-xs text-[var(--text-dim)]">Optional</span>
              </div>
              <Input
                id="item-project-goal"
                variant="fantasy"
                type="number"
                min={0}
                value={formData.projectGoal || ''}
                onChange={(e) =>
                  handleChange(
                    'projectGoal',
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                placeholder="Crafting project points..."
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-[var(--text-muted)]" />
                <Label htmlFor="item-image" className="text-sm font-medium">
                  Image URL
                </Label>
                <span className="text-xs text-[var(--text-dim)]">Optional</span>
              </div>
              <Input
                id="item-image"
                variant="fantasy"
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://example.com/item-image.png"
              />
              {formData.imageUrl && (
                <div className="image-preview-new">
                  <img
                    src={formData.imageUrl}
                    alt="Item preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Item Preview Card */}
            {formData.name && (
              <div className="item-preview-card-new">
                <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Preview
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded bg-[var(--bg-darkest)] border border-[var(--border-solid)]">
                    {getCategoryIcon(formData.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[var(--text-primary)]">
                        {formData.name}
                      </span>
                      <Badge variant={getEchelonVariant(formData.echelon)} size="sm">
                        E{formData.echelon}
                      </Badge>
                      <Badge variant="outline" size="sm" className="capitalize">
                        {formData.category}
                      </Badge>
                    </div>
                    {formData.effect && (
                      <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                        {formData.effect}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </ScrollArea>

        <DialogFooter>
          <Button variant="chamfered" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="heroic" type="submit" form="custom-item-form">
            {editItem ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create Item
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomItemForm;
