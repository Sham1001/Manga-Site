import React from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/fronted/assets.js";
import { useContext } from "react";
import { MangaCon } from "../Context/MangaContex.jsx";


const NavBar = () => {

  const {setSearchResult} = useContext(MangaCon)


  return (
    <div className="w-full h-20  navbar">
      <nav className="flex justify-around text-center pt-5 items-center">
        {/* Logo */}
        <div>
          <img src='' alt="Logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex gap-30">
          <div>
            <NavLink to="/" className='text-lg font-semibold'>Home</NavLink>
          </div>
          <div>
            <NavLink to="/top" className='text-lg font-semibold'>Top</NavLink>
          </div>
          <div>
            <NavLink to="/latest" className='text-lg font-semibold'>Latest</NavLink>
          </div>
        </div>

        {/* User/Profile Section */}
        <div className="flex gap-8">
          <Link to="/search" className="flex items-center gap-2">
            <img onClick={()=>setSearchResult(prev=>!prev)} className=" h-7" src={assets.search} alt="" />
            </Link>
            <Link to='/profile'>
            <img className=" h-7" src={assets.user} alt="User" />
            </Link>
          
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
