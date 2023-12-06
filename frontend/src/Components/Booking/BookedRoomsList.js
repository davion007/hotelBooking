
import React from 'react';
import './bookrooms.css';

const BookedRoomsList = ({ bookedRooms, handlePayment }) => {
  return (
    <div className="booking-container">
      <div className="booking-card">
        <h3 className="booking-header">Booking Reference: {bookedRooms.b_ref}</h3>
        <p className="booking-details">Cost: ${bookedRooms.b_cost}</p>
        <p className="booking-details">Outstanding: ${bookedRooms.b_outstanding}</p>
        <p className="booking-details">Notes: {bookedRooms.b_notes}</p>
        <h4 className="booking-header">Room Bookings</h4>
        {bookedRooms.roomBookings &&
          bookedRooms.roomBookings.map((roomBooking) => (
            <div key={roomBooking.rb_no} className="room-info">
              <p>Room Number: {roomBooking.room.r_no}</p>
              <p>Room Class: {roomBooking.room.r_class}</p>
              <p>Status: {roomBooking.room.r_status === 'A' ? 'Available' : 'Checked In'}</p>
              <p>Check-in: {new Date(roomBooking.checkin).toLocaleString()}</p>
              <p>Check-out: {new Date(roomBooking.checkout).toLocaleString()}</p>
            </div>
          ))}
        <button
          className="payment-button"
          onClick={() => handlePayment(bookedRooms.b_ref)}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default BookedRoomsList;
