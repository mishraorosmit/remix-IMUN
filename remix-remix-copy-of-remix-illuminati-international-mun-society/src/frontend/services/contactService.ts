import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export interface DiplomaticCablePayload {
  senderName: string;
  senderEmail: string;
  institution?: string;
  inquiryType: string;
  message: string;
}

export interface DiplomaticCableResult {
  id: string;
  transmissionCode: string;
  isMock?: boolean;
}

/**
 * Transmits a diplomatic cable message to the Secretariat desk.
 */
export async function transmitDiplomaticCable(
  data: DiplomaticCablePayload
): Promise<DiplomaticCableResult> {
  const cableCode = `DIPLOMATIC-CABLE-${Math.floor(100000 + Math.random() * 900000)}`;

  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'contact_inquiries'), {
        ...data,
        transmissionCode: cableCode,
        status: 'unread',
        receivedAt: serverTimestamp(),
      });

      return { id: docRef.id, transmissionCode: cableCode, isMock: false };
    } catch (err) {
      console.warn('Firestore cable dispatch failed, fallback active:', err);
    }
  }

  return {
    id: `local-cable-${Date.now()}`,
    transmissionCode: cableCode,
    isMock: true,
  };
}
