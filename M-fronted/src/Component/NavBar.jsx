// import React, { useContext, useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { assets } from "../assets/fronted/assets.js";
// import { MangaCon } from "../Context/MangaContex.jsx";

// const NavBar = () => {
//   const { setSearchResult, token, setToken, navigate } = useContext(MangaCon);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div
//       className="
//         sticky
//         top-0
//         left-0
//         z-50
//         w-full
//         bg-white/95
//         backdrop-blur-xl
//         border-b
//         border-gray-100
//         shadow-[0_4px_30px_rgba(0,0,0,0.03)]
//       "
//     >
//       <nav
//         className="
//           max-w-7xl
//           mx-auto
//           h-16
//           sm:h-20
//           px-4
//           sm:px-6
//           lg:px-8
//           flex
//           items-center
//           justify-between
//         "
//       >
//         {/* Logo - Responsive with stacked "wave" on mobile */}
//         <Link to="/" className="flex items-center gap-1 sm:gap-2 group cursor-pointer flex-shrink-0">
//           <div className="relative">
//             <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border-2 border-gray-800 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all duration-300">
//               <span className="text-gray-800 text-xs sm:text-sm font-bold group-hover:text-gray-900 transition-colors">M</span>
//             </div>
//             <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 animate-pulse shadow-[0_0_6px_rgba(0,0,0,0.5)]"></div>
//           </div>
          
//           {/* Logo Text - "wave" goes below on mobile */}
//           <div className="flex flex-col xs:flex-row items-start xs:items-center">
//             <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-tight">
//               <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]">
//                 MANGA
//               </span>
//             </h1>
//             <span className="text-gray-400 text-sm sm:text-base drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] xs:ml-1">
//               wave
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation Links - Hidden on mobile */}
//         <div
//           className="
//             hidden
//             md:flex
//             items-center
//             gap-6
//             lg:gap-10
//           "
//         >
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-black
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                 ? "text-black after:w-full"
//                 : "text-gray-500 hover:text-black after:w-0 hover:after:w-full"
//               }
//               `
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/top"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-black
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                 ? "text-black after:w-full"
//                 : "text-gray-500 hover:text-black after:w-0 hover:after:w-full"
//               }
//               `
//             }
//           >
//             Top
//           </NavLink>

//           <NavLink
//             to="/latest"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-black
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                 ? "text-black after:w-full"
//                 : "text-gray-500 hover:text-black after:w-0 hover:after:w-full"
//               }
//               `
//             }
//           >
//             Latest
//           </NavLink>
//         </div>

//         {/* User/Profile Section + Mobile Menu Button */}
//         <div className="flex items-center gap-2 sm:gap-5">
//           <Link
//             to="/search"
//             className="
//               w-8 h-8
//               sm:w-10 sm:h-10
//               md:w-11 md:h-11
//               rounded-xl sm:rounded-2xl
//               bg-gray-100
//               hover:bg-black
//               transition-all
//               duration-300
//               flex
//               items-center
//               justify-center
//               group
//               hover:-translate-y-1
//               hover:shadow-xl
//             "
//           >
//             <img
//               className="
//                 h-4 w-4
//                 sm:h-5 sm:w-5
//                 md:h-6 md:w-6
//                 transition-all
//                 duration-300
//                 group-hover:scale-110
//                 group-hover:brightness-0
//                 group-hover:invert
//               "
//               src={assets.search}
//               alt="Search"
//             />
//           </Link>

//           <Link
//             to={token ? "/profile" : "/login"}
//             className="
//               w-8 h-8
//               sm:w-10 sm:h-10
//               md:w-11 md:h-11
//               rounded-xl sm:rounded-2xl
//               bg-gray-100
//               hover:bg-black
//               transition-all
//               duration-300
//               flex
//               items-center
//               justify-center
//               group
//               hover:-translate-y-1
//               hover:shadow-xl
//             "
//           >
//             <img
//               className="
//                 h-4 w-4
//                 sm:h-5 sm:w-5
//                 md:h-6 md:w-6
//                 rounded-full
//                 transition-all
//                 duration-300
//                 group-hover:scale-110
//                 group-hover:brightness-0
//                 group-hover:invert
//               "
//               src={assets.user}
//               alt="User"
//             />
//           </Link>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown */}
//       <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 border-t border-gray-100' : 'max-h-0'}`}>
//         <div className="flex flex-col items-center gap-4 py-4 bg-white/95 backdrop-blur-xl">
//           <NavLink
//             to="/"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/top"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`
//             }
//           >
//             Top
//           </NavLink>
//           <NavLink
//             to="/latest"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`
//             }
//           >
//             Latest
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;



// import React, { useContext, useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { assets } from "../assets/fronted/assets.js";
// import { MangaCon } from "../Context/MangaContex.jsx";

// const NavBar = () => {
//   const { setSearchResult, token, setToken, navigate } = useContext(MangaCon);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div
//       className="
//         sticky
//         top-0
//         left-0
//         z-50
//         w-full
//         bg-[#0a0a10]/40
//         backdrop-blur-xl
//         border-b
//         border-white/5
//         shadow-[0_4px_30px_rgba(0,0,0,0.5)]
//       "
//     >
//       <nav
//         className="
//           max-w-7xl
//           mx-auto
//           h-16
//           sm:h-20
//           px-4
//           sm:px-6
//           lg:px-8
//           flex
//           items-center
//           justify-between
//         "
//       >
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-1 sm:gap-2 group cursor-pointer flex-shrink-0">
//           <div className="relative">
//             <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300">
//               <span className="text-white text-xs sm:text-sm font-bold">M</span>
//             </div>
//             <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
//           </div>
          
//           <div className="flex flex-col xs:flex-row items-start xs:items-center">
//             <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-tight">
//               <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
//                 MANGA
//               </span>
//             </h1>
//             <span className="text-gray-400 text-sm sm:text-base drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] xs:ml-1">
//               wave
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-6 lg:gap-10">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-400 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/top"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-400 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Top
//           </NavLink>

//           <NavLink
//             to="/latest"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-400 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Latest
//           </NavLink>

//           <NavLink
//             to="/recommend"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-400 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Recommended
//           </NavLink>
//         </div>

//         {/* User/Profile Section */}
//         <div className="flex items-center gap-2 sm:gap-5">
//           <Link
//             to="/search"
//             className="
//               w-8 h-8
//               sm:w-10 sm:h-10
//               md:w-11 md:h-11
//               rounded-xl sm:rounded-2xl
//               bg-[#151420]
//               hover:bg-gradient-to-r
//               hover:from-pink-500
//               hover:to-violet-600
//               transition-all
//               duration-300
//               flex
//               items-center
//               justify-center
//               group
//               hover:-translate-y-1
//               hover:shadow-[0_10px_30px_-6px_rgba(236,72,153,0.3)]
//             "
//           >
//             <img
//               className="
//                 h-4 w-4
//                 sm:h-5 sm:w-5
//                 md:h-6 md:w-6
//                 transition-all
//                 duration-300
//                 group-hover:scale-110
//                 group-hover:brightness-0
//                 group-hover:invert
//               "
//               src={assets.search}
//               alt="Search"
//             />
//           </Link>

//           <Link
//             to={token ? "/profile" : "/login"}
//             className="
//               w-8 h-8
//               sm:w-10 sm:h-10
//               md:w-11 md:h-11
//               rounded-xl sm:rounded-2xl
//               bg-[#151420]
//               hover:bg-gradient-to-r
//               hover:from-pink-500
//               hover:to-violet-600
//               transition-all
//               duration-300
//               flex
//               items-center
//               justify-center
//               group
//               hover:-translate-y-1
//               hover:shadow-[0_10px_30px_-6px_rgba(236,72,153,0.3)]
//             "
//           >
//             <img
//               className="
//                 h-4 w-4
//                 sm:h-5 sm:w-5
//                 md:h-6 md:w-6
//                 rounded-full
//                 transition-all
//                 duration-300
//                 group-hover:scale-110
//                 group-hover:brightness-0
//                 group-hover:invert
//               "
//               src={assets.user}
//               alt="User"
//             />
//           </Link>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#151420] transition-colors"
//           >
//             <span className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown */}
//       <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'}`}>
//         <div className="flex flex-col items-center gap-4 py-4 bg-[#0a0a10]/95 backdrop-blur-xl">
//           <NavLink
//             to="/"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/top"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
//             }
//           >
//             Top
//           </NavLink>
//           <NavLink
//             to="/latest"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
//             }
//           >
//             Latest
//           </NavLink>
//           <NavLink
//             to="/recommend"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
//             }
//           >
//             Recommended
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;





// import React, { useContext, useState, useEffect } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { assets } from "../assets/fronted/assets.js";
// import { MangaCon } from "../Context/MangaContex.jsx";

// const NavBar = () => {
//   const { setSearchResult, token, setToken, navigate } = useContext(MangaCon);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // FIX (new feature): dark/light toggle. This flips a class on <html>,
//   // which is the standard hook point for theme switching — but note that
//   // your colors elsewhere (Home.jsx, MangaContex, etc.) are currently
//   // hardcoded hex values like bg-[#0a0a10] rather than theme tokens, so
//   // toggling this class alone won't yet change the rest of the site.
//   // See the note at the bottom of this file for what full wiring needs.
//   const [isDark, setIsDark] = useState(true);

//   useEffect(() => {
//     document.documentElement.classList.toggle("light", !isDark);
//   }, [isDark]);

//   return (
//     <div
//       className="
//         sticky
//         top-0
//         left-0
//         z-50
//         w-full
//         bg-[#0a0a10]/90
//         backdrop-blur-xl
//         border-b
//         border-white/5
//         shadow-[0_4px_30px_rgba(0,0,0,0.5)]
//       "
//     >
//       <nav
//         className="
//           max-w-7xl
//           mx-auto
//           h-16
//           sm:h-20
//           px-4
//           sm:px-6
//           lg:px-8
//           flex
//           items-center
//           justify-between
//         "
//       >
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-1 sm:gap-2 group cursor-pointer flex-shrink-0">
//           <div className="relative">
//             <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300">
//               <span className="text-white text-xs sm:text-sm font-bold">M</span>
//             </div>
//             <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
//           </div>

//           {/* FIX: xs: breakpoint doesn't exist in default Tailwind, so
//              flex-row/ml-1 never applied — "wave" stayed stacked under
//              "MANGA" at every screen size. Using sm: (a real breakpoint)
//              so it reads inline on anything wider than a small phone. */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center">
//             <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-tight">
//               <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
//                 MANGA
//               </span>
//             </h1>
//             <span className="text-gray-400 text-sm sm:text-base drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] sm:ml-1">
//               wave
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-6 lg:gap-10">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/top"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Top
//           </NavLink>

//           <NavLink
//             to="/latest"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Latest
//           </NavLink>

//           <NavLink
//             to="/recommend"
//             className={({ isActive }) =>
//               `
//                 relative
//                 text-sm
//                 lg:text-base
//                 font-semibold
//                 tracking-tight
//                 transition-all
//                 duration-300
//                 after:absolute
//                 after:left-0
//                 after:-bottom-1
//                 after:h-[2px]
//                 after:bg-gradient-to-r
//                 after:from-pink-500
//                 after:to-violet-600
//                 after:transition-all
//                 after:duration-300
//                 ${isActive
//                   ? "text-white after:w-full"
//                   : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
//                 }
//               `
//             }
//           >
//             Recommended
//           </NavLink>
//         </div>

//         {/* User/Profile Section */}
//         <div className="flex items-center gap-2 sm:gap-5">
//           {/* NEW: dark/light toggle */}
//           <button
//             onClick={() => setIsDark((prev) => !prev)}
//             aria-label="Toggle dark and light mode"
//             className="
//               w-8 h-8
//               sm:w-10 sm:h-10
//               md:w-11 md:h-11
//               rounded-xl sm:rounded-2xl
//               bg-[#151420]
//               hover:bg-gradient-to-r
//               hover:from-pink-500
//               hover:to-violet-600
//               transition-all
//               duration-300
//               flex
//               items-center
//               justify-center
//               group
//               hover:-translate-y-1
//               hover:shadow-[0_10px_30px_-6px_rgba(236,72,153,0.3)]
//               text-base
//               sm:text-lg
//             "
//           >
//             <span className="transition-transform duration-300 group-hover:scale-110">
//               {isDark ? "🌙" : "☀️"}
//             </span>
//           </button>

//           <Link
//             to="/search"
//             className="
//               w-8 h-8
//               sm:w-10 sm:h-10
//               md:w-11 md:h-11
//               rounded-xl sm:rounded-2xl
//               bg-[#151420]
//               hover:bg-gradient-to-r
//               hover:from-pink-500
//               hover:to-violet-600
//               transition-all
//               duration-300
//               flex
//               items-center
//               justify-center
//               group
//               hover:-translate-y-1
//               hover:shadow-[0_10px_30px_-6px_rgba(236,72,153,0.3)]
//             "
//           >
//             <img
//               className="
//                 h-4 w-4
//                 sm:h-5 sm:w-5
//                 md:h-6 md:w-6
//                 transition-all
//                 duration-300
//                 group-hover:scale-110
//                 group-hover:brightness-0
//                 group-hover:invert
//               "
//               src={assets.search}
//               alt="Search"
//             />
//           </Link>

//           <Link
//             to={token ? "/profile" : "/login"}
//             className="
//               w-8 h-8
//               sm:w-10 sm:h-10
//               md:w-11 md:h-11
//               rounded-xl sm:rounded-2xl
//               bg-[#151420]
//               hover:bg-gradient-to-r
//               hover:from-pink-500
//               hover:to-violet-600
//               transition-all
//               duration-300
//               flex
//               items-center
//               justify-center
//               group
//               hover:-translate-y-1
//               hover:shadow-[0_10px_30px_-6px_rgba(236,72,153,0.3)]
//             "
//           >
//             <img
//               className="
//                 h-4 w-4
//                 sm:h-5 sm:w-5
//                 md:h-6 md:w-6
//                 rounded-full
//                 transition-all
//                 duration-300
//                 group-hover:scale-110
//                 group-hover:brightness-0
//                 group-hover:invert
//               "
//               src={assets.user}
//               alt="User"
//             />
//           </Link>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#151420] transition-colors"
//           >
//             <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown */}
//       <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'}`}>
//         <div className="flex flex-col items-center gap-4 py-4 bg-[#0a0a10]/95 backdrop-blur-xl">
//           <NavLink
//             to="/"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/top"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`
//             }
//           >
//             Top
//           </NavLink>
//           <NavLink
//             to="/latest"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`
//             }
//           >
//             Latest
//           </NavLink>
//           <NavLink
//             to="/recommend"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={({ isActive }) =>
//               `text-base font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`
//             }
//           >
//             Recommended
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

/*
  NOTE on the dark/light toggle:
  Right now this button toggles a `light` class on <html>, which is the
  correct hook point — but Home.jsx and your other components use hardcoded
  hex colors (bg-[#0a0a10], text-[#f4f3fa], etc.) instead of theme-aware
  values, so nothing outside the navbar will actually change color yet.

  To make it work site-wide, the real fix is converting those hardcoded
  colors into CSS variables (similar to the approach in the theme-settings
  demo from earlier), e.g. in your global CSS:

    :root { --bg: #0a0a10; --text: #f4f3fa; }
    .light { --bg: #f6f4ef; --text: #1c1a16; }

  ...then swapping bg-[#0a0a10] → bg-[var(--bg)] etc. across components.
  That's a real refactor pass, not a one-line fix — happy to help scope
  it out or start converting Home.jsx once you're ready.
*/


import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
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

          <div className="flex flex-col xs:flex-row items-start xs:items-center">
            <h1
              className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-tight text-white"
              style={{ textShadow: '0 0 12px rgba(185,139,255,0.4)' }}
            >
              MANGA
            </h1>
            <span className="text-[#6b5a80] text-sm sm:text-base xs:ml-1">
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
            to="/search"
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