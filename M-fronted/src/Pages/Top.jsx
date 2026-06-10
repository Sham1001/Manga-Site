import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from 'react'
import { useContext } from 'react'
import {MangaCon} from '../Context/MangaContex.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import MangaContex from '../Component/MangaContex.jsx'
import PaginationPage from '../Component/PaginationPage.jsx'

const Top = () => {

  const [topManga,setTopManga] = useState([])
  const [totalManga, setTotalManga] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(1)
  const { backendUrl, isFavorite, setClicked } = useContext(MangaCon)

  const getPopularManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { sort: 'Recommended', limit:12, page } })
      console.log(response.data.total)
      if (response.data.success) {
        const popularManga = response.data.pageInfo
        setTotalPage(response.data.totalPages)
        setTotalManga(response.data.total)
        setTopManga(popularManga)
      }
    }
    catch (error) {
      console.log(error, "Error in top manga")
    }
  }

  useEffect(() => {
    getPopularManga()
  }, [page])

  useEffect(() => {
    console.log(topManga,'This is total chapterInfo')
  }, [topManga])

  

  return (
    <div
      className="bg-cover bg-center px-5 py-20 min-h-screen"
    > 
      <div className="flex justify-between mr-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Top Manga
        </h2>
        <h2 className="font-bold mt-1 ">
          Total Manga :- {totalManga}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {topManga.map((item) => (
            <div key={item.manga._id} className="min-w-0 w-full">
              <MangaContex
                key={item.manga._id}
                name={item.manga.name}
                chapter1={item.latestChapters[0].chapterNo}
                chapter2={item?.latestChapters[1]?.chapterNo}
                coverImg={item.manga.coverImg}
                id={item.manga._id}
                isFavorite={isFavorite}
                setClicked={setClicked}
                createdAt1={item.latestChapters[0].createdAt}
                createdAt2={item?.latestChapters[1]?.createdAt}
              />
            </div>
          ))}
        </div>

        <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>
      </div>
    </div>
  );
}

export default Top