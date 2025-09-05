import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="mt-6">
      <nav className="flex justify-around items-center">
        {/* Logo */}
        <div>
          <img src="" alt="Logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex gap-30">
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          <div>
            <NavLink to="/top">Top</NavLink>
          </div>
          <div>
            <NavLink to="/latest">Latest</NavLink>
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
