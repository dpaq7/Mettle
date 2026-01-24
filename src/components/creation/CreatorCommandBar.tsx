/**
 * CreatorCommandBar - Section navigation for character creation
 * Groups creation steps into logical categories
 */
import { User, Scroll, Briefcase, Swords, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/shadcn/tooltip';
import './CreatorCommandBar.css';

export type CreatorSection = 'identity' | 'background' | 'class' | 'equipment' | 'finalize';

interface SectionConfig {
  id: CreatorSection;
  label: string;
  shortLabel: string;
  icon: typeof User;
  steps: string[];
}

export const CREATOR_SECTIONS: SectionConfig[] = [
  {
    id: 'identity',
    label: 'Identity',
    shortLabel: 'ID',
    icon: User,
    steps: ['name', 'ancestry', 'ancestryTraits'],
  },
  {
    id: 'background',
    label: 'Background',
    shortLabel: 'BG',
    icon: Scroll,
    steps: ['culture', 'cultureSkills', 'career', 'careerSkills', 'languages'],
  },
  {
    id: 'class',
    label: 'Class',
    shortLabel: 'CLS',
    icon: Swords,
    steps: ['class', 'subclass', 'furyAspect', 'stormwightKit', 'circle', 'signatureMinions', 'formation', 'nullTradition', 'psionicAugmentation'],
  },
  {
    id: 'equipment',
    label: 'Equipment',
    shortLabel: 'EQ',
    icon: Briefcase,
    steps: ['kit'],
  },
  {
    id: 'finalize',
    label: 'Finalize',
    shortLabel: 'FIN',
    icon: Settings,
    steps: ['characteristics'],
  },
];

// Get section for a given step
export function getSectionForStep(step: string): CreatorSection {
  for (const section of CREATOR_SECTIONS) {
    if (section.steps.includes(step)) {
      return section.id;
    }
  }
  return 'identity';
}

// Get steps for a section
export function getStepsForSection(sectionId: CreatorSection): string[] {
  const section = CREATOR_SECTIONS.find(s => s.id === sectionId);
  return section?.steps || [];
}

interface CreatorCommandBarProps {
  activeSection: CreatorSection;
  onSectionChange: (section: CreatorSection) => void;
  availableSections: CreatorSection[];
  completedSections?: CreatorSection[];
}

export function CreatorCommandBar({
  activeSection,
  onSectionChange,
  availableSections,
  completedSections = [],
}: CreatorCommandBarProps) {
  return (
    <nav className="creator-command-bar">
      {CREATOR_SECTIONS.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        const isAvailable = availableSections.includes(section.id);
        const isCompleted = completedSections.includes(section.id);

        return (
          <Tooltip key={section.id}>
            <TooltipTrigger asChild>
              <button
                className={`creator-command-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => isAvailable && onSectionChange(section.id)}
                disabled={!isAvailable}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="creator-command-icon" size={20} />
                <span className="creator-command-label">{section.shortLabel}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {section.label}
              {!isAvailable && ' (locked)'}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}

export default CreatorCommandBar;
