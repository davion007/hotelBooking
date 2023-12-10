import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReceptionPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reception/bookings`);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reception/customers/${searchInput}`);
      setSelectedBooking(response.data.bookings);
    } catch (error) {
      console.error(error);
      setSelectedBooking(null);
    }
  };
  console.log(selectedBooking)
  const handleCheckIn = async (cNo, rbNo) => {

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reception/check-in/${cNo}`, {rbNo: rbNo});

      handleSearch()
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async (cNo, rbNo) => {
    console.log(rbNo)
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reception/check-out/${cNo}`, {rbNo: rbNo});

      handleSearch()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 flex items-center">
          <input
            type="text"
            placeholder="Search by Customer ID"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 border border-gray-300 rounded-l mr-2 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-r focus:outline-none"
          >
            Search
          </button>
        </div>
        <div className="bg-white p-4 shadow-md mb-8">
          {/* <h2 className="text-xl font-bold mb-4">Selected Customer: {selectedBooking?.customer.c_name}</h2> */}
          {selectedBooking && selectedBooking.map((booking) => (
            <div key={booking.b_ref} className="bg-white p-4 shadow-md mb-4">
              <p>Room Number: {booking.roomBookings[0].room.r_no}</p>
              <p>Check-in Date: {booking.roomBookings[0].checkin}</p>
              <p>Check-out Date: {booking.roomBookings[0].checkout}</p>
              <div className="mt-4 flex space-x-2">
                {booking.roomBookings[0].room.r_status === 'X' ? (
                  <>
                    <button
                      onClick={() => handleCheckIn(booking.b_ref, booking.roomBookings[0].rb_no)}
                      className="bg-green-500 text-white p-2 rounded focus:outline-none"
                    >
                      Check-In
                    </button>
                    <button
                      onClick={() => handleCheckOut(booking.b_ref, booking.roomBookings[0].rb_no)}
                      className="bg-slate-700 text-white p-2 rounded focus:outline-none"
                      disabled
                    >
                      Check-Out
                    </button>
                  </>
                ) : 
                booking.roomBookings[0].room.r_status === 'O' ?(
                  <>
                    <button
                      className="bg-gray-500 text-white p-2 rounded focus:outline-none"
                      disabled
                    >
                      Checked In
                    </button>
                    <button
                      onClick={() => handleCheckOut(booking.b_ref, booking.roomBookings[0].rb_no)}
                      className="bg-red-500 text-white p-2 rounded focus:outline-none"
                    >
                      Check-Out
                    </button>
                  </>
                ):
                <>
                <button
                  className="bg-gray-500 text-white p-2 rounded focus:outline-none"
                  disabled
                >
                  Checked In
                </button>
                <button
                  onClick={() => handleCheckOut(booking.c_no)}
                  className="bg-gray-500 text-white p-2 rounded focus:outline-none"
                  disabled
                >
                  Check-Out
                </button>
              </>}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
          {bookings.map((booking) => (
            <div key={booking.b_id} className="bg-white p-4 shadow-md mb-4">
              <p>Customer ID: {booking.customer.c_no}</p>
              <p>Customer Name: {booking.customer.c_name}</p>
              <p>Room Number: {booking.roomBookings[0].room.r_no}</p>
              <p>Check-in Date: {booking.roomBookings[0].checkin}</p>
              <p>Check-out Date: {booking.roomBookings[0].checkout}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceptionPanel;
