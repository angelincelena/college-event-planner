import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react'; 
import axios from 'axios'; 
import { useUser } from '../Context/UserContext'; 
import '../Styles/auth/Login.css'; 

const Login: React.FC = () => {
  // State variables for form fields and login process
  const [role, setRole] = useState<'student' | 'organizer'>('student'); // Default role is student
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser(); // Context hook to update global user state

  // Handle Login button submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send login request to backend
      const response = await axios.post(
        'http://localhost:5002/api/auth/login',
        { email, password, role },
        { withCredentials: true }
      );

      // Extract returned data
      const { token, userId, role: userRole, name } = response.data;

      // Save important details to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', userRole);

      // Update user globally via context
      setUser({ name, email, role: userRole });

      // Redirect to appropriate dashboard
      window.location.href = userRole === 'student' ? '/student/home' : '/organizer/home';
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="elegant-login-wrapper">
      {/* Login Form */}
      <form className="elegant-login-card" onSubmit={handleLogin}>
        {/* Back Arrow */}
        <div className="back-arrow">
          <a href="/">
            <ArrowLeft size={22} color="#5a189a" />
          </a>
        </div>

        <h1>Bash and Bloom</h1>
        <p>Login to your account</p>

        {/* Role Toggle Buttons */}
        <div className="role-toggle">
          <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>
            Student
          </button>
          <button type="button" className={role === 'organizer' ? 'active' : ''} onClick={() => setRole('organizer')}>
            Organizer
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="login-error">{error}</div>}

        {/* Email Input */}
        <div className="lucide-input">
          <Mail size={20} color="#5a189a" />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="lucide-input">
          <Lock size={20} color="#5a189a" />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="forgot-link">
          <a href="#">Forgot Password?</a>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : `Login as ${role}`}
        </button>

        {/* Register Link */}
        <div className="register-redirect">
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;