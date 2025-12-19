import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

/**
 * Represents the source of a skill (where it was granted or selected)
 */
export interface SkillSource {
  skill: string; // Skill ID
  source: 'ancestry' | 'culture' | 'career' | 'class' | 'kit' | 'complication' | 'user-selected';
  section: string; // More specific section identifier (e.g., 'environment', 'organization', 'career-slot-1')
}

interface SkillAvailabilityState {
  grantedSkills: SkillSource[];
  selectedSkills: SkillSource[];
  allUnavailableSkills: Set<string>;
}

interface SkillAvailabilityContextValue {
  state: SkillAvailabilityState;
  /** Check if a skill is available for selection (not already granted or selected elsewhere) */
  isSkillAvailable: (skillId: string) => boolean;
  /** Get the source of a skill if it's unavailable */
  getSkillSource: (skillId: string) => SkillSource | null;
  /** Register a skill that is automatically granted (fixed skill from culture/career/etc) */
  registerGrantedSkill: (skillId: string, source: SkillSource['source'], section: string) => void;
  /** Register a skill selected by the user */
  registerSelectedSkill: (skillId: string, section: string) => void;
  /** Unregister a previously selected skill */
  unregisterSelectedSkill: (skillId: string, section: string) => void;
  /** Clear all selections and grants for a specific section */
  clearSectionSelections: (section: string) => void;
  /** Clear all granted skills for a source type (e.g., when culture changes) */
  clearSourceGrants: (source: SkillSource['source']) => void;
  /** Reset all skill availability state */
  resetAll: () => void;
}

const SkillAvailabilityContext = createContext<SkillAvailabilityContextValue | null>(null);

interface SkillAvailabilityProviderProps {
  children: ReactNode;
}

export const SkillAvailabilityProvider: React.FC<SkillAvailabilityProviderProps> = ({ children }) => {
  const [grantedSkills, setGrantedSkills] = useState<SkillSource[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SkillSource[]>([]);

  // Compute the set of unavailable skills
  const allUnavailableSkills = useMemo(() => {
    const skills = new Set<string>();
    grantedSkills.forEach(s => skills.add(s.skill));
    selectedSkills.forEach(s => skills.add(s.skill));
    return skills;
  }, [grantedSkills, selectedSkills]);

  const isSkillAvailable = useCallback((skillId: string) => {
    return !allUnavailableSkills.has(skillId);
  }, [allUnavailableSkills]);

  const getSkillSource = useCallback((skillId: string): SkillSource | null => {
    const granted = grantedSkills.find(s => s.skill === skillId);
    if (granted) return granted;
    const selected = selectedSkills.find(s => s.skill === skillId);
    return selected || null;
  }, [grantedSkills, selectedSkills]);

  const registerGrantedSkill = useCallback((skillId: string, source: SkillSource['source'], section: string) => {
    setGrantedSkills(prev => {
      // Don't add duplicates
      if (prev.some(s => s.skill === skillId && s.section === section)) {
        return prev;
      }
      return [...prev, { skill: skillId, source, section }];
    });
  }, []);

  const registerSelectedSkill = useCallback((skillId: string, section: string) => {
    setSelectedSkills(prev => {
      // Don't add duplicates
      if (prev.some(s => s.skill === skillId)) {
        return prev;
      }
      return [...prev, { skill: skillId, source: 'user-selected', section }];
    });
  }, []);

  const unregisterSelectedSkill = useCallback((skillId: string, section: string) => {
    setSelectedSkills(prev => prev.filter(s => !(s.skill === skillId && s.section === section)));
  }, []);

  const clearSectionSelections = useCallback((section: string) => {
    setSelectedSkills(prev => prev.filter(s => s.section !== section));
    setGrantedSkills(prev => prev.filter(s => s.section !== section));
  }, []);

  const clearSourceGrants = useCallback((source: SkillSource['source']) => {
    setGrantedSkills(prev => prev.filter(s => s.source !== source));
    setSelectedSkills(prev => prev.filter(s => s.source !== source));
  }, []);

  const resetAll = useCallback(() => {
    setGrantedSkills([]);
    setSelectedSkills([]);
  }, []);

  const value: SkillAvailabilityContextValue = {
    state: { grantedSkills, selectedSkills, allUnavailableSkills },
    isSkillAvailable,
    getSkillSource,
    registerGrantedSkill,
    registerSelectedSkill,
    unregisterSelectedSkill,
    clearSectionSelections,
    clearSourceGrants,
    resetAll,
  };

  return (
    <SkillAvailabilityContext.Provider value={value}>
      {children}
    </SkillAvailabilityContext.Provider>
  );
};

export const useSkillAvailability = (): SkillAvailabilityContextValue => {
  const context = useContext(SkillAvailabilityContext);
  if (!context) {
    throw new Error('useSkillAvailability must be used within a SkillAvailabilityProvider');
  }
  return context;
};

/**
 * Helper to get a human-readable label for a skill source
 */
export const getSourceLabel = (source: SkillSource): string => {
  const sourceLabels: Record<SkillSource['source'], string> = {
    'ancestry': 'Ancestry',
    'culture': 'Culture',
    'career': 'Career',
    'class': 'Class',
    'kit': 'Kit',
    'complication': 'Complication',
    'user-selected': 'Selected',
  };
  return sourceLabels[source.source] || source.section;
};
