import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";


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
                alert('No user is signed in');
            }
        });
        }, []);
    //     const fetchData = async () => {   
    //         //const querySnapshot = await getDocs(db, "users");  
    //         //const docRef = doc(db, "users");
    //         const querySnapshot = await getDocs(collection(db, "users"));
        
           
    //         const usersData = querySnapshot.docs.map(doc => doc.data());
    //         setUserData(usersData);
    //     };
    

       
    //     fetchData();
    // }, []);

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
        </div>
    );
};

export default UserProfile;