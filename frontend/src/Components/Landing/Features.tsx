import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Smart Event Discovery',
      description: 'Browse by interest, location, and trending tags with ease.',
      icon: '📌',
    },
    {
      title: 'One-Click Registration',
      description: 'Instantly register for events and get notified on the go.',
      icon: '⚡',
    },
    {
      title: 'Live Updates',
      description: 'Receive real-time changes, reminders, and announcements.',
      icon: '🔔',
    },
  ];

  return (
    <section className="features-section">
      <h2>Why Choose Bash and Bloom?</h2>
      <div className="features-grid">
        {features.map((f, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
