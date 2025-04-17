import React from 'react';
import Navbar from './Landing/Navbar';

const About: React.FC = () => {
  return (
    <>
    <Navbar />
    <section id="about" className="landing-about">
      <h2>About Bash and Bloom</h2>
      <p className="intro">
        Bash and Bloom is your go-to hub for discovering, planning, and attending campus events with ease. 
        We aim to bridge the gap between event organizers and students by simplifying how events are managed and attended.
      </p>

      <p className="mission">
        Our mission is to create a vibrant campus culture where every student can find, register for, and enjoy events that match their interests—be it academic, cultural, or just fun!
      </p>

      <div className="features-list">
        <div className="feature-item">
          <h3>🎯 Personalized Recommendations</h3>
          <p>Get events curated just for you based on your preferences and previous activity.</p>
        </div>
        <div className="feature-item">
          <h3>📅 Integrated Calendar</h3>
          <p>Sync your favorite events to your calendar and stay on top of what's happening next.</p>
        </div>
        <div className="feature-item">
          <h3>📢 Organizer Tools</h3>
          <p>Event hosts can manage listings, view registrations, and broadcast updates instantly.</p>
        </div>
        <div className="feature-item">
          <h3>📊 Engagement Insights</h3>
          <p>Get real-time stats on attendance, interest, and feedback to improve your events.</p>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
