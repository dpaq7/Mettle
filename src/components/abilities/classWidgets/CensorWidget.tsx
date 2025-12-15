import React, { useState, useCallback } from 'react';
import { CensorHero, CensorOrder } from '../../../types/hero';
import { useHeroContext } from '../../../context/HeroContext';

interface CensorWidgetProps {
  hero: CensorHero;
}

const ORDER_INFO: Record<CensorOrder, { name: string; description: string }> = {
  inquisitor: {
    name: 'Inquisitor',
    description: 'Hunter of heretics who roots out enemies of the faith.',
  },
  templar: {
    name: 'Templar',
    description: 'Holy warrior who protects allies with divine power.',
  },
  zealot: {
    name: 'Zealot',
    description: 'Fanatical champion who channels righteous fury.',
  },
};

export const CensorWidget: React.FC<CensorWidgetProps> = ({ hero }) => {
  const { updateHero } = useHeroContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [targetInput, setTargetInput] = useState('');

  const { heroicResource, judgment, subclass: order, level, characteristics } = hero;
  const currentWrath = heroicResource?.current ?? 0;
  const judgedTarget = judgment?.targetName ?? null;

  // Calculate potency based on Presence
  const presence = characteristics?.presence ?? 2;

  // Determine wrath gain based on level
  const getWrathGain = () => {
    if (level >= 10) return { start: 4, trigger: 2 };
    if (level >= 7) return { start: 3, trigger: 2 };
    if (level >= 4) return { start: 2, trigger: 2 };
    return { start: 2, trigger: 1 };
  };

  const wrathGain = getWrathGain();

  const handleWrathChange = useCallback((delta: number) => {
    const newValue = Math.max(0, currentWrath + delta);
    updateHero({
      heroicResource: {
        ...heroicResource,
        current: newValue,
      },
    } as Partial<CensorHero>);
  }, [currentWrath, heroicResource, updateHero]);

  const handleSetJudgment = useCallback(() => {
    if (targetInput.trim()) {
      updateHero({
        judgment: {
          targetId: null,
          targetName: targetInput.trim(),
        },
      } as Partial<CensorHero>);
      setTargetInput('');
    }
  }, [targetInput, updateHero]);

  const handleClearJudgment = useCallback(() => {
    updateHero({
      judgment: {
        targetId: null,
        targetName: null,
      },
    } as Partial<CensorHero>);
  }, [updateHero]);

  const orderData = order ? ORDER_INFO[order] : null;

  return (
    <div className="class-widget class-widget--censor">
      {/* Compact Summary */}
      <div className="class-widget__summary">
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Wrath</span>
          <span className="class-widget__quick-stat-value">{currentWrath}</span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Judged</span>
          <span className="class-widget__quick-stat-value">
            {judgedTarget || '—'}
          </span>
        </div>
        <div className="class-widget__quick-stat">
          <span className="class-widget__quick-stat-label">Potency</span>
          <span className="class-widget__quick-stat-value">P+{presence}</span>
        </div>
      </div>

      {/* Collapsible Header */}
      <div
        className="class-widget__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="class-widget__header-left">
          <h3 className="class-widget__title">Censor</h3>
          {orderData && (
            <span className="class-widget__badge">{orderData.name}</span>
          )}
        </div>
        <span className={`class-widget__toggle ${isExpanded ? 'class-widget__toggle--open' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      <div className={`class-widget__content ${!isExpanded ? 'class-widget__content--collapsed' : ''}`}>
        {/* Wrath Tracker */}
        <div className="class-widget__resource">
          <span className="class-widget__resource-name">Wrath</span>
          <div className="class-widget__resource-controls">
            <button
              className="class-widget__resource-btn"
              onClick={() => handleWrathChange(-1)}
            >
              −
            </button>
            <span className="class-widget__resource-value">{currentWrath}</span>
            <button
              className="class-widget__resource-btn"
              onClick={() => handleWrathChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Judgment Mechanic */}
        <div className="class-widget__mechanic">
          <div className="class-widget__mechanic-header">
            <h4 className="class-widget__mechanic-title">Judgment</h4>
            <span className={`class-widget__mechanic-status ${judgedTarget ? 'class-widget__mechanic-status--active' : 'class-widget__mechanic-status--inactive'}`}>
              {judgedTarget ? 'Active' : 'None'}
            </span>
          </div>
          <p className="class-widget__mechanic-description">
            Mark an enemy. Gain Wrath when you deal damage to or take damage from your judged target.
          </p>

          {/* Target Input or Display */}
          <div className="class-widget__target">
            {judgedTarget ? (
              <div className="class-widget__active-target">
                <span className="class-widget__active-target-name">{judgedTarget}</span>
                <button
                  className="class-widget__target-btn class-widget__target-btn--danger"
                  onClick={handleClearJudgment}
                >
                  Release
                </button>
              </div>
            ) : (
              <>
                <label className="class-widget__target-label">Judge a target:</label>
                <div className="class-widget__target-input-group">
                  <input
                    type="text"
                    className="class-widget__target-input"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="Target name..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSetJudgment()}
                  />
                  <button
                    className="class-widget__target-btn"
                    onClick={handleSetJudgment}
                    disabled={!targetInput.trim()}
                  >
                    Judge
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Info */}
        {orderData && (
          <div className="class-widget__mechanic" style={{ borderLeftColor: '#ef5350' }}>
            <div className="class-widget__mechanic-header">
              <h4 className="class-widget__mechanic-title">{orderData.name} Order</h4>
            </div>
            <p className="class-widget__mechanic-description">
              {orderData.description}
            </p>
          </div>
        )}

        {/* Wrath Gain Reminder */}
        <div className="class-widget__gain-section">
          <h4 className="class-widget__gain-title">Wrath Gain</h4>
          <ul className="class-widget__gain-list">
            <li className="class-widget__gain-item">
              Start of turn: <strong>+{wrathGain.start} Wrath</strong>
              {level >= 7 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L{level >= 10 ? '10' : '7'}</span>}
            </li>
            <li className="class-widget__gain-item">
              First time/round you deal damage to judged target: <strong>+{wrathGain.trigger} Wrath</strong>
              {level >= 4 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L4+</span>}
            </li>
            <li className="class-widget__gain-item">
              First time/round judged target deals damage to you: <strong>+{wrathGain.trigger} Wrath</strong>
              {level >= 4 && <span className="class-widget__level-badge" style={{ marginLeft: '0.5rem' }}>L4+</span>}
            </li>
          </ul>
        </div>

        {/* Potency Display */}
        <div className="class-widget__potency">
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Weak</span>
            <span className="class-widget__potency-value">P-2 ({presence - 2})</span>
          </div>
          <div className="class-widget__potency-item">
            <span className="class-widget__potency-label">Average</span>
            <span className="class-widget__potency-value">P-1 ({presence - 1})</span>
          </div>
          <div className="class-widget__potency-item class-widget__potency-item--strong">
            <span className="class-widget__potency-label">Strong</span>
            <span className="class-widget__potency-value">P ({presence})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CensorWidget;
