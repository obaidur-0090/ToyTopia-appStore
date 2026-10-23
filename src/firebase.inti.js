import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredFirebaseConfig = ['apiKey', 'authDomain', 'projectId', 'appId']
const missingFirebaseConfig = requiredFirebaseConfig
  .filter((key) => !firebaseConfig[key])
  .map((key) => `VITE_FIREBASE_${key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`)

export const firebaseConfigured = missingFirebaseConfig.length === 0
const app = firebaseConfigured ? initializeApp(firebaseConfig) : null
export const auth = app ? getAuth(app) : null

export function requireFirebaseConfig() {
  if (!firebaseConfigured) {
    throw new Error(
      `Firebase Authentication is not configured. Add ${missingFirebaseConfig.join(', ')} to a .env file in the project root, then restart the Vite server.`,
    )
  }
}