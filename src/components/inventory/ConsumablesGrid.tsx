import React, { useState, useEffect } from 'react';
import { MagicItem, CONSUMABLE_ITEMS } from '../../data/magicItems';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  ScrollArea,
  Badge,
} from '@/components/ui/shadcn';
import { Plus, Minus, Search, Trash2, Sparkles, Package, X } from 'lucide-react';

interface ConsumableInventoryItem {
  itemId: string;
  name: string;
  quantity: number;
}

interface ConsumablesGridProps {
  consumables: ConsumableInventoryItem[];
  onAddConsumable: (item: MagicItem, quantity: number) => void;
  onUseConsumable: (itemId: string) => void;
  onRemoveConsumable: (itemId: string) => void;
  onAdjustQuantity: (itemId: string, delta: number) => void;
  compact?: boolean;
}

const ConsumablesGrid: React.FC<ConsumablesGridProps> = ({
  consumables,
  onAddConsumable,
  onUseConsumable,
  onRemoveConsumable,
  onAdjustQuantity,
  compact = false,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ConsumableInventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [discardConfirmId, setDiscardConfirmId] = useState<string | null>(null);

  // Get consumable details from the data
  const getConsumableData = (itemId: string): MagicItem | undefined => {
    return CONSUMABLE_ITEMS.find((c) => c.id === itemId);
  };

  // Filter available consumables for the add modal
  const filteredConsumables = CONSUMABLE_ITEMS.filter((item) => {
    if (searchTerm) {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Reset search when modal opens
  useEffect(() => {
    if (showAddModal) {
      setSearchTerm('');
    }
  }, [showAddModal]);

  // Get echelon icon
  const getEchelonIcon = (echelon?: number) => {
    switch (echelon) {
      case 1: return '🧪';
      case 2: return '⚗️';
      case 3: return '🔮';
      case 4: return '✨';
      default: return '📦';
    }
  };

  // Handle use item
  const handleUseItem = () => {
    if (!selectedItem) return;
    onUseConsumable(selectedItem.itemId);
    if (selectedItem.quantity <= 1) {
      setSelectedItem(null);
    } else {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      });
    }
  };

  // Handle discard confirmation
  const handleConfirmDiscard = () => {
    if (discardConfirmId) {
      onRemoveConsumable(discardConfirmId);
      setDiscardConfirmId(null);
      setSelectedItem(null);
    }
  };

  return (
    <div className={`consumables-section ${compact ? 'consumables-section--compact' : ''}`}>
      {!compact && (
        <div className="consumables-header">
          <h3>Consumables</h3>
          <Button variant="chamfered" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
      )}

      {consumables.length === 0 ? (
        <div className={`empty-consumables ${compact ? 'empty-consumables--compact' : ''}`}>
          {compact ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddModal(true)}
              className="w-full border border-dashed border-[var(--accent-primary)] text-[var(--accent-primary)]"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Consumable
            </Button>
          ) : (
            <div className="text-center py-4">
              <Package className="h-8 w-8 mx-auto mb-2 text-[var(--text-dim)]" />
              <p className="text-[var(--text-muted)]">No consumables in inventory.</p>
              <p className="text-sm text-[var(--text-dim)]">Click "Add Item" to add consumables.</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={`consumables-grid ${compact ? 'consumables-grid--compact' : ''}`}>
            {consumables.map((item) => {
              const data = getConsumableData(item.itemId);
              return (
                <div
                  key={item.itemId}
                  className={`consumable-slot ${compact ? 'consumable-slot--compact' : ''}`}
                  onClick={() => setSelectedItem(item)}
                  title={item.name}
                >
                  <div className="consumable-icon">
                    {getEchelonIcon(data?.echelon)}
                  </div>
                  <div className="consumable-quantity">{item.quantity}</div>
                  <div className="consumable-name">{item.name}</div>
                </div>
              );
            })}
          </div>
          {compact && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddModal(true)}
              className="w-full mt-2 border border-dashed border-[var(--accent-primary)] text-[var(--accent-primary)]"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </>
      )}

      {/* Add Consumable Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent variant="fantasy" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-[var(--accent-primary)]" />
              Add Consumable
            </DialogTitle>
            <DialogDescription>
              Select a consumable item to add to your inventory
            </DialogDescription>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <Input
              variant="fantasy"
              placeholder="Search consumables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
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

          <ScrollArea className="h-[300px] pr-2">
            {filteredConsumables.length > 0 ? (
              <div className="space-y-1">
                {filteredConsumables.map((item) => (
                  <div
                    key={item.id}
                    className="consumable-option-new"
                    onClick={() => {
                      onAddConsumable(item, 1);
                      setShowAddModal(false);
                    }}
                  >
                    <span className="consumable-option-icon">{getEchelonIcon(item.echelon)}</span>
                    <span className="consumable-option-name-new">{item.name}</span>
                    <Badge variant="outline" size="sm">E{item.echelon}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[var(--text-muted)]">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No consumables match "{searchTerm}"</p>
              </div>
            )}
          </ScrollArea>

          <DialogFooter>
            <Button variant="chamfered" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Consumable Detail Modal */}
      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent variant="fantasy" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">{getEchelonIcon(getConsumableData(selectedItem?.itemId || '')?.echelon)}</span>
              {selectedItem?.name}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge variant="outline" size="sm">
                Echelon {getConsumableData(selectedItem?.itemId || '')?.echelon || '?'}
              </Badge>
              <span>×{selectedItem?.quantity}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Effect */}
            {getConsumableData(selectedItem?.itemId || '')?.effect && (
              <div className="p-3 bg-[var(--bg-dark)] rounded border-l-2 border-[var(--accent-primary)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  {getConsumableData(selectedItem?.itemId || '')?.effect}
                </p>
              </div>
            )}

            {/* Quantity Controls */}
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)] mb-2">Quantity</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => selectedItem && onAdjustQuantity(selectedItem.itemId, -1)}
                  disabled={!selectedItem || selectedItem.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg text-[var(--text-primary)]">
                  {selectedItem?.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => selectedItem && onAdjustQuantity(selectedItem.itemId, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => selectedItem && setDiscardConfirmId(selectedItem.itemId)}
              className="sm:mr-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Discard All
            </Button>
            <Button variant="chamfered" onClick={() => setSelectedItem(null)}>
              Close
            </Button>
            <Button variant="heroic" onClick={handleUseItem}>
              <Sparkles className="h-4 w-4 mr-2" />
              Use Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Discard Confirmation */}
      <AlertDialog
        open={discardConfirmId !== null}
        onOpenChange={(open) => !open && setDiscardConfirmId(null)}
      >
        <AlertDialogContent variant="fantasy" className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-[var(--color-danger)]">
              <Trash2 className="h-5 w-5" />
              Discard All?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to discard all{' '}
              <strong className="text-[var(--text-primary)]">
                {consumables.find(c => c.itemId === discardConfirmId)?.name}
              </strong>
              ? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDiscard}
              className="bg-[var(--color-danger)] hover:bg-[var(--color-danger)]/90"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Discard All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConsumablesGrid;
