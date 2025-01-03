import React from 'react';
import Navbar from '../components/Navbar';
import AboutContent from '../components/AboutContent';

const About = () => {
    return (
        <>
            <Navbar visitRole={localStorage.getItem('role')}/>
            <AboutContent/>
        </>
    );
};

export default About;