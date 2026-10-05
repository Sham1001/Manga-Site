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
    ${
      isActive
        ? "text-white after:w-full"
        : "text-[#8a7a9c] hover:text-white after:w-0 hover:after:w-full"
    }
  `;

const NavBar = () => {
  const {
    token,
    bgChanger,
    setBgChanger,
    bgOpacity,
    setBgOpacity,
    bgBlur,
    setBgBlur,
  } = useContext(MangaCon);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBgSettings, setShowBgSettings] = useState(false);

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
        <Link
          to="/"
          className="flex items-center gap-1 sm:gap-2 group cursor-pointer flex-shrink-0"
        >
          <div className="relative">
            <div
              className="
                w-7 h-7
                sm:w-8 sm:h-8
                rounded-lg
                bg-[#0f0a14]
                border border-[#7a3fd6]
                flex items-center justify-center
              "
            >
              <span className="text-[#b98bff] text-xs sm:text-sm font-bold group-hover:text-white transition-colors">
                M
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <h1
              className="
                text-base
                sm:text-xl
                md:text-2xl
                font-black
                tracking-tight
                leading-tight
                text-white
              "
              style={{
                textShadow: "0 0 12px rgba(185,139,255,0.4)",
              }}
            >
              MANGA
            </h1>

            <span className="text-[#6b5a80] text-sm sm:text-base sm:ml-1">
              wave
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-5">

          {/* Search */}
          <Link
            to="/search/category/subcategory/author"
            className="
              w-10 h-10
              md:w-11 md:h-11
              rounded-xl sm:rounded-2xl
              bg-[#0f0a14]
              border border-[#3d2456]
              active:bg-[#7a3fd6]
              active:border-[#7a3fd6]
              sm:hover:bg-[#1a0f26]
              sm:hover:border-[#7a3fd6]
              transition-colors
              duration-150
              flex items-center justify-center
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

          {/* Profile */}
          <Link
            to={token ? "/profile" : "/login"}
            className="
              w-10 h-10
              md:w-11 md:h-11
              rounded-xl sm:rounded-2xl
              bg-[#0f0a14]
              border border-[#3d2456]
              active:bg-[#7a3fd6]
              active:border-[#7a3fd6]
              sm:hover:bg-[#1a0f26]
              sm:hover:border-[#7a3fd6]
              transition-colors
              duration-150
              flex items-center justify-center
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

          {/* Background Button + Dropdown */}
          <div className="relative">

            <button
              onClick={() => setShowBgSettings((prev) => !prev)}
              aria-label="Background settings"
              title="Background settings"
              className={`
                w-10 h-10
                md:w-11 md:h-11
                rounded-xl sm:rounded-2xl
                border
                transition-all duration-200
                flex items-center justify-center
                group
                ${
                  bgChanger
                    ? "bg-[#8b3fd6] border-[#8b3fd6]"
                    : "bg-[#0f0a14] border-[#3d2456] hover:bg-[#1a0f26] hover:border-[#7a3fd6]"
                }
              `}
            >
              <ImageIcon
                size={18}
                className={`
                  text-white
                  transition-opacity
                  ${
                    bgChanger
                      ? "opacity-100"
                      : "opacity-70 group-hover:opacity-100"
                  }
                `}
              />
            </button>

            {/* Background Settings Dropdown */}
            {/* Background Settings Dropdown */}
{showBgSettings && (
  <div
    className="
      absolute
      right-0
      top-12
      sm:top-14
      w-[240px]
      sm:w-[280px]
      max-w-[calc(100vw-1rem)]
      p-3
      sm:p-4
      rounded-2xl
      bg-[#0b080f]/98
      border border-[#3d2456]
      shadow-2xl
      z-[100]
    "
  >

    {/* Header */}
    <div className="flex items-center justify-between gap-3 mb-4">

      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">
          Background
        </p>

        <p className="text-[10px] text-[#8a7a9c] mt-0.5">
          Customize your background
        </p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setBgChanger((prev) => !prev)}
        className={`
          relative
          shrink-0
          w-10
          h-5
          rounded-full
          transition-colors
          duration-200
          ${
            bgChanger
              ? "bg-[#7a3fd6]"
              : "bg-[#3d2456]"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1/2
            -translate-y-1/2
            left-0.5
            w-4
            h-4
            rounded-full
            bg-white
            transition-transform
            duration-200
            ${
              bgChanger
                ? "translate-x-5"
                : "translate-x-0"
            }
          `}
        />
      </button>

    </div>

    {/* Opacity */}
    <div className="mb-4">

      <div className="flex items-center justify-between mb-1.5">

        <p className="text-xs font-medium text-white">
          Visibility
        </p>

        <span className="text-xs font-semibold text-[#b98bff]">
          {bgOpacity}%
        </span>

      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={bgOpacity}
        onChange={(e) =>
          setBgOpacity(Number(e.target.value))
        }
        className="
          w-full
          h-1.5
          accent-[#b98bff]
          cursor-pointer
        "
      />

      <div className="flex justify-between mt-1 text-[9px] text-[#6b5a80]">
        <span>Subtle</span>
        <span>Clear</span>
      </div>

    </div>

    {/* Blur */}
    <div className="mb-4">

      <div className="flex items-center justify-between mb-1.5">

        <p className="text-xs font-medium text-white">
          Blur
        </p>

        <span className="text-xs font-semibold text-[#b98bff]">
          {bgBlur}px
        </span>

      </div>

      <input
        type="range"
        min="0"
        max="40"
        value={bgBlur}
        onChange={(e) =>
          setBgBlur(Number(e.target.value))
        }
        className="
          w-full
          h-1.5
          accent-[#b98bff]
          cursor-pointer
        "
      />

      <div className="flex justify-between mt-1 text-[9px] text-[#6b5a80]">
        <span>Sharp</span>
        <span>Blurred</span>
      </div>

    </div>

    {/* Presets */}
    <div>

      <p className="text-[10px] text-[#8a7a9c] mb-2">
        Quick presets
      </p>

      <div className="grid grid-cols-4 gap-1.5">

        {[25, 50, 75, 100].map((value) => (
          <button
            key={value}
            onClick={() => setBgOpacity(value)}
            className={`
              py-1.5
              rounded-lg
              text-[10px]
              font-medium
              border
              transition-all
              ${
                bgOpacity === value
                  ? "bg-[#7a3fd6] border-[#b98bff] text-white"
                  : "bg-[#15101c] border-[#3d2456] text-[#8a7a9c] hover:text-white hover:border-[#7a3fd6]"
              }
            `}
          >
            {value}%
          </button>
        ))}

      </div>

    </div>

    {/* Reset */}
    <button
      onClick={() => {
        setBgOpacity(55);
        setBgBlur(20);
        setBgChanger(true);
      }}
      className="
        w-full
        mt-3
        py-2
        rounded-xl
        bg-[#15101c]
        border border-[#3d2456]
        text-[11px]
        font-medium
        text-[#9b8aaa]
        hover:text-white
        hover:border-[#7a3fd6]
        transition-all
      "
    >
      Reset to default
    </button>

  </div>
)}

          </div>

          {/* Mobile Menu */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="
              md:hidden
              flex flex-col
              gap-1.5
              p-2.5
              -mr-2.5
              rounded-lg
              active:bg-[#0f0a14]
              transition-colors
            "
          >
            <span
              className={`
                w-6 h-0.5
                bg-neutral-200
                transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-2 bg-[#b98bff]"
                    : ""
                }
              `}
            />

            <span
              className={`
                w-6 h-0.5
                bg-neutral-200
                transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "opacity-0"
                    : ""
                }
              `}
            />

            <span
              className={`
                w-6 h-0.5
                bg-neutral-200
                transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-2 bg-[#b98bff]"
                    : ""
                }
              `}
            />
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "max-h-64 border-t border-[#3d2456]"
              : "max-h-0"
          }
        `}
      >
        <div className="flex flex-col items-center gap-2 py-4 bg-black">

          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `
                w-full
                text-center
                py-2.5
                text-base
                font-semibold
                transition-colors
                ${
                  isActive
                    ? "text-white"
                    : "text-[#8a7a9c] active:text-white"
                }
              `
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/top"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `
                w-full
                text-center
                py-2.5
                text-base
                font-semibold
                transition-colors
                ${
                  isActive
                    ? "text-white"
                    : "text-[#8a7a9c] active:text-white"
                }
              `
            }
          >
            Top
          </NavLink>

          <NavLink
            to="/latest"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `
                w-full
                text-center
                py-2.5
                text-base
                font-semibold
                transition-colors
                ${
                  isActive
                    ? "text-white"
                    : "text-[#8a7a9c] active:text-white"
                }
              `
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