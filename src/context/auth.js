import React, { useEffect, useState, createContext} from "react";
import firebaseApp from '../services/firebase';
import {createdProfileCollection} from '../services/firebase'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [createdProfile, setCreatedProfile] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
        setCurrentUser(user);
        setPending(false);
    });

  }, []);

  useEffect(() => {
    if(currentUser) {
      createdProfileCollection.doc(currentUser.uid).get().then(doc => { if(doc.exists) {setCreatedProfile(doc.data().createdProfile)};});
    }
  }, [currentUser])

  if(pending) {
      return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser, createdProfile, setCreatedProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};