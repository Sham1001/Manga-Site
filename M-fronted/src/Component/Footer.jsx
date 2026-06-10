import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (

    <footer
      className="
        w-full
        
        border-t
        border-gray-100
        bg-gradient-to-b
        from-white
        to-gray-50
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-14
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-10
        "
      >

      
        <div
          className="
            flex
            flex-col
            items-center
            lg:items-start
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-black
            "
          >
            MyWebsite
          </h2>

          <p
            className="
              text-gray-500
              mt-3
              max-w-sm
              leading-relaxed
              text-center
              lg:text-left
              text-sm
              sm:text-base
            "
          >
            Discover trending manga, explore genres, and enjoy a clean modern reading experience.
          </p>

        </div>

      
        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-5
            sm:gap-8
          "
        >

          <Link
            to="/"
            className="
              text-gray-500
              hover:text-black
              transition-all
              duration-300
              font-medium
              relative
              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[1px]
              after:w-0
              after:bg-black
              after:transition-all
              hover:after:w-full
            "
          >
            Home
          </Link>

          <Link
            to="/blog"
            className="
              text-gray-500
              hover:text-black
              transition-all
              duration-300
              font-medium
              relative
              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[1px]
              after:w-0
              after:bg-black
              after:transition-all
              hover:after:w-full
            "
          >
            Blog
          </Link>

          <Link
            to="/about"
            className="
              text-gray-500
              hover:text-black
              transition-all
              duration-300
              font-medium
              relative
              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[1px]
              after:w-0
              after:bg-black
              after:transition-all
              hover:after:w-full
            "
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="
              text-gray-500
              hover:text-black
              transition-all
              duration-300
              font-medium
              relative
              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[1px]
              after:w-0
              after:bg-black
              after:transition-all
              hover:after:w-full
            "
          >
            Contact
          </Link>

        </div>

      </div>

      
      <div
        className="
          border-t
          border-gray-100
          py-5
          px-4
          text-center
        "
      >

        <p
          className="
            text-xs
            sm:text-sm
            text-gray-500
          "
        >
          © {new Date().getFullYear()} MyWebsite. All rights reserved.
        </p>

      </div>

    </footer>

  );
};

export default Footer;