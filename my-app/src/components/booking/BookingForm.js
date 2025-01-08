import React, { useState } from 'react';
import './BookingForm.css'; // Add styles for the modal
import GuestDetails from './GuestDetails';
import BookingDetails from './BookingDetails';

const BookingFormModal = ({ isOpen, onClose, onCreateBooking }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestContactNo, setGuestContactNo] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleNext = () => {
    if (step === 1 && firstName && lastName && guestContactNo && guestEmail) {
      setStep(2);
    } else if (step === 2 && roomNumber && numberOfGuests && checkInDate && checkOutDate && bookingDate) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const newBooking = {
      guestName: `${firstName} ${middleName} ${lastName}`,
      guestContactNo,
      guestEmail,
      roomNumber,
      numberOfGuests,
      checkInDate: `${checkInDate} ${checkInTime}`,
      checkOutDate: `${checkOutDate} ${checkOutTime}`,
      bookingDate,
      specialRequest,
      paymentStatus,
    };

    onCreateBooking(newBooking); // Pass the new booking data to the parent component
    onClose(); // Close the modal after submission
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    onClose(); // Close the modal when the close button is clicked
  };

  if (!isOpen) return null; // Do not render if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Booking</h2>

        {/* Close Button */}
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>

        {/* Stepper Progress */}
        <div className="stepper">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="circle">1</div>
            <p>Guest Details</p>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="circle">2</div>
            <p>Booking Details</p>
          </div>
        </div>

        <form>
          {step === 1 && (
            <GuestDetails
              firstName={firstName}
              setFirstName={setFirstName}
              middleName={middleName}
              setMiddleName={setMiddleName}
              lastName={lastName}
              setLastName={setLastName}
              guestContactNo={guestContactNo}
              setGuestContactNo={setGuestContactNo}
              guestEmail={guestEmail}
              setGuestEmail={setGuestEmail}
            />
          )}

          {step === 2 && (
            <BookingDetails
              roomNumber={roomNumber}
              setRoomNumber={setRoomNumber}
              numberOfGuests={numberOfGuests}
              setNumberOfGuests={setNumberOfGuests}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkInTime={checkInTime}
              setCheckInTime={setCheckInTime}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              checkOutTime={checkOutTime}
              setCheckOutTime={setCheckOutTime}
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              specialRequest={specialRequest}
              setSpecialRequest={setSpecialRequest}
              paymentStatus={paymentStatus}
              setPaymentStatus={setPaymentStatus}
            />
          )}

          <div className="modal-actions">
            <button type="button" onClick={handlePrev} disabled={step === 1}>
              Previous
            </button>
            <button type="button" onClick={handleNext}>
              {step === 1 ? 'Next' : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingFormModal;
