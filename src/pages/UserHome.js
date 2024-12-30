import '../styles/UserHome.css'
import Navbar from '../components/Navbar';
import UserContent from '../components/UserContent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function UserHome() {
    const [isResponsible, setIsResponsible] = useState(false);

        useEffect(() => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                axios.get(`http://localhost:5000/api/responsibles/${userId}/user`)
                    .then(response => {
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
