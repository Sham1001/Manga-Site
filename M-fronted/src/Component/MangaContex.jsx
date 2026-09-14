// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { MangaCon } from "../Context/MangaContex.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { format, differenceInDays, formatDistanceToNow } from "date-fns";

// const MangaContex = ({ name, chapter1,chapter2, coverImg, id, isFavorite, setClicked, createdAt1,createdAt2 }) => {
//   const { backendUrl, token } = useContext(MangaCon);
//   // const [count, setCount] = useState(0)
//   const mangaId = id;

//   const handleFavorite = async (e) => {
//     e.preventDefault();
//     if (!token) return toast.error("Login to add Favourite");
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/user/Favorites",
//         { mangaId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//        await axios.get(backendUrl + `/api/manga/${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })

//       if (response.data.success) {
//         toast(response.data.message);
//         setClicked((prev) => !prev);
//       } else {
//         toast.error(response.data.message);
//       }

      
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getDate = (releaseDate) => {
//     const release = new Date(releaseDate);
//     const inDays = differenceInDays(new Date(), release);
//     return inDays > 7
//       ? format(release, "d MMM yyyy")
//       : formatDistanceToNow(release, { addSuffix: true });
//   };

//   const isNew = differenceInDays(new Date(), new Date(createdAt1)) <= 3;
//   // const isNew = differenceInDays(new Date(), new Date(createdAt2)) <= 3;
//   const isFav = isFavorite?.includes(mangaId);
//   const shortName = name?.length > 22 ? `${name.slice(0, 22)}…` : name;


//   // useEffect(()=>{
//   //   console.log(createdAt1,"THis is createdAt")
//   // },[])

//   return (
//     <Link to={`/manga/${id}`} className="block min-w-0">
//       <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg group min-w-0 w-full">

//         <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>

//           <img
//             src={coverImg || "https://picsum.photos/300/450"}
//             alt=""
//             aria-hidden="true"
//             className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-70"
//           />

//           <img
//             src={coverImg || "https://picsum.photos/300/450"}
//             alt={name}
//             className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
//           />

//           {isNew && (
//             <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
//               New
//             </span>
//           )}

//           <button
//             onClick={handleFavorite}
//             aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
//             className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/85 border border-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white z-10"
//           >
//             <Heart
//               size={15}
//               className={isFav ? "text-red-600 fill-red-500" : "text-gray-500 group-hover:text-red-500"}
//             />
//           </button>
//         </div>

//         <div className="px-3 pt-2.5 pb-3">
//           <div className="relative group/title mb-2">
//             <h3 className="text-sm font-semibold text-gray-900 truncate leading-snug">
//               {shortName}
//             </h3>
//             {name?.length > 22 && (
//               <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-20 opacity-0 group-hover/title:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
//                 {name}
//               </div>
//             )}
//           </div>

//           <div className="h-px bg-gray-100 mb-2" />

//           <div className="flex justify-between items-start gap-2 min-w-0">
//             <div className="min-w-0">
//               <p className="text-xs font-semibold text-gray-900 truncate">Ch. {chapter1}</p>
//               {chapter1 > 1 ? (
//                 <p className="text-xs text-gray-400 truncate">Ch. {chapter2}</p>
//               ) : (
//                 <p className="text-[10px] text-gray-400">First release!</p>
//               )}
//             </div>
//             <div className="text-right flex-shrink-0">
//               <p className="text-xs font-medium text-gray-800">{getDate(createdAt1)}</p>
//               {chapter2 ? (
//                 <p className="text-xs text-gray-400">{getDate(createdAt2)}</p> 
                
//               ) : (
//                 <p className="text-[10px] text-gray-400">Stay tuned</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default MangaContex;





// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { MangaCon } from "../Context/MangaContex.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { format, differenceInDays, formatDistanceToNow } from "date-fns";

// const MangaContex = ({ name, chapter1, chapter2, coverImg, id, isFavorite, setClicked, createdAt1, createdAt2 }) => {
//   const { backendUrl, token } = useContext(MangaCon);
//   const mangaId = id;

//   const handleFavorite = async (e) => {
//     e.preventDefault();
//     if (!token) return toast.error("Login to add Favourite");
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/user/Favorites",
//         { mangaId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       await axios.get(backendUrl + `/api/manga/${mangaId}`, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });

//       if (response.data.success) {
//         toast(response.data.message);
//         setClicked((prev) => !prev);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getDate = (releaseDate) => {
//     if (!releaseDate) return "—";
//     const release = new Date(releaseDate);
//     const inDays = differenceInDays(new Date(), release);
//     return inDays > 7
//       ? format(release, "d MMM yyyy")
//       : formatDistanceToNow(release, { addSuffix: true });
//   };

//   const isNew = createdAt1 && differenceInDays(new Date(), new Date(createdAt1)) <= 3;
//   const isFav = isFavorite?.includes(mangaId);
//   const shortName = name?.length > 22 ? `${name.slice(0, 22)}…` : name;

//   return (
//     <Link to={`/manga/${id}`} className="block min-w-0">
//       <div className="relative bg-[#151420] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)] group min-w-0 w-full">
//         {/* Card glow effect */}
//         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//           <div className="absolute -inset-px bg-gradient-to-br from-pink-500/10 to-violet-600/10 rounded-xl blur-sm"></div>
//         </div>

//         <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>
//           {/* Background blur */}
//           <img
//             src={coverImg || "https://picsum.photos/300/450"}
//             alt=""
//             aria-hidden="true"
//             className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-40"
//           />

//           {/* Main image */}
//           <img
//             src={coverImg || "https://picsum.photos/300/450"}
//             alt={name}
//             className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
//           />

//           {/* New badge */}
//           {isNew && (
//             <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
//               NEW
//             </span>
//           )}

//           {/* Favorite button */}
//           <button
//             onClick={handleFavorite}
//             aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
//             className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#0a0a10]/80 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#0a0a10] hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] z-10"
//           >
//             <Heart
//               size={15}
//               className={isFav ? "text-pink-500 fill-pink-500" : "text-gray-400 group-hover:text-pink-500"}
//             />
//           </button>

//           {/* Chapter overlay on hover */}
//           <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0a0a10] via-[#0a0a10]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <div className="flex justify-between items-end">
//               <div>
//                 <span className="text-xs font-semibold text-white">Ch. {chapter1}</span>
//                 {chapter2 && <span className="text-xs text-gray-400 ml-2">Ch. {chapter2}</span>}
//               </div>
//               <span className="text-[10px] text-gray-400">{getDate(createdAt1)}</span>
//             </div>
//           </div>
//         </div>

//         <div className="px-3 pt-2.5 pb-3 relative z-10">
//           <div className="relative group/title mb-2">
//             <h3 className="text-sm font-semibold text-white truncate leading-snug">
//               {shortName}
//             </h3>
//             {name?.length > 22 && (
//               <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1.5 bg-[#0a0a10] border border-white/10 text-white text-xs rounded-lg whitespace-nowrap z-20 opacity-0 group-hover/title:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl">
//                 {name}
//               </div>
//             )}
//           </div>

//           <div className="h-px bg-white/5 mb-2" />

//           <div className="flex justify-between items-start gap-2 min-w-0">
//             <div className="min-w-0">
//               <p className="text-xs font-semibold text-gray-300 truncate">Ch. {chapter1}</p>
//               {chapter2 ? (
//                 <p className="text-xs text-gray-500 truncate">Ch. {chapter2}</p>
//               ) : (
//                 <p className="text-[10px] text-gray-600">First release!</p>
//               )}
//             </div>
//             <div className="text-right flex-shrink-0">
//               <p className="text-xs font-medium text-gray-400">{getDate(createdAt1)}</p>
//               {createdAt2 ? (
//                 <p className="text-xs text-gray-500">{getDate(createdAt2)}</p> 
//               ) : (
//                 <p className="text-[10px] text-gray-600">Stay tuned</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default MangaContex;

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { MangaCon } from "../Context/MangaContex.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { format, differenceInDays, formatDistanceToNow } from "date-fns";

// const MangaContex = ({ name, chapter1,chapter2, coverImg, id, isFavorite, setClicked, createdAt1,createdAt2 }) => {
//   const { backendUrl, token } = useContext(MangaCon);
//   // const [count, setCount] = useState(0)
//   const mangaId = id;

//   const handleFavorite = async (e) => {
//     e.preventDefault();
//     if (!token) return toast.error("Login to add Favourite");
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/user/Favorites",
//         { mangaId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//        await axios.get(backendUrl + `/api/manga/${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })

//       if (response.data.success) {
//         toast(response.data.message);
//         setClicked((prev) => !prev);
//       } else {
//         toast.error(response.data.message);
//       }

      
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getDate = (releaseDate) => {
//     const release = new Date(releaseDate);
//     const inDays = differenceInDays(new Date(), release);
//     return inDays > 7
//       ? format(release, "d MMM yyyy")
//       : formatDistanceToNow(release, { addSuffix: true });
//   };

//   const isNew = differenceInDays(new Date(), new Date(createdAt1)) <= 3;
//   // const isNew = differenceInDays(new Date(), new Date(createdAt2)) <= 3;
//   const isFav = isFavorite?.includes(mangaId);
//   const shortName = name?.length > 22 ? `${name.slice(0, 22)}…` : name;


//   // useEffect(()=>{
//   //   console.log(createdAt1,"THis is createdAt")
//   // },[])

//   return (
//     <Link to={`/manga/${id}`} className="block min-w-0">
//       <div className="relative bg-neutral-900 border border-neutral-800 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 sm:hover:-translate-y-1 sm:hover:border-rose-500/60 sm:hover:shadow-[0_10px_30px_rgba(225,29,72,0.18)] active:border-rose-500/50 group min-w-0 w-full">

//         <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>

//           <img
//             src={coverImg || "https://picsum.photos/300/450"}
//             alt=""
//             aria-hidden="true"
//             className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-40"
//           />

//           <img
//             src={coverImg || "https://picsum.photos/300/450"}
//             alt={name}
//             className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
//           />

//           {/* subtle bottom fade so the title panel reads as one surface with the art */}
//           <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />

//           {isNew && (
//             <span className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-[0_2px_8px_rgba(225,29,72,0.5)]">
//               New
//             </span>
//           )}

//           <button
//             onClick={handleFavorite}
//             aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
//             className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-neutral-900/80 border border-neutral-700 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 active:bg-neutral-900 z-10 backdrop-blur-sm"
//           >
//             <Heart
//               size={14}
//               className={isFav ? "text-rose-500 fill-rose-500" : "text-neutral-400 sm:group-hover:text-rose-500"}
//             />
//           </button>
//         </div>

//         <div className="px-3 pt-2.5 pb-3">
//           <div className="relative group/title mb-2">
//             <h3 className="text-sm font-semibold text-neutral-100 truncate leading-snug">
//               {shortName}
//             </h3>
//             {name?.length > 22 && (
//               <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1.5 bg-neutral-800 border border-neutral-700 text-neutral-100 text-xs rounded-lg whitespace-nowrap z-20 opacity-0 group-hover/title:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
//                 {name}
//               </div>
//             )}
//           </div>

//           <div className="h-px bg-neutral-800 mb-2" />

//           <div className="flex justify-between items-start gap-2 min-w-0">
//             <div className="min-w-0">
//               <p className="text-xs font-semibold text-neutral-100 truncate">Ch. {chapter1}</p>
//               {chapter1 > 1 ? (
//                 <p className="text-xs text-neutral-500 truncate">Ch. {chapter2}</p>
//               ) : (
//                 <p className="text-[10px] text-neutral-500">First release!</p>
//               )}
//             </div>
//             <div className="text-right flex-shrink-0">
//               <p className="text-xs font-medium text-neutral-300">{getDate(createdAt1)}</p>
//               {chapter2 ? (
//                 <p className="text-xs text-neutral-500">{getDate(createdAt2)}</p>

//               ) : (
//                 <p className="text-[10px] text-neutral-500">Stay tuned</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default MangaContex;



import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { MangaCon } from "../Context/MangaContex.jsx";
import axios from "axios";
import { toast } from "react-toastify";
// import { format, differenceInDays, formatDistanceToNow } from "date-fns";
import { format, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks } from "date-fns";

const MangaContex = ({ name, chapter1,chapter2, coverImg, id, isFavorite, setClicked, createdAt1,createdAt2 }) => {
  const { backendUrl, token } = useContext(MangaCon);
  // const [count, setCount] = useState(0)
  const mangaId = id;

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Login to add Favourite");
    try {
      const response = await axios.post(
        backendUrl + "/api/user/Favorites",
        { mangaId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

       await axios.get(backendUrl + `/api/manga/${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {
        toast(response.data.message);
        setClicked((prev) => !prev);
      } else {
        toast.error(response.data.message);
      }

      
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const getDate = (releaseDate) => {
  //   const release = new Date(releaseDate);
  //   const inDays = differenceInDays(new Date(), release);
  //   return inDays > 7
  //     ? format(release, "d MMM yyyy")
  //     : formatDistanceToNow(release, { addSuffix: true });
  // };

  const pluralize = (value, unit) => `${value} ${unit}${value !== 1 ? "s" : ""} ago`;

  const getDate = (releaseDate) => {
  if (!releaseDate) return "";

  const release = new Date(releaseDate);
  const now = new Date();

  const seconds = differenceInSeconds(now, release);
  const minutes = differenceInMinutes(now, release);
  const hours = differenceInHours(now, release);
  const days = differenceInDays(now, release);
  const weeks = differenceInWeeks(now, release);

  if (seconds < 60) return pluralize(seconds, "sec");
  if (minutes < 60) return pluralize(minutes, "min");
  if (hours < 24) return pluralize(hours, "hour");
  if (days < 7) return pluralize(days, "day");
  if (weeks < 4) return pluralize(weeks, "week");

  return format(release, "d MMM yyyy");
};

  const isNew = differenceInDays(new Date(), new Date(createdAt1)) <= 3;
  // const isNew = differenceInDays(new Date(), new Date(createdAt2)) <= 3;
  const isFav = isFavorite?.includes(mangaId);
  const shortName = name?.length > 22 ? `${name.slice(0, 22)}…` : name;


  // useEffect(()=>{
  //   console.log(createdAt1,"THis is createdAt")
  // },[])

  return (
    <Link to={`/manga/${id}`} className="block min-w-0">
      <div className="relative bg-[#0f0a14] border border-[#241834] rounded-lg sm:rounded-xl overflow-hidden transition-colors duration-200 sm:hover:border-[#7a3fd6] active:border-[#7a3fd6] group min-w-0 w-full">

        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>

          <img
            src={coverImg || "https://picsum.photos/300/450"}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-30"
          />

          <img
            src={coverImg || "https://picsum.photos/300/450"}
            alt={name}
            className="relative w-full h-full object-cover transition-transform duration-300 sm:group-hover:scale-[1.04]"
          />

          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0f0a14] to-transparent pointer-events-none" />

          {isNew && (
            <span className="absolute top-2 left-2 bg-[#8b3fd6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
              New
            </span>
          )}

          <button
            onClick={handleFavorite}
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/70 border border-[#3d2456] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 active:bg-black z-10"
          >
            <Heart
              size={14}
              className={isFav ? "text-[#b98bff] fill-[#b98bff]" : "text-[#8a7a9c] sm:group-hover:text-[#b98bff]"}
            />
          </button>
        </div>

        <div className="px-3 pt-2.5 pb-3">
          <div className="relative group/title mb-2">
            <h3 className="text-sm font-semibold text-white truncate leading-snug">
              {shortName}
            </h3>
            {name?.length > 22 && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1.5 bg-[#1a0f26] border border-[#3d2456] text-white text-xs rounded-lg whitespace-nowrap z-20 opacity-0 group-hover/title:opacity-100 pointer-events-none transition-opacity duration-200">
                {name}
              </div>
            )}
          </div>

          <div className="h-px bg-[#241834] mb-2" />

          <div className="flex justify-between items-start gap-2 min-w-0">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Ch. {chapter1}</p>
              {chapter1 > 1 ? (
                <p className="text-xs text-[#6b5a80] truncate">Ch. {chapter2}</p>
              ) : (
                <p className="text-[10px] text-[#6b5a80]">First release!</p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-medium text-[#b0a0c9]">{getDate(createdAt1)}</p>
              {chapter2 ? (
                <p className="text-xs text-[#6b5a80]">{getDate(createdAt2)}</p>

              ) : (
                <p className="text-[10px] text-[#6b5a80]">Stay tuned</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MangaContex;