import { useMemo, useState } from 'react';
import { useHeroContext } from '@/context/HeroContext';
import { useNavigation } from '@/context/NavigationContext';
import { MasterList, MasterListSection, MasterListItem } from '@/components/layout/MasterList';
import { PROJECT_TEMPLATES, getProjectsByType } from '@/data/projects';
import type { ProjectType } from '@/types/projects';
import '../inventory/InventoryDetailPane.css';

type CompendiumCategory = 'all' | ProjectType;

export function ProjectsMasterList() {
  const { hero } = useHeroContext();
  const { selectedItemId, setSelectedItem } = useNavigation();
  const [compendiumCategory, setCompendiumCategory] = useState<CompendiumCategory>('all');

  // Get compendium items based on filter
  const compendiumItems = useMemo(() => {
    switch (compendiumCategory) {
      case 'research':
        return getProjectsByType('research');
      case 'crafting':
        return getProjectsByType('crafting');
      case 'other':
        return getProjectsByType('other');
      default:
        return PROJECT_TEMPLATES;
    }
  }, [compendiumCategory]);

  if (!hero) {
    return (
      <MasterList>
        <div className="p-4 text-center text-[var(--text-muted)]">
          No character loaded
        </div>
      </MasterList>
    );
  }

  const projects = hero.activeProjects || [];
  const activeProjects = projects.filter(p => p.status !== 'completed');
  const completedProjects = projects.filter(p => p.status === 'completed');

  // Format goal display for compendium items
  const formatGoal = (template: typeof PROJECT_TEMPLATES[0]) => {
    if (template.fixedGoal) {
      return `${template.fixedGoal} PP`;
    }
    if (template.goalRange) {
      return 'Variable';
    }
    return '';
  };

  return (
    <MasterList>
      {/* Active Projects Section */}
      <MasterListSection label="Active Projects">
        {activeProjects.length === 0 ? (
          <div className="p-3 text-center text-[var(--text-muted)] text-sm">
            No active projects
          </div>
        ) : (
          activeProjects.map(project => (
            <MasterListItem
              key={project.id}
              label={project.customName || project.name}
              progress={{ current: project.currentPoints, total: project.goal }}
              selected={selectedItemId === `active:${project.id}`}
              onClick={() => setSelectedItem(`active:${project.id}`)}
            />
          ))
        )}
      </MasterListSection>

      {/* Completed Projects Section */}
      {completedProjects.length > 0 && (
        <MasterListSection label="Completed">
          {completedProjects.map(project => (
            <MasterListItem
              key={project.id}
              label={project.customName || project.name}
              completed
              selected={selectedItemId === `active:${project.id}`}
              onClick={() => setSelectedItem(`active:${project.id}`)}
            />
          ))}
        </MasterListSection>
      )}

      {/* Compendium Section */}
      <MasterListSection label="Project Compendium">
        {/* Category Filters */}
        <div className="compendium-filters">
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'all' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('all')}
          >
            All
          </button>
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'research' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('research')}
          >
            Research
          </button>
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'crafting' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('crafting')}
          >
            Crafting
          </button>
          <button
            className={`compendium-filter-btn ${compendiumCategory === 'other' ? 'active' : ''}`}
            onClick={() => setCompendiumCategory('other')}
          >
            Other
          </button>
        </div>

        {/* Compendium Items */}
        {compendiumItems.map((template) => (
          <MasterListItem
            key={template.id}
            label={template.name}
            value={formatGoal(template)}
            selected={selectedItemId === `compendium:${template.id}`}
            onClick={() => setSelectedItem(`compendium:${template.id}`)}
          />
        ))}
      </MasterListSection>
    </MasterList>
  );
}

export default ProjectsMasterList;
