import React, { createContext, useState } from 'react';
import { auth, firestore, storage } from '../firebase/config'; // Ensure you import the initialized auth

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, storage, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
