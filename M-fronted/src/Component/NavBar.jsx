import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-full h-20  navbar">
      <nav className="flex justify-around text-center pt-5 items-center">
        {/* Logo */}
        <div>
          <img src="" alt="Logo" />
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
        <div>
          <Link to="/profile" className="flex items-center gap-2">
            <h1>s</h1>
            <img src="" alt="User" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
