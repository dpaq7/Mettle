import { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/shadcn/tooltip';
import { TitleHeader } from './TitleHeader';
import { StatRibbon } from './StatRibbon';
import { CommandBar } from './CommandBar';
import { ContentArea } from './ContentArea';
import { useNavigation } from '@/context/NavigationContext';
import './AppShell.css';

interface AppShellProps {
  // Header controls
  onManageCharacters: () => void;
  onCreateCharacter: () => void;
  onImportCharacter: () => void;
  onExportCharacter: () => void;
  onDuplicateCharacter: () => void;
  onRespecCharacter: () => void;
  onRespite: () => void;
  onLevelUp: () => void;
  onShowAbout: () => void;
  canLevelUp?: boolean;
  // Content - master-detail layout
  masterPane?: ReactNode;
  detailPane?: ReactNode;
  // Content - secondary detail pane for rules information
  secondaryPane?: ReactNode;
  // Content - full-width layout (alternative to master-detail)
  fullWidthPane?: ReactNode;
}

export function AppShell({
  onManageCharacters,
  onCreateCharacter,
  onImportCharacter,
  onExportCharacter,
  onDuplicateCharacter,
  onRespecCharacter,
  onRespite,
  onLevelUp,
  onShowAbout,
  canLevelUp = false,
  masterPane,
  detailPane,
  secondaryPane,
  fullWidthPane,
}: AppShellProps) {
  const { activeSection, setActiveSection } = useNavigation();

  return (
    <TooltipProvider>
      <div className="app-shell">
        {/* Title Header */}
        <TitleHeader
          onManageCharacters={onManageCharacters}
          onCreateCharacter={onCreateCharacter}
          onImportCharacter={onImportCharacter}
          onExportCharacter={onExportCharacter}
          onDuplicateCharacter={onDuplicateCharacter}
          onRespecCharacter={onRespecCharacter}
          onRespite={onRespite}
          onLevelUp={onLevelUp}
          onShowAbout={onShowAbout}
          canLevelUp={canLevelUp}
        />

        {/* Stat Ribbon */}
        <StatRibbon />

        {/* Main Content Area */}
        <div className="app-shell-body">
          {/* Command Bar */}
          <CommandBar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Content Area - supports both master-detail and full-width layouts */}
          <ContentArea
            masterPane={masterPane}
            detailPane={detailPane}
            secondaryPane={secondaryPane}
            fullWidthPane={fullWidthPane}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default AppShell;
