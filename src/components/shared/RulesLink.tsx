import { memo, useCallback } from 'react';
import { useSecondaryDetail, SecondaryDetailType, SecondaryDetailData } from '@/context/SecondaryDetailContext';
import './RulesLink.css';

interface RulesLinkProps {
  type: SecondaryDetailType;
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Additional data to pass (e.g., full ability object for ability type) */
  data?: SecondaryDetailData;
}

/**
 * A clickable link that opens the secondary detail pane with rules information.
 * Use this component to make keywords, skills, conditions, abilities, etc. clickable.
 *
 * @example
 * <RulesLink type="condition" id="frightened">Frightened</RulesLink>
 * <RulesLink type="skill" id="alchemy">Alchemy</RulesLink>
 * <RulesLink type="ability" id="brutal-slam" data={{ ability }}>Brutal Slam</RulesLink>
 */
export const RulesLink = memo(function RulesLink({ type, id, children, className, data }: RulesLinkProps) {
  const { openSecondary } = useSecondaryDetail();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openSecondary(type, id, data);
  }, [openSecondary, type, id, data]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSecondary(type, id, data);
    }
  }, [openSecondary, type, id, data]);

  return (
    <button
      type="button"
      className={`rules-link ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-type={type}
      data-id={id}
    >
      {children}
    </button>
  );
});

export default RulesLink;
