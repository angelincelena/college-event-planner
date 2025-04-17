import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="bloom-hero">
      <div className="bloom-hero-content">
        <h1>Experience Campus Life Like Never Before</h1>
        <p>Discover trending events, register with a click, and never miss out on college happenings again.</p>
        <p>From fests to seminars, cultural nights to sports finals – it's all here in one place.</p>
        <button className="cta-button" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
