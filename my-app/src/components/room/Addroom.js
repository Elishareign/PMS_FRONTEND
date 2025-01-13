import React, { useState } from "react";
import "./AddRoom.css";

const AddRoom = ({ isOpen, onClose, onSubmit }) => {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    roomNumber: "",
    floorNumber: "",
    roomType: "",
    roomStatus: "",
  });

  const [roomNumber, setRoomNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [formValidity, setFormValidity] = useState({
    roomNumber: "default",
    floorNumber: "default",
  });

  const [generalError, setGeneralError] = useState("");

  const roomTypes = [
    { id: 1, room_type_name: "Standard Room" },
    { id: 2, room_type_name: "Deluxe Room" },
    { id: 3, room_type_name: "Suite" },
  ];

  const roomStatusOptions = [
    { value: "", label: "Select Status", disabled: true },
    { value: "Available", label: "Available" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Out-of-Order", label: "Out of Order" },
  ];


  const validateFields = () => {
    const fieldErrors = {};

    if (!roomNumber) {
      fieldErrors.roomNumber = "Room Number is required.";
    } else if (isNaN(roomNumber)) {
      fieldErrors.roomNumber = "Must be a valid number.";
    } else if (roomNumber.length > 4) {
      fieldErrors.roomNumber = "Must not exceed 4 digits.";
    }

    if (!floorNumber) {
      fieldErrors.floorNumber = "Floor Number is required.";
    } else if (isNaN(floorNumber)) {
      fieldErrors.floorNumber = "Must be a valid number.";
    } else if (floorNumber.length > 3) {
      fieldErrors.floorNumber = "Must not exceed 3 digits.";
    }

    if (!selectedRoomType) {
      fieldErrors.roomType = "Room Type is required.";
    }

    if (!roomStatus) {
      fieldErrors.roomStatus = "Room Status is required.";
    }

    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setGeneralError("Please fill in all the required fields.");
      return false;
    }

    setGeneralError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trigger validation on submit
    const isValid = validateFields();
    if (!isValid) return;
  
    setIsSubmitting(true);
    const roomData = { roomNumber, floorNumber, roomType: selectedRoomType, roomStatus };
  
    // Call the onSubmit function passed via props
    onSubmit(roomData);
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "roomNumber") {
      setRoomNumber(value);
      setFormValidity((prev) => ({
        ...prev,
        roomNumber: validateInput(value, 4) ? "valid" : value ? "invalid" : "default",
      }));
    } else if (field === "floorNumber") {
      setFloorNumber(value);
      setFormValidity((prev) => ({
        ...prev,
        floorNumber: validateInput(value, 3) ? "valid" : value ? "invalid" : "default",
      }));
    }
  };

  const validateInput = (input, maxLength) => {
    return !isNaN(input) && input.length <= maxLength;
  };

  const getBorderColor = (field) => {
    if (formValidity[field] === "invalid") return "red";
    if (formValidity[field] === "valid") return "green";
    return "#ccc"; 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Room</h2>

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
                  placeholder="Enter Room Number" 
                  style={{ borderColor: getBorderColor("roomNumber") }}
                  required
                  min="1"
                />
                {errors.roomNumber && <p className="error-text">{errors.roomNumber}</p>}

                <label htmlFor="floorNumber">
                  Floor Number <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="floorNumber"
                  id="floorNumber"
                  value={floorNumber}
                  onChange={(e) => handleInputChange(e, "floorNumber")}
                  placeholder="Enter Floor Number" 
                  style={{ borderColor: getBorderColor("floorNumber") }}
                  required
                  min="1"
                />
                {errors.floorNumber && <p className="error-text">{errors.floorNumber}</p>}

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
                  <option value="" disabled>
                    Select Room Type
                  </option>
                  {roomTypes.map((roomType) => (
                    <option key={roomType.id} value={roomType.id}>
                      {roomType.room_type_name}
                    </option>
                  ))}
                </select>
                {errors.roomType && <p className="error-text">{errors.roomType}</p>}

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
                {errors.roomStatus && <p className="error-text">{errors.roomStatus}</p>}
              </div>
            </div>

            {/* General Error Message */}
            {generalError && <p className="error-text general-error">{generalError}</p>}

            <div className="form-buttons">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Add Room"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
