import React from 'react';
import { User, Swords, ClipboardList, Backpack } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface CommandBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'character', label: 'Char', fullLabel: 'Character', icon: User },
  { id: 'actions', label: 'Acts', fullLabel: 'Actions', icon: Swords },
  { id: 'projects', label: 'Proj', fullLabel: 'Projects', icon: ClipboardList },
  { id: 'inventory', label: 'Inv', fullLabel: 'Inventory', icon: Backpack },
];

export function CommandBar({ activeTab, onTabChange }: CommandBarProps) {
  return (
    <nav className="w-[72px] flex-shrink-0 bg-bg-void border-r border-border-subtle flex flex-col items-center py-2 z-10">
      <TooltipProvider delayDuration={0}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex flex-col items-center py-3 px-2 gap-1 transition-all duration-150 relative",
                    "hover:bg-bg-surface group",
                    isActive ? "bg-bg-surface text-mettle-accent" : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  {/* Left Border Indicator */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-[2px] transition-colors",
                    isActive ? "bg-mettle-accent" : "bg-transparent group-hover:bg-border-subtle"
                  )} />
                  
                  <Icon className={cn("w-5 h-5", isActive && "text-mettle-accent")} />
                  <span className="text-[10px] uppercase tracking-[0.05em] font-semibold">
                    {item.label}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-bg-overlay text-text-primary border-border-subtle">
                {item.fullLabel}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
