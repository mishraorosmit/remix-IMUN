import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Client Firebase configuration loaded strictly from environment variables (.env.local)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'illuminati-mun-proj.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'illuminati-mun-proj',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'illuminati-mun-proj.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1039638478138',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1039638478138:web:62970bb7d5abd02f0aa403',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-TP4HZJZ7E3',
};

// Check if valid Firebase configuration is present
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics if supported in browser environment
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Ignore analytics init error in non-browser/unsupported environments
    });
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
