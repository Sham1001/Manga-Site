import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react"; 
import { MangaCon } from "../Context/MangaContex.jsx"
import axios from "axios";
import { toast } from "react-toastify";
// import { favorites } from "../assets/fronted/assets.js";

const MangaContex = ({ name, chapters, coverImg, id, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { backendUrl, token } = useContext(MangaCon)

  const mangaId = id

 

  const handleFavorite = async (e) => {
      e.preventDefault();
      const response = await axios.post(backendUrl+"/api/user/Favorites",{mangaId},{headers:{ Authorization: `Bearer ${token}` }})
  try {
    // // get existing favorites from localStorage
    // let favs = JSON.parse(localStorage.getItem("favs")) || [];

    // if (!favs.includes(mangaId)) {
    //   // Add to favorites
    //   const response = await axios.post(
    //     backendUrl + "/api/user/Favorites",
    //     { mangaId },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );

    //   if (response.data.success) {
    //     favs.push(mangaId);
    //     localStorage.setItem("favs", JSON.stringify(favs)); // ✅ store updated list
    //     setIsFavorite(true);
    //     toast.success("Added successfully");
    //   } else {
    //     toast.error(response.data.message);
    //   }

    // } else {
    //   // Remove from favorites
    //   const response = await axios.delete(backendUrl + "/api/user/Favorites", {
    //     headers: { Authorization: `Bearer ${token}` },
    //     data: { mangaId },
    //   });

    //   if (response.data.success) {
    //     favs = favs.filter((id) => id !== mangaId);
    //     localStorage.setItem("favs", JSON.stringify(favs)); // ✅ update list
    //     setIsFavorite(false);
    //     toast.success("Removed successfully");
    //   } else {
    //     toast.error(response.data.message);
    //   }
    // }

    if(response.data.success){
      // if(response.data.message==="Manga Added successfully"){
      //   toast.success("Added to favorete")
      //   console.log(response)
      // }
      // else if(response.data.message==="Manga removed successfully"){
      //   toast.success("Removed From favorete")
      //   console.log(response)
      // }
      console.log(response.data.fav)
    }
    else{
      toast.error(response.data.message)
      console.log("Idher issue hai")
    }


  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// useEffect(() => {
//   const favs = JSON.parse(localStorage.getItem("favs")) || [];
//   setIsFavorite(favs.includes(mangaId)); // ✅ check if TIS manga is favorited
// }, [mangaId]);

//   useEffect(() => {
//     console.log(token)
//   }, [token])

 return (
  <Link to={`/manga/${id}`}>
    <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1 group">

      {/* Image Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-gray-100">
        <img
          src={coverImg || "https://picsum.photos/400/250?random=1"}
          alt={name}
          className="w-full h-56 object-contain p-6 transition duration-500 group-hover:scale-105"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white border border-gray-300 shadow-md transition-all duration-300 hover:bg-black hover:border-black"
        >
          <Heart
            size={18}
            className={`transition ${
              isFavorite
                ? "text-white fill-white"
                : "text-gray-600 group-hover:text-white"
            }`}
          />
        </button>
      </div>

      {/* Content */}
     {/* Content */}
<div className="p-5 space-y-4">

  {/* Title */}
  {/* Title */}
<div className="relative group">
  <h3 className="text-xl font-bold text-black tracking-tight truncate cursor-default">
    {name}
  </h3>

  {/* Tooltip */}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  bg-black text-white text-xs
                  px-3 py-2 rounded-lg shadow-xl
                  whitespace-nowrap z-20
                  pointer-events-none">
    {name}
  </div>
</div>

  {/* Thin Divider */}
  <div className="h-[1px] bg-gray-300"></div>

  {/* Chapters */}
  <div className="flex justify-between">
    <div>
      <p className="text-gray-900 font-semibold text-sm">
        Chapter {chapters}
      </p>
      <p className="text-gray-500 text-sm">
        Chapter {chapters - 1}
      </p>
    </div>

    <div className="text-right text-gray-400 text-xs">
      <p>26/08/2025</p>
      <p>19/08/2025</p>
    </div>
  </div>

</div>
    </div>
  </Link>
);
};

export default MangaContex;
