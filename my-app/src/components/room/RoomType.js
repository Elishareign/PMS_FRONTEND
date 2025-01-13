import React, { useState } from "react";
import './room.css';
import AddRoomType from './AddRoomType'; 

const RoomType = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [rateSortOrder, setRateSortOrder] = useState("");
  const [capacitySortOrder, setCapacitySortOrder] = useState("");
  const [roomTypes, setRoomTypes] = useState([
    {
      id: "1",
      image: "/path-to-standard-room.jpg",
      type: "Standard Room",
      rate: "1000",
      capacity: 2,
      size: "300 sqft",
      description: "A cozy room perfect for budget travelers.",
      status: "Available"
    },
    {
      id: "2",
      image: "/path-to-deluxe-room.jpg",
      type: "Deluxe Room",
      rate: "2000",
      capacity: 4,
      size: "500 sqft",
      description: "Spacious room with modern amenities.",
      status: "Assigned"
    },
    {
      id: "3",
      image: "/path-to-suite-room.jpg",
      type: "Suite Room",
      rate: "3000",
      capacity: 6,
      size: "800 sqft",
      description: "Luxurious suite with premium facilities.",
      status: "Out of Order"
    },
    {
      id: "4",
      image: "/path-to-standard-room.jpg",
      type: "Standard Room",
      rate: "1200",
      capacity: 2,
      size: "320 sqft",
      description: "A comfortable room with all basic amenities.",
      status: "Available"
    },
    {
      id: "5",
      image: "/path-to-deluxe-room.jpg",
      type: "Deluxe Room",
      rate: "2500",
      capacity: 4,
      size: "550 sqft",
      description: "Luxurious deluxe room with additional services.",
      status: "Reserved"
    }
  ]);
  
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleRoomTypeFilter = (e) => setRoomTypeFilter(e.target.value);

  const handleRateSortOrder = (e) => setRateSortOrder(e.target.value);

  const handleCapacitySortOrder = (e) => setCapacitySortOrder(e.target.value);

  const handleAddRoomType = (roomTypeData) => {
    setRoomTypes([...roomTypes, roomTypeData]);
    setIsAddRoomTypeOpen(false);
    alert('Room type added successfully');
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setRoomTypeFilter("");
    setRateSortOrder("");
    setCapacitySortOrder("");
  };

  // Apply filters
  const filteredRoomTypes = roomTypes.filter((roomType) => {
    const matchesSearch = roomType.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoomType = roomTypeFilter ? roomType.type.toLowerCase().includes(roomTypeFilter.toLowerCase()) : true;
    return matchesSearch && matchesRoomType;
  });

  // Sorting based on rate or capacity
  const sortedRoomTypes = filteredRoomTypes.sort((a, b) => {
    if (rateSortOrder) {
      return rateSortOrder === "asc" 
        ? parseInt(a.rate) - parseInt(b.rate) 
        : parseInt(b.rate) - parseInt(a.rate);
    }

    if (capacitySortOrder) {
      return capacitySortOrder === "asc"
        ? a.capacity - b.capacity
        : b.capacity - a.capacity;
    }
    
    return 0; 
  });

  return (
    <div className="room-container">
      {/* Show filter options for room types */}
      <div className="room-filters">
        <div className="filter-by">
          <h2>Filter By:</h2>
        </div>

        {/* Room Type Filter */}
        <div className="filter-option">
          <label>Room Type:</label>
          <select value={roomTypeFilter} onChange={handleRoomTypeFilter}>
            <option value="">All</option>
            <option value="Standard Room">Standard Room</option>
            <option value="Deluxe Room">Deluxe Room</option>
            <option value="Suite Room">Suite Room</option>
          </select>
        </div>

        {/* Rate Sort Order */}
        <div className="filter-option">
          <label>Sort by Rate:</label>
          <select value={rateSortOrder} onChange={handleRateSortOrder}>
            <option value="">Sort by Rate</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Capacity Sort Order */}
        <div className="filter-option">
          <label>Sort by Capacity:</label>
          <select value={capacitySortOrder} onChange={handleCapacitySortOrder}>
            <option value="">Sort by Capacity</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="filter-search">
          <input
            type="text"
            placeholder="Search room type"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Reset Filters Button */}
        <button className="reset-filters-roomtype-btn" onClick={handleResetFilters}>
          Reset Filters
        </button>

        <button className="add-room-type-btn" onClick={() => setIsAddRoomTypeOpen(true)}>
          + Add Room Type
        </button>
      </div>

      {/* Modal for adding a new room type */}
      <AddRoomType
        isOpen={isAddRoomTypeOpen}
        onClose={() => setIsAddRoomTypeOpen(false)}
        onSubmit={handleAddRoomType}
      />

      {/* Show the table for room types */}
      <div className="room-table-container">
        <table className="room-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Room Type</th>
              <th>Rate</th>
              <th>Capacity</th>
              <th>Size</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoomTypes.map((roomType) => (
              <tr key={roomType.id}>
                <td>
                  <img src={roomType.image} alt={roomType.type} className="room-image" />
                </td>
                <td>{roomType.type}</td>
                <td>{roomType.rate}</td>
                <td>{roomType.capacity}</td>
                <td>{roomType.size}</td>
                <td>{roomType.description}</td>
                <td>
                  <button className="room-action-btn edit-btn">Edit</button>
                  <button className="room-action-btn archive-btn">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomType;
