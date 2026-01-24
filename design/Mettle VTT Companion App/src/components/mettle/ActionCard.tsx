import React from 'react';
import { cn } from '../../lib/utils';

export function ActionCard({ content }: { content: any }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-1 border-b border-border-subtle pb-4">
        <h1 className="text-2xl font-display text-text-primary">{content.name}</h1>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold" style={{ color: content.type_color || '#a1a1aa' }}>
          {content.type}
        </span>
        <span className="text-text-muted">Cost: <span className="text-text-primary">{content.cost}</span></span>
      </div>

      <div className="flex flex-wrap gap-2">
        {content.keywords.map((kw: string) => (
          <span key={kw} className="px-2 py-1 bg-bg-elevated text-text-secondary text-xs uppercase tracking-wide rounded-sm">
            {kw}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
        <div>
          <span className="text-text-muted uppercase text-xs tracking-wider block mb-1">Distance</span>
          {content.distance}
        </div>
        <div>
          <span className="text-text-muted uppercase text-xs tracking-wider block mb-1">Target</span>
          {content.target}
        </div>
      </div>

      <div className="border border-border-subtle rounded-sm bg-bg-elevated/20 overflow-hidden">
        <div className="flex justify-between items-center bg-bg-elevated px-4 py-2 border-b border-border-subtle">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Power Roll</span>
          <span className="font-mono text-sm text-text-primary">{content.power_roll.characteristic}</span>
        </div>
        <div className="divide-y divide-border-subtle">
          {content.power_roll.tiers.map((tier: any) => (
            <div key={tier.tier} className="grid grid-cols-[100px_1fr] px-4 py-3 text-sm">
              <span className="font-mono text-text-primary">{tier.tier}</span>
              <span className="text-text-secondary">{tier.result}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-text-secondary leading-relaxed">
        <strong className="text-text-primary font-medium">Effect:</strong> {content.effect}
      </div>

      {content.roll_button && (
        <button className="self-end mt-4 px-6 py-2 bg-mettle-accent hover:bg-mettle-accent-hover text-bg-void font-bold uppercase tracking-wide text-sm rounded-sm transition-colors">
          Roll Attack
        </button>
      )}
    </div>
  );
}
