/**
 * SquadQuickList
 *
 * Combat dashboard for active Summoner squads.
 * Draw Steel minions use pooled squad stamina, but the player needs fast
 * access to count, damage thresholds, action state, and minion rolls.
 */

import { memo, useCallback, useMemo, useState } from 'react';
import {
  Activity,
  Crosshair,
  Dice5,
  Footprints,
  Heart,
  Minus,
  RotateCcw,
  Shield,
  Skull,
  Sparkles,
  Swords,
  X,
} from 'lucide-react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { useRollHistory } from '@/context/RollHistoryContext';
import { isSummonerHero } from '@/types/hero';
import { useSquads } from '@/hooks/useSquads';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useSacrifice } from '@/hooks/useSacrifice';
import { MinionTemplate, Squad } from '@/types';
import { performPowerRoll, getTierColor, PowerRollResult, RollModifier } from '@/utils/dice';

interface SquadRollState {
  result: PowerRollResult;
  label: string;
  damage?: number;
}

interface SquadQuickItemProps {
  squad: Squad;
  template: MinionTemplate;
  canSacrifice: boolean;
  rollModifier: RollModifier;
  rollState?: SquadRollState;
  damageInput: string;
  onDamage: (squadId: string, amount: number) => void;
  onHeal: (squadId: string, amount: number) => void;
  onDamageInputChange: (squadId: string, value: string) => void;
  onApplyDamageInput: (squadId: string) => void;
  onToggleMove: (squad: Squad) => void;
  onToggleManeuver: (squad: Squad) => void;
  onToggleMainAction: (squad: Squad) => void;
  onCycleRollModifier: (squadId: string) => void;
  onFreeStrike: (squad: Squad, template: MinionTemplate) => void;
  onSignature: (squad: Squad, template: MinionTemplate) => void;
  onSacrifice: (squadId: string) => void;
  onDismiss: (squadId: string) => void;
}

const getHealthClass = (percent: number) => {
  if (percent <= 25) return 'squad-quick-hp-fill squad-quick-hp-fill--critical';
  if (percent <= 50) return 'squad-quick-hp-fill squad-quick-hp-fill--wounded';
  return 'squad-quick-hp-fill';
};

const formatBaseStamina = (template: MinionTemplate) =>
  Array.isArray(template.stamina) ? template.stamina.join('/') : template.stamina;

const SquadQuickItem = memo(function SquadQuickItem({
  squad,
  template,
  canSacrifice,
  rollModifier,
  rollState,
  damageInput,
  onDamage,
  onHeal,
  onDamageInputChange,
  onApplyDamageInput,
  onToggleMove,
  onToggleManeuver,
  onToggleMainAction,
  onCycleRollModifier,
  onFreeStrike,
  onSignature,
  onSacrifice,
  onDismiss,
}: SquadQuickItemProps) {
  const aliveMembers = squad.members.filter((m) => m.isAlive);
  const aliveCount = aliveMembers.length;
  const totalCount = squad.members.length;
  const deadCount = totalCount - aliveCount;
  const hpPercent = squad.maxStamina > 0
    ? Math.max(0, Math.min(100, (squad.currentStamina / squad.maxStamina) * 100))
    : 0;
  const freeStrikeDamage = template.freeStrike * aliveCount;
  const hasSignatureRoll = Boolean(template.signatureAbility?.powerRoll);

  return (
    <div className="squad-quick-item">
      <div className="squad-quick-header">
        <div className="squad-quick-title">
          <h4 className="squad-quick-name">{template.name}</h4>
          <span className="squad-quick-meta">
            {template.role} · base {formatBaseStamina(template)} stamina
          </span>
        </div>
        <button
          type="button"
          className="squad-quick-icon-btn squad-quick-btn--dismiss"
          onClick={() => onDismiss(squad.id)}
          title="Dismiss squad"
        >
          <X size={14} />
        </button>
      </div>

      <div className="squad-quick-stat-row">
        <div className="squad-quick-count-card">
          <UsersIcon />
          <strong>{aliveCount}/{totalCount}</strong>
          <span>alive</span>
        </div>
        <div className="squad-quick-count-card">
          <Skull size={14} />
          <strong>{deadCount}</strong>
          <span>down</span>
        </div>
        <div className="squad-quick-count-card">
          <Swords size={14} />
          <strong>{freeStrikeDamage}</strong>
          <span>free strike</span>
        </div>
      </div>

      <div className="squad-quick-hp">
        <div className="squad-quick-hp-topline">
          <span>Squad stamina pool</span>
          <strong>{squad.currentStamina}/{squad.maxStamina}</strong>
        </div>
        <div className="squad-quick-hp-bar">
          <div className={getHealthClass(hpPercent)} style={{ width: `${hpPercent}%` }} />
          {squad.members.length > 1 && squad.members.slice(0, -1).map((member, index) => {
            const remainingAfterThisDeath = squad.maxStamina - squad.members
              .slice(0, index + 1)
              .reduce((sum, minion) => sum + minion.maxStamina, 0);
            const left = squad.maxStamina > 0 ? (remainingAfterThisDeath / squad.maxStamina) * 100 : 0;
            return (
              <span
                key={member.id}
                className="squad-quick-threshold"
                style={{ left: `${left}%` }}
                title={`Next minion threshold at ${remainingAfterThisDeath} stamina`}
              />
            );
          })}
        </div>
      </div>

      <div className="squad-quick-minion-chips" aria-label={`${template.name} members`}>
        {squad.members.map((minion, index) => (
          <span
            key={minion.id}
            className={`squad-quick-minion-chip ${minion.isAlive ? 'alive' : 'dead'} ${minion.hasActedThisTurn ? 'acted' : ''} ${minion.hasMovedThisTurn ? 'moved' : ''}`}
            title={[
              `${template.name} ${index + 1}`,
              minion.isAlive ? 'Alive' : 'Dead',
              `${minion.maxStamina} stamina threshold`,
              minion.hasMovedThisTurn ? 'Moved' : '',
              minion.hasActedThisTurn ? 'Used main action or maneuver' : '',
            ].filter(Boolean).join(' · ')}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <div className="squad-quick-damage-row">
        <button type="button" className="squad-quick-btn squad-quick-btn--damage" onClick={() => onDamage(squad.id, 1)}>
          <Minus size={12} />1
        </button>
        <button type="button" className="squad-quick-btn squad-quick-btn--damage" onClick={() => onDamage(squad.id, 5)}>
          <Minus size={12} />5
        </button>
        <input
          className="squad-quick-damage-input"
          type="number"
          inputMode="numeric"
          min="1"
          placeholder="Dmg"
          value={damageInput}
          onChange={(event) => onDamageInputChange(squad.id, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onApplyDamageInput(squad.id);
          }}
          aria-label={`Damage ${template.name} squad`}
        />
        <button type="button" className="squad-quick-btn" onClick={() => onApplyDamageInput(squad.id)}>
          Apply
        </button>
        <button type="button" className="squad-quick-btn squad-quick-btn--heal" onClick={() => onHeal(squad.id, 1)}>
          <Heart size={12} />1
        </button>
        <button type="button" className="squad-quick-btn squad-quick-btn--heal" onClick={() => onHeal(squad.id, 5)}>
          <Heart size={12} />5
        </button>
      </div>

      <div className="squad-quick-action-grid">
        <button
          type="button"
          className={`squad-quick-action ${squad.hasMoved ? 'used' : ''}`}
          onClick={() => onToggleMove(squad)}
          disabled={aliveCount === 0}
        >
          <Footprints size={14} />
          {squad.hasMoved ? 'Moved' : 'Move'}
        </button>
        <button
          type="button"
          className={`squad-quick-action ${squad.hasUsedManeuver ? 'used' : ''}`}
          onClick={() => onToggleManeuver(squad)}
          disabled={aliveCount === 0 || (squad.hasActed && !squad.hasUsedManeuver)}
          title={squad.hasActed && !squad.hasUsedManeuver ? 'This squad already used a main action' : undefined}
        >
          <Activity size={14} />
          {squad.hasUsedManeuver ? 'Maneuvered' : 'Maneuver'}
        </button>
        <button
          type="button"
          className={`squad-quick-action ${squad.hasActed ? 'used' : ''}`}
          onClick={() => onToggleMainAction(squad)}
          disabled={aliveCount === 0 || (Boolean(squad.hasUsedManeuver) && !squad.hasActed)}
          title={squad.hasUsedManeuver && !squad.hasActed ? 'This squad already used a maneuver' : undefined}
        >
          <Swords size={14} />
          {squad.hasActed ? 'Acted' : 'Main'}
        </button>
        <button
          type="button"
          className={`squad-quick-action modifier ${rollModifier}`}
          onClick={() => onCycleRollModifier(squad.id)}
          disabled={aliveCount === 0}
          title="Cycle roll modifier"
        >
          <RotateCcw size={14} />
          {rollModifier === 'edge' ? 'Edge' : rollModifier === 'bane' ? 'Bane' : 'Normal'}
        </button>
      </div>

      <div className="squad-quick-roll-row">
        <button
          type="button"
          className="squad-quick-roll-btn"
          onClick={() => onFreeStrike(squad, template)}
          disabled={aliveCount === 0 || squad.hasActed || Boolean(squad.hasUsedManeuver)}
          title={squad.hasActed || squad.hasUsedManeuver ? 'This squad has already used its main action or maneuver' : undefined}
        >
          <Crosshair size={14} />
          Free Strike
        </button>
        <button
          type="button"
          className="squad-quick-roll-btn"
          onClick={() => onSignature(squad, template)}
          disabled={aliveCount === 0 || !hasSignatureRoll || squad.hasActed || Boolean(squad.hasUsedManeuver)}
          title={hasSignatureRoll ? template.signatureAbility?.name : 'No signature power roll'}
        >
          <Dice5 size={14} />
          {template.signatureAbility?.name ?? 'Signature'}
        </button>
        <button
          type="button"
          className="squad-quick-roll-btn sacrifice"
          onClick={() => onSacrifice(squad.id)}
          disabled={!canSacrifice || aliveCount === 0}
          title={canSacrifice ? 'Sacrifice one eligible minion to reduce the next essence cost' : 'No eligible minions to sacrifice'}
        >
          <Skull size={14} />
          Sacrifice
        </button>
      </div>

      {rollState && (
        <div className="squad-quick-roll-result" style={{ borderLeftColor: getTierColor(rollState.result.tier) }}>
          <span className="squad-quick-roll-label">{rollState.label}</span>
          <strong style={{ color: getTierColor(rollState.result.tier) }}>{rollState.result.total}</strong>
          <span>Tier {rollState.result.tier}</span>
          {rollState.damage !== undefined && <span>{rollState.damage} damage</span>}
        </div>
      )}

      {(template.traits.length > 0 || template.signatureAbility) && (
        <details className="squad-quick-details">
          <summary>Traits and ability text</summary>
          {template.signatureAbility && (
            <div className="squad-quick-detail-line">
              <strong>{template.signatureAbility.name}</strong>
              <span>{template.signatureAbility.effect || 'See power roll tiers on the minion stat block.'}</span>
            </div>
          )}
          {template.traits.map((trait) => (
            <div key={trait.name} className="squad-quick-detail-line">
              <strong>{trait.name}</strong>
              <span>{trait.description}</span>
            </div>
          ))}
        </details>
      )}
    </div>
  );
});

function UsersIcon() {
  return <Shield size={14} />;
}

export const SquadQuickList = memo(function SquadQuickList() {
  const { hero } = useHeroContext();
  const { sacrificeMinion } = useCombatContext();
  const { addRoll } = useRollHistory();
  const { damageSquad, healSquad, removeSquad, updateSquad } = useSquads();
  const { executeSacrifice, getSacrifiableMinions } = useSacrifice();
  const { getMinionById } = usePortfolio();
  const [damageInputs, setDamageInputs] = useState<Record<string, string>>({});
  const [rollModifiers, setRollModifiers] = useState<Record<string, RollModifier>>({});
  const [rollStates, setRollStates] = useState<Record<string, SquadRollState>>({});

  const activeSquads = hero && isSummonerHero(hero) ? hero.activeSquads || [] : [];
  const sacrifiableMinions = useMemo(() => getSacrifiableMinions(), [getSacrifiableMinions, activeSquads]);

  const summary = useMemo(() => {
    const alive = activeSquads.reduce((sum, squad) => sum + squad.members.filter((m) => m.isAlive).length, 0);
    const total = activeSquads.reduce((sum, squad) => sum + squad.members.length, 0);
    const stamina = activeSquads.reduce((sum, squad) => sum + squad.currentStamina, 0);
    const maxStamina = activeSquads.reduce((sum, squad) => sum + squad.maxStamina, 0);
    return { alive, total, stamina, maxStamina };
  }, [activeSquads]);

  const getRollModifier = useCallback(
    (squadId: string): RollModifier => rollModifiers[squadId] ?? 'normal',
    [rollModifiers]
  );

  const markSquadMembers = useCallback((squad: Squad, kind: 'move' | 'action' | 'maneuver', enabled: boolean) => {
    const members = squad.members.map((minion) => {
      if (!minion.isAlive) return minion;
      if (kind === 'move') return { ...minion, hasMovedThisTurn: enabled };
      return { ...minion, hasActedThisTurn: enabled };
    });

    updateSquad(squad.id, {
      members,
      ...(kind === 'move' ? { hasMoved: enabled } : {}),
      ...(kind === 'action' ? { hasActed: enabled } : {}),
      ...(kind === 'maneuver' ? { hasUsedManeuver: enabled } : {}),
    });
  }, [updateSquad]);

  const handleDamage = useCallback((squadId: string, amount: number) => {
    damageSquad(squadId, amount);
  }, [damageSquad]);

  const handleHeal = useCallback((squadId: string, amount: number) => {
    healSquad(squadId, amount);
  }, [healSquad]);

  const handleDamageInputChange = useCallback((squadId: string, value: string) => {
    setDamageInputs((prev) => ({ ...prev, [squadId]: value }));
  }, []);

  const handleApplyDamageInput = useCallback((squadId: string) => {
    const amount = parseInt(damageInputs[squadId] ?? '0', 10);
    if (Number.isFinite(amount) && amount > 0) {
      damageSquad(squadId, amount);
      setDamageInputs((prev) => ({ ...prev, [squadId]: '' }));
    }
  }, [damageInputs, damageSquad]);

  const handleCycleRollModifier = useCallback((squadId: string) => {
    const modifiers: RollModifier[] = ['normal', 'edge', 'bane'];
    setRollModifiers((prev) => {
      const current = prev[squadId] ?? 'normal';
      return { ...prev, [squadId]: modifiers[(modifiers.indexOf(current) + 1) % modifiers.length] };
    });
  }, []);

  const handleFreeStrike = useCallback((squad: Squad, template: MinionTemplate) => {
    const aliveCount = squad.members.filter((member) => member.isAlive).length;
    const characteristic = Math.max(template.characteristics.might, template.characteristics.agility);
    const result = performPowerRoll(characteristic, getRollModifier(squad.id));
    const damage = template.freeStrike * aliveCount;
    const label = `${template.name} Free Strike`;

    setRollStates((prev) => ({ ...prev, [squad.id]: { result, label, damage } }));
    addRoll(result, label, 'minion');
    markSquadMembers(squad, 'action', true);
  }, [addRoll, getRollModifier, markSquadMembers]);

  const handleSignature = useCallback((squad: Squad, template: MinionTemplate) => {
    const powerRoll = template.signatureAbility?.powerRoll;
    if (!powerRoll) return;

    const result = performPowerRoll(template.characteristics[powerRoll.characteristic], getRollModifier(squad.id));
    const label = `${template.name} ${template.signatureAbility?.name}`;

    setRollStates((prev) => ({ ...prev, [squad.id]: { result, label } }));
    addRoll(result, label, 'minion');
    markSquadMembers(squad, 'action', true);
  }, [addRoll, getRollModifier, markSquadMembers]);

  const handleSacrifice = useCallback((squadId: string) => {
    const sacrifiable = sacrifiableMinions.find(
      (minion) => minion.squadId === squadId && minion.canSacrifice
    );
    if (!sacrifiable) return;

    const result = executeSacrifice([sacrifiable.minionId]);
    if (result.success) {
      sacrificeMinion();
    }
  }, [executeSacrifice, sacrifiableMinions, sacrificeMinion]);

  if (!hero || !isSummonerHero(hero)) {
    return null;
  }

  return (
    <div className="squad-quick-list">
      <div className="squad-quick-list-heading">
        <h3 className="squad-quick-list-title">Active Squads</h3>
        <div className="squad-quick-summary">
          <span><Shield size={12} /> {summary.alive}/{summary.total}</span>
          <span><Heart size={12} /> {summary.stamina}/{summary.maxStamina}</span>
          <span><Sparkles size={12} /> {activeSquads.length}/2 squads</span>
        </div>
      </div>

      {activeSquads.length === 0 ? (
        <p className="squad-quick-list-empty">No active squads</p>
      ) : (
        activeSquads.map((squad) => {
          const template = getMinionById(squad.templateId);
          if (!template) return null;

          return (
            <SquadQuickItem
              key={squad.id}
              squad={squad}
              template={template}
              canSacrifice={sacrifiableMinions.some(
                (minion) => minion.squadId === squad.id && minion.canSacrifice
              )}
              rollModifier={getRollModifier(squad.id)}
              rollState={rollStates[squad.id]}
              damageInput={damageInputs[squad.id] ?? ''}
              onDamage={handleDamage}
              onHeal={handleHeal}
              onDamageInputChange={handleDamageInputChange}
              onApplyDamageInput={handleApplyDamageInput}
              onToggleMove={(targetSquad) => markSquadMembers(targetSquad, 'move', !targetSquad.hasMoved)}
              onToggleManeuver={(targetSquad) => markSquadMembers(targetSquad, 'maneuver', !targetSquad.hasUsedManeuver)}
              onToggleMainAction={(targetSquad) => markSquadMembers(targetSquad, 'action', !targetSquad.hasActed)}
              onCycleRollModifier={handleCycleRollModifier}
              onFreeStrike={handleFreeStrike}
              onSignature={handleSignature}
              onSacrifice={handleSacrifice}
              onDismiss={removeSquad}
            />
          );
        })
      )}
    </div>
  );
});

export default SquadQuickList;
