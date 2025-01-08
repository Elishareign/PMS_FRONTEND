import React, { useState, useEffect } from 'react';
import './dashboard.css'; 

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  //EXAMPLE LANG FOR THE MEAN TIME WALA PA BACKEND E 
  const aggregateData = {
    totalSales: 1500,   
    newBookings: 100,   
    checkIns: 50,       
    checkOuts: 45,      
    occupancyRate: '80.5%',  
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId); 
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <p>{formattedDate}</p> 
        </div>
      </div>

      <div className="summary-cards">
        <div className="card1">
          <h3>New Bookings</h3>
          <div className="card1-placeholder">
           {aggregateData.newBookings}
          </div>
        </div>
        <div className="card2">
          <h3>Check-In</h3>
          <div className="card2-placeholder">
           {aggregateData.checkIns}
          </div>
        </div>
        <div className="card3">
          <h3>Check-Out</h3>
          <div className="card3-placeholder">
           {aggregateData.checkOuts}
          </div>
        </div>
        <div className="card4">
          <h3>Occupancy Rate</h3>
          <div className="card3-placeholder">
           {aggregateData.occupancyRate}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart_room">
          <h3>Room Status</h3>
          <div className="pie-chart-placeholder">[Pie Chart Placeholder]</div>
        </div>

        <div className="chart_revenue">
          <h3>Total Revenue</h3>
          <div className="line-chart-placeholder">[Line Chart Placeholder]</div>
        </div>
      </div>

      <div className="tables">
        <div className="table-room-type">
          <h3>Available Room Type</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Room Type</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              </tr>
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table booking-platform">
          <h3>Booking by Platform</h3>
          <div className="bar-chart-placeholder">[Bar Chart Placeholder]</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;