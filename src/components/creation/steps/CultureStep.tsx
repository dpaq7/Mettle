import React, { useState, useCallback, useMemo } from 'react';
import { Culture } from '@/types';
import { GameData } from '@/lib/game-rules';

interface CultureStepProps {
  selectedCulture: Culture | null;
  onSelect: (culture: Culture) => void;
}

type CultureMode = 'prebuilt' | 'custom';

export const CultureStep: React.FC<CultureStepProps> = ({ selectedCulture, onSelect }) => {
  const [mode, setMode] = useState<CultureMode>('prebuilt');
  const [customEnvironment, setCustomEnvironment] = useState<string>('');
  const [customOrganization, setCustomOrganization] = useState<string>('');
  const [customUpbringing, setCustomUpbringing] = useState<string>('');

  const environmentOptions = useMemo(() => GameData.getEnvironmentOptions(), []);
  const organizationOptions = useMemo(() => GameData.getOrganizationOptions(), []);
  const upbringingOptions = useMemo(() => GameData.getUpbringingOptions(), []);
  const prebuiltCultures = useMemo(() => GameData.getAllCultures(), []);

  // Build custom culture when all options are selected
  const customCulture = useMemo(() => {
    if (!customEnvironment || !customOrganization || !customUpbringing) {
      return null;
    }
    return GameData.buildCustomCulture(customEnvironment, customOrganization, customUpbringing);
  }, [customEnvironment, customOrganization, customUpbringing]);

  const handleCustomSelect = useCallback(() => {
    if (customCulture) {
      onSelect(customCulture);
    }
  }, [customCulture, onSelect]);

  // Check if current selection matches the custom culture
  const isCustomSelected = selectedCulture?.id?.startsWith('custom-');

  return (
    <div className="creation-step culture-step">
      <h2>Choose Your Culture</h2>

      {/* Mode Toggle */}
      <div className="culture-mode-toggle">
        <button
          type="button"
          className={`mode-btn ${mode === 'prebuilt' ? 'active' : ''}`}
          onClick={() => setMode('prebuilt')}
        >
          Quick Picks
        </button>
        <button
          type="button"
          className={`mode-btn ${mode === 'custom' ? 'active' : ''}`}
          onClick={() => setMode('custom')}
        >
          Build Custom
        </button>
      </div>

      {mode === 'prebuilt' ? (
        /* Pre-built Cultures Grid */
        <div className="options-grid">
          {prebuiltCultures.map((culture) => (
            <div
              key={culture.id}
              className={`option-card ${selectedCulture?.id === culture.id ? 'selected' : ''}`}
              onClick={() => onSelect(culture)}
            >
              <h3>{culture.name}</h3>
              <p className="description">{culture.description}</p>
              <p>
                <strong>Environment:</strong> {culture.environment.name} ({culture.environment.skills.join(', ')})
              </p>
              <p>
                <strong>Organization:</strong> {culture.organization.name}
              </p>
              <p>
                <strong>Upbringing:</strong> {culture.upbringing.name} ({culture.upbringing.skills.join(', ')})
              </p>
            </div>
          ))}
        </div>
      ) : (
        /* Custom Culture Builder */
        <div className="custom-culture-builder">
          <p className="builder-description">
            Mix and match any environment, organization, and upbringing to create your unique cultural background.
            Draw Steel allows any combination of these elements.
          </p>

          <div className="culture-selectors">
            {/* Environment Selector */}
            <div className="culture-selector">
              <label htmlFor="environment-select">Environment</label>
              <select
                id="environment-select"
                value={customEnvironment}
                onChange={(e) => setCustomEnvironment(e.target.value)}
              >
                <option value="">Select environment...</option>
                {environmentOptions.map((env) => (
                  <option key={env.type} value={env.type}>
                    {env.name} — {env.skills.join(' or ')}
                  </option>
                ))}
              </select>
              {customEnvironment && (
                <p className="selector-note">
                  Choose one skill from: {environmentOptions.find(e => e.type === customEnvironment)?.skills.join(' or ')}
                </p>
              )}
            </div>

            {/* Organization Selector */}
            <div className="culture-selector">
              <label htmlFor="organization-select">Organization</label>
              <select
                id="organization-select"
                value={customOrganization}
                onChange={(e) => setCustomOrganization(e.target.value)}
              >
                <option value="">Select organization...</option>
                {organizationOptions.map((org) => (
                  <option key={org.type} value={org.type}>
                    {org.name} — {org.skills.join(' or ')}
                  </option>
                ))}
              </select>
              {customOrganization && (
                <p className="selector-note">
                  Choose one skill from: {organizationOptions.find(o => o.type === customOrganization)?.skills.join(' or ')}
                </p>
              )}
            </div>

            {/* Upbringing Selector */}
            <div className="culture-selector">
              <label htmlFor="upbringing-select">Upbringing</label>
              <select
                id="upbringing-select"
                value={customUpbringing}
                onChange={(e) => setCustomUpbringing(e.target.value)}
              >
                <option value="">Select upbringing...</option>
                {upbringingOptions.map((upb) => (
                  <option key={upb.type} value={upb.type}>
                    {upb.name} — {upb.skills.join(', ')}
                  </option>
                ))}
              </select>
              {customUpbringing && (
                <p className="selector-note">
                  Grants: {upbringingOptions.find(u => u.type === customUpbringing)?.skills.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Custom Culture Preview */}
          {customCulture && (
            <div
              className={`custom-culture-preview ${isCustomSelected && selectedCulture?.id === customCulture.id ? 'selected' : ''}`}
              onClick={handleCustomSelect}
            >
              <h3>Your Custom Culture</h3>
              <p className="culture-name">{customCulture.name}</p>
              <div className="culture-summary">
                <p>
                  <strong>Environment:</strong> {customCulture.environment.name} ({customCulture.environment.skills.join(', ')})
                </p>
                <p>
                  <strong>Organization:</strong> {customCulture.organization.name} ({customCulture.organization.skills.join(', ')})
                </p>
                <p>
                  <strong>Upbringing:</strong> {customCulture.upbringing.name} ({customCulture.upbringing.skills.join(', ')})
                </p>
              </div>
              <button
                type="button"
                className="select-custom-btn"
                onClick={handleCustomSelect}
              >
                {isCustomSelected && selectedCulture?.id === customCulture.id ? 'Selected' : 'Select This Culture'}
              </button>
            </div>
          )}

          {!customCulture && customEnvironment && customOrganization && customUpbringing && (
            <p className="builder-error">Unable to build culture with these options.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CultureStep;
