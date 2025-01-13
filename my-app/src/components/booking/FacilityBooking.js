import React, { useState, useMemo } from 'react';
import './booking.css';

const FacilityBooking = ({ startDate, endDate, paymentFilter }) => {
  const allFacilityBookings = [
    {
      id: 1,
      bookingDate: '2025-01-03',
      facilityName: 'Conference Room',
      checkInDate: '2025-01-03 10:00 AM',
      checkOutDate: '2025-01-03 02:00 PM',
      bookingStatus: 'Booked',
      paymentStatus: 'Paid',
      bookingSource: 'Website',
      guestName: 'John Doe',
    },
    {
      id: 2,
      bookingDate: '2025-01-04',
      facilityName: 'Gym',
      checkInDate: '2025-01-04 07:00 AM',
      checkOutDate: '2025-01-04 09:00 AM',
      bookingStatus: 'Completed',
      paymentStatus: 'Paid',
      bookingSource: 'App',
      guestName: 'Jane Smith',
    },
    {
      id: 3,
      bookingDate: '2025-01-05',
      facilityName: 'Pool',
      checkInDate: '2025-01-05 03:00 PM',
      checkOutDate: '2025-01-05 05:00 PM',
      bookingStatus: 'Canceled',
      paymentStatus: 'Refunded',
      bookingSource: 'Website',
      guestName: 'Alice Johnson',
    },
  ];

  const [activeTab, setActiveTab] = useState('all');

  // Refactored filter logic
  const filterFacilityBookings = () => {
    let filtered = allFacilityBookings;

    if (startDate) {
      filtered = filtered.filter(
        (booking) => booking.bookingDate >= startDate
      );
    }

    if (endDate) {
      filtered = filtered.filter((booking) => booking.bookingDate <= endDate);
    }

    if (paymentFilter) {
      filtered = filtered.filter(
        (booking) =>
          booking.paymentStatus.toLowerCase() === paymentFilter.toLowerCase()
      );
    }

    // Define booking status filters
    const statusFilters = {
      all: () => true,
      pending: (booking) => booking.bookingStatus === 'Booked',
      checkedIn: (booking) => booking.bookingStatus === 'Checked-in',
      completed: (booking) => booking.bookingStatus === 'Completed',
      canceled: (booking) => booking.bookingStatus === 'Canceled',
    };

    // Apply the active tab filter
    filtered = filtered.filter(statusFilters[activeTab]);

    return filtered;
  };

  const filteredBookings = useMemo(() => filterFacilityBookings(), [
    startDate, endDate, paymentFilter, activeTab,
  ]);

  const handleEdit = (id) => {
    alert(`Editing booking ID: ${id}`);
  };

  const handleArchive = (id) => {
    alert(`Archiving booking ID: ${id}`);
  };

  return (
    <div className="sub-tab-content"> 
      <div className="filter-container">
        <div className="sub-tab-navigation">
          <button
            onClick={() => setActiveTab('all')}
            className={`sub-tab-button ${activeTab === 'all' ? 'active' : ''}`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`sub-tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          >
            Pending Bookings
          </button>
          <button
            onClick={() => setActiveTab('checkedIn')}
            className={`sub-tab-button ${activeTab === 'checkedIn' ? 'active' : ''}`}
          >
            Checked-In
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`sub-tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`sub-tab-button ${activeTab === 'canceled' ? 'active' : ''}`}
          >
            Canceled Bookings
          </button>
        </div>
      </div>

      <table className="data-grid">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking Date</th>
            <th>Guest Name</th>
            <th>Facility Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Booking Source</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.guestName}</td>
              <td>{booking.facilityName}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.bookingStatus}</td>
              <td>{booking.paymentStatus}</td>
              <td>{booking.bookingSource}</td>
              <td className="action-buttons-container">
                <button onClick={() => handleEdit(booking.id)} className="action-button edit-button">
                  Edit
                </button>
                <button onClick={() => handleArchive(booking.id)} className="action-button archive-btn">
                  Archive
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacilityBooking;
