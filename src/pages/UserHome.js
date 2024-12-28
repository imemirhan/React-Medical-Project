import '../styles/UserHome.css'
import Navbar from '../components/Navbar';
import UserContent from '../components/UserContent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function UserHome() {
    const [isResponsible, setIsResponsible] = useState(false);

        useEffect(() => {
            const userId = localStorage.getItem('userId');
            console.log('User ID:', userId); // Added console log to check userId
            if (userId) {
                axios.get(`http://localhost:5000/api/responsibles/${userId}/user`)
                    .then(response => {
                        console.log('API response:', response);
                        if (response.data && response.data.length > 0) {
                            setIsResponsible(true);
                        } else {
                            setIsResponsible(false);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching responsible data:', error);
                        setIsResponsible(false);
                    });
            } else {
                setIsResponsible(false);
            }
        }, []);

    return(
        <>
        <div className="user-home-container">
            <Navbar 
            visitRole="user"
            isResponsible={isResponsible}/>
        </div>
            <UserContent/>
        </>
    );
}
export default UserHome;
