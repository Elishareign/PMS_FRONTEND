import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/navigation/sidebar';
import Dashboard from './components/dashboard/dashboard';
import Room from './components/room/room';
import Booking from './components/booking/booking';
import Guest from './components/guest/guest';
import Facilities from './components/facilities/facilities';
import Billing from './components/billing/billing';
import Reports from './components/report/report';
import Employee from './components/employees/employee';
import Login from './components/login/Login';  // Import the Login component
import './App.css';

function App() {
  // State to manage login status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? (
          // Render Sidebar and Dashboard if user is authenticated
          <>
            <Sidebar />
            <div className="dashboard-container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/room" element={<Room />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/guest" element={<Guest />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/employee" element={<Employee />} />
              </Routes>
            </div>
          </>
        ) : (
          // Show the login page if not authenticated
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
