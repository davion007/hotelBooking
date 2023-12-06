import React from 'react'
import { useNavigate } from 'react-router-dom'

const Room = ({hotelData, allRates}) => {
  const mapping = {sup_d: "Superior Double", sup_t:"Superior Twin" , std_d: "Standard Double", std_t: "Standard twin" }
  const navigate = useNavigate();
  return (
    <div className='max-w-[410px] h-max p-4 cursor-pointer bg-white' onClick={()=> navigate(`/${hotelData.r_no}`)}>
        <div className=''>
            <div className='rounded-2xl  overflow-hidden'>
                <img src={`/${hotelData.RoomImage[0].image_url}.jpg`} alt={hotelData.r_no} className='max-w-[368px] h-[277px]' />
            </div>
            <div className='py-4'>
                <button className='px-4 py-2 text-xs bg-highlight text-white rounded-3xl'>{hotelData.r_status === "A"? "Available": "Unavailable"}</button>
                <h1 className='font-bold text-lg'>Room {hotelData.r_no}</h1>
                <p className='text-greyy text-sm'>{hotelData.RoomImage[0].facility}</p>
                <p className='text-greyy'>{mapping[hotelData.r_class]}</p>
                <p className='font-bold'>${allRates[hotelData.r_class]}</p>
                <p className='px-4 py-2 bg-primary w-max rounded-md text-white mt-2'>Book Now</p>
            </div>
        </div>
    </div>
  )
}

export default Room