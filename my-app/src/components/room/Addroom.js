import React, { useState } from "react";
import "./AddRoom.css";

const AddRoom = ({ isOpen, onClose, onSubmit }) => {
  const [selectedRoomType, setSelectedRoomType] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const [roomNumber, setRoomNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [formValidity, setFormValidity] = useState({
    roomNumber: "default",
    floorNumber: "default",
  });

  // Hardcoded room types
  const roomTypes = [
    { id: 1, room_type_name: "Standard Room" },
    { id: 2, room_type_name: "Deluxe Room" },
    { id: 3, room_type_name: "Suite" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields are filled and that roomNumber and floorNumber are integers
    if (!roomNumber || !floorNumber || !selectedRoomType || !roomStatus) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(roomNumber) || isNaN(floorNumber)) {
      alert("Room Number and Floor Number must be valid integers");
      return;
    }

    if (roomNumber.length > 10 || floorNumber.length > 10) {
      alert("Room Number and Floor Number must not exceed 10 digits");
      return;
    }

    const roomData = { roomNumber, floorNumber, roomType: selectedRoomType, roomStatus };
    onSubmit(roomData);
  };

  const roomStatusOptions = [
    { value: "", label: "Select Status", disabled: true },
    { value: "Available", label: "Available" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Out-of-Order", label: "Out of Order" },
  ];

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "roomNumber") {
      setRoomNumber(value);
      setFormValidity((prev) => ({
        ...prev,
        roomNumber: validateInput(value) ? "valid" : value ? "invalid" : "default",
      }));
    } else if (field === "floorNumber") {
      setFloorNumber(value);
      setFormValidity((prev) => ({
        ...prev,
        floorNumber: validateInput(value) ? "valid" : value ? "invalid" : "default",
      }));
    }
  };

  const validateInput = (input) => {
    return !isNaN(input) && input.length <= 10;
  };

  const getBorderColor = (field) => {
    if (formValidity[field] === "invalid") return "red";
    if (formValidity[field] === "valid") return "green";
    return "#ccc"; // Default grey color
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Room</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h1>Room Details</h1>
            <div className="form-row">
              <div className="form-section">
                <label htmlFor="roomNumber">
                  Room Number <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="roomNumber"
                  id="roomNumber"
                  value={roomNumber}
                  onChange={(e) => handleInputChange(e, "roomNumber")}
                  style={{ borderColor: getBorderColor("roomNumber") }}
                  maxLength={10}
                  required
                  min="1" 
                />

                <label htmlFor="floorNumber">
                  Floor Number <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="floorNumber"
                  id="floorNumber"
                  value={floorNumber}
                  onChange={(e) => handleInputChange(e, "floorNumber")}
                  style={{ borderColor: getBorderColor("floorNumber") }}
                  maxLength={10}
                  required
                  min="1" 
                />

              <label htmlFor="roomType">
                Room Type <span className="required">*</span>
              </label>
              <select
                name="roomType"
                id="roomType"
                className="styled-select"
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                required
              >
                <option value="" disabled>Select Room Type</option>
                {roomTypes.map((roomType) => (
                  <option key={roomType.id} value={roomType.id}>
                    {roomType.room_type_name}
                  </option>
                ))}
              </select>

              <label htmlFor="roomStatus">
                Room Status <span className="required">*</span>
              </label>
              <select
                name="roomStatus"
                id="roomStatus"
                className="styled-select"
                value={roomStatus}
                onChange={(e) => setRoomStatus(e.target.value)}
                required
              >
                {roomStatusOptions.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>

              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
