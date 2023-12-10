import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HousekeepingPanel = () => {
  const [occupiedRooms, setOccupiedRooms] = useState([]);

  useEffect(() => {
    const fetchOccupiedRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/housekeeping/checked-out-rooms`);
        setOccupiedRooms(response.data.occupiedBookings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOccupiedRooms();
  }, []);
  console.log(occupiedRooms)
  const handleUpdateRoomStatus = async (rNo) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/housekeeping/update-room-status`, { r_no:rNo });
      // Refresh the list of occupied rooms after update
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/housekeeping/checked-out-rooms`);
      setOccupiedRooms(response.data.occupiedBookings);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Occupied Rooms</h2>
        {occupiedRooms && occupiedRooms.map((room) => (
          <div key={room.r_no} className="bg-white p-4 shadow-md mb-4">
            <p>Room Number: {room.r_no}</p>
            <p>Check-in Date: {room.checkin}</p>
            <p>Check-out Date: {room.checkout}</p>
            <button
              onClick={() => handleUpdateRoomStatus(room.r_no)}
              className="bg-green-500 text-white p-2 rounded focus:outline-none"
            >
              Update to Available
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousekeepingPanel;
