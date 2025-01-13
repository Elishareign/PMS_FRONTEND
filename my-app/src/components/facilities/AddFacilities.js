import React, { useState } from 'react';
import Modal from './facilitiesModal';
import './modal.css';
import './facilities.css';

const AddFacilityModal = ({ isModalOpen, handleCloseModal }) => {
  const [formData, setFormData] = useState({
    facilityName: '',
    facilityCategoryName: '',
    location: '',
    capacity: '',
    pricing: '',
    operationalDays: '',
    billingType: '',
    openingTime: '',
    closingTime: '',
    facilityImage: null,
  });

  const [selectedAction, setSelectedAction] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, facilityImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Handle form submission logic here (e.g., API call)
  };

  const handleCheckboxChange = (e) => {
    setSelectedAction(e.target.value);
  };
  
  return (
    <Modal show={isModalOpen} onClose={handleCloseModal}>
      <h2 id="titleaddfacilites">Add New Facility</h2>
      <h3 id="facilitycat">Facility Category:</h3>
      <h3 id="pickaction">Pick an Action</h3>
      <div>
        <label className="checkbox">
          <input
            type="checkbox"
            name="action"
            value="Enable"
            onChange={handleCheckboxChange}
            checked={selectedAction === 'Enable'}
          />
          Create New Facility Category
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            name="action"
            value="Disable"
            onChange={handleCheckboxChange}
            checked={selectedAction === 'Disable'}
          />
          Select Existing Facility Category
        </label>
      </div>
      <h3 className="Facilitycatergory">Facility Category</h3>
      <form className="Facilityname" onSubmit={handleSubmit}>
        {selectedAction === 'Enable' ? (
          <div>
              <input
                type="text"
                name="facilityCategoryName"
                required
                placeholder="Facility Category"
                value={formData.facilityCategoryName}
                onChange={handleChange}
              />
          </div>
        ) : (
          <div>
              <select
                name="facilityCategoryName"
                id="facilityCategoryName"
                required
                value={formData.facilityCategoryName}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Gym">Gym</option>
                <option value="Pool">Pool</option>
                <option value="Conference Room">Conference Room</option>
              </select>
          </div>
        )}
        
        <h3 id="FdetailsTitle">Facility Details</h3>

        <div id="upload-image">
          <label>
            Upload Image:
            <input type="file" name="facilityImage" accept="image/*" id="Fimage" />
          </label>
        </div>
        <div className="facility-inputs">
          <div className="input-pair">
            <label>Facility Name:</label>
            <input
              type="text"
              name="facilityName"
              required
              placeholder="Facility Name"
            />
          </div>
          <div className="input-pair">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              required
              placeholder="Location"
            />
          </div>
          <div className="input-pair">
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              required
              placeholder="Capacity"
            />
          </div>
        </div>
        <div className="Facility-Description">
          <label>Facility Description:</label>
          <input
            type="text"
            name="location"
            required
            placeholder="Location"
          />
        </div>

        <h3 id="Facility-Operational"> Facility Operational Management</h3>
        <div className="operational-times">
          <div className="time-pair">
            <label for="opening-time">Opening Time:</label>
            <input type="time" name="openingTime" id="opening-time" required />
          </div>
          <div className="time-pair">
            <label for="closing-time">Closing Time:</label>
            <input type="time" name="closingTime" id="closing-time" required />
          </div>
        </div>
        <div id="Facility-Operational">
          <div className="operational-options">
            <div className="option-pair">
              <label for="operational-days">Operational Days:</label>
              <select name="operationalDays" id="operational-days" required>
                <option value="">Select Days</option>
                <option value="Monday-Friday">Monday - Friday</option>
                <option value="Monday-Sunday">Monday - Sunday</option>
                <option value="Weekend">Weekend</option>
              </select>
            </div>

            <div className="option-pair">
              <label for="billing-type">Billing Type:</label>
              <select name="billingType" id="billing-type" required>
                <option value="">Select Billing Type</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="option-pair">
              <label for="pricing">Pricing:</label>
              <input type="number" name="pricing" id="pricing" required placeholder="Enter Price" />
            </div>
          </div>
        </div>

        <button type="submit" id="button">Save</button>
      </form> {/* Closing tag added here */}
    </Modal>
  );
};

export default AddFacilityModal;
