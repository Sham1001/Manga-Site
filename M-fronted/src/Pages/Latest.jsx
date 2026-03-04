import React from 'react'
import { useContext } from 'react'
import { MangaCon } from '../Context/MangaContex.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import MangaContex from '../Component/MangaContex.jsx'
const Latest = () => {

  const [topManga, setTopManga] = useState([])
  const [num, setNum] = useState(4)
  const { manga } = useContext(MangaCon)

  const handleShow = () => {
    if (num >= manga.length) {
      setNum(4)
    }
    else {
      setNum(num + 4)
    }
  }
  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manga Collection</h2>
      <div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 mx-10">
          {manga.slice(0,num).map((items, index) => (
            <MangaContex
              key={index}
              name={items.name}
              chapters={items.chapters}
              coverImg={items.coverImg}
              id={items._id}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShow}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
          >
            {num >= manga.length ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Latest