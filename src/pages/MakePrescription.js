import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MakePrescription.css';

function MakePrescription() {
    const { userId } = useParams(); // Ensure your route includes :userId
    const navigate = useNavigate();
    const docuserId = localStorage.getItem('userId');
    const [prescription, setPrescription] = useState({
        medication: '',
        dosage: '',
        notes: ''
    });
    const [doctorId, setDoctorId] = useState('');

    useEffect(() => {
        function getDoctorId() {
        axios.get(`http://localhost:5000/api/doctors/${docuserId}/user`)
            .then(response => {
                setDoctorId(response.data[0].doctor_id);
            })
            .catch(error => {
                console.error('Error fetching doctor:', error);
            });
        }
        getDoctorId();
    }, [docuserId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescription(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/prescriptions`, {
            doctor_id: doctorId,
            user_id: userId,
            prescription_date: new Date().toISOString(),
            ...prescription
        })
        .then(() => {
            alert('Prescription created successfully!');
            axios.put(`http://localhost:5000/api/medicines/${prescription.medicineId}`, {
                medicineName: prescription.medication,
                stock: prescription.medicineStock - 1
            })
            .then(() => {
                console.log('Medicine stock reduced successfully');
            }).catch(error => {
                console.error('Error reducing medicine stock:', error);
            });
            axios.post(`http://localhost:5000/api/medicalhistory`, {
                user_id: userId,
                doctor_id: doctorId,
                event_type: "Prescription",
                medication_name: prescription.medication,
                medication_dosage: prescription.dosage,
                medication_notes: prescription.notes,
                event_date: new Date().toISOString(),
                event_type: 'Prescription',
            })
            .then(() => {
                console.log('Medical history updated successfully');
            })
            .catch(error => {
                console.error('Error updating medical history:', error);
            });
            navigate('/doctor-home');
        })
        .catch(error => {
            console.error('Error creating prescription:', error);
        });
    };

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/medicines')
            .then(response => {
                setMedicines(response.data);
            })
            .catch(error => {
                console.error('Error fetching medicines:', error);
            });
    }, []);

    return (
        <div className='make-prescription-container'>
            <h2>Create Prescription</h2>
            {console.log(prescription)}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='medication'>Medication</label>
                    <select 
                        id='medication' 
                        name='medication' 
                        value={prescription.medication} 
                        onChange={(e) => {
                            handleChange(e);
                            const selectedMedicine = medicines.find(medicine => medicine.medicineName === e.target.value);
                            setPrescription(prevState => ({
                                ...prevState,
                                medicineStock: selectedMedicine ? selectedMedicine.medicineStock : '',
                                medicineId: selectedMedicine ? selectedMedicine.medicineId : ''
                            }));
                        }} 
                        required
                    >
                        <option value=''>Select a medication</option>
                        {medicines.map(medicine => (
                            <option key={medicine.id} value={medicine.medicineName}>
                                {medicine.medicineName}
                            </option>
                        ))}
                    </select>
                    <label htmlFor='stock'>Stock: {prescription.medicineStock}</label>
                </div>
                <div className='form-group'>
                    <label htmlFor='dosage'>Dosage</label>
                    <input 
                        type='text' 
                        id='dosage' 
                        name='dosage'
                        placeholder='e.g. 1 tablet' 
                        value={prescription.dosage} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='notes'>Instructions</label>
                    <textarea 
                        id='notes' 
                        name='notes' 
                        value={prescription.notes} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type='submit' className='submit-button'>Submit</button>
            </form>
        </div>
    );
}

export default MakePrescription;