// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(false);

  // Simple signup function for now
  async function signup(email, password, displayName) {
    // Mock signup - in real app, this would use Firebase
    const mockUser = {
      uid: Date.now().toString(),
      email,
      displayName,
      photoURL: null
    };
    setCurrentUser(mockUser);
    return { user: mockUser };
  }

  // Simple login function for now
  async function login(email, password) {
    // Mock login - in real app, this would use Firebase
    const mockUser = {
      uid: Date.now().toString(),
      email,
      displayName: 'Demo User',
      photoURL: null
    };
    setCurrentUser(mockUser);
    return { user: mockUser };
  }

  // Simple logout function for now
  async function logout() {
    setCurrentUser(null);
  }

  // Simple Google sign in for now
  async function signInWithGoogle() {
    const mockUser = {
      uid: Date.now().toString(),
      email: 'demo@google.com',
      displayName: 'Google User',
      photoURL: null
    };
    setCurrentUser(mockUser);
    return { user: mockUser };
  }

  const value = {
    user: currentUser, // Use 'user' to match what components expect
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
