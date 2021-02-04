import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsloading(false);
    });

    return unsubscribe;
  });

  const logIn = async (email, password) => {
    console.log('calling log in');
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
      console.log('error', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log('error:', error);
    }
  };

  const signUp = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ logIn, signOut, user, isLoading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
