import React, { useState } from "react";
import "./AddRoomType.css";

const AddRoomType = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [roomTypeName, setRoomTypeName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({
    roomTypeName: false,
    basePrice: false,
    capacity: false,
    roomSize: false,
  });
  const [amenities, setAmenities] = useState({
    wifi: false,
    aircon: false,
    shower: false,
    towels: false,
    tv: false,
    telephone: false,
    ref: false,
    wardrobe: false,
    concierge: false,
  });
  const [facilities, setFacilities] = useState({
    pool: false,
    gym: false,
    conferenceRoom: false,
    restaurant: false,
    spa: false,
  });

  // field validation
  const validateField = (field, value) => {
    switch (field) {
      case "roomTypeName":
        return /^[a-zA-Z][a-zA-Z0-9 ]*$/.test(value);
      case "basePrice":
        return /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) > 0;
      case "capacity":
        return /^\d{1,3}$/.test(value);
      case "roomSize":
        return /^\d+(\.\d+)?$/.test(value) && parseFloat(value) > 0;
      case "description":
        return value.trim() !== ""; 
      default:
        return true;
    }
  };

  const handleInputChange = (field, value) => {
    const isValid = validateField(field, value);
    setFormErrors((prevState) => ({
      ...prevState,
      [field]: !isValid,
    }));

    // Set the state values for each field
    switch (field) {
      case "roomTypeName":
        setRoomTypeName(value);
        break;
      case "basePrice":
        setBasePrice(value);
        break;
      case "capacity":
        setCapacity(value);
        break;
      case "roomSize":
        setRoomSize(value);
        break;
      default:
        break;
    }
  };

  // Input Class logic based on the validation state
  const inputClass = (field) => {
    // Check if the value of the field is empty or not
    const value = {
      roomTypeName,
      basePrice,
      capacity,
      roomSize,
      description, 
    }[field];
  
    // If the field is empty, make it gray
    if (!value) {
      return "input-default";
    }
  
    // If there's an error, make it red
    if (formErrors[field]) {
      return "input-error";
    }
  
    // If input is valid, make it green
    return "input-valid";
  };
  
  const amenitiesList = [
    { name: "wifi", label: "WiFi" },
    { name: "aircon", label: "Air Conditioned Room" },
    { name: "shower", label: "Shower Gel, Soap, and Shampoo" },
    { name: "towels", label: "Towels and Linens" },
    { name: "tv", label: "Television Access" },
    { name: "telephone", label: "Telephone" },
    { name: "ref", label: "Refrigerator" },
    { name: "wardrobe", label: "Wardrobe and Closet" },
    { name: "concierge", label: "Concierge Services" },
  ];

  const facilitiesList = [
    { name: "pool", label: "Pool Access" },
    { name: "gym", label: "Gym" },
    { name: "conferenceRoom", label: "Conference Room" },
    { name: "restaurant", label: "Restaurant" },
    { name: "spa", label: "Spa" },
  ];
  
  const handleCheckboxChange = (e, type) => {
    const { name, checked } = e.target;
    if (type === "amenities") {
      setAmenities((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (type === "facilities") {
      setFacilities((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }
  };

  const handleNextStep = () => {
    const step1Fields = ["roomTypeName", "basePrice", "capacity", "roomSize"];
    const step1Errors = step1Fields.reduce((errors, field) => {
      const value = { roomTypeName, basePrice, capacity, roomSize }[field];
      errors[field] = !validateField(field, value);
      return errors;
    }, {});

    setFormErrors((prevState) => ({
      ...prevState,
      ...step1Errors,
    }));

    const hasErrors = Object.values(step1Errors).some((error) => error);
    if (currentStep === 1 && hasErrors) return;
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomTypeData = {
      roomTypeName,
      basePrice,
      capacity,
      roomSize,
      description,
      amenities,
      facilities,
    };
    onSubmit(roomTypeData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-room-type-modal-overlay">
      <div className="add-room-type-modal">
        <h2>Add Room Type</h2>
        <div className="add-room-type-stepper">
          {["Room Details", "Amenities Included", "Facilities Included"].map((title, index) => {
            const isCompleted = index + 1 < currentStep;
            const isActive = index + 1 === currentStep;

            return (
              <div
                key={index}
                className={`step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
              >
                <div className="circle">{index + 1}</div>
                <span>{title}</span>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>Room Type Name</label>
                <input
                  type="text"
                  value={roomTypeName}
                  onChange={(e) => handleInputChange("roomTypeName", e.target.value)}
                  placeholder="Enter Room Type Name"
                  className={inputClass("roomTypeName")}
                />
              </div>
              <div className="form-group">
                <label>Base Price</label>
                <input
                  type="text"
                  value={basePrice}
                  onChange={(e) => handleInputChange("basePrice", e.target.value)}
                  placeholder="Enter Base Price"
                  className={inputClass("basePrice")}
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => handleInputChange("capacity", e.target.value)}
                  placeholder="Enter Capacity"
                  className={inputClass("capacity")}
                />
              </div>
              <div className="form-group">
                <label>Room Size (in square meters)</label>
                <input
                  type="text"
                  value={roomSize}
                  onChange={(e) => handleInputChange("roomSize", e.target.value)}
                  placeholder="Enter size in square meters (e.g., 25)"
                  className={inputClass("roomSize")}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDescription(value);
                    handleInputChange("description", value); 
                  }}
                  placeholder="Enter Description" 
                  className={inputClass("description")} 
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <label>Amenities Included:</label>
              <div className="checkbox-group">
                {amenitiesList.map((amenity) => (
                  <div key={amenity.name} className="checkbox-item">
                    <input
                      type="checkbox"
                      name={amenity.name}
                      checked={amenities[amenity.name]}
                      onChange={(e) => handleCheckboxChange(e, "amenities")}
                    />
                    <label>{amenity.label}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <label>Facilities Included:</label>
              <div className="checkbox-group">
                {facilitiesList.map((facility) => (
                  <div key={facility.name} className="checkbox-item">
                    <input
                      type="checkbox"
                      name={facility.name}
                      checked={facilities[facility.name]}
                      onChange={(e) => handleCheckboxChange(e, "facilities")}
                    />
                    <label>{facility.label}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button type="button" className="back-btn" onClick={() => setCurrentStep((s) => s - 1)}>
                Back
              </button>
            )}
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            {currentStep < 3 && (
              <button type="button" className="next-btn" onClick={handleNextStep}>
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button type="submit" className="submit-btn">
                Add Room Type
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomType;
