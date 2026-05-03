import { useState, useCallback } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { useNavigation } from '@/context/NavigationContext';
import { getAncestryById, calculateSpentPoints, calculateRemainingPoints, getAncestryTraitsByIds } from '@/data/ancestries';
import { getPerkById } from '@/data/perks/perks-data';
import type { AncestryFeature } from '@/types/common';
import type { AncestryPurchasedTrait } from '@/types/ancestry';
import { getResourceConfig } from '@/data/class-resources';
import { GameData } from '@/lib/game-rules';
import { skillGroups, type SkillGroup } from '@/data/skills';
import { CONDITIONS, ALL_CONDITIONS, performSavingThrow, getDefaultEndType } from '@/data/conditions';
import { isSummonerHero, isTacticianHero, isFuryHero, isConduitHero } from '@/types/hero';
import type { ConditionId, ConditionEndType, ActiveCondition } from '@/types/common';
import type { SummonerHeroV2, TacticianHero, FuryHero, Formation } from '@/types/hero';
import type { MinionTemplate } from '@/types/minion';
import { useSummonMinion } from '@/hooks/useSummonMinion';
import { LevelUpDetail } from './LevelUpDetail';
import { RespecDetail } from './RespecDetail';
import { RulesLink } from '@/components/shared/RulesLink';
import { MinionInfoCard } from '@/components/portfolio/MinionInfoCard';
import { FixtureInfoCard } from '@/components/portfolio/FixtureInfoCard';
import { Textarea } from '@/components/ui/shadcn/textarea';
import './CharacterDetailPane.css';

function EmptyState() {
  return (
    <div className="detail-empty">
      <p>Select an item from the list to view details</p>
    </div>
  );
}

function AncestryDetail() {
  const { hero, updateAncestrySelection, updateHero } = useHeroContext();
  const { isInCombat } = useCombatContext();

  if (!hero?.ancestry) return <EmptyState />;

  // Get ancestry definition for full trait list
  const ancestryId = hero.ancestrySelection?.ancestryId;
  const ancestryDef = ancestryId ? getAncestryById(ancestryId) : null;

  // Use hero.ancestry (stored object) as the primary data source for display
  const ancestry = hero.ancestry;

  // Get current selection state
  const selectedTraitIds = hero.ancestrySelection?.selectedTraitIds || [];

  // Calculate points using the ancestry definition (has all traits)
  const spentPoints = ancestryDef ? calculateSpentPoints(ancestryDef, selectedTraitIds) : 0;
  const remainingPoints = ancestryDef ? calculateRemainingPoints(ancestryDef, selectedTraitIds) : 0;

  // Can edit traits when not in combat and we have ancestry data
  const canEditTraits = !isInCombat && ancestryDef && ancestryId;

  // Handle toggling a trait
  const handleToggleTrait = (trait: AncestryPurchasedTrait) => {
    if (!ancestryId || !ancestryDef || isInCombat) return;

    const isSelected = selectedTraitIds.includes(trait.id);
    let newTraitIds: string[];

    if (isSelected) {
      // Remove trait
      newTraitIds = selectedTraitIds.filter(id => id !== trait.id);
    } else if (trait.cost <= remainingPoints) {
      // Add trait if we can afford it
      newTraitIds = [...selectedTraitIds, trait.id];
    } else {
      return; // Can't afford
    }

    // Update ancestrySelection (stores the IDs)
    updateAncestrySelection(ancestryId, newTraitIds);

    // Also update hero.ancestry.purchasedTraits for display
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

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{ancestry.name}</h1>
        <span className="detail-subtitle">Ancestry</span>
      </header>

      <section className="detail-section">
        <h2 className="detail-section-title">Traits</h2>
        <div className="detail-stats-grid">
          <div className="detail-stat">
            <span className="detail-stat-label">Size</span>
            <span className="detail-stat-value">{ancestry.size}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Speed</span>
            <span className="detail-stat-value">{ancestry.speed}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Points</span>
            <span className="detail-stat-value">
              {canEditTraits ? `${spentPoints}/${ancestry.ancestryPoints}` : ancestry.ancestryPoints}
            </span>
          </div>
        </div>
      </section>

      {ancestry.signatureFeature && (
        <section className="detail-section">
          <h2 className="detail-section-title">Signature Feature</h2>
          <div className="detail-feature detail-feature--signature">
            <h3 className="detail-feature-name">
              <RulesLink
                type="ancestry-trait"
                id="signature"
                data={{ ancestryId: hero.ancestrySelection?.ancestryId }}
              >
                {ancestry.signatureFeature.name}
              </RulesLink>
            </h3>
            <p className="detail-feature-description">{ancestry.signatureFeature.description}</p>
          </div>
        </section>
      )}

      {/* Show all available traits when editing is enabled */}
      {canEditTraits && ancestryDef.purchasedTraits.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">
            Purchased Traits
            {remainingPoints > 0 && (
              <span style={{ fontWeight: 400, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginLeft: 'var(--space-2)' }}>
                ({remainingPoints} pt{remainingPoints !== 1 ? 's' : ''} remaining)
              </span>
            )}
          </h2>
          {ancestryDef.purchasedTraits.map((trait) => {
            const isSelected = selectedTraitIds.includes(trait.id);
            const canAfford = trait.cost <= remainingPoints;

            return (
              <div
                key={trait.id}
                className={`detail-feature detail-feature--trait-${trait.cost}pt ${isSelected ? 'detail-feature--selected' : ''}`}
                style={{
                  opacity: !isSelected && !canAfford ? 0.5 : 1,
                  cursor: isSelected || canAfford ? 'pointer' : 'not-allowed',
                  border: isSelected ? '1px solid var(--status-success)' : undefined,
                  backgroundColor: isSelected ? 'rgba(var(--status-success-rgb), 0.1)' : undefined,
                }}
                onClick={() => handleToggleTrait(trait)}
              >
                <h3 className="detail-feature-name" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isSelected ? '2px solid var(--status-success)' : '2px solid var(--border)',
                    backgroundColor: isSelected ? 'var(--status-success)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white',
                    fontSize: '12px',
                  }}>
                    {isSelected && '✓'}
                  </span>
                  <RulesLink
                    type="ancestry-trait"
                    id={trait.id}
                    data={{ ancestryId }}
                  >
                    {trait.name}
                  </RulesLink>
                  <span className={`detail-feature-cost detail-feature-cost--${trait.cost}pt`}>
                    {trait.cost} pt{trait.cost > 1 ? 's' : ''}
                  </span>
                </h3>
                <p className="detail-feature-description" style={{ marginLeft: '26px' }}>{trait.description}</p>
              </div>
            );
          })}
          {isInCombat && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
              Traits cannot be changed during combat.
            </p>
          )}
        </section>
      )}

      {/* Fallback: Show only selected traits when editing is not available */}
      {!canEditTraits && ancestry.purchasedTraits && ancestry.purchasedTraits.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Purchased Traits</h2>
          {ancestry.purchasedTraits.map((trait, index) => (
            <div key={trait.id || index} className={`detail-feature detail-feature--trait-${trait.cost || 1}pt`}>
              <h3 className="detail-feature-name">
                <RulesLink
                  type="ancestry-trait"
                  id={trait.id || `trait-${index}`}
                  data={{ ancestryId: hero.ancestrySelection?.ancestryId }}
                >
                  {trait.name}
                </RulesLink>
                {trait.cost && (
                  <span className={`detail-feature-cost detail-feature-cost--${trait.cost}pt`}>
                    {trait.cost} pt{trait.cost > 1 ? 's' : ''}
                  </span>
                )}
              </h3>
              <p className="detail-feature-description">{trait.description}</p>
            </div>
          ))}
        </section>
      )}

      {ancestry.description && (
        <section className="detail-section">
          <h2 className="detail-section-title">Lore</h2>
          <p className="detail-text">{ancestry.description}</p>
        </section>
      )}
    </div>
  );
}

function CultureDetail() {
  const { hero } = useHeroContext();
  if (!hero?.culture) return <EmptyState />;

  const culture = hero.culture;

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{culture.name}</h1>
        <span className="detail-subtitle">Culture</span>
      </header>

      {culture.description && (
        <section className="detail-section">
          <p className="detail-text">{culture.description}</p>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">Environment</h2>
        <div className="detail-feature">
          <h3 className="detail-feature-name">{culture.environment.name}</h3>
          {culture.environment.skills && culture.environment.skills.length > 0 && (
            <p className="detail-feature-description">
              Skills: {culture.environment.skills.join(', ')}
            </p>
          )}
        </div>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">Organization</h2>
        <div className="detail-feature">
          <h3 className="detail-feature-name">{culture.organization.name}</h3>
          {culture.organization.skills && culture.organization.skills.length > 0 && (
            <p className="detail-feature-description">
              Skills: {culture.organization.skills.join(', ')}
            </p>
          )}
        </div>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">Upbringing</h2>
        <div className="detail-feature">
          <h3 className="detail-feature-name">{culture.upbringing.name}</h3>
          {culture.upbringing.skills && culture.upbringing.skills.length > 0 && (
            <p className="detail-feature-description">
              Skills: {culture.upbringing.skills.join(', ')}
            </p>
          )}
        </div>
      </section>

      {culture.language && (
        <section className="detail-section">
          <h2 className="detail-section-title">Language</h2>
          <p className="detail-text">{culture.language}</p>
        </section>
      )}
    </div>
  );
}

function CareerDetail() {
  const { hero } = useHeroContext();
  if (!hero?.career) return <EmptyState />;

  const career = hero.career;

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{career.name}</h1>
        <span className="detail-subtitle">Career</span>
      </header>

      {career.description && (
        <section className="detail-section">
          <p className="detail-text">{career.description}</p>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">Benefits</h2>
        <div className="detail-stats-grid">
          <div className="detail-stat">
            <span className="detail-stat-label">Renown</span>
            <span className="detail-stat-value">+{career.renown}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Wealth</span>
            <span className="detail-stat-value">+{career.wealth}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Project Pts</span>
            <span className="detail-stat-value">+{career.projectPoints}</span>
          </div>
        </div>
      </section>

      {career.skills && career.skills.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Skills</h2>
          <ul className="detail-list">
            {career.skills.map((skill, index) => (
              <li key={index}>
                <RulesLink type="skill" id={skill.toLowerCase().replace(/\s+/g, '-')}>
                  {skill}
                </RulesLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      {career.languages && career.languages.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Languages</h2>
          <p className="detail-text text-[var(--text-muted)]" style={{ marginBottom: 'var(--space-2)' }}>
            {career.languages.join(', ')} from career
          </p>
          {hero.languages && hero.languages.length > 0 && (
            <ul className="detail-list">
              {hero.languages.map((langName, index) => {
                const langDef = GameData.getLanguageByName(langName);
                return (
                  <li key={index}>
                    <span className="font-medium">{langName}</span>
                    {langDef?.relatedTo && (
                      <span className="text-[var(--text-muted)]"> — {langDef.relatedTo}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {career.perkType && (
        <section className="detail-section">
          <h2 className="detail-section-title">Perk Category</h2>
          <p className="detail-text" style={{ textTransform: 'capitalize' }}>{career.perkType}</p>
        </section>
      )}
    </div>
  );
}

function ClassDetailView() {
  const { hero } = useHeroContext();
  if (!hero?.heroClass) return <EmptyState />;

  const classDef = GameData.getClass(hero.heroClass);
  if (!classDef) return <EmptyState />;

  const roleColor = GameData.getClassRoleColor(classDef.role);
  const subclassTypeName = GameData.getSubclassTypeName(hero.heroClass);

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{classDef.name}</h1>
        <span className="detail-subtitle" style={{ color: roleColor }}>
          {classDef.role}
        </span>
      </header>

      {classDef.description && (
        <section className="detail-section">
          <p className="detail-text">{classDef.description}</p>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">Combat Role</h2>
        <div className="detail-info-box">
          <p>
            <strong>Role:</strong> {classDef.role}
            {classDef.masterClass && <span style={{ marginLeft: 'var(--space-2)', color: 'var(--accent)' }}>(Master Class)</span>}
          </p>
          <p>
            <strong>Potency Characteristic:</strong>{' '}
            <span style={{ textTransform: 'capitalize' }}>{classDef.potencyCharacteristic}</span>
          </p>
        </div>
      </section>

      {classDef.heroicResourceDef && (
        <section className="detail-section">
          <h2 className="detail-section-title">Heroic Resource</h2>
          <div className="detail-feature">
            <h3 className="detail-feature-name">{classDef.heroicResourceDef.name}</h3>
            <div className="detail-info-box" style={{ marginTop: 'var(--space-2)' }}>
              <p><strong>Start of Encounter:</strong> Equal to current victories</p>
              <p><strong>Gain Per Turn:</strong> {classDef.heroicResourceDef.gainPerTurn}</p>
              <p><strong>Trigger:</strong> {classDef.heroicResourceDef.gainTrigger}</p>
            </div>
          </div>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">Base Statistics</h2>
        <div className="detail-stats-grid">
          <div className="detail-stat">
            <span className="detail-stat-label">Stamina L1</span>
            <span className="detail-stat-value">{classDef.baseStats.stamina.level1}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Per Level</span>
            <span className="detail-stat-value">+{classDef.baseStats.stamina.perLevel}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Recoveries</span>
            <span className="detail-stat-value">{classDef.baseStats.recoveries}</span>
          </div>
        </div>
      </section>

      {classDef.startingCharacteristics && Object.keys(classDef.startingCharacteristics).length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Starting Characteristics</h2>
          <div className="detail-info-box">
            <p>
              {Object.entries(classDef.startingCharacteristics)
                .filter(([, value]) => value !== undefined && value !== 0)
                .map(([char, value]) => (
                  <span key={char} style={{ marginRight: 'var(--space-3)', textTransform: 'capitalize' }}>
                    <strong>{char}:</strong> +{value}
                  </span>
                ))}
            </p>
          </div>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">{subclassTypeName} Options</h2>
        {classDef.subclasses.map((subclass) => (
          <div key={subclass.id} className="detail-feature">
            <h3 className="detail-feature-name" style={{ textTransform: 'capitalize' }}>
              {subclass.name}
            </h3>
            {subclass.description && (
              <p className="detail-feature-description">{subclass.description}</p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

function SubclassDetailView() {
  const { hero } = useHeroContext();
  if (!hero?.heroClass) return <EmptyState />;

  const classDef = GameData.getClass(hero.heroClass);
  if (!classDef) return <EmptyState />;

  const subclassTypeName = GameData.getSubclassTypeName(hero.heroClass);
  const roleColor = GameData.getClassRoleColor(classDef.role);

  // Handle Conduit's multiple domains
  if (isConduitHero(hero)) {
    const domains = hero.domains || (hero.subclass ? [hero.subclass] : []);

    if (domains.length === 0) {
      // No domains selected - show available options
      return (
        <div className="detail-content">
          <header className="detail-header">
            <h1 className="detail-title">Select Your Domains</h1>
            <span className="detail-subtitle">{classDef.name} {subclassTypeName}</span>
          </header>

          <section className="detail-section">
            <p className="detail-text" style={{ marginBottom: 'var(--space-4)' }}>
              As a Conduit, you choose <strong>two domains</strong> that represent your divine connection.
            </p>
            {classDef.subclasses.map((subclass) => (
              <div key={subclass.id} className="detail-feature">
                <h3 className="detail-feature-name" style={{ textTransform: 'capitalize' }}>
                  {subclass.name}
                </h3>
                {subclass.description && (
                  <p className="detail-feature-description">{subclass.description}</p>
                )}
              </div>
            ))}
          </section>
        </div>
      );
    }

    // Show selected domains
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Domains</h1>
          <span className="detail-subtitle">{classDef.name} Domains</span>
        </header>

        {domains.map((domainId) => {
          const domainDef = GameData.getSubclass(hero.heroClass, domainId);
          const domainAbilities = GameData.getAbilitiesBySubclass(domainId);

          // Group abilities by level
          const abilitiesByLevel = domainAbilities.reduce((acc, ability) => {
            const level = ability.metadata?.level || 1;
            if (!acc[level]) acc[level] = [];
            acc[level].push(ability);
            return acc;
          }, {} as Record<number, typeof domainAbilities>);

          return (
            <section key={domainId} className="detail-section">
              <h2 className="detail-section-title" style={{ textTransform: 'capitalize' }}>
                {domainDef?.name || domainId.replace(/-/g, ' ')} Domain
              </h2>
              {domainDef?.description && (
                <p className="detail-text" style={{ marginBottom: 'var(--space-3)' }}>
                  {domainDef.description}
                </p>
              )}

              {Object.keys(abilitiesByLevel).length > 0 ? (
                Object.entries(abilitiesByLevel)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([level, abilities]) => (
                    <div key={level} className="ability-level-group">
                      <h3 className="ability-level-header">Level {level}</h3>
                      {abilities.map((ability) => (
                        <div key={ability.metadata?.item_id} className="detail-feature">
                          <h3 className="detail-feature-name">{ability.name}</h3>
                          {ability.metadata?.ability_type && (
                            <span className="detail-ability-tag" style={{ marginBottom: 'var(--space-2)', display: 'inline-block' }}>
                              {ability.metadata.ability_type}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))
              ) : (
                <p className="detail-text text-[var(--text-muted)]">
                  Domain abilities are shown in the Actions section.
                </p>
              )}
            </section>
          );
        })}
      </div>
    );
  }

  // Standard single-subclass handling
  if (!hero.subclass) {
    // No subclass selected - show available options
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Select Your {subclassTypeName}</h1>
          <span className="detail-subtitle">{classDef.name} {subclassTypeName}</span>
        </header>

        <section className="detail-section">
          <p className="detail-text" style={{ marginBottom: 'var(--space-4)' }}>
            Choose a {subclassTypeName.toLowerCase()} to define your character's specialization within the {classDef.name} class.
          </p>
          {classDef.subclasses.map((subclass) => (
            <div key={subclass.id} className="detail-feature">
              <h3 className="detail-feature-name" style={{ textTransform: 'capitalize' }}>
                {subclass.name}
              </h3>
              {subclass.description && (
                <p className="detail-feature-description">{subclass.description}</p>
              )}
            </div>
          ))}
        </section>
      </div>
    );
  }

  // Subclass is selected - show details
  const subclassDef = GameData.getSubclass(hero.heroClass, hero.subclass);
  const subclassAbilities = GameData.getAbilitiesBySubclass(hero.subclass);

  // Group abilities by level
  const abilitiesByLevel = subclassAbilities.reduce((acc, ability) => {
    const level = ability.metadata?.level || 1;
    if (!acc[level]) acc[level] = [];
    acc[level].push(ability);
    return acc;
  }, {} as Record<number, typeof subclassAbilities>);

  const subclassDisplayName = subclassDef?.name || String(hero.subclass).replace(/-/g, ' ');

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title" style={{ textTransform: 'capitalize' }}>
          {subclassDisplayName}
        </h1>
        <span className="detail-subtitle" style={{ color: roleColor }}>
          {classDef.name} {subclassTypeName}
        </span>
      </header>

      {subclassDef?.description && (
        <section className="detail-section">
          <p className="detail-text">{subclassDef.description}</p>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">Class</h2>
        <div className="detail-info-box">
          <p>
            <strong>{classDef.name}</strong> – {classDef.role}
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">{subclassTypeName} Abilities</h2>
        {Object.keys(abilitiesByLevel).length > 0 ? (
          Object.entries(abilitiesByLevel)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([level, abilities]) => (
              <div key={level} className="ability-level-group">
                <h3 className="ability-level-header">Level {level}</h3>
                {abilities.map((ability) => (
                  <div key={ability.metadata?.item_id} className="detail-feature">
                    <h3 className="detail-feature-name">{ability.name}</h3>
                    {ability.metadata?.ability_type && (
                      <span className="detail-ability-tag" style={{ marginBottom: 'var(--space-2)', display: 'inline-block' }}>
                        {ability.metadata.ability_type}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))
        ) : (
          <p className="detail-text text-[var(--text-muted)]">
            {subclassTypeName} abilities are shown in the Actions section.
          </p>
        )}
      </section>
    </div>
  );
}

function KitDetail() {
  const { hero } = useHeroContext();
  if (!hero?.kit) return <EmptyState />;

  const kit = hero.kit;

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{kit.name}</h1>
        <span className="detail-subtitle">Kit</span>
      </header>

      <section className="detail-section">
        <h2 className="detail-section-title">Equipment</h2>
        <ul className="detail-list">
          <li>Armor: {kit.armor || 'None'}</li>
          {kit.weapons && kit.weapons.length > 0 && (
            <li>Weapons: {kit.weapons.join(', ')}</li>
          )}
        </ul>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">Bonuses</h2>
        <div className="detail-stats-grid">
          <div className="detail-stat">
            <span className="detail-stat-label">Stamina/Ech</span>
            <span className="detail-stat-value">+{kit.staminaPerEchelon || 0}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Speed</span>
            <span className="detail-stat-value">+{kit.speedBonus || 0}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Stability</span>
            <span className="detail-stat-value">+{kit.stabilityBonus || 0}</span>
          </div>
        </div>
      </section>

      {(kit.meleeDamageBonus || kit.rangedDamageBonus) && (
        <section className="detail-section">
          <h2 className="detail-section-title">Damage Bonuses</h2>
          <div className="detail-stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {kit.meleeDamageBonus && (
              <div className="detail-stat">
                <span className="detail-stat-label">Melee</span>
                <span className="detail-stat-value">{kit.meleeDamageBonus}</span>
              </div>
            )}
            {kit.rangedDamageBonus && (
              <div className="detail-stat">
                <span className="detail-stat-label">Ranged</span>
                <span className="detail-stat-value">{kit.rangedDamageBonus}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {kit.signatureAbility && (
        <section className="detail-section">
          <h2 className="detail-section-title">Signature Ability</h2>
          <div className="detail-feature">
            <h3 className="detail-feature-name">
              <RulesLink type="kit-ability" id={kit.id} data={{ kit }}>
                {kit.signatureAbility.name}
              </RulesLink>
            </h3>
            <div className="detail-ability-meta">
              <span className="detail-ability-tag">{kit.signatureAbility.type}</span>
              <span className="detail-ability-tag">{kit.signatureAbility.distance}</span>
              <span className="detail-ability-tag">{kit.signatureAbility.target}</span>
            </div>
            {kit.signatureAbility.keywords && kit.signatureAbility.keywords.length > 0 && (
              <div className="detail-keywords">
                {kit.signatureAbility.keywords.map((keyword, i) => (
                  <RulesLink key={i} type="keyword" id={keyword.toLowerCase()}>
                    <span className="detail-keyword">{keyword}</span>
                  </RulesLink>
                ))}
              </div>
            )}
            <div className="detail-power-roll">
              <span className="detail-power-roll-char">{kit.signatureAbility.powerRoll}</span>
            </div>
            <div className="detail-tiers">
              <div className="detail-tier">
                <span className="detail-tier-label">11 or lower</span>
                <span className="detail-tier-effect">{kit.signatureAbility.tier1}</span>
              </div>
              <div className="detail-tier">
                <span className="detail-tier-label">12-16</span>
                <span className="detail-tier-effect">{kit.signatureAbility.tier2}</span>
              </div>
              <div className="detail-tier">
                <span className="detail-tier-label">17+</span>
                <span className="detail-tier-effect">{kit.signatureAbility.tier3}</span>
              </div>
            </div>
            {kit.signatureAbility.effect && (
              <p className="detail-feature-description" style={{ marginTop: 'var(--space-2)' }}>
                <strong>Effect:</strong> {kit.signatureAbility.effect}
              </p>
            )}
          </div>
        </section>
      )}

      {kit.description && (
        <section className="detail-section">
          <h2 className="detail-section-title">Description</h2>
          <p className="detail-text">{kit.description}</p>
        </section>
      )}
    </div>
  );
}

function IncitingIncidentDetail() {
  const { hero, updateHero } = useHeroContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  // Get career incidents
  const careerId = hero?.career?.id;
  const careerIncidents = careerId ? GameData.getIncitingIncidentsForCareer(careerId) : [];

  // Get current selection
  const selectedIncidentId = hero?.selectedIncitingIncidentId;
  const selectedIncident = selectedIncidentId && careerId
    ? GameData.getIncitingIncident(careerId, selectedIncidentId)
    : null;

  // Use custom incident if set, otherwise use selected incident
  const displayIncident = hero?.customIncitingIncident ?? selectedIncident?.description ?? hero?.career?.incitingIncident ?? '';
  const hasCustomIncident = !!hero?.customIncitingIncident;

  const handleSelectIncident = (incidentId: string) => {
    if (!hero) return;
    const incident = careerId ? GameData.getIncitingIncident(careerId, incidentId) : null;
    updateHero({
      selectedIncitingIncidentId: incidentId,
      customIncitingIncident: incident?.description,
    });
  };

  const handleStartEdit = () => {
    setEditValue(displayIncident);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!hero) return;
    updateHero({ customIncitingIncident: editValue.trim() || undefined });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue('');
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Inciting Incident</h1>
        <span className="detail-subtitle">
          {selectedIncident ? selectedIncident.title : hasCustomIncident ? 'Custom' : 'Not set'}
        </span>
      </header>

      <section className="detail-section">
        <p className="detail-text text-[var(--text-muted)] mb-3">
          The event that set you on the path to becoming a hero. Select from your career's options or customize.
        </p>

        {/* Current Selection */}
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Describe the pivotal moment that changed your life..."
              className="min-h-[120px]"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn btn-primary text-sm">Save</button>
              <button onClick={handleCancel} className="btn btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {displayIncident ? (
              <div className="detail-feature">
                {selectedIncident && (
                  <h3 className="detail-feature-name">{selectedIncident.title}</h3>
                )}
                <p className="detail-text">{displayIncident}</p>
              </div>
            ) : (
              <p className="detail-text text-[var(--text-dim)] italic">
                No inciting incident selected yet.
              </p>
            )}
            <button onClick={handleStartEdit} className="btn btn-secondary text-sm">
              {displayIncident ? 'Edit Text' : 'Add Custom'}
            </button>
          </div>
        )}
      </section>

      {/* Career Incident Options */}
      {careerIncidents.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">{hero?.career?.name} Incidents</h2>
          <p className="detail-text text-[var(--text-muted)] mb-3" style={{ fontSize: 'var(--text-sm)' }}>
            Select one of the pre-defined incidents for your career:
          </p>
          <div className="space-y-2">
            {careerIncidents.map((incident) => (
              <div
                key={incident.id}
                className={`detail-card cursor-pointer ${selectedIncidentId === incident.id ? 'ring-2 ring-[var(--accent)]' : ''}`}
                onClick={() => handleSelectIncident(incident.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="detail-card-header flex justify-between items-center">
                  <span className="font-medium">{incident.title}</span>
                  {selectedIncidentId === incident.id && (
                    <span className="text-[var(--accent)] text-sm">Selected</span>
                  )}
                </div>
                <p className="detail-text text-[var(--text-muted)]" style={{ fontSize: 'var(--text-sm)' }}>
                  {incident.description.slice(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TitlesDetail() {
  const { hero } = useHeroContext();

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Titles & Renown</h1>
        <span className="detail-subtitle">{hero?.renown || 0} Renown</span>
      </header>

      {hero?.title && (
        <section className="detail-section">
          <h2 className="detail-section-title">Title</h2>
          <div className="detail-feature">
            <h3 className="detail-feature-name">{hero.title}</h3>
          </div>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">Renown</h2>
        <p className="detail-text">
          Renown represents your hero's fame and reputation. Higher renown opens doors
          and grants influence in social situations.
        </p>
        <div className="detail-stats-grid" style={{ gridTemplateColumns: '1fr', marginTop: 'var(--space-3)' }}>
          <div className="detail-stat">
            <span className="detail-stat-label">Current Renown</span>
            <span className="detail-stat-value">{hero?.renown || 0}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function LanguagesDetail() {
  const { hero } = useHeroContext();
  const languages = hero?.languages || [];

  // Get the default language (Caelian)
  const defaultLang = GameData.getDefaultLanguage();

  // Separate languages into extant and dead
  const extantLanguages: Array<{ name: string; relatedTo?: string }> = [];
  const deadLanguages: Array<{ name: string; relatedTo?: string; researchFocus?: string }> = [];

  languages.forEach((langName) => {
    const langDef = GameData.getLanguageByName(langName);

    // Skip the default language - it's shown separately in "Common Language" section
    if (langDef?.isDefault) return;

    if (langDef?.isDead) {
      deadLanguages.push({
        name: langDef.name,  // Use canonical name from definition
        relatedTo: langDef.relatedTo,
        researchFocus: (langDef as { researchFocus?: string }).researchFocus,
      });
    } else {
      extantLanguages.push({
        name: langDef?.name || langName,  // Use canonical name when available
        relatedTo: langDef?.relatedTo,
      });
    }
  });

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Languages</h1>
        <span className="detail-subtitle">{languages.length} known</span>
      </header>

      {/* Default language - all heroes know this */}
      <section className="detail-section">
        <h2 className="detail-section-title">Common Language</h2>
        <div className="detail-card">
          <div className="detail-card-header">
            <span className="font-medium">{defaultLang?.name || 'Caelian'}</span>
          </div>
          <p className="detail-text text-[var(--text-muted)]">
            {defaultLang?.relatedTo || 'The common language of Orden. All heroes know this language.'}
          </p>
        </div>
      </section>

      {/* Extant languages */}
      {extantLanguages.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Additional Languages</h2>
          <div className="space-y-2">
            {extantLanguages.map((lang, index) => (
              <div key={index} className="detail-card">
                <div className="detail-card-header">
                  <span className="font-medium">{lang.name}</span>
                </div>
                {lang.relatedTo && (
                  <p className="detail-text text-[var(--text-muted)]">{lang.relatedTo}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dead languages */}
      {deadLanguages.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Dead Languages</h2>
          <p className="detail-text text-[var(--text-muted)]" style={{ marginBottom: 'var(--space-2)' }}>
            Dead languages are used for research rather than conversation.
          </p>
          <div className="space-y-2">
            {deadLanguages.map((lang, index) => (
              <div key={index} className="detail-card">
                <div className="detail-card-header">
                  <span className="font-medium">{lang.name}</span>
                </div>
                {lang.relatedTo && (
                  <p className="detail-text text-[var(--text-muted)]">Related to: {lang.relatedTo}</p>
                )}
                {lang.researchFocus && (
                  <p className="detail-text">
                    <span className="text-[var(--accent)]">Research:</span> {lang.researchFocus}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {languages.length === 0 && (
        <section className="detail-section">
          <p className="detail-text text-[var(--text-muted)]">
            No additional languages selected beyond Caelian.
          </p>
        </section>
      )}
    </div>
  );
}

function SkillsDetail() {
  const { hero } = useHeroContext();
  const heroSkills = hero?.skills || [];

  // Get skill definitions and group them
  const skillsByGroup = heroSkills.reduce((acc, skillId) => {
    const skill = GameData.getSkillById(skillId);
    if (skill) {
      if (!acc[skill.group]) {
        acc[skill.group] = [];
      }
      acc[skill.group].push(skill);
    }
    return acc;
  }, {} as Record<SkillGroup, ReturnType<typeof GameData.getSkillById>[]>);

  // Order groups consistently
  const groupOrder: SkillGroup[] = ['crafting', 'exploration', 'interpersonal', 'intrigue', 'lore'];
  const activeGroups = groupOrder.filter(group => skillsByGroup[group]?.length > 0);

  if (heroSkills.length === 0) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Skills</h1>
          <span className="detail-subtitle">No skills selected</span>
        </header>
        <section className="detail-section">
          <p className="detail-text text-[var(--text-muted)]">
            Skills are gained through your culture and career during character creation.
            Each skill allows you to make tests using specific abilities.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Skills</h1>
        <span className="detail-subtitle">{heroSkills.length} skills</span>
      </header>

      {activeGroups.map((group) => {
        const groupInfo = skillGroups[group];
        const groupSkills = skillsByGroup[group] || [];

        return (
          <section key={group} className="detail-section">
            <h2 className="detail-section-title">{groupInfo.name}</h2>
            <p className="detail-text" style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
              {groupInfo.description}
            </p>

            <div className="skills-list">
              {groupSkills.map((skill) => skill && (
                <div key={skill.id} className="detail-feature">
                  <h3 className="detail-feature-name">
                    <RulesLink type="skill" id={skill.id}>
                      {skill.name}
                    </RulesLink>
                  </h3>
                  <p className="detail-feature-description">{skill.use}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function PerksDetail() {
  const { hero } = useHeroContext();
  const selectedPerks = hero?.selectedPerks || [];

  if (selectedPerks.length === 0) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Perks</h1>
          <span className="detail-subtitle">No perks selected</span>
        </header>
        <section className="detail-section">
          <p className="detail-text text-[var(--text-muted)]">
            Perks are special abilities gained through your career and at specific levels.
            Select perks during character creation or level-up.
          </p>
        </section>
      </div>
    );
  }

  // Group perks by source
  const perksBySource = selectedPerks.reduce((acc, sp) => {
    const source = sp.source || 'other';
    if (!acc[source]) acc[source] = [];
    acc[source].push(sp);
    return acc;
  }, {} as Record<string, typeof selectedPerks>);

  const sourceLabels: Record<string, string> = {
    career: 'Career Perk',
    class: 'Class Perks',
    ancestry: 'Ancestry Perks',
    other: 'Other Perks',
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Perks</h1>
        <span className="detail-subtitle">{selectedPerks.length} selected</span>
      </header>

      {Object.entries(perksBySource).map(([source, perks]) => (
        <section key={source} className="detail-section">
          <h2 className="detail-section-title">{sourceLabels[source] || source}</h2>
          {perks.map((sp) => {
            const perkData = getPerkById(sp.perkId);
            return (
              <div key={sp.perkId} className="detail-feature">
                <h3 className="detail-feature-name">
                  <RulesLink type="perk" id={sp.perkId}>
                    {perkData?.name || sp.perkId}
                  </RulesLink>
                  <span className="detail-feature-cost">
                    (Level {sp.selectedAtLevel})
                  </span>
                </h3>
                {perkData?.category && (
                  <span className="detail-perk-category">{perkData.category}</span>
                )}
                {perkData?.description && (
                  <p className="detail-feature-description">{perkData.description}</p>
                )}
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}

function ComplicationsDetail() {
  const { hero, updateHero } = useHeroContext();
  const [showSelector, setShowSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedComplication = hero?.selectedComplication ?? null;
  const allComplications = GameData.getAllComplications();

  // Filter complications by search
  const filteredComplications = searchQuery
    ? GameData.searchComplications(searchQuery)
    : allComplications;

  const handleSelectComplication = (complication: typeof selectedComplication) => {
    if (!hero) return;
    updateHero({ selectedComplication: complication });
    setShowSelector(false);
    setSearchQuery('');
  };

  const handleRemoveComplication = () => {
    if (!hero) return;
    updateHero({ selectedComplication: null });
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Complication</h1>
        <span className="detail-subtitle">
          {selectedComplication ? selectedComplication.name : 'None (optional)'}
        </span>
      </header>

      <section className="detail-section">
        <p className="detail-text text-[var(--text-muted)] mb-3">
          Complications add narrative depth with both a benefit and a drawback. This is optional.
        </p>

        {/* Selected Complication */}
        {selectedComplication ? (
          <div className="space-y-3">
            <div className="detail-feature">
              <h3 className="detail-feature-name">{selectedComplication.name}</h3>
              <p className="detail-text mb-3">{selectedComplication.description}</p>

              <div className="detail-info-box" style={{ marginBottom: 'var(--space-2)' }}>
                <p style={{ color: 'var(--status-success)' }}>
                  <strong>Benefit:</strong> {selectedComplication.benefit}
                </p>
              </div>

              {selectedComplication.drawback && (
                <div className="detail-info-box" style={{ backgroundColor: 'rgba(var(--status-error-rgb), 0.1)' }}>
                  <p style={{ color: 'var(--status-error)' }}>
                    <strong>Drawback:</strong> {selectedComplication.drawback}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowSelector(true)}
                className="btn btn-secondary text-sm"
              >
                Change
              </button>
              <button
                onClick={handleRemoveComplication}
                className="btn btn-ghost text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="detail-text text-[var(--text-dim)] italic">
              No complication selected. Complications are optional story elements.
            </p>
            <button
              onClick={() => setShowSelector(true)}
              className="btn btn-secondary text-sm"
            >
              Select Complication
            </button>
          </div>
        )}
      </section>

      {/* Complication Selector */}
      {showSelector && (
        <section className="detail-section">
          <h2 className="detail-section-title">Available Complications</h2>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search complications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--bg-secondary)]"
              autoFocus
            />
          </div>
          <div className="space-y-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {filteredComplications.map((complication) => (
              <div
                key={complication.id}
                className={`detail-card cursor-pointer ${selectedComplication?.id === complication.id ? 'ring-2 ring-[var(--accent)]' : ''}`}
                onClick={() => handleSelectComplication(complication)}
                style={{ cursor: 'pointer' }}
              >
                <div className="detail-card-header">
                  <span className="font-medium">{complication.name}</span>
                </div>
                <p className="detail-text text-[var(--text-muted)]" style={{ fontSize: 'var(--text-sm)' }}>
                  {complication.description.slice(0, 100)}...
                </p>
                <div className="mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--status-success)' }}>✓ {complication.benefit.slice(0, 60)}...</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button
              onClick={() => { setShowSelector(false); setSearchQuery(''); }}
              className="btn btn-ghost text-sm"
            >
              Cancel
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

interface SaveResult {
  conditionId: ConditionId;
  roll: number;
  success: boolean;
}

const END_TYPE_CONFIG: Record<ConditionEndType, { label: string; shortLabel: string; color: string }> = {
  eot: { label: 'End of Turn', shortLabel: 'EoT', color: 'var(--status-success)' },
  roll: { label: 'Save Ends (6+ on d10)', shortLabel: 'Roll', color: 'var(--status-warning)' },
  manual: { label: 'Manual Removal', shortLabel: '—', color: 'var(--text-muted)' },
};

function ConditionsDetail() {
  const { hero, updateHero } = useHeroContext();
  const [lastSaveResult, setLastSaveResult] = useState<SaveResult | null>(null);

  const conditions = hero?.activeConditions || [];

  // Get conditions not currently active
  const activeConditionIds = new Set(conditions.map((c) => c.conditionId));
  const availableToAdd = ALL_CONDITIONS.filter((c) => !activeConditionIds.has(c.id));

  const handleAddCondition = (conditionId: ConditionId) => {
    if (!hero) return;
    const newCondition: ActiveCondition = {
      conditionId,
      endType: getDefaultEndType(conditionId),
      appliedAt: Date.now(),
    };
    updateHero({
      activeConditions: [...conditions, newCondition],
    });
  };

  const handleRemoveCondition = (conditionId: ConditionId) => {
    if (!hero) return;
    updateHero({
      activeConditions: conditions.filter((c) => c.conditionId !== conditionId),
    });
    if (lastSaveResult?.conditionId === conditionId) {
      setLastSaveResult(null);
    }
  };

  const handleUpdateEndType = (conditionId: ConditionId, endType: ConditionEndType) => {
    if (!hero) return;
    updateHero({
      activeConditions: conditions.map((c) =>
        c.conditionId === conditionId ? { ...c, endType } : c
      ),
    });
  };

  const handleRollSave = (conditionId: ConditionId) => {
    const { roll, success } = performSavingThrow();
    setLastSaveResult({ conditionId, roll, success });

    if (success) {
      // Remove condition after showing result
      setTimeout(() => {
        handleRemoveCondition(conditionId);
      }, 1500);
    } else {
      // Clear result after showing
      setTimeout(() => {
        setLastSaveResult(null);
      }, 2000);
    }
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Conditions</h1>
        <span className="detail-subtitle">
          {conditions.length > 0 ? `${conditions.length} active` : 'None active'}
        </span>
      </header>

      {/* Active Conditions */}
      {conditions.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Active Conditions</h2>
          <div className="conditions-list-detail">
            {conditions.map((activeCondition) => {
              const def = CONDITIONS[activeCondition.conditionId];
              if (!def) return null;

              const saveResult = lastSaveResult?.conditionId === activeCondition.conditionId
                ? lastSaveResult
                : null;
              const endTypeConfig = END_TYPE_CONFIG[activeCondition.endType || 'manual'];

              return (
                <div
                  key={activeCondition.conditionId}
                  className={`condition-detail-row ${saveResult ? (saveResult.success ? 'save-success' : 'save-failure') : ''}`}
                >
                  <div className="condition-detail-info">
                    <span className="condition-detail-icon">{def.icon}</span>
                    <div className="condition-detail-text">
                      <RulesLink type="condition" id={def.id} className="condition-detail-name">
                        {def.name}
                      </RulesLink>
                      <span className="condition-detail-effect">{def.primaryEffect}</span>
                    </div>
                  </div>

                  {saveResult ? (
                    <div className={`condition-save-result ${saveResult.success ? 'success' : 'failure'}`}>
                      <span className="save-roll">🎲 {saveResult.roll}</span>
                      <span className="save-status">{saveResult.success ? '✓ Saved!' : '✗ Failed'}</span>
                    </div>
                  ) : (
                    <div className="condition-detail-controls">
                      {/* End Type Badge */}
                      <select
                        className="condition-end-select"
                        value={activeCondition.endType || 'manual'}
                        onChange={(e) => handleUpdateEndType(activeCondition.conditionId, e.target.value as ConditionEndType)}
                      >
                        <option value="eot">EoT</option>
                        <option value="roll">Roll</option>
                        <option value="manual">Manual</option>
                      </select>

                      {/* Roll Save Button (only for roll type) */}
                      {activeCondition.endType === 'roll' && (
                        <button
                          className="condition-roll-btn"
                          onClick={() => handleRollSave(activeCondition.conditionId)}
                          title="Roll Save (6+ on d10)"
                        >
                          🎲
                        </button>
                      )}

                      {/* Remove Button */}
                      <button
                        className="condition-remove-btn"
                        onClick={() => handleRemoveCondition(activeCondition.conditionId)}
                        title="Remove condition"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Add Condition */}
      <section className="detail-section">
        <h2 className="detail-section-title">Add Condition</h2>
        {availableToAdd.length > 0 ? (
          <div className="conditions-add-grid">
            {availableToAdd.map((condition) => (
              <div key={condition.id} className="condition-add-item">
                <button
                  className="condition-add-btn"
                  onClick={() => handleAddCondition(condition.id)}
                  title={condition.primaryEffect}
                >
                  <span className="condition-add-icon">{condition.icon}</span>
                  <span className="condition-add-name">{condition.name}</span>
                </button>
                <RulesLink type="condition" id={condition.id} className="condition-info-link">
                  ?
                </RulesLink>
              </div>
            ))}
          </div>
        ) : (
          <p className="detail-text text-[var(--text-muted)]">
            All conditions are currently active.
          </p>
        )}
      </section>

      {/* Condition Reference */}
      <section className="detail-section">
        <h2 className="detail-section-title">How Conditions Work</h2>
        <div className="detail-info-box">
          <p><strong>End of Turn (EoT):</strong> Condition ends automatically at the end of your turn.</p>
          <p><strong>Save Ends (Roll):</strong> Roll d10 at end of turn; 6+ removes the condition.</p>
          <p><strong>Manual:</strong> Condition persists until manually removed or special conditions are met.</p>
        </div>
      </section>
    </div>
  );
}

// ============================================
// CLASS-SPECIFIC DETAIL COMPONENTS
// ============================================

const FORMATION_INFO: Record<Formation, { name: string; bonus: string }> = {
  horde: { name: 'Horde', bonus: 'Maximum minions +4; summon up to four signature minions at the start of your turn' },
  platoon: { name: 'Platoon', bonus: 'One target of a squad damaging ability takes extra damage equal to your Reason' },
  elite: { name: 'Elite', bonus: 'Minions have +3 Stamina, +1 Stability' },
  leader: { name: 'Leader', bonus: 'Ignore excess squad-wipe damage; you can take damage in place of a minion' },
};

const FEROCITY_TIERS = [
  { threshold: 3, benefit: 'Push/pull/slide distance +1', minLevel: 1 },
  { threshold: 6, benefit: '+1 surge when you deal damage', minLevel: 1 },
  { threshold: 9, benefit: 'Double edge on maneuvers', minLevel: 1 },
  { threshold: 12, benefit: 'Reach +1 on melee abilities', minLevel: 4 },
  { threshold: 15, benefit: 'Speed +2', minLevel: 7 },
  { threshold: 18, benefit: '+1 additional surge on damage', minLevel: 10 },
];

function ClassMechanicsDetail() {
  const { hero } = useHeroContext();
  if (!hero) return <EmptyState />;

  const resourceConfig = getResourceConfig(hero.heroClass);
  const classDef = GameData.getClass(hero.heroClass);

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Class Mechanics</h1>
        <span className="detail-subtitle">
          {hero.heroClass.charAt(0).toUpperCase() + hero.heroClass.slice(1)}
        </span>
      </header>

      <section className="detail-section">
        <h2 className="detail-section-title">Heroic Resource</h2>
        <div className="detail-feature">
          <h3 className="detail-feature-name">{resourceConfig.name}</h3>
          <p className="detail-feature-description">
            Current: <strong>{hero.heroicResource.current}</strong>
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">Resource Gain</h2>
        <div className="detail-info-box">
          <p>
            <strong>Start of Encounter:</strong> Equal to current victories
          </p>
          {classDef?.heroicResourceDef && (
            <>
              <p>
                <strong>Per Turn:</strong> {classDef.heroicResourceDef.gainPerTurn} {resourceConfig.name}
              </p>
              <p>
                <strong>Trigger:</strong> {classDef.heroicResourceDef.gainTrigger}
              </p>
            </>
          )}
        </div>
      </section>

      {hero.subclass && (
        <section className="detail-section">
          <h2 className="detail-section-title">Subclass</h2>
          <div className="detail-feature">
            <h3 className="detail-feature-name" style={{ textTransform: 'capitalize' }}>
              {String(hero.subclass).replace(/-/g, ' ')}
            </h3>
          </div>
        </section>
      )}
    </div>
  );
}

function FormationDetail() {
  const { hero, updateHero } = useHeroContext();

  if (!hero || !isSummonerHero(hero)) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Formation</h1>
          <span className="detail-subtitle">Summoner only</span>
        </header>
        <p className="detail-text text-[var(--text-muted)]">
          This feature is only available for Summoner characters.
        </p>
      </div>
    );
  }

  const currentFormation = hero.formation;

  const handleFormationChange = (formation: Formation) => {
    updateHero({ formation } as Partial<SummonerHeroV2>);
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Formation</h1>
        <span className="detail-subtitle">
          {currentFormation ? FORMATION_INFO[currentFormation].name : 'Select a formation'}
        </span>
      </header>

      <section className="detail-section">
        <h2 className="detail-section-title">Select Formation</h2>
        <div className="formation-grid">
          {(Object.keys(FORMATION_INFO) as Formation[]).map((formation) => {
            const info = FORMATION_INFO[formation];
            const isActive = currentFormation === formation;
            return (
              <button
                key={formation}
                className={`formation-option ${isActive ? 'active' : ''}`}
                onClick={() => handleFormationChange(formation)}
              >
                <span className="formation-name">{info.name}</span>
                <span className="formation-bonus">{info.bonus}</span>
              </button>
            );
          })}
        </div>
      </section>

      {currentFormation && (
        <section className="detail-section">
          <h2 className="detail-section-title">Active Bonus</h2>
          <div className="detail-feature">
            <h3 className="detail-feature-name">{FORMATION_INFO[currentFormation].name} Formation</h3>
            <p className="detail-feature-description">{FORMATION_INFO[currentFormation].bonus}</p>
          </div>
        </section>
      )}
    </div>
  );
}

function MinionsDetail() {
  const { hero } = useHeroContext();

  if (!hero || !isSummonerHero(hero)) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Minions</h1>
          <span className="detail-subtitle">Summoner only</span>
        </header>
        <p className="detail-text text-[var(--text-muted)]">
          This feature is only available for Summoner characters.
        </p>
      </div>
    );
  }

  const squads = hero.activeSquads || [];
  const totalMinions = squads.reduce((sum, squad) => sum + squad.members.length, 0);

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Active Minions</h1>
        <span className="detail-subtitle">
          {totalMinions} minion{totalMinions !== 1 ? 's' : ''} in {squads.length} squad{squads.length !== 1 ? 's' : ''}
        </span>
      </header>

      {squads.length === 0 ? (
        <section className="detail-section">
          <p className="detail-text text-[var(--text-muted)]">
            No active minions. Use your Essence to summon minions in combat.
          </p>
        </section>
      ) : (
        <section className="detail-section">
          <h2 className="detail-section-title">Squads</h2>
          {squads.map((squad) => (
            <div key={squad.id} className="detail-feature">
              <h3 className="detail-feature-name">
                Squad: {squad.templateId}
                <span className="detail-feature-cost">
                  ({squad.members.filter(m => m.isAlive).length}/{squad.members.length} alive)
                </span>
              </h3>
              <p className="detail-feature-description">
                Stamina: {squad.currentStamina}/{squad.maxStamina}
              </p>
            </div>
          ))}
        </section>
      )}

      {hero.portfolio?.signatureMinions && hero.portfolio.signatureMinions.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Signature Minions</h2>
          {hero.portfolio.signatureMinions.map((minion) => (
            <div key={minion.id} className="detail-feature">
              <h3 className="detail-feature-name">{minion.name}</h3>
              <p className="detail-feature-description">
                Cost: {minion.essenceCost} Essence •
                Base Stamina: {Array.isArray(minion.stamina) ? minion.stamina.join('/') : minion.stamina}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

// Level requirements for minion tiers based on portfolio progression
const MINION_LEVEL_REQUIREMENTS: Record<number, number> = {
  1: 1,  // Signature minions - Level 1
  3: 1,  // 3-essence minions - Level 1
  5: 2,  // 5-essence minions - Level 2
  7: 5,  // 7-essence minions - Level 5
  9: 8,  // Champion - Level 8
};

function PortfolioDetail() {
  const { hero } = useHeroContext();
  const { summonMinion, validateMinionSummon } = useSummonMinion();
  const [summonFeedback, setSummonFeedback] = useState<string | null>(null);

  if (!hero || !isSummonerHero(hero)) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Portfolio</h1>
          <span className="detail-subtitle">Summoner only</span>
        </header>
        <p className="detail-text text-[var(--text-muted)]">
          This feature is only available for Summoner characters.
        </p>
      </div>
    );
  }

  const { signatureMinions, unlockedMinions, fixture, champion } = hero.portfolio;

  // Check if a minion is unlocked based on hero level
  const isMinionUnlockedByLevel = (essenceCost: number): boolean => {
    const requiredLevel = MINION_LEVEL_REQUIREMENTS[essenceCost] || 1;
    return hero.level >= requiredLevel;
  };

  const getRequiredLevel = (essenceCost: number): number => {
    return MINION_LEVEL_REQUIREMENTS[essenceCost] || 1;
  };

  const getSummonControls = (minion: MinionTemplate, isUnlocked: boolean) => {
    const validation = validateMinionSummon(minion);
    const minionsToSummon = validation.details.minionsToSummon;
    const summonTitle = isUnlocked && validation.canSummon
      ? `Spend ${validation.details.requiredEssence} essence to summon ${minionsToSummon} ${minion.name}${minionsToSummon === 1 ? '' : 's'}`
      : isUnlocked
        ? validation.message
        : `Unlocks at level ${getRequiredLevel(minion.essenceCost)}`;

    return {
      canSummon: isUnlocked && validation.canSummon,
      summonTitle,
      onSummon: () => {
        const result = summonMinion(minion);
        setSummonFeedback(
          result.success
            ? `Summoned ${result.minionsCreated ?? minionsToSummon} ${minion.name}${(result.minionsCreated ?? minionsToSummon) === 1 ? '' : 's'} for ${result.essenceSpent ?? validation.details.requiredEssence} essence.`
            : result.validation.message
        );
      },
    };
  };

  // Group unlocked minions by essence tier
  const threeEssence = unlockedMinions.filter(m => m.essenceCost === 3);
  const fiveEssence = unlockedMinions.filter(m => m.essenceCost === 5);
  const sevenEssence = unlockedMinions.filter(m => m.essenceCost === 7);

  const portfolioTypeName = hero.portfolio.type.charAt(0).toUpperCase() + hero.portfolio.type.slice(1);

  return (
    <div className="detail-content portfolio-detail">
      <header className="detail-header">
        <h1 className="detail-title">{portfolioTypeName} Portfolio</h1>
        <span className="detail-subtitle">Level {hero.level}</span>
      </header>

      {summonFeedback && (
        <div className="portfolio-summon-feedback">{summonFeedback}</div>
      )}

      {/* Signature Minions (1 Essence) */}
      {signatureMinions.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Signature Minions (1 Essence)</h2>
          {signatureMinions.map(minion => (
            <MinionInfoCard
              key={minion.id}
              minion={minion}
              isUnlocked={true}
              {...getSummonControls(minion, true)}
            />
          ))}
        </section>
      )}

      {/* 3-Essence Minions */}
      {threeEssence.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">3 Essence Minions</h2>
          {threeEssence.map(minion => (
            <MinionInfoCard
              key={minion.id}
              minion={minion}
              isUnlocked={isMinionUnlockedByLevel(3)}
              requiredLevel={getRequiredLevel(3)}
              {...getSummonControls(minion, isMinionUnlockedByLevel(3))}
            />
          ))}
        </section>
      )}

      {/* 5-Essence Minions */}
      {fiveEssence.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">5 Essence Minions (Level 2+)</h2>
          {fiveEssence.map(minion => (
            <MinionInfoCard
              key={minion.id}
              minion={minion}
              isUnlocked={isMinionUnlockedByLevel(5)}
              requiredLevel={getRequiredLevel(5)}
              {...getSummonControls(minion, isMinionUnlockedByLevel(5))}
            />
          ))}
        </section>
      )}

      {/* 7-Essence Minions */}
      {sevenEssence.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">7 Essence Minions (Level 5+)</h2>
          {sevenEssence.map(minion => (
            <MinionInfoCard
              key={minion.id}
              minion={minion}
              isUnlocked={isMinionUnlockedByLevel(7)}
              requiredLevel={getRequiredLevel(7)}
              {...getSummonControls(minion, isMinionUnlockedByLevel(7))}
            />
          ))}
        </section>
      )}

      {/* Fixture */}
      {fixture && (
        <section className="detail-section">
          <h2 className="detail-section-title">Fixture</h2>
          <FixtureInfoCard fixture={fixture} heroLevel={hero.level} />
        </section>
      )}

      {/* Champion (Level 8+) */}
      {champion && (
        <section className="detail-section">
          <h2 className="detail-section-title">Champion (9 Essence - Level 8+)</h2>
          <MinionInfoCard
            minion={champion}
            isUnlocked={hero.level >= 8}
            requiredLevel={8}
          />
        </section>
      )}
    </div>
  );
}

function MarkedTargetsDetail() {
  const { hero, updateHero } = useHeroContext();
  const [targetInput, setTargetInput] = useState('');

  if (!hero || !isTacticianHero(hero)) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Marked Targets</h1>
          <span className="detail-subtitle">Tactician only</span>
        </header>
        <p className="detail-text text-[var(--text-muted)]">
          This feature is only available for Tactician characters.
        </p>
      </div>
    );
  }

  const markedTargets = hero.markedTargets || [];

  const handleAddMark = useCallback(() => {
    if (targetInput.trim() && !markedTargets.includes(targetInput.trim())) {
      updateHero({
        markedTargets: [...markedTargets, targetInput.trim()],
      } as Partial<TacticianHero>);
      setTargetInput('');
    }
  }, [targetInput, markedTargets, updateHero]);

  const handleRemoveMark = useCallback((target: string) => {
    updateHero({
      markedTargets: markedTargets.filter((t: string) => t !== target),
    } as Partial<TacticianHero>);
  }, [markedTargets, updateHero]);

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Marked Targets</h1>
        <span className="detail-subtitle">
          {markedTargets.length > 0 ? `${markedTargets.length} marked` : 'No targets marked'}
        </span>
      </header>

      <section className="detail-section">
        <h2 className="detail-section-title">Mark Effect</h2>
        <div className="detail-info-box">
          <p>Allies have <strong>Edge</strong> on attacks against marked targets.</p>
          <p>When an ally deals damage to a marked target: <strong>+1 Focus</strong></p>
        </div>
      </section>

      {markedTargets.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Active Marks</h2>
          <div className="marked-targets-list">
            {markedTargets.map((target: string) => (
              <div key={target} className="marked-target-row">
                <span className="marked-target-name">{target}</span>
                <button
                  className="marked-target-remove"
                  onClick={() => handleRemoveMark(target)}
                  title="Remove mark"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-section-title">Add Mark</h2>
        <div className="add-mark-form">
          <input
            type="text"
            className="add-mark-input"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            placeholder="Target name..."
            onKeyPress={(e) => e.key === 'Enter' && handleAddMark()}
          />
          <button
            className="add-mark-btn"
            onClick={handleAddMark}
            disabled={!targetInput.trim()}
          >
            Mark
          </button>
        </div>
      </section>
    </div>
  );
}

function GrowingFerocityDetail() {
  const { hero } = useHeroContext();

  if (!hero || !isFuryHero(hero)) {
    return (
      <div className="detail-content">
        <header className="detail-header">
          <h1 className="detail-title">Growing Ferocity</h1>
          <span className="detail-subtitle">Fury only</span>
        </header>
        <p className="detail-text text-[var(--text-muted)]">
          This feature is only available for Fury characters.
        </p>
      </div>
    );
  }

  const currentFerocity = hero.heroicResource?.current ?? 0;
  const level = hero.level;
  const activeTiers = FEROCITY_TIERS.filter(tier => tier.minLevel <= level);

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">Growing Ferocity</h1>
        <span className="detail-subtitle">
          Current: {currentFerocity} Ferocity
        </span>
      </header>

      <section className="detail-section">
        <h2 className="detail-section-title">Ferocity Gain</h2>
        <div className="detail-info-box">
          <p>Start of turn: <strong>Roll 1d3 Ferocity</strong></p>
          <p>First time/round you take damage: <strong>+1 Ferocity</strong></p>
          <p>First time/encounter you become winded or dying: <strong>+1d3 Ferocity</strong></p>
        </div>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">Tier Benefits</h2>
        <div className="ferocity-tiers">
          {activeTiers.map((tier) => {
            const isActive = currentFerocity >= tier.threshold;
            return (
              <div
                key={tier.threshold}
                className={`ferocity-tier ${isActive ? 'active' : ''}`}
              >
                <span className="ferocity-tier-threshold">{tier.threshold}+</span>
                <span className="ferocity-tier-benefit">{tier.benefit}</span>
                {tier.minLevel > 1 && (
                  <span className="ferocity-tier-level">L{tier.minLevel}</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Locked tiers */}
      {FEROCITY_TIERS.filter(tier => tier.minLevel > level).length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Locked Tiers</h2>
          <div className="ferocity-tiers locked">
            {FEROCITY_TIERS.filter(tier => tier.minLevel > level).map((tier) => (
              <div key={tier.threshold} className="ferocity-tier locked">
                <span className="ferocity-tier-threshold">{tier.threshold}+</span>
                <span className="ferocity-tier-benefit">{tier.benefit}</span>
                <span className="ferocity-tier-level">Unlocks at L{tier.minLevel}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function CharacterDetailPane() {
  const { selectedItemId } = useNavigation();

  if (!selectedItemId) {
    return <EmptyState />;
  }

  switch (selectedItemId) {
    case 'ancestry':
      return <AncestryDetail />;
    case 'culture':
      return <CultureDetail />;
    case 'career':
      return <CareerDetail />;
    case 'class':
      return <ClassDetailView />;
    case 'subclass':
      return <SubclassDetailView />;
    case 'kit':
      return <KitDetail />;
    case 'inciting-incident':
      return <IncitingIncidentDetail />;
    case 'complications':
      return <ComplicationsDetail />;
    case 'titles':
      return <TitlesDetail />;
    case 'languages':
      return <LanguagesDetail />;
    case 'skills':
      return <SkillsDetail />;
    case 'perks':
      return <PerksDetail />;
    case 'conditions':
      return <ConditionsDetail />;
    case 'level-up':
      return <LevelUpDetail />;
    case 'respec':
      return <RespecDetail />;
    // Class-specific items
    case 'class-mechanics':
      return <ClassMechanicsDetail />;
    case 'formation':
      return <FormationDetail />;
    case 'minions':
      return <MinionsDetail />;
    case 'portfolio':
      return <PortfolioDetail />;
    case 'marked-targets':
      return <MarkedTargetsDetail />;
    case 'growing-ferocity':
      return <GrowingFerocityDetail />;
    default:
      return <EmptyState />;
  }
}

export default CharacterDetailPane;
