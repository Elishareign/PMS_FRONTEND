import React, { useState } from "react";
import "./AddRoomType.css";

const AddRoomType = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1); // Step management
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

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

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

    console.log("Room Type Data:", roomTypeData);
    onSubmit(roomTypeData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-room-type-modal-overlay">
      <div className="add-room-type-modal">
        <h2>Add Room Type</h2>

        {/* Stepper Header */}
        <div className="add-room-type-stepper">
          {["Room Details", "Amenities Included", "Facilities Included"].map((title, index) => {
            const isCompleted = index + 1 < currentStep; // Determine if the step is completed
            const isActive = index + 1 === currentStep; // Check if the step is active

            return (
              <div
                key={index}
                className={`step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
              >
                <div className="circle">
                  {index + 1}
                </div>
                <span>{title}</span>
              </div>
            );
          })}
        </div>



        {/* Form Content */}
        <form>
          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>Room Type Name</label>
                <input
                  type="text"
                  value={roomTypeName}
                  onChange={(e) => setRoomTypeName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Base Price</label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Room Size</label>
                <input
                  type="text"
                  value={roomSize}
                  onChange={(e) => setRoomSize(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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


          {/* Navigation Buttons */}
          <div className="navigation-buttons">
          <div className="left-buttons">
            {currentStep > 1 && (
              <button type="button" className="back-btn" onClick={handlePreviousStep}>
                Back
              </button>
            )}
          </div>
            <div className="right-buttons">
              {currentStep < 3 && (
                <button type="button" className="next-btn" onClick={handleNextStep}>
                  Next
                </button>
              )}
              {currentStep === 3 && (
                <button type="submit" className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddRoomType;
