import React from 'react';
import Navbar from '../Components/Landing/Navbar';
import Hero from '../Components/Landing/Hero';
import '../Styles/Landing/Landing.css';
import Features from '../Components/Landing/Features';

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Landing;
