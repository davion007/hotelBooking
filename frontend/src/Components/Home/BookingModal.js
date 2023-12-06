import axios from 'axios';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { activeModal, user } from '../../Middlewares/global-state';

const BookingModal = ({roomNo , price, r_no}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState(roomNo)
  const [address, setAddress] = useState("");
  const [cardNo, setCardNo] = useState(31233213124);
  const [cardType, setCardType] = useState("");
  const [exp, setExp] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [currentUser, setCurrentUser] = useAtom(user);
  const [currentModal, setCurrentModal] = useAtom(activeModal)
  const [num , setNum] = useState(roomNo)
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const navigate = useNavigate();

  useEffect(()=> {
    setName(currentUser.c_name);
    setAddress(currentUser.c_address);
    setCardNo(currentUser.c_cardno);
    setCardType(currentUser.c_cardtype);
    setExp(currentUser.c_cardexp);

   },[currentUser])
  console.log(currentUser)

  const handleSubmit= async(e) => {
    e.preventDefault();
    const isoCheckin = new Date(checkin).toISOString();
    const isoCheckout = new Date(checkout).toISOString();
    await axios.post(`${process.env.REACT_APP_API_URL}/customer/create-booking`,{
        c_name:name,
        r_no:r_no,
        c_no: currentUser.c_no,
        roomno:room,
        checkin:isoCheckin,
        checkout:isoCheckout,
        price:price
    })
    .then(()=> {
      setCurrentModal("BOOKING")
    })
    .catch(err => {
      console.error(err);
    })

  }

  return (
    <div className='w-full min-w-full flex justify-center'>
        <div className='max-w-7xl w-full min-h-[70vh] flex justify-center items-center text-blackk mt-10'>
          <form onSubmit={handleSubmit} className="w-full max-w-[700px] relative p-8 shadow-xl bg-white">
              <p className='text-red-700 text-2xl absolute right-10 cursor-pointer' onClick={()=>setCurrentModal("")}>X</p>
              <div className="space-y-2">
                <h3 className="text-md font-bold text-blackk mb-4">
                  Book Room
                </h3>
                <label htmlFor="name" className="flex flex-col">
                  <span className="text-md">Name</span>
                  <input
                    type="name"
                    id="name"
                    placeholder="Name"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={true}
                  />
                </label>
                
                <label htmlFor="roomnos" className="flex flex-col">
                  <span className="text-md">No of Roooms</span>
                  <input
                    type="number"
                    id="roomnos"
                    placeholder="Number of Rooms"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-md"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                  />
                </label>
                <label htmlFor="address" className="flex flex-col">
                  <span className="text-md">Address</span>
                  <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-md"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <label htmlFor="cardNo" className="flex flex-col">
                  <span className="text-md">Card No</span>
                  <input
                    type="number"
                    id="cardNo"
                    placeholder="Password"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-md"
                    value={cardNo}
                    onChange={(e) => setCardNo(e.target.value)}
                  />
                </label>
                <label htmlFor="checkin" className="flex flex-col">
                  <span className="text-md">Check-in</span>
                  <input
                    type="datetime-local"  // Use type "datetime-local" for time and date
                    id="checkin"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-md"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </label>

                <label htmlFor="checkout" className="flex flex-col">
                  <span className="text-md">Check-out</span>
                  <input
                    type="datetime-local"  // Use type "datetime-local" for time and date
                    id="checkout"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-md"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </label>
                <div className='flex font-bold text-2xl'>
                  <p className=''>Total Price: </p>
                  <span className=''>${num* price}</span>
                </div>
              </div>
              <div className="my-6 space-y-6">
                <button
                  type="submit"
                  className={`w-full py-2 bg-primary rounded-md text-white font-bold ${
                    isLoading ? "opacity-60" : ""
                  }`}
                  disabled={isLoading}
                >
                  {!isLoading ? "Submit" : "Submiting..."}
                </button>

              </div>
            </form>
        </div>
    </div>
  )
}

export default BookingModal