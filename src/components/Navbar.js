import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Make sure to create and style this CSS file
import LogoutButton from './LogoutButton';
import MyProfileButton from './MyProfileButton';
const Navbar = ({visitRole, isResponsible} ) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About Us</Link>
                {(visitRole === 'doctor' || visitRole=== 'doktor') && (
                    <Link to="/medical-history" className="nav-link">Prescription History</Link>
                )}
                {visitRole === "user" && !localStorage.getItem('responsibleDoctor') && (
                    <Link to="/find-doctors" className="nav-link">Find Your Doctor</Link>
                )}
            </div>
            <div className="navbar-right">
                <div className="profile" onClick={toggleDropdown}>
                    <span className='user-welcome'>Welcome {localStorage.userName}</span>
                    <img src='../assets/userLogo.jpg' alt="Profile" className="profile-pic" />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                             <MyProfileButton userId={localStorage.getItem('userId')}/>
                            <LogoutButton/>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
