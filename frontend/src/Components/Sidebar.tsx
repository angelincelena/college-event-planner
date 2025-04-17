import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, CalendarCheck, BellRing, PlusCircle, ClipboardList,
  Menu, Bell, User, LogOut
} from 'lucide-react'; // Lucide icons
import '../Styles/Sidebar.css'; // Sidebar-specific styling

// Sidebar component for both students and organizers
const Sidebar: React.FC = () => {
  const [role, setRole] = useState<string | null>(null); // Role (student or organizer)
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapse/expand state
  const location = useLocation(); // To detect the current route
  const navigate = useNavigate(); // To navigate programmatically

  // Fetch role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  // Clear storage and logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirect to home
  };

  // If role not yet fetched, show loading state
  if (!role) return <div>Loading...</div>;

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}> {/* Add 'collapsed' class dynamically */}
      
      {/* Toggle Button */}
      <div className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        <Menu size={22} color="#5a189a" />
      </div>

      {/* Sidebar links */}
      <ul className="nav-links-sidebar">

        {/* Home Link */}
        <li>
          <Link to={`/${role}/home`} className={location.pathname === `/${role}/home` ? 'active' : ''}>
            <Home size={18} />
            {!collapsed && <span>Home</span>}
          </Link>
        </li>

        {/* Conditional rendering based on role */}
        {role === 'student' ? (
          <>
            {/* Student - Profile Page */}
            <li>
              <Link to={`/${role}/profile`} className={location.pathname === `/${role}/profile` ? 'active' : ''}>
                <User size={18} />
                {!collapsed && <span>Profile</span>}
              </Link>
            </li>

            {/* Student - My Events */}
            <li>
              <Link to="/student/myevents" className={location.pathname === '/student/myevents' ? 'active' : ''}>
                <CalendarCheck size={18} />
                {!collapsed && <span>My Events</span>}
              </Link>
            </li>
          </>
        ) : (
          <>

          {/* Organizer - My Profile */}
           <li>
              <Link to={`/${role}/profile`} className={location.pathname === `/${role}/profile` ? 'active' : ''}>
                <User size={18} />
                {!collapsed && <span>Profile</span>}
              </Link>
            </li>

            {/* Organizer - Add Event */}
            <li>
              <Link to="/organizer/addevent" className={location.pathname === '/organizer/addevent' ? 'active' : ''}>
                <PlusCircle size={18} />
                {!collapsed && <span>Add Event</span>}
              </Link>
            </li>

            {/* Organizer - My Events */}
            <li>
              <Link to="/organizer/myevents" className={location.pathname === '/organizer/myevents' ? 'active' : ''}>
                <ClipboardList size={18} />
                {!collapsed && <span>My Events</span>}
              </Link>
            </li>
          </>
        )}

        {/* Common for both Student and Organizer - Notifications */}
        <li>
          <Link to={`/${role}/notifications`} className={location.pathname === `/${role}/notifications` ? 'active' : ''}>
            <Bell size={18} />
            {!collapsed && <span>Notifications</span>}
          </Link>
        </li>

        {/* Logout */}
        <li>
          <div className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={handleLogout}>
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;