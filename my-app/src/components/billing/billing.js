import React, { useState } from "react";
import "./billing.css";

const Billing = () => {
  const [filters, setFilters] = useState({
    paymentStatus: "All",
    paymentMethod: "All",
    startDate: "",
    endDate: "",
    guestName: "",
    roomNumber: "",
  });

  const filterOptions = {
    paymentStatus: ["All", "Paid", "Unpaid", "Pending"],
    paymentMethod: ["All", "Credit Card", "Cash", "Bank Transfer"],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleResetFilters = () => {
    setFilters({
      paymentStatus: "All",
      paymentMethod: "All",
      startDate: "",
      endDate: "",
      guestName: "",
      roomNumber: "",
    });
  };

  return (
      <div className="billing-container">
        <div className="billing-header">
          <h2>Billing</h2>
        </div>

        {/* Filters Section */}
        <div className="billing-filter-bar">
          <div className="billing-filter-row">
            <div className="billing-filter-dropdown-container">
              <label className="billing-filter-label">Payment Status:</label>
              <select
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
                className="billing-filter-dropdown"
              >
                {filterOptions.paymentStatus.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="billing-filter-dropdown-container">
              <label className="billing-filter-label">Payment Method:</label>
              <select
                name="paymentMethod"
                value={filters.paymentMethod}
                onChange={handleFilterChange}
                className="billing-filter-dropdown"
              >
                {filterOptions.paymentMethod.map((method, index) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div className="billing-filter-dropdown-container">
              <label className="billing-filter-label">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="billing-filter-input"
              />
            </div>

            <div className="billing-filter-dropdown-container">
              <label className="billing-filter-label">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="billing-filter-input"
              />
            </div>

            <div className="billing-filter-input-container">
            <input
              type="text"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
              className="billing-filter-input"
              placeholder="Search by guest name or room number"
            />
          </div>
            <button className="billing-reset-button" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        </div>


        {/* Placeholder for displaying filtered billing data */}
        <div className="billing-table">
          <table>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Room Number</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows here based on filtered data */}
              <tr>
                <td>John Doe</td>
                <td>101</td>
                <td>Paid</td>
                <td>Credit Card</td>
                <td>$150</td>
                <td>2025-01-13</td>
                <td>
                  <button className="view-button">View</button>
                  <button className="archive-button">Archive</button>
                </td>
              </tr>
              {/* Placeholder row */}
            </tbody>
          </table>
        </div>
      </div>

  );
};

export default Billing;
