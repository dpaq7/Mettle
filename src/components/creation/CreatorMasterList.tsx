/**
 * CreatorMasterList - Step navigation list for character creation
 * Shows available steps within the current section
 */
import { Check, Lock, ChevronRight } from 'lucide-react';
import './CreatorMasterList.css';

export interface CreatorStep {
  id: string;
  label: string;
  value?: string | null;
  completed: boolean;
  current: boolean;
  locked: boolean;
}

interface CreatorMasterListProps {
  steps: CreatorStep[];
  onStepSelect: (stepId: string) => void;
  sectionLabel?: string;
}

export function CreatorMasterList({
  steps,
  onStepSelect,
  sectionLabel,
}: CreatorMasterListProps) {
  return (
    <div className="creator-master-list">
      {sectionLabel && (
        <div className="creator-master-header">
          {sectionLabel}
        </div>
      )}
      <div className="creator-master-items">
        {steps.map((step) => (
          <button
            key={step.id}
            className={`creator-master-item ${step.current ? 'current' : ''} ${step.completed ? 'completed' : ''} ${step.locked ? 'locked' : ''}`}
            onClick={() => !step.locked && onStepSelect(step.id)}
            disabled={step.locked}
          >
            <div className="creator-master-item-status">
              {step.locked ? (
                <Lock size={14} />
              ) : step.completed ? (
                <Check size={14} />
              ) : step.current ? (
                <ChevronRight size={14} />
              ) : (
                <span className="creator-master-item-dot" />
              )}
            </div>
            <div className="creator-master-item-content">
              <span className="creator-master-item-label">{step.label}</span>
              {step.value && (
                <span className="creator-master-item-value">{step.value}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CreatorMasterList;
