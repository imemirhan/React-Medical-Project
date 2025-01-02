import React from 'react';
import './HistoryContent.css';
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
                                <p><strong>History #</strong>{prescription.history_id}</p>
                                <p><strong>Date: </strong>{formatDate(prescription.event_date)}</p>
                                <div className="history-subdetail">
                                    {prescription.user_id && <p><strong>Patient #</strong>{prescription.user_id}</p>}
                                    {prescription.doctor_id && <p><strong>Doctor #</strong>{prescription.doctor_id}</p>}
                                </div>
                                <div className="history-subdetail">
                                    {prescription.medication_name && <p><strong>Medication Name: </strong>{prescription.medication_name}</p>}
                                    {prescription.medication_dosage && <p><strong>Dosage: </strong>{prescription.medication_dosage}</p>}
                                    {prescription.medication_notes && <p><strong>Notes: </strong>{prescription.medication_notes}</p>}
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