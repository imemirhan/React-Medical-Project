import React from 'react';
import ProfileContent from '../components/ProfileContent';
import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";
import axios from "axios";
const Profile = () => {
        const [userData, setUserData] = useState({});

        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const userId = localStorage.getItem("userId");
                    const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }, []);
    return (
        <>
        <Navbar />
        <ProfileContent user={userData}/>
        </>
    );
};

export default Profile;