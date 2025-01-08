import React, { useState, useEffect } from 'react';
import './booking.css';
import FacilityBooking from './FacilityBooking';
import BookingFormModal from './BookingForm';

const Booking = () => {
  const [activeTab, setActiveTab] = useState('room');
  const [roomSubTab, setRoomSubTab] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingSourceFilter, setBookingSourceFilter] = useState(''); // New state for booking source
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [allBookings, setAllBookings] = useState([
    {
      id: 1,
      bookingDate: '2025-01-01',
      guestName: 'John Doe',
      checkInDate: '2025-01-10',
      checkOutDate: '2025-01-15',
      roomNumber: '101',
      bookingStatus: 'Booked',
      paymentStatus: 'Paid',
      bookingSource: 'Website',
    },
    {
      id: 2,
      bookingDate: '2025-01-02',
      guestName: 'Jane Smith',
      checkInDate: '2025-01-12',
      checkOutDate: '2025-01-17',
      roomNumber: '102',
      bookingStatus: 'Checked-in',
      paymentStatus: 'Underpaid',
      bookingSource: 'Agency',
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const editBooking = (id) => {
    // Open modal or navigate to edit form with booking ID
    console.log(`Editing booking with ID: ${id}`);
    setIsModalOpen(true); // Example of opening a modal for editing
  };
  
  const archiveBooking = (id) => {
    // Update booking status to "Archived" or remove from visible list
    console.log(`Archiving booking with ID: ${id}`);
    setAllBookings(allBookings.filter((booking) => booking.id !== id));
  };
  


  const filterBookings = (status) => {
    let filtered = allBookings;

    if (status !== 'all') {
      filtered = filtered.filter(
        (booking) => booking.bookingStatus.toLowerCase() === status
      );
    }

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

    if (bookingStatusFilter) {
      filtered = filtered.filter(
        (booking) =>
          booking.bookingStatus.toLowerCase() === bookingStatusFilter.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (booking) =>
          booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.roomNumber.toString().includes(searchQuery) ||
          booking.id.toString().includes(searchQuery)
      );
    }

    // Filter by booking source
    if (bookingSourceFilter) {
      filtered = filtered.filter(
        (booking) =>
          booking.bookingSource.toLowerCase() === bookingSourceFilter.toLowerCase()
      );
    }

    return filtered;
  };

  const handleCreateBooking = (newBooking) => {
    console.log('New booking created:', newBooking);
    setAllBookings([...allBookings, newBooking]); // Add new booking to state
  };

  return (
    <div className="booking-container">
      <h1 className="header">Booking</h1>
      <div className="current-date">
          <p>{formattedDate}</p>
      </div>

      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab('room')}
          className={`tab-button ${activeTab === 'room' ? 'active' : ''}`}
        >
          Room Bookings
        </button>
        <button
          onClick={() => setActiveTab('facility')}
          className={`tab-button ${activeTab === 'facility' ? 'active' : ''}`}
        >
          Facility Booking
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'room' && (
          <div>
            {/* Filter Section */}
            <div className="filter-row">
              <div className="filter-item">
                  <label htmlFor="filter-by" className="filter-label">
                    Filter By:
                  </label>
                </div>
              <div className="filter-item">
                <label htmlFor="date-range">Date Range:</label>
                <div>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  -
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="filter-item">
                <label htmlFor="payment-status">Payment Status:</label>
                <select
                  id="payment-status"
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Underpaid">Underpaid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div className="filter-item">
                <label htmlFor="booking-status">Booking Status:</label>
                <select
                  id="booking-status"
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Booked">Booked</option>
                  <option value="Checked-in">Checked-in</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>

              {/* New Booking Source Filter */}
              <div className="filter-item">
                <label htmlFor="booking-source">Booking Source:</label>
                <select
                  id="booking-source"
                  value={bookingSourceFilter}
                  onChange={(e) => setBookingSourceFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Website">Website</option>
                  <option value="Agency">Agency</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>

              {/* Search Filter */}
              <div className="filter-item">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by guest name, room number, or ID"
                />
              </div>

              {/* Create Booking Button */}
              <div className="create-booking-button">
                <button onClick={() => setIsModalOpen(true)}>+Create Booking</button>
              </div>
            </div>

            {/* Sub-tab Navigation */}
            <div className="sub-tab-navigation">
              {['all', 'pending', 'checked-in', 'completed', 'canceled'].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setRoomSubTab(tab)}
                    className={`sub-tab-button ${roomSubTab === tab ? 'active' : ''}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Bookings
                  </button>
                )
              )}
            </div>

            {/* Table to Display Filtered Bookings */}
            <div className="sub-tab-content">
              <table className="data-grid">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Booking Date</th>
                    <th>Guest Name</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Room Number</th>
                    <th>Booking Status</th>
                    <th>Payment Status</th>
                    <th>Booking Source</th>
                    <th>Action</th> 
                  </tr>
                </thead>
                <tbody>
                  {filterBookings(roomSubTab).map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.bookingDate}</td>
                      <td>{booking.guestName}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>{booking.roomNumber}</td>
                      <td>{booking.bookingStatus}</td>
                      <td>{booking.paymentStatus}</td>
                      <td>{booking.bookingSource}</td>
                      <td className="action-buttons-container">
                        <button
                          className="action-button edit-button"
                          onClick={() => editBooking(booking.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-button archive-btn"
                          onClick={() => archiveBooking(booking.id)}
                        >
                          Archive
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'facility' && (
          <div>
            {/* Filter Section */}
            <div className="filter-row">
              <div className="filter-item">
                  <label htmlFor="filter-by" className="filter-label">
                    Filter By:
                  </label>
                </div>
              <div className="filter-item">
                <label htmlFor="date-range">Date Range:</label>
                <div>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  -
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="filter-item">
                <label htmlFor="payment-status">Payment Status:</label>
                <select
                  id="payment-status"
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Underpaid">Underpaid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <div className="filter-item">
                <label htmlFor="booking-status">Booking Status:</label>
                <select
                  id="booking-status"
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Booked">Booked</option>
                  <option value="Checked-in">Checked-in</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>

              {/* New Booking Source Filter */}
              <div className="filter-item">
                <label htmlFor="booking-source">Booking Source:</label>
                <select
                  id="booking-source"
                  value={bookingSourceFilter}
                  onChange={(e) => setBookingSourceFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Website">Website</option>
                  <option value="Agency">Agency</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>

              {/* Search Filter */}
              <div className="filter-item">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by guest name, room number, or ID"
                />
              </div>

              {/* Create Booking Button */}
              <div className="create-booking-button">
                <button onClick={() => setIsModalOpen(true)}>+Create Booking</button>
              </div>
            </div>

            {/* Facility Booking Table */}
            <FacilityBooking
              startDate={startDate}
              endDate={endDate}
              paymentFilter={paymentFilter}
              bookingStatusFilter={bookingStatusFilter}
              searchQuery={searchQuery}
              bookingSourceFilter={bookingSourceFilter} // Pass the filter to FacilityBooking component
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BookingFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateBooking={handleCreateBooking} 
        />
      )}
    </div>
  );
};

export default Booking;
