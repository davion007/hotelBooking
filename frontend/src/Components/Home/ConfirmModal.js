import React, { useEffect, useState } from 'react'
import { activeModal, user } from '../../Middlewares/global-state';
import { useAtom } from 'jotai';

const ConfirmModal = () => {
    const [currentUser, setCurrentUser] = useAtom(user)
    const [currentModal, setCurrentModal] = useAtom(activeModal)

  return (
    <div className='w-full min-w-full flex justify-center relative'>
      <p className='text-red-700 text-2xl absolute right-10 cursor-pointer' onClick={()=>setCurrentModal("")}>X</p>
        <div className='max-w-7xl w-full my-10 flex justify-center items-center text-blackk mt-10'>
            <h1 className='text-2xl font-bold text-green-800'>Your Booking has been confirmed. Details has been sent to your Email:</h1>
        </div>
    </div>
  )
}

export default ConfirmModal