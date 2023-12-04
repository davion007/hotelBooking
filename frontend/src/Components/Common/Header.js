import React from 'react'
import './common.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

  return (
    <div className='w-full min-w-full flex justify-center shadow-xl'>
        <div className='max-w-7xl w-full flex justify-between px-4 py-10 text-blackk'>
            <div className='header-image max-w-[50%]'>
                <img src='/logo.png'/>
            </div>
            <div className='flex space-x-6 font-bold items-center'>
                <p className='cursor-pointer hover:text-primary' onClick={(e) => navigate("/")}>Home</p>
                <p className='cursor-pointer hover:text-primary' onClick={(e) => navigate("/booking")}>Booking</p>
            </div>
            <div className='flex space-x-4 font-bold'>
                <p className='px-8 py-2 border-2 rounded-lg border-primary hover:bg-primary/30 cursor-pointer' onClick={()=> navigate("/signup")}>Register</p>
                <p className='px-8 py-2 border-2 rounded-lg border-primary bg-primary text-white hover:bg-opacity-30 cursor-pointer' onClick={()=> navigate("/login")}>Sign in</p>
            </div>
        </div>
    </div>
  )
}

export default Header