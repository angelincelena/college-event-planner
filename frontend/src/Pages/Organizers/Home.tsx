import React, { useEffect, useState } from 'react';
import '../../Styles/OrganizerHome.css';

// Define the shape of Event object
interface Event {
  event_id: number;
  title: string;
  date: string;
  location: string;
  registeredCount?: number; // number of students registered
}

const Home: React.FC = () => {
  // State variables
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]); // List of upcoming events
  const [pastEvents, setPastEvents] = useState<Event[]>([]);         // List of past events
  const [totalRegistrations, setTotalRegistrations] = useState<number>(0); // Total registrations across events
  const [loading, setLoading] = useState(true); // Track if data is loading

  const organizerId = localStorage.getItem('userId'); // Fetch logged-in organizer's ID

  // Fetch events created by this organizer when page loads
  useEffect(() => {
    const fetchEvents = async () => {
      if (!organizerId) return;

      try {
        const res = await fetch(`http://localhost:5002/api/events/organizer/${organizerId}`);
        const data = await res.json();

        if (res.ok && Array.isArray(data.events)) {
          const now = new Date();
          // Separate upcoming and past events
          const upcoming = data.events.filter((e: Event) => new Date(e.date) >= now);
          const past = data.events.filter((e: Event) => new Date(e.date) < now);
          // Calculate total number of registrations
          const total = data.events.reduce((acc: number, e: Event) => acc + (e.registeredCount || 0), 0);

          setUpcomingEvents(upcoming);
          setPastEvents(past);
          setTotalRegistrations(total);
        } else {
          console.error(data.message || 'Failed to load events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [organizerId]);

  // UI part
  return (
    <div className="organizer-home">
      <h2>Welcome to Your Organizer Dashboard</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          {/* Summary Section */}
          <section className="summary">
            <div className="summary-card">
              <h4>Total Registrations</h4>
              <p>{totalRegistrations} students registered</p>
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="upcoming-events">
            <h3>Upcoming Events</h3>
            <div className="event-list">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div key={event.event_id} className="event-card">
                    <h4>{event.title}</h4>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Registered:</strong> {event.registeredCount || 0} students</p>
                    <button>View Details</button>
                  </div>
                ))
              ) : (
                <p className="no-event-msg">No upcoming events.</p>
              )}
            </div>
          </section>

          {/* Past Events */}
          <section className="past-events">
            <h3>Past Events</h3>
            <div className="event-list">
              {pastEvents.length > 0 ? (
                pastEvents.map(event => (
                  <div key={event.event_id} className="event-card">
                    <h4>{event.title}</h4>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <button>View Details</button>
                  </div>
                ))
              ) : (
                <p className="no-event-msg">No past events.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
