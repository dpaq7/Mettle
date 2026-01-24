import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface MasterPaneProps {
  data: any[]; // Can be items or sections
  onSelectItem?: (item: any) => void;
}

export function MasterPane({ data, onSelectItem }: MasterPaneProps) {
  // Helper to render a single item row
  const renderItem = (item: any) => {
    return (
      <button
        key={item.label}
        onClick={() => onSelectItem?.(item)}
        className={cn(
          "w-full text-left flex items-center justify-between px-3 py-2 text-base transition-colors duration-150 border-l-2 relative group",
          item.selected 
            ? "bg-bg-surface text-text-primary border-mettle-accent" 
            : "border-transparent text-text-secondary hover:bg-bg-surface hover:text-text-primary"
        )}
      >
        <div className="flex-1 flex items-center justify-between gap-2 overflow-hidden">
          <span className="truncate">{item.label}</span>
          
          {/* Variants */}
          {item.value && (
            <span className={cn(
              "text-sm truncate max-w-[120px]", 
              item.selected ? "text-text-primary" : "text-text-muted"
            )}>
              {item.value}
            </span>
          )}
          
          {item.badge && (
            <Badge variant="secondary" className="bg-bg-elevated text-text-secondary h-5 px-1.5 text-xs">
              {item.badge}
            </Badge>
          )}

          {item.quantity && (
            <Badge variant="outline" className="border-border-default text-text-muted h-5 px-1.5 text-xs font-mono">
              x{item.quantity}
            </Badge>
          )}

          {item.completed && (
             <span className="text-status-success text-xs uppercase tracking-wider font-bold">Done</span>
          )}
        </div>
        
        {/* Progress Variant */}
        {item.progress && (
           <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-bg-elevated">
             <div 
               className="h-full bg-mettle-accent/50" 
               style={{ width: `${(parseInt(item.progress.split('/')[0]) / parseInt(item.progress.split('/')[1])) * 100}%` }}
             />
           </div>
        )}
      </button>
    );
  };

  // Determine if flat list or sections
  const isSections = data.length > 0 && 'header' in data[0];

  return (
    <div className="w-[280px] flex-shrink-0 bg-bg-deep border-r border-border-subtle h-full overflow-y-auto custom-scrollbar">
      {isSections ? (
        <div className="flex flex-col pb-4">
          {data.map((section: any) => (
            <div key={section.header}>
              <div className="sticky top-0 z-10 bg-bg-deep/95 backdrop-blur-sm px-3 py-2 text-xs font-semibold uppercase tracking-widest text-text-muted border-b border-border-subtle">
                {section.header}
              </div>
              <div className="flex flex-col">
                {section.items.map((item: any) => renderItem(item))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col py-2">
           {data.map((item: any) => renderItem(item))}
        </div>
      )}
    </div>
  );
}
