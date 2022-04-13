// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React, { useState, useEffect } from 'react';
import{ getDatabase, onValue, ref, set} from "firebase/database";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmfPbuUTo8_45pqjVn_gUYyIiWaaB3aHo",
  authDomain: "cs394-react.firebaseapp.com",
  databaseURL: "https://cs394-react-default-rtdb.firebaseio.com",
  projectId: "cs394-react",
  storageBucket: "cs394-react.appspot.com",
  messagingSenderId: "978497072114",
  appId: "1:978497072114:web:6a31c68045cb680cb9996b",
  measurementId: "G-1LWQ8N64R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };
  
  export const setData = (path, value) => (
    set(ref(database, path), value)
  );

  export const signInWithGoogle = () => {
    signInWithPopup(getAuth(app), new GoogleAuthProvider());
  };

const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(app), setUser);
  }, []);

  return [user];
};


