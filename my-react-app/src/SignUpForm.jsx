import React, { useState } from 'react';
import {auth, db} from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 

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
        try {
            // authentication to create user through email and password
            await createUserWithEmailAndPassword(auth, email, password)
            console.log('User created');

            // add user to firestore (database)
            const docRef = await addDoc(collection(db, "users"), {
                username: username,
                email: email,
                paid: "No",
                history: []
            });

            console.log("Document written with ID: ", docRef.id);


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