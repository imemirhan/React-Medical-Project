import React from 'react';
import './Medicine.css';

function Medicine({data}) {
    return (
        <div>
            <h2>Total Medicines: {data.length}</h2>
            {data.map((medicine, index) => (
                <div key={index} className="medicine-card">
                    <img src={medicine.image} alt={medicine.name} className="medicine-image" />
                    <div className="medicine-details">
                        <h3 className="medicine-name">{medicine.name}</h3>
                        <p className="medicine-description">{medicine.description}</p>
                        <p className="medicine-stock">Stock left: {medicine.stock}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Medicine;