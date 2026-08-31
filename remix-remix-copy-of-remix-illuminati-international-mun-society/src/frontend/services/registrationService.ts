import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { DelegateApplication } from '../types';

export interface SubmitRegistrationResult {
  id: string;
  clearanceCode: string;
  isMock?: boolean;
}

/**
 * Submits a new delegate dossier registration to Firestore.
 * Automatically generates a formalized clearance serial code.
 */
export async function submitDelegateRegistration(
  formData: Partial<DelegateApplication>
): Promise<SubmitRegistrationResult> {
  const serial = Math.floor(1000 + Math.random() * 9000);
  const clearanceCode = `IMUN-2026-ALPHA-${serial}`;

  // If Firebase is configured with real credentials, save to Firestore
  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'delegate_registrations'), {
        fullName: formData.fullName || 'DELEGATE ANONYMOUS',
        institution: formData.institution || 'UNAFFILIATED ACADEMY',
        email: formData.email || '',
        phone: formData.phone || '',
        delegationType: formData.delegationType || 'Single Delegate',
        preferredCommittee: formData.preferredCommittee || 'UN Security Council',
        countryPreferences: [
          formData.countryPreference1 || 'United States',
          formData.countryPreference2 || 'United Kingdom',
          formData.countryPreference3 || 'France',
        ],
        experienceLevel: formData.experienceLevel || '1-3 Conferences',
        crisisRoleInterest: formData.crisisRoleInterest ?? true,
        priorAwardsAndNotes: (formData as any).priorAwards || '',
        clearanceCode,
        status: 'submitted',
        submittedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return { id: docRef.id, clearanceCode, isMock: false };
    } catch (error) {
      console.warn('Firestore write failed, falling back to local clearance generation:', error);
    }
  }

  // Graceful fallback for offline / preview environments
  return {
    id: `local-reg-${Date.now()}`,
    clearanceCode,
    isMock: true,
  };
}

/**
 * Fetch delegate dossier by clearance code or document ID.
 */
export async function fetchDelegateDossier(registrationId: string) {
  if (!isFirebaseConfigured) return null;

  try {
    const docRef = doc(db, 'delegate_registrations', registrationId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (err) {
    console.error('Error fetching delegate dossier:', err);
  }
  return null;
}
