import React, { useState, useEffect } from "react";
import "./facilities.css";
import AddFacilityModal from "./AddFacilities"; // Import the AddFacilityModal

const Facilities = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    facilityType: "All",
    availability: "All",
    price: "All",
    location: "All",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = {
    facilityType: ["All", "Gym", "Pool", "Conference Room"],
    availability: ["All", "Available", "Not Available"],
    price: ["All", "Lowest to Highest", "Highest to Lowest"],
    location: ["All", "Location 1", "Location 2", "Location 3"],
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleResetFilters = () => {
    // Reset filters and search query
    setFilters({
      facilityType: "All",
      availability: "All",
      price: "All",
      location: "All",
    });
    setSearchQuery(""); // Clear the search query
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const filteredData = []; // Placeholder for data

  return (
    <div className="facilities-container">
      <div className="facilities-header">
        <h2>Facilities</h2>
        <p className="current-date">{formattedDate}</p>
      </div>
      <FilterBar
        options={filterOptions}
        filters={filters} // Pass filters down here
        searchQuery={searchQuery} // Pass search query down here
        handleFilterChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
        handleSearchChange={handleSearchChange}
        handleOpenModal={handleOpenModal}
      />
      <Table data={filteredData} />
      <AddFacilityModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

const FilterBar = ({
  options,
  filters,
  handleFilterChange,
  handleResetFilters,
  handleSearchChange,
  searchQuery,
  handleOpenModal,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-row">
        {/* Add the "Filter By" label on the left */}
        <div className="filter-by-label">
          <label className="filter-label">Filter By:</label>
        </div>
        {/* Generate dropdown filters */}
        {Object.keys(options).map((key) => (
          <div className="filter-group" key={key}>
            <label htmlFor={key} className="filter-label">
              {key}
            </label>
            <select
              name={key}
              value={filters[key]} 
              onChange={handleFilterChange}
              className="filter-dropdown"
            >
              {options[key].map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
        {/* Add filter actions */}
        <div className="filter-actions">
          <button className="reset-button" onClick={handleResetFilters}>
            Reset Filters
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery} // Ensure search query is cleared
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button className="add-facilities-button" onClick={handleOpenModal}>
            Add Facilities
          </button>
        </div>
      </div>
    </div>
  );
};

const Table = ({ data }) => {
  return (
    <table className="facilities-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Facility Name</th>
          <th>Facility Type</th>
          <th>Location</th>
          <th>Price</th>
          <th>Billing Type</th>
          <th>Hours</th>
          <th>Days</th>
          <th>Capacity</th>
          <th>Availability</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.image} alt="facility" />
              </td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.location}</td>
              <td>{item.price}</td>
              <td>{item.billing}</td>
              <td>{item.hours}</td>
              <td>{item.days}</td>
              <td>{item.capacity}</td>
              <td>{item.availability}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="11">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Facilities;
