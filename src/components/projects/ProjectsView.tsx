import React, { useState } from 'react';
import { useSummonerContext } from '../../context/HeroContext';
import { ActiveProject, ProjectTemplate, ProjectRoll } from '../../types/projects';
import { PROJECT_TEMPLATES, BREAKTHROUGH_THRESHOLD, PROJECT_MODIFIERS, getProjectsByType } from '../../data/projects';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
  ScrollArea,
  Badge,
} from '@/components/ui/shadcn';
import { Plus, Beaker, Hammer, Sparkles, Play, X, ChevronDown, ChevronRight, Trash2, Dice6 } from 'lucide-react';
import './ProjectsView.css';

const ProjectsView: React.FC = () => {
  const { hero, updateHero } = useSummonerContext();
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [customGoal, setCustomGoal] = useState<number>(100);
  const [projectName, setProjectName] = useState('');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [rollModifiers, setRollModifiers] = useState<Record<string, number>>({});

  if (!hero) return null;

  const activeProjects = hero.activeProjects || [];

  const startNewProject = () => {
    if (!selectedTemplate) return;

    const goal = selectedTemplate.fixedGoal || customGoal;
    const name = projectName || selectedTemplate.name;

    const newProject: ActiveProject = {
      id: `project-${Date.now()}`,
      templateId: selectedTemplate.id,
      name,
      type: selectedTemplate.type,
      goal,
      currentPoints: 0,
      status: 'in_progress',
      notes: '',
      rollHistory: [],
      createdAt: Date.now(),
    };

    updateHero({
      activeProjects: [...activeProjects, newProject],
    });

    setShowNewProject(false);
    setSelectedTemplate(null);
    setProjectName('');
    setCustomGoal(100);
  };

  const makeProjectRoll = (projectId: string) => {
    const project = activeProjects.find(p => p.id === projectId);
    if (!project || project.status === 'completed') return;

    const modifier = rollModifiers[projectId] || 0;

    // Roll 2d10
    const die1 = Math.floor(Math.random() * 10) + 1;
    const die2 = Math.floor(Math.random() * 10) + 1;
    const baseRoll = die1 + die2;
    const naturalRoll = baseRoll; // For breakthrough check
    const total = Math.max(1, baseRoll + modifier); // Minimum 1

    const isBreakthrough = die1 >= 10 || die2 >= 10; // Natural 10 on either die

    let bonusRollTotal: number | undefined;
    if (isBreakthrough) {
      // Breakthrough: make a second roll
      const bonusDie1 = Math.floor(Math.random() * 10) + 1;
      const bonusDie2 = Math.floor(Math.random() * 10) + 1;
      bonusRollTotal = Math.max(1, bonusDie1 + bonusDie2 + modifier);
    }

    const roll: ProjectRoll = {
      timestamp: Date.now(),
      baseRoll,
      modifier,
      total,
      isBreakthrough,
      bonusRollTotal,
    };

    const totalPoints = total + (bonusRollTotal || 0);
    const newCurrentPoints = project.currentPoints + totalPoints;
    const newStatus = newCurrentPoints >= project.goal ? 'completed' : 'in_progress';

    const updatedProject: ActiveProject = {
      ...project,
      currentPoints: newCurrentPoints,
      status: newStatus,
      rollHistory: [...project.rollHistory, roll],
      completedAt: newStatus === 'completed' ? Date.now() : undefined,
    };

    updateHero({
      activeProjects: activeProjects.map(p => p.id === projectId ? updatedProject : p),
    });
  };

  const updateProjectNotes = (projectId: string, notes: string) => {
    updateHero({
      activeProjects: activeProjects.map(p => p.id === projectId ? { ...p, notes } : p),
    });
  };

  const deleteProject = (projectId: string) => {
    updateHero({
      activeProjects: activeProjects.filter(p => p.id !== projectId),
    });
  };

  const adjustModifier = (projectId: string, delta: number) => {
    setRollModifiers(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + delta,
    }));
  };

  const inProgressProjects = activeProjects.filter(p => p.status === 'in_progress');
  const completedProjects = activeProjects.filter(p => p.status === 'completed');

  return (
    <div className="projects-view">
      <div className="projects-header">
        <h2>Downtime Projects</h2>
        <button className="new-project-btn" onClick={() => setShowNewProject(true)}>
          + New Project
        </button>
      </div>

      {/* Project Mechanics Reference */}
      <div className="mechanics-reference">
        <h3>Project Mechanics</h3>
        <div className="mechanics-grid">
          <div className="mechanic">
            <span className="mechanic-label">Project Roll</span>
            <span className="mechanic-value">2d10 + modifiers (min 1)</span>
          </div>
          <div className="mechanic">
            <span className="mechanic-label">Breakthrough</span>
            <span className="mechanic-value">Natural 10 on either die = second roll</span>
          </div>
          <div className="mechanic">
            <span className="mechanic-label">Applicable Skill</span>
            <span className="mechanic-value">+2 bonus</span>
          </div>
          <div className="mechanic">
            <span className="mechanic-label">Edge / Double Edge</span>
            <span className="mechanic-value">+2 / +4 bonus</span>
          </div>
          <div className="mechanic">
            <span className="mechanic-label">Bane / Double Bane</span>
            <span className="mechanic-value">-2 / -4 penalty</span>
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="projects-section">
        <h3>Active Projects ({inProgressProjects.length})</h3>
        {inProgressProjects.length === 0 ? (
          <p className="no-projects">No active projects. Start a new project during your respite!</p>
        ) : (
          <div className="projects-list">
            {inProgressProjects.map(project => (
              <div key={project.id} className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}>
                <div className="project-header" onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
                  <div className="project-info">
                    <span className={`project-type ${project.type}`}>{project.type}</span>
                    <h4>{project.name}</h4>
                  </div>
                  <div className="project-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${Math.min(100, (project.currentPoints / project.goal) * 100)}%` }}
                      />
                    </div>
                    <span className="progress-text">{project.currentPoints} / {project.goal} PP</span>
                  </div>
                  <span className="expand-icon">{expandedProject === project.id ? '▼' : '▶'}</span>
                </div>

                {expandedProject === project.id && (
                  <div className="project-details">
                    <div className="roll-controls">
                      <div className="modifier-control">
                        <span className="modifier-label">Modifier:</span>
                        <button onClick={() => adjustModifier(project.id, -2)}>-2</button>
                        <span className="modifier-value">
                          {(rollModifiers[project.id] || 0) >= 0 ? '+' : ''}{rollModifiers[project.id] || 0}
                        </span>
                        <button onClick={() => adjustModifier(project.id, 2)}>+2</button>
                      </div>
                      <button className="roll-btn" onClick={() => makeProjectRoll(project.id)}>
                        Make Project Roll
                      </button>
                    </div>

                    {/* Roll History */}
                    {project.rollHistory.length > 0 && (
                      <div className="roll-history">
                        <h5>Roll History</h5>
                        <div className="rolls-list">
                          {project.rollHistory.slice(-5).reverse().map((roll, idx) => (
                            <div key={idx} className={`roll-entry ${roll.isBreakthrough ? 'breakthrough' : ''}`}>
                              <span className="roll-result">
                                {roll.baseRoll}{roll.modifier !== 0 ? ` ${roll.modifier >= 0 ? '+' : ''}${roll.modifier}` : ''} = {roll.total}
                              </span>
                              {roll.isBreakthrough && (
                                <span className="breakthrough-badge">
                                  Breakthrough! +{roll.bonusRollTotal}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div className="project-notes">
                      <h5>Notes</h5>
                      <textarea
                        value={project.notes}
                        onChange={(e) => updateProjectNotes(project.id, e.target.value)}
                        placeholder="Add notes about this project..."
                      />
                    </div>

                    <div className="project-actions">
                      <button className="delete-btn" onClick={() => deleteProject(project.id)}>
                        Abandon Project
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div className="projects-section completed-section">
          <h3>Completed Projects ({completedProjects.length})</h3>
          <div className="projects-list">
            {completedProjects.map(project => (
              <div key={project.id} className="project-card completed">
                <div className="project-header">
                  <div className="project-info">
                    <span className={`project-type ${project.type}`}>{project.type}</span>
                    <h4>{project.name}</h4>
                  </div>
                  <div className="completed-badge">Completed</div>
                  <button className="delete-btn small" onClick={() => deleteProject(project.id)}>×</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Project Modal */}
      <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
        <DialogContent variant="fantasy" className="new-project-dialog max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-[var(--accent-primary)]" />
              Start New Project
            </DialogTitle>
            <DialogDescription>
              Select a project template to begin
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[350px] pr-2">
            <div className="template-sections-new">
              {(['research', 'crafting', 'other'] as const).map(type => {
                const TypeIcon = type === 'research' ? Beaker : type === 'crafting' ? Hammer : Sparkles;
                return (
                  <div key={type} className="template-section-new">
                    <div className="flex items-center gap-2 mb-2">
                      <TypeIcon className="h-4 w-4 text-[var(--accent-primary)]" />
                      <span className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)]">
                        {type} Projects
                      </span>
                    </div>
                    <div className="space-y-1">
                      {getProjectsByType(type).map(template => (
                        <div
                          key={template.id}
                          className={`template-option-new ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <span className="template-name-new">{template.name}</span>
                          <Badge variant="outline" size="sm">
                            {template.fixedGoal || `${template.goalRange?.min}-${template.goalRange?.max}`} PP
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedTemplate && (
              <div className="project-config-new">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="project-name" className="text-sm font-medium">
                      Project Name
                    </Label>
                    <Input
                      id="project-name"
                      variant="fantasy"
                      type="text"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      placeholder={selectedTemplate.name}
                    />
                  </div>

                  {selectedTemplate.goalRange && (
                    <div className="space-y-1.5">
                      <Label htmlFor="project-goal" className="text-sm font-medium">
                        Project Goal (PP)
                      </Label>
                      <Input
                        id="project-goal"
                        variant="fantasy"
                        type="number"
                        value={customGoal}
                        onChange={e => setCustomGoal(parseInt(e.target.value) || 100)}
                        min={selectedTemplate.goalRange.min}
                        max={selectedTemplate.goalRange.max}
                      />
                    </div>
                  )}

                  <div className="template-details-new">
                    <p><strong className="text-[var(--text-primary)]">Description:</strong> {selectedTemplate.description}</p>
                    <p><strong className="text-[var(--text-primary)]">Prerequisites:</strong> {selectedTemplate.prerequisites}</p>
                    <p><strong className="text-[var(--text-primary)]">Outcome:</strong> {selectedTemplate.outcome}</p>
                    {selectedTemplate.applicableSkills.length > 0 && (
                      <p><strong className="text-[var(--text-primary)]">Applicable Skills:</strong> {selectedTemplate.applicableSkills.join(', ')}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          <DialogFooter>
            <Button variant="chamfered" onClick={() => setShowNewProject(false)}>
              Cancel
            </Button>
            <Button
              variant="heroic"
              onClick={startNewProject}
              disabled={!selectedTemplate}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsView;
