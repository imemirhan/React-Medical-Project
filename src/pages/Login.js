import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'

const Login = ({ onLogin }) => {

  // Body Styling
//#region 
document.body.style.backgroundImage = 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)'
document.body.style.backgroundImage = 'linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)'
document.body.style.backgroundAttachment = 'fixed'
document.body.style.backgroundRepeat = "no-repeat"
document.body.style.fontFamily = "Vibur"
document.body.style.fontFamily = "Abel"
document.body.style.opacity = "0.95"
//#endregion



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });

      const { userId, role } = response.data;
      onLogin({ userId, role }); // Pass the user data to App.js

      // Redirect based on role
      if (role === 'user') {
        navigate('/user-home');
      } else if (role === 'doktor') {
        navigate('/doctor-home');
      } else if (role === 'admin') {
        navigate('/admin-home');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <form className="login" onSubmit={handleLogin}>
        <header>
          <h2 className='login-txt'>Welcome Back!</h2>
          <p>Please log in to access your account</p>
        </header>
        
        <div className="con">
          <div className="input-item">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-item">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p>{error}</p>}

        <fieldset className="field-set">
          <button type="submit" className="submits">Login</button>
        </fieldset>
        <div className="login-txt">
          <p className='loginred-txt'>Don't have an account? <a href='/signup' className="loginred">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
