import React from 'react';
import { cn } from '../../lib/utils';
import { Progress } from '../ui/progress';

export function ProjectCard({ content }: { content: any }) {
  const percent = (content.progress.current / content.progress.total) * 100;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-1 border-b border-border-subtle pb-4">
        <h1 className="text-2xl font-display text-text-primary">{content.name}</h1>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs uppercase tracking-wider text-text-muted">
          <span>Progress</span>
          <span className="text-text-primary font-mono">{content.progress.current} / {content.progress.total}</span>
        </div>
        <Progress value={percent} className="h-2 bg-bg-elevated" indicatorClassName="bg-mettle-accent" />
      </div>

      <p className="text-text-secondary leading-relaxed">
        {content.description}
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm bg-bg-elevated/20 p-4 rounded-sm border border-border-subtle">
        <div>
          <span className="text-text-muted uppercase text-xs tracking-wider block mb-1">Skill</span>
          <span className="text-text-primary">{content.skill}</span>
        </div>
        <div>
          <span className="text-text-muted uppercase text-xs tracking-wider block mb-1">Difficulty</span>
          <span className="font-mono text-text-primary">{content.difficulty}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Roll History</h3>
        <div className="space-y-1">
          {content.roll_history.map((roll: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-3 bg-bg-elevated/10 border border-border-subtle rounded-sm text-sm">
              <span className="text-text-secondary">{roll.date}</span>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "font-medium capitalize",
                  roll.outcome === 'success' ? 'text-status-success' : 'text-status-danger'
                )}>
                  {roll.outcome}
                </span>
                <span className="font-mono w-6 text-right text-text-primary">{roll.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {content.roll_button && (
        <button className="self-end mt-4 px-6 py-2 bg-mettle-accent hover:bg-mettle-accent-hover text-bg-void font-bold uppercase tracking-wide text-sm rounded-sm transition-colors">
          Roll Project Die
        </button>
      )}
    </div>
  );
}
