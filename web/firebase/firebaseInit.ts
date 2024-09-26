// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get a reference to Firebase Storage
export const storage = getStorage(firebase_app);
