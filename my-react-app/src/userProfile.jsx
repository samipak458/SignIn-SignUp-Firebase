import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore"; 


const UserProfile = ({ username, email, advance }) => {
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersData = querySnapshot.docs.map(doc => doc.data());
            setUserData(usersData);
        };
       
        fetchData();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {userData && userData.map((user, index) => (
                <div key={index}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Subscribed: {user.paid}</p>
                </div>
            )
            )}
        </div>
    );
};

export default UserProfile;