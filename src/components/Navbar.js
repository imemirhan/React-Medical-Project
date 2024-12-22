import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create and style this CSS file
import LogoutButton from './LogoutButton';
const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About Us</Link>
                <Link to="/prescriptions" className="nav-link">Prescriptions</Link>
            </div>
            <div className="navbar-right">
                <div className="profile" onClick={toggleDropdown}>
                    <span className='user-welcome'>Welcome {localStorage.userName}</span>
                    <img src={require('../assets/userLogo.jpg')} alt="Profile" className="profile-pic" />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/profile" className="dropdown-item">My Profile</Link>
                            <LogoutButton/>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
