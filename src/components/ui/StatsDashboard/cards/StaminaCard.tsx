import * as React from 'react';
import { Heart, Pin, Minus, Plus, AlertTriangle, Skull } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/shadcn/tooltip';

import type { StaminaCardProps } from '../types';

export const StaminaCard: React.FC<StaminaCardProps> = ({
  current,
  max,
  tempStamina = 0,
  winded,
  onChange,
  onUnpin,
}) => {
  // Death threshold is negative half max stamina
  const deathThreshold = -Math.floor(max / 2);
  const percentage = Math.max(0, (current / max) * 100);
  const isWinded = current <= winded && current > 0;
  const isDying = current <= 0 && current > deathThreshold;
  const isDead = current <= deathThreshold;
  const isCritical = percentage < 10 && current > 0;

  return (
    <div
      className={`stat-card stamina-card ${isWinded ? 'winded' : ''} ${isCritical ? 'critical' : ''} ${isDying ? 'dying' : ''} ${isDead ? 'dead' : ''}`}
    >
      {/* Header */}
      <div className="stat-card-header">
        <div className="stat-card-title">
          {isDead ? <Skull className="stat-card-icon" /> : <Heart className="stat-card-icon" />}
          <span>{isDead ? 'DEAD' : isDying ? 'Dying' : 'Stamina'}</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="unpin-btn" onClick={onUnpin}>
              <Pin className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Unpin</TooltipContent>
        </Tooltip>
      </div>

      {/* Content */}
      <div className="stat-card-content">
        {/* Large Value Display */}
        <div className="stamina-value-display">
          <span className={`stamina-current ${current < 0 ? 'negative' : ''}`}>{current}</span>
          <span className="stamina-divider">/</span>
          <span className="stamina-max">{max}</span>
        </div>

        {/* Progress Bar with Winded Marker and Death Zone */}
        <div className="stamina-bar-wrapper">
          <div className="stamina-progress">
            <div
              className="stamina-progress-fill"
              style={{ width: `${percentage}%` }}
            />
            {/* Show negative stamina as a red extension */}
            {current < 0 && (
              <div
                className="stamina-negative-fill"
                style={{ width: `${Math.min(100, Math.abs(current / deathThreshold) * 100)}%` }}
              />
            )}
          </div>
          <div
            className="winded-marker"
            style={{ left: `${(winded / max) * 100}%` }}
            title={`Winded threshold: ${winded}`}
          />
        </div>

        {/* Controls */}
        <div className="stamina-controls">
          <div className="control-group">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(Math.max(deathThreshold, current - 5))}
              disabled={isDead}
              className="adjust-btn"
            >
              −5
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onChange(Math.max(deathThreshold, current - 1))}
              disabled={isDead}
              className="adjust-btn"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          <div className="control-group">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onChange(Math.min(max, current + 1))}
              disabled={current >= max}
              className="adjust-btn"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(Math.min(max, current + 5))}
              disabled={current >= max}
              className="adjust-btn"
            >
              +5
            </Button>
          </div>
        </div>

        {/* Status Row */}
        <div className="stamina-status">
          <div className="status-item">
            <span className="status-label">Winded</span>
            <span className="status-value">{winded}</span>
          </div>

          <div className="status-item death">
            <span className="status-label">Death</span>
            <span className="status-value">{deathThreshold}</span>
          </div>

          {tempStamina > 0 && (
            <div className="status-item temp">
              <span className="status-label">Temp</span>
              <span className="status-value">+{tempStamina}</span>
            </div>
          )}

          {isWinded && !isDying && !isDead && (
            <div className="winded-badge">
              <AlertTriangle className="w-3 h-3" />
              WINDED
            </div>
          )}

          {isDying && (
            <div className="dying-badge">
              <Skull className="w-3 h-3" />
              DYING
            </div>
          )}

          {isDead && (
            <div className="dead-badge">
              <Skull className="w-3 h-3" />
              DEAD
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaminaCard;
