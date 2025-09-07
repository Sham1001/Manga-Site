import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="navbar text-gray-300 py-5 mt-25">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-white">
          MyWebsite
        </div>

        {/* Footer Links */}
        <div className="flex gap-8 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-white transition duration-200"
          >
            HOME
          </Link>
          <Link
            to="/blog"
            className="hover:text-white transition duration-200"
          >
            BLOG
          </Link>
          <Link
            to="/about"
            className="hover:text-white transition duration-200"
          >
            ABOUT US
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition duration-200"
          >
            CONTACT
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 text-center text-sm font-semibold text-white">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
