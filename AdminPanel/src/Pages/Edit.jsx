import React, { useState } from "react";
import { assest } from "../assets/Admin/asset.js";
import search2 from '../assets/search2.svg'
import cross from '../assets/cross.svg'
import axios from 'axios'
import MangaComponent from '../Component/MangaComponent.jsx'
import { useEffect } from "react";
import PaginationPage from '../Component/Pagination.jsx'
import { toast } from "react-toastify";

const Edit = ({backendUrl}) => {
  const [imageArr, setImageArr] = useState([]);
  const [allManga, setAllManga] = useState([])
  const [mangaId, setMangaId] = useState("")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  // const [totoalPage,]
  const [search, setSearch] = useState('')
  const [chpName, setChpName] = useState("");
  const [chapNo, setChapNo] = useState("");
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("chpName", chpName);
    formData.append("chapNo", chapNo);
    formData.append("mangaId",mangaId)
    imageArr && imageArr.forEach((img) => formData.append("imageArr", img));

    try{
        const response = await axios.post(backendUrl+"/api/chapter/add",formData)
        if(response.data.success){
          setMangaId('')
          setChapNo('')
          setChpName('')
          setImageArr([])
          toast.success("Chapter added")
        }
        
    }
    catch(error){
      console.log(error)
      toast.error(error)
    }
  };

  const filterImg = (file) => {
    setImageArr((prev) => prev.filter((item) => item !== file));
  };

  const getManga = async()=>{
    try{
      const response = await axios.get(backendUrl+"/api/manga/mangaInfo",{
      params:{search, limit:4, page}
    })
    if(response.data.success){
      const matchedManga = response.data.pageInfo
      setTotalPage(response.data.totalPages)

      setAllManga(matchedManga)
    }

    }
    catch(error){
      console.log(error)
    }

  }


  useEffect(()=>{
    getManga()
  },[search,page])

  useEffect(()=>{
  // console.log(mangaId,"This is id")
  // const timeout = setTimeout(() => {
  //   console.log(mangaId, "This is Id")
  // }, 3000);
  console.log(mangaId,"This is manga Id")
  },[mangaId])



  // useEffect(()=>{
  //   console.log(search)
  // },[search])

  return (
   <div>
  <div className="flex items-center justify-center bg-white shadow-md rounded-2xl px-4 py-2 max-w-md mx-auto mb-8">
    {/* Input + search icon */}
    <div className="flex items-center flex-1 gap-2">
      <img src={search2} alt="search" className="w-5 h-5 text-gray-500" />
      <input
        onChange={(e)=>setSearch(e.target.value)} value={search}
        type="text"
        placeholder="Search..."
        className="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400"
      />
    </div>

    {/* Cross icon */}
    <button>
      <img src={cross} alt="close" className="w-4 h-4 cursor-pointer hover:scale-110 transition" />
    </button>
  </div>


  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 mr-10">

    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-1/2 bg-white shadow-lg rounded-2xl p-6 space-y-6 "
    >

      {/* Input fields */}
      <div className="space-y-4">
        <input
          onChange={(e) => setChpName(e.target.value)}
          value={chpName}
          type="text"
          required
          placeholder="Enter chp name..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          onChange={(e) => setChapNo(e.target.value)}
          value={chapNo}
          required
          type="number"
          placeholder="Chapter no..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Upload area */}
      <label
        htmlFor="imageArr"
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition"
      >
        <img
          src={assest.upload}
          alt="upload"
          className="w-16 h-16 opacity-70"
        />
        <p className="mt-2 text-gray-500">Click or drag to upload pages</p>
        <input
          onChange={(e) =>
            setImageArr((prev) => [...prev, ...Array.from(e.target.files)])
          }
          type="file"
          hidden
          id="imageArr"
          multiple
          accept="image/*"
        />
      </label>

      {/* Preview grid */}
      {imageArr.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {imageArr.map((file, index) => (
            <div key={index} className="relative group">
              <img
                onClick={() => filterImg(file)}
                src={URL.createObjectURL(file)}
                alt={`page-${index}`}
                className="w-full h-32 object-cover rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-[0_0_15px_5px_rgba(239,68,68,0.7)] hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add Chapter
        </button>
        <button
          type="button"
          onClick={() => setImageArr([])}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Remove Chapter
        </button>
      </div>
    </form>


    <div className="w-full lg:w-1/2 space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 m-auto ">
        {
          allManga?.map((item)=>(
            <div
              key={item._id}
              className={`hover:shadow-[0_0_15px_5px_rgba(239,68,68,0.7)] rounded-2xl hover:scale-105 transition mr-10  ${mangaId === item._id ? 'bg-red-600':"" } `}
              onClick={()=>setMangaId(item._id)}
            >
              
              <MangaComponent name={item.name} coverImg={item.coverImg} id={item.id} />
            </div>
          ))
        }
      </div>

      <PaginationPage page={page} onChange={setPage} totalPage={totalPage}/>
    </div>

  </div>
</div>
  );
};

export default Edit;
