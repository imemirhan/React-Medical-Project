import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Clear stored user data
        localStorage.clear();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} style={{ padding: '10px', margin: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
            Logout
        </button>
    );
};

export default LogoutButton;