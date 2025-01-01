import './Prescriptions.css';

const Prescriptions = ({ medicines, myDoctor }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    return (
        <div className='prescriptions-wrapper'>
            {medicines && medicines.length > 0 ? (
                medicines.map((medicine, index) => (
                    <div key={index} className='prescription-card'>
                        <img src={medicine.medicine[0].medicineImage} alt={medicine.medicine[0].medicineName} className='medicine-image-pres' />
                        <h2 className='medicine-name'>{medicine.medicine[0].medicineName}</h2>
                        <p className='medicine-description'><strong>Description:</strong> {medicine.medicine[0].medicineDescription}</p>
                        <p className='medicine-dosage'><strong>Dosage:</strong> {medicine.dosage}</p>
                        <p className='medicine-dosage'><strong>Doctor Note:</strong> {medicine.notes ? medicine.notes : 'Your doctor gave no instructions'}</p>
                        <p className='prescription-date'><strong>Prescribed on:</strong> {formatDate(medicine.prescription_date)}</p>
                        <div className='prescription-footer'>
                            <p className='doctor-username'>Prescribed by: Dr. {myDoctor?.username}</p>
                            <img className='doctor-img-pres' src='../assets/userLogo.jpg'></img>
                        </div>
                    </div>
                ))
            ) : (
                <p>You have no prescriptions...</p>
            )}
        </div>
    );
};

export default Prescriptions;
