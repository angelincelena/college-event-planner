import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'; 
import '../Styles/OrganizerLayout.css'; 


const OrganizerLayout: React.FC = () => {
  return (
    <div className="organizer-layout"> 
      <div className="middle"> {/* Middle section holding sidebar + main content */}
        <Sidebar /> {/* Sidebar is shown on all organizer pages */}
        <main> {/* Dynamic page content will be rendered here */}
          <Outlet /> {/* Renders the child components based on current route */}
        </main>
      </div>
    </div>
  );
};

export default OrganizerLayout;
