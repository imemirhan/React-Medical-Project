import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfileButton = ({ userId }) => {
    const navigate = useNavigate();

    const handleClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <>
        {console.log(userId)}
        <button onClick={() => handleClick(userId)} className="dropdown-item">My Profile</button>
        </>
    );
};

export default MyProfileButton;
