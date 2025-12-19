import React from 'react';
import './CreationNavigation.css';

interface CreationNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  position: 'top' | 'bottom';
}

const CreationNavigation: React.FC<CreationNavigationProps> = ({
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Next',
  nextDisabled = false,
  showBack = true,
  position
}) => {
  return (
    <div className={`creation-nav creation-nav--${position}`}>
      {showBack && onBack && (
        <button
          className="creation-nav__btn creation-nav__btn--back"
          onClick={onBack}
          type="button"
        >
          {backLabel}
        </button>
      )}
      {onNext && (
        <button
          className="creation-nav__btn creation-nav__btn--next"
          onClick={onNext}
          disabled={nextDisabled}
          type="button"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
};

export default CreationNavigation;
