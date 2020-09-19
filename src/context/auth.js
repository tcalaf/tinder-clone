import React, { useEffect, useState, createContext} from "react";
import firebaseApp from '../services/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
        setCurrentUser(user);
        setPending(false);
    });
  }, []);

  if(pending) {
      return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};