export interface CertificationItem {
  id: string;
  title: string;
  institution: string;
  year?: string;
  code: string;
  type: 'Accreditation' | 'Diplomacy' | 'Well-Being' | 'Consulting';
}

export interface LeadershipRoleItem {
  role: string;
  organization: string;
  tenureOrScope: string;
  description: string;
}

export interface InternationalCollabDossier {
  name: string;
  commonName: string;
  title: string;
  subtitle: string;
  allianceName: string;
  organization: string;
  foundationRole: string;
  code: string;
  clearance: string;
  experienceYears: string;
  conferencesTrained: string;
  countriesCount: string;
  photoUrl: string;
  fallbackPhotoUrl: string;
  logoUrl: string;
  fallbackLogoUrl: string;
  bioParagraphs: string[];
  certifications: CertificationItem[];
  leadershipRoles: LeadershipRoleItem[];
  nationsActive: { name: string; flag: string; role: string }[];
  featuredInstitutions: string[];
  quote: string;
}

export const INTERNATIONAL_COLLAB_DATA: InternationalCollabDossier = {
  name: 'Georgina Farrés Wartenweiler',
  commonName: 'Gina',
  title: 'Senior Educational Consultant, Model United Nations (MUN) Expert & Language Educator',
  subtitle: 'Founder, Delegates Beyond Borders (DBBMUN - Mexico & USA) | President, Fundación Delegates Beyond Borders',
  allianceName: 'Delegates Beyond Borders (DBBMUN) ⇄ Illuminati MUN Society',
  organization: 'Delegates Beyond Borders, LLC',
  foundationRole: 'President, Fundación Delegates Beyond Borders',
  code: 'INT-COLLAB-DBB-002',
  clearance: 'INTERNATIONAL ALLIANCE // DIPLOMATIC CLEARANCE VERIFIED',
  experienceYears: '30 Years Experience',
  conferencesTrained: '200+ International Conferences',
  countriesCount: '7+ Nations (Mexico, Perú, USA, Italy, Portugal, India, China)',
  photoUrl: '/intcol/founder-dbbmun.webp',
  fallbackPhotoUrl: '/intcol/founder-dbbmun.jpg',
  logoUrl: '/intcol/dbbmun-logo.webp',
  fallbackLogoUrl: '/intcol/dbbmun-logo.jpg',
  quote:
    'Fostering student excellence in diplomacy, critical thinking, and global citizenship prepares the next generation of youth leaders for an interconnected world.',
  bioParagraphs: [
    'Georgina Farrés Wartenweiler is a Senior Educational Consultant, Model United Nations (MUN) expert, and language educator with 30 years of experience in English and Spanish Language Arts, curriculum development, and global education. With deep commitment to fostering student excellence in diplomacy, critical thinking, and global citizenship, Gina has played a pivotal role in shaping innovative programs that prepare students for leadership in an interconnected world.',
    'As a founder of Delegates Beyond Borders, LLC, and the President of the Fundación Delegates Beyond Borders, she has trained thousands for over 200 international conferences, including events at Harvard and Southwestern University, Liceo Marco Foscarini (Italy) and the United Nations Headquarters (NYC). As General Coordinator for 20 years of BIMUN & BIMUN Bajío (Fundación Cultural Baur), she facilitated global engagement for young leaders.',
    'Beyond MUN, Gina is a Consultant for Translate Solutions and DBB specializing in cross-cultural curriculum development and bilingual education strategies in the USA and Mexico. Human Rights Education and leadership training initiatives from USIDHR, Yale University, and Universidade Atlàntica, have helped Gina refined her expertise in academic diplomacy and students’ well-being.',
    'Holding multiple degree, diplomas and certifications, including Virtual MUN Advising (BD, 2024), Human Rights Consulting (USIDHR, 2022), and the Science of Well-Being (Yale, 2020), Model UN Workshop, United Nations DPI (UNHQ, 2013), along with an ELT Accreditation from CENEVAL, and Cambridge In-service Certificate in ELT, as well as several International Baccalaureate trainings, Gina remains committed to continuous professional development and educational excellence.',
    'Engaged in global conferences and educational initiatives, Gina has served for nine years as Academic Director for SICMUN, Faculty Advisor for NYC-FWWMUN, and HAPPY.MUN 2024 at Universidade Atlântica in Portugal, and a mentor at MUN conferences for almost 30 years across Mexico, Perú, USA, Italy, Portugal, India, and China.',
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Virtual MUN Advising',
      institution: 'Best Delegate (BD)',
      year: '2024',
      code: 'CERT-BD-2024-VMUN',
      type: 'Diplomacy',
    },
    {
      id: 'cert-2',
      title: 'Human Rights Consulting',
      institution: 'US Institute of Diplomacy & Human Rights (USIDHR)',
      year: '2022',
      code: 'CERT-USIDHR-HR-2022',
      type: 'Consulting',
    },
    {
      id: 'cert-3',
      title: 'The Science of Well-Being',
      institution: 'Yale University',
      year: '2020',
      code: 'CERT-YALE-WELLBEING-2020',
      type: 'Well-Being',
    },
    {
      id: 'cert-4',
      title: 'Model UN Workshop',
      institution: 'United Nations DPI (UNHQ NYC)',
      year: '2013',
      code: 'UN-DPI-UNHQ-2013',
      type: 'Diplomacy',
    },
    {
      id: 'cert-5',
      title: 'ELT Accreditation',
      institution: 'CENEVAL (National Center for Higher Education Assessment)',
      year: 'Accredited',
      code: 'CENEVAL-ELT-ACCRED',
      type: 'Accreditation',
    },
    {
      id: 'cert-6',
      title: 'Cambridge In-service Certificate in ELT',
      institution: 'University of Cambridge (Cambridge Assessment English)',
      year: 'Certified',
      code: 'CAMBRIDGE-ICELT',
      type: 'Accreditation',
    },
    {
      id: 'cert-7',
      title: 'International Baccalaureate (IB) Specialist Trainings',
      institution: 'International Baccalaureate Organization',
      year: 'Multi-Cert',
      code: 'IB-DIPLOMA-PEDAGOGY',
      type: 'Accreditation',
    },
    {
      id: 'cert-8',
      title: 'Leadership & Academic Diplomacy Trainings',
      institution: 'Universidade Atlântica (Portugal)',
      year: '2024',
      code: 'UNIV-ATLANTICA-DIPLO',
      type: 'Diplomacy',
    },
  ],
  leadershipRoles: [
    {
      role: 'Founder & Senior Partner',
      organization: 'Delegates Beyond Borders, LLC (DBBMUN - Mexico & USA)',
      tenureOrScope: 'Current',
      description: 'Pioneering global diplomatic education programs, cross-continental MUN delegations, and transatlantic educational frameworks.',
    },
    {
      role: 'President',
      organization: 'Fundación Delegates Beyond Borders',
      tenureOrScope: 'Current',
      description: 'Directing philanthropic youth diplomacy outreach, accessible educational programs, and delegate empowerment foundations.',
    },
    {
      role: 'General Coordinator (20 Years)',
      organization: 'BIMUN & BIMUN Bajío (Fundación Cultural Baur)',
      tenureOrScope: '20 Years',
      description: 'Facilitating global engagement, committee operations, and high-impact international simulations for thousands of young leaders.',
    },
    {
      role: 'Academic Director (9 Years)',
      organization: 'SICMUN',
      tenureOrScope: '9 Years',
      description: 'Guiding academic policy, committee design, study guide standards, and delegate evaluation criteria across nearly a decade.',
    },
    {
      role: 'Faculty Advisor',
      organization: 'NYC-FWWMUN & HAPPY.MUN 2024 (Universidade Atlântica, Portugal)',
      tenureOrScope: '2024 & Ongoing',
      description: 'Advising international delegations at leading European and North American Model UN assemblies and universities.',
    },
    {
      role: 'Senior Consultant',
      organization: 'Translate Solutions & DBB',
      tenureOrScope: 'USA & Mexico',
      description: 'Specializing in cross-cultural curriculum development, bilingual education strategies, and student well-being pedagogy.',
    },
  ],
  nationsActive: [
    { name: 'Mexico', flag: '🇲🇽', role: 'HQ & BIMUN / DBB Base' },
    { name: 'United States', flag: '🇺🇸', role: 'Harvard, Southwestern, NYC-FWWMUN, UNHQ' },
    { name: 'Peru', flag: '🇵🇪', role: 'Regional Masterclasses & Mentorship' },
    { name: 'Italy', flag: '🇮🇹', role: 'Liceo Marco Foscarini & European Panels' },
    { name: 'Portugal', flag: '🇵🇹', role: 'HAPPY.MUN 2024, Universidade Atlântica' },
    { name: 'India', flag: '🇮🇳', role: 'Illuminati MUN Society Alliance & Global Circuits' },
    { name: 'China', flag: '🇨🇳', role: 'International Conference Mentorship' },
  ],
  featuredInstitutions: [
    'United Nations Headquarters (UNHQ, NYC)',
    'Harvard University',
    'Southwestern University',
    'Yale University',
    'Liceo Marco Foscarini (Italy)',
    'Universidade Atlântica (Portugal)',
    'Fundación Cultural Baur (BIMUN & BIMUN Bajío)',
    'US Institute of Diplomacy & Human Rights (USIDHR)',
    'Cambridge Assessment English',
    'CENEVAL',
    'Delegates Beyond Borders (DBBMUN)',
    'Illuminati MUN Society (India)',
  ],
};
