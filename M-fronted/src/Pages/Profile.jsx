import React, { useEffect, useState } from "react";
import { favorites } from "../assets/fronted/assets.js";
import MangaContex from "../Component/mangaContex";
import { assets } from "../assets/fronted/assets.js";
import Slider from "react-slick";

const Profile = () => {
  const [favorite, setFavorite] = useState([]);
  const [drop1 , setDrop1] = useState(false)
   const [drop , setDrop] = useState(false)


  const gridSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  rows: 2,
  slidesPerRow: 1,
  customPaging: (i) => (
    <div className="text-black text-sm font-bold">
      {i + 1}   {/* show 1, 2, 3 instead of dots */}
    </div>
  ),
  dotsClass: "slick-dots custom-dots", // custom class for styling
};

  useEffect(() => {
    setFavorite(favorites);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <img
          className="h-40 w-40 rounded-full object-cover shadow-lg border-4 border-gray-200"
          src={assets.luffy}
          alt="profile"
        />
        <h2 className="text-2xl font-bold text-gray-800">Gabi Curry</h2>
        <p className="text-gray-500">Manga Enthusiast</p>
      </div>

      {/* Personal Info */}
      <div className="bg-gray-100 rounded-xl p-6 shadow-md mb-8">
        <div className="flex gap-5">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Personal Info
        </h3>
        <img onClick={()=>setDrop1((prev)=>!prev)} className="h-8" src={assets.arrow} alt="" />
        </div>
        {
          drop1?
            <ul className="text-gray-600 space-y-2">
          <li>📧 Email: gabi@example.com</li>
          <li>📅 Joined: Jan 2024</li>
          <li>⭐ Role: Member</li>
        </ul>:
        ''
        }
      
      </div>

      {/* Favorites Section */}
      <div className={`p-10  bg-white rounded-2xl shadow-lg ${drop ? "p-20": ""}`}>
        <div className="flex items-center  gap-5">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Favorite Manga
        </h3>
       <img onClick={()=>setDrop((prev)=>!prev)} className="h-8 " src={assets.arrow} alt="" />
       </div>
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">   */}
         { 
          drop?<Slider  {...gridSettings}>
          {favorite.map((items, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
            >
              
              <MangaContex
                title={items.title}
                chapters={items.chapters}
                coverImage={items.coverImage}
              />
             
              
            </div>
          ))}
          </Slider>:""}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Profile;
