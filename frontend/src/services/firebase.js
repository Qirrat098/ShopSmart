// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQh5TjnKACHRek7q7_bad_njodpFjHYic",
  authDomain: "shopsmart-3100e.firebaseapp.com",
  projectId: "shopsmart-3100e",
  storageBucket: "shopsmart-3100e.firebasestorage.app",
  messagingSenderId: "33692917712",
  appId: "1:33692917712:web:3543ba13b0d3e8370263d5",
  measurementId: "G-HS0C4H5VE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;