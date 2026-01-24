import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

export function ItemCard({ content }: { content: any }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-1 border-b border-border-subtle pb-4">
        <h1 className="text-2xl font-display text-text-primary">{content.name}</h1>
        <div className="flex items-center gap-2 mt-2">
           <span className="text-sm text-text-secondary">{content.category}</span>
           {content.equipped && (
             <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-mettle-accent text-bg-void rounded-sm">
               Equipped
             </span>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {content.stats.map((stat: any) => (
          <div key={stat.label} className="p-3 bg-bg-elevated/20 border border-border-subtle rounded-sm">
            <span className="text-text-muted uppercase text-xs tracking-wider block mb-1">{stat.label}</span>
            <span className="text-text-primary font-medium text-sm">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Description</h3>
        <p className="text-text-secondary leading-relaxed text-sm">
          {content.description}
        </p>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border-subtle">
        {content.actions.map((action: any) => (
          <Button 
            key={action.label} 
            variant={action.variant || "default"} 
            className="text-sm"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
