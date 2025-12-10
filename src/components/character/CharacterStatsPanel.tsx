import React, { useState } from 'react';
import { useSummonerContext } from '../../context/SummonerContext';
import { useCombatContext } from '../../context/CombatContext';
import { useRollHistory } from '../../context/RollHistoryContext';
import { useConditions, SaveResult, BleedingDamageResult } from '../../hooks/useConditions';
import { useEquipment } from '../../hooks/useEquipment';
import { ALL_CONDITIONS, ConditionDefinition } from '../../data/conditions';
import { performPowerRoll, getTierColor, RollModifier, PowerRollResult } from '../../utils/dice';
import { Characteristic, ConditionId } from '../../types';
import PentagonStatBox from '../ui/PentagonStatBox';
import StatBox from '../shared/StatBox';
import ProgressionTracker from '../ui/ProgressionTracker';
import ResourcePanel from '../ui/ResourcePanel';
import SurgesTracker from '../ui/SurgesTracker';
import SectionHeader from '../shared/SectionHeader';
import './CharacterStatsPanel.css';

// XP thresholds for each level (minimum XP required)
const XP_THRESHOLDS: Record<number, number> = {
  2: 16,
  3: 32,
  4: 48,
  5: 64,
  6: 80,
  7: 96,
  8: 112,
  9: 128,
  10: 144,
};

interface CharacterStatsPanelProps {
  onLevelUp: () => void;
}

const CharacterStatsPanel: React.FC<CharacterStatsPanelProps> = ({ onLevelUp }) => {
  const { hero, updateHero } = useSummonerContext();
  const { essenceState, spendEssence, gainEssence, isInCombat, startCombat, endCombat } = useCombatContext();
  const { addRoll } = useRollHistory();
  const {
    addCondition,
    removeCondition,
    hasCondition,
    getActiveConditions,
    getConditionDef,
    attemptSave,
    applyBleedingDamage,
  } = useConditions();
  const { totalBonuses, equippedItems } = useEquipment();
  const [showNotes, setShowNotes] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState('');
  const [rollModifier, setRollModifier] = useState<RollModifier>('normal');
  const [lastRoll, setLastRoll] = useState<{ char: string; result: PowerRollResult } | null>(null);
  const [showRespiteConfirm, setShowRespiteConfirm] = useState(false);
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);
  const [lastSaveResult, setLastSaveResult] = useState<SaveResult | null>(null);
  const [lastBleedingResult, setLastBleedingResult] = useState<BleedingDamageResult | null>(null);
  const [windedOverride, setWindedOverride] = useState(false);
  const [dyingOverride, setDyingOverride] = useState(false);

  if (!hero) return null;

  const adjust = (field: 'stamina' | 'recoveries' | 'victories' | 'surges', delta: number) => {
    if (field === 'stamina') {
      // Allow negative stamina for dying state (death occurs at -winded value)
      const val = Math.min(hero.stamina.max, hero.stamina.current + delta);
      updateHero({ stamina: { ...hero.stamina, current: val } });
    } else if (field === 'recoveries') {
      const val = Math.max(0, Math.min(hero.recoveries.max, hero.recoveries.current + delta));
      updateHero({ recoveries: { ...hero.recoveries, current: val } });
    } else if (field === 'victories') {
      updateHero({ victories: Math.max(0, hero.victories + delta) });
    } else if (field === 'surges') {
      updateHero({ surges: Math.max(0, hero.surges + delta) });
    }
  };

  const useRecovery = () => {
    if (hero.recoveries.current > 0) {
      const newStamina = Math.min(hero.stamina.max, hero.stamina.current + hero.recoveries.value);
      updateHero({
        stamina: { ...hero.stamina, current: newStamina },
        recoveries: { ...hero.recoveries, current: hero.recoveries.current - 1 },
      });
    }
  };

  const handleRespite = () => {
    // Convert victories to XP and reset resources
    const xpGained = hero.victories;
    const newXp = (hero.xp || 0) + xpGained;

    updateHero({
      xp: newXp,
      victories: 0,
      stamina: { ...hero.stamina, current: hero.stamina.max },
      recoveries: { ...hero.recoveries, current: hero.recoveries.max },
      surges: 0,
      activeSquads: [], // Dismiss all minions during respite
    });

    setShowRespiteConfirm(false);
  };

  // Calculate XP progress for current level
  const getXpProgress = () => {
    const currentXp = hero.xp || 0;
    const nextLevel = hero.level + 1;

    if (nextLevel > 10) {
      return { current: currentXp, needed: 0, progress: 100, canLevelUp: false };
    }

    const xpForNextLevel = XP_THRESHOLDS[nextLevel];
    const xpForCurrentLevel = hero.level === 1 ? 0 : XP_THRESHOLDS[hero.level];
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const xpProgress = currentXp - xpForCurrentLevel;
    const progress = Math.min(100, (xpProgress / xpNeeded) * 100);
    const canLevelUp = currentXp >= xpForNextLevel;

    return { current: currentXp, needed: xpForNextLevel, progress, canLevelUp };
  };

  const xpInfo = getXpProgress();

  const handleNotesSave = () => {
    updateHero({ notes: notesValue });
    setEditingNotes(false);
  };

  const openNotes = () => {
    setNotesValue(hero.notes || '');
    setShowNotes(true);
    setEditingNotes(true);
  };

  const circleShort: Record<string, string> = {
    blight: 'Blight', graves: 'Graves', spring: 'Spring', storms: 'Storms',
  };

  const chars = hero.characteristics;

  const charLabels: Record<Characteristic, string> = {
    might: 'Might',
    agility: 'Agility',
    reason: 'Reason',
    intuition: 'Intuition',
    presence: 'Presence',
  };

  const charShort: Record<Characteristic, string> = {
    might: 'MGT',
    agility: 'AGI',
    reason: 'REA',
    intuition: 'INT',
    presence: 'PRE',
  };

  const rollCharacteristic = (char: Characteristic) => {
    const value = chars[char];
    const result = performPowerRoll(value, rollModifier);
    setLastRoll({ char: charLabels[char], result });
    addRoll(result, `${charLabels[char]} Test`, 'hero');

    // Auto-clear the roll result after 5 seconds
    setTimeout(() => setLastRoll(null), 5000);
  };

  const cycleRollModifier = () => {
    const mods: RollModifier[] = ['normal', 'edge', 'bane'];
    const currentIdx = mods.indexOf(rollModifier);
    setRollModifier(mods[(currentIdx + 1) % mods.length]);
  };

  const handleConditionClick = (conditionId: ConditionId, def: ConditionDefinition) => {
    if (def.saveEnds) {
      const result = attemptSave(conditionId);
      setLastSaveResult(result);
      setTimeout(() => setLastSaveResult(null), 3000);
    } else {
      if (confirm(`Remove ${def.name}?`)) {
        removeCondition(conditionId);
      }
    }
  };

  const toggleCondition = (conditionId: ConditionId) => {
    if (hasCondition(conditionId)) {
      removeCondition(conditionId);
    } else {
      addCondition(conditionId);
    }
    setShowConditionDropdown(false);
  };

  const triggerBleeding = (trigger: string) => {
    const result = applyBleedingDamage(trigger);
    setLastBleedingResult(result);
    setTimeout(() => setLastBleedingResult(null), 3000);
  };

  return (
    <div className="stats-panel">
      {/* Row 1: Identity */}
      <div className="panel-row identity-row">
        <div className="identity">
          <span className="name">{hero.name}</span>
          <span className="tag level">Lv {hero.level}</span>
          <span className="tag circle">{circleShort[hero.circle]}</span>
          <span className="tag formation">{hero.formation}</span>
        </div>
        <div className="identity-actions">
          <button
            className="respite-btn"
            onClick={() => setShowRespiteConfirm(true)}
            disabled={isInCombat}
            title={isInCombat ? "Cannot respite during combat" : "Take a respite to convert victories to XP and restore resources"}
          >
            Respite
          </button>
          {!isInCombat ? (
            <button className="draw-steel-btn" onClick={startCombat}>
              Draw Steel!
            </button>
          ) : (
            <button className="end-combat-btn" onClick={endCombat}>
              End Combat
            </button>
          )}
          {hero.level < 10 && xpInfo.canLevelUp && (
            <button className="lvl-btn ready" onClick={onLevelUp}>Level Up!</button>
          )}
          {hero.level < 10 && !xpInfo.canLevelUp && (
            <button className="lvl-btn" onClick={onLevelUp} disabled>Level Up</button>
          )}
          <button className="notes-btn" onClick={openNotes}>Notes</button>
        </div>
      </div>

      {/* Row 2: Characteristics + Resources + Progression */}
      <div className="panel-row chars-progression-row">
        <div className="characteristics-section">
          <SectionHeader title="Characteristics" variant="compact" />
          <div className="pentagon-stats">
            <PentagonStatBox
              value={chars.might}
              label="Might"
              onClick={() => rollCharacteristic('might')}
              active={lastRoll?.char === 'Might'}
            />
            <PentagonStatBox
              value={chars.agility}
              label="Agility"
              onClick={() => rollCharacteristic('agility')}
              active={lastRoll?.char === 'Agility'}
            />
            <PentagonStatBox
              value={chars.reason}
              label="Reason"
              onClick={() => rollCharacteristic('reason')}
              active={lastRoll?.char === 'Reason'}
            />
            <PentagonStatBox
              value={chars.intuition}
              label="Intuition"
              onClick={() => rollCharacteristic('intuition')}
              active={lastRoll?.char === 'Intuition'}
            />
            <PentagonStatBox
              value={chars.presence}
              label="Presence"
              onClick={() => rollCharacteristic('presence')}
              active={lastRoll?.char === 'Presence'}
            />
          </div>
        </div>

        <ResourcePanel
          stamina={{
            current: hero.stamina.current,
            max: hero.stamina.max + (totalBonuses.stamina || 0),
            temporary: 0,
            winded: windedOverride,
            dying: dyingOverride,
            dyingThreshold: Math.floor(hero.stamina.winded / 2),
          }}
          recoveries={{
            stamina: hero.recoveries.value,
            current: hero.recoveries.current,
            max: hero.recoveries.max,
          }}
          essence={{
            current: essenceState?.currentEssence ?? 0,
            max: hero.essence.maxPerTurn,
          }}
          onStaminaChange={(updates) => {
            if (updates.current !== undefined) {
              updateHero({ stamina: { ...hero.stamina, current: updates.current } });
            }
            if (updates.winded !== undefined) {
              setWindedOverride(updates.winded);
            }
            if (updates.dying !== undefined) {
              setDyingOverride(updates.dying);
            }
          }}
          onRecoveriesChange={(current) => {
            updateHero({ recoveries: { ...hero.recoveries, current } });
          }}
          onUseRecovery={useRecovery}
          onEssenceChange={(current) => {
            const diff = current - (essenceState?.currentEssence ?? 0);
            if (diff > 0) {
              gainEssence(diff);
            } else if (diff < 0) {
              spendEssence(-diff);
            }
          }}
          hideSurges
          className="inline-resources"
        />

        <SurgesTracker
          current={hero.surges}
          max={3}
          onCurrentChange={(current) => updateHero({ surges: current })}
        />

        <ProgressionTracker
          victories={hero.victories}
          maxVictories={12}
          onVictoriesChange={(count) => updateHero({ victories: count })}
          level={hero.level}
          gold={hero.gold}
          onGoldChange={(gold) => updateHero({ gold })}
          renown={hero.renown}
          onRenownChange={(renown) => updateHero({ renown })}
          xp={{ current: hero.xp || 0, needed: xpInfo.needed }}
          portraitUrl={hero.portraitUrl}
          onPortraitChange={(portraitUrl) => updateHero({ portraitUrl })}
          className="inline-progression"
        />
      </div>

      {/* Row 2.5: Derived Stats, Roll Controls & Conditions */}
      <div className="panel-row derived-row">
        <button className={`roll-mod-btn ${rollModifier}`} onClick={cycleRollModifier} title="Toggle Edge/Bane">
          {rollModifier === 'edge' ? 'Edge' : rollModifier === 'bane' ? 'Bane' : 'Normal'}
        </button>

        <div className="derived-stats">
          <StatBox
            value={hero.speed + (totalBonuses.speed || 0)}
            label="Speed"
            size="sm"
          />
          <StatBox
            value={hero.stability + (totalBonuses.stability || 0)}
            label="Stability"
            size="sm"
          />
          {totalBonuses.damage > 0 && (
            <StatBox
              value={`+${totalBonuses.damage}`}
              label="Damage"
              size="sm"
              variant="accent"
            />
          )}
        </div>

        {/* Conditions */}
        <div className="conditions-inline">
          <span className="cond-label">COND</span>
          <div className="cond-badges">
            {getActiveConditions().map(ac => {
              const def = getConditionDef(ac.conditionId);
              return (
                <button
                  key={ac.conditionId}
                  className={`cond-badge ${def.saveEnds ? 'saveable' : 'manual'}`}
                  title={`${def.primaryEffect}\n\nClick to ${def.saveEnds ? 'attempt save' : 'remove'}`}
                  onClick={() => handleConditionClick(ac.conditionId, def)}
                >
                  {def.icon} {def.name} {def.saveEnds && '🎲'}
                </button>
              );
            })}
            {getActiveConditions().length === 0 && <span className="no-cond">None</span>}
          </div>
          <div className="cond-add-wrap">
            <button className="cond-add-btn" onClick={() => setShowConditionDropdown(!showConditionDropdown)}>
              + Add
            </button>
            {showConditionDropdown && (
              <div className="cond-dropdown">
                {ALL_CONDITIONS.map(c => (
                  <button key={c.id} onClick={() => toggleCondition(c.id)}>
                    {c.icon} {c.name} {hasCondition(c.id) && '✓'}
                  </button>
                ))}
              </div>
            )}
          </div>
          {hasCondition('bleeding') && (
            <div className="bleed-triggers">
              <span className="bleed-label">🩸</span>
              <button onClick={() => triggerBleeding('Main')}>Main</button>
              <button onClick={() => triggerBleeding('Triggered')}>Trig</button>
              <button onClick={() => triggerBleeding('Power Roll')}>Roll</button>
            </div>
          )}
          {lastSaveResult && (
            <span className={`save-toast ${lastSaveResult.success ? 'success' : 'fail'}`}>
              {lastSaveResult.conditionName}: {lastSaveResult.roll} {lastSaveResult.success ? '✓' : '✗'}
            </span>
          )}
          {lastBleedingResult && (
            <span className="bleed-toast">🩸 {lastBleedingResult.total} dmg</span>
          )}
        </div>

        {/* Roll Result Display */}
        {lastRoll && (
          <div className="roll-result-inline" style={{ borderColor: getTierColor(lastRoll.result.tier) }}>
            <span className="roll-char">{lastRoll.char}</span>
            <span className="roll-total" style={{ color: getTierColor(lastRoll.result.tier) }}>
              {lastRoll.result.total}
            </span>
            <span className="roll-breakdown">
              ({lastRoll.result.naturalRoll}{lastRoll.result.modifier >= 0 ? '+' : ''}{lastRoll.result.modifier})
            </span>
            <span className="roll-tier">T{lastRoll.result.tier}</span>
            <button className="dismiss-roll" onClick={() => setLastRoll(null)}>×</button>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {showNotes && (
        <div className="notes-overlay" onClick={() => setShowNotes(false)}>
          <div className="notes-modal" onClick={e => e.stopPropagation()}>
            <h3>Notes</h3>
            {editingNotes ? (
              <>
                <textarea
                  value={notesValue}
                  onChange={e => setNotesValue(e.target.value)}
                  placeholder="Add notes..."
                  autoFocus
                />
                <div className="notes-actions">
                  <button onClick={handleNotesSave}>Save</button>
                  <button onClick={() => setShowNotes(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <p onClick={() => { setNotesValue(hero.notes || ''); setEditingNotes(true); }}>
                {hero.notes || 'Click to add notes...'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Respite Confirmation Modal */}
      {showRespiteConfirm && (
        <div className="notes-overlay" onClick={() => setShowRespiteConfirm(false)}>
          <div className="respite-modal" onClick={e => e.stopPropagation()}>
            <h3>Take a Respite?</h3>
            <p className="respite-description">
              During a respite, you rest and recover. This will:
            </p>
            <ul className="respite-effects">
              <li>Convert <strong>{hero.victories} victories</strong> to <strong>{hero.victories} XP</strong></li>
              <li>Restore stamina to maximum ({hero.stamina.max})</li>
              <li>Restore all recoveries ({hero.recoveries.max})</li>
              <li>Reset surges to 0</li>
              <li>Dismiss all active minions</li>
            </ul>
            {hero.victories > 0 && (
              <p className="xp-preview">
                New XP total: {(hero.xp || 0) + hero.victories}
                {xpInfo.needed > 0 && ` / ${xpInfo.needed}`}
              </p>
            )}
            <div className="respite-actions">
              <button className="confirm-btn" onClick={handleRespite}>
                Take Respite
              </button>
              <button className="cancel-btn" onClick={() => setShowRespiteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterStatsPanel;
