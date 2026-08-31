import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

const INITIAL_COMMITTEES = [
  {
    id: 'unsc',
    code: 'UNSC-01',
    name: 'UN Security Council',
    fullName: 'United Nations Security Council: Operation Blindspot',
    type: 'Crisis',
    clearanceLevel: 'COSMIC TOP SECRET',
    director: 'Amb. Elena Rostova',
    coDirector: 'Marcus Vance',
    delegateCount: 15,
    agendaTopic: 'Naval Brinkmanship, Submarine Black Zones, and Asymmetric Blockades in the Malacca Strait',
    brief: 'A catastrophic multi-point undersea fiber cable severance paralyzes Indian Ocean trade. Submarines without flag identification occupy key choke points.',
    keyCountries: ['United States', 'People’s Republic of China', 'Russian Federation', 'United Kingdom', 'France', 'Japan', 'India'],
  },
  {
    id: 'unhrc',
    code: 'UNHRC-02',
    name: 'UN Human Rights Council',
    fullName: 'Human Rights Council // Global Digital Privacy Conclave',
    type: 'Standard General Assembly',
    clearanceLevel: 'RESTRICTED DIPLOMATIC',
    director: 'Dr. Tariq Al-Mansoor',
    coDirector: 'Sofia Chen',
    delegateCount: 47,
    agendaTopic: 'Digital Surveillance, Cross-Border Biometric Harvest, and Stateless Refugee Protections',
    brief: 'Deliberating global regulatory standards for automated mass surveillance technologies and protecting asylum seekers in sovereign buffer corridors.',
    keyCountries: ['Germany', 'Brazil', 'South Africa', 'Canada', 'Nigeria', 'Norway', 'India'],
  },
  {
    id: 'aippm',
    code: 'AIPPM-03',
    name: 'All India Political Meet',
    fullName: 'All India Political Party Meet: Federal Electoral Reforms',
    type: 'Specialized Regional Body',
    clearanceLevel: 'CONFIDENTIAL // PARLIAMENTARY',
    director: 'Rajeshwar Sharma',
    coDirector: 'Ananya Pattnaik',
    delegateCount: 35,
    agendaTopic: 'One Nation One Election, Delimitation Concerns, and Inter-State Fiscal Federalism',
    brief: 'High-stakes debate on constitutional balance of power, simultaneous elections, and resource redistribution across Indian states.',
    keyCountries: ['Ruling Coalition', 'Principal Opposition', 'Regional Fronts', 'Independent Bloc'],
  },
  {
    id: 'unodc',
    code: 'UNODC-04',
    name: 'UN Office on Drugs & Crime',
    fullName: 'United Nations Office on Drugs and Crime: Darknet Syndicates',
    type: 'Specialized Committee',
    clearanceLevel: 'SECRET // LAW ENFORCEMENT',
    director: 'Vikram Sengupta',
    coDirector: 'Claire Dubois',
    delegateCount: 30,
    agendaTopic: 'Combating Synthetic Narcotics, Crypto-Laundering, and Transnational Maritime Smuggling',
    brief: 'Addressing decentralized darknet distribution channels and illicit financial instruments bypassing traditional banking oversight.',
    keyCountries: ['Mexico', 'Colombia', 'United States', 'Netherlands', 'Singapore', 'Australia', 'India'],
  },
  {
    id: 'sochum',
    code: 'SOCHUM-05',
    name: 'Social, Humanitarian & Cultural',
    fullName: 'General Assembly 3rd Committee (SOCHUM)',
    type: 'Beginner-Friendly Assembly',
    clearanceLevel: 'OPEN DIPLOMATIC',
    director: 'Priyanka Das',
    coDirector: 'Ethan Miller',
    delegateCount: 50,
    agendaTopic: 'Equitable Global Access to Education in Post-Conflict Zones and Climate-Displaced Populations',
    brief: 'Drafting multinational comprehensive frameworks to restore schooling infrastructure and safeguard indigenous cultural heritage in active crisis zones.',
    keyCountries: ['Kenya', 'Bangladesh', 'Jordan', 'Sweden', 'Philippines', 'Egypt', 'India'],
  },
];

const INITIAL_DISPATCHES = [
  {
    id: 'dispatch-1',
    headline: 'PRIORITY: DELEGATE REGISTRATION DOSSIERS NOW OPEN FOR ANNUAL CONVOCATION',
    category: 'BREAKING',
    priority: 1,
    isActive: true,
  },
  {
    id: 'dispatch-2',
    headline: 'BILATERAL ACCREDITATION: DBBMUN (MEXICO) ⇄ ILLUMINATI MUN ALLIANCE ACTIVE',
    category: 'PARTNERSHIP',
    priority: 2,
    isActive: true,
  },
  {
    id: 'dispatch-3',
    headline: '1-ON-1 DELEGATE MASTERCLASS SLOTS WITH FOUNDER SUBHRAKANT BISWAL OPEN',
    category: 'DISPATCH',
    priority: 3,
    isActive: true,
  },
];

async function seedDatabase() {
  console.log('🏛️ Starting Firestore database seed for Illuminati MUN...');

  // 1. Seed Committees
  const batch = db.batch();

  for (const committee of INITIAL_COMMITTEES) {
    const ref = db.collection('conferences').doc('annual-2026').collection('committees').doc(committee.id);
    batch.set(ref, {
      ...committee,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    console.log(`  + Queued committee: ${committee.name}`);
  }

  // 2. Seed Live Marquee Dispatches
  for (const dispatch of INITIAL_DISPATCHES) {
    const ref = db.collection('marquee_dispatches').doc(dispatch.id);
    batch.set(ref, {
      ...dispatch,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    console.log(`  + Queued dispatch: ${dispatch.headline.slice(0, 40)}...`);
  }

  await batch.commit();
  console.log('✅ Database seeded successfully! All default committees & dispatches initialized.');
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
