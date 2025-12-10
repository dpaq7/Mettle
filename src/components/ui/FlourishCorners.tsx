import React from 'react';
import './FlourishCorners.css';

interface FlourishCornersProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Decorative corner flourish wrapper.
 * Adds corner border decorations matching the Draw Steel character sheet style.
 */
const FlourishCorners: React.FC<FlourishCornersProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
}) => {
  return (
    <div className={`flourish-corners ${variant} ${size} ${className}`}>
      <div className="flourish-corner top-left" />
      <div className="flourish-corner top-right" />
      <div className="flourish-corner bottom-left" />
      <div className="flourish-corner bottom-right" />
      <div className="flourish-content">
        {children}
      </div>
    </div>
  );
};

export default FlourishCorners;
