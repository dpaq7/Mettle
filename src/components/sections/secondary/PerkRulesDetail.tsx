import { getPerkById } from '@/data/perks/perks-data';
import { PerkCategory } from '@/types/perk';
import {
  Hammer,
  Compass,
  Users,
  Eye,
  BookOpen,
  Sparkles,
  Tag
} from 'lucide-react';

interface PerkRulesDetailProps {
  perkId: string;
}

// Category display names and descriptions
const CATEGORY_INFO: Record<PerkCategory, { name: string; description: string }> = {
  crafting: {
    name: 'Crafting',
    description: 'Perks related to creating, repairing, and improvising items and equipment.',
  },
  exploration: {
    name: 'Exploration',
    description: 'Perks for wilderness survival, physical feats, and navigating dangerous terrain.',
  },
  interpersonal: {
    name: 'Interpersonal',
    description: 'Perks for social interaction, persuasion, and influencing others.',
  },
  intrigue: {
    name: 'Intrigue',
    description: 'Perks for stealth, deception, and covert operations.',
  },
  lore: {
    name: 'Lore',
    description: 'Perks for knowledge, research, and recalling information.',
  },
  supernatural: {
    name: 'Supernatural',
    description: 'Perks involving magic, psionics, and otherworldly abilities.',
  },
};

// Get icon for perk category
function getCategoryIcon(category: PerkCategory) {
  switch (category) {
    case 'crafting':
      return <Hammer size={16} />;
    case 'exploration':
      return <Compass size={16} />;
    case 'interpersonal':
      return <Users size={16} />;
    case 'intrigue':
      return <Eye size={16} />;
    case 'lore':
      return <BookOpen size={16} />;
    case 'supernatural':
      return <Sparkles size={16} />;
    default:
      return <Tag size={16} />;
  }
}

export function PerkRulesDetail({ perkId }: PerkRulesDetailProps) {
  const perk = getPerkById(perkId);

  if (!perk) {
    return (
      <div className="rules-detail">
        <div className="rules-detail-header">
          <h1 className="rules-detail-title">{perkId}</h1>
          <span className="rules-detail-subtitle">Perk</span>
        </div>
        <p className="rules-detail-text">
          No detailed information available for this perk.
        </p>
      </div>
    );
  }

  const categoryInfo = CATEGORY_INFO[perk.category];
  const CategoryIcon = () => getCategoryIcon(perk.category);

  return (
    <div className="rules-detail">
      {/* Header */}
      <header className="rules-detail-header">
        <h1 className="rules-detail-title">
          <span className="keyword-icon">
            <CategoryIcon />
          </span>
          {perk.name}
        </h1>
        <span className="rules-detail-subtitle">{categoryInfo.name} Perk</span>
      </header>

      {/* Description */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Effect</h2>
        <div className="rules-detail-note">
          <p className="rules-detail-text">{perk.description}</p>
        </div>
      </section>

      {/* Prerequisite if any */}
      {perk.prerequisite && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Prerequisite</h2>
          <p className="rules-detail-text">{perk.prerequisite}</p>
        </section>
      )}

      {/* Category Info */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Category</h2>
        <div className="keyword-category-badge">
          <CategoryIcon />
          <span>{categoryInfo.name}</span>
        </div>
        <p className="rules-detail-text" style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)' }}>
          {categoryInfo.description}
        </p>
      </section>

      {/* Source if available */}
      {perk.source && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Source</h2>
          <p className="rules-detail-text" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {perk.source}
          </p>
        </section>
      )}
    </div>
  );
}

export default PerkRulesDetail;
