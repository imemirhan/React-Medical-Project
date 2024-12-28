import React from 'react';

const MedicineCard = ({ image, name, description, doctor }) => {
    return (
        <div className='medicine-card'>
            <img src={image} alt={name} className='medicine-image' />
            <div className='medicine-details'>
                <h3>{name}</h3>
                <p>{description}</p>
                <p><strong>Prescribed by:</strong> {doctor}</p>
            </div>
        </div>
    );
};

export default MedicineCard;