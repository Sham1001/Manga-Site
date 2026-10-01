import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import { assets } from "../assets/fronted/assets.js";
import { MangaCon } from "../Context/MangaContex.jsx";

const navLinkClass = ({ isActive }) =>
  `
    relative
    text-sm
    lg:text-base
    font-semibold
    tracking-tight
    transition-colors
    duration-150
    after:absolute
    after:left-0
    after:-bottom-1
    after:h-[2px]
    after:rounded-full
    after:bg-[#b98bff]
    after:transition-all
    after:duration-300
    ${isActive
    ? "text-white after:w-full"
    : "text-[#8a7a9c] hover:text-white after:w-0 hover:after:w-full"
  }
  `

const NavBar = () => {
  const { setSearchResult, token, setToken, navigate, bgChanger, setBgChanger } = useContext(MangaCon);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="
        sticky
        top-0
        left-0
        z-50
        w-full
        bg-black
        border-b
        border-[#3d2456]
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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2 group cursor-pointer flex-shrink-0">
          <div className="relative">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0f0a14] border border-[#7a3fd6] flex items-center justify-center">
              <span className="text-[#b98bff] text-xs sm:text-sm font-bold group-hover:text-white transition-colors">M</span>
            </div>
          </div>

          {/*
            FIX: "xs:" isn't a real Tailwind breakpoint by default (the
            smallest is "sm:" at 640px), so xs:flex-row / xs:ml-1 never
            applied — "wave" stayed stacked under "MANGA" at every screen
            size, mobile included. Swapped to sm: so it reads inline once
            there's room, and stacks only on the narrowest phones.
          */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <h1
              className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-tight text-white"
              style={{ textShadow: '0 0 12px rgba(185,139,255,0.4)' }}
            >
              MANGA
            </h1>
            <span className="text-[#6b5a80] text-sm sm:text-base sm:ml-1">
              wave
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/top" className={navLinkClass}>
            Top
          </NavLink>

          <NavLink to="/latest" className={navLinkClass}>
            Latest
          </NavLink>
        </div>

        {/* User/Profile Section + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            to="/search/category/subcategory/author"
            className="
              w-10 h-10
              sm:w-10 sm:h-10
              md:w-11 md:h-11
              rounded-xl sm:rounded-2xl
              bg-[#0f0a14]
              border
              border-[#3d2456]
              active:bg-[#7a3fd6]
              active:border-[#7a3fd6]
              sm:hover:bg-[#1a0f26]
              sm:hover:border-[#7a3fd6]
              transition-colors
              duration-150
              flex
              items-center
              justify-center
              group
            "
          >
            <img
              className="
                h-4 w-4
                sm:h-5 sm:w-5
                md:h-6 md:w-6
                brightness-0
                invert
                opacity-70
                group-active:opacity-100
                sm:group-hover:opacity-100
              "
              src={assets.search}
              alt="Search"
            />
          </Link>

          <Link
            to={token ? "/profile" : "/login"}
            className="
              w-10 h-10
              sm:w-10 sm:h-10
              md:w-11 md:h-11
              rounded-xl sm:rounded-2xl
              bg-[#0f0a14]
              border
              border-[#3d2456]
              active:bg-[#7a3fd6]
              active:border-[#7a3fd6]
              sm:hover:bg-[#1a0f26]
              sm:hover:border-[#7a3fd6]
              transition-colors
              duration-150
              flex
              items-center
              justify-center
              group
            "
          >
            <img
              className="
                h-4 w-4
                sm:h-5 sm:w-5
                md:h-6 md:w-6
                rounded-full
                brightness-0
                invert
                opacity-70
                group-active:opacity-100
                sm:group-hover:opacity-100
              "
              src={assets.user}
              alt="User"
            />
          </Link>

          {/*
            Styling only — same onClick/setBgChanger as before, just given
            the same icon-button treatment as Search/Profile above instead
            of bare unstyled text, so it doesn't stick out as an
            unfinished-looking control.
          */}
          <button
            onClick={() => setBgChanger((prev) => !prev)}
            aria-label="Toggle background art"
            title="Toggle background art"
            className={`
  w-10 h-10 sm:w-10 sm:h-10 md:w-11 md:h-11
  rounded-xl sm:rounded-2xl
  border
  transition-colors duration-150
  flex items-center justify-center group
  ${bgChanger
                ? "bg-[#8b3fd6] border-[#8b3fd6]"
                : "bg-[#0f0a14] border-[#3d2456] active:bg-[#7a3fd6] active:border-[#7a3fd6] sm:hover:bg-[#1a0f26] sm:hover:border-[#7a3fd6]"
              }
`}
          >
            <ImageIcon
              size={18}
              className={`text-white transition-opacity ${bgChanger ? "opacity-100" : "opacity-70 group-active:opacity-100 sm:group-hover:opacity-100"}`}
            />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2.5 -mr-2.5 rounded-lg active:bg-[#0f0a14] transition-colors"
          >
            <span className={`w-6 h-0.5 bg-neutral-200 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#b98bff]' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-neutral-200 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-neutral-200 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#b98bff]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 border-t border-[#3d2456]' : 'max-h-0'}`}>
        <div className="flex flex-col items-center gap-2 py-4 bg-black">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `w-full text-center py-2.5 text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-[#8a7a9c] active:text-white'}`}>
            Home
          </NavLink>
          <NavLink to="/top" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `w-full text-center py-2.5 text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-[#8a7a9c] active:text-white'}`}>
            Top
          </NavLink>
          <NavLink to="/latest" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `w-full text-center py-2.5 text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-[#8a7a9c] active:text-white'}`}>
            Latest
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;