import React from 'react';
import {
  Hero,
  isCensorHero,
  isConduitHero,
  isElementalistHero,
  isFuryHero,
  isNullHero,
  isShadowHero,
  isSummonerHero,
  isTacticianHero,
  isTalentHero,
  isTroubadourHero,
} from '../../../types/hero';
import { CensorWidget } from './CensorWidget';
import { ConduitWidget } from './ConduitWidget';
import { ElementalistWidget } from './ElementalistWidget';
import { FuryWidget } from './FuryWidget';
import { NullWidget } from './NullWidget';
import { ShadowWidget } from './ShadowWidget';
import { SummonerWidget } from './SummonerWidget';
import { TacticianWidget } from './TacticianWidget';
import { TalentWidget } from './TalentWidget';
import { TroubadourWidget } from './TroubadourWidget';
import './ClassWidgets.css';

interface ClassAbilityWidgetProps {
  hero: Hero;
}

/**
 * ClassAbilityWidget - Routes to the appropriate class-specific widget
 * based on the hero's class type
 */
export const ClassAbilityWidget: React.FC<ClassAbilityWidgetProps> = ({ hero }) => {
  if (isCensorHero(hero)) {
    return <CensorWidget hero={hero} />;
  }

  if (isConduitHero(hero)) {
    return <ConduitWidget hero={hero} />;
  }

  if (isElementalistHero(hero)) {
    return <ElementalistWidget hero={hero} />;
  }

  if (isFuryHero(hero)) {
    return <FuryWidget hero={hero} />;
  }

  if (isNullHero(hero)) {
    return <NullWidget hero={hero} />;
  }

  if (isShadowHero(hero)) {
    return <ShadowWidget hero={hero} />;
  }

  if (isSummonerHero(hero)) {
    return <SummonerWidget hero={hero} />;
  }

  if (isTacticianHero(hero)) {
    return <TacticianWidget hero={hero} />;
  }

  if (isTalentHero(hero)) {
    return <TalentWidget hero={hero} />;
  }

  if (isTroubadourHero(hero)) {
    return <TroubadourWidget hero={hero} />;
  }

  // Fallback for unknown class
  return null;
};

export default ClassAbilityWidget;
