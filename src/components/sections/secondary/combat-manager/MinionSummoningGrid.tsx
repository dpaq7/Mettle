/**
 * MinionSummoningGrid
 *
 * Ongoing summoning interface for the combat minion manager.
 * Shows:
 * - Signature minions section (1 essence)
 * - Unlocked minions grouped by tier (3/5/7 essence)
 * - Each card shows: name, essence cost, affordability state
 * - Tap to summon (calls existing useSummonMinion hook)
 */

import { memo, useCallback, useMemo } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { isSummonerHero } from '@/types/hero';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useEssence } from '@/hooks/useEssence';
import { useSummonMinion } from '@/hooks/useSummonMinion';
import { MinionTemplate } from '@/types';
import { CompactMinionCard, CompactMinionCardState } from './CompactMinionCard';

interface MinionGridSection {
  title: string;
  essenceCost: number;
  minions: MinionTemplate[];
}

export const MinionSummoningGrid = memo(function MinionSummoningGrid() {
  const { hero } = useHeroContext();
  const {
    getSignatureMinions,
    getUnlockedMinions,
    getActualEssenceCost,
    isMinionUnlockedByLevel,
  } = usePortfolio();
  const { validateMinionSummon, getSummonBlockReason } = useEssence();
  const { summonMinion } = useSummonMinion();

  // Get minions organized by section, filtering by character level
  const sections = useMemo<MinionGridSection[]>(() => {
    const signatureMinions = getSignatureMinions();
    const unlockedMinions = getUnlockedMinions();

    const sectionList: MinionGridSection[] = [];

    // Signature minions (1 essence) - always available
    if (signatureMinions.length > 0) {
      sectionList.push({
        title: 'Signature (1 Essence)',
        essenceCost: 1,
        minions: signatureMinions,
      });
    }

    // Filter unlocked minions by level requirement, then group by essence cost
    const levelFilteredMinions = unlockedMinions.filter(minion => isMinionUnlockedByLevel(minion));

    const grouped = levelFilteredMinions.reduce((acc, minion) => {
      const cost = minion.essenceCost;
      if (!acc[cost]) {
        acc[cost] = [];
      }
      acc[cost].push(minion);
      return acc;
    }, {} as Record<number, MinionTemplate[]>);

    // Add sections for each tier (only if minions exist at that tier)
    const tiers = [3, 5, 7, 9];
    for (const tier of tiers) {
      const minions = grouped[tier];
      if (minions && minions.length > 0) {
        sectionList.push({
          title: `${tier === 9 ? 'Champion' : `Tier ${tier}`} (${tier} Essence)`,
          essenceCost: tier,
          minions,
        });
      }
    }

    return sectionList;
  }, [getSignatureMinions, getUnlockedMinions, isMinionUnlockedByLevel]);

  const handleSummonMinion = useCallback((template: MinionTemplate) => {
    const result = summonMinion(template);
    if (!result.success) {
      // Could show a toast here in the future
      console.warn('Summon failed:', result.validation.message);
    }
  }, [summonMinion]);

  const getMinionState = useCallback((template: MinionTemplate): {
    state: CompactMinionCardState;
    reason?: string;
    actualCost: number;
  } => {
    if (!hero || !isSummonerHero(hero)) {
      return { state: 'disabled', reason: 'No hero', actualCost: template.essenceCost };
    }

    const actualCost = getActualEssenceCost(template);
    const validation = validateMinionSummon(template);

    if (!validation.canSummon) {
      return {
        state: 'disabled',
        reason: getSummonBlockReason(template),
        actualCost,
      };
    }

    return { state: 'available', actualCost };
  }, [hero, getActualEssenceCost, validateMinionSummon, getSummonBlockReason]);

  if (sections.length === 0) {
    return (
      <div className="minion-summoning-grid">
        <p className="minion-grid-empty">
          No minions available in your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="minion-summoning-grid">
      {sections.map((section) => (
        <div key={section.essenceCost} className="minion-grid-section">
          <h3 className="minion-grid-section-title">{section.title}</h3>
          <div className="minion-grid-cards">
            {section.minions.map((template) => {
              const { state, reason, actualCost } = getMinionState(template);
              return (
                <CompactMinionCard
                  key={template.id}
                  template={template}
                  state={state}
                  essenceCost={actualCost}
                  reason={reason}
                  onClick={() => handleSummonMinion(template)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

export default MinionSummoningGrid;
