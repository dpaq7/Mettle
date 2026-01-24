
export const CHARACTER_DATA = {
  name: "Valeria the Bold",
  stats: {
    MGT: "+2",
    AGI: "+1",
    REA: "+3",
    INT: "+2",
    PRS: "+0",
    SPD: "5",
    STM: "28/42",
    REC: "6",
    Focus: "12"
  },
  masterList: [
    { label: "Ancestry", value: "Human", selected: true, type: "item" },
    { label: "Culture", value: "Cosmopolitan", type: "item" },
    { label: "Career", value: "Soldier", type: "item" },
    { label: "Class", value: "Tactician", type: "item" },
    { label: "Subclass", value: "Vanguard", type: "item" },
    { label: "Kit", value: "Shining Armor", type: "item" },
    { label: "Inciting Incident", value: "", type: "item" },
    { label: "Complications", badge: "2", type: "item" },
    { label: "Titles", badge: "1", type: "item" },
    { label: "Languages", badge: "3", type: "item" },
    { label: "Perks", badge: "4", type: "item" }
  ],
  detail: {
    title: "Human",
    subtitle: "Ancestry",
    sections: [
      {
        heading: "Traits",
        items: [
          "Size: Medium (1M)",
          "Speed: 5",
          "Languages: Common + 1 additional"
        ]
      },
      {
        heading: "Ancestry Features",
        items: [
          {
            name: "Adaptable",
            description: "You gain one additional skill from your career."
          },
          {
            name: "Determined",
            description: "When you fail a power roll, you can spend a Recovery to reroll. You must use the new result."
          }
        ]
      },
      {
        heading: "Lore",
        text: "Humans are the most widespread ancestry in the world, found in every climate and culture..."
      }
    ]
  }
};

export const ACTIONS_DATA = {
  masterList: [
    {
      header: "Main Actions",
      items: [
        { label: "Melee Attack", selected: false },
        { label: "Ranged Attack", selected: false },
        { label: "Power Strike", selected: true },
        { label: "Tactical Assault", selected: false }
      ]
    },
    {
      header: "Maneuvers",
      items: [
        { label: "Defend", selected: false },
        { label: "Hide", selected: false },
        { label: "Advance", selected: false }
      ]
    },
    {
      header: "Triggered Actions",
      items: [
        { label: "Opportunity Attack", selected: false },
        { label: "Parry", selected: false }
      ]
    },
    {
      header: "Free Actions",
      items: [
        { label: "Mark Target", selected: false }
      ]
    }
  ],
  detail: {
    type: "action_card",
    content: {
      name: "Power Strike",
      type: "Main Action",
      type_color: "#3b82f6",
      cost: "1 Focus",
      keywords: ["Attack", "Melee", "Weapon"],
      distance: "Reach 1",
      target: "1 creature",
      power_roll: {
        characteristic: "MGT or AGI",
        tiers: [
          { tier: "11-", result: "5 damage" },
          { tier: "12-16", result: "9 damage" },
          { tier: "17+", result: "12 damage; push 1" }
        ]
      },
      effect: "You strike with extra force, pushing your enemy back on a strong hit.",
      roll_button: true
    }
  }
};

export const PROJECTS_DATA = {
  masterList: [
    {
      header: "Active",
      items: [
        { label: "Research Ancient Texts", progress: "3/5", selected: true },
        { label: "Build Reputation", progress: "1/3", selected: false }
      ]
    },
    {
      header: "Completed",
      items: [
        { label: "Find the Lost Temple", completed: true, selected: false }
      ]
    }
  ],
  detail: {
    type: "project",
    content: {
      name: "Research Ancient Texts",
      progress: {
        current: 3,
        total: 5,
        bar: true
      },
      description: "Delving into the forbidden archives to uncover the truth about the Sundering.",
      skill: "Reason (Lore)",
      difficulty: 12,
      roll_history: [
        { result: 14, outcome: "success", date: "Session 4" },
        { result: 8, outcome: "failure", date: "Session 3" },
        { result: 16, outcome: "success", "date": "Session 2" }
      ],
      roll_button: true
    }
  }
};

export const INVENTORY_DATA = {
  masterList: [
    {
      header: "Equipped",
      items: [
        { label: "Longsword", selected: true },
        { label: "Chain Mail", selected: false },
        { label: "Shield", selected: false }
      ]
    },
    {
      header: "Carried",
      items: [
        { label: "Healing Potion", quantity: 3, selected: false },
        { label: "Rope (50ft)", selected: false },
        { label: "Torch", quantity: 5, selected: false }
      ]
    },
    {
      header: "Currency",
      items: [
        { label: "Gold", value: "150" }
      ]
    }
  ],
  detail: {
    type: "item",
    content: {
      name: "Longsword",
      category: "Weapon (Martial, Heavy)",
      equipped: true,
      stats: [
        { label: "Damage", value: "1d10 + MGT" },
        { label: "Range", value: "Reach 1" },
        { label: "Keywords", value: "Heavy, Versatile" }
      ],
      description: "A well-balanced blade suitable for both one and two-handed use.",
      actions: [
        { label: "Unequip", variant: "ghost" }
      ]
    }
  }
};
