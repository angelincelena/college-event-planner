import React, { useState, useEffect } from 'react';
import EventCard from '../../Components/EventCard';
import SearchBar from '../../Components/SearchBar';
import CategoryFilter from '../../Components/CategoryFilter';
import '../../Styles/StudentHome.css';

// Define the Event interface structure
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

const Home: React.FC = () => {
  // State variables
  const [events, setEvents] = useState<Event[]>([]); // All events
  const [searchTerm, setSearchTerm] = useState('');  // Search input
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Selected filter category

  // Fetch events from API when page loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/events');
        const data = await res.json();
        if (res.ok) {
          setEvents(data.events);
        } else {
          console.error('Error fetching events:', data.message);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  // Handle Search Bar input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle Category dropdown change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter events based on search term and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    // Sort events based on date and time in ascending order
    const aDateTime = new Date(`${a.date}T${a.time}`);
    const bDateTime = new Date(`${b.date}T${b.time}`);
    return aDateTime.getTime() - bDateTime.getTime();
  });

  return (
    <div className="home">
      {/* Header */}
      <div className="home-header">
        <h2>Upcoming Events</h2>
      </div>

      {/* Search and Filter Controls */}
      <div className="searchAndFilter">
        <div className="search-bar">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </div>

        <div className="category-filter">
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        </div>
      </div>

      {/* Event List Section */}
      <div className="event-list">
        {filteredEvents.length === 0 ? (
          <p>No events available.</p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
