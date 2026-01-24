import { ReactNode } from 'react';
import './MasterList.css';

interface MasterListSectionProps {
  label: string;
  children: ReactNode;
}

export function MasterListSection({ label, children }: MasterListSectionProps) {
  return (
    <div className="master-list-section-container">
      <div className="master-list-section">{label}</div>
      <div className="master-list-section-items">{children}</div>
    </div>
  );
}

interface MasterListItemProps {
  label: string;
  value?: string;
  badge?: string | number;
  progress?: { current: number; total: number };
  selected?: boolean;
  completed?: boolean;
  onClick?: () => void;
}

export function MasterListItem({
  label,
  value,
  badge,
  progress,
  selected = false,
  completed = false,
  onClick,
}: MasterListItemProps) {
  return (
    <button
      className={`master-list-item ${selected ? 'selected' : ''} ${completed ? 'completed' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="master-list-item-label">{label}</span>
      {value && <span className="master-list-item-value">{value}</span>}
      {badge !== undefined && (
        <span className="master-list-item-badge">{badge}</span>
      )}
      {progress && (
        <span className="master-list-item-progress">
          {progress.current}/{progress.total}
        </span>
      )}
      {completed && <span className="master-list-item-done">Done</span>}
    </button>
  );
}

interface MasterListProps {
  children: ReactNode;
}

export function MasterList({ children }: MasterListProps) {
  return <div className="master-list">{children}</div>;
}

export default MasterList;
