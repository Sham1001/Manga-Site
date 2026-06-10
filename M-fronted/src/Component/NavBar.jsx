import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/fronted/assets.js";
import { MangaCon } from "../Context/MangaContex.jsx";

const NavBar = () => {
  const { setSearchResult, token, setToken, navigate } = useContext(MangaCon);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="
        sticky
        top-0
        left-0
        z-50
        w-full
        bg-white/95
        backdrop-blur-xl
        border-b
        border-gray-100
        shadow-[0_4px_30px_rgba(0,0,0,0.03)]
      "
    >
      <nav
        className="
          max-w-7xl
          mx-auto
          h-16
          sm:h-20
          px-4
          sm:px-6
          lg:px-8
          flex
          items-center
          justify-between
        "
      >
        {/* Logo - Responsive with stacked "wave" on mobile */}
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

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-6
            lg:gap-10
          "
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `
                relative
                text-sm
                lg:text-base
                font-semibold
                tracking-tight
                transition-all
                duration-300
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:bg-black
                after:transition-all
                after:duration-300
                ${isActive
                ? "text-black after:w-full"
                : "text-gray-500 hover:text-black after:w-0 hover:after:w-full"
              }
              `
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/top"
            className={({ isActive }) =>
              `
                relative
                text-sm
                lg:text-base
                font-semibold
                tracking-tight
                transition-all
                duration-300
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:bg-black
                after:transition-all
                after:duration-300
                ${isActive
                ? "text-black after:w-full"
                : "text-gray-500 hover:text-black after:w-0 hover:after:w-full"
              }
              `
            }
          >
            Top
          </NavLink>

          <NavLink
            to="/latest"
            className={({ isActive }) =>
              `
                relative
                text-sm
                lg:text-base
                font-semibold
                tracking-tight
                transition-all
                duration-300
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:bg-black
                after:transition-all
                after:duration-300
                ${isActive
                ? "text-black after:w-full"
                : "text-gray-500 hover:text-black after:w-0 hover:after:w-full"
              }
              `
            }
          >
            Latest
          </NavLink>
        </div>

        {/* User/Profile Section + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            to="/search"
            className="
              w-8 h-8
              sm:w-10 sm:h-10
              md:w-11 md:h-11
              rounded-xl sm:rounded-2xl
              bg-gray-100
              hover:bg-black
              transition-all
              duration-300
              flex
              items-center
              justify-center
              group
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <img
              className="
                h-4 w-4
                sm:h-5 sm:w-5
                md:h-6 md:w-6
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:brightness-0
                group-hover:invert
              "
              src={assets.search}
              alt="Search"
            />
          </Link>

          <Link
            to={token ? "/profile" : "/login"}
            className="
              w-8 h-8
              sm:w-10 sm:h-10
              md:w-11 md:h-11
              rounded-xl sm:rounded-2xl
              bg-gray-100
              hover:bg-black
              transition-all
              duration-300
              flex
              items-center
              justify-center
              group
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <img
              className="
                h-4 w-4
                sm:h-5 sm:w-5
                md:h-6 md:w-6
                rounded-full
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:brightness-0
                group-hover:invert
              "
              src={assets.user}
              alt="User"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 border-t border-gray-100' : 'max-h-0'}`}>
        <div className="flex flex-col items-center gap-4 py-4 bg-white/95 backdrop-blur-xl">
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-base font-semibold transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/top"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-base font-semibold transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`
            }
          >
            Top
          </NavLink>
          <NavLink
            to="/latest"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-base font-semibold transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`
            }
          >
            Latest
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;