import React from 'react';
import axios from 'axios';
import Prescriptions from './Prescriptions';
import { useEffect, useState } from 'react';
import './UserContent.css';


const UserContent = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const userId = localStorage.getItem('userId');
    const [responsible, setResponsible] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [doctorUser, setDoctorUser] = useState([]);
    const [showTextbox, setShowTextbox] = useState(false);
    const [medicines, setMedicines] = useState([]);

        useEffect(() => {
            const fetchMedicines = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/prescriptions/${userId}/user`);
                const prescriptionsData = response.data;
                setPrescriptions(prescriptionsData);

                const medicineDetails = await Promise.all(
                prescriptionsData.map(async (prescription) => {
                    const medicineResponse = await axios.get(`http://localhost:5000/api/medicines/${prescription.medication}`);
                    return { ...prescription, medicine: medicineResponse.data };
                })
                );
                setMedicines(medicineDetails);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
            };

            fetchMedicines();
        }, [userId]);
    
    
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const responsible = await axios.get(`http://localhost:5000/api/responsibles/${userId}/user`);
                setResponsible(responsible.data);
                const doctor = await axios.get(`http://localhost:5000/api/doctors/${responsible.data[0].doctor_id}/doctor`);
                setDoctor(doctor.data);
                const doctorUser = await axios.get(`http://localhost:5000/api/users/${doctor.data[0].user_id}`);
                setDoctorUser(doctorUser.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, [userId]);

    return (
        <div className='user-content-wrapper'>
            <div className='user-content'>
                <div>
                    <h2>My Medicines</h2>
                    <Prescriptions medicines={medicines} myDoctor={doctorUser[0]} />
                </div>
                <div>
                    <h2>My Doctor</h2>
                    {doctor.length === 0 ? (<p>You have no assigned doctor...</p>) : 
                                            (   
                                                <>
                                                <p>Your doctor is {doctorUser[0]?.username || 'Doctor'}</p>
                                                <div className='doctor-info'>
                                                    <img src="../assets/userLogo.jpg" alt={doctorUser[0]?.username || 'Doctor'} />
                                                    <p>{doctorUser[0]?.username || 'Doctor'}</p>
                                                    <button onClick={() => setShowTextbox(true)}>Leave Doctor</button>
                                                    {showTextbox && (
                                                        <div className='popup'>
                                                            <p>Do you really want to leave this doctor?</p>
                                                            <button onClick={async () => {
                                                                try {
                                                                    await axios.delete(`http://localhost:5000/api/responsibles/${userId}`);
                                                                    setResponsible([]);
                                                                    setDoctor([]);
                                                                    setDoctorUser([]);
                                                                    setShowTextbox(false);
                                                                    alert('You have left the doctor successfully');
                                                                    localStorage.removeItem('responsibleDoctor');
                                                                    window.location.reload();
                                                                } catch (error) {
                                                                    console.error('Error leaving doctor:', error);
                                                                    alert('Failed to leave doctor');
                                                                }
                                                            }}>Yes</button>
                                                            <button onClick={() => setShowTextbox(false)}>No</button>
                                                        </div>
                                                    )}
                                                </div>
                                                </>
                                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default UserContent;