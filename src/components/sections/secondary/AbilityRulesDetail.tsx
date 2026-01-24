import { Ability } from '@/types/abilities';
import { RulesLink } from '@/components/shared/RulesLink';
import { Zap, Target, Crosshair, Clock, AlertTriangle } from 'lucide-react';

interface AbilityRulesDetailProps {
  ability: Ability;
}

// Get action type display info
function getActionTypeInfo(actionType: string): { label: string; icon: string } {
  switch (actionType) {
    case 'action':
      return { label: 'Action', icon: 'A' };
    case 'maneuver':
      return { label: 'Maneuver', icon: 'M' };
    case 'freeManeuver':
      return { label: 'Free Maneuver', icon: 'F' };
    case 'triggered':
      return { label: 'Triggered Action', icon: 'T' };
    case 'freeTriggered':
      return { label: 'Free Triggered Action', icon: 'FT' };
    case 'move':
      return { label: 'Move Action', icon: 'MV' };
    case 'noAction':
      return { label: 'No Action', icon: '—' };
    default:
      return { label: actionType, icon: '?' };
  }
}

// Get cost display text
function getCostDisplay(ability: Ability): string | null {
  if (ability.cost) {
    const prefix = ability.cost.isVariable ? `${ability.cost.amount}+` : `${ability.cost.amount}`;
    return `${prefix} ${ability.cost.resource}`;
  }
  if (ability.essenceCost) {
    return `${ability.essenceCost} Essence`;
  }
  return null;
}

export function AbilityRulesDetail({ ability }: AbilityRulesDetailProps) {
  const actionInfo = getActionTypeInfo(ability.actionType);
  const costDisplay = getCostDisplay(ability);

  return (
    <div className="rules-detail">
      {/* Header */}
      <header className="rules-detail-header">
        <h1 className="rules-detail-title">{ability.name}</h1>
        <span className="rules-detail-subtitle">Ability</span>

        {/* Action type and cost badges */}
        <div className="ability-header-meta">
          <span className="ability-action-badge" title={actionInfo.label}>
            <Clock size={12} />
            {actionInfo.label}
          </span>
          {costDisplay && (
            <span className="ability-cost-badge">
              <Zap size={12} />
              {costDisplay}
            </span>
          )}
        </div>
      </header>

      {/* Flavor Text */}
      {ability.flavorText && (
        <section className="rules-detail-section">
          <p className="rules-detail-text" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            {ability.flavorText}
          </p>
        </section>
      )}

      {/* Keywords */}
      {ability.keywords.length > 0 && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Keywords</h2>
          <ul className="ability-keywords-list">
            {ability.keywords.map((keyword) => (
              <li key={keyword}>
                <RulesLink type="keyword" id={keyword.toLowerCase()}>
                  <span className="ability-keyword-tag">{keyword}</span>
                </RulesLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Targeting */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">
          <Target size={14} className="inline" />
          Targeting
        </h2>
        <div className="ability-targeting">
          <span className="ability-targeting-label">Distance</span>
          <span className="ability-targeting-value">{ability.distance}</span>
          <span className="ability-targeting-label">Target</span>
          <span className="ability-targeting-value">{ability.target}</span>
        </div>
      </section>

      {/* Trigger (for triggered actions) */}
      {ability.trigger && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">
            <AlertTriangle size={14} className="inline" />
            Trigger
          </h2>
          <div className="ability-trigger-box">
            <p className="ability-trigger-text">{ability.trigger}</p>
          </div>
        </section>
      )}

      {/* Power Roll */}
      {ability.powerRoll && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">
            <Crosshair size={14} className="inline" />
            Power Roll
          </h2>
          <div className="ability-power-roll">
            <div className="ability-power-roll-header">
              Power Roll + {ability.powerRoll.characteristic.charAt(0).toUpperCase() + ability.powerRoll.characteristic.slice(1)}
              {ability.powerRoll.alternativeCharacteristics && ability.powerRoll.alternativeCharacteristics.length > 0 && (
                <> or {ability.powerRoll.alternativeCharacteristics.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' or ')}</>
              )}
            </div>
            <div className="ability-tier">
              <span className="ability-tier-label tier-1">11−</span>
              <span className="ability-tier-effect">{ability.powerRoll.tier1}</span>
            </div>
            <div className="ability-tier">
              <span className="ability-tier-label tier-2">12-16</span>
              <span className="ability-tier-effect">{ability.powerRoll.tier2}</span>
            </div>
            <div className="ability-tier">
              <span className="ability-tier-label tier-3">17+</span>
              <span className="ability-tier-effect">{ability.powerRoll.tier3}</span>
            </div>
          </div>
        </section>
      )}

      {/* Effect */}
      {ability.effect && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Effect</h2>
          <div className="ability-effect-text">
            {ability.effect}
          </div>
        </section>
      )}

      {/* Additional Effects */}
      {ability.additionalEffects && ability.additionalEffects.length > 0 && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Additional Effects</h2>
          {ability.additionalEffects.map((effect, index) => (
            <div key={index} className="ability-effect-text" style={{ marginBottom: 'var(--space-2)' }}>
              {effect.cost && <strong>{effect.cost}: </strong>}
              {effect.description}
            </div>
          ))}
        </section>
      )}

      {/* Legacy spend essence (deprecated but still in data) */}
      {ability.spendEssence && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Spend Essence</h2>
          <div className="ability-effect-text">
            {ability.spendEssence}
          </div>
        </section>
      )}
    </div>
  );
}

export default AbilityRulesDetail;
