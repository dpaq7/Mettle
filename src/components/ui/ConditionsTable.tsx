import React from 'react';
import './ConditionsTable.css';

export interface Condition {
  name: string;
  endOfTurn: boolean;
  saveEnds: boolean;
  active?: boolean;
}

interface ConditionsTableProps {
  conditions: Condition[];
  onConditionChange?: (index: number, field: 'endOfTurn' | 'saveEnds', value: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
}

const DEFAULT_CONDITIONS: Condition[] = [
  { name: 'Bleeding', endOfTurn: false, saveEnds: false },
  { name: 'Dazed', endOfTurn: false, saveEnds: false },
  { name: 'Frightened', endOfTurn: false, saveEnds: false },
  { name: 'Grabbed', endOfTurn: false, saveEnds: false },
  { name: 'Prone', endOfTurn: false, saveEnds: false },
  { name: 'Restrained', endOfTurn: false, saveEnds: false },
  { name: 'Slowed', endOfTurn: false, saveEnds: false },
  { name: 'Taunted', endOfTurn: false, saveEnds: false },
  { name: 'Weakened', endOfTurn: false, saveEnds: false },
];

/**
 * Conditions table with diamond checkboxes.
 * Matches the Draw Steel character sheet conditions layout.
 */
const ConditionsTable: React.FC<ConditionsTableProps> = ({
  conditions = DEFAULT_CONDITIONS,
  onConditionChange,
  disabled = false,
  compact = false,
}) => {
  const handleCheckboxChange = (
    index: number,
    field: 'endOfTurn' | 'saveEnds',
    currentValue: boolean
  ) => {
    if (!disabled && onConditionChange) {
      onConditionChange(index, field, !currentValue);
    }
  };

  return (
    <table className={`conditions-table ${compact ? 'compact' : ''} ${disabled ? 'disabled' : ''}`}>
      <thead>
        <tr>
          <th className="condition-name-header">Condition</th>
          <th className="condition-checkbox-header">End of Turn</th>
          <th className="condition-checkbox-header">Save Ends</th>
        </tr>
      </thead>
      <tbody>
        {conditions.map((condition, index) => {
          const isActive = condition.endOfTurn || condition.saveEnds || condition.active;
          return (
            <tr key={condition.name} className={isActive ? 'active' : ''}>
              <td className="condition-name">{condition.name}</td>
              <td className="condition-checkbox">
                <div
                  className={`diamond-check ${condition.endOfTurn ? 'checked' : ''}`}
                  onClick={() => handleCheckboxChange(index, 'endOfTurn', condition.endOfTurn)}
                  role="checkbox"
                  aria-checked={condition.endOfTurn}
                  aria-label={`${condition.name} end of turn`}
                  tabIndex={disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCheckboxChange(index, 'endOfTurn', condition.endOfTurn);
                    }
                  }}
                />
              </td>
              <td className="condition-checkbox">
                <div
                  className={`diamond-check ${condition.saveEnds ? 'checked' : ''}`}
                  onClick={() => handleCheckboxChange(index, 'saveEnds', condition.saveEnds)}
                  role="checkbox"
                  aria-checked={condition.saveEnds}
                  aria-label={`${condition.name} save ends`}
                  tabIndex={disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCheckboxChange(index, 'saveEnds', condition.saveEnds);
                    }
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ConditionsTable;
export { DEFAULT_CONDITIONS };
