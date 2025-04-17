import React, { useState, useEffect } from 'react';
import '../../Styles/AddEvent.css'; 

const AddEvent: React.FC = () => {
  // State to hold new event details
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
  });

  // State to hold fetched categories from backend
  const [categories, setCategories] = useState<{ category_id: number; name: string }[]>([]);

  // Fetch categories once when component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/categories'); // API call to fetch categories
        const data = await res.json();
        setCategories(data.categories); // Store categories in state
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Handle input field changes dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value })); // Update the field that changed
  };

  // Handle form submission to create a new event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const organizerId = localStorage.getItem('userId'); // Organizer ID fetched from localStorage
    if (!organizerId) return alert('Organizer not found.');

    try {
      const res = await fetch('http://localhost:5002/api/events/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventDetails, organizer_id: organizerId }), // Send event details + organizer ID
      });

      const data = await res.json();
      if (res.ok) {
        alert('Event created successfully!');
        // Reset the form
        setEventDetails({ title: '', date: '', time: '', location: '', description: '', category: '' });
      } else {
        alert(data.message || 'Failed to create event.');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      alert('An error occurred while creating the event.');
    }
  };

  return (
    <div className="add-event">
      <h2>Add New Event</h2>

      {/* Event form */}
      <form onSubmit={handleSubmit} className="event-form">
        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventDetails.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Date Field */}
        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time Field */}
        <div className="form-group">
          <label htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location Field */}
        <div className="form-group">
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            placeholder="Enter event location"
            required
          />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="form-group">
          <label htmlFor="category">Event Category</label>
          <select
            id="category"
            name="category"
            value={eventDetails.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
