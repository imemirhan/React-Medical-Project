import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';  // Import Login component
import UserHome from './pages/UserHome';
import DoctorHome from './pages/DoctorHome';
import AdminHome from './pages/AdminHome';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState(null);

  // Handle login data and update user state
  const handleLogin = ({ userId, role }) => {
    setUser({ userId, role });
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  };

  // Check if user is logged in
  useEffect(() => {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    if (role && userId) {
      setUser({ userId, role });
    }
  }, []);

  // Redirect based on user role
  const getHomePage = (role) => {
    switch (role) {
      case 'user': return '/user-home'; // Regular user
      case 'doktor': return '/doctor-home'; // Doctor
      case 'admin': return '/admin-home'; // Admin
      default: return '/login';
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-home" element={user ? (user.role === 'user' ? <UserHome /> : <Navigate to={getHomePage(user.role)} />) : <Navigate to="/login" />} />
        <Route path="/doctor-home" element={user ? (user.role === 'doktor' ? <DoctorHome /> : <Navigate to={getHomePage(user.role)} />) : <Navigate to="/login" />} />
        <Route path="/admin-home" element={user ? (user.role === 'admin' ? <AdminHome /> : <Navigate to={getHomePage(user.role)} />) : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
