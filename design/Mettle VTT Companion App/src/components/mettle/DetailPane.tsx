import React from 'react';
import { cn } from '../../lib/utils';
import { ActionCard } from './ActionCard';
import { ProjectCard } from './ProjectCard';
import { ItemCard } from './ItemCard';

interface DetailPaneProps {
  data: any;
}

export function DetailPane({ data }: DetailPaneProps) {
  if (!data) return <div className="flex-1 bg-bg-surface" />;

  const renderContent = () => {
    if (data.type === 'action_card') {
      return <ActionCard content={data.content} />;
    }
    if (data.type === 'project') {
      return <ProjectCard content={data.content} />;
    }
    if (data.type === 'item') {
      return <ItemCard content={data.content} />;
    }

    // Default / Character View
    return (
      <div className="max-w-2xl flex flex-col gap-8">
        <div className="border-b border-border-subtle pb-4">
          <h1 className="text-2xl font-display text-text-primary mb-1">{data.title}</h1>
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{data.subtitle}</span>
        </div>

        {data.content?.sections?.map((section: any, idx: number) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted border-b border-border-subtle pb-2 w-max">
              {section.heading}
            </h3>
            
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item: any, i: number) => {
                  if (typeof item === 'string') {
                    return (
                      <li key={i} className="flex items-start gap-2 text-text-secondary">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-text-muted shrink-0" />
                        <span>{item}</span>
                      </li>
                    );
                  }
                  // Feature object {name, description}
                  return (
                    <li key={i} className="group">
                      <div className="font-semibold text-text-primary mb-1 group-hover:text-mettle-accent transition-colors">
                        {item.name}
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}

            {section.text && (
              <p className="text-text-secondary leading-relaxed">
                {section.text}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-bg-surface p-8 overflow-y-auto custom-scrollbar">
      {renderContent()}
    </div>
  );
}
