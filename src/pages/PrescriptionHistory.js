import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HistoryContent from '../components/HistoryContent';
import axios from 'axios';
const PrescriptionHistory = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        // Fetch prescription history from an API or database
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/medicalhistory');
                const data = response.data;
                setPrescriptions(data);
            } catch (error) {
                console.error('Error fetching prescription history:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    return (
        <>
        <Navbar visitRole="doctor"/>
        <HistoryContent prescriptions={prescriptions} />
        </>
    );
};

export default PrescriptionHistory;