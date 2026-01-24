import React from 'react';
import { MinionTemplate, ChampionTemplate } from '@/types/minion';
import './MinionInfoCard.css';

interface MinionInfoCardProps {
  minion: MinionTemplate | ChampionTemplate;
  isUnlocked?: boolean;
  requiredLevel?: number;
}

export const MinionInfoCard: React.FC<MinionInfoCardProps> = ({
  minion,
  isUnlocked = true,
  requiredLevel,
}) => {
  const formatCharacteristic = (value: number) => {
    return value >= 0 ? `+${value}` : `${value}`;
  };

  const roleColorClass = `role-${minion.role.toLowerCase()}`;

  return (
    <div className={`minion-info-card ${!isUnlocked ? 'locked' : ''}`}>
      {/* Header */}
      <div className="minion-info-header">
        <div className="minion-info-name-row">
          <h3 className="minion-info-name">{minion.name}</h3>
          <span className="minion-info-essence-badge">{minion.essenceCost}★</span>
        </div>
        <span className={`minion-info-role ${roleColorClass}`}>{minion.role}</span>
        {!isUnlocked && requiredLevel && (
          <span className="minion-info-locked-badge">Unlocks at Level {requiredLevel}</span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="minion-info-stats">
        <div className="minion-info-stat">
          <span className="minion-info-stat-label">Size</span>
          <span className="minion-info-stat-value">{minion.size}</span>
        </div>
        <div className="minion-info-stat">
          <span className="minion-info-stat-label">Speed</span>
          <span className="minion-info-stat-value">{minion.speed}</span>
        </div>
        <div className="minion-info-stat">
          <span className="minion-info-stat-label">Stamina</span>
          <span className="minion-info-stat-value">
            {Array.isArray(minion.stamina) ? minion.stamina.join('/') : minion.stamina}
          </span>
        </div>
        <div className="minion-info-stat">
          <span className="minion-info-stat-label">Stability</span>
          <span className="minion-info-stat-value">{minion.stability}</span>
        </div>
        <div className="minion-info-stat">
          <span className="minion-info-stat-label">Free Strike</span>
          <span className="minion-info-stat-value">{minion.freeStrike}</span>
        </div>
        {'minionsPerSummon' in minion && (
          <div className="minion-info-stat">
            <span className="minion-info-stat-label">Summons</span>
            <span className="minion-info-stat-value">{minion.minionsPerSummon}</span>
          </div>
        )}
      </div>

      {/* Keywords & Movement */}
      {(minion.keywords.length > 0 || minion.movementModes.length > 0) && (
        <div className="minion-info-keywords">
          {minion.keywords.map((keyword, index) => (
            <span key={`kw-${index}`} className="minion-info-keyword">{keyword}</span>
          ))}
          {minion.movementModes.map((mode, index) => (
            <span key={`mv-${index}`} className="minion-info-keyword movement">{mode}</span>
          ))}
        </div>
      )}

      {/* Characteristics */}
      <div className="minion-info-characteristics">
        <span className="minion-info-char-label">Characteristics</span>
        <div className="minion-info-char-grid">
          <div className="minion-info-char">
            <span className="char-name">MGT</span>
            <span className="char-value">{formatCharacteristic(minion.characteristics.might)}</span>
          </div>
          <div className="minion-info-char">
            <span className="char-name">AGI</span>
            <span className="char-value">{formatCharacteristic(minion.characteristics.agility)}</span>
          </div>
          <div className="minion-info-char">
            <span className="char-name">REA</span>
            <span className="char-value">{formatCharacteristic(minion.characteristics.reason)}</span>
          </div>
          <div className="minion-info-char">
            <span className="char-name">INT</span>
            <span className="char-value">{formatCharacteristic(minion.characteristics.intuition)}</span>
          </div>
          <div className="minion-info-char">
            <span className="char-name">PRS</span>
            <span className="char-value">{formatCharacteristic(minion.characteristics.presence)}</span>
          </div>
        </div>
      </div>

      {/* Immunities & Weaknesses */}
      {(minion.immunities.length > 0 || minion.weaknesses.length > 0) && (
        <div className="minion-info-resistances">
          {minion.immunities.length > 0 && (
            <div className="minion-info-immunity-row">
              <span className="resistance-label">Immunities:</span>
              <div className="resistance-badges">
                {minion.immunities.map((immunity, index) => (
                  <span key={index} className="resistance-badge immunity">
                    {immunity.type}{immunity.value ? ` ${immunity.value}` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
          {minion.weaknesses.length > 0 && (
            <div className="minion-info-weakness-row">
              <span className="resistance-label">Weaknesses:</span>
              <div className="resistance-badges">
                {minion.weaknesses.map((weakness, index) => (
                  <span key={index} className="resistance-badge weakness">
                    {weakness.type} {weakness.value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Traits */}
      {minion.traits.length > 0 && (
        <div className="minion-info-traits">
          <span className="minion-info-traits-label">Traits</span>
          {minion.traits.map((trait, index) => (
            <div key={index} className="minion-info-trait">
              <span className="trait-name">{trait.name}</span>
              <p className="trait-description">{trait.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Signature Ability */}
      {minion.signatureAbility && (
        <div className="minion-info-ability">
          <span className="minion-info-ability-label">Signature Ability</span>
          <div className="minion-ability-card">
            <div className="ability-header">
              <span className="ability-name">{minion.signatureAbility.name}</span>
              <span className="ability-action">{minion.signatureAbility.actionType}</span>
            </div>

            {minion.signatureAbility.keywords.length > 0 && (
              <div className="ability-keywords">
                {minion.signatureAbility.keywords.map((kw, index) => (
                  <span key={index} className="ability-keyword">{kw}</span>
                ))}
              </div>
            )}

            <div className="ability-meta">
              <span className="ability-distance">{minion.signatureAbility.distance}</span>
              <span className="ability-target">{minion.signatureAbility.target}</span>
            </div>

            {minion.signatureAbility.powerRoll && (
              <div className="ability-power-roll">
                <div className="power-roll-header">
                  Power Roll + {minion.signatureAbility.powerRoll.characteristic}
                </div>
                <div className="power-roll-tiers">
                  <div className="tier tier-1">
                    <span className="tier-label">11 or lower</span>
                    <span className="tier-effect">{minion.signatureAbility.powerRoll.tier1}</span>
                  </div>
                  <div className="tier tier-2">
                    <span className="tier-label">12-16</span>
                    <span className="tier-effect">{minion.signatureAbility.powerRoll.tier2}</span>
                  </div>
                  <div className="tier tier-3">
                    <span className="tier-label">17+</span>
                    <span className="tier-effect">{minion.signatureAbility.powerRoll.tier3}</span>
                  </div>
                </div>
              </div>
            )}

            {minion.signatureAbility.effect && (
              <div className="ability-effect">
                <span className="effect-label">Effect:</span>
                <span className="effect-text">{minion.signatureAbility.effect}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinionInfoCard;
