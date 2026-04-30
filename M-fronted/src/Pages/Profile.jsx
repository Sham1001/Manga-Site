import React, { useEffect, useState } from "react";
import { favorites } from "../assets/fronted/assets.js";
import MangaContex from "../Component/MangaContex.jsx";
import { useContext } from "react";
import { MangaCon } from "../Context/MangaContex.jsx"
import { assets } from "../assets/fronted/assets.js";
import Slider from "react-slick";
import axios from "axios"
import { toast } from "react-toastify"
import PaginationPage from '../Component/PaginationPage.jsx'
import { useActionData } from "react-router-dom";

const Profile = () => {
  // const [favorite, setFavorite] = useState([]);
  const [drop1, setDrop1] = useState(false)
  const [drop, setDrop] = useState(false)
  const [edit, setEdit] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [favorite, setFavorite] = useState({})
  const [userImg, setUserImage] = useState("")
  const [username, setusername] = useState("")
  const [uploadImg, setUploadImg] = useState("")
  const [updatedProfile, setUpdatedProfile] = useState("")
  const [deescription, setDescription] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPage, setTotalPage] = useState(1)
  const [totalManga, setTotalManga] = useState(0)
  const { setToken, token, navigate, backendUrl, isFavorite, setClicked, clicked } = useContext(MangaCon)




  const formData = new FormData()
  formData.append("userImg", uploadImg)
  // formData.append("username", username)
  // formData.append("deescription", deescription)

  // const gridSettings = {
  //   dots: true,
  //   arrows: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   rows: 2,
  //   slidesPerRow: 1,
  //   customPaging: (i) => (
  //     <div className="text-black text-sm font-bold">
  //       {i + 1}   {/* show 1, 2, 3 instead of dots */}
  //     </div>
  //   ),
  //   dotsClass: "slick-dots custom-dots", // custom class for styling
  // };


  const updateProfileImg = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/profileImg',

        formData
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },

        })
      if (response.data.success) {
        setEdit(false)
        setUserImage(response.data.imgUploadedLink.profileImg)
      }
      else {
        console.log(response.data.message)
        toast(response.data.message)
        
    }
    }
    catch (error) {
      console.log(error)
    }
  }

 
  const changeUsername = async()=>{
    try{
      const response = await axios.patch(backendUrl + '/api/user/changeUsername',{userName:username},{
          headers: {
            Authorization: `Bearer ${token}`
          },

        })

      if(response.data.success){
        
        setusername(response?.data.newUsername)
        setEdit(false)
        
      }

    }
    catch(error){
      console.log(error)
      toast.error(error)
    }
  }


   const changeDescription = async()=>{
    try{
      const response = await axios.patch(backendUrl + '/api/user/changeDescription',{description:deescription},{
          headers: {
            Authorization: `Bearer ${token}`
          },

        })

      if(response.data.success){
        setDescription(response?.data.newDescription)
        setEdit(false)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const handlePaginationNext = () => {

    getData()
    setPage((prev) => prev + 1)
  }

  const handlePaginatioPrev = () => {

    getData()
    setPage((prev) => prev - 1)
  }





  const getData = async () => {
    try {
      console.log(token)
      // const response = await axios.get(backendUrl + '/api/user/profile', { headers: { Authorization: `Bearer ${token}` } },
      //   { params: {  page,  limit } }
      // )
      const response = await axios.get(
        backendUrl + '/api/user/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page,
            limit
          }
        }
      );
      if (response.data.success) {
        console.log(response.data.user)
        const userData = response.data.user
        // const setTotalPage = 

        // const date = new Date(userInfo.createdAt).toLocaleDateString("en-US", {
        //   year: "numeric",
        //   month: "short",
        //   day: "numeric"
        // });

        setUserInfo(userData)
        setFavorite(response?.data?.fav?.favorites)
        setTotalPage(response?.data?.totalPages)
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
      // setInterval(() => {
      getData()
      // console.log(userImg)
      console.log(username)
      // }, 10000)
    }


    // console.log(userInfo,"someinfo")
    // console.log(token)


  }, [clicked, page, edit]);

  useEffect(() => {
    // setFavorite(favorites);
    console.log(favorite)

  }, [page])


  // useEffect(()=>{
  //   console.log(token)
  // },[])
  return (
    <div className="max-w-5xl mt-20 mx-auto p-6">
      <div className="flex justify-end">
        <button onClick={() => setEdit((prev) => !prev)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Edit
        </button>
      </div>
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 mb-10">
        {
          edit ?
            <div className="flex flex-col items-center gap-4">


              <img
              
                className="h-40 w-40 rounded-full object-cover shadow-lg border-4 border-gray-200"
                src={uploadImg ? URL.createObjectURL(uploadImg) : assets.luffy} 
                alt="profile"
              />


              <label
                htmlFor="profile"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Upload
              </label>
              <button onClick={updateProfileImg} className={`cursor-not-allowed text-white px-4 py-2 rounded-md ${uploadImg === "" ? "bg-gray-400" : "cursor-pointer  bg-blue-500 hover:bg-blue-600 transition"} `}>Confirm</button>


              <input
                type="file"
                hidden
                id="profile"
                onChange={(e) => setUploadImg(e.target.files[0])}
              />
              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <label htmlFor="Username" className="w-28 text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    onChange={(e) => setusername(e.target.value)}
                    id="Username"
                    value={username}
                    type="text"
                    placeholder="Enter username"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button onClick={changeUsername} className={`cursor-not-allowed text-white px-4 py-2 rounded-md ${username === "" ? "bg-gray-400" : "cursor-pointer  bg-blue-500 hover:bg-blue-600 transition"}`}>
                    upload
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <label htmlFor="Description" className="w-28 text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    id="Description"
                    value={deescription}
                    type="text"
                    placeholder="Enter description"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />

                  <button  onClick={changeDescription} className={`cursor-not-allowed text-white px-4 py-2 rounded-md ${deescription === "" ? "bg-gray-400" : "cursor-pointer  bg-blue-500 hover:bg-blue-600 transition"}`}>
                    upload
                  </button>
                </div>

              </div>

            </div>

            :
            <div className="flex flex-col items-center gap-4 mb-10">
              <img
                className="h-40 w-40 rounded-full object-cover shadow-lg border-4 border-gray-200"
                src={userInfo?.profileImg || assets.luffy}
                alt="profile"
              />
              <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
              <p className="text-gray-500">{userInfo.description || "Manga Enthusiast"}</p>
            </div>
        }
        {/* <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
        <p className="text-gray-500">Manga Enthusiast</p> */}
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
                new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })
              }</li>
              <li>⭐ Role: Member</li>
            </ul> :
            ''
        }

      </div>

      {/* Favorites Section */}
      <div className={`p-10  bg-white rounded-2xl shadow-lg ${drop ? "p-10" : ""}`}>
        <div className="flex items-center  gap-5">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Favorite Manga
          </h3>
          <img onClick={() => setDrop((prev) => !prev)} className="h-8 " src={assets.arrow} alt="" />
        </div>
        <div >
          {/* { */}
          {/* drop ? <Slider  {...gridSettings}> */}
          {
            drop ?

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {
                    favorite?.map((items, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                 cursor-pointer"
                      >
                        <div className="flex gap-4 items-start">

                          <div className="flex-1">
                            <MangaContex
                              name={items.name}
                              chapters={items.chapters}
                              coverImg={items.coverImg}
                              id={items._id}
                              isFavorite={isFavorite}
                              setClicked={setClicked}
                            />
                          </div>

                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex gap-5">
                  <button disabled={page === 1} className={`px-4 py-2 rounded-xl font-semibold ${page === 1 ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-800"}`} onClick={handlePaginatioPrev}>
                    prev
                  </button>
                  <button>
                    {page}
                  </button>
                  <button disabled={page === totalPage} className={`px-4 py-2 rounded-xl font-semibold ${page === totalPage ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-800"}`} onClick={handlePaginationNext}>
                    Next
                  </button>
                </div>
              </div>

              :
              ''
          }
          {/* <div className="flex gap-5">
        <button disabled={page===1} className={`px-4 py-2 rounded-xl font-semibold ${page ===1 ?"bg-gray-300 cursor-not-allowed"
        : "bg-gray-700 text-white hover:bg-gray-800"}`} onClick={handlePaginatioPrev}>
          prev
        </button>
            <button>
            {page}
          </button>
           <button disabled={page===totalPage} className={`px-4 py-2 rounded-xl font-semibold ${page === totalPage ?"bg-gray-300 cursor-not-allowed"
        : "bg-gray-700 text-white hover:bg-gray-800"}`} onClick={handlePaginationNext}>
            Next
          </button>
        </div> */}
          {/* {drop ?<PaginationPage page={page} totalPage={totalPage} onChange={setPage}/> : ""} */}
          {/* </Slider> : ""} */}
        </div>
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
