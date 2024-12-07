import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css'

const SignupForm = () => {

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

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: 'user', // Default role: User
        specialty: '',
        license_number: '',
        contact_info: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.username || !formData.password || !formData.email) {
            setError('Please fill in all required fields.');
            return;
        }

        // Prepare data for submission
        let requestBody = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            role: formData.role,
        };

        // Add doctor-specific fields if role is "Doctor"
        if (formData.role === 'doktor') {
            if (!formData.specialty || !formData.license_number || !formData.contact_info) {
                setError('Please fill in all doctor-specific fields.');
                return;
            }
            requestBody = {
                ...requestBody,
                specialty: formData.specialty,
                license_number: formData.license_number,
                contact_info: formData.contact_info,
            };
        }

        try {
            // Decide the API endpoint based on role
            const endpoint = formData.role === 'doktor' ? '/api/signup' : '/api/users';
            const response = await axios.post(`http://localhost:5000${endpoint}`, requestBody);

            setSuccess(response.data.message || 'Signup successful!');
            setFormData({
                username: '',
                password: '',
                email: '',
                role: 'user',
                specialty: '',
                license_number: '',
                contact_info: '',
            });
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during signup.');
        }
    };

    return (
        <div className="signup-form">
            <form className='signup' onSubmit={handleSubmit}>
            <header>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <h2>Signup</h2>
            </header>
            <div className='con'>
                <p className='input-dec'>Username</p>
                <div className='input-item'>
                    <input
                        type="text"
                        name="username"
                        className="form-input"
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <p className='input-dec'>Password</p>
                <div className='input-item'>
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        className="form-input"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <p className='input-dec'>Email</p>
                <div className='input-item'>
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        className="form-input"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <p className='input-dec'>Your Role:</p>
                <div className='select-item'>
                    <select
                        name="role"
                        value={formData.role}
                        className="select-input"
                        onChange={handleInputChange}
                    >
                        <option value="user">User</option>
                        <option value="doktor">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Show doctor-specific fields only if role is "Doctor" */}
                {formData.role === 'doktor' && (
                    <>
                    <p className='input-dec'>Specialty</p>
                        <div className='input-item'>
                            <input
                                type="text"
                                name="specialty"
                                className="form-input"
                                placeholder='Your Specialty'
                                value={formData.specialty}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <p className='input-dec'>License Number</p>
                        <div className='input-item'>
                            <input
                                type="text"
                                name="license_number"
                                className="form-input"
                                placeholder='License Number'
                                value={formData.license_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <p className='input-dec'>Contact Number</p>
                        <div className='input-item'>
                            <input
                                type="text"
                                name="contact_info"
                                className="form-input"
                                placeholder='Contact Num.'
                                value={formData.contact_info}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </>
                )}
            </div>
            <fieldset className='field-set'>
                <button type="submit" className='submits'>Signup</button>
            </fieldset>
            <p className='signupred-txt'>Have an account? <a className='signupred' href='/login'>Log In</a></p>
            </form>
        </div>
    );
};

export default SignupForm;
