import React from 'react';
import './AboutContent.css';
const AboutContent = () => {
    return (
        <div className="about-content">
            <h1>About Us</h1>
            <img src="../assets/ceyda.jpg" alt="Doctor" className="abt-img-1" />
            <p>
                Welcome to our medical project. Our mission is to provide the best healthcare services to our community. 
                We are dedicated to improving the health and well-being of our patients through high-quality medical care, 
                advanced technology, and compassionate service.
            </p>
            <img src="../assets/emirhan.jpg" alt="Doctor" className="abt-img-2" />
            <p>
                Our team of experienced doctors, nurses, and healthcare professionals are here to support you and your family 
                with comprehensive medical services. We believe in a patient-centered approach and strive to create a 
                comfortable and caring environment for all our patients.
            </p>
            <p>
                Thank you for choosing us as your healthcare provider. We look forward to serving you and helping you achieve 
                your health goals.
            </p>
        </div>
    );
};

export default AboutContent;