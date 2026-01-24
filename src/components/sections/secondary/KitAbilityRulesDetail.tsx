import { Kit } from '@/types/common';
import { RulesLink } from '@/components/shared/RulesLink';
import { Zap, Target, Crosshair, Shield, Swords } from 'lucide-react';

interface KitAbilityRulesDetailProps {
  abilityId: string;
  kit?: Kit;
}

export function KitAbilityRulesDetail({ abilityId, kit }: KitAbilityRulesDetailProps) {
  if (!kit || !kit.signatureAbility) {
    return (
      <div className="rules-detail">
        <div className="rules-detail-header">
          <h1 className="rules-detail-title">{abilityId}</h1>
          <span className="rules-detail-subtitle">Kit Ability</span>
        </div>
        <p className="rules-detail-text">
          No detailed information available for this kit ability.
        </p>
        {!kit && (
          <div className="rules-detail-note">
            <p>
              Kit ability details require the kit context to be passed.
            </p>
          </div>
        )}
      </div>
    );
  }

  const ability = kit.signatureAbility;

  return (
    <div className="rules-detail">
      {/* Header */}
      <header className="rules-detail-header">
        <h1 className="rules-detail-title">
          <span className="keyword-icon">
            <Swords size={16} />
          </span>
          {ability.name}
        </h1>
        <span className="rules-detail-subtitle">{kit.name} Kit Signature Ability</span>

        {/* Action type badge */}
        <div className="ability-header-meta">
          <span className="ability-action-badge">
            <Zap size={12} />
            {ability.type}
          </span>
        </div>
      </header>

      {/* Description */}
      {ability.description && (
        <section className="rules-detail-section">
          <p className="rules-detail-text" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            {ability.description}
          </p>
        </section>
      )}

      {/* Keywords */}
      {ability.keywords && ability.keywords.length > 0 && (
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

      {/* Power Roll */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">
          <Crosshair size={14} className="inline" />
          Power Roll
        </h2>
        <div className="ability-power-roll">
          <div className="ability-power-roll-header">
            Power Roll + {ability.powerRoll}
          </div>
          <div className="ability-tier">
            <span className="ability-tier-label tier-1">11−</span>
            <span className="ability-tier-effect">{ability.tier1}</span>
          </div>
          <div className="ability-tier">
            <span className="ability-tier-label tier-2">12-16</span>
            <span className="ability-tier-effect">{ability.tier2}</span>
          </div>
          <div className="ability-tier">
            <span className="ability-tier-label tier-3">17+</span>
            <span className="ability-tier-effect">{ability.tier3}</span>
          </div>
        </div>
      </section>

      {/* Effect */}
      {ability.effect && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Effect</h2>
          <div className="ability-effect-text">
            {ability.effect}
          </div>
        </section>
      )}

      {/* Kit Info */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Kit</h2>
        <div className="keyword-category-badge">
          <Shield size={16} />
          <span>{kit.name}</span>
        </div>
        <p className="rules-detail-text" style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)' }}>
          {kit.description}
        </p>
      </section>

      {/* Kit Bonuses Summary */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Kit Bonuses</h2>
        <div className="ability-targeting" style={{ gridTemplateColumns: 'auto 1fr auto 1fr' }}>
          <span className="ability-targeting-label">Armor</span>
          <span className="ability-targeting-value">{kit.armor || 'None'}</span>
          <span className="ability-targeting-label">Weapons</span>
          <span className="ability-targeting-value">{kit.weapons?.join(', ') || 'None'}</span>
          <span className="ability-targeting-label">Stamina/Ech</span>
          <span className="ability-targeting-value">+{kit.staminaPerEchelon || 0}</span>
          <span className="ability-targeting-label">Speed</span>
          <span className="ability-targeting-value">+{kit.speedBonus || 0}</span>
          {kit.meleeDamageBonus && (
            <>
              <span className="ability-targeting-label">Melee Dmg</span>
              <span className="ability-targeting-value">{kit.meleeDamageBonus}</span>
            </>
          )}
          {kit.rangedDamageBonus && (
            <>
              <span className="ability-targeting-label">Ranged Dmg</span>
              <span className="ability-targeting-value">{kit.rangedDamageBonus}</span>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default KitAbilityRulesDetail;
