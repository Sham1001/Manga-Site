import React, { useEffect, useState } from "react";
import MangaContex from "../Component/MangaContex.jsx";
import { useContext } from "react";
import { MangaCon } from "../Context/MangaContex.jsx"
import { assets } from "../assets/fronted/assets.js";
import axios from "axios"
import { LogOut, Camera, Mail, Calendar, Star, Heart, Pencil, X } from "lucide-react";

const Profile = () => {
  const [edit, setEdit] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [favorite, setFavorite] = useState([])
  const [userImg, setUserImage] = useState("")
  const [username, setusername] = useState("")
  const [uploadImg, setUploadImg] = useState("")
  const [deescription, setDescription] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const [totalPage, setTotalPage] = useState(1)
  const [totalManga, setTotalManga] = useState(0)
  const { setToken, token, navigate, backendUrl, isFavorite, setClicked, clicked } = useContext(MangaCon)

  const updateProfileImg = async () => {
    try {
      const formData = new FormData()
      formData.append("userImg", uploadImg)
      const response = await axios.post(backendUrl + '/api/user/profileImg',
        formData,
        { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        setEdit(false)
        setUserImage(response.data.imgUploadedLink.profileImg)
      } else {
        console.log(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const changeUsername = async () => {
    try {
      const response = await axios.patch(backendUrl + '/api/user/changeUsername', { userName: username }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data.success) {
        setusername(response?.data.newUsername)
        setEdit(false)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const changeDescription = async () => {
    try {
      const response = await axios.patch(backendUrl + '/api/user/changeDescription', { description: deescription }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data.success) {
        setDescription(response?.data.newDescription)
        setEdit(false)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handlePaginationNext = () => {
    setPage((prev) => prev + 1)
  }

  const handlePaginatioPrev = () => {
    setPage((prev) => prev - 1)
  }

  const getData = async () => {
    try {
      console.log(token)
      const response = await axios.get(
        backendUrl + '/api/user/profile',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, limit }
        }
      );
      if (response.data.success) {
        console.log(response.data.user)
        const userData = response.data.user
        setUserInfo(userData)
        setFavorite(response?.data?.fav)
        setTotalPage(response?.data?.totalPages === 0 ? 1 : response?.data?.totalPages)
        setTotalManga(response?.data?.total)
        console.log(response?.data?.totalPages, "This is page")
      }
    }
    catch (error) {
      console.log(error)
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
  }, [clicked, page, edit]);

  const inputClass = "flex-1 w-full bg-[#1a0f26] border border-[#3d2456] rounded-lg px-3 py-2 text-sm text-[#e6d9f7] placeholder-[#6b5a80] focus:outline-none focus:ring-1 focus:ring-[#8b3fd6]"
  const primaryBtn = (disabled) => `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0 ${disabled ? "bg-[#241834] text-[#4a4152] cursor-not-allowed" : "bg-[#8b3fd6] active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6]"}`

  return (
    <div className="bg-black min-h-screen pb-24">

      {/* Banner */}
      <div className="relative h-36 sm:h-48 bg-gradient-to-br from-[#2a1240] via-[#1a0f26] to-black overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(185,139,255,0.25), transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,63,214,0.2), transparent 50%)'
        }} />
        <button
          onClick={logout}
          className="absolute top-4 right-4 sm:top-5 sm:right-6 flex items-center gap-1.5 bg-black/40 border border-white/10 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full active:bg-black/60 sm:hover:bg-black/60 transition-colors backdrop-blur-sm"
        >
          <LogOut size={14} /> Log out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Avatar + identity, overlapping banner */}
        <div className="relative -mt-14 sm:-mt-16 flex flex-col items-center text-center">
          <div className="relative">
            <img
              className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-black"
              src={uploadImg ? URL.createObjectURL(uploadImg) : (userInfo?.profileImg || assets.luffy)}
              alt="profile"
            />
            {edit && (
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#8b3fd6] border-2 border-black flex items-center justify-center cursor-pointer active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6] transition-colors"
              >
                <Camera size={14} className="text-white" />
              </label>
            )}
            <input type="file" hidden id="profile" onChange={(e) => setUploadImg(e.target.files[0])} />
          </div>

          {!edit ? (
            <>
              <div className="flex items-center gap-2 mt-3">
                <h2 className="text-xl sm:text-2xl font-black text-white" style={{ textShadow: '0 0 14px rgba(185,139,255,0.35)' }}>
                  {userInfo.name}
                </h2>
                <button onClick={() => setEdit(true)} className="w-7 h-7 rounded-full bg-[#1a0f26] border border-[#3d2456] flex items-center justify-center active:bg-[#241834] sm:hover:bg-[#241834] transition-colors">
                  <Pencil size={12} className="text-[#b98bff]" />
                </button>
              </div>
              <p className="text-[#8a7a9c] text-sm mt-1 max-w-md">{userInfo.description || "Manga Enthusiast"}</p>
            </>
          ) : (
            <div className="w-full max-w-sm mt-4 space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase">Edit Profile</span>
                <button onClick={() => setEdit(false)} className="w-6 h-6 rounded-full bg-[#1a0f26] flex items-center justify-center">
                  <X size={12} className="text-[#8a7a9c]" />
                </button>
              </div>

              {uploadImg && (
                <button onClick={updateProfileImg} className={primaryBtn(uploadImg === "") + " w-full"}>
                  Confirm New Photo
                </button>
              )}

              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => setusername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="New username"
                  className={inputClass}
                />
                <button onClick={changeUsername} disabled={username === ""} className={primaryBtn(username === "")}>
                  Save
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={deescription}
                  type="text"
                  placeholder="New bio"
                  className={inputClass}
                />
                <button onClick={changeDescription} disabled={deescription === ""} className={primaryBtn(deescription === "")}>
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Stat pills */}
          <div className="flex items-center gap-3 sm:gap-4 mt-5 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 bg-[#0f0a14] border border-[#241834] rounded-full px-3.5 py-1.5">
              <Heart size={13} className="text-[#b98bff]" />
              <span className="text-xs font-semibold text-[#e6d9f7]">{totalManga} Favorites</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0f0a14] border border-[#241834] rounded-full px-3.5 py-1.5">
              <Mail size={13} className="text-[#b98bff]" />
              <span className="text-xs font-semibold text-[#e6d9f7]">{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0f0a14] border border-[#241834] rounded-full px-3.5 py-1.5">
              <Calendar size={13} className="text-[#b98bff]" />
              <span className="text-xs font-semibold text-[#e6d9f7]">
                Joined {userInfo.createdAt && new Date(userInfo.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0f0a14] border border-[#241834] rounded-full px-3.5 py-1.5">
              <Star size={13} className="text-[#b98bff]" />
              <span className="text-xs font-semibold text-[#e6d9f7]">Member</span>
            </div>
          </div>
        </div>

        {/* Favorites — always visible, section header style like Home */}
        <div className="mt-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="block text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-0.5">Your library</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">Favorite Manga</h3>
            </div>
          </div>

          {totalManga == 0 ? (
            <div className="rounded-2xl border border-dashed border-[#3d2456] bg-[#0f0a14] py-14 text-center">
              <p className="text-white font-semibold">No Manga Found</p>
              <p className="text-[#8a7a9c] text-sm mt-1.5">Your library is empty. Start adding some manga!</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {favorite.map((items, index) => (
                  <MangaContex
                    key={index}
                    name={items.name}
                    chapter1={items.latestChapterNo[0]}
                    chapter2={items?.latestChapterNo[1]}
                    coverImg={items.coverImg}
                    id={items._id}
                    isFavorite={isFavorite}
                    setClicked={setClicked}
                    createdAt1={items.latestChapterDate[0]}
                    createdAt2={items?.latestChapterDate[1]}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${page === 1
                    ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
                    : "border-[#3d2456] text-[#e6d9f7] active:bg-[#1a0f26] sm:hover:bg-[#1a0f26]"}`}
                  onClick={handlePaginatioPrev}
                >
                  ← Prev
                </button>
                <span className="text-sm font-semibold text-[#8a7a9c] px-1">
                  {page} <span className="text-[#4a4152]">/</span> {totalPage}
                </span>
                <button
                  disabled={page === totalPage}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${page === totalPage
                    ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
                    : "border-[#3d2456] text-[#e6d9f7] active:bg-[#1a0f26] sm:hover:bg-[#1a0f26]"}`}
                  onClick={handlePaginationNext}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;











// Simple One


// import React, { useEffect, useState } from "react";
// import MangaContex from "../Component/MangaContex.jsx";
// import { useContext } from "react";
// import { MangaCon } from "../Context/MangaContex.jsx"
// import { assets } from "../assets/fronted/assets.js";
// import axios from "axios"
// import { ChevronDown, LogOut, Camera } from "lucide-react";

// const Profile = () => {
//   const [drop1, setDrop1] = useState(false)
//   const [drop, setDrop] = useState(false)
//   const [edit, setEdit] = useState(false)
//   const [userInfo, setUserInfo] = useState({})
//   const [favorite, setFavorite] = useState({})
//   const [userImg, setUserImage] = useState("")
//   const [username, setusername] = useState("")
//   const [uploadImg, setUploadImg] = useState("")
//   const [deescription, setDescription] = useState("")
//   const [page, setPage] = useState(1)
//   const [limit, setLimit] = useState(4)
//   const [totalPage, setTotalPage] = useState(1)
//   const [totalManga, setTotalManga] = useState(0)
//   const { setToken, token, navigate, backendUrl, isFavorite, setClicked, clicked } = useContext(MangaCon)

//   const updateProfileImg = async () => {
//     try {
//       const formData = new FormData()
//       formData.append("userImg", uploadImg)
//       const response = await axios.post(backendUrl + '/api/user/profileImg',
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } })
//       if (response.data.success) {
//         setEdit(false)
//         setUserImage(response.data.imgUploadedLink.profileImg)
//       } else {
//         console.log(response.data.message)
//       }
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   const changeUsername = async () => {
//     try {
//       const response = await axios.patch(backendUrl + '/api/user/changeUsername', { userName: username }, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.data.success) {
//         setusername(response?.data.newUsername)
//         setEdit(false)
//       }
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   const changeDescription = async () => {
//     try {
//       const response = await axios.patch(backendUrl + '/api/user/changeDescription', { description: deescription }, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.data.success) {
//         setDescription(response?.data.newDescription)
//         setEdit(false)
//       }
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   const handlePaginationNext = () => {
//     setPage((prev) => prev + 1)
//   }

//   const handlePaginatioPrev = () => {
//     setPage((prev) => prev - 1)
//   }

//   const getData = async () => {
//     try {
//       console.log(token)
//       const response = await axios.get(
//         backendUrl + '/api/user/profile',
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { page, limit }
//         }
//       );
//       if (response.data.success) {
//         console.log(response.data.user)
//         const userData = response.data.user
//         setUserInfo(userData)
//         setFavorite(response?.data?.fav)
//         setTotalPage(response?.data?.totalPages === 0 ? 1 : response?.data?.totalPages)
//         setTotalManga(response?.data?.total)
//         console.log(response?.data?.totalPages, "This is page")
//       }
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     setToken('')
//     navigate('/login')
//   }

//   useEffect(() => {
//     if (token) {
//       getData()
//     }
//   }, [clicked, page, edit]);

//   const inputClass = "flex-1 w-full bg-[#1a0f26] border border-[#3d2456] rounded-lg px-3 py-2 text-sm text-[#e6d9f7] placeholder-[#6b5a80] focus:outline-none focus:ring-1 focus:ring-[#8b3fd6]"
//   const primaryBtn = (disabled) => `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${disabled ? "bg-[#241834] text-[#4a4152] cursor-not-allowed" : "bg-[#8b3fd6] active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6]"}`

//   return (
//     <div className="bg-black min-h-screen pb-24">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">

//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => setEdit((prev) => !prev)}
//             className="px-4 py-2 rounded-full bg-transparent border border-[#3d2456] text-[#e6d9f7] text-sm font-semibold active:bg-[#1a0f26] sm:hover:bg-[#1a0f26] transition-colors"
//           >
//             {edit ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>

//         <div className="flex flex-col items-center gap-4 mb-8">
//           {
//             edit ?
//               <div className="flex flex-col items-center gap-4 w-full max-w-md">
//                 <div className="relative">
//                   <img
//                     className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover border-2 border-[#3d2456]"
//                     src={uploadImg ? URL.createObjectURL(uploadImg) : assets.luffy}
//                     alt="profile"
//                   />
//                   <label
//                     htmlFor="profile"
//                     className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#8b3fd6] border-2 border-black flex items-center justify-center cursor-pointer active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6] transition-colors"
//                   >
//                     <Camera size={16} className="text-white" />
//                   </label>
//                 </div>

//                 <input
//                   type="file"
//                   hidden
//                   id="profile"
//                   onChange={(e) => setUploadImg(e.target.files[0])}
//                 />

//                 <button
//                   onClick={updateProfileImg}
//                   disabled={uploadImg === ""}
//                   className={primaryBtn(uploadImg === "")}
//                 >
//                   Confirm Photo
//                 </button>

//                 <div className="space-y-3 w-full mt-2">
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                     <label htmlFor="Username" className="sm:w-24 text-xs font-bold tracking-[0.15em] text-[#b98bff] uppercase">
//                       Username
//                     </label>
//                     <input
//                       onChange={(e) => setusername(e.target.value)}
//                       id="Username"
//                       value={username}
//                       type="text"
//                       placeholder="Enter username"
//                       className={inputClass}
//                     />
//                     <button onClick={changeUsername} disabled={username === ""} className={primaryBtn(username === "")}>
//                       Save
//                     </button>
//                   </div>

//                   <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                     <label htmlFor="Description" className="sm:w-24 text-xs font-bold tracking-[0.15em] text-[#b98bff] uppercase">
//                       Bio
//                     </label>
//                     <input
//                       onChange={(e) => setDescription(e.target.value)}
//                       id="Description"
//                       value={deescription}
//                       type="text"
//                       placeholder="Enter description"
//                       className={inputClass}
//                     />
//                     <button onClick={changeDescription} disabled={deescription === ""} className={primaryBtn(deescription === "")}>
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               :
//               <div className="flex flex-col items-center gap-3">
//                 <img
//                   className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover border-2 border-[#3d2456]"
//                   src={userInfo?.profileImg || assets.luffy}
//                   alt="profile"
//                 />
//                 <h2
//                   className="text-xl sm:text-2xl font-black text-white"
//                   style={{ textShadow: '0 0 14px rgba(185,139,255,0.35)' }}
//                 >
//                   {userInfo.name}
//                 </h2>
//                 <p className="text-[#8a7a9c] text-sm">{userInfo.description || "Manga Enthusiast"}</p>
//               </div>
//           }
//         </div>

//         {/* Personal Info */}
//         <div className="bg-[#0f0a14] border border-[#241834] rounded-2xl p-5 sm:p-6 mb-5">
//           <button
//             onClick={() => setDrop1((prev) => !prev)}
//             className="flex items-center justify-between w-full"
//           >
//             <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase">
//               Personal Info
//             </h3>
//             <ChevronDown size={18} className={`text-[#8a7a9c] transition-transform duration-200 ${drop1 ? "rotate-180" : ""}`} />
//           </button>

//           {drop1 && (
//             <ul className="text-[#c9bcdb] text-sm space-y-2.5 mt-4">
//               <li>Email: <span className="text-[#e6d9f7]">{userInfo.email}</span></li>
//               <li>Joined: <span className="text-[#e6d9f7]">{userInfo.createdAt &&
//                 new Date(userInfo.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric", month: "short", day: "numeric"
//                 })
//               }</span></li>
//               <li>Role: <span className="text-[#e6d9f7]">Member</span></li>
//             </ul>
//           )}
//         </div>

//         {/* Favorite Manga */}
//         <div className="bg-[#0f0a14] border border-[#241834] rounded-2xl p-5 sm:p-6">
//           <button
//             onClick={() => setDrop((prev) => !prev)}
//             className="flex items-center justify-between w-full"
//           >
//             <h3 className="text-lg sm:text-xl font-black text-white">
//               Favorite Manga
//             </h3>
//             <ChevronDown size={20} className={`text-[#8a7a9c] transition-transform duration-200 ${drop ? "rotate-180" : ""}`} />
//           </button>

//           {drop && (
//             <div className="space-y-6 mt-5">
//               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                 {favorite.map((items, index) => (
//                   <MangaContex
//                     key={index}
//                     name={items.name}
//                     chapter1={items.latestChapterNo[0]}
//                     chapter2={items?.latestChapterNo[1]}
//                     coverImg={items.coverImg}
//                     id={items._id}
//                     isFavorite={isFavorite}
//                     setClicked={setClicked}
//                     createdAt1={items.latestChapterDate[0]}
//                     createdAt2={items?.latestChapterDate[1]}
//                   />
//                 ))}
//               </div>

//               {totalManga == 0 && (
//                 <div className="flex flex-col items-center justify-center py-14 text-center">
//                   <p className="text-white font-semibold">No Manga Found</p>
//                   <p className="text-[#8a7a9c] text-sm mt-1.5">Your library is empty. Start adding some manga!</p>
//                 </div>
//               )}

//               {totalManga > 0 && (
//                 <div className="flex items-center justify-center gap-3">
//                   <button
//                     disabled={page === 1}
//                     className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${page === 1
//                       ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
//                       : "border-[#3d2456] text-[#e6d9f7] active:bg-[#1a0f26] sm:hover:bg-[#1a0f26]"}`}
//                     onClick={handlePaginatioPrev}
//                   >
//                     ← Prev
//                   </button>
//                   <span className="text-sm font-semibold text-[#8a7a9c] px-1">
//                     {page} <span className="text-[#4a4152]">/</span> {totalPage}
//                   </span>
//                   <button
//                     disabled={page === totalPage}
//                     className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${page === totalPage
//                       ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
//                       : "border-[#3d2456] text-[#e6d9f7] active:bg-[#1a0f26] sm:hover:bg-[#1a0f26]"}`}
//                     onClick={handlePaginationNext}
//                   >
//                     Next →
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <button
//           onClick={logout}
//           className="mt-8 mx-auto flex items-center gap-2 bg-transparent border border-[#e0708a]/40 text-[#e0708a] font-semibold px-6 py-2.5 rounded-full active:bg-[#e0708a]/10 sm:hover:bg-[#e0708a]/10 transition-colors"
//         >
//           <LogOut size={16} /> Log out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;