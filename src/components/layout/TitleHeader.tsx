import { useHeroContext } from '@/context/HeroContext';
import { useCombatContext } from '@/context/CombatContext';
import { useNavigation } from '@/context/NavigationContext';
import { Swords, MoreVertical, UserPlus, Moon, RefreshCcw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { Button } from '@/components/ui/shadcn';
import './TitleHeader.css';

interface TitleHeaderProps {
  onManageCharacters: () => void;
  onCreateCharacter: () => void;
  onImportCharacter: () => void;
  onExportCharacter: () => void;
  onDuplicateCharacter: () => void;
  onRespite: () => void;
  onShowAbout: () => void;
  canRespec?: boolean;
}

export function TitleHeader({
  onManageCharacters,
  onCreateCharacter,
  onImportCharacter,
  onExportCharacter,
  onDuplicateCharacter,
  onRespite,
  onShowAbout,
  canRespec = false,
}: TitleHeaderProps) {
  const { hero } = useHeroContext();
  const { isInCombat, startCombat, endCombat } = useCombatContext();
  const { setActiveSection, setSelectedItem } = useNavigation();

  const handleCombatToggle = () => {
    if (isInCombat) {
      endCombat();
    } else {
      startCombat();
    }
  };

  return (
    <header className={`title-header ${isInCombat ? 'combat' : ''}`}>
      {/* Left side: Logo + Hero name */}
      <div className="title-header-left">
        <div className="title-header-logo">M</div>
        <h1 className="title-header-name">
          {hero?.name || 'Mettle'}
        </h1>
      </div>

      {/* Right side: Controls */}
      <div className="title-header-right">
        {hero && (
          <>
            {/* Combat Toggle */}
            <Button
              variant={isInCombat ? 'destructive' : 'ghost'}
              size="sm"
              onClick={handleCombatToggle}
              className="combat-toggle"
            >
              <Swords size={16} />
              <span>{isInCombat ? 'End Combat' : 'Draw Steel'}</span>
            </Button>

            {/* Take Respite */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onRespite}
              className="header-action-btn"
              title="Take Respite"
            >
              <Moon size={16} />
              <span>Respite</span>
            </Button>

            {/* Respec */}
            {canRespec && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setActiveSection('character');
                  setSelectedItem('respec');
                }}
                className="header-action-btn"
                title="Respec Progression"
              >
                <RefreshCcw size={16} />
                <span>Respec</span>
              </Button>
            )}

            {/* Character Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="character-menu-btn"
                  title="Character Options"
                >
                  <UserPlus size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="title-header-menu">
                <DropdownMenuItem onClick={onCreateCharacter}>
                  Create New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onManageCharacters}>
                  Switch Character
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onImportCharacter}>
                  Import Character
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onExportCharacter}>
                  Export Character
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDuplicateCharacter}>
                  Duplicate Character
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Overflow Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="menu-trigger">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="title-header-menu">
                <DropdownMenuItem onClick={onShowAbout}>
                  About Mettle
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}

export default TitleHeader;
