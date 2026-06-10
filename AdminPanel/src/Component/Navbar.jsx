import React from 'react'
// import { assest } from '../assets/Admin/asset.js'
import {Link} from "react-router-dom"



const NavBar = ({setToken}) => {

  const logOutHandle = ()=>{
     localStorage.removeItem('token')
     setToken('')
  
  }

  return (
    <>
    <div className='flex justify-between sm:mx-[70px] mx-[20px] text-center sm:mt-[15px] mt-[10px] items-center'>
        <Link to="/" className="flex items-center gap-1 sm:gap-2 group cursor-pointer flex-shrink-0">
          <div className="relative">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border-2 border-gray-800 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all duration-300">
              <span className="text-gray-800 text-xs sm:text-sm font-bold group-hover:text-gray-900 transition-colors">M</span>
            </div>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 animate-pulse shadow-[0_0_6px_rgba(0,0,0,0.5)]"></div>
          </div>
          
          {/* Logo Text - "wave" goes below on mobile */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center">
            <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                MANGA
              </span>
            </h1>
            <span className="text-gray-400 text-sm sm:text-base drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] xs:ml-1">
              wave
            </span>
          </div>
        </Link>
        <div className='flex sm:gap-10 gap-3'>
        <button onClick={()=>window.open(import.meta.env.VITE_FRONTED_URL,'_blank')} className='sm:text-lg text-sm bg-gray-700 sm:w-[100px] w-[80px] sm:h-[40px] h-[30px] text-white rounded-2xl cursor-pointer'>Main</button>
        <button  onClick={logOutHandle} className='sm:text-lg text-sm bg-gray-700 sm:w-[100px] w-[80px] sm:h-[40px] h-[30px] text-white rounded-2xl cursor-pointer'>Logout</button>
        </div>
        
    </div>
    <hr className='text-gray-500 mt-6' />
    </>

  )
}

export default NavBar