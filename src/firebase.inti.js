import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCE4lm5Y3tIAl7zAgOv0rTrCBpeGKSyny8",
  authDomain: "toy-kid-74c1e.firebaseapp.com",
  projectId: "toy-kid-74c1e",
  storageBucket: "toy-kid-74c1e.firebasestorage.app",
  messagingSenderId: "235353141462",
  appId: "1:235353141462:web:a48db4740e30c0d8715977"
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