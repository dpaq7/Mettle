import React, { useState, useRef, useCallback } from 'react';
import { PortraitSettings, DEFAULT_PORTRAIT_SETTINGS } from '../../types/portrait';
import { processPortraitImage, isValidImageUrl, getBase64SizeKB } from '../../utils/imageProcessing';
import PortraitControls from './PortraitControls';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
} from '@/components/ui/shadcn';
import { X, Upload, Link, RefreshCcw, Loader2, ImageOff } from 'lucide-react';

interface PortraitUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: PortraitSettings;
  onApply: (settings: PortraitSettings) => void;
  onUpload: (file: File) => Promise<void>;
  onSetUrl: (url: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const PortraitUploader: React.FC<PortraitUploaderProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onApply,
  onUpload,
  onSetUrl,
  isLoading,
  error,
}) => {
  // Local state for preview and editing
  const [previewSettings, setPreviewSettings] = useState<PortraitSettings>(currentSettings);
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset preview when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setPreviewSettings(currentSettings);
      setUrlInput('');
      setUrlError(null);
      setLocalError(null);
    }
  }, [isOpen, currentSettings]);

  // Handle file selection
  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setLocalError('Please select an image file.');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setLocalError('Image is too large (max 10MB). Please choose a smaller file.');
        return;
      }

      setLocalError(null);

      try {
        const base64 = await processPortraitImage(file);
        const sizeKB = getBase64SizeKB(base64);

        if (sizeKB > 800) {
          setLocalError(
            `Image is still large after compression (${sizeKB}KB). Consider using a smaller image.`
          );
        }

        setPreviewSettings((prev) => ({
          ...prev,
          source: 'upload',
          imageData: base64,
        }));
      } catch (e) {
        setLocalError('Failed to process image. Please try a different file.');
      }
    },
    []
  );

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  // Handle URL input
  const handleUrlSubmit = useCallback(async () => {
    if (!urlInput.trim()) {
      setUrlError('Please enter a URL.');
      return;
    }

    if (!isValidImageUrl(urlInput)) {
      setUrlError('Please enter a valid image URL.');
      return;
    }

    setUrlError(null);

    // Test if URL loads
    const img = new Image();
    img.crossOrigin = 'anonymous';

    try {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = urlInput;
      });

      setPreviewSettings((prev) => ({
        ...prev,
        source: 'url',
        imageData: urlInput,
      }));
      setUrlInput('');
    } catch {
      setUrlError('Could not load image from URL. Please check the URL.');
    }
  }, [urlInput]);

  // Handle apply
  const handleApply = useCallback(() => {
    onApply(previewSettings);
    onClose();
  }, [previewSettings, onApply, onClose]);

  // Handle remove portrait
  const handleRemove = useCallback(() => {
    setPreviewSettings({
      ...DEFAULT_PORTRAIT_SETTINGS,
      opacity: previewSettings.opacity,
      position: previewSettings.position,
      scale: previewSettings.scale,
      grayscale: previewSettings.grayscale,
      border: previewSettings.border,
    });
  }, [previewSettings]);

  // Handle settings change
  const handleSettingsChange = useCallback((updates: Partial<PortraitSettings>) => {
    setPreviewSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  // Handler for Dialog's onOpenChange
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const hasPortrait = previewSettings.source !== 'default' && previewSettings.imageData !== null;
  const displayError = localError || error;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent variant="fantasy" className="portrait-uploader-dialog max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-[var(--accent-primary)]" />
            Character Portrait
          </DialogTitle>
        </DialogHeader>

        <div className="portrait-uploader__content">
          {/* Preview Area */}
          <div
            className={`portrait-uploader__preview ${hasPortrait ? 'has-image' : ''} ${isDragging ? 'dragging' : ''}`}
            style={
              {
                '--portrait-opacity': previewSettings.opacity,
                '--portrait-scale': previewSettings.scale,
              } as React.CSSProperties
            }
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {hasPortrait ? (
              <img
                src={previewSettings.imageData!}
                alt="Portrait preview"
                className={`preview-image ${previewSettings.grayscale ? 'grayscale' : ''}`}
                style={{
                  objectPosition:
                    previewSettings.position === 'top'
                      ? 'center top'
                      : previewSettings.position === 'bottom'
                        ? 'center bottom'
                        : 'center center',
                  transform: `scale(${previewSettings.scale})`,
                }}
              />
            ) : (
              <div className="portrait-uploader__dropzone">
                <ImageOff className="h-12 w-12 text-[var(--text-dim)] mb-2" />
                <p className="text-[var(--text-primary)]">Drag & drop an image here</p>
                <p className="text-sm text-[var(--text-muted)]">or use the buttons below</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="portrait-uploader__actions">
            <Button
              variant="chamfered"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
                e.target.value = '';
              }}
            />

            <div className="url-input-group">
              <Input
                variant="fantasy"
                type="text"
                placeholder="Or paste image URL..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              />
              <Button
                variant="outline"
                onClick={handleUrlSubmit}
                disabled={isLoading || !urlInput.trim()}
              >
                <Link className="h-4 w-4 mr-2" />
                Use URL
              </Button>
            </div>

            {urlError && <p className="error-text">{urlError}</p>}
          </div>

          {/* Quick Options */}
          <div className="portrait-uploader__quick-options">
            <Button variant="ghost" size="sm" onClick={handleRemove}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Use Default Silhouette
            </Button>
          </div>

          {/* Adjustments */}
          <div className="portrait-uploader__adjustments">
            <h4 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Adjustments</h4>
            <PortraitControls settings={previewSettings} onChange={handleSettingsChange} />
          </div>

          {/* Error Display */}
          {displayError && (
            <div className="portrait-uploader__error">
              <p>{displayError}</p>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="portrait-uploader__loading">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--accent-primary)]" />
              <p>Processing image...</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="chamfered" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="heroic" onClick={handleApply} disabled={isLoading}>
            Apply Portrait
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PortraitUploader;
