import { useState, useCallback, useMemo } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import type { ActiveProject, ProjectStatus, ProjectRoll, ProjectTemplate, AppliedModifier } from '@/types/projects';
import { PROJECT_TEMPLATES, PROJECT_MODIFIERS, getProjectTemplate } from '@/data/projects';
import { Dices, Trash2 } from 'lucide-react';
import '../character/CharacterDetailPane.css';
import './ProjectsDetailPane.css';

// Status display config
const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string }> = {
  not_started: { label: 'Not Started', color: 'var(--text-muted)' },
  in_progress: { label: 'In Progress', color: 'var(--warning)' },
  completed: { label: 'Completed', color: 'var(--success)' },
};

type EdgeBaneState = 'normal' | 'edge' | 'doubleEdge' | 'bane' | 'doubleBane';
type LanguageBarrier = 'none' | 'related' | 'unknown';

function EmptyState() {
  return (
    <div className="detail-empty">
      <p>Select a project from the list to view details</p>
    </div>
  );
}

function ProjectProgressBar({ current, goal }: { current: number; goal: number }) {
  const percent = Math.min((current / goal) * 100, 100);

  return (
    <div className="project-progress">
      <div className="project-progress-bar">
        <div
          className="project-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="project-progress-text">
        <span>{current} / {goal}</span>
        <span>{Math.floor(percent)}%</span>
      </div>
    </div>
  );
}

// Get edge/bane display label
function getEdgeBaneLabel(state: EdgeBaneState): string {
  switch (state) {
    case 'doubleBane': return '−−';
    case 'bane': return '−';
    case 'normal': return '○';
    case 'edge': return '+';
    case 'doubleEdge': return '++';
  }
}

// Roll a d20 for project progress
function rollProjectDie(): { baseRoll: number; isBreakthrough: boolean } {
  const baseRoll = Math.floor(Math.random() * 20) + 1;
  const isBreakthrough = baseRoll >= 19;
  return { baseRoll, isBreakthrough };
}

// Format date helper
function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ============================================
// ACTIVE PROJECT DISPLAY
// ============================================

interface ActiveProjectDisplayProps {
  project: ActiveProject;
  template: ProjectTemplate | undefined;
  onRoll: (modifier: number, applied: AppliedModifier[]) => void;
  onAbandon: () => void;
  isRolling: boolean;
  lastRoll: ProjectRoll | null;
}

function ActiveProjectDisplay({
  project,
  template,
  onRoll,
  onAbandon,
  isRolling,
  lastRoll
}: ActiveProjectDisplayProps) {
  const statusConfig = STATUS_CONFIG[project.status];
  const isCompleted = project.status === 'completed';

  // Modifier state (local, not persisted)
  const [skillBonusActive, setSkillBonusActive] = useState(false);
  const [edgeBaneState, setEdgeBaneState] = useState<EdgeBaneState>('normal');
  const [languageBarrier, setLanguageBarrier] = useState<LanguageBarrier>('none');

  // Calculate total modifier
  const { totalModifier, appliedModifiers } = useMemo(() => {
    let total = 0;
    const applied: AppliedModifier[] = [];

    if (skillBonusActive) {
      total += PROJECT_MODIFIERS.APPLICABLE_SKILL;
      applied.push({ type: 'skill', name: 'Applicable Skill', value: PROJECT_MODIFIERS.APPLICABLE_SKILL });
    }

    switch (edgeBaneState) {
      case 'edge':
        total += PROJECT_MODIFIERS.EDGE;
        applied.push({ type: 'edge', name: 'Edge', value: PROJECT_MODIFIERS.EDGE });
        break;
      case 'doubleEdge':
        total += PROJECT_MODIFIERS.DOUBLE_EDGE;
        applied.push({ type: 'doubleEdge', name: 'Double Edge', value: PROJECT_MODIFIERS.DOUBLE_EDGE });
        break;
      case 'bane':
        total += PROJECT_MODIFIERS.BANE;
        applied.push({ type: 'bane', name: 'Bane', value: PROJECT_MODIFIERS.BANE });
        break;
      case 'doubleBane':
        total += PROJECT_MODIFIERS.DOUBLE_BANE;
        applied.push({ type: 'doubleBane', name: 'Double Bane', value: PROJECT_MODIFIERS.DOUBLE_BANE });
        break;
    }

    switch (languageBarrier) {
      case 'related':
        total += PROJECT_MODIFIERS.RELATED_LANGUAGE_BARRIER;
        applied.push({ type: 'languageBarrier', name: 'Related Language', value: PROJECT_MODIFIERS.RELATED_LANGUAGE_BARRIER });
        break;
      case 'unknown':
        total += PROJECT_MODIFIERS.UNKNOWN_LANGUAGE_BARRIER;
        applied.push({ type: 'languageBarrier', name: 'Unknown Language', value: PROJECT_MODIFIERS.UNKNOWN_LANGUAGE_BARRIER });
        break;
    }

    return { totalModifier: total, appliedModifiers: applied };
  }, [skillBonusActive, edgeBaneState, languageBarrier]);

  const handleRoll = () => {
    onRoll(totalModifier, appliedModifiers);
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{project.customName || project.name}</h1>
        <span className="detail-subtitle" style={{ textTransform: 'capitalize' }}>
          {project.type} Project
        </span>
      </header>

      {/* Status and Progress */}
      <section className="detail-section">
        <div className="detail-stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="detail-stat">
            <span className="detail-stat-label">Status</span>
            <span className="detail-stat-value" style={{ color: statusConfig.color }}>
              {statusConfig.label}
            </span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Goal</span>
            <span className="detail-stat-value">{project.goal} PP</span>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="detail-section">
        <h2 className="detail-section-title">Progress</h2>
        <ProjectProgressBar current={project.currentPoints} goal={project.goal} />
      </section>

      {/* Template Details */}
      {template && (
        <section className="detail-section">
          <h2 className="detail-section-title">Details</h2>
          <p className="detail-text">{template.description}</p>

          {template.applicableSkills.length > 0 && (
            <div className="project-applicable-skills">
              <span className="skills-label">Applicable Skills:</span>
              <div className="skills-list">
                {template.applicableSkills.map(skill => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {template.outcome && (
            <div className="project-outcome">
              <span className="outcome-label">Outcome:</span>
              <span className="outcome-text">{template.outcome}</span>
            </div>
          )}
        </section>
      )}

      {/* Modifier Controls */}
      {!isCompleted && (
        <section className="detail-section">
          <h2 className="detail-section-title">Roll Modifiers</h2>
          <div className="project-modifiers">
            {/* Skill Bonus Toggle */}
            {template && template.applicableSkills.length > 0 && (
              <div className="modifier-row">
                <label className="modifier-label">
                  <input
                    type="checkbox"
                    checked={skillBonusActive}
                    onChange={(e) => setSkillBonusActive(e.target.checked)}
                  />
                  Applicable Skill (+2)
                </label>
              </div>
            )}

            {/* Edge/Bane Selector */}
            <div className="modifier-row">
              <span className="modifier-label-text">Edge/Bane:</span>
              <div className="edge-bane-buttons">
                {(['doubleBane', 'bane', 'normal', 'edge', 'doubleEdge'] as EdgeBaneState[]).map(state => (
                  <button
                    key={state}
                    className={`edge-bane-btn ${edgeBaneState === state ? 'active' : ''} ${state}`}
                    onClick={() => setEdgeBaneState(state)}
                  >
                    {getEdgeBaneLabel(state)}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Barrier (for research projects) */}
            {project.type === 'research' && (
              <div className="modifier-row">
                <span className="modifier-label-text">Language Barrier:</span>
                <select
                  value={languageBarrier}
                  onChange={(e) => setLanguageBarrier(e.target.value as LanguageBarrier)}
                  className="language-barrier-select"
                >
                  <option value="none">None</option>
                  <option value="related">Related Language (−2)</option>
                  <option value="unknown">Unknown Language (−4)</option>
                </select>
              </div>
            )}

            {/* Total Modifier Display */}
            <div className="modifier-total">
              Total Modifier: {totalModifier >= 0 ? '+' : ''}{totalModifier}
            </div>
          </div>
        </section>
      )}

      {/* Roll Button and Last Result */}
      {!isCompleted && (
        <section className="detail-section">
          <div className="project-roll-section">
            <button
              className={`project-roll-btn ${isRolling ? 'rolling' : ''}`}
              onClick={handleRoll}
              disabled={isRolling}
            >
              <Dices size={16} />
              <span>
                {isRolling ? 'Rolling...' : `Roll d20${totalModifier !== 0 ? (totalModifier > 0 ? ` +${totalModifier}` : ` ${totalModifier}`) : ''}`}
              </span>
            </button>

            {lastRoll && (
              <div className={`project-last-roll ${lastRoll.isBreakthrough ? 'breakthrough' : ''}`}>
                <div className="project-last-roll-result">
                  <span className="project-last-roll-value">{lastRoll.total}</span>
                  <span className="project-last-roll-breakdown">
                    ({lastRoll.baseRoll}{lastRoll.modifier !== 0 && (
                      <>{lastRoll.modifier > 0 ? '+' : ''}{lastRoll.modifier}</>
                    )})
                  </span>
                </div>
                {lastRoll.isBreakthrough && (
                  <span className="project-breakthrough-badge">Breakthrough!</span>
                )}
                {lastRoll.bonusRollTotal && (
                  <span className="project-bonus-roll">+{lastRoll.bonusRollTotal} bonus</span>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dates */}
      <section className="detail-section">
        <h2 className="detail-section-title">Timeline</h2>
        <ul className="detail-list">
          <li>Started: {formatDate(project.createdAt)}</li>
          {project.completedAt && (
            <li>Completed: {formatDate(project.completedAt)}</li>
          )}
        </ul>
      </section>

      {/* Roll History */}
      {project.rollHistory && project.rollHistory.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Roll History</h2>
          <div className="project-roll-history">
            {project.rollHistory.slice(-5).reverse().map((roll, index) => (
              <div key={index} className="project-roll">
                <div className="project-roll-result">
                  <span className="project-roll-base">{roll.baseRoll}</span>
                  {roll.modifier !== 0 && (
                    <span className="project-roll-mod">
                      {roll.modifier > 0 ? '+' : ''}{roll.modifier}
                    </span>
                  )}
                  <span className="project-roll-total">= {roll.total}</span>
                  {roll.isBreakthrough && (
                    <span className="project-roll-breakthrough">Breakthrough!</span>
                  )}
                </div>
                {roll.bonusRollTotal && (
                  <div className="project-roll-bonus">
                    +{roll.bonusRollTotal} bonus points
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notes */}
      {project.notes && (
        <section className="detail-section">
          <h2 className="detail-section-title">Notes</h2>
          <p className="detail-text">{project.notes}</p>
        </section>
      )}

      {/* Actions */}
      {!isCompleted && (
        <section className="detail-section project-actions">
          <button
            className="project-action-btn danger"
            onClick={onAbandon}
          >
            <Trash2 size={14} />
            Abandon Project
          </button>
        </section>
      )}
    </div>
  );
}

// ============================================
// COMPENDIUM TEMPLATE DISPLAY
// ============================================

interface CompendiumTemplateDisplayProps {
  template: ProjectTemplate;
  onStartProject: (goal: number, customName: string) => void;
}

function CompendiumTemplateDisplay({ template, onStartProject }: CompendiumTemplateDisplayProps) {
  const [customGoal, setCustomGoal] = useState(template.fixedGoal || template.goalRange?.min || 100);
  const [customName, setCustomName] = useState('');

  const handleStartProject = () => {
    onStartProject(template.fixedGoal || customGoal, customName);
  };

  // Format characteristic display
  const formatCharacteristic = () => {
    if (!template.characteristic) return null;
    if (Array.isArray(template.characteristic)) {
      return template.characteristic.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
    }
    return template.characteristic.charAt(0).toUpperCase() + template.characteristic.slice(1);
  };

  return (
    <div className="detail-content">
      <header className="detail-header">
        <h1 className="detail-title">{template.name}</h1>
        <span className="detail-subtitle" style={{ textTransform: 'capitalize' }}>
          {template.type} Project
        </span>
      </header>

      {/* Description */}
      <section className="detail-section">
        <h2 className="detail-section-title">Description</h2>
        <p className="detail-text">{template.description}</p>
      </section>

      {/* Goal */}
      <section className="detail-section">
        <h2 className="detail-section-title">Project Goal</h2>
        {template.fixedGoal ? (
          <div className="project-goal-fixed">
            <span className="goal-value">{template.fixedGoal}</span>
            <span className="goal-unit">Project Points</span>
          </div>
        ) : (
          <div className="project-goal-variable">
            <div className="goal-formula">
              {template.variableGoalFormula || `${template.goalRange?.min}–${template.goalRange?.max}`}
            </div>
            <div className="goal-input-row">
              <label className="goal-label">Set Goal:</label>
              <input
                type="number"
                value={customGoal}
                onChange={(e) => setCustomGoal(parseInt(e.target.value) || 0)}
                min={template.goalRange?.min || 1}
                max={template.goalRange?.max || 10000}
                className="goal-input"
              />
              <span className="goal-unit">PP</span>
            </div>
          </div>
        )}
      </section>

      {/* Characteristic */}
      {template.characteristic && (
        <section className="detail-section">
          <h2 className="detail-section-title">Roll Characteristic</h2>
          <p className="detail-text">{formatCharacteristic()}</p>
        </section>
      )}

      {/* Prerequisites */}
      {template.prerequisites && (
        <section className="detail-section">
          <h2 className="detail-section-title">Prerequisites</h2>
          <p className="detail-text">{template.prerequisites}</p>
        </section>
      )}

      {/* Applicable Skills */}
      {template.applicableSkills.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-section-title">Applicable Skills (+2 bonus)</h2>
          <div className="skills-list">
            {template.applicableSkills.map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Outcome */}
      <section className="detail-section">
        <h2 className="detail-section-title">Outcome</h2>
        <p className="detail-text">{template.outcome}</p>
      </section>

      {/* Start Project Form */}
      <section className="detail-section project-start-form">
        <h2 className="detail-section-title">Start This Project</h2>
        <div className="start-form-fields">
          <div className="form-field">
            <label>Custom Name (optional)</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={template.name}
              className="name-input"
            />
          </div>
        </div>
        <button
          className="project-start-btn"
          onClick={handleStartProject}
        >
          Start Project
        </button>
      </section>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ProjectsDetailPane() {
  const { hero, updateHero } = useHeroContext();
  const { selectedItemId, setSelectedItem } = useNavigation();
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<ProjectRoll | null>(null);

  // Parse selection ID to determine type
  const parsedSelection = useMemo(() => {
    if (!selectedItemId) return null;

    if (selectedItemId.startsWith('active:')) {
      return { type: 'active' as const, id: selectedItemId.replace('active:', '') };
    }

    if (selectedItemId.startsWith('compendium:')) {
      return { type: 'compendium' as const, id: selectedItemId.replace('compendium:', '') };
    }

    // Legacy support - try to find in activeProjects
    return { type: 'active' as const, id: selectedItemId };
  }, [selectedItemId]);

  // Find the relevant data
  const project = useMemo(() => {
    if (!parsedSelection || parsedSelection.type !== 'active' || !hero) return null;
    return hero.activeProjects?.find((p) => p.id === parsedSelection.id);
  }, [parsedSelection, hero]);

  const template = useMemo(() => {
    if (!parsedSelection) return null;

    if (parsedSelection.type === 'compendium') {
      return PROJECT_TEMPLATES.find(t => t.id === parsedSelection.id);
    }

    if (project) {
      return getProjectTemplate(project.templateId);
    }

    return null;
  }, [parsedSelection, project]);

  // Handle roll for active projects
  const handleRoll = useCallback((modifier: number, appliedModifiers: AppliedModifier[]) => {
    if (!hero || !project || isRolling) return;

    setIsRolling(true);

    setTimeout(() => {
      const { baseRoll, isBreakthrough } = rollProjectDie();
      const rawTotal = baseRoll + modifier;
      const total = Math.max(rawTotal, 1); // Minimum 1

      // Breakthrough: roll again and add
      let bonusRollTotal: number | undefined;
      if (isBreakthrough) {
        const bonusRoll = Math.floor(Math.random() * 20) + 1;
        const bonusRaw = bonusRoll + modifier;
        bonusRollTotal = Math.max(bonusRaw, 1);
      }

      const newRoll: ProjectRoll = {
        timestamp: Date.now(),
        baseRoll,
        modifier,
        total,
        isBreakthrough,
        bonusRollTotal,
        appliedModifiers,
      };

      setLastRoll(newRoll);

      // Calculate total points gained
      const pointsGained = total + (bonusRollTotal || 0);
      const newPoints = project.currentPoints + pointsGained;
      const isCompleted = newPoints >= project.goal;

      const updatedProjects = hero.activeProjects?.map((p) => {
        if (p.id === project.id) {
          return {
            ...p,
            currentPoints: Math.min(newPoints, p.goal),
            status: isCompleted ? 'completed' as const : 'in_progress' as const,
            completedAt: isCompleted ? Date.now() : undefined,
            rollHistory: [...(p.rollHistory || []), newRoll],
          };
        }
        return p;
      });

      updateHero({ activeProjects: updatedProjects });
      setIsRolling(false);
    }, 300);
  }, [hero, project, isRolling, updateHero]);

  // Handle abandon project
  const handleAbandonProject = useCallback(() => {
    if (!hero || !project) return;

    if (!window.confirm(`Are you sure you want to abandon "${project.customName || project.name}"? This cannot be undone.`)) {
      return;
    }

    const updatedProjects = hero.activeProjects?.filter(p => p.id !== project.id);
    updateHero({ activeProjects: updatedProjects });
    setSelectedItem(null);
  }, [hero, project, updateHero, setSelectedItem]);

  // Handle start project from compendium
  const handleStartProject = useCallback((goal: number, customName: string) => {
    if (!hero || !template) return;

    const newProject: ActiveProject = {
      id: `project-${Date.now()}`,
      templateId: template.id,
      name: template.name,
      customName: customName || undefined,
      type: template.type,
      goal,
      currentPoints: 0,
      status: 'in_progress',
      notes: '',
      rollHistory: [],
      createdAt: Date.now(),
    };

    updateHero({
      activeProjects: [...(hero.activeProjects || []), newProject],
    });

    // Select the newly created project
    setSelectedItem(`active:${newProject.id}`);
  }, [hero, template, updateHero, setSelectedItem]);

  // Render based on selection type
  if (!parsedSelection || !hero) {
    return <EmptyState />;
  }

  if (parsedSelection.type === 'compendium' && template) {
    return (
      <CompendiumTemplateDisplay
        template={template}
        onStartProject={handleStartProject}
      />
    );
  }

  if (parsedSelection.type === 'active' && project) {
    return (
      <ActiveProjectDisplay
        project={project}
        template={template || undefined}
        onRoll={handleRoll}
        onAbandon={handleAbandonProject}
        isRolling={isRolling}
        lastRoll={lastRoll}
      />
    );
  }

  return <EmptyState />;
}

export default ProjectsDetailPane;
