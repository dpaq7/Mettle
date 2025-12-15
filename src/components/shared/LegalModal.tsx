import React, { useCallback } from 'react';
import './LegalModal.css';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APP_VERSION = '0.3.4';

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  // Open URL in system browser
  const handleOpenUrl = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="legal-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="legal-modal">
        <header className="legal-modal-header">
          <h2 id="legal-modal-title">About Mettle</h2>
          <button
            className="legal-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="legal-modal-content">
          <section className="legal-section">
            <h3>Version</h3>
            <p>Mettle v{APP_VERSION}</p>
            <p className="legal-tagline">A character manager for Draw Steel</p>
          </section>

          <section className="legal-section">
            <h3>Draw Steel Creator License</h3>
            <p className="legal-required">
              <strong>Mettle</strong> is an independent product published under the DRAW STEEL
              Creator License and is not affiliated with MCDM Productions, LLC.
            </p>
            <p className="legal-copyright">
              <strong>DRAW STEEL</strong> © 2024 MCDM Productions, LLC.
            </p>
            <p>
              <button
                type="button"
                className="legal-link"
                onClick={() => handleOpenUrl('https://www.mcdmproductions.com/draw-steel-creator-license')}
              >
                View Creator License
              </button>
              {' • '}
              <button
                type="button"
                className="legal-link"
                onClick={() => handleOpenUrl('https://www.mcdmproductions.com')}
              >
                MCDM Productions
              </button>
            </p>
          </section>

          <section className="legal-section">
            <h3>Open Source</h3>
            <p>
              Mettle is a fork of{' '}
              <button
                type="button"
                className="legal-link"
                onClick={() => handleOpenUrl('https://github.com/andyaiken/forgesteel')}
              >
                Forge Steel
              </button>
              , originally created by Andy Aiken.
            </p>
            <p>
              This project is licensed under the{' '}
              <strong>GNU General Public License v3.0</strong>.
            </p>
            <p>
              <button
                type="button"
                className="legal-link"
                onClick={() => handleOpenUrl('https://github.com/dpaq7/forge-steel-summoner')}
              >
                View Source on GitHub
              </button>
            </p>
          </section>
        </div>

        <footer className="legal-modal-footer">
          <button className="legal-modal-button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LegalModal;
