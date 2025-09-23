import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-md shadow-inner mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-white">
          MyWebsite
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-6 md:gap-8 text-lg font-semibold">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-blue-400 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-900 mt-6 text-center text-sm font-semibold text-white py-4">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
