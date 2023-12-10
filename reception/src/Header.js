import React from 'react'


const Header = () => {

  return (
    <div className='w-full min-w-full flex justify-center shadow-xl'>
        <div className='max-w-7xl w-full flex justify-between px-4 py-10 text-blackk'>
            <div className='header-image max-w-[50%]'>
                <img src='/logo.png'/>
            </div>
            <div className='flex space-x-6 font-bold items-center'>

                     <p className='cursor-pointer hover:text-primary' >Receptionist Panel</p>

            </div>

        </div>
    </div>
  )
}

export default Header