// TableBooking.js
import React from 'react';

const TableBooking = ({ data }) => {
  return (
    <table className="facilities-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Facility</th>
          <th>Facility Type</th>
          <th>Guest Name</th>
          <th>Start-End Date</th>
          <th>Start-End Time</th>
          <th>Total Price Type</th>
          <th>Status</th>
          <th>Number of Guests</th>
          <th>Availability</th>
          <th>Payment Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* No sample data here */}
      </tbody>
    </table>
  );
};

export default TableBooking;
