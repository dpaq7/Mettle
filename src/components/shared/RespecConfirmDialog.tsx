import * as React from 'react';
import { RefreshCcw, AlertTriangle, Trophy } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/shadcn';
import type { Hero } from '@/types';

interface RespecConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: Hero | null;
  onConfirm: () => void;
}

// Format subclass for display
const formatSubclass = (subclass: string): string => {
  return subclass
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const RespecConfirmDialog: React.FC<RespecConfirmDialogProps> = ({
  open,
  onOpenChange,
  character,
  onConfirm,
}) => {
  if (!character) return null;

  // Calculate total XP that will be preserved
  // Current XP + any pending victories converted to XP
  const currentXp = character.xp || 0;
  const pendingVictoryXp = character.victories || 0;
  const totalXp = currentXp + pendingVictoryXp;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent variant="fantasy" className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-[var(--accent-primary)]" />
            Re-spec Character?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <p className="mb-3">
                Re-speccing <strong className="text-[var(--text-primary)]">{character.name}</strong> will
                allow you to rebuild your character from scratch, starting at the class selection step.
              </p>

              <div className="flex items-center gap-2 p-3 bg-[var(--bg-darkest)] border border-[var(--xp)] rounded mb-3">
                <Trophy className="w-5 h-5 text-[var(--xp)]" />
                <div>
                  <div className="font-medium text-[var(--xp)]">XP Preserved: {totalXp}</div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {currentXp > 0 && `${currentXp} current XP`}
                    {currentXp > 0 && pendingVictoryXp > 0 && ' + '}
                    {pendingVictoryXp > 0 && `${pendingVictoryXp} from victories`}
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-3 bg-[var(--bg-darkest)] border border-[var(--warning)] border-l-4 rounded my-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[var(--warning)] mt-0.5 shrink-0" />
            <div className="text-sm text-[var(--text-secondary)]">
              <strong className="text-[var(--warning)]">What will change:</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>Class, subclass, and all class features</li>
                <li>Ancestry, culture, and career choices</li>
                <li>Kit, skills, and characteristics</li>
                <li>Level (reset to 1, use XP to level up)</li>
                <li>All progression choices and perks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[var(--bg-darkest)] border border-[var(--text-tertiary)] rounded my-2">
          <div className="font-bold text-[var(--text-primary)]">{character.name}</div>
          <div className="text-xs text-[var(--text-secondary)] capitalize">
            Level {character.level} {character.heroClass}
            {character.subclass && ` • ${formatSubclass(character.subclass)}`}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-[var(--accent-primary)] hover:bg-[var(--accent-bright)] text-white"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Begin Re-spec
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RespecConfirmDialog;
