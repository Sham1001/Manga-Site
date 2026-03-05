import React from 'react'
import { useContext } from 'react'
import { MangaCon } from '../Context/MangaContex.jsx'
// import { toast } from 'react-toastify'
import axios from 'axios'
import { useState, useEffect } from 'react'
import MangaContex from '../Component/MangaContex.jsx'
import PaginationPage from '../Component/PaginationPage.jsx'
const Latest = () => {

  const [latestManga, setLatestManga] = useState([])
  // const [num, setNum] = useState(4)
  const { backendUrl } = useContext(MangaCon)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalManga, setTotalManga] = useState(0)

  // const handleShow = () => {
  //   if (num >= manga.length) {
  //     setNum(4)
  //   }
  //   else {
  //     setNum(num + 4)
  //   }
  // }


  const getLatestManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { limit:8, page } })
      // console.log(response.data.total)
      if (response.data.success) {
        const latestManga = response.data.pageInfo

        setTotalPage(response.data.totalPages)
        setTotalManga(response.data.total)
        setLatestManga(latestManga)
        
      }
    }
    catch (error) {
      console.log(error, "Error in latest manga")
    }

    // setPopular(popularManga)
  }


  useEffect(() => {
        getLatestManga()
      }, [page])

  useEffect(()=>{
    console.log(latestManga)
  })

  return (
    <div className="px-15 py-20 bg-gray-50 min-h-screen">
    <div className="flex justify-between mr-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Manga Collection
  </h2>
  <h2 className="font-bold">
    Total Manga :- {totalManga}
  </h2>
    </div>
  

    <div className="space-y-6">
  <div className="w-full grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6" >
    {/* <Slider {...gridSettings}> */}
      {latestManga.map((item) => (
        <MangaContex
          key={item._id}
          name={item.name}
          chapters={item.chapters}
          coverImg={item.coverImg}
          id={item._id}
        />
      ))}
      </div>
   

  
  <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>


    </div>
  
</div>
  );
}

export default Latest