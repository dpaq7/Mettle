import { GameData, type SkillGroup } from '@/lib/game-rules';
import { BookOpen, Award, AlertCircle, List } from 'lucide-react';
import { RulesLink } from '@/components/shared/RulesLink';
import { parseSkillGroup, getSkillsByGroup } from '@/data/skills';

interface SkillRulesDetailProps {
  skillId: string;
}

export function SkillRulesDetail({ skillId }: SkillRulesDetailProps) {
  // Try to find skill by ID first, then by name (for flexibility)
  const skill = GameData.getSkillById(skillId) || GameData.findSkillByName(skillId);

  // If not found as individual skill, check if it's a skill group
  const skillGroupId = !skill ? parseSkillGroup(skillId) : null;
  const isGroup = skillGroupId !== null;

  // Handle skill group display
  if (isGroup && skillGroupId) {
    const groupInfo = GameData.getSkillGroupInfo(skillGroupId);
    const skillsInGroup = getSkillsByGroup(skillGroupId);

    return (
      <div className="rules-detail">
        {/* Header */}
        <header className="rules-detail-header">
          <h1 className="rules-detail-title">{groupInfo.name}</h1>
          <span className="rules-detail-subtitle">Skill Group</span>
        </header>

        {/* Description */}
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">Description</h2>
          <p className="rules-detail-text">{groupInfo.description}</p>
        </section>

        {/* Rewards */}
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">
            <Award size={14} className="inline mr-1" />
            Possible Rewards
          </h2>
          <div className="skill-outcome-box success">
            <p className="rules-detail-text">{groupInfo.rewards}</p>
          </div>
        </section>

        {/* Consequences */}
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">
            <AlertCircle size={14} className="inline mr-1" />
            Possible Consequences
          </h2>
          <div className="skill-outcome-box danger">
            <p className="rules-detail-text">{groupInfo.consequences}</p>
          </div>
        </section>

        {/* Skills in this Group */}
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">
            <List size={14} className="inline mr-1" />
            Skills in this Group
          </h2>
          <ul className="rules-detail-list">
            {skillsInGroup.map((s) => (
              <li key={s.id} className="rules-detail-list-item">
                <RulesLink type="skill" id={s.id}>
                  <strong>{s.name}</strong>
                </RulesLink>
                <span className="text-muted-foreground"> — {s.use}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skill Test Info */}
        <section className="rules-detail-section">
          <h2 className="rules-detail-section-title">
            <BookOpen size={14} className="inline mr-1" />
            Making Skill Tests
          </h2>
          <div className="rules-detail-note">
            <p>
              Skill tests are made by rolling 2d10 + the relevant characteristic modifier.
              The Director sets the difficulty based on the task's complexity.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Handle unknown skill (not a group, not an individual skill)
  if (!skill) {
    return (
      <div className="rules-detail">
        <div className="rules-detail-header">
          <h1 className="rules-detail-title">Unknown Skill</h1>
          <span className="rules-detail-subtitle">Skill</span>
        </div>
        <p className="rules-detail-text">
          No information available for skill: {skillId}
        </p>
      </div>
    );
  }

  // Individual skill display (existing code)
  const groupInfo = GameData.getSkillGroupInfo(skill.group as SkillGroup);

  return (
    <div className="rules-detail">
      {/* Header */}
      <header className="rules-detail-header">
        <h1 className="rules-detail-title">{skill.name}</h1>
        <span className="rules-detail-subtitle">{groupInfo.name} Skill</span>
      </header>

      {/* Use */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Use</h2>
        <p className="rules-detail-text">{skill.use}</p>
      </section>

      {/* Description */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">Description</h2>
        <p className="rules-detail-text">{skill.description}</p>
      </section>

      {/* Skill Group Info */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">About {groupInfo.name} Skills</h2>
        <p className="rules-detail-text">{groupInfo.description}</p>
      </section>

      {/* Rewards */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">
          <Award size={14} className="inline mr-1" />
          Possible Rewards
        </h2>
        <div className="skill-outcome-box success">
          <p className="rules-detail-text">{groupInfo.rewards}</p>
        </div>
      </section>

      {/* Consequences */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">
          <AlertCircle size={14} className="inline mr-1" />
          Possible Consequences
        </h2>
        <div className="skill-outcome-box danger">
          <p className="rules-detail-text">{groupInfo.consequences}</p>
        </div>
      </section>

      {/* Skill Test Info */}
      <section className="rules-detail-section">
        <h2 className="rules-detail-section-title">
          <BookOpen size={14} className="inline mr-1" />
          Making Skill Tests
        </h2>
        <div className="rules-detail-note">
          <p>
            Skill tests are made by rolling 2d10 + the relevant characteristic modifier.
            The Director sets the difficulty based on the task's complexity.
          </p>
        </div>
      </section>
    </div>
  );
}

export default SkillRulesDetail;
