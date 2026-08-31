export type PageId = 'home' | 'founder' | 'mentors' | 'advisor' | 'gallery' | 'contacts' | 'book-session';

export interface Committee {
  id: string;
  code: string;
  name: string;
  fullName: string;
  type: 'General Assembly' | 'Crisis' | 'Specialized' | 'Double-Blind';
  clearanceLevel: 'LEVEL 1' | 'LEVEL 2' | 'LEVEL 3' | 'COSMIC TOP SECRET';
  director: string;
  coDirector: string;
  delegateCount: number;
  agendaTopic: string;
  brief: string;
  classifiedDirectives: string[];
  keyCountries: string[];
  dossierRef: string;
}

export interface ScheduleEvent {
  time: string;
  date: string;
  panelCode: string;
  title: string;
  location: string;
  classification: string;
  description: string;
}

export interface RedactedDocItem {
  id: string;
  title: string;
  date: string;
  author: string;
  recipient: string;
  cableId: string;
  contentWithRedactions: {
    text: string;
    isRedacted: boolean;
    redactedLabel?: string;
  }[];
  verdict: string;
}

export interface DelegateApplication {
  fullName: string;
  delegationType: 'Single Delegate' | 'Double Delegation' | 'Head Delegate';
  institution: string;
  email: string;
  phone: string;
  preferredCommittee: string;
  countryPreference1: string;
  countryPreference2: string;
  countryPreference3: string;
  experienceLevel: 'First-Timer' | '1-3 Conferences' | '4-7 Conferences' | 'Crisis Specialist (8+)';
  crisisRoleInterest: boolean;
  clearanceCode: string;
  timestamp: string;
}

export interface ToastNotification {
  id: string;
  type?: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  code?: string;
  duration?: number;
}
