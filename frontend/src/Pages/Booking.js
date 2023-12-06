// BookingDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { activeModal, user } from '../Middlewares/global-state';
import BookedRoomsList from '../Components/Booking/BookedRoomsList';
import PaymentModal from '../Components/Booking/PaymentModal';

const BookingDetails = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useAtom(user);
  const [currentModal, setCurrentModal] = useAtom(activeModal);

  console.log(currentUser)
  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/customer/user-bookings/${currentUser.c_no}`
        );
        setBookedRooms(response.data.userBookings);
      } catch (error) {
        console.error('Error fetching booked rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookedRooms();
  }, [currentUser]);

  const handlePayment = (bookingId) => {
    console.log(`Initiate payment for booking ID: ${bookingId}`);
    setCurrentModal("PAYMENT")
  };

  return (
    <>
        {currentModal && currentModal==="PAYMENT" &&
        (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                <div className="w-full flex flex-col items-center absolute">
                    <PaymentModal  />
                </div>
            </div>
        )

         }

        <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Booked Rooms</h2>

        {isLoading && <p>Loading...</p>}

        {!isLoading && bookedRooms.length === 0 && <p>No booked rooms found.</p>}

        {!isLoading && bookedRooms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookedRooms.map((room) => (
                <BookedRoomsList key={room.b_ref} bookedRooms={room} handlePayment={handlePayment} />
            ))}
            </div>
        )}
        </div>
    </>
  );
};

export default BookingDetails;
