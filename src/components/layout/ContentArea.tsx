import { ReactNode, memo, useCallback } from 'react';
import { useSecondaryDetail } from '@/context/SecondaryDetailContext';
import './ContentArea.css';

interface ContentAreaProps {
  masterPane?: ReactNode;
  detailPane?: ReactNode;
  secondaryPane?: ReactNode;
  fullWidthPane?: ReactNode;
}

export const ContentArea = memo(function ContentArea({ masterPane, detailPane, secondaryPane, fullWidthPane }: ContentAreaProps) {
  const { isOpen: isSecondaryOpen, closeSecondary } = useSecondaryDetail();

  // Handle backdrop click to close secondary pane on mobile
  const handleBackdropClick = useCallback(() => {
    closeSecondary();
  }, [closeSecondary]);

  // If fullWidthPane is provided, render it alone
  if (fullWidthPane) {
    return (
      <div className="content-area content-area-full">
        <div className="full-width-pane">
          {fullWidthPane}
        </div>
      </div>
    );
  }

  // Otherwise, render master-detail-secondary layout
  return (
    <div className="content-area">
      <div className="master-pane">
        {masterPane}
      </div>
      <div className="detail-pane">
        {detailPane}
      </div>
      {/* Backdrop for mobile/tablet overlay */}
      <div
        className={`secondary-pane-backdrop ${isSecondaryOpen ? 'visible' : ''}`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      {secondaryPane && (
        <div className={`secondary-pane ${isSecondaryOpen ? 'open' : 'collapsed'}`}>
          {secondaryPane}
        </div>
      )}
    </div>
  );
});

export default ContentArea;
