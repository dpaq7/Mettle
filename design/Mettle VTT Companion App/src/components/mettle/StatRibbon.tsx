import React from 'react';
import { Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatRibbonProps {
  stats: Record<string, string>;
  combatMode: boolean;
}

export function StatRibbon({ stats, combatMode }: StatRibbonProps) {
  // Parse STM for low health warning
  const stm = stats.STM.split('/');
  const currentStm = parseInt(stm[0]);
  const maxStm = parseInt(stm[1]);
  const isLowHealth = currentStm < maxStm * 0.25;

  return (
    <div className={cn(
      "h-8 flex items-center bg-bg-deep border-b px-2 overflow-x-auto no-scrollbar transition-colors duration-300",
      combatMode ? "border-status-danger/50 shadow-[0_1px_0_0_rgba(239,68,68,0.1)]" : "border-border-subtle"
    )}>
      {Object.entries(stats).map(([key, value], index) => {
        const isFocus = key === 'Focus';
        const isStm = key === 'STM';
        
        return (
          <div 
            key={key} 
            className={cn(
              "flex items-center gap-2 px-3 h-full border-r border-border-subtle last:border-0 whitespace-nowrap",
              isFocus && "min-w-[100px]"
            )}
          >
            <span className={cn(
              "text-xs font-mono font-medium",
              (isStm && isLowHealth) ? "text-status-danger" : "text-text-muted"
            )}>
              {key === 'Focus' ? <Zap className="w-3 h-3 text-mettle-accent inline mr-1" /> : key}
            </span>
            <span className={cn(
              "text-sm font-mono font-semibold",
              isFocus ? "text-mettle-accent" : "text-text-primary",
              (isStm && isLowHealth) && "text-status-danger animate-pulse"
            )}>
              {value}
            </span>
          </div>
        );
      })}

      {combatMode && (
        <>
          <div className="flex items-center gap-2 px-3 h-full border-r border-border-subtle border-status-danger/30 whitespace-nowrap bg-status-danger/5">
            <span className="text-xs font-mono font-medium text-status-danger">Turn</span>
            <span className="text-sm font-mono font-semibold text-text-primary">3</span>
          </div>
          <div className="flex items-center gap-2 px-3 h-full border-r border-border-subtle border-status-danger/30 whitespace-nowrap bg-status-danger/10">
            <span className="text-xs font-mono font-medium text-status-danger">Surges</span>
            <span className="text-sm font-mono font-semibold text-text-primary">2</span>
          </div>
        </>
      )}
    </div>
  );
}
