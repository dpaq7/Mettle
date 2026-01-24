import React, { useState } from 'react';
import { TitleHeader } from './components/mettle/TitleHeader';
import { StatRibbon } from './components/mettle/StatRibbon';
import { CommandBar } from './components/mettle/CommandBar';
import { MasterPane } from './components/mettle/MasterPane';
import { DetailPane } from './components/mettle/DetailPane';
import { 
  CHARACTER_DATA, 
  ACTIONS_DATA, 
  PROJECTS_DATA, 
  INVENTORY_DATA 
} from './lib/data';

// Mapping tabs to data
const DATA_MAP: Record<string, any> = {
  character: CHARACTER_DATA,
  actions: ACTIONS_DATA,
  projects: PROJECTS_DATA,
  inventory: INVENTORY_DATA,
};

function App() {
  const [activeTab, setActiveTab] = useState('character');
  const [combatMode, setCombatMode] = useState(false);
  
  // Track selected item for each tab to persist selection when switching
  const [selections, setSelections] = useState<Record<string, string>>({
    character: 'Ancestry',
    actions: 'Power Strike',
    projects: 'Research Ancient Texts',
    inventory: 'Longsword'
  });

  const currentData = DATA_MAP[activeTab];

  // Logic to determine what to show in Detail Pane
  // In a real app, we'd fetch specific detail for the selected item.
  // Here we only have one detail object per section in our mock data.
  // We will show that detail if the selected item matches the mocked detail's name/context.
  // Otherwise we show a placeholder.
  
  const getDetailContent = () => {
    const selectedLabel = selections[activeTab];
    
    // Check if the selected item corresponds to the mocked detail data
    // Character: Detail title is "Human", item label is "Ancestry" (value is Human)
    if (activeTab === 'character') {
      if (selectedLabel === 'Ancestry') return currentData.detail;
      // Fallback for other character items
      return {
        title: selectedLabel,
        subtitle: "Detail View",
        content: {
          sections: [{ heading: "Info", text: "Details for this section are not available in this preview." }]
        }
      };
    }

    // Actions: Detail name is "Power Strike"
    if (activeTab === 'actions') {
      if (selectedLabel === 'Power Strike') return currentData.detail;
       return {
        type: 'action_card',
        content: {
          name: selectedLabel,
          type: "Action",
          cost: "-",
          keywords: [],
          distance: "-",
          target: "-",
          power_roll: { characteristic: "-", tiers: [] },
          effect: "Details not available in preview."
        }
      };
    }

    // Projects
    if (activeTab === 'projects') {
      if (selectedLabel === 'Research Ancient Texts') return currentData.detail;
      return {
        type: 'project',
        content: {
          name: selectedLabel,
          progress: { current: 0, total: 5 },
          description: "Details not available in preview.",
          skill: "-",
          difficulty: 0,
          roll_history: []
        }
      };
    }

    // Inventory
    if (activeTab === 'inventory') {
      if (selectedLabel === 'Longsword') return currentData.detail;
       return {
        type: 'item',
        content: {
          name: selectedLabel,
          category: "Item",
          stats: [],
          description: "Details not available in preview.",
          actions: []
        }
      };
    }

    return null;
  };

  // Update master list with selection state
  const getMasterListData = () => {
    const rawList = currentData.masterList;
    const selectedLabel = selections[activeTab];

    // Deep copy and update selected status
    // Handle both flat list and sections
    if (rawList.length > 0 && 'header' in rawList[0]) {
      // Sections
      return rawList.map((section: any) => ({
        ...section,
        items: section.items.map((item: any) => ({
          ...item,
          selected: item.label === selectedLabel
        }))
      }));
    } else {
      // Flat list
      return rawList.map((item: any) => ({
        ...item,
        selected: item.label === selectedLabel
      }));
    }
  };

  const handleSelectItem = (item: any) => {
    setSelections(prev => ({
      ...prev,
      [activeTab]: item.label
    }));
  };

  return (
    <div className={`flex flex-col h-screen w-full overflow-hidden bg-bg-deep text-text-primary ${combatMode ? 'theme-combat' : ''}`}>
      <TitleHeader 
        combatMode={combatMode} 
        onToggleCombat={() => setCombatMode(!combatMode)} 
      />
      
      <StatRibbon 
        stats={CHARACTER_DATA.stats} 
        combatMode={combatMode} 
      />

      <div className="flex flex-1 overflow-hidden">
        <CommandBar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <MasterPane 
          data={getMasterListData()} 
          onSelectItem={handleSelectItem} 
        />
        
        <DetailPane 
          data={getDetailContent()} 
        />
      </div>
    </div>
  );
}

export default App;
