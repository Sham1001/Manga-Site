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
import PaginationPage from '../Component/PaginationPage.jsx'

const Top = () => {

  const [topManga,setTopManga] = useState([])
  const [totalManga, setTotalManga] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  // const [num,setNum] = useState(4)
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





// const getPagination = () => {
//   const pages = [];
//   const siblingCount = 2; // pages left & right of current

//   const left = Math.max(page - siblingCount, 1);
//   const right = Math.min(page + siblingCount, totalPage);

//   // Always show first page
//   if (left > 1) {
//     pages.push(1);
//   }

//   // Left dots
//   if (left > 2) {
//     pages.push("...");
//   }

//   // Middle pages
//   for (let i = left; i <= right; i++) {
//     pages.push(i);
//   }

//   // Right dots
//   if (right < totalPage - 1) {
//     pages.push("...");
//   }

//   // Always show last page
//   if (right < totalPage) {
//     pages.push(totalPage);
//   }

//   return pages;
// };







  useEffect(() => {
      getPopularManga()
    }, [page])

  // useEffect(()=>{
  //   console.log(topManga.length)
  // })
  



  // const fetchMoreManga = async()=>{
    
  //   PaginatApi(page)
  // }
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
   

  
  <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>


    </div>
  
</div>
);

}

export default Top