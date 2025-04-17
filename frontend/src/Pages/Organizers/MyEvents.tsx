import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/OrgMyEvents.css';

interface Event {
  event_id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
}

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const organizerId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      if (!organizerId) return;

      try {
        const res = await fetch(`http://localhost:5002/api/events/organizer/${organizerId}`);
        const data = await res.json();

        if (res.ok && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.error(data.message || 'Failed to fetch events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [organizerId]);

  const today = new Date();

  const upcomingEvents = events.filter(event => new Date(event.date) >= today);
  const pastEvents = events.filter(event => new Date(event.date) < today);

  return (
    <div className="my-events">
      <h2>My Events</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          {/* Upcoming Events */}
          <section className="event-section">
            <h3>Upcoming Events</h3>
            {upcomingEvents.length > 0 ? (
              <div className="event-list">
                {upcomingEvents.map(event => (
                  <div key={event.event_id} className="event-card">
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                    <p>{event.description}</p>
                    <div className="event-actions">
                      <Link to={`/organizer/edit-event/${event.event_id}`} className="edit-button">Edit</Link>
                      <button className="delete-button">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No upcoming events found.</p>
            )}
          </section>

          {/* Past Events */}
          <section className="event-section">
            <h3>Past Events</h3>
            {pastEvents.length > 0 ? (
              <div className="event-list">
                {pastEvents.map(event => (
                  <div key={event.event_id} className="event-card">
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                    <p>{event.description}</p>
                    <div className="event-actions">
                      <Link to={`/organizer/edit-event/${event.event_id}`} className="edit-button">Edit</Link>
                      <button className="delete-button">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No past events found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MyEvents;
