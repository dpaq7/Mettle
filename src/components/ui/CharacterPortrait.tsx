import { useRef, useState, useCallback, DragEvent, ChangeEvent } from 'react';
import './CharacterPortrait.css';

interface CharacterPortraitProps {
  /** Current portrait image URL (base64 or blob URL) */
  imageUrl: string | null;

  /** Callback when image is added or changed */
  onImageChange: (imageUrl: string | null) => void;

  /** Shape of the portrait frame */
  shape?: 'octagon' | 'shield' | 'hexagon' | 'ornate';

  /** Size of the portrait box */
  size?: 'small' | 'medium' | 'large';

  /** Optional alt text for accessibility */
  altText?: string;

  /** Optional class name */
  className?: string;
}

const SIZES = {
  small: { width: 80, height: 100 },
  medium: { width: 120, height: 150 },
  large: { width: 160, height: 200 },
};

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const CharacterPortrait = ({
  imageUrl,
  onImageChange,
  shape = 'octagon',
  size = 'medium',
  altText = 'Character portrait',
  className = '',
}: CharacterPortraitProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dimensions = SIZES[size];

  // Process the selected file
  const processFile = useCallback((file: File) => {
    setError(null);

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a JPG, PNG, WebP, or GIF image.');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('Image must be less than 5MB.');
      return;
    }

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  }, [onImageChange]);

  // Handle file input change
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  }, [processFile]);

  // Handle click on portrait area
  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle remove portrait
  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering file picker
    onImageChange(null);
    setError(null);
  }, [onImageChange]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  return (
    <div
      className={`character-portrait shape-${shape} size-${size} ${className}`}
      style={{
        '--portrait-width': `${dimensions.width}px`,
        '--portrait-height': `${dimensions.height}px`,
      } as React.CSSProperties}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleFileChange}
        className="portrait-file-input"
        aria-label="Upload character portrait"
      />

      {/* Portrait frame */}
      <div
        className={`portrait-frame ${isDragging ? 'dragging' : ''} ${imageUrl ? 'has-image' : ''}`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={imageUrl ? 'Change character portrait' : 'Add character portrait'}
      >
        {/* Border layer */}
        <div className="portrait-border" />

        {/* Background/Image layer */}
        <div className="portrait-inner">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={altText}
                className="portrait-image"
              />

              {/* Hover overlay with remove button */}
              <div className={`portrait-overlay ${isHovering ? 'visible' : ''}`}>
                <button
                  className="portrait-remove-btn"
                  onClick={handleRemove}
                  aria-label="Remove portrait"
                  type="button"
                >
                  <span className="remove-icon">✕</span>
                  <span className="remove-text">Remove</span>
                </button>

                <span className="portrait-change-hint">Click to change</span>
              </div>
            </>
          ) : (
            <div className="portrait-placeholder">
              <div className="placeholder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <span className="placeholder-text">Add</span>
              <span className="placeholder-text">Portrait</span>
            </div>
          )}
        </div>

        {/* Drag overlay */}
        {isDragging && (
          <div className="portrait-drag-overlay">
            <span>Drop image here</span>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="portrait-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default CharacterPortrait;
