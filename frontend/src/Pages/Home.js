import React, { useEffect, useState } from 'react'
import Room from '../Components/Home/Room'
import axios from 'axios'
import {allRate } from '../Middlewares/global-state';
import { useAtom } from 'jotai';

const Home = () => {
    const [allHotels, setAllHotels] = useState([]);
    const [allRates, setAllRates] = useAtom(allRate);



    useEffect(()=> {
        fetchAPI()
    },[])

    const fetchAPI = async() => {
        await axios.get(`${process.env.REACT_APP_API_URL}/customer/hotel-data`)
        .then((response)=> {
            setAllHotels(response.data.hotelData)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    console.log(allRates)
  return (
    <div className='w-full min-w-full flex justify-center'>
        <div className='max-w-7xl w-full flex justify-between px-4 py-10 text-blackk'>
            <div className='w-full flex flex-col items-center lg:items-start'>

                <div className=''>
                    <h1 className='font-bold text-xl'>All Room for you to book</h1>
                    <p>Just one click to book your rooms</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {allHotels.length>0 &&
                        allHotels.map((hotel) => {
                            return <Room key={hotel.id} hotelData={hotel} allRates={allRates}/>
                        })
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home