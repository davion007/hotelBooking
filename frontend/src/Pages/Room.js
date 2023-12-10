import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activeModal, allRate } from "../Middlewares/global-state";
import Room from "../Components/Home/Room";
import BookingModal from "../Components/Home/BookingModal";
import ConfirmModal from "../Components/Home/ConfirmModal";

const Index = () => {
    const [hotel, setHotel] = useState(null)
    const [allHotels, setAllHotels] = useState([])
    const [allRates, setAllRates] = useAtom(allRate)
    const [num, setNum] = useState(1)
    const [currentModal, setCurrentModal] = useAtom(activeModal);

    const hot = useParams()
    const mapping = {sup_d: "Superior Double", sup_t:"Superior Twin" , std_d: "Standard Double", std_t: "Standard twin" }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/customer/hotel-data/${hot.id}`)
        .then((res) => {
            setHotel(res.data.roomData)
          })
        .catch();
    },[hot.id]);
    useEffect(()=> {
        if(hotel) {
            axios.get(`${process.env.REACT_APP_API_URL}/customer/hotel-by-class/${hotel.r_class}`)
            .then((response)=> {
                setAllHotels(response.data.hotelDataByClass)
            })
            .catch((error) => {
                console.error(error)
            })
        }
    },[hotel])
  return (
    <>
    {currentModal && currentModal==="BOOKING" &&
        (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                <div className="w-full flex flex-col items-center absolute">
                    <BookingModal roomNo={num} price={allRates[hotel.r_class]} r_no={hotel.r_no}/>
                </div>
            </div>
        )

    }
    {currentModal && currentModal==="CONFIRM BOOKING" &&
        (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                <div className="w-full flex flex-col items-center">
                    <ConfirmModal/>
                </div>
            </div>
        )

    }
    {hotel && 
        <div className="w-full min-w-full flex justify-center">
            <div className="max-w-7xl w-full flex justify-between  px-4 py-10 text-blackk">
                <div className="">
                    <div className="lg:space-x-6 w-full lg:flex my-10 shadow-2xl p-2">
                        <div className="w-full lg:w-1/2">
                            <img src={`/${hotel.RoomImage[0].image_url}.jpg`} alt={hotel.r_no}/>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className='my-4'>
                                
                                <div className="my-3">
                                    <h1 className='font-bold text-2xl'>Room {hotel.r_no}</h1>
                                    <p className='text-greyy text-sm'>{hotel.RoomImage[0].facility}</p>
                                </div>
                                <button className={`px-4 py-2 text-xs ${hotel.r_status === "A"?" bg-highlight" : "bg-slate-500"} text-white rounded-3xl`}>{hotel.r_status === "A"? "Available": "Unavailable"}</button>
                                <p className='text-xl font-bold my-2'>{mapping[hotel.r_class]}</p>
                                <div className="my-4 border-2 w-max">
                                    <label className="font-bold">
                                        <span className="text-lg">No of rooms: </span>
                                        <select className="px-4" onChange={(e)=> setNum(e.target.value)}>
                                            {[1,2,3,4,5,6,7,8,9,10].map((num) => {
                                                return <option key={num} value={num} >{num}</option>
                                            })}
                                        </select>
                                    </label>
                                </div>
                                {allRate &&
                                    <p className='font-bold'>${allRates[hotel.r_class]}</p>
                                }
                                <p className={`px-4 py-2 ${hotel.r_status === "A"? "bg-primary": "bg-slate-500"}   w-max rounded-md text-white mt-2 cursor-pointer hover:bg-opacity-80 `} onClick={()=> hotel.r_status === "A"? setCurrentModal("BOOKING"): ""}>Book Now</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold my-4">Here are some room recommned rooms for you</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            
                            {allHotels && allHotels.length>0 &&
                                allHotels.map((hotel) => {
                                    return <Room key={hotel.r_no} hotelData={hotel} allRates={allRates}/>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    }
    </>
  );
};

export default Index;
