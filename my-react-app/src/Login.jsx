import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignInButton from './GoogleSignInButton';

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
        <br />
        <GoogleSignInButton />
        <br />
        <p>Not registered? <a href="/signup">SignUp</a></p>
      </form>
    </div>
  );
};

export default Login;
