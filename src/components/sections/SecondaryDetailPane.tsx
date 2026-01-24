import { memo, useMemo, useCallback } from 'react';
import { useSecondaryDetail } from '@/context/SecondaryDetailContext';
import { X, ChevronLeft, Users } from 'lucide-react';
import './SecondaryDetailPane.css';

// Import detail components
import { ConditionRulesDetail } from './secondary/ConditionRulesDetail';
import { SkillRulesDetail } from './secondary/SkillRulesDetail';
import { KeywordRulesDetail } from './secondary/KeywordRulesDetail';
import { AbilityRulesDetail } from './secondary/AbilityRulesDetail';
import { PerkRulesDetail } from './secondary/PerkRulesDetail';
import { AncestryTraitRulesDetail } from './secondary/AncestryTraitRulesDetail';
import { KitAbilityRulesDetail } from './secondary/KitAbilityRulesDetail';
import { CombatMinionManager } from './secondary/CombatMinionManager';

const EmptyState = memo(function EmptyState() {
  return (
    <div className="secondary-empty-state">
      <p>Select a highlighted term to view its details</p>
    </div>
  );
});

const PlaceholderContent = memo(function PlaceholderContent({ type, id }: { type: string; id: string }) {
  return (
    <div className="secondary-placeholder">
      <div className="secondary-placeholder-type">{type}</div>
      <div className="secondary-placeholder-id">{id}</div>
      <p className="secondary-placeholder-message">
        Content for this {type} will be added in the next phase.
      </p>
    </div>
  );
});

export const SecondaryDetailPane = memo(function SecondaryDetailPane() {
  const { isOpen, type, id, data, historyLength, lockedPanel, closeSecondary, goBack, returnToLockedPanel } = useSecondaryDetail();

  // Determine if we should show the "Return to Combat Minions" button
  const showReturnButton = lockedPanel && (type !== lockedPanel.type || id !== lockedPanel.id);

  // Memoize content rendering to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (!type || !id) return null;

    switch (type) {
      case 'condition':
        return <ConditionRulesDetail conditionId={id} />;
      case 'skill':
        return <SkillRulesDetail skillId={id} />;
      case 'ability':
        if (data?.ability) {
          return <AbilityRulesDetail ability={data.ability} />;
        }
        return <PlaceholderContent type={type} id={id} />;
      case 'perk':
        return <PerkRulesDetail perkId={id} />;
      case 'keyword':
        return <KeywordRulesDetail keyword={id} />;
      case 'ancestry-trait':
        return <AncestryTraitRulesDetail traitId={id} ancestryId={data?.ancestryId} />;
      case 'kit-ability':
        return <KitAbilityRulesDetail abilityId={id} kit={data?.kit} />;
      case 'combat-minions':
        return <CombatMinionManager />;
      default:
        return <EmptyState />;
    }
  }, [type, id, data]);

  // Memoize callbacks
  const handleClose = useCallback(() => closeSecondary(), [closeSecondary]);
  const handleBack = useCallback(() => goBack(), [goBack]);
  const handleReturnToLocked = useCallback(() => returnToLockedPanel(), [returnToLockedPanel]);

  if (!isOpen || !type || !id) {
    return null;
  }

  return (
    <div className="secondary-detail-pane">
      <header className="secondary-detail-header">
        <div className="secondary-header-left">
          {showReturnButton && (
            <button
              type="button"
              className="secondary-return-btn"
              onClick={handleReturnToLocked}
              title="Return to Combat Minions"
            >
              <Users size={14} />
              <span>Combat Minions</span>
            </button>
          )}
          {historyLength > 0 && !showReturnButton && (
            <button
              type="button"
              className="secondary-back-btn"
              onClick={handleBack}
              title="Go back"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          )}
        </div>
        <button
          type="button"
          className="secondary-close-btn"
          onClick={handleClose}
          title="Close (Esc)"
        >
          <X size={16} />
        </button>
      </header>

      <div className="secondary-detail-content">
        {content}
      </div>
    </div>
  );
});

export default SecondaryDetailPane;
