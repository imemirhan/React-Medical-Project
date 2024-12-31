import React, { useState } from 'react';
import './ProfileContent.css';
import axios from 'axios';
const ProfileContent = ({ user }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user[0]?.username || '');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = () => {
        if (window.confirm("Are you sure to update your data?")) {
            // Call API to update username in users table
            axios.put(`http://localhost:5000/api/users/${user[0]?.user_id}`, { username })
                .then(response => {
                    console.log('User updated successfully:', response.data);
                    localStorage.setItem('userName', username);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('There was an error updating the user!', error);
                });
            // Example: updateUser(user[0]?.id, { username });
            setIsEditing(false);
        }
    };

    const cancelUpdateClick = () => { 
        setUsername(user[0]?.username);
        setIsEditing(false);
    }

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div className="profile-content">
            <h1>Profile</h1>
            {console.log(user)}
            <div className="profile-header">
                <img src="../assets/userLogo.jpg" alt="User Logo" className="profile-logo" />
                <div className="profile-info">
                    <p><strong>Username: </strong>
                        {isEditing ? (
                            <input type="text" value={username} onChange={handleInputChange} />
                        ) : (
                            user[0]?.username
                        )}
                    </p>
                    <p><strong>E-Mail: </strong>{user[0]?.email}</p>
                </div>
            </div>
            <p><strong>Member Since: </strong>{formatDate(user[0]?.created_at)}</p>
            {!isEditing && <button className="update-profile-button" onClick={handleEditClick}>Update Profile</button>}
            {isEditing && <button className='update-accept-btn' onClick={handleUpdateClick}>Update</button>}
            {isEditing && <button className='update-cancel-btn' onClick={cancelUpdateClick}>Cancel</button>}
            {/* Add more profile-related content here */}
        </div>
    );
};

export default ProfileContent;