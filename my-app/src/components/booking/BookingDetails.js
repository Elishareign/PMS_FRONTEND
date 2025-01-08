// BookingDetails.js
import React from 'react';

const BookingDetails = ({ roomNumber, setRoomNumber, numberOfGuests, setNumberOfGuests, checkInDate, setCheckInDate, checkInTime, setCheckInTime, checkOutDate, setCheckOutDate, checkOutTime, setCheckOutTime, bookingDate, setBookingDate, specialRequest, setSpecialRequest, paymentStatus, setPaymentStatus }) => {
  return (
    <div>
      <h3>Booking Details</h3>
      <div>
        <label>Room Number:</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Number of Guests:</label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </div>
      <div>
        <label>Check-in Date:</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>
      <div>
        <label>Check-in Time:</label>
        <input
          type="time"
          value={checkInTime}
          onChange={(e) => setCheckInTime(e.target.value)}
        />
      </div>
      <div>
        <label>Check-out Date:</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </div>
      <div>
        <label>Check-out Time:</label>
        <input
          type="time"
          value={checkOutTime}
          onChange={(e) => setCheckOutTime(e.target.value)}
        />
      </div>
      <div>
        <label>Booking Date:</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
        />
      </div>
      <div>
        <label>Special Request:</label>
        <textarea
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
        />
      </div>
      <div>
        <label>Payment Status:</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Paid">Paid</option>
          <option value="Underpaid">Underpaid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>
    </div>
  );
};

export default BookingDetails;
