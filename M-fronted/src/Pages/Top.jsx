import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from 'react'
import { useContext } from 'react'
import {MangaCon} from '../Context/MangaContex.jsx'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useState, useEffect } from 'react'
import MangaContex from '../Component/MangaContex.jsx'

const Top = () => {

  const [topManga,setTopManga] = useState([])
  const [totalManga, setTotalManga] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [num,setNum] = useState(4)
  const [page, setPage] = useState(1)
  const { backendUrl } = useContext(MangaCon)
  // let totalManga
  // const [page, setPage] = useState(1)
  // let moreMange = manga.slice()

  // const handleShow=()=>{
  //   if(num>=manga.length){
  //     setNum(4)
  //   }
  //   else{
  //     setNum(num+4)
  //   }
  // }

//   const gridSettings = {
//   dots: true,
//   arrows: true,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 4,
//   rows: 2,
//   slidesPerRow: 1,

//   customPaging: (i) => (
//     <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
//       {i + 1}
//     </div>
//   ),

//   dotsClass: "slick-dots !bottom-[-40px]",

//   responsive: [
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         rows: 2,
//       },
//     },
//   ],
// };

  const getPopularManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { sort: 'Recommended', limit:8, page } })
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

    // setPopular(popularManga)
  }


  useEffect(() => {
      getPopularManga()
    }, [page])

  useEffect(()=>{
    console.log(topManga.length)
  })
  



  // const fetchMoreManga = async()=>{
    
  //   PaginatApi(page)
  // }
  return (
  <div className="px-15 py-20 bg-gray-50 min-h-screen">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Manga Collection
  </h2>

    <div className="space-y-6">
  <div className="w-full grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6" >
    {/* <Slider {...gridSettings}> */}
      {topManga.map((item) => (
        <MangaContex
          key={item._id}
          name={item.name}
          chapters={item.chapters}
          coverImg={item.coverImg}
          id={item._id}
        />
      ))}
      </div>
    {/* </Slider> */}
    <div className="flex gap-2 justify-center items-center mt-6">
        <button
        disabled={page === 1}
        onClick={
          ()=>setPage((prev)=>prev-1)
        } className={`px-8 py-2 rounded-2xl ${page === 1? "cursor-not-allowed bg-gray-400 text-white" : " bg-gray-700 rounded-2xl text-white font-bold border-2" }`}>Prev</button>
       {Array.from({ length: totalPage }, (_, index) => {
    const pageNumber = index + 1;

    return (
      <button
        key={pageNumber}
        onClick={() => setPage(pageNumber)}
        className={`min-w-[40px] h-[40px] flex items-center justify-center 
          rounded-full font-semibold transition-all duration-200
          ${
            page === pageNumber
              ? "bg-blue-600 text-white shadow-md scale-110"
              : "bg-white border border-gray-400 hover:bg-gray-100"
          }`}
      >
        {pageNumber}
      </button>
    );
  })}
        <button disabled={page===totalPage} onClick={()=>setPage((prev)=>prev+1)} className={`px-8 py-2 rounded-2xl ${page === totalPage ? "cursor-not-allowed bg-gray-400 text-white" : " bg-gray-700 rounded-2xl text-white font-bold border-2"}`}>Next</button>
    </div>
    </div>
  
</div>
);

}

export default Top