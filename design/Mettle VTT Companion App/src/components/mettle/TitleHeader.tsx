import React from 'react';
import { Sword, MoreVertical, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface TitleHeaderProps {
  combatMode: boolean;
  onToggleCombat: () => void;
}

export function TitleHeader({ combatMode, onToggleCombat }: TitleHeaderProps) {
  return (
    <header className={cn(
      "h-12 flex items-center justify-between px-4 bg-bg-void border-b transition-colors duration-300",
      combatMode ? "border-status-danger" : "border-border-subtle"
    )}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-6 h-6 text-mettle-accent font-display font-bold text-xl">
          M
        </div>
        <h1 className="font-display text-text-primary text-xl tracking-wide">
          Valeria the Bold
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCombat}
          className={cn(
            "gap-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors",
            combatMode && "text-status-danger hover:text-status-danger hover:bg-status-danger/10"
          )}
        >
          {combatMode ? <ShieldAlert className="w-4 h-4" /> : <Sword className="w-4 h-4" />}
          {combatMode ? "End Combat" : "Combat"}
        </Button>
        <Button variant="ghost" size="icon" className="text-text-secondary hover:text-text-primary hover:bg-bg-elevated">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
