/**
 * CreatorShell - Main layout wrapper for character creation
 * Follows the CommandBar > Master > Detail pattern from AppShell
 */
import { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/shadcn/tooltip';
import { CreatorHeader } from './CreatorHeader';
import { CreatorStatRibbon } from './CreatorStatRibbon';
import { CreatorCommandBar, CreatorSection } from './CreatorCommandBar';
import './CreatorShell.css';

interface CreatorShellProps {
  // Header info
  characterName: string;
  respecXp?: number;
  onCancel?: () => void;
  // Step progress
  currentStep: string;
  completedSteps: string[];
  totalSteps: number;
  currentStepIndex: number;
  // Progress summary
  progressItems: {
    label: string;
    value: string | null;
    completed: boolean;
  }[];
  // Section navigation
  activeSection: CreatorSection;
  onSectionChange: (section: CreatorSection) => void;
  availableSections: CreatorSection[];
  // Content
  masterPane: ReactNode;
  detailPane: ReactNode;
  // Navigation
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
  nextLabel?: string;
}

export function CreatorShell({
  characterName,
  respecXp = 0,
  onCancel,
  currentStep,
  completedSteps,
  totalSteps,
  currentStepIndex,
  progressItems,
  activeSection,
  onSectionChange,
  availableSections,
  masterPane,
  detailPane,
  canGoBack,
  canGoForward,
  onBack,
  onNext,
  isLastStep,
  nextLabel,
}: CreatorShellProps) {
  return (
    <TooltipProvider>
      <div className="creator-shell">
        {/* Header */}
        <CreatorHeader
          characterName={characterName}
          respecXp={respecXp}
          onCancel={onCancel}
        />

        {/* Progress Ribbon */}
        <CreatorStatRibbon
          progressItems={progressItems}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
        />

        {/* Main Content Area */}
        <div className="creator-shell-body">
          {/* Command Bar - Section Categories */}
          <CreatorCommandBar
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            availableSections={availableSections}
          />

          {/* Master Pane - Step List */}
          <div className="creator-master-pane">
            {masterPane}
          </div>

          {/* Detail Pane - Step Content */}
          <div className="creator-detail-pane">
            <div className="creator-detail-content">
              {detailPane}
            </div>

            {/* Navigation Footer */}
            <div className="creator-navigation">
              <button
                className="creator-nav-btn creator-nav-back"
                onClick={onBack}
                disabled={!canGoBack}
              >
                Back
              </button>
              <div className="creator-nav-progress">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>
              <button
                className="creator-nav-btn creator-nav-next"
                onClick={onNext}
                disabled={!canGoForward}
              >
                {nextLabel || (isLastStep ? 'Create Character' : 'Next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default CreatorShell;
