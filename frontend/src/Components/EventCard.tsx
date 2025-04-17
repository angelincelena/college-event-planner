import React from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import '../Styles/EventCard.css';

// Define the structure of a single event
interface Event {
  event_id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;         // Optional field
  organizerName: string;
}

// Define the expected props for EventCard
interface Props {
  event: Event;
}

// Functional component to render a single Event card
const EventCard: React.FC<Props> = ({ event }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically between routes

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]; 

  // Check if the event is today
  const isToday = event.date === today;

  // Check if the event is in the future
  const isUpcoming = event.date > today;

  // Assign category tag or fallback if no category
  const categoryTag = event.category ? event.category : 'Uncategorized';
  
  // Helper function to format the event date into a readable format
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Navigate to event details page when button is clicked
  const handleViewDetails = () => {
    navigate(`/student/event/${event.event_id}`);
  };

  return (
    <div className={`event-card ${isUpcoming ? 'upcoming' : ''}`}> {/* Apply upcoming class if future */}
      <h3>{event.title}</h3>
      
      <div className="event-info">
        <p><strong>Date:</strong> {formatDate(event.date)}</p>
        <p><strong>Time:</strong> {event.time.slice(0,5)} IST</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizerName}</p>

        {/* Show 'Today' tag if the event is today */}
        {isToday && (
          <span className="today-tag">Today</span>
        )}
      </div>

      <div className="event-category">
        <span className="category-tag">{categoryTag}</span>
      </div>

      {/* Button to view detailed event info */}
      <button onClick={handleViewDetails}>View Details</button>
    </div>
  );
};

export default EventCard;