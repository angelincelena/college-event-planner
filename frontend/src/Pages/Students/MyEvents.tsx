import React, { useEffect, useState } from 'react';
import '../../Styles/MyEvents.css';
import EventCard from '../../Components/EventCard';
import SearchBar from '../../Components/SearchBar';

// Define Event interface structure
interface Event {
  event_id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  organizerName: string;
}

const MyEvents: React.FC = () => {
  // State variables
  const [activeTab, setActiveTab] = useState<'upcoming' | 'present' | 'past'>('upcoming'); // Tab control
  const [events, setEvents] = useState<Event[]>([]); // All fetched events
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error message

  const userId = localStorage.getItem('userId'); // Get logged-in student ID

  // Fetch upcoming events when activeTab or userId changes
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (activeTab !== 'upcoming' || !userId) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5002/api/registration/upcoming-events?student_id=${userId}`);
        const data = await res.json();

        if (res.ok && Array.isArray(data.events)) {
          setEvents(data.events);
          setError('');
        } else {
          setEvents([]);
          setError('No upcoming events found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, [activeTab, userId]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render content based on active tab (upcoming/present/past)
  const renderContent = () => {
    if (activeTab === 'upcoming') {
      return (
        <>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          {loading ? (
            <p>Loading upcoming events...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : filteredEvents.length > 0 ? (
            <div className="event-list">
              {filteredEvents.map(event => (
                <EventCard key={event.event_id} event={event} />
              ))}
            </div>
          ) : (
            <p>No upcoming events found.</p>
          )}
        </>
      );
    }

    if (activeTab === 'present') return <p>No present events...</p>;
    if (activeTab === 'past') return <p>No past events...</p>;

    return null;
  };

  return (
    <div className="my-events">
      {/* Page title */}
      <h2>My Events</h2>

      {/* Tab toggle buttons */}
      <div className="toggle-buttons">
        <button className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => setActiveTab('upcoming')}>
          Upcoming
        </button>
        <button className={activeTab === 'present' ? 'active' : ''} onClick={() => setActiveTab('present')}>
          Present
        </button>
        <button className={activeTab === 'past' ? 'active' : ''} onClick={() => setActiveTab('past')}>
          Past
        </button>
      </div>

      {/* Event list rendering */}
      <div className="event-section">{renderContent()}</div>
    </div>
  );
};

export default MyEvents;