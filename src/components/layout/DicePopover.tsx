import { useState } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useDiceRolling } from '@/hooks/useDiceRolling';
import { useRollHistory } from '@/context/RollHistoryContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn';
import { Dices } from 'lucide-react';
import type { Characteristic } from '@/types/common';
import type { RollModifierState } from '@/components/ui/StatsDashboard/types';
import './DicePopover.css';

// Edge/Bane state display config
const EDGE_BANE_CONFIG: Record<RollModifierState, { label: string; class: string }> = {
  normal: { label: 'Normal', class: '' },
  edge: { label: 'Edge', class: 'edge' },
  bane: { label: 'Bane', class: 'bane' },
  doubleEdge: { label: '2x Edge', class: 'double-edge' },
  doubleBane: { label: '2x Bane', class: 'double-bane' },
};

// Characteristic config
const CHARACTERISTICS: { id: Characteristic; label: string; abbr: string }[] = [
  { id: 'might', label: 'Might', abbr: 'MGT' },
  { id: 'agility', label: 'Agility', abbr: 'AGI' },
  { id: 'reason', label: 'Reason', abbr: 'REA' },
  { id: 'intuition', label: 'Intuition', abbr: 'INT' },
  { id: 'presence', label: 'Presence', abbr: 'PRS' },
];

interface DicePopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DicePopover({ open, onOpenChange }: DicePopoverProps) {
  const { hero } = useHeroContext();
  const {
    currentEdgeBane,
    cycleEdgeBane,
    handleRoll,
    handleRollCharacteristic,
  } = useDiceRolling();
  const { isHistoryOpen, toggleHistory } = useRollHistory();
  const [selectedChar, setSelectedChar] = useState<Characteristic | null>(null);

  if (!hero) return null;

  const edgeBaneConfig = EDGE_BANE_CONFIG[currentEdgeBane];

  const handleCharacteristicSelect = (char: Characteristic) => {
    setSelectedChar(char);
  };

  const handleMainRoll = () => {
    if (!selectedChar) return;
    const modifier = hero.characteristics[selectedChar];
    handleRollCharacteristic(selectedChar, modifier, currentEdgeBane);
    // Open roll history if not already open
    if (!isHistoryOpen) {
      toggleHistory();
    }
  };

  const handleQuickCharRoll = (char: Characteristic) => {
    const modifier = hero.characteristics[char];
    handleRollCharacteristic(char, modifier, currentEdgeBane);
    if (!isHistoryOpen) {
      toggleHistory();
    }
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="dice-popover-trigger" title="Roll Dice">
          <Dices size={16} aria-hidden="true" />
          <span>Roll</span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="dice-popover-content">
        <div className="dice-popover-header">
          <h3 className="dice-popover-title">Power Roll</h3>
          <button
            className={`edge-bane-toggle ${edgeBaneConfig.class}`}
            onClick={cycleEdgeBane}
            title="Click to cycle Edge/Bane"
          >
            {edgeBaneConfig.label}
          </button>
        </div>

        {/* Characteristic Buttons - select to set active, or double-click to roll immediately */}
        <div className="dice-char-grid">
          {CHARACTERISTICS.map((char) => {
            const modifier = hero.characteristics[char.id];
            const isSelected = selectedChar === char.id;
            return (
              <button
                key={char.id}
                className={`dice-char-button ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCharacteristicSelect(char.id)}
                onDoubleClick={() => handleQuickCharRoll(char.id)}
                title={`Click to select, double-click to roll ${char.label}`}
              >
                <span className="dice-char-abbr">{char.abbr}</span>
                <span className="dice-char-mod">
                  {modifier >= 0 ? '+' : ''}{modifier}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Roll Button */}
        <button
          className={`dice-roll-button ${!selectedChar ? 'disabled' : ''}`}
          onClick={handleMainRoll}
          disabled={!selectedChar}
          title={selectedChar ? `Roll 2d10 + ${selectedChar.toUpperCase()}` : 'Select a characteristic first'}
        >
          <Dices size={18} />
          <span>
            {selectedChar
              ? `Roll ${selectedChar.charAt(0).toUpperCase() + selectedChar.slice(1)}`
              : 'Select Characteristic'}
          </span>
        </button>

        <div className="dice-popover-divider" />

        {/* Quick Dice */}
        <div className="dice-quick-section">
          <span className="dice-quick-label">Quick Dice</span>
          <div className="dice-quick-buttons">
            <button
              className="dice-quick-button"
              onClick={() => handleRoll('d6', 'Damage')}
              title="Roll d6"
            >
              <span className="dice-icon">d6</span>
            </button>
            <button
              className="dice-quick-button"
              onClick={() => handleRoll('d3', 'Random')}
              title="Roll d3"
            >
              <span className="dice-icon">d3</span>
            </button>
            <button
              className="dice-quick-button save"
              onClick={() => handleRoll('d10', 'Save')}
              title="Roll d10 Save (6+ success)"
            >
              <span className="dice-icon">Save</span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DicePopover;
