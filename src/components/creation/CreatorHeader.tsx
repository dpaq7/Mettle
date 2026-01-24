/**
 * CreatorHeader - Simple header for character creation
 * Shows creation mode title and optional cancel button
 */
import { X } from 'lucide-react';
import './CreatorHeader.css';

interface CreatorHeaderProps {
  characterName: string;
  respecXp?: number;
  onCancel?: () => void;
}

export function CreatorHeader({
  characterName,
  respecXp = 0,
  onCancel,
}: CreatorHeaderProps) {
  return (
    <header className="creator-header">
      <div className="creator-header-left">
        <h1 className="creator-header-title">
          {respecXp > 0 ? 'Re-spec Character' : 'Create Character'}
        </h1>
        {characterName && (
          <span className="creator-header-name">{characterName}</span>
        )}
      </div>

      <div className="creator-header-right">
        {respecXp > 0 && (
          <div className="creator-header-respec-badge">
            <span className="respec-label">Preserved XP</span>
            <span className="respec-value">{respecXp}</span>
          </div>
        )}
        {onCancel && (
          <button
            className="creator-header-cancel"
            onClick={onCancel}
            title="Cancel creation"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </header>
  );
}

export default CreatorHeader;
