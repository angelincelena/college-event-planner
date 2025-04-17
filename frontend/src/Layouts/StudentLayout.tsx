import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../Components/Sidebar'; 
import '../Styles/StudentLayout.css'; 

const StudentLayout: React.FC = () => {
  return (
    <div className="student-layout"> 
      <div className="middle"> {/* Middle section containing sidebar + page content */}
        <Sidebar /> {/* Sidebar always visible for student navigation */}
        <main> {/* Main content area where nested pages will render */}
          <Outlet /> {/* Loads the specific page based on route (e.g., Student Home, My Events, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
