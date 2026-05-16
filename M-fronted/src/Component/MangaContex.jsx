import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, Slice } from "lucide-react";
import { MangaCon } from "../Context/MangaContex.jsx"
import axios from "axios";
import { toast } from "react-toastify";
// import { favorites } from "../assets/fronted/assets.js";

const MangaContex = ({ name, chapters, coverImg, id, isFavorite, setClicked }) => {
  // const [isFavorite, setIsFavorite] = useState([]);
  const { backendUrl, token } = useContext(MangaCon)
  const [count, setCount] = useState(0)
  // const {fav, setFav} = useState(false)



  const mangaId = id


  // const checkToken = ()=>{
  //   if(!token){
  //     toast.error("Login to add Favorete")
  //   }
  //   else{
  //     setClicked(prev=>!prev)
  //   }
  // }


  // const userFav = async ()=>{
  //   try{
  //       const response = await axios.post(backendUrl+"/api/user/userFav",{headers:{ Authorization: `Bearer ${token}` }})

  //   if(response.data.success){
  //     // if(response.data.message==="Manga Added successfully"){
  //     //   toast.success("Added to favorete")
  //     //   console.log(response)
  //     // }
  //     // else if(response.data.message==="Manga removed successfully"){
  //     //   toast.success("Removed From favorete")
  //     //   console.log(response)
  //     // }
  //     toast.success(response.data.message)
  //     setIsFavorite(response.data.fav)
  //     console.log(response.data.fav)
  //   }
  //   else{
  //     toast.error(response.data.message)
  //     console.log("Idher issue hai")
  //   }


  // } 

  //   catch(error){

  //     console.log(error)
  //   }
  // }


  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!token) {
      return toast.error("Login to add Favorete")
    }

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
      const response = await axios.post(backendUrl + "/api/user/Favorites", { mangaId }, { headers: { Authorization: `Bearer ${token}` } })

      const response2 = await axios.get(backendUrl + `/api/manga/${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {
        // if(response.data.message==="Manga Added successfully"){
        //   toast.success("Added to favorete")
        //   console.log(response)
        // }
        // else if(response.data.message==="Manga removed successfully"){
        //   toast.success("Removed From favorete")
        //   console.log(response)
        // }
        toast(response.data.message)
        // setIsFavorite(response.data.fav)
        // console.log(response.data.fav)

        setClicked((prev) => !prev)

      }
      else {
        toast.error(response.data.message)
        console.log("Idher issue hai")
      }


      if (response2.data.success) {
        setCount(response2?.data?.count)
        // setCountManga(response2.data.manga)
        // toast(response2.data.count)

      }
      else {
        toast.error(response2.data.message)
      }


    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // useEffect(()=>{
  //  userFav()
  // },[isFavorite])

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
        <div className=" bg-gradient-to-b from-gray-50 to-gray-100 group relative">
          <img
  src={coverImg || "https://picsum.photos/400/250?random=1"}
  alt={name}
  className="w-full h-56 object-contain transition duration-500 group-hover:scale-105"
/>

          {/* Favorite Button */}
          {/* <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white border border-gray-300 shadow-md transition-all duration-300 hover:bg-black hover:border-black"
        >
          <Heart
            size={18}
            // onClick={checkToken}
            className={`transition ${
              isFavorite?.includes(mangaId)
                ? "text-red-800 fill-red-700"
                : "text-gray-600 group-hover:text-red-600"
            }`}
          />
        </button> */}
          <button
            onClick={handleFavorite}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 border border-gray-300 shadow-md transition-all duration-300 hover:bg-black hover:border-black opacity-0 group-hover:opacity-100"
          >
            <Heart
              size={18}
              className={`transition-all duration-300 ${isFavorite?.includes(mangaId)
                  ? "text-red-800 fill-red-700 opacity-100"
                  : "text-gray-600 group-hover:text-red-600"
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
              {name.length > 20 ? `${name.slice(0, 20)}...` : name}
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
