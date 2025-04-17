import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="landing-nav">
      <div className="logo" onClick={() => navigate('/')}>Bash and Bloom</div>
      <div className="nav-links">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/about')}>About</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;

