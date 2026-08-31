import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export interface BookingPayload {
  category: string;
  sessionFormat: 'virtual' | 'in-person';
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  experienceLevel: string;
  preferredDate: string;
  preferredTimeSlot: string;
  goals: string;
}

export interface BookingResult {
  id: string;
  bookingRef: string;
  isMock?: boolean;
}

/**
 * Creates a new 1-on-1 strategy or institutional masterclass booking in Firestore.
 */
export async function createSessionBooking(payload: BookingPayload): Promise<BookingResult> {
  const randomSerial = Math.floor(1000 + Math.random() * 9000);
  const bookingRef = `BOOK-2026-${randomSerial}`;

  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'session_bookings'), {
        ...payload,
        bookingRef,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      return { id: docRef.id, bookingRef, isMock: false };
    } catch (err) {
      console.warn('Firestore booking submission failed, fallback active:', err);
    }
  }

  return {
    id: `local-book-${Date.now()}`,
    bookingRef,
    isMock: true,
  };
}
