import React, { useState } from "react";
import { assest } from "../assets/Admin/asset";
import search2 from '../assets/search2.svg'
import cross from '../assets/cross.svg'
import axios from 'axios'
import MangaComponent from '../Component/MangaComponent.jsx'
import { useEffect } from "react";

const Edit = ({backendUrl}) => {
  const [imageArr, setImageArr] = useState([]);
  const [allManga, setAllManga] = useState([])
  const [mangaId, setMangaId] = useState("")
  const [search, setSearch] = useState('')
  const [authName, setAuthName] = useState("");
  const [chapNo, setChapNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("authName", authName);
    formData.append("chapNo", chapNo);
    imageArr && imageArr.forEach((file) => formData.append("imageArr", file));
  };

  const filterImg = (file) => {
    setImageArr((prev) => prev.filter((item) => item !== file));
  };

  const getManga = async()=>{
    try{
      const response = await axios.get(backendUrl+"/api/manga/mangaInfo",{
      params:{search, limit:6}
    })
    if(response.data.success){
      const matchedManga = response.data.pageInfo
      setAllManga(matchedManga)
    }

    }
    catch(error){
      console.log(error)
    }

  }


  useEffect(()=>{
    getManga()
  },[search])

  useEffect(()=>{
  // console.log(mangaId,"This is id")
  const timeout = setTimeout(() => {
    console.log(allManga, "This is Id")
  }, 3000);
  },[mangaId])



  // useEffect(()=>{
  //   console.log(search)
  // },[search])

  return (
    <div>
    
    <div className="flex items-center justify-center bg-white shadow-md rounded-2xl px-4 py-2 max-w-md">
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
            <button >
              <img src={cross} alt="close" className="w-4 h-4 cursor-pointer hover:scale-110 transition" />
            </button>
          </div>

          
    <div className="space-y-10 flex gap-8 w-full">

  
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6"
    >
       


      {/* Input fields */}
      <div className="space-y-4">
        <input
          onChange={(e) => setAuthName(e.target.value)}
          value={authName}
          type="text"
          required
          placeholder="Enter author name..."
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

    <div className="grid grid-cols-2  gap-10">
      {
        allManga?.map((item)=>(
          <MangaComponent name={item.name} coverImg={item.coverImg} id = {item.id} />
        ))
      }
    </div>
      </div>
      </div>
  );
};

export default Edit;
