import { User, Swords, ClipboardList, Backpack } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/shadcn/tooltip';
import './CommandBar.css';

export type CommandBarSection = 'character' | 'actions' | 'projects' | 'inventory';

interface CommandBarProps {
  activeSection: CommandBarSection;
  onSectionChange: (section: CommandBarSection) => void;
}

const SECTIONS: { id: CommandBarSection; label: string; shortLabel: string; icon: typeof User }[] = [
  { id: 'character', label: 'Character', shortLabel: 'Char', icon: User },
  { id: 'actions', label: 'Actions', shortLabel: 'Acts', icon: Swords },
  { id: 'projects', label: 'Projects', shortLabel: 'Proj', icon: ClipboardList },
  { id: 'inventory', label: 'Inventory', shortLabel: 'Inv', icon: Backpack },
];

export function CommandBar({ activeSection, onSectionChange }: CommandBarProps) {
  return (
    <nav className="command-bar">
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <Tooltip key={section.id}>
            <TooltipTrigger asChild>
              <button
                className={`command-bar-item ${isActive ? 'active' : ''}`}
                onClick={() => onSectionChange(section.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="command-bar-icon" size={20} />
                <span className="command-bar-label">{section.shortLabel}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {section.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}

export default CommandBar;
