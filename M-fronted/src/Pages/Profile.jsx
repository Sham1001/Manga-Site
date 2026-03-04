import React, { useEffect, useState } from "react";
import { favorites } from "../assets/fronted/assets.js";
import MangaContex from "../Component/MangaContex.jsx";
import { useContext } from "react";
import { MangaCon } from "../Context/MangaContex.jsx"
import { assets } from "../assets/fronted/assets.js";
import Slider from "react-slick";
import axios from "axios"
import { toast } from "react-toastify"

const Profile = () => {
  const [favorite, setFavorite] = useState([]);
  const [drop1, setDrop1] = useState(false)
  const [drop, setDrop] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const { setToken, token, navigate, backendUrl } = useContext(MangaCon)





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





  const getData = async () => {
    try {
      console.log(token)
      const response = await axios.get(backendUrl + '/api/user/profile', { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        console.log(response.data.user)
        const userData = response.data.user

        const date = new Date(userInfo.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });

        setUserInfo(userData)
        // toast.success("ho gaya")

      }
      else {
        toast.error(response.data.message)
        console.log("error hai kuch to")
      }
    }
    catch (error) {
      console.log(error)
      toast.error("behncod")
    }
  }

  const logout = () => {

    localStorage.removeItem("token")
    setToken('')
    navigate('/login')
  }

  useEffect(() => {
    if (token) {
      getData()
    }


    // console.log(userInfo,"someinfo")
    // console.log(token)


  }, [token]);

  useEffect(() => {
    setFavorite(favorites);
  }, [])


  // useEffect(()=>{
  //   console.log(token)
  // },[])
  return (
    <div className="max-w-5xl mt-20 mx-auto p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <img
          className="h-40 w-40 rounded-full object-cover shadow-lg border-4 border-gray-200"
          src={assets.luffy}
          alt="profile"
        />
        <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
        <p className="text-gray-500">Manga Enthusiast</p>
      </div>

      {/* Personal Info */}
      <div className="bg-gray-100 rounded-xl p-6 shadow-md mb-8">
        <div className="flex gap-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Personal Info
          </h3>
          <img onClick={() => setDrop1((prev) => !prev)} className="h-8" src={assets.arrow} alt="" />
        </div>
        {
          drop1 ?
            <ul className="text-gray-600 space-y-2">
              <li>📧 Email: {userInfo.email}</li>
              <li>📅 Joined: {userInfo.createdAt &&
                new Date(userInfo.createdAt).toLocaleDateString("en-US",{
                  year:"numeric",
                  month:"short",
                  day:"numeric"
                })
                }</li>
              <li>⭐ Role: Member</li>
            </ul> :
            ''
        }

      </div>

      {/* Favorites Section */}
      <div className={`p-10  bg-white rounded-2xl shadow-lg ${drop ? "p-20" : ""}`}>
        <div className="flex items-center  gap-5">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Favorite Manga
          </h3>
          <img onClick={() => setDrop((prev) => !prev)} className="h-8 " src={assets.arrow} alt="" />
        </div>
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">   */}
        {
          drop ? <Slider  {...gridSettings}>
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
          </Slider> : ""}
        {/* </div> */}
      </div>
      <button
        onClick={logout}
        className="mt-8 mx-auto block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200"
      >
        Log out
      </button>


    </div>
  );
};

export default Profile;
