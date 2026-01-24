/**
 * FreeMinionSelection
 *
 * Combat start selection phase for free signature minions.
 * Shows:
 * - "Select X Free Minions" banner with urgency styling
 * - Grid of signature minion cards (from hero.portfolio.signatureMinions)
 * - Tap to select, decrements pendingFreeMinions
 * - Auto-transitions when all selected
 */

import { memo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { isSummonerHero } from '@/types/hero';
import { useEssence } from '@/hooks/useEssence';
import { CompactMinionCard } from './CompactMinionCard';
import { getMaxMinions, countActiveMinions } from '@/utils/summonerValidation';

export const FreeMinionSelection = memo(function FreeMinionSelection() {
  const { hero } = useHeroContext();
  const { essenceState, selectFreeMinion } = useCombatContext();
  const { getMinionCounts } = useEssence();

  if (!hero || !isSummonerHero(hero)) {
    return null;
  }

  const signatureMinions = hero.portfolio.signatureMinions || [];
  const pendingCount = essenceState.pendingFreeMinions;
  const { current: currentMinions, max: maxMinions } = getMinionCounts();

  // Check if we're at the minion limit
  const isAtLimit = currentMinions >= maxMinions;

  const handleSelectMinion = useCallback((templateId: string) => {
    if (pendingCount > 0 && !isAtLimit) {
      selectFreeMinion(templateId);
    }
  }, [pendingCount, isAtLimit, selectFreeMinion]);

  if (signatureMinions.length === 0) {
    return (
      <div className="free-minion-selection">
        <div className="free-minion-banner">
          <div className="free-minion-banner-icon">
            <Sparkles size={20} />
          </div>
          <div className="free-minion-banner-text">
            <p className="free-minion-banner-title">No Signature Minions</p>
            <p className="free-minion-banner-subtitle">
              Add signature minions to your portfolio to summon them for free.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="free-minion-selection">
      <div className="free-minion-banner">
        <div className="free-minion-banner-icon">
          <Sparkles size={20} />
        </div>
        <div className="free-minion-banner-text">
          <p className="free-minion-banner-title">
            Select Free Minions
          </p>
          <p className="free-minion-banner-subtitle">
            Tap to summon signature minions at no essence cost
          </p>
        </div>
        <div className="free-minion-count">{pendingCount}</div>
      </div>

      <div className="free-minion-grid">
        {signatureMinions.map((template) => {
          // Determine card state
          let state: 'free' | 'disabled' = 'free';
          let reason: string | undefined;

          if (isAtLimit) {
            state = 'disabled';
            reason = 'At limit';
          } else if (pendingCount <= 0) {
            state = 'disabled';
            reason = 'None left';
          }

          return (
            <CompactMinionCard
              key={template.id}
              template={template}
              state={state}
              showAsFree={state === 'free'}
              reason={reason}
              onClick={() => handleSelectMinion(template.id)}
            />
          );
        })}
      </div>
    </div>
  );
});

export default FreeMinionSelection;
