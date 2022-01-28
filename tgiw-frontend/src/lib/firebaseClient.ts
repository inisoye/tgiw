import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { openDB } from 'idb';

import type { StoredUser } from '@/types';

const FIREBASE_CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(FIREBASE_CLIENT_CONFIG);
export const firebaseClient = getAuth(firebaseApp);

// Obtain user stored in IndexDB
export const getStoredUser = async (): Promise<StoredUser> => {
  const db2 = await openDB('firebaseLocalStorageDb');
  const tx = db2.transaction('firebaseLocalStorage', 'readonly');
  const store = tx.objectStore('firebaseLocalStorage');
  const result = await store.get(
    `firebase:authUser:${FIREBASE_CLIENT_CONFIG.apiKey}:[DEFAULT]`
  );
  return result?.value;
};
