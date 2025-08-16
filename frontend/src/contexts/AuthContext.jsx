// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, db } from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create or update user document in Firestore
  async function createUserDocument(user, additionalData = {}) {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || additionalData.displayName || '',
        createdAt: new Date(),
        ...additionalData
      });
    }
  }

  // Sign up with email and password
  async function signup(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    await updateProfile(result.user, {
      displayName: displayName
    });

    // Create user document in Firestore
    await createUserDocument(result.user, { displayName });
    
    return result;
  }

  // Sign in with email and password
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with Google
  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserDocument(result.user);
    return result;
  }

  // Sign out
  async function logout() {
    return signOut(auth);
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
