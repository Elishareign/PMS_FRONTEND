import React, { useState } from "react";
import "./AddRoomType.css";

const AddRoomType = ({ isOpen, onClose, onSubmit }) => {
  const [roomTypeName, setRoomTypeName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [description, setDescription] = useState("");
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
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

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

  const handleAmenityChange = (event) => {
    const { name, checked } = event.target;
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [name]: checked,
    }));
  };

  const handleFacilityChange = (event) => {
    const { name, checked } = event.target;
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (file && allowedTypes.includes(file.type)) {
      setImageFile(file);
      console.log("Image selected:", file);
    } else {
      alert("Please select a valid image file (JPEG, PNG, or GIF).");
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
  
    // Validate RoomTypeName (Allow any text including numbers, special characters)
    if (!roomTypeName || typeof roomTypeName !== "string" || roomTypeName.trim() === "") {
      newErrors.roomTypeName = "Room type name is required.";
    }
  
    // Validate BasePrice (must be a positive number)
    const priceRegex = /^\d+(\.\d{1,2})?$/; // Regular expression for valid monetary value (e.g., 100, 100.50)
    if (!basePrice || !priceRegex.test(basePrice)) {
      newErrors.basePrice = "Base price must be a valid monetary value (e.g., 100, 100.50).";
    }
  
    // Validate Capacity (must be an integer)
    if (!capacity || !Number.isInteger(Number(capacity)) || capacity <= 0) {
      newErrors.capacity = "Capacity must be a positive integer.";
    }
  
    // Validate RoomSize (must be a valid integer with measurement unit)
    const sizeRegex = /^\d+(\.\d+)?\s*(sqft|m²)$/i; // Regular expression for room size with a measurement unit (sqft or m²)
    if (!roomSize || !sizeRegex.test(roomSize.trim())) {
      newErrors.roomSize = "Room size must be a valid number with measurement (e.g., 200 sqft, 50 m²).";
    }
  
    // Validate Description (Allow any text)
    if (!description || typeof description !== "string" || description.trim() === "") {
      newErrors.description = "Description is required.";
    }
  
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const roomTypeData = {
      roomTypeName,
      basePrice,
      capacity,
      roomSize,
      description,
      amenities,
      facilities,
      imageFile,
    };

    console.log("Room Type Data:", roomTypeData);
    
    // Call the onSubmit callback passed as a prop to notify the parent component
    onSubmit(roomTypeData);

    // Close the modal after submission
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="add-room-type-modal-overlay">
      <div className="add-room-type-modal">
        <h2>Add Room Type</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group1">
            <label>
              Room Type Name<span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              value={roomTypeName}
              onChange={(e) => setRoomTypeName(e.target.value)}
              className={errors.roomTypeName ? "input-error" : ""}
              required
            />
            {errors.roomTypeName && (
              <p className="error-message">{errors.roomTypeName}</p>
            )}
          </div>
          <div className="form-group1">
            <label>
              Base Price<span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className={errors.basePrice ? "input-error" : ""}
              required
            />
            {errors.basePrice && (
              <p className="error-message">{errors.basePrice}</p>
            )}
          </div>
          <div className="form-group1">
            <label>
              Capacity<span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className={errors.capacity ? "input-error" : ""}
              required
            />
            {errors.capacity && (
              <p className="error-message">{errors.capacity}</p>
            )}
          </div>
          <div className="form-group1">
            <label>
              Room Size<span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              value={roomSize}
              onChange={(e) => setRoomSize(e.target.value)}
              className={errors.roomSize ? "input-error" : ""}
              required
            />
            {errors.roomSize && (
              <p className="error-message">{errors.roomSize}</p>
            )}
          </div>
          <div className="form-group1">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`description-textarea ${errors.description ? "input-error" : ""}`}
            ></textarea>
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>

          <div className="form-group2">
            <label>Additional Amenities:</label>
            <div className="amenities-list">
              {amenitiesList.map((amenity) => (
                <div key={amenity.name} className="amenity-item">
                  <input
                    type="checkbox"
                    name={amenity.name}
                    checked={amenities[amenity.name]}
                    onChange={handleAmenityChange}
                    id={amenity.name}
                  />
                  <label htmlFor={amenity.name}>{amenity.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group2">
            <label>Additional Facilities:</label>
            <div className="facilities-list">
              {facilitiesList.map((facility) => (
                <div key={facility.name} className="facility-item">
                  <input
                    type="checkbox"
                    name={facility.name}
                    checked={facilities[facility.name]}
                    onChange={handleFacilityChange}
                    id={facility.name}
                  />
                  <label htmlFor={facility.name}>{facility.label}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="confirm-btn">
            Submit
          </button>
          <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
         </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomType;
