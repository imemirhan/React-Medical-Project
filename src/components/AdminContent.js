import React, { useState, useEffect } from 'react';
import './AdminContent.css'; // Make sure to create and style this CSS file
const AdminContent = () => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        handleListAllUsers();
    }, []);

    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleListAllUsers = () => {
        fetchData('http://localhost:5000/api/users');
    };

    const handleListPatients = () => {
        fetchData('http://localhost:5000/api/users/user/role');
    };

    const handleListDoctors = () => {
        fetchData('http://localhost:5000/api/users/doktor/role');
    };

    const handleListPrescriptions = () => {
        fetchData('http://localhost:5000/api/prescriptions');
    };

    const handleListMedicalHistory = () => {
        fetchData('http://localhost:5000/api/medicalhistory');
    };

    const handleDeleteEntry = async (id) => {
        try {
            await fetch(`/api/entries/${id}`, { method: 'DELETE' });
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const handleUpdatePrescription = async (id) => {
        try {
            const updatedPrescription = { /* updated data */ };
            await fetch(`/api/prescriptions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPrescription),
            });
            // Update the state with the new prescription data
            setData(data.map(item => item.id === id ? updatedPrescription : item));
        } catch (error) {
            console.error('Error updating prescription:', error);
        }
    };

    return (
        <div className='admin-content'>
            <h1>Admin Panel</h1>
            <button className='select-btn-admin' onClick={handleListAllUsers}>List All Users</button>
            <button className='select-btn-admin' onClick={handleListPatients}>List Only Patients</button>
            <button className='select-btn-admin' onClick={handleListDoctors}>List Only Doctors</button>
            <button className='select-btn-admin' onClick={handleListPrescriptions}>List Prescriptions</button>
            <button className='select-btn-admin' onClick={handleListMedicalHistory}>List Medical History</button>
            {/* Example buttons for delete and update actions */}
            <button className='select-btn-admin' onClick={() => handleDeleteEntry(1)}>Delete Entry</button>
            <button className='select-btn-admin' onClick={() => handleUpdatePrescription(1)}>Update Prescription</button>
            <div>
                <h2>Data</h2>
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            {Object.entries(item).map(([key, value]) => (
                                value && (
                                    <div key={key}>
                                        <strong>{key}:</strong> {key === 'created_at' || key === 'updated_at' ? formatDate(value) : value?.toString()}
                                    </div>
                                )
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminContent;