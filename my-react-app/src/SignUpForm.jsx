import React, { useState } from 'react';
import {auth, db} from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, addDoc } from "firebase/firestore"; 

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e) => { 
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       

        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            return setDoc(doc(db, 'users', userCredential.user.uid), {
                username: username,
                email: email,
                paid: "No",
                history: []
            })
        }).then(() => {
            alert('Account created Successfully success!')
            console.log('Account created Successfully success!');
            window.location.href = '/login';
        }).catch(err => {
            console.log(err.message);
            alert("Cannot Signup "+ err.message);
        }).catch(err => {
            console.log(err.message);
            alert("Cannot Signup "+ err.message);
        });
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input type="text" value={username} onChange={handleUsernameChange}/>
                </label>
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