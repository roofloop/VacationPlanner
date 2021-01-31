import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user: ', user);
      setUser(user);
      setIsloading(false);
    });

    return unsubscribe;
  });


  const logIn = async (email, password) => {
    console.log("calling log in");
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("logIn");
    } catch (error) {
      console.log('error', error);
    }
  };

  const signOut = async () => {

    try {
      await auth.signOut();
    } catch (error) {
      console.log('error:', error);
    }
  }

  const signUp = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      console.log("Creating User")
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <AuthContext.Provider value={{ logIn, signOut, user, isLoading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}