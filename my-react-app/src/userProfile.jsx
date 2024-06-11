import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const UserProfile = ({ username, email, advance }) => {
    const [userData, setUserData] = useState(null);
    
    
    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is signed in : ' + user.uid);
                const docRef = doc(db, 'users', user.uid);

                console.log(docRef);

                onSnapshot(docRef, (def) => {
                    console.log('Current data: ', def.data());
                    const userData = def.data();
                    setUserData(userData);
                });
            } else {
                console.log('No user is signed in');
            }
        });
        }, []);

    const handleSignOut = () => { 
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('User signed out');
            window.location.href = '/login';
        }).catch((error) => {
            console.log(error);
        });
    }
   

    return (
        <div>
            <h2>User Profile</h2>
            {userData && (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Subscribed: {userData.paid}</p>
                </div>
            )}

            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};



export default UserProfile;