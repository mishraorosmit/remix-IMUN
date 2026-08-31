export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  delegatesTrained: string;
  achievements: string[];
  bio: string;
  quote: string;
  badge: string;
  code: string;
}

export interface AdvisorProfile {
  id: string;
  name: string;
  title: string;
  institution: string;
  expertise: string;
  tenure: string;
  statement: string;
  focusArea: string;
  badge: string;
  code: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  caption: string;
  tag: string;
  imageUrl: string;
  fallbackUrl?: string;
  attendees: string;
  dossierRef: string;
  dimensions?: string;
  highlights?: string[];
}

import { SUBHRAKANT_PORTRAIT_SVG } from './founderImage';

export const FOUNDER_DOSSIER = {
  name: 'Subhrakant Biswal',
  societyRole: 'Founder, Illuminati MUN Society',
  title: 'MUN Strategist, Organiser, Senior Mentor & Youth Leader',
  honor: '2023 Governor Awardee, Odisha',
  clearance: 'FOUNDER CLEARANCE // LEVEL-X',
  code: 'FOUNDER-BISWAL-001',
  tenure: '7+ Years in Circuit (2019 – Present)',
  experienceYears: '7 Years Experience',
  conferencesCount: '60+ MUN Conferences Across India & Globally',
  photoUrl: '/founder-portrait-opt.webp',
  fallbackPhotoUrl: '/founder-portrait.png',
  originalPhotoUrl: '/wmremove-transformed.png',
  vectorFallbackUrl: SUBHRAKANT_PORTRAIT_SVG,
  stats: [
    { label: 'MUN Circuit Experience', value: '7 Years // 60+ Conferences' },
    { label: 'Governor Awardee (Odisha)', value: '2023 State Honor' },
    { label: 'Illuminati Community', value: '750+ Active Members' },
    { label: 'Global Students Mentored', value: '1,000+ Worldwide' },
  ],
  quote:
    'My vision is to transform Model UN from a conventional competition into a platform that develops confident speakers, strategic thinkers, effective negotiators, and globally conscious young leaders.',
  bioParagraphs: [
    'Subhrakant Biswal is a distinguished MUN strategist, organiser, mentor, and youth leader with 7 years of experience in the Model United Nations circuit and participation in 60+ MUN conferences across India and internationally. A 2023 Governor Awardee, Odisha, he has built a strong reputation for leadership, diplomacy, conference strategy, and youth development.',
    'He is the Founder of Illuminati MUN Society, one of Odisha’s largest MUN societies, with a community of 750+ members. Through Illuminati, he has worked extensively to promote diplomacy, public speaking, negotiation, critical thinking, and leadership among young students.',
    'Subhrakant has held key leadership and advisory positions with prominent conferences including ODMMUN and FBSMUN, contributing to conference strategy, committee planning, Executive Board coordination, delegate affairs, school outreach, partnerships, and large-scale conference operations.',
    'Beyond conferences, he has also mentored 1,000+ students from across the globe through online MUN masterclasses and mentoring sessions, helping aspiring delegates strengthen their research, public speaking, diplomacy, negotiation, and committee strategy.',
    'He has played an active role in MPS MUN at Modern Public School, Balasore, contributing to the development of MUN culture and student leadership. His international outreach includes collaborations with DBBMUN, Mexico, and MUN communities in the United States, creating opportunities for cross-border interaction and global MUN exchange.',
    'Over seven years, Subhrakant has evolved from a passionate participant into an organiser, senior advisor, mentor, strategist, and community builder.',
  ],
  visionStatement:
    'To transform Model United Nations from a conventional competition into a transformative platform that develops confident speakers, strategic thinkers, effective negotiators, and globally conscious young leaders prepared to tackle the geopolitical challenges of tomorrow.',
  keyLeadershipRoles: [
    {
      role: 'Founder & President',
      body: 'Illuminati MUN Society',
      desc: 'Building Odisha’s premier MUN community of 750+ members dedicated to diplomacy, negotiation, public speaking, and youth leadership.',
    },
    {
      role: 'Senior Advisor & Strategist',
      body: 'ODMMUN & FBSMUN',
      desc: 'Formulating conference strategy, Executive Board coordination, committee planning, school outreach, and large-scale operations.',
    },
    {
      role: 'Institutional Development Lead',
      body: 'MPS MUN // Modern Public School, Balasore',
      desc: 'Nurturing foundational MUN culture, debating acumen, and student leadership frameworks at Modern Public School.',
    },
    {
      role: 'Global Exchange Facilitator',
      body: 'DBBMUN (Mexico) & US MUN Communities',
      desc: 'Orchestrating bilateral international MUN partnerships and cross-border delegate mentorship exchanges.',
    },
  ],
  journeyMilestones: [
    {
      year: '7 Years Experience',
      title: '60+ MUN Conferences across India & Globally',
      desc: 'Evolved from competitive delegate to veteran Executive Board member, chief advisor, and conference strategist.',
    },
    {
      year: '2023',
      title: 'Governor Awardee, Odisha & Foundation of Illuminati',
      desc: 'Honored with the 2023 Governor Award, Odisha for outstanding youth leadership and established Illuminati MUN Society.',
    },
    {
      year: 'Conference Leadership',
      title: 'Key Roles with ODMMUN, FBSMUN & MPS MUN',
      desc: 'Directing conference strategy, delegate affairs, partnerships, and institutional leadership at Modern Public School, Balasore.',
    },
    {
      year: 'Global Mentorship',
      title: '1,000+ Students Mentored & DBBMUN Mexico Alliance',
      desc: 'Conducted worldwide masterclasses and established cross-border exchange programs with Mexico & United States.',
    },
  ],
  pillarsOfPhilosophy: [
    {
      title: 'Diplomacy & Public Speaking',
      desc: 'Cultivating confident, persuasive speakers capable of commanding committees and articulating nuanced geopolitical stances.',
    },
    {
      title: 'Strategic Negotiation & Critical Thinking',
      desc: 'Equipping delegates with the analytical depth to draft multilateral treaties and navigate complex crisis simulations.',
    },
    {
      title: 'Globally Conscious Leadership',
      desc: 'Transforming Model UN from a trophy-driven contest into a life-changing platform for empathetic, visionary youth leaders.',
    },
  ],
};

export const MENTORS_DATA: MentorProfile[] = [
  {
    id: 'mentor-1',
    name: 'Senior Crisis & UNSC Master Trainer',
    role: 'Head of Crisis Simulation & Procedure',
    specialization: 'Joint Crisis Cabinets (JCC), UNSC & Strategic Directives',
    experience: '6+ Years in Competitive MUN Circuit // 30+ Conferences',
    delegatesTrained: '450+ Delegates',
    achievements: [
      'Best Delegate & Secretary General at premier national circuits',
      'Author of Illuminati Crisis Playbook v4.2',
      'Specialist in double-blind asymmetric negotiation',
    ],
    bio: 'Renowned for orchestrating intense, fast-paced crisis simulations that challenge delegates to think three moves ahead under extreme time constraints.',
    quote: 'In a crisis room, leverage is not what you have — it is what you convince the other room you are willing to unleash.',
    badge: 'CHIEF CRISIS MENTOR',
    code: 'MENTOR-CRISIS-01',
  },
  {
    id: 'mentor-2',
    name: 'Lead Oratory & Negotiation Strategist',
    role: 'Director of Public Speaking & Caucus Dynamics',
    specialization: 'Unmoderated Caucus Leadership, Resolution Drafting & Oratory',
    experience: '5+ Years // Harvard MUN & WorldMUN Alumnus',
    delegatesTrained: '380+ Delegates',
    achievements: [
      'Trained 25+ Best Delegate award winners',
      'Conducted masterclasses for school delegations across India & USA',
      'Expert in rhetoric, body language, and impromptu persuasion',
    ],
    bio: 'Specializes in transforming shy, hesitant first-timers into commanding committee speakers who shape resolution blocs and drive voting consensus.',
    quote: 'The most powerful speech in the United Nations is not the loudest, but the one that makes everyone in the room feel understood.',
    badge: 'ORATORY COACH',
    code: 'MENTOR-ORATORY-02',
  },
  {
    id: 'mentor-3',
    name: 'International Law & Treaty Analyst',
    role: 'Head of Policy Research & Academic Dossiers',
    specialization: 'UN Charters, International Court of Justice & DISEC Policy',
    experience: '4+ Years // Legal Research Fellow',
    delegatesTrained: '280+ Delegates',
    achievements: [
      'Curator of Illuminati Background Guides & Study Matrices',
      'Specialist in disarmament treaties and autonomous weapons ethics',
      'Mentor for specialized and legal chambers',
    ],
    bio: 'Guides delegates through rigorous treaty dissection, clause construction, and citation verification to make draft resolutions airtight.',
    quote: 'Precision of legal wording turns a toothless statement into an enforceable multilateral pact.',
    badge: 'TREATY ANALYST',
    code: 'MENTOR-POLICY-03',
  },
  {
    id: 'mentor-4',
    name: 'Global Exchange & Cross-Cultural Mentor',
    role: 'Coordinator of International Delegate Programmes',
    specialization: 'Bilateral Diplomacy & Latin America / US MUN Exchange',
    experience: '4+ Years // Bilingual Diplomatic Liaison',
    delegatesTrained: '220+ Delegates',
    achievements: [
      'Architect of DBBMUN Mexico diplomatic exchange program',
      'Host of transcontinental intercultural debate workshops',
      'Certified cross-border youth facilitator',
    ],
    bio: 'Bridges linguistic and cultural perspectives to prepare delegates for international conferences and global committee environments.',
    quote: 'Global diplomacy begins when you listen to foreign viewpoints with the same curiosity as your own.',
    badge: 'GLOBAL EXCHANGE',
    code: 'MENTOR-GLOBAL-04',
  },
];

export interface BoardAdvisorDossier {
  id: string;
  name: string;
  honorific: string;
  role: string;
  societyRole: string;
  experienceYears: string;
  scope: string;
  code: string;
  badge: string;
  honor: string;
  photos: {
    id: string;
    label: string;
    caption: string;
    url: string;
    fallbackUrl: string;
    originalUrl: string;
    aspect: string;
  }[];
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
  bioParagraphs: string[];
  corePillars: {
    title: string;
    desc: string;
    icon: string;
  }[];
  quote: string;
  impactAreas: string[];
}

export const SUBRAT_SARANGI_DOSSIER: BoardAdvisorDossier = {
  id: 'advisor-board-head',
  name: 'Mr. Subrat Kumar Sarangi',
  honorific: 'Educational Consultant & Board of Advisory',
  role: 'Educational Consultant cum Board Of Advisory Illuminati International MUN Society',
  societyRole: 'Board of Advisory & Educational Consultant',
  experienceYears: '25+ Years',
  scope: 'International Education Leadership & Institutional Operations',
  code: 'ADV-BOARD-SKS-01',
  badge: 'BOARD OF ADVISORY',
  honor: '25+ YEARS INTERNATIONAL EDUCATION LEADERSHIP',
  photos: [
    {
      id: 'portrait',
      label: 'EXECUTIVE PORTRAIT SCAN',
      caption: 'Mr. Subrat Kumar Sarangi — Official Diplomatic & Advisory Board Portrait',
      url: '/board-portrait.webp',
      fallbackUrl: '/board2.jpg',
      originalUrl: '/board2.jpg',
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'desk-office',
      label: 'INSTITUTIONAL LEADERSHIP ARCHIVE',
      caption: 'Mr. Subrat Kumar Sarangi — Academic Operations & Institutional Planning Suite',
      url: '/board-desk.webp',
      fallbackUrl: '/board.jpg',
      originalUrl: '/board.jpg',
      aspect: 'aspect-[4/3]',
    },
  ],
  stats: [
    {
      label: 'International Experience',
      value: '25+ Years',
      detail: 'In education, school leadership & institutional governance',
    },
    {
      label: 'Academic Planning',
      value: 'Excellence',
      detail: 'Strategic curriculum design & academic operations',
    },
    {
      label: 'Human Capital Development',
      value: 'Staff & Students',
      detail: 'Nurturing educator pedagogy & student well-being',
    },
    {
      label: 'Institutional Success',
      value: 'Continuous Growth',
      detail: 'Transformative leadership driving cultural improvement',
    },
  ],
  bioParagraphs: [
    'Mr. Subrat Kumar Sarangi serves as the Educational Consultant cum Board Of Advisory for the Illuminati International MUN Society.',
    'With over 25 years of International experience in education, spanning school leadership, administration, academic planning, and institutional operations, he has made significant contributions to the growth and development of students, teachers, and educational institutions.',
    'His unwavering focus on academic excellence, staff development, student well-being, and fostering a positive school culture has consistently driven institutional success and continuous improvement.',
    'We are confident that his extensive experience, visionary leadership, and steadfast commitment to quality education will enable him to make a meaningful and lasting contribution to any organization he serves.',
  ],
  corePillars: [
    {
      title: 'School Leadership & Administration',
      desc: 'Orchestrating high-standard institutional governance, compliance, strategic policy execution, and day-to-day operational excellence.',
      icon: 'Building2',
    },
    {
      title: 'Academic Planning & Excellence',
      desc: 'Architecting rigorous academic frameworks and transformative curricula that empower learners to achieve holistic international benchmarks.',
      icon: 'BookOpenCheck',
    },
    {
      title: 'Staff Development & Mentorship',
      desc: 'Empowering educators through modern pedagogy, continuous professional development, and structured pedagogical mentorship programs.',
      icon: 'Users',
    },
    {
      title: 'Student Well-Being & Positive Culture',
      desc: 'Fostering empathetic, inclusive, and uplifting school environments where students thrive mentally, emotionally, and academically.',
      icon: 'HeartHandshake',
    },
  ],
  quote:
    'True educational leadership is defined by an unwavering commitment to quality, elevating teachers, inspiring students, and cultivating an institutional culture where excellence is a daily habit.',
  impactAreas: [
    'International School Leadership',
    'Academic Planning & Curriculum Strategy',
    'Institutional Operations & Governance',
    'Staff Pedagogy & Professional Development',
    'Student Well-Being Frameworks',
    'Global Educational Consultancy',
  ],
};

export const ADVISORS_DATA: AdvisorProfile[] = [
  {
    id: 'advisor-1',
    name: 'Dr. Alok Mohapatra',
    title: 'Senior Diplomatic & Academic Advisory Chair',
    institution: 'Distinguished Professor of International Relations & Geopolitics',
    expertise: 'Multilateral Diplomacy, Indo-Pacific Security & Foreign Policy',
    tenure: 'Advisor since 2023',
    statement:
      'Illuminati MUN Society has created a benchmark in experiential youth education in eastern India. Their emphasis on authentic research and diplomatic decorum sets them apart from conventional student clubs.',
    focusArea: 'Academic Oversight & Geopolitical Integrity',
    badge: 'CHIEF ADVISOR',
    code: 'ADV-SR-01',
  },
  {
    id: 'advisor-2',
    name: 'Carlos Mendoza-Vega',
    title: 'International Affairs & Latin American Liaison Advisor',
    institution: 'DBBMUN Secretariat & Global MUN Network (Mexico)',
    expertise: 'Cross-Border Delegate Exchanges & Youth Assembly Operations',
    tenure: 'Advisor since 2024',
    statement:
      'Our alliance with Illuminati MUN has proven that geographic distances vanish when young diplomats unite over shared global challenges. Their curriculum is inspiring and internationally aligned.',
    focusArea: 'International Exchange Protocols',
    badge: 'GLOBAL ADVISOR',
    code: 'ADV-INT-02',
  },
  {
    id: 'advisor-3',
    name: 'Sunita Patnaik',
    title: 'Institutional Development & School Outreach Advisor',
    institution: 'Senior Educator & Youth Leadership Trustee, Modern Public School Balasore',
    expertise: 'School-Level MUN Integration & Grassroots Mentorship Frameworks',
    tenure: 'Advisor since 2024',
    statement:
      'Illuminati’s support during MPS MUN and regional conclaves empowered high school students with newfound eloquence and global awareness that traditional curricula rarely provide.',
    focusArea: 'School Conclaves & Pedagogy',
    badge: 'INSTITUTIONAL ADVISOR',
    code: 'ADV-EDU-03',
  },
  {
    id: 'advisor-4',
    name: 'Adv. Rajeshwar Sen',
    title: 'Constitutional & Rules of Procedure Ombudsman',
    institution: 'Advocate & Former President of National Moot & Parliamentary Debate Council',
    expertise: 'Parliamentary Procedure, Dispute Resolution & Ethical Conduct',
    tenure: 'Advisor since 2023',
    statement:
      'The procedural rigor practiced across Illuminati conferences guarantees impartial committee leadership, intellectual fairness, and authentic crisis management.',
    focusArea: 'Procedural Fairness & Ethics',
    badge: 'OMBUDSMAN',
    code: 'ADV-ETH-04',
  },
];

export const GALLERY_ARCHIVES: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'All Conferences Assembly & Grand Plenary Conclave',
    category: 'All Conferences',
    location: 'Illuminati Diplomatic Assembly',
    date: 'AUG 2026',
    caption: 'Comprehensive visual showcase of the full roster of Illuminati Model United Nations conferences, national circuits, and delegate conclaves.',
    tag: 'CONFERENCE CONCLAVE',
    imageUrl: '/gall/all-conferences.webp',
    fallbackUrl: '/gall/all-conferences.png',
    attendees: 'Pan-Circuit Showcase',
    dossierRef: 'ARCHIVE-GALL-01',
    dimensions: '2880 × 1800 HD',
    highlights: ['Multi-Committee Overview', 'National Circuit Roster', 'Diplomatic Assemblies'],
  },
  {
    id: 'gal-02',
    title: 'Distinguished Guest Talk & Diplomatic Keynote Address',
    category: 'Guest Talks',
    location: 'Executive Diplomatic Forum',
    date: 'AUG 2026',
    caption: 'High-impact keynote speaker engagement and guest talk session delivering strategic insights on global foreign policy, international law, and youth diplomacy.',
    tag: 'GUEST KEYNOTE',
    imageUrl: '/gall/guest-talk.webp',
    fallbackUrl: '/gall/guest-talk.png',
    attendees: 'Keynote & Executive Delegates',
    dossierRef: 'ARCHIVE-GALL-02',
    dimensions: '2880 × 1800 HD',
    highlights: ['Special Diplomatic Address', 'Foreign Policy Insights', 'Youth Leadership Dialogue'],
  },
  {
    id: 'gal-03',
    title: 'Live Committee Proceedings & Parliamentary Deliberation I',
    category: 'Live Proceedings',
    location: 'Assembly Chamber Alpha',
    date: 'AUG 2026',
    caption: 'Active committee proceedings, structured moderated caucuses, resolution formulation, and high-intensity delegate debate in session.',
    tag: 'PARLIAMENTARY DEBATE',
    imageUrl: '/gall/diplomatic-session-1.webp',
    fallbackUrl: '/gall/diplomatic-session-1.png',
    attendees: 'Committee Delegates & Dais',
    dossierRef: 'ARCHIVE-GALL-03',
    dimensions: '2880 × 1800 HD',
    highlights: ['Moderated Caucus', 'Resolution Drafting', 'Speaker List Deliberation'],
  },
  {
    id: 'gal-04',
    title: 'Executive Board Deliberations & Crisis Directive Caucus II',
    category: 'Executive Sessions',
    location: 'Crisis Council Chamber',
    date: 'AUG 2026',
    caption: 'Executive Board monitoring of multilateral crisis rollouts, tactical delegate negotiations, unmoderated lobbying blocs, and working paper presentations.',
    tag: 'EXECUTIVE CAUCUS',
    imageUrl: '/gall/diplomatic-session-2.webp',
    fallbackUrl: '/gall/diplomatic-session-2.png',
    attendees: 'Executive Dais & Delegations',
    dossierRef: 'ARCHIVE-GALL-04',
    dimensions: '2880 × 1800 HD',
    highlights: ['Executive Board Monitoring', 'Lobbying Blocs', 'Crisis Directives'],
  },
];
