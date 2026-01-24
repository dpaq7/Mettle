/**
 * SquadQuickList
 *
 * Compact squad summary for the combat minion manager.
 * Shows for each squad:
 * - Squad name + alive count (e.g., "Imp Swarm 3/4")
 * - HP bar visualization
 * - Quick damage buttons (-1, -5)
 * - Sacrifice button (disabled if used this turn)
 * - Dismiss button
 */

import { memo, useCallback } from 'react';
import { Minus, Skull, X, Heart } from 'lucide-react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { isSummonerHero } from '@/types/hero';
import { useSquads } from '@/hooks/useSquads';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Squad } from '@/types';

interface SquadQuickItemProps {
  squad: Squad;
  minionName: string;
  canSacrifice: boolean;
  onDamage: (squadId: string, amount: number) => void;
  onSacrifice: (squadId: string) => void;
  onDismiss: (squadId: string) => void;
}

const SquadQuickItem = memo(function SquadQuickItem({
  squad,
  minionName,
  canSacrifice,
  onDamage,
  onSacrifice,
  onDismiss,
}: SquadQuickItemProps) {
  const aliveCount = squad.members.filter(m => m.isAlive).length;
  const totalCount = squad.members.length;
  const hpPercent = squad.maxStamina > 0 ? (squad.currentStamina / squad.maxStamina) * 100 : 0;

  // Determine HP bar state
  let hpFillClass = 'squad-quick-hp-fill';
  if (hpPercent <= 25) {
    hpFillClass += ' squad-quick-hp-fill--critical';
  } else if (hpPercent <= 50) {
    hpFillClass += ' squad-quick-hp-fill--wounded';
  }

  return (
    <div className="squad-quick-item">
      <div className="squad-quick-header">
        <h4 className="squad-quick-name">{minionName}</h4>
        <span className="squad-quick-count">{aliveCount}/{totalCount}</span>
      </div>

      <div className="squad-quick-hp">
        <div className="squad-quick-hp-bar">
          <div
            className={hpFillClass}
            style={{ width: `${hpPercent}%` }}
          />
        </div>
        <span className="squad-quick-hp-text">
          {squad.currentStamina}/{squad.maxStamina} HP
        </span>
      </div>

      <div className="squad-quick-actions">
        <button
          type="button"
          className="squad-quick-btn squad-quick-btn--damage"
          onClick={() => onDamage(squad.id, 1)}
          title="Deal 1 damage"
        >
          <Minus size={12} /> 1
        </button>
        <button
          type="button"
          className="squad-quick-btn squad-quick-btn--damage"
          onClick={() => onDamage(squad.id, 5)}
          title="Deal 5 damage"
        >
          <Minus size={12} /> 5
        </button>
        <button
          type="button"
          className="squad-quick-btn squad-quick-btn--sacrifice"
          onClick={() => onSacrifice(squad.id)}
          disabled={!canSacrifice}
          title={canSacrifice ? 'Sacrifice for 1 essence' : 'Already sacrificed this turn'}
        >
          <Skull size={12} />
        </button>
        <button
          type="button"
          className="squad-quick-btn squad-quick-btn--dismiss"
          onClick={() => onDismiss(squad.id)}
          title="Dismiss squad"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
});

export const SquadQuickList = memo(function SquadQuickList() {
  const { hero } = useHeroContext();
  const { hasSacrificedThisTurn, sacrificeMinion } = useCombatContext();
  const { damageSquad, removeSquad } = useSquads();
  const { getMinionById } = usePortfolio();

  if (!hero || !isSummonerHero(hero)) {
    return null;
  }

  const activeSquads = hero.activeSquads || [];

  const handleDamage = useCallback((squadId: string, amount: number) => {
    damageSquad(squadId, amount);
  }, [damageSquad]);

  const handleSacrifice = useCallback((squadId: string) => {
    // First sacrifice to gain essence
    const success = sacrificeMinion();
    if (success) {
      // Then remove one minion from the squad
      const squad = activeSquads.find(s => s.id === squadId);
      if (squad) {
        const aliveMinion = squad.members.find(m => m.isAlive);
        if (aliveMinion) {
          // Deal damage equal to one minion's HP to remove it
          damageSquad(squadId, aliveMinion.maxStamina);
        }
      }
    }
  }, [sacrificeMinion, activeSquads, damageSquad]);

  const handleDismiss = useCallback((squadId: string) => {
    removeSquad(squadId);
  }, [removeSquad]);

  const getMinionName = useCallback((templateId: string): string => {
    const template = getMinionById(templateId);
    return template?.name || 'Unknown Minion';
  }, [getMinionById]);

  return (
    <div className="squad-quick-list">
      <h3 className="squad-quick-list-title">Active Squads</h3>

      {activeSquads.length === 0 ? (
        <p className="squad-quick-list-empty">No active squads</p>
      ) : (
        activeSquads.map((squad) => (
          <SquadQuickItem
            key={squad.id}
            squad={squad}
            minionName={getMinionName(squad.templateId)}
            canSacrifice={!hasSacrificedThisTurn && squad.members.some(m => m.isAlive)}
            onDamage={handleDamage}
            onSacrifice={handleSacrifice}
            onDismiss={handleDismiss}
          />
        ))
      )}
    </div>
  );
});

export default SquadQuickList;
