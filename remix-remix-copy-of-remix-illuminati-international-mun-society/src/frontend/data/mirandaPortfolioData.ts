export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  badge?: string;
  image: string;
  gallery?: string[];
  description: string;
  brief: string;
  solution: string;
  recognition?: string[];
  link?: string;
  accentColor?: string;
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'odmmun',
    slug: 'odmmun-2024',
    title: 'ODMMUN 2024',
    subtitle: 'ODM Public School, Bhubaneswar',
    category: 'Institutional Summit',
    year: '2024',
    client: 'ODM Educational Group',
    role: 'Secretariat & Turnkey Executive Board',
    badge: 'NEW',
    image: '/collaborations/ODMMUN - ODM PUBLIC SCHOOL.webp',
    gallery: [
      '/collaborations/ODMMUN - ODM PUBLIC SCHOOL.webp',
      '/gall/all-conferences.webp',
      '/gall/diplomatic-session-1.webp'
    ],
    description: 'Premier inter-school conference convening 450+ delegates across UNSC, UNHRC, and AIPPM with accredited Executive Board governance.',
    brief: 'Designing an all-encompassing Model UN ecosystem for 450+ student delegates, providing end-to-end procedural governance, background guides, and chairing.',
    solution: 'Engineered a specialized crisis simulation framework, dynamic committee press wires, and a gold-standard Rules of Procedure (ROP) training curriculum.',
    recognition: ['Best Institutional Conference 2024', '450+ Delegates Accredited', 'UNSC Live Crisis Protocol'],
    link: '#',
    accentColor: '#C5A059'
  },
  {
    id: 'fbsmun',
    slug: 'fbsmun-2024',
    title: 'FBSMUN 2024',
    subtitle: 'Future Bhubaneswar School',
    category: 'Diplomatic Symposium',
    year: '2024',
    client: 'Future Bhubaneswar School',
    role: 'Academic Directorate & Dais Curation',
    badge: 'NEW',
    image: '/collaborations/FBS MUN (Future bhubnaeswar school).webp',
    gallery: [
      '/collaborations/FBS MUN (Future bhubnaeswar school).webp',
      '/gall/diplomatic-session-2.webp',
      '/gall/guest-talk.webp'
    ],
    description: 'High-rigor academic symposium featuring crisis simulations, youth leadership masterclasses, and bilateral consensus draft resolutions.',
    brief: 'Elevating novice delegates into confident diplomats through pre-conference bootcamps and custom-curated committee matrix agendas.',
    solution: 'Conducted interactive procedural drills, delivered comprehensive delegate dossiers, and orchestrated high-stakes midnight crisis directives.',
    recognition: ['Outstanding Dais Excellence', '350+ Youth Leaders Trained', 'Unanimous Resolution Ratification'],
    link: '#',
    accentColor: '#0B192C'
  },
  {
    id: 'dbbmun',
    slug: 'dbbmun-global',
    title: 'DBBMUN GLOBAL',
    subtitle: 'Mexico & USA Bilateral Alliance',
    category: 'International Circuit',
    year: '2025',
    client: 'DBBMUN International Secretariat',
    role: 'Global Liaison & Cross-Border Mentorship',
    badge: 'GLOBAL',
    image: '/intcol/dbbmun-logo.webp',
    gallery: [
      '/intcol/dbbmun-logo.webp',
      '/intcol/founder-dbbmun.webp',
      '/gall/diplomatic-session-1.webp'
    ],
    description: 'International exchange pipeline connecting Indian delegates with North American debate circuits and joint bilateral resolutions.',
    brief: 'Establishing a cross-continental bridge between grassroots delegates in Eastern India and international MUN circuits across Mexico and the United States.',
    solution: 'Curated joint online committee sessions, bilateral diplomacy simulations, and mutual delegate scholarship opportunities.',
    recognition: ['International Diplomacy Partnership Award', 'Cross-Border Delegate Exchange', 'Harvard ROP Alignment'],
    link: '#',
    accentColor: '#C5A059'
  },
  {
    id: 'mpsmun',
    slug: 'mpsmun-2024',
    title: 'MPS MUN 2024',
    subtitle: 'Modern Public School, Balasore',
    category: 'Turnkey Summit',
    year: '2024',
    client: 'Modern Public School',
    role: 'Full Turnkey Secretariat',
    badge: 'NEW',
    image: '/collaborations/MODERN PUBLIC SCHOOL - MPS MUN.webp',
    gallery: [
      '/collaborations/MODERN PUBLIC SCHOOL - MPS MUN.webp',
      '/gall/all-conferences.webp',
      '/gall/guest-talk.webp'
    ],
    description: 'Comprehensive turnkey Model UN setup with 350+ delegates, pre-conference training bootcamps, and official society delegate kits.',
    brief: 'Bringing a premier national-grade conference to regional student communities in Balasore with zero prior MUN experience.',
    solution: 'Deployed a 12-member Executive Board team, provided physical study dossiers, and directed 5 committee simulations with 100% participation.',
    recognition: ['Regional Innovation in Youth Debate', 'Turnkey Execution Record', 'Best Delegate Pipeline'],
    link: '#',
    accentColor: '#0B192C'
  },
  {
    id: 'sxmun',
    slug: 'sxmun-2025',
    title: 'SXMUN 2025',
    subtitle: 'Barabati Cuttack Circuit',
    category: 'Regional Secretariat',
    year: '2025',
    client: 'St. Xavier Barabati Secretariat',
    role: 'Committee Directorate',
    badge: 'ACCREDITED',
    image: '/collaborations/SXMUN - BARABATI CUTTACK.webp',
    gallery: [
      '/collaborations/SXMUN - BARABATI CUTTACK.webp',
      '/gall/diplomatic-session-2.webp',
      '/gall/all-conferences.webp'
    ],
    description: 'Historic committee simulation addressing maritime dispute resolutions, historical cabinet crises, and regional security frameworks.',
    brief: 'Designing a bespoke Historical Crisis Committee (HCC) and All India Political Parties Meet (AIPPM).',
    solution: 'Constructed custom press wire feeds, real-time crisis communiqués, and bilingual legislative negotiation mechanics.',
    recognition: ['Historical Simulation Mastery', 'Bilingual Debate Protocol'],
    link: '#',
    accentColor: '#C5A059'
  }
];

export interface AwardItem {
  count: string;
  title: string;
  organization: string;
  category: string;
  year: string;
}

export const PORTFOLIO_AWARDS: AwardItem[] = [
  {
    count: '750+',
    title: 'Active Society Members in Odisha',
    organization: 'Illuminati International MUN Society Community',
    category: 'Society Accomplishment',
    year: 'Established & Growing'
  },
  {
    count: '1,000+',
    title: 'Students Mentored Globally via Masterclasses',
    organization: 'Illuminati Accessible Education Initiative',
    category: 'Society Accomplishment',
    year: 'Worldwide'
  },
  {
    count: '2023',
    title: 'Governor Awardee, Odisha (Subhrakant Biswal)',
    organization: 'State Honor for Youth Leadership & Diplomacy',
    category: 'Founder Personal Award',
    year: '2023'
  },
  {
    count: '60+',
    title: 'Conferences Attended in India & Globally (Subhrakant Biswal)',
    organization: '7 Years Experience Across National & Global Circuit',
    category: 'Founder Track Record',
    year: '7-Year Career'
  },
  {
    count: '03+',
    title: 'Major Institutional Conferences Supported (ODMMUN, FBSMUN, MPS MUN)',
    organization: 'School Conclaves & Secretariat Development',
    category: 'Society Accomplishment',
    year: 'Institutional'
  },
  {
    count: '01×',
    title: 'Bilateral Alliance with DBBMUN (Mexico & USA)',
    organization: 'International Diplomatic & Cross-Border Exchange',
    category: 'Global Alliance',
    year: 'International'
  }
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  org: string;
  avatar: string;
  dispatchNo: string;
}

export const PORTFOLIO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Illuminati transformed how our delegates understand multilateral negotiations. Their Executive Board conducts committees with world-class procedural rigor.',
    author: 'Dr. S. K. Roy',
    role: 'Principal & Senior MUN Patron',
    org: 'ODM Public School',
    avatar: '/collaborations/ODMMUN - ODM PUBLIC SCHOOL.webp',
    dispatchNo: 'DISPATCH #104'
  },
  {
    id: 't2',
    quote: 'The pre-conference masterclasses and curated dossiers gave our first-time students the confidence to win Best Delegate gavels on national stages.',
    author: 'Aparna Jena',
    role: 'Senior Academic Advisor & Mentor',
    org: 'Illuminati Advisory Board',
    avatar: '/collaborations/FBS MUN (Future bhubnaeswar school).webp',
    dispatchNo: 'DISPATCH #105'
  },
  {
    id: 't3',
    quote: 'An indispensable partner for institutional conferences. The Secretariat handled council curation, crisis matrix design, and scoring seamlessly.',
    author: 'Rahul Pattnaik',
    role: 'Executive Board Chair',
    org: 'Eastern India Circuit',
    avatar: '/collaborations/MODERN PUBLIC SCHOOL - MPS MUN.webp',
    dispatchNo: 'DISPATCH #106'
  },
  {
    id: 't4',
    quote: 'Bridging grassroots schools in Eastern India with global circuits in Mexico and the United States with unprecedented diplomatic vision.',
    author: 'Carlos Mendoza',
    role: 'International Secretariat Liaison',
    org: 'DBBMUN Mexico & USA',
    avatar: '/intcol/dbbmun-logo.webp',
    dispatchNo: 'DISPATCH #107'
  }
];

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'THINK',
    subtitle: 'Strategic Agenda & Matrix Formulation',
    description: 'We analyze geopolitics and regional priorities to design high-impact committee agendas with comprehensive study guides.',
    details: ['Procedural Matrix Design', 'Agenda Background Guides', 'Executive Board Selection']
  },
  {
    step: '02',
    title: 'CREATE',
    subtitle: 'Immersive Crisis & Diplomatic Engines',
    description: 'From live intelligence wires to bilateral negotiation frameworks, we build dynamic simulations where every delegate voice counts.',
    details: ['Live Crisis Matrices', 'Bilateral Alliance Drafting', 'Press Corps Wire Updates']
  },
  {
    step: '03',
    title: 'DELIVER',
    subtitle: 'Flawless Secretariat Execution',
    description: 'We orchestrate turnkey conference governance, dais moderation, scoring rubrics, and resolution ratifications with unyielding rigor.',
    details: ['Dais Protocol & ROP', 'Scoring & Award Rubrics', 'Plenary Resolution Archives']
  }
];
