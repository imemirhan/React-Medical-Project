import React from 'react';
import './HistoryContent.css';
import { useEffect, useState } from 'react';
import { use } from 'react';
const HistoryContent = ({ prescriptions }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    return (
        <div className="history-container">
            <h2>Prescription History</h2>
            {prescriptions.length > 0 ? (
                <div>
                    {prescriptions.map((prescription, index) => (
                        <div key={index} className="history-card">
                            <h2>Event Type: {prescription.event_type}</h2>
                            <div className="history-details">
                                    <p>History  #{prescription.history_id}</p>
                                    <p>Date: {formatDate(prescription.event_date)}</p>
                                <div className="history-subdetail">
                                    <p>Patient  #{prescription.user_id}</p>
                                    <p>Doctor #{prescription.doctor_id}</p>
                                </div>
                                <div className="history-subdetail">
                                    <p>Medication Name: {prescription.medication_name}</p>
                                    <p>Dosage: {prescription.medication_dosage}</p>
                                    <p>Notes: {prescription.medication_notes}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No prescription history available.</p>
            )}
        </div>
    );
};

export default HistoryContent;