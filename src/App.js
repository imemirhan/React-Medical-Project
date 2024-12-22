import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';  // Import Login component
import UserHome from './pages/UserHome';
import DoctorHome from './pages/DoctorHome';
import AdminHome from './pages/AdminHome';
import Signup from './pages/Signup';

const App = () => {
  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    return userId && role ? { userId, role } : null;
  });

  // Handle login data and update user state
  const handleLogin = ({ userId, username, role }) => {
    const userData = { userId, username, role };
    setUser(userData);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', username);
    localStorage.setItem('role', role);
  };

  // Check if user is logged in
  useEffect(() => {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (role && userId) {
      setUser({ name, userId, role });
    }
  }, []);

  // Redirect based on user role
  const getHomePage = (role) => {
    switch (role) {
      case 'user': return '/user-home'; // Regular user
      case 'doktor': return '/doctor-home'; // Doctor
      case 'admin': return '/admin-home'; // Admin
      default: 
      return '/login';
    }
  };

  return (
    <Router>
      <Routes>
        <Route
         path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
         path="/signup" element={<Signup />} />

        <Route
         path="/user-home" 
         element={
          user
           ? (user.role === 'user'
            ? <UserHome />
             : <Navigate to={getHomePage(user.role)} />) 
             : <Navigate to="/login" />} />

        <Route
         path="/doctor-home" 
         element={
          user
           ? (user.role === 'doktor'
            ? <DoctorHome />
             : <Navigate to={getHomePage(user.role)} />) 
             : <Navigate to="/login" />} />

        <Route
         path="/admin-home" 
         element={user
          ? (user.role === 'admin'
           ? <AdminHome /> 
           : <Navigate to={getHomePage(user.role)} />) 
           : <Navigate to="/login" />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to={user ? getHomePage(user.role) : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default App;
