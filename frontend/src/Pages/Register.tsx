import React, { useState } from 'react';
import axios from 'axios'; 
import {
  User, Mail, Lock, Phone, Book, Info, ArrowLeft
} from 'lucide-react';
import '../Styles/auth/Register.css'; 
const Register: React.FC = () => {
  // Form fields state
  const [role, setRole] = useState<'student' | 'organizer'>('student'); // Default: student
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [description, setDescription] = useState('');
  
  // Message & Error handling
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle Submit on form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (role === 'student') {
        // API call to register student
        await axios.post('http://localhost:5002/api/auth/register-student', {
          name,
          email,
          password,
          phone,
          year_of_study: yearOfStudy,
        });
        setMessage('Student registered successfully!');
      } else {
        // API call to register organizer
        await axios.post('http://localhost:5002/api/auth/register-organizer', {
          name,
          email,
          password,
          description,
          contact_info: phone,
        });
        setMessage('Organizer registered successfully!');
      }

      // Clear the form after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setYearOfStudy('');
      setDescription('');
    } catch {
      setError('Registration failed. Please check your input.');
    }
  };

  return (
    <div className="elegant-register-wrapper">
      <form className="elegant-register-card" onSubmit={handleSubmit}>
        
        {/* Back to homepage */}
        <div className="back-arrow">
          <a href="/">
            <ArrowLeft size={22} color="#5a189a" />
          </a>
        </div>

        <h1>Create Your Account</h1>
        <p>Join Bash and Bloom to discover campus events!</p>

        {/* Role toggle (Student or Organizer) */}
        <div className="role-toggle">
          <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>
            Student
          </button>
          <button type="button" className={role === 'organizer' ? 'active' : ''} onClick={() => setRole('organizer')}>
            Organizer
          </button>
        </div>

        {/* Show Error/Success Message */}
        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-success">{message}</div>}

        {/* Name Input */}
        <div className="lucide-input">
          <User size={20} color="#5a189a" />
          <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Email Input */}
        <div className="lucide-input">
          <Mail size={20} color="#5a189a" />
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {/* Password Input */}
        <div className="lucide-input">
          <Lock size={20} color="#5a189a" />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {/* If Role is Student, show Phone and Year of Study */}
        {role === 'student' && (
          <>
            <div className="lucide-input">
              <Phone size={20} color="#5a189a" />
              <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="lucide-input">
              <Book size={20} color="#5a189a" />
              <input type="text" placeholder="Year of Study" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} />
            </div>
          </>
        )}

        {/* If Role is Organizer, show Description and Phone */}
        {role === 'organizer' && (
          <>
            <div className="lucide-input">
              <Info size={20} color="#5a189a" />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="lucide-input">
              <Phone size={20} color="#5a189a" />
              <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Register as {role}
        </button>

      </form>
    </div>
  );
};

export default Register;