import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/fronted/assets.js";
import { MangaCon } from "../Context/MangaContex.jsx";

const NavBar = () => {

  const { setSearchResult, token, setToken, navigate } = useContext(MangaCon);

  const logOut = () => {

  }

  return (

    <div
      className="
        sticky
        top-0
        left-0
        z-50
        w-full
        bg-white/85
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

        {/* Logo */}
        <div className="flex items-center">

          <img
            src=""
            alt="Logo"
            className="
              h-8
              sm:h-10
              object-contain
            "
          />

        </div>

        {/* Navigation Links */}
        <div
          className="
            flex
            items-center
            gap-4
            sm:gap-8
            md:gap-10
          "
        >

          <NavLink
            to="/"
            className={({ isActive }) =>
              `
                relative
                text-sm
                sm:text-base
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
                sm:text-base
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
                sm:text-base
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

        {/* User/Profile Section */}
        <div
          className="
            flex
            items-center
            gap-3
            sm:gap-5
          "
        >

          <Link
            to="/search"
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              rounded-2xl
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
                h-5
                sm:h-6
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
              w-10
              h-10
              sm:w-11
              sm:h-11
              rounded-2xl
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
                h-5
                sm:h-6
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

        </div>

      </nav>

    </div>

  );
};

export default NavBar;


