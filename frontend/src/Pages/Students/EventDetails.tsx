import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/EventsDetail.css';

// Define the shape of Event object
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

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Fetching event ID from the URL
  const [event, setEvent] = useState<Event | null>(null); // Event data
  const [message, setMessage] = useState<string>(''); // Status message
  const [isRegistered, setIsRegistered] = useState<boolean>(false); // Track if student already registered
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Control share modal

  // Format date to readable format
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const userId = localStorage.getItem('userId'); // Get logged-in student ID

  // Fetch event details when component loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5002/api/events`);
        const data = await res.json();
        if (res.ok) {
          const foundEvent = data.events.find((e: Event) => e.event_id === Number(id));
          setEvent(foundEvent);
        } else {
          console.error('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event details:', err);
      }
    };

    fetchEvent();
  }, [id]);

  // Check if the student is already registered for the event
  useEffect(() => {
    const checkRegistration = async () => {
      if (userId && event) {
        try {
          const res = await fetch(`http://localhost:5002/api/registration/check?student_id=${userId}&event_id=${event.event_id}`);
          const data = await res.json();
          if (data.isRegistered) {
            setIsRegistered(true);
          }
        } catch (err) {
          console.error('Error checking registration:', err);
        }
      }
    };

    checkRegistration();
  }, [userId, event]);

  // Handle student registration for event
  const handleRegister = async () => {
    if (!userId) {
      setMessage('User not logged in.');
      return;
    }

    if (!event) {
      setMessage('Event not found.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5002/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: userId,
          event_id: event.event_id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsRegistered(true);
        setMessage('Successfully registered for the event!');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error registering:', err);
      setMessage('Server error');
    }
  };

  // Handle canceling event registration
  const handleCancelRegistration = async () => {
    if (!userId) {
      setMessage('User not logged in.');
      return;
    }

    if (!event) {
      setMessage('Event not found.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5002/api/registration/cancel', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: userId,
          event_id: event.event_id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Registration canceled successfully!');
      } else {
        setMessage(data.message || 'Failed to cancel registration');
      }
    } catch (err) {
      console.error('Error canceling registration:', err);
      setMessage('Server error');
    }
  };

  // Open Share Modal
  const handleShareButton = () => {
    setIsModalOpen(true);
  };

  // Close Share Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!event) return <p className="eventdetails-loading-text">Loading event details...</p>;

  // UI for Event Details
  return (
    <div className="eventdetails-wrapper">
      <h2 className="eventdetails-title">{event.title}</h2>
      <p className="eventdetails-info"><strong>Date:</strong> {formatDate(event.date)}</p>
      <p className="eventdetails-info"><strong>Time:</strong> {event.time.slice(0,5)}</p>
      <p className="eventdetails-info"><strong>Location:</strong> {event.location}</p>
      <p className="eventdetails-info"><strong>Description:</strong> {event.description}</p>
      <p className="eventdetails-info"><strong>Category:</strong> {event.category}</p>
      <p className="eventdetails-info"><strong>Organizer:</strong> {event.organizerName}</p>

      {/* Buttons */}
      <div className="eventdetails-buttons">
        {isRegistered ? (
          <button className="eventdetails-cancel-btn" onClick={handleCancelRegistration}>
            Cancel Registration
          </button>
        ) : (
          <button className="eventdetails-register-btn" onClick={handleRegister}>
            Register
          </button>
        )}
        <button className="eventdetails-share-btn" onClick={handleShareButton}>
          Share
        </button>
      </div>

      {/* Status Message */}
      {message && <p className="eventdetails-message">{message}</p>}

      {/* Share Modal */}
      {isModalOpen && (
        <div className="eventdetails-modal-overlay">
          <div className="eventdetails-modal-content">
            <button className="eventdetails-modal-close" onClick={handleCloseModal}>X</button>
            <h3>Share Event</h3>
            <p>Share the event using the following links:</p>
            <ul>
              <li>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href={`mailto:?subject=Check out this event&body=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                  Email
                </a>
              </li>
              <li>
                <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  Copy Link
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;