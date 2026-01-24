import { getKeywordById, getKeywordByName, KEYWORD_CATEGORY_NAMES } from '@/data/rules-content';
import { Tag, Zap, Crosshair, Flame, Brain, Sparkles } from 'lucide-react';

interface KeywordRulesDetailProps {
  keyword: string;
}

// Get icon for keyword category
function getCategoryIcon(category: string) {
  switch (category) {
    case 'attack-type':
      return <Crosshair size={16} />;
    case 'range':
      return <Crosshair size={16} />;
    case 'damage-type':
      return <Flame size={16} />;
    case 'power-source':
      return <Zap size={16} />;
    case 'psionic-domain':
      return <Brain size={16} />;
    case 'special':
      return <Sparkles size={16} />;
    default:
      return <Tag size={16} />;
  }
}

export function KeywordRulesDetail({ keyword }: KeywordRulesDetailProps) {
  // Try to find keyword by ID first, then by name
  const keywordDef = getKeywordById(keyword) || getKeywordByName(keyword);

  if (!keywordDef) {
    return (
      <div className="rules-detail">
        <div className="rules-detail-header">
          <h1 className="rules-detail-title">{keyword}</h1>
          <span className="rules-detail-subtitle">Keyword</span>
        </div>
        <p className="rules-detail-text">
          No detailed information available for this keyword.
        </p>
        <div className="rules-detail-note">
          <p>
            This keyword may be specific to an ability or effect. Check the ability description for more details.
          </p>
        </div>
      </div>
    );
  }

  const categoryName = KEYWORD_CATEGORY_NAMES[keywordDef.category];
  const CategoryIcon = () => getCategoryIcon(keywordDef.category);

  return (
    <div className="rules-detail">
      {/* Header */}
      <header className="rules-detail-header">
        <h1 className="rules-detail-title">
          <span className="keyword-icon">
            <CategoryIcon />
          </span>
          {keywordDef.name}
        </h1>
        <span className="rules-detail-subtitle">{categoryName} Keyword</span>
      </header>

      {/* Quick Description */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Description</h2>
        <p className="rules-detail-text">{keywordDef.description}</p>
      </section>

      {/* Full Rules */}
      {keywordDef.rulesText && (
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Rules</h2>
          <div className="keyword-rules-box">
            <p className="rules-detail-text">{keywordDef.rulesText}</p>
          </div>
        </section>
      )}

      {/* Category Info */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Category</h2>
        <div className="keyword-category-badge">
          <CategoryIcon />
          <span>{categoryName}</span>
        </div>
      </section>
    </div>
  );
}

export default KeywordRulesDetail;
