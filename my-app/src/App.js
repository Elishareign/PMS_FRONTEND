import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/navigation/sidebar';
import Dashboard from './components/dashboard/dashboard';
import Room from './components/room/room';
import Booking from './components/booking/booking';
import Guest from './components/guest/guest';
import Facilities from './components/facilities/facilities';
import Billing from './components/billing/billing';
import Reports from './components/report/report';
import Employee from './components/employees/employee';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
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
      </div>
    </Router>
  );
}

export default App;
