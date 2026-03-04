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
      <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition transform hover:scale-105 duration-300 group">

       
        <div className="relative">
       <img src={coverImg || "https://picsum.photos/400/250?random=1"} alt={name} className="w-full h-48 object-contain" />
        
          <button 
            onClick={handleFavorite}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/70 shadow-md opacity-0 group-hover:opacity-100 transition"
          >
            {/* <Heart
              size={22}
              className={favorite.includes(id?.toString()) ? "text-red-500 fill-red-500" : "text-gray-400"}
            /> */}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 card">
          {/* Title with tooltip */}
         <div className="relative group">
  <p className="text-lg font-semibold text-gray-800 mb-2 truncate max-w-[220px]">
    {name}
  </p>

  {/* Tooltip */}
  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white text-gray-800 text-sm p-2 rounded shadow-lg z-10 w-max max-w-xs break-words">
    {name}
  </div>
</div>


        
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p>Chapter {chapters}</p>
              <p>Chapter {chapters - 1}</p>
            </div>
            <div className="text-right">
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
