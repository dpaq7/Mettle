import { getAncestryById, getAncestryTraitById, calculateSpentPoints, calculateRemainingPoints, getAncestryTraitsByIds } from '@/data/ancestries';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { Coins, Dna, Sparkles, Check, Plus } from 'lucide-react';
import type { AncestryFeature } from '@/types/common';

interface AncestryTraitRulesDetailProps {
  traitId: string;
  ancestryId?: string;
}

export function AncestryTraitRulesDetail({ traitId, ancestryId }: AncestryTraitRulesDetailProps) {
  const { hero, updateAncestrySelection, updateHero } = useHeroContext();
  const { isInCombat } = useCombatContext();

  // If we have ancestryId, get the specific trait
  const ancestry = ancestryId ? getAncestryById(ancestryId) : null;
  const trait = ancestryId ? getAncestryTraitById(ancestryId, traitId) : null;

  // Check if it's a signature trait (id matches 'signature' or similar pattern)
  const isSignatureTrait = traitId === 'signature' || traitId.includes('signature');
  const signatureTrait = isSignatureTrait && ancestry ? ancestry.signatureTrait : null;

  // Get current selection state
  const selectedTraitIds = hero?.ancestrySelection?.selectedTraitIds || [];
  const isTraitSelected = trait ? selectedTraitIds.includes(trait.id) : false;

  // Calculate points
  const spentPoints = ancestry ? calculateSpentPoints(ancestry, selectedTraitIds) : 0;
  const remainingPoints = ancestry ? calculateRemainingPoints(ancestry, selectedTraitIds) : 0;
  const canAffordTrait = trait ? trait.cost <= remainingPoints : false;
  const canEditTraits = !isInCombat && ancestry && ancestryId && hero;

  // Handle toggling a trait
  const handleToggleTrait = () => {
    if (!trait || !ancestryId || !hero || isInCombat || !ancestry) return;

    let newTraitIds: string[];

    if (isTraitSelected) {
      // Remove trait
      newTraitIds = selectedTraitIds.filter(id => id !== trait.id);
    } else if (canAffordTrait) {
      // Add trait
      newTraitIds = [...selectedTraitIds, trait.id];
    } else {
      return;
    }

    // Update ancestrySelection (stores the IDs)
    updateAncestrySelection(ancestryId, newTraitIds);

    // Also update hero.ancestry.purchasedTraits to reflect the new selection
    // This is what the character sheet displays
    const selectedTraits = getAncestryTraitsByIds(ancestryId, newTraitIds);
    const purchasedTraitsForDisplay: AncestryFeature[] = selectedTraits.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      cost: t.cost,
    }));

    updateHero({
      ancestry: {
        ...hero.ancestry,
        purchasedTraits: purchasedTraitsForDisplay,
      },
    });
  };

  if (!trait && !signatureTrait) {
    return (
      <div className="rules-detail">
        <div className="rules-detail-header">
          <h1 className="rules-detail-title">{traitId}</h1>
          <span className="rules-detail-subtitle">Ancestry Trait</span>
        </div>
        <p className="rules-detail-text">
          No detailed information available for this ancestry trait.
        </p>
        {!ancestryId && (
          <div className="rules-detail-note">
            <p>
              Ancestry trait details require the ancestry context to be passed.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Handle signature trait display
  if (signatureTrait) {
    return (
      <div className="rules-detail">
        <header className="rules-detail-header">
          <h1 className="rules-detail-title">
            <span className="keyword-icon">
              <Sparkles size={16} />
            </span>
            {signatureTrait.name}
          </h1>
          <span className="rules-detail-subtitle">
            {ancestry?.name} Signature Trait
          </span>
        </header>

        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Effect</h2>
          <div className="rules-detail-note">
            <p className="rules-detail-text">{signatureTrait.description}</p>
          </div>
        </section>

        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Trait Type</h2>
          <div className="keyword-category-badge">
            <Sparkles size={16} />
            <span>Signature Trait</span>
          </div>
          <p className="rules-detail-text" style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)' }}>
            Signature traits are inherent to your ancestry and are always active. They cannot be purchased or changed.
          </p>
        </section>

        {ancestry && (
          <section className="rules-detail-section">
            <h2 className="rules-detail-section-title">Ancestry</h2>
            <div className="keyword-category-badge">
              <Dna size={16} />
              <span>{ancestry.name}</span>
            </div>
          </section>
        )}
      </div>
    );
  }

  // Handle purchased trait display
  return (
    <div className="rules-detail">
      <header className="rules-detail-header">
        <h1 className="rules-detail-title">
          <span className="keyword-icon">
            <Dna size={16} />
          </span>
          {trait!.name}
        </h1>
        <span className="rules-detail-subtitle">
          {ancestry?.name} Purchased Trait
        </span>
      </header>

      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Effect</h2>
        <div className="rules-detail-note">
          <p className="rules-detail-text">{trait!.description}</p>
        </div>
      </section>

      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Cost</h2>
        <div className="keyword-category-badge">
          <Coins size={16} />
          <span>{trait!.cost} Ancestry Point{trait!.cost > 1 ? 's' : ''}</span>
        </div>
        <p className="rules-detail-text" style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)' }}>
          Purchased traits are selected during character creation using your ancestry's point pool.
        </p>
      </section>

      {/* Trait Toggle Section - Only show when not in combat */}
      {canEditTraits && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Selection</h2>

          {/* Current point budget */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-3)',
            padding: 'var(--space-2) var(--space-3)',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Points:</span>
            <span style={{
              fontWeight: 600,
              color: remainingPoints === 0 ? 'var(--status-success)' : 'var(--text-primary)',
            }}>
              {spentPoints}/{ancestry!.ancestryPoints}
            </span>
            {remainingPoints > 0 && (
              <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                ({remainingPoints} remaining)
              </span>
            )}
          </div>

          {/* Toggle button */}
          <button
            onClick={handleToggleTrait}
            disabled={!isTraitSelected && !canAffordTrait}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              width: '100%',
              padding: 'var(--space-3)',
              backgroundColor: isTraitSelected ? 'var(--status-success)' : 'var(--bg-secondary)',
              border: `1px solid ${isTraitSelected ? 'var(--status-success)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              color: isTraitSelected ? 'white' : 'var(--text-primary)',
              cursor: (!isTraitSelected && !canAffordTrait) ? 'not-allowed' : 'pointer',
              opacity: (!isTraitSelected && !canAffordTrait) ? 0.5 : 1,
              transition: 'all 0.15s ease',
            }}
          >
            {isTraitSelected ? (
              <>
                <Check size={18} />
                <span>Trait Selected</span>
                <span style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', opacity: 0.8 }}>
                  Click to remove
                </span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>Add This Trait</span>
                <span style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', opacity: 0.7 }}>
                  {trait!.cost} pt{trait!.cost > 1 ? 's' : ''}
                </span>
              </>
            )}
          </button>

          {/* Help text */}
          {!isTraitSelected && !canAffordTrait && (
            <p style={{
              marginTop: 'var(--space-2)',
              fontSize: 'var(--text-sm)',
              color: 'var(--status-warning)',
            }}>
              Not enough points. Remove another trait to select this one.
            </p>
          )}
        </section>
      )}

      {/* Show combat mode message */}
      {isInCombat && ancestry && (
        <section className="rules-detail-section">
          <div style={{
            padding: 'var(--space-2) var(--space-3)',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-sm)',
          }}>
            Traits cannot be changed during combat.
          </div>
        </section>
      )}

      {ancestry && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Ancestry</h2>
          <div className="keyword-category-badge">
            <Dna size={16} />
            <span>{ancestry.name}</span>
          </div>
          <p className="rules-detail-text" style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)' }}>
            {ancestry.name} characters have {ancestry.ancestryPoints} ancestry points to spend on purchased traits.
          </p>
        </section>
      )}
    </div>
  );
}

export default AncestryTraitRulesDetail;
