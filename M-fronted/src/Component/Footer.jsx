import React from "react";
import { Link } from "react-router-dom";

const footerLinkClass = `
  text-[#8a7a9c]
  active:text-white
  sm:hover:text-white
  transition-colors
  duration-150
  font-medium
  relative
  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[1px]
  after:w-0
  after:bg-[#b98bff]
  after:transition-all
  sm:hover:after:w-full
`

const Footer = () => {

  return (

    <footer
      className="
        w-full
        border-t
        border-[#3d2456]
        bg-black
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
            className="text-3xl font-black tracking-tight text-white"
            style={{ textShadow: '0 0 12px rgba(185,139,255,0.35)' }}
          >
            MANGA<span className="text-[#6b5a80]">wave</span>
          </h2>

          <p
            className="
              text-[#6b5a80]
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

          <Link to="/" className={footerLinkClass}>
            Home
          </Link>

          <Link to="/blog" className={footerLinkClass}>
            Blog
          </Link>

          <Link to="/about" className={footerLinkClass}>
            About Us
          </Link>

          <Link to="/contact" className={footerLinkClass}>
            Contact
          </Link>

        </div>

      </div>

      <div
        className="
          border-t
          border-[#3d2456]
          py-5
          px-4
          text-center
        "
      >

        <p
          className="
            text-xs
            sm:text-sm
            text-[#6b5a80]
          "
        >
          © {new Date().getFullYear()} MangaWave. All rights reserved.
        </p>

      </div>

    </footer>

  );
};

export default Footer;