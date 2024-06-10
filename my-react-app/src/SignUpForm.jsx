import React, { useState } from 'react';
import {auth} from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUpForm() {
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
            await createUserWithEmailAndPassword(auth, email, password)
            console.log('User created');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Sign Up</button>
                <br />
                <p>Already registered? <a href="/login">LogIn</a></p>
            </form>
        </div>
    );
}

export default SignUpForm;