// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {

//   return (

//     <footer
//       className="
//         w-full
        
//         border-t
//         border-gray-100
//         bg-gradient-to-b
//         from-white
//         to-gray-50
//       "
//     >

//       <div
//         className="
//           max-w-7xl
//           mx-auto
//           px-4
//           sm:px-6
//           lg:px-8
//           py-14
//           flex
//           flex-col
//           lg:flex-row
//           items-center
//           justify-between
//           gap-10
//         "
//       >

      
//         <div
//           className="
//             flex
//             flex-col
//             items-center
//             lg:items-start
//           "
//         >

//           <h2
//             className="
//               text-3xl
//               font-bold
//               tracking-tight
//               text-black
//             "
//           >
//             MyWebsite
//           </h2>

//           <p
//             className="
//               text-gray-500
//               mt-3
//               max-w-sm
//               leading-relaxed
//               text-center
//               lg:text-left
//               text-sm
//               sm:text-base
//             "
//           >
//             Discover trending manga, explore genres, and enjoy a clean modern reading experience.
//           </p>

//         </div>

      
//         <div
//           className="
//             flex
//             flex-wrap
//             justify-center
//             gap-5
//             sm:gap-8
//           "
//         >

//           <Link
//             to="/"
//             className="
//               text-gray-500
//               hover:text-black
//               transition-all
//               duration-300
//               font-medium
//               relative
//               after:absolute
//               after:left-0
//               after:-bottom-1
//               after:h-[1px]
//               after:w-0
//               after:bg-black
//               after:transition-all
//               hover:after:w-full
//             "
//           >
//             Home
//           </Link>

//           <Link
//             to="/blog"
//             className="
//               text-gray-500
//               hover:text-black
//               transition-all
//               duration-300
//               font-medium
//               relative
//               after:absolute
//               after:left-0
//               after:-bottom-1
//               after:h-[1px]
//               after:w-0
//               after:bg-black
//               after:transition-all
//               hover:after:w-full
//             "
//           >
//             Blog
//           </Link>

//           <Link
//             to="/about"
//             className="
//               text-gray-500
//               hover:text-black
//               transition-all
//               duration-300
//               font-medium
//               relative
//               after:absolute
//               after:left-0
//               after:-bottom-1
//               after:h-[1px]
//               after:w-0
//               after:bg-black
//               after:transition-all
//               hover:after:w-full
//             "
//           >
//             About Us
//           </Link>

//           <Link
//             to="/contact"
//             className="
//               text-gray-500
//               hover:text-black
//               transition-all
//               duration-300
//               font-medium
//               relative
//               after:absolute
//               after:left-0
//               after:-bottom-1
//               after:h-[1px]
//               after:w-0
//               after:bg-black
//               after:transition-all
//               hover:after:w-full
//             "
//           >
//             Contact
//           </Link>

//         </div>

//       </div>

      
//       <div
//         className="
//           border-t
//           border-gray-100
//           py-5
//           px-4
//           text-center
//         "
//       >

//         <p
//           className="
//             text-xs
//             sm:text-sm
//             text-gray-500
//           "
//         >
//           © {new Date().getFullYear()} MyWebsite. All rights reserved.
//         </p>

//       </div>

//     </footer>

//   );
// };

// export default Footer;





// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer
//       className="
//         w-full
//         border-t
//         border-white/5
//         bg-[#0a0a10]
        
//       "
//     >
//       {/* Glow blobs for atmosphere */}
//       <div className="relative overflow-hidden">
//         <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-20 blur-[100px]" />
//         <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-600 opacity-20 blur-[100px]" />
        
//         <div
//           className="
//             relative
//             max-w-7xl
//             mx-auto
//             px-4
//             sm:px-6
//             lg:px-8
//             py-14
//             flex
//             flex-col
//             lg:flex-row
//             items-center
//             justify-between
//             gap-10
//           "
//         >
//           {/* Brand Section */}
//           <div className="flex flex-col items-center lg:items-start">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
//                 <span className="text-white text-sm font-bold">M</span>
//               </div>
//               <h2 className="text-2xl font-bold tracking-tight">
//                 <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
//                   MANGA
//                 </span>
//                 <span className="text-gray-400 ml-1">wave</span>
//               </h2>
//             </div>

//             <p
//               className="
//                 text-gray-400
//                 mt-3
//                 max-w-sm
//                 leading-relaxed
//                 text-center
//                 lg:text-left
//                 text-sm
//                 sm:text-base
//               "
//             >
//               Discover trending manga, explore genres, and enjoy a clean modern reading experience.
//             </p>

//             {/* Social Links */}
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="w-9 h-9 rounded-full bg-[#151420] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500/50 transition-all duration-300">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/></svg>
//               </a>
//               <a href="#" className="w-9 h-9 rounded-full bg-[#151420] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500/50 transition-all duration-300">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
//               </a>
//               <a href="#" className="w-9 h-9 rounded-full bg-[#151420] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500/50 transition-all duration-300">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
//               </a>
//             </div>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
//             <Link
//               to="/"
//               className="
//                 text-gray-400
//                 hover:text-white
//                 transition-all
//                 duration-300
//                 font-medium
//                 relative
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:w-0
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 hover:after:w-full
//               "
//             >
//               Home
//             </Link>

//             <Link
//               to="/top"
//               className="
//                 text-gray-400
//                 hover:text-white
//                 transition-all
//                 duration-300
//                 font-medium
//                 relative
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:w-0
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 hover:after:w-full
//               "
//             >
//               Top Manga
//             </Link>

//             <Link
//               to="/latest"
//               className="
//                 text-gray-400
//                 hover:text-white
//                 transition-all
//                 duration-300
//                 font-medium
//                 relative
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:w-0
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 hover:after:w-full
//               "
//             >
//               Latest
//             </Link>

//             <Link
//               to="/recommend"
//               className="
//                 text-gray-400
//                 hover:text-white
//                 transition-all
//                 duration-300
//                 font-medium
//                 relative
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:w-0
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 hover:after:w-full
//               "
//             >
//               Recommended
//             </Link>

//             <Link
//               to="/about"
//               className="
//                 text-gray-400
//                 hover:text-white
//                 transition-all
//                 duration-300
//                 font-medium
//                 relative
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:w-0
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 hover:after:w-full
//               "
//             >
//               About
//             </Link>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-white/5 py-5 px-4 text-center relative">
//           <p className="text-xs sm:text-sm text-gray-500">
//             © {new Date().getFullYear()} MANGAwave. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


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