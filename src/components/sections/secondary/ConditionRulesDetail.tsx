import { CONDITIONS, type ConditionDefinition, type ConditionId } from '@/data/conditions';
import { AlertTriangle, Clock, Zap } from 'lucide-react';

interface ConditionRulesDetailProps {
  conditionId: string;
}

export function ConditionRulesDetail({ conditionId }: ConditionRulesDetailProps) {
  // Use the rich condition data directly from the conditions module
  const condition: ConditionDefinition | undefined = CONDITIONS[conditionId as ConditionId];

  if (!condition) {
    return (
      <div className="rules-detail">
        <div className="rules-detail-header">
          <h1 className="rules-detail-title">Unknown Condition</h1>
          <span className="rules-detail-subtitle">Condition</span>
        </div>
        <p className="rules-detail-text">
          No information available for condition: {conditionId}
        </p>
      </div>
    );
  }

  return (
    <div className="rules-detail">
      {/* Header */}
      <header className="rules-detail-header">
        <h1 className="rules-detail-title">
          <span className="condition-icon">{condition.icon}</span>{' '}
          {condition.name}
        </h1>
        <span className="rules-detail-subtitle">Condition</span>
      </header>

      {/* Quick Summary */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Effect</h2>
        <p className="rules-detail-text">{condition.primaryEffect}</p>
      </section>

      {/* How to End */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">How to End</h2>
        <div className="condition-end-method">
          {condition.saveEnds ? (
            <div className="condition-save-info">
              <Clock size={16} />
              <span>Save Ends: {condition.saveRequired}</span>
            </div>
          ) : (
            <div className="condition-manual-info">
              <Zap size={16} />
              <span>{condition.saveRequired}</span>
            </div>
          )}
        </div>
      </section>

      {/* Action Triggers (if applicable) */}
      {condition.affectsActions && condition.actionTriggers && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Triggers Damage When</h2>
          <ul className="condition-triggers-list">
            {condition.actionTriggers.includes('main') && (
              <li>Using a main action</li>
            )}
            {condition.actionTriggers.includes('triggered') && (
              <li>Using a triggered action</li>
            )}
            {condition.actionTriggers.includes('might_roll') && (
              <li>Making a Might-based roll</li>
            )}
            {condition.actionTriggers.includes('agility_roll') && (
              <li>Making an Agility-based roll</li>
            )}
            {condition.actionTriggers.includes('power_roll') && (
              <li>Making a power roll</li>
            )}
          </ul>
        </section>
      )}

      {/* Full Rules Description */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Full Rules</h2>
        <div className="rules-detail-full-text">
          {condition.rulesDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="rules-detail-text">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Warning for dangerous conditions */}
      {(condition.id === 'dying' || condition.id === 'bleeding') && (
        <div className="rules-detail-warning">
          <AlertTriangle size={16} />
          <span>
            {condition.id === 'dying'
              ? 'Death occurs at negative half maximum Stamina!'
              : 'Damage from this condition cannot be prevented!'}
          </span>
        </div>
      )}
    </div>
  );
}

export default ConditionRulesDetail;
