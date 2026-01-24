/**
 * CreatorStatRibbon - Progress indicator for character creation
 * Shows creation progress with key selections displayed
 */
import { Check } from 'lucide-react';
import './CreatorStatRibbon.css';

interface ProgressItem {
  label: string;
  value: string | null;
  completed: boolean;
}

interface CreatorStatRibbonProps {
  progressItems: ProgressItem[];
  currentStepIndex: number;
  totalSteps: number;
}

export function CreatorStatRibbon({
  progressItems,
  currentStepIndex,
  totalSteps,
}: CreatorStatRibbonProps) {
  const progressPercent = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="creator-stat-ribbon">
      {/* Progress Items */}
      <div className="creator-progress-items">
        {progressItems.map((item, index) => (
          <div
            key={item.label}
            className={`creator-progress-item ${item.completed ? 'completed' : ''} ${item.value ? 'has-value' : ''}`}
          >
            <span className="creator-progress-label">{item.label}</span>
            {item.completed ? (
              <span className="creator-progress-value">
                {item.value || <Check size={14} />}
              </span>
            ) : (
              <span className="creator-progress-placeholder">—</span>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="creator-progress-bar-container">
        <div className="creator-progress-bar">
          <div
            className="creator-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="creator-progress-text">
          {Math.round(progressPercent)}%
        </span>
      </div>
    </div>
  );
}

export default CreatorStatRibbon;
