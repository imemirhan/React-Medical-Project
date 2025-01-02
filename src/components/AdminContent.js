import React, { useState, useEffect } from 'react';
import './AdminContent.css'; // Make sure to create and style this CSS file
const AdminContent = () => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState('users');

    useEffect(() => {
        handleListAllUsers();
    }, []);


    const handleDeleteEntry = async (id, endpoint) => {
        try {
            await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const renameIdKey = (data, idKey) => {
        return data.map(item => {
            const newItem = { ...item, id: item[idKey] };
            delete newItem[idKey];
            return newItem;
        });
    };

    const fetchData = async (endpoint, idKey) => {
        try {
            const response = await fetch(endpoint);
            let result = await response.json();
            result = renameIdKey(result, idKey);
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleListAllUsers = () => {
        fetchData('http://localhost:5000/api/users', 'user_id');
        setSelectedData('users');
    };

    const handleListPatients = () => {
        fetchData('http://localhost:5000/api/users/user/role', 'user_id');
        setSelectedData('users');
    };

    const handleListDoctors = () => {
        fetchData('http://localhost:5000/api/users/doktor/role', 'user_id');
        setSelectedData('users');
    };

    const handleListPrescriptions = () => {
        fetchData('http://localhost:5000/api/prescriptions', 'prescription_id');
        setSelectedData('prescriptions');
    };

    const handleListMedicalHistory = () => {
        fetchData('http://localhost:5000/api/medicalhistory', 'history_id');
        setSelectedData('medicalhistory');
    };

    const handleUpdatePrescription = async (id, endpoint) => {
        try {
            const updatedPrescription = data.find(item => item.id === id);
            await fetch(`${endpoint}/${id}`, {
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
            {/* Only show the update button if there are prescriptions in the data */}
            {data.some(item => item.prescription_id) && (
                <button className='select-btn-admin' onClick={() => handleUpdatePrescription(1)}>Update Prescription</button>
            )}
            <div>
                <h2>Data</h2>
                <ul className='data-list-admin'>
                {data.map(item => (
                        <div className='data-item-admin'>
                            <li key={item.id}>
                                {Object.entries(item).map(([key, value]) => (
                                    value && (
                                        <div key={key}>
                                            <strong>{key}:</strong> <input type="text" defaultValue={key === 'created_at' || key === 'event_date' || key === 'prescription_date' || key === 'updated_at' ? formatDate(value) : value?.toString()} onChange={(e) => item[key] = e.target.value} />
                                        </div>
                                    )
                                ))}
                            </li>
                            <button className='select-btn-admin' onClick={() => {
                                if (window.confirm('Are you sure you want to delete this entry?')) {
                                    handleDeleteEntry(item.id, `http://localhost:5000/api/${selectedData}`);
                                }
                            }}>Delete</button>
                            <button className='select-btn-admin' onClick={() => {
                                if(window.confirm("Are you sure you want to update this entry?")) {
                                    handleUpdatePrescription(item.id, `http://localhost:5000/api/${selectedData}`)
                                }
                                }}>Update</button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminContent;