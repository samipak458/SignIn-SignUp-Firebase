import React from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from "firebase/auth";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
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
