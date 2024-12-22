import React from 'react';
import { useNavigate} from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Clear stored user data
        localStorage.clear();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="dropdown-item">Logout</button>
    );
};

export default LogoutButton;