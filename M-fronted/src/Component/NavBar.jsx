import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/fronted/assets.js";
import { MangaCon } from "../Context/MangaContex.jsx";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate()
  const { setSearchResult } = useContext(MangaCon);

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-md">
      <nav className="flex justify-between items-center h-20 px-6 md:px-16">
        {/* Logo */}
        <div>
          <img src="" alt="Logo" className="h-10 md:h-12" />
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 md:gap-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-semibold hover:text-blue-400 transition-colors ${isActive ? "text-blue-400" : "text-white"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/top"
            className={({ isActive }) =>
              `text-lg font-semibold hover:text-blue-400 transition-colors ${isActive ? "text-blue-400" : "text-white"}`
            }
          >
            Top
          </NavLink>
          <NavLink
            to="/latest"
            className={({ isActive }) =>
              `text-lg font-semibold hover:text-blue-400 transition-colors ${isActive ? "text-blue-400" : "text-white"}`
            }
          >
            Latest
          </NavLink>
        </div>

        {/* User/Profile Section */}
        <div className="flex gap-6 md:gap-8 items-center">
          <Link to="/search" className="flex items-center gap-2">
            <img
              onClick={() => setSearchResult((prev) => !prev)}
              className="h-7 md:h-8 hover:scale-110 transition-transform"
              src={assets.search}
              alt="Search"
            />
          </Link>
          <Link to="/login">
            <img
              // onClick={()=>navigate("/login")}
              className="h-7 md:h-8 hover:scale-110 transition-transform rounded-full"
              src={assets.user}
              alt="User"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
