import React, { useState, useEffect } from 'react';
import './GuestDetails.css';

const GuestDetails = ({
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  guestContactNo,
  setGuestContactNo,
  guestEmail,
  setGuestEmail,
}) => {
  const [contactNoValid, setContactNoValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [middleNameValid, setMiddleNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const [contactNoTouched, setContactNoTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [middleNameTouched, setMiddleNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // Validation functions
  const validateContactNo = (value) => {
    setContactNoValid(value.length === 11 && /^[0-9]+$/.test(value));
  };

  const validateName = (value, type) => {
    const isValid = value.trim() === '' || /^[a-zA-Z\s]+$/.test(value);
    if (type === 'firstName') setFirstNameValid(isValid);
    if (type === 'middleName') setMiddleNameValid(isValid);
    if (type === 'lastName') setLastNameValid(isValid);
  };

  const validateEmail = (value) => {
    setEmailValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value));
  };

  useEffect(() => {
    validateContactNo(guestContactNo);
    validateName(firstName, 'firstName');
    validateName(middleName, 'middleName');
    validateName(lastName, 'lastName');
    validateEmail(guestEmail);
  }, [firstName, middleName, lastName, guestContactNo, guestEmail]);

  return (
    <div className="guest-details">
      <h3>Guest Details</h3>

      <div className="input-container">
        <label htmlFor="firstName" className="outside-label">
          First Name<span className="required">*</span>
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setFirstNameTouched(true);
          }}
          id="firstName"
          className={
            firstNameTouched
              ? firstNameValid
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        {!firstNameValid && firstNameTouched && (
          <p className="error-message">Invalid first name.</p>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="middleName" className="outside-label">Middle Name</label>
        <input
          type="text"
          value={middleName}
          onChange={(e) => {
            setMiddleName(e.target.value);
            setMiddleNameTouched(true);
          }}
          id="middleName"
          className={
            middleNameTouched
              ? middleNameValid
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        {!middleNameValid && middleNameTouched && (
          <p className="error-message">Invalid middle name.</p>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="lastName" className="outside-label">
          Last Name<span className="required">*</span>
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setLastNameTouched(true);
          }}
          id="lastName"
          className={
            lastNameTouched
              ? lastNameValid
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        {!lastNameValid && lastNameTouched && (
          <p className="error-message">Invalid last name.</p>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="guestContactNo" className="outside-label">
          Contact Number<span className="required">*</span>
        </label>
        <input
          type="text"
          value={guestContactNo}
          onChange={(e) => {
            setGuestContactNo(e.target.value);
            setContactNoTouched(true);
          }}
          id="guestContactNo"
          className={
            contactNoTouched
              ? contactNoValid
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        {!contactNoValid && contactNoTouched && (
          <p className="error-message">Contact number must be 11 digits.</p>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="guestEmail" className="outside-label">
          Email Address<span className="required">*</span>
        </label>
        <input
          type="email"
          value={guestEmail}
          onChange={(e) => {
            setGuestEmail(e.target.value);
            setEmailTouched(true);
          }}
          id="guestEmail"
          className={
            emailTouched
              ? emailValid
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        {!emailValid && emailTouched && (
          <p className="error-message">Invalid email address.</p>
        )}
      </div>
    </div>
  );
};

export default GuestDetails;
