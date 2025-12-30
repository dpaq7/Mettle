import React from 'react';
import { useCombatContext } from '../../context/CombatContext';
import { useSummonerContext } from '../../context/HeroContext';
import { isSummonerHero } from '../../types/hero';
import { TurnPhase } from '../../types';
import './TurnFlowGuide.css';

const TurnFlowGuide: React.FC = () => {
  const { turnState, advancePhase, startNewTurn, essenceState, selectFreeMinion } = useCombatContext();
  const { hero: genericHero } = useSummonerContext();

  // Get signature minions if this is a Summoner
  const hero = genericHero && isSummonerHero(genericHero) ? genericHero : null;
  const signatureMinions = hero?.portfolio?.signatureMinions || [];
  const pendingFreeMinions = essenceState.pendingFreeMinions;

  const phases: { id: TurnPhase; label: string; description: string }[] = [
    {
      id: 'collectResources',
      label: 'Collect Resources',
      description: pendingFreeMinions > 0
        ? `Select ${pendingFreeMinions} free signature minion${pendingFreeMinions > 1 ? 's' : ''}`
        : 'Gain essence and spawn signature minions',
    },
    {
      id: 'summonMinions',
      label: 'Summon Minions',
      description: 'Use Call Forth or other summoning abilities',
    },
    {
      id: 'positionUnits',
      label: 'Position Units',
      description: 'Move squads and minions',
    },
    {
      id: 'executePlan',
      label: 'Execute Plan',
      description: 'Squad actions and hero abilities',
    },
  ];

  const currentPhaseIndex = phases.findIndex((p) => p.id === turnState.currentPhase);

  return (
    <div className="turn-flow-guide">
      <div className="turn-header">
        <h3>Turn {turnState.roundNumber}</h3>
        <button onClick={startNewTurn} className="new-turn-btn">
          Start New Turn
        </button>
      </div>

      {/* Free Minion Picker - shows when there are pending free minions */}
      {pendingFreeMinions > 0 && signatureMinions.length > 0 && (
        <div className="free-minion-picker">
          <div className="picker-header">
            <span className="picker-title">Select Free Minions</span>
            <span className="picker-count">{pendingFreeMinions} remaining</span>
          </div>
          <div className="signature-minion-buttons">
            {signatureMinions.map(minion => (
              <button
                key={minion.id}
                className="free-minion-btn"
                onClick={() => selectFreeMinion(minion.id)}
                title={`Summon ${minion.name} for free`}
              >
                <span className="minion-name">{minion.name}</span>
                <span className="minion-role">{minion.role}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="phases-list">
        {phases.map((phase, index) => {
          const isCompleted = turnState.phasesCompleted.includes(phase.id);
          const isCurrent = phase.id === turnState.currentPhase;
          const isPending = index > currentPhaseIndex;

          return (
            <div
              key={phase.id}
              className={`phase-item ${
                isCompleted ? 'completed' : isCurrent ? 'current' : 'pending'
              }`}
            >
              <div className="phase-indicator">
                {isCompleted ? '✓' : index + 1}
              </div>
              <div className="phase-content">
                <h4>{phase.label}</h4>
                <p>{phase.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {currentPhaseIndex < phases.length - 1 && (
        <button onClick={advancePhase} className="advance-phase-btn">
          Complete Phase → {phases[currentPhaseIndex + 1].label}
        </button>
      )}
    </div>
  );
};

export default TurnFlowGuide;
