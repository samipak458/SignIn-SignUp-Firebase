import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      alert('User logged in');
      window.location.href = '/userProfile';
    } catch (error) {
      console.log(error.message);
      alert('Error logging in: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('User logged in with Google');
      alert('User logged in with Google');
      window.location.href = '/userProfile';
    } catch (error) {
      console.log(error.message);
      alert('Error logging in with Google: ' + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      console.log(error.message);
      alert('Error sending password reset email: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <br />
      <button type="button" onClick={handleForgotPassword}>Forgot Password?</button>
      <br />
      <p>Not registered? <a href="/signup">SignUp</a></p>
    </div>
  );
};

export default Login;
