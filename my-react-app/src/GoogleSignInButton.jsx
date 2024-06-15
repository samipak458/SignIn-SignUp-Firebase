import React from 'react';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user info to Firestore
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        username: user.displayName,
        email: user.email,
        paid: "No",
        prompt: "No prompt yet",     // new object to save prompt message
        history: "No history yet"    // new object to save summarized history  
      }, { merge: true });  // merge: true to avoid overwriting existing data

      console.log('User logged in with Google:', user);
      alert('User logged in with Google');
      window.location.href = '/userProfile';
    } catch (error) {
      console.log('Error signing in with Google:', error.message);
      alert('Error signing in with Google: ' + error.message);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
