/**
 * Inciting Incidents data parsed from career MD files.
 * Each career has 6 predefined inciting incidents (d6 table).
 *
 * Source: Anvil/docs/data-rules-md/Careers/
 */

export interface IncitingIncident {
  id: string;
  title: string;
  description: string;
}

export interface CareerIncitingIncidents {
  careerId: string;
  incidents: IncitingIncident[];
}

/**
 * All inciting incidents organized by career.
 * Parsed from the d6 tables in each career's MD file.
 */
export const INCITING_INCIDENTS: CareerIncitingIncidents[] = [
  {
    careerId: 'agent',
    incidents: [
      {
        id: 'disavowed',
        title: 'Disavowed',
        description: 'While on a dangerous espionage assignment, things went sideways. Although you escaped with your life, the mission was a public failure thanks to bad information your agency gave you. They denied you work for them, and you went on the run. Hero work will let you survive and clear your name.',
      },
      {
        id: 'faceless',
        title: 'Faceless',
        description: 'Your identity was always hidden. It was your way of protecting those around you because the work you did spying on powerful entities came with dangers. Then your world came crashing down when an enemy agent unmasked you, causing you to lose everything—your privacy, livelihood, loved ones, all gone in the blink of an eye. Instead of going into hiding, you became a public hero to protect the innocent in the name of those you lost.',
      },
      {
        id: 'free-agent',
        title: 'Free Agent',
        description: 'There was a time in your life when you used to sell information to the highest bidder. Your acts were unsanctioned by any one organization, but you were well-connected enough to trade in secrets. Politics never mattered much to you until the information you sold wound up causing a ripple effect of harm that eventually destroyed the place you once called home. You became a hero to make up for your past.',
      },
      {
        id: 'informed',
        title: 'Informed',
        description: 'After years of cultivating a rich list of informants, one of those informants risked everything to expose the heinous plans of powerful individuals. You promised to protect your informant, but your agency left them hanging—literally. You cut ties with your employer and swore to always make good on your word as a hero.',
      },
      {
        id: 'spies-and-lovers',
        title: 'Spies and Lovers',
        description: 'While embedded in an undercover assignment, you fell for someone on the other side. They discovered you were a double agent, and though you insisted your feelings were real, the deceit cut too deep for your love interest to ignore. They exposed you, spurned you, or died because of their closeness to you. You left the espionage business to become a hero with nothing to hide.',
      },
      {
        id: 'turncoat',
        title: 'Turncoat',
        description: 'You spent your life in service of your country or an organization that upheld your values. During your undercover operations, you discovered that everything you had been told was a lie. Whether you confronted your superiors or were exposed, you were stripped of your service medals before you left to become a true hero.',
      },
    ],
  },
  {
    careerId: 'aristocrat',
    incidents: [
      {
        id: 'abdicated',
        title: 'Abdicated',
        description: 'You were raised to inherit an estate, a title, or a crown, but deep down, you knew the life of luxury and power was not for you. When you came of age, you gave up your noble birthright in pursuit of heroism, breaking ties with your family and disappointing your subjects. Sometimes you wonder if you made the right choice.',
      },
      {
        id: 'champion',
        title: 'Champion',
        description: 'Tourneys and competitions always attracted you, bringing glory to your house or estate through athletic accomplishment. After winning a grand tournament, you found the excitement of adventuring more fulfilling than the politics of nobility. You set off on your heroic journey, sponsored by admirers from your region.',
      },
      {
        id: 'coup',
        title: 'Coup',
        description: 'A rival house or faction staged a coup, seizing your family\'s lands and titles by force. You barely escaped with your life. Now you seek allies and power to reclaim what was taken from you and bring the usurpers to justice.',
      },
      {
        id: 'debt',
        title: 'Debt',
        description: 'Your family\'s fortune was squandered by a previous generation, leaving you with a noble title but little wealth. Rather than marry for money or engage in political schemes, you turned to adventuring to restore your house\'s prosperity through your own deeds.',
      },
      {
        id: 'disinherited',
        title: 'Disinherited',
        description: 'Your family cast you out, stripping you of your title and inheritance. Perhaps you committed a scandal, fell in love with the wrong person, or simply refused to follow the path they set for you. Now you forge your own destiny as a hero.',
      },
      {
        id: 'reformer',
        title: 'Reformer',
        description: 'You witnessed the suffering of common folk under the rule of nobles and decided to use your privilege for good. Leaving behind the comfort of your estate, you became a hero to champion the rights of the oppressed and prove that nobility is defined by deeds, not birth.',
      },
    ],
  },
  {
    careerId: 'artisan',
    incidents: [
      {
        id: 'cursed-creation',
        title: 'Cursed Creation',
        description: 'You crafted something of great beauty or power, but it brought misfortune to all who possessed it. Guilt-ridden, you set out on a heroic path to find and destroy your cursed creation before it causes more harm.',
      },
      {
        id: 'lost-masterpiece',
        title: 'Lost Masterpiece',
        description: 'Your greatest work was stolen, and you\'ve dedicated yourself to recovering it. Your search has led you down the path of adventure, as the thief seems connected to dangers that require a hero to overcome.',
      },
      {
        id: 'masterpiece',
        title: 'Masterpiece',
        description: 'You created something that impressed a powerful patron, who sponsored your transition from artisan to adventurer. Your skills now serve a greater purpose as you craft solutions to heroic challenges.',
      },
      {
        id: 'rival',
        title: 'Rival',
        description: 'Another artisan, jealous of your talents, ruined your reputation or destroyed your workshop. With nothing left to lose, you became an adventurer to rebuild your life and perhaps settle the score.',
      },
      {
        id: 'secret-technique',
        title: 'Secret Technique',
        description: 'You discovered or inherited a secret crafting technique that others would kill to possess. To protect the secret and use it for good, you became a hero, staying one step ahead of those who hunt you.',
      },
      {
        id: 'wonder',
        title: 'Wonder',
        description: 'While crafting, you accidentally created something magical or extraordinary that opened your eyes to possibilities beyond your workshop. Inspired, you left your trade to explore the wonders of the world as a hero.',
      },
    ],
  },
  {
    careerId: 'beggar',
    incidents: [
      {
        id: 'hidden-kindness',
        title: 'Hidden Kindness',
        description: 'A stranger showed you unexpected kindness when you had nothing—food, shelter, or coin. That act inspired you to pay it forward, dedicating your life to helping others as a hero.',
      },
      {
        id: 'overheard',
        title: 'Overheard',
        description: 'Invisible to the wealthy and powerful, you overheard a plot that endangers innocent lives. Now you must act on this knowledge, transforming from a beggar into a hero to stop the conspiracy.',
      },
      {
        id: 'revelation',
        title: 'Revelation',
        description: 'During your time on the streets, you discovered you possess a hidden talent or power. This revelation changed your fate, setting you on the path of a hero.',
      },
      {
        id: 'street-family',
        title: 'Street Family',
        description: 'Your community of beggars and outcasts was destroyed or scattered by a powerful force. You became a hero to protect the vulnerable and avenge those who cannot fight for themselves.',
      },
      {
        id: 'survivor',
        title: 'Survivor',
        description: 'You survived something terrible—disease, violence, or disaster—that claimed everyone around you. This brush with death revealed your resilience and drove you to become a hero.',
      },
      {
        id: 'witnessed',
        title: 'Witnessed',
        description: 'You witnessed a crime or injustice that you could not ignore. Though you had nothing, you risked everything to speak up, and that courage set you on the path of heroism.',
      },
    ],
  },
  {
    careerId: 'criminal',
    incidents: [
      {
        id: 'betrayed',
        title: 'Betrayed',
        description: 'Your criminal associates betrayed you, leaving you to take the fall for their crimes. You escaped and now walk the path of a hero, seeking redemption—or revenge.',
      },
      {
        id: 'debt-paid',
        title: 'Debt Paid',
        description: 'You committed crimes to pay off a debt or support someone you loved. Now that obligation is fulfilled, you\'ve left your criminal life behind to become something better.',
      },
      {
        id: 'honor-among-thieves',
        title: 'Honor Among Thieves',
        description: 'You lived by a code, only stealing from those who deserved it. When your crew abandoned that code, you abandoned them, becoming a hero who fights for justice in your own way.',
      },
      {
        id: 'innocent-victim',
        title: 'Innocent Victim',
        description: 'One of your crimes hurt an innocent person, and the guilt changed you forever. You became a hero to make amends and ensure you never cause such harm again.',
      },
      {
        id: 'narrow-escape',
        title: 'Narrow Escape',
        description: 'A heist went catastrophically wrong, and you barely escaped with your life. The experience was a wake-up call that drove you to leave crime behind and become a hero.',
      },
      {
        id: 'reformed',
        title: 'Reformed',
        description: 'Someone believed in you when no one else did—perhaps a priest, mentor, or stranger. Their faith inspired you to leave your criminal past behind and become a hero.',
      },
    ],
  },
  {
    careerId: 'disciple',
    incidents: [
      {
        id: 'calling',
        title: 'Calling',
        description: 'You received a divine vision or calling that commanded you to leave your temple and become a hero in the world. You serve your faith through deeds rather than prayers.',
      },
      {
        id: 'crisis-of-faith',
        title: 'Crisis of Faith',
        description: 'Something shattered your belief in the teachings you followed. Seeking answers, you left the temple to find truth through action as a hero.',
      },
      {
        id: 'defender',
        title: 'Defender',
        description: 'Your temple or community was threatened, and you took up arms to defend it. That experience awakened the hero within you.',
      },
      {
        id: 'exile',
        title: 'Exile',
        description: 'You were expelled from your religious order for questioning doctrine or breaking rules. Cast out but not broken, you continue to serve your ideals as a hero.',
      },
      {
        id: 'martyrdom',
        title: 'Martyrdom',
        description: 'Someone you admired sacrificed themselves to save others. Inspired by their example, you became a hero to honor their memory.',
      },
      {
        id: 'pilgrimage',
        title: 'Pilgrimage',
        description: 'You embarked on a sacred pilgrimage that revealed dangers in the world requiring a hero\'s intervention. Your journey of faith became a journey of heroism.',
      },
    ],
  },
  {
    careerId: 'explorer',
    incidents: [
      {
        id: 'discovery',
        title: 'Discovery',
        description: 'You discovered something ancient and dangerous during an expedition—ruins, artifacts, or forbidden knowledge. Now you must protect the world from what you unleashed.',
      },
      {
        id: 'lost-expedition',
        title: 'Lost Expedition',
        description: 'Your expedition was lost, and you alone survived. The experience hardened you, and you became a hero to ensure no one else suffers the same fate.',
      },
      {
        id: 'mapping-the-unknown',
        title: 'Mapping the Unknown',
        description: 'You\'ve dedicated your life to charting unexplored regions. Your maps have saved lives, and your adventures have made you a hero to those who follow in your footsteps.',
      },
      {
        id: 'patron',
        title: 'Patron',
        description: 'A wealthy patron sponsored your explorations and now requires your skills for a more dangerous mission. Your expertise has made you a hero.',
      },
      {
        id: 'revenge-of-the-wild',
        title: 'Revenge of the Wild',
        description: 'Nature or its guardians punished you for your explorations, forcing you to see the damage exploration can cause. You became a hero to protect the wild places you once exploited.',
      },
      {
        id: 'treasure',
        title: 'Treasure',
        description: 'You found treasure that attracted dangerous attention—thieves, monsters, or worse. To protect yourself and others, you became a hero.',
      },
    ],
  },
  {
    careerId: 'farmer',
    incidents: [
      {
        id: 'blight',
        title: 'Blight',
        description: 'A terrible blight destroyed your crops and livestock, driving you from your land. You became a hero to survive and to find a way to reclaim your farm.',
      },
      {
        id: 'called-to-serve',
        title: 'Called to Serve',
        description: 'Your community called upon you to defend them when danger arose. You answered the call and discovered your true calling as a hero.',
      },
      {
        id: 'inheritance',
        title: 'Inheritance',
        description: 'You inherited something unexpected—a weapon, a map, or a secret—that led you away from the farm and into adventure.',
      },
      {
        id: 'monsters',
        title: 'Monsters',
        description: 'Monsters attacked your farm, and you drove them off with nothing but farming tools and determination. That victory revealed the hero within you.',
      },
      {
        id: 'restless',
        title: 'Restless',
        description: 'Farm life could never satisfy your hunger for adventure. You left the fields behind to seek your destiny as a hero.',
      },
      {
        id: 'war',
        title: 'War',
        description: 'War swept through your region, destroying your farm and forcing you to fight. You emerged hardened and determined to protect others from the same fate.',
      },
    ],
  },
  {
    careerId: 'gladiator',
    incidents: [
      {
        id: 'champion-rise',
        title: 'Champion Rise',
        description: 'You rose through the ranks to become a champion of the arena. Fame brought opportunities, and you left the games to pursue greater glory as a hero.',
      },
      {
        id: 'earned-freedom',
        title: 'Earned Freedom',
        description: 'You won your freedom through combat, either by earning enough victories or defeating a champion. Now free, you use your skills for heroic purposes.',
      },
      {
        id: 'escaped',
        title: 'Escaped',
        description: 'You escaped captivity, killing your captors or fleeing in the night. Your arena skills now serve you as a hero on the run.',
      },
      {
        id: 'last-survivor',
        title: 'Last Survivor',
        description: 'You were the sole survivor of a brutal gladiatorial event. The experience changed you, driving you to become a hero who prevents such suffering.',
      },
      {
        id: 'patron-champion',
        title: 'Patron Champion',
        description: 'A wealthy patron bought your freedom in exchange for your service as their champion. You now fight for their causes as a hero.',
      },
      {
        id: 'rebellion',
        title: 'Rebellion',
        description: 'You led or participated in a gladiator rebellion. Whether it succeeded or failed, you emerged as a hero fighting for freedom.',
      },
    ],
  },
  {
    careerId: 'laborer',
    incidents: [
      {
        id: 'accident',
        title: 'Accident',
        description: 'A terrible accident at your workplace killed or injured people you cared about. You became a hero to prevent such tragedies and fight against those who cause them.',
      },
      {
        id: 'discovery-laborer',
        title: 'Discovery',
        description: 'While working, you discovered something hidden—ancient ruins, a secret passage, or evidence of a crime. This discovery led you to become a hero.',
      },
      {
        id: 'exploitation',
        title: 'Exploitation',
        description: 'You witnessed or experienced the exploitation of workers by cruel masters. You became a hero to fight for the rights of the common people.',
      },
      {
        id: 'hidden-strength',
        title: 'Hidden Strength',
        description: 'Years of hard labor gave you remarkable strength or endurance. When danger arose, you discovered these gifts made you a natural hero.',
      },
      {
        id: 'injustice',
        title: 'Injustice',
        description: 'You suffered an injustice—wrongful imprisonment, stolen wages, or false accusations. You became a hero to fight against such wrongs.',
      },
      {
        id: 'opportunity',
        title: 'Opportunity',
        description: 'An unexpected opportunity arose—a patron who saw your potential, a found weapon, or a crisis that needed a hero. You seized it and never looked back.',
      },
    ],
  },
  {
    careerId: 'mages-apprentice',
    incidents: [
      {
        id: 'awakening',
        title: 'Awakening',
        description: 'Your magical abilities awakened suddenly and dramatically, forcing you to seek training and eventually become a hero who wields these powers.',
      },
      {
        id: 'dangerous-knowledge',
        title: 'Dangerous Knowledge',
        description: 'You learned something your master wanted kept secret. Whether you fled or were cast out, you now use that knowledge as a hero.',
      },
      {
        id: 'experiment-gone-wrong',
        title: 'Experiment Gone Wrong',
        description: 'A magical experiment went catastrophically wrong, and you must become a hero to fix the damage or prevent worse consequences.',
      },
      {
        id: 'graduated',
        title: 'Graduated',
        description: 'Your training is complete, and your master has sent you into the world to prove yourself. You became a hero to honor their teachings.',
      },
      {
        id: 'masters-death',
        title: "Master's Death",
        description: 'Your master died or disappeared under mysterious circumstances. You became a hero to uncover the truth and continue their work.',
      },
      {
        id: 'rivalry',
        title: 'Rivalry',
        description: 'A rival apprentice or mage threatens you or those you care about. You became a hero to protect yourself and stop their schemes.',
      },
    ],
  },
  {
    careerId: 'performer',
    incidents: [
      {
        id: 'audience',
        title: 'Audience',
        description: 'Your greatest performance caught the attention of someone dangerous—or someone who needed a hero. Either way, you were drawn into adventure.',
      },
      {
        id: 'inspiration',
        title: 'Inspiration',
        description: 'You witnessed true heroism that inspired you to become more than an entertainer. You became a hero to live the stories you once only told.',
      },
      {
        id: 'lost-troupe',
        title: 'Lost Troupe',
        description: 'Your performing troupe was destroyed or scattered by tragedy. Alone but not defeated, you became a hero to honor their memory.',
      },
      {
        id: 'secret-message',
        title: 'Secret Message',
        description: 'You discovered that your performances were being used to send secret messages. Uncovering this plot drew you into a life of heroism.',
      },
      {
        id: 'stage-to-battlefield',
        title: 'Stage to Battlefield',
        description: 'The skills you learned as a performer—acrobatics, swordplay, deception—proved useful in real danger. You became a hero when performance met reality.',
      },
      {
        id: 'true-story',
        title: 'True Story',
        description: 'You discovered that a story you performed was based on real events that are still unfolding. You became a hero to see how the story ends.',
      },
    ],
  },
  {
    careerId: 'politician',
    incidents: [
      {
        id: 'blackmail',
        title: 'Blackmail',
        description: 'Someone has leverage over you—real or fabricated scandals that could destroy your reputation. You became a hero to free yourself from their control.',
      },
      {
        id: 'conspiracy',
        title: 'Conspiracy',
        description: 'You uncovered a conspiracy that threatens your nation or world. Unable to fight it through politics alone, you became a hero.',
      },
      {
        id: 'idealist',
        title: 'Idealist',
        description: 'You entered politics to make a difference but found the system corrupt beyond reform. You became a hero to create change through action.',
      },
      {
        id: 'political-enemies',
        title: 'Political Enemies',
        description: 'Your political rivals conspired against you, forcing you from power. You became a hero to rebuild your influence and expose their corruption.',
      },
      {
        id: 'revolutionary',
        title: 'Revolutionary',
        description: 'You came to believe that the current political order must be overthrown. You became a hero to fight for a better world.',
      },
      {
        id: 'voice-of-the-people',
        title: 'Voice of the People',
        description: 'The common people chose you as their champion against tyranny. You became a hero to fulfill their faith in you.',
      },
    ],
  },
  {
    careerId: 'sage',
    incidents: [
      {
        id: 'forbidden-knowledge',
        title: 'Forbidden Knowledge',
        description: 'You discovered knowledge that was hidden for good reason. Now you must become a hero to contain or destroy what you uncovered.',
      },
      {
        id: 'lost-library',
        title: 'Lost Library',
        description: 'You seek a legendary library or archive that holds answers to crucial questions. Your search has led you on a heroic journey.',
      },
      {
        id: 'mentor',
        title: 'Mentor',
        description: 'A wise mentor showed you that knowledge without action is incomplete. Inspired by their example, you became a hero.',
      },
      {
        id: 'prophecy',
        title: 'Prophecy',
        description: 'You discovered a prophecy that names you—or someone close to you—as a key figure in coming events. You became a hero to fulfill or prevent it.',
      },
      {
        id: 'stolen-research',
        title: 'Stolen Research',
        description: 'Your life\'s work was stolen by someone who intends to misuse it. You became a hero to recover your research and stop them.',
      },
      {
        id: 'truth-seeker',
        title: 'Truth Seeker',
        description: 'You seek the truth about a mystery that has consumed your life—your origins, a historical event, or the nature of reality. Your search has made you a hero.',
      },
    ],
  },
  {
    careerId: 'sailor',
    incidents: [
      {
        id: 'ghost-ship',
        title: 'Ghost Ship',
        description: 'You encountered a ghost ship or supernatural phenomenon at sea. The experience changed you, driving you to understand and combat such horrors as a hero.',
      },
      {
        id: 'marooned',
        title: 'Marooned',
        description: 'You were marooned on a remote island and survived against all odds. The experience forged you into a hero.',
      },
      {
        id: 'mutiny',
        title: 'Mutiny',
        description: 'You survived a mutiny, either as a leader or a loyal crew member. The betrayal drove you to become a hero who values loyalty above all.',
      },
      {
        id: 'sea-monster',
        title: 'Sea Monster',
        description: 'Your ship was attacked by a sea monster, and you alone survived—or you helped drive it off. Either way, you became a hero.',
      },
      {
        id: 'shipwreck',
        title: 'Shipwreck',
        description: 'Your ship was lost to storm or pirates, leaving you stranded far from home. You became a hero while trying to return.',
      },
      {
        id: 'treasure-map',
        title: 'Treasure Map',
        description: 'You acquired a map to a legendary treasure. The quest to find it has made you a hero.',
      },
    ],
  },
  {
    careerId: 'soldier',
    incidents: [
      {
        id: 'dishonorable-discharge',
        title: 'Dishonorable Discharge',
        description: 'You enlisted in the military to protect others, but your commander ordered you to beat and kill civilians. When you refused, things got violent. You barely escaped the brawl that ensued, but now you vow to help people on your own terms.',
      },
      {
        id: 'out-of-retirement',
        title: 'Out of Retirement',
        description: 'You had a long and storied career as a soldier before deciding to retire to a simpler life. But when you returned to your old home, you found your enemies had laid waste to it. Now the skills you earned on the battlefield are helping you as you become a different kind of warrior—one seeking to save others from the fate you suffered.',
      },
      {
        id: 'peace-through-healing',
        title: 'Peace Through Healing',
        description: 'Living with constant bloodshed took its toll on you. You seek peace through healing and have dedicated yourself to ending wars before they begin, to spare those around you from the horror.',
      },
      {
        id: 'sole-survivor',
        title: 'Sole Survivor',
        description: 'You were the last surviving member of your unit after an arduous battle or monstrous assault, surviving only through luck. You turned away from the life of a soldier then, seeking to become a hero who could stand against such threats.',
      },
      {
        id: 'stolen-valor',
        title: 'Stolen Valor',
        description: 'Tired of eking out an existence on the streets, you enrolled in the military. However, you were unable to escape your lower-status background until the officer leading your unit fell in battle. In the chaos that ensued, you assumed their identity and returned home a hero. But when suspicion arose, you took on the life of an adventurer, staying always on the move.',
      },
      {
        id: 'vow-of-sacrifice',
        title: 'Vow of Sacrifice',
        description: 'You promised a fellow soldier that you\'d protect his family if he ever fell in battle. When he did, you traveled to his village, but found its people slain or scattered by war. Driven by your vow, you have dedicated your life to finding any survivors and protecting others from a similar fate.',
      },
    ],
  },
  {
    careerId: 'warden',
    incidents: [
      {
        id: 'corruption',
        title: 'Corruption',
        description: 'The land you protected was corrupted by dark magic or pollution. You became a hero to cleanse it and prevent such corruption elsewhere.',
      },
      {
        id: 'guardian-spirit',
        title: 'Guardian Spirit',
        description: 'A spirit of the land chose you as its champion. You became a hero to fulfill this sacred duty.',
      },
      {
        id: 'invasion',
        title: 'Invasion',
        description: 'Invaders threatened the land you protected. You became a hero to drive them out and prevent future incursions.',
      },
      {
        id: 'last-of-the-order',
        title: 'Last of the Order',
        description: 'You are the last surviving member of an order of wardens. You became a hero to continue their mission and find worthy successors.',
      },
      {
        id: 'poachers',
        title: 'Poachers',
        description: 'Poachers or exploiters threatened the creatures or resources you protected. You became a hero to stop them.',
      },
      {
        id: 'sacred-site',
        title: 'Sacred Site',
        description: 'A sacred site in your care was desecrated or threatened. You became a hero to restore or protect it.',
      },
    ],
  },
  {
    careerId: 'watch-officer',
    incidents: [
      {
        id: 'cold-case',
        title: 'Cold Case',
        description: 'A case haunted you—unsolved, unjust, or personal. You left the watch to pursue it as a hero, free from official constraints.',
      },
      {
        id: 'corruption-exposed',
        title: 'Corruption Exposed',
        description: 'You discovered corruption in the watch that went all the way to the top. Unable to fight it from within, you became a hero.',
      },
      {
        id: 'framed',
        title: 'Framed',
        description: 'You were framed for a crime you didn\'t commit. You became a hero to clear your name and bring the real culprits to justice.',
      },
      {
        id: 'justice-denied',
        title: 'Justice Denied',
        description: 'The powerful escaped justice despite your best efforts. You became a hero to ensure that no one is above the law.',
      },
      {
        id: 'partners-death',
        title: "Partner's Death",
        description: 'Your partner was killed in the line of duty. You became a hero to honor their memory and avenge their death.',
      },
      {
        id: 'vigilante',
        title: 'Vigilante',
        description: 'The law proved inadequate to deal with the threats you faced. You became a hero to deliver justice by any means necessary.',
      },
    ],
  },
];

/**
 * Get inciting incidents for a specific career.
 */
export function getIncitingIncidentsForCareer(careerId: string): IncitingIncident[] {
  const careerData = INCITING_INCIDENTS.find(c => c.careerId === careerId);
  return careerData?.incidents ?? [];
}

/**
 * Get a specific inciting incident by career and incident ID.
 */
export function getIncitingIncident(careerId: string, incidentId: string): IncitingIncident | undefined {
  const incidents = getIncitingIncidentsForCareer(careerId);
  return incidents.find(i => i.id === incidentId);
}
