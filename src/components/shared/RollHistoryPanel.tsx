import React from 'react';
import { useRollHistory, RollHistoryEntry } from '../../context/RollHistoryContext';
import { getTierColor } from '../../utils/dice';
import './RollHistoryPanel.css';

const RollHistoryPanel: React.FC = () => {
  const { history, clearHistory, isHistoryOpen } = useRollHistory();

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getSourceIcon = (sourceType: RollHistoryEntry['sourceType']) => {
    switch (sourceType) {
      case 'ability':
        return 'A';
      case 'minion':
        return 'M';
      case 'hero':
        return 'H';
      default:
        return 'D';
    }
  };

  // Check if this is a simple dice roll (d6, d3, etc.) vs power roll
  const isSimpleRoll = (entry: RollHistoryEntry) => {
    // Simple rolls have dice[1] === 0 (we use [result, 0] for non-2d10 rolls)
    return entry.result.dice[1] === 0;
  };

  // Check if this is a Save roll
  const isSaveRoll = (entry: RollHistoryEntry) => {
    return entry.source.toLowerCase().includes('save');
  };

  return (
    <>
      {isHistoryOpen && (
        <div className="roll-history-panel">
          <div className="history-header">
            <h3>Roll History</h3>
            <button className="clear-btn" onClick={clearHistory} title="Clear History">
              Clear
            </button>
          </div>

          <div className="history-list">
            {history.length === 0 ? (
              <div className="history-empty">
                No rolls yet. Use the dice popover or abilities to roll!
              </div>
            ) : (
              history.map((entry) => {
                const simple = isSimpleRoll(entry);
                const isSave = isSaveRoll(entry);

                return (
                  <div
                    key={entry.id}
                    className={`history-entry ${simple ? 'simple-roll' : `tier-${entry.result.tier}`} ${isSave ? 'save-roll' : ''}`}
                  >
                    <div className="entry-header">
                      <span
                        className="source-icon"
                        title={entry.sourceType}
                      >
                        {getSourceIcon(entry.sourceType)}
                      </span>
                      <span className="source-name">{entry.source}</span>
                      <span className="entry-time">{formatTime(entry.timestamp)}</span>
                    </div>
                    <div className="entry-result">
                      {simple ? (
                        // Simple dice roll display (d6, d3, etc.)
                        <>
                          <span className={`result-total ${isSave && entry.result.dice[0] >= 6 ? 'save-success' : isSave ? 'save-fail' : ''}`}>
                            {entry.result.dice[0]}
                          </span>
                          {isSave && (
                            <span className={`result-save-status ${entry.result.dice[0] >= 6 ? 'success' : 'fail'}`}>
                              {entry.result.dice[0] >= 6 ? 'Success' : 'Fail'}
                            </span>
                          )}
                        </>
                      ) : (
                        // Power roll display
                        <>
                          <span
                            className="result-total"
                            style={{ color: getTierColor(entry.result.tier) }}
                          >
                            {entry.result.total}
                          </span>
                          <span className="result-details">
                            [{entry.result.dice[0]}+{entry.result.dice[1]}]
                            {entry.result.edgeBaneBonus !== 0 && (
                              <span className={entry.result.edgeBaneBonus > 0 ? 'edge-bonus' : 'bane-penalty'}>
                                {entry.result.edgeBaneBonus > 0 ? '+' : ''}{entry.result.edgeBaneBonus}
                              </span>
                            )}
                            {entry.result.modifier !== 0 && (
                              <> {entry.result.modifier >= 0 ? '+' : ''}{entry.result.modifier}</>
                            )}
                          </span>
                          <span
                            className="result-tier"
                            style={{ background: getTierColor(entry.result.tier) }}
                          >
                            T{entry.result.tier}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RollHistoryPanel;
