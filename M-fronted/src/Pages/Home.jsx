import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import {MangaCon} from '../Context/MangaContex.jsx'
import MangaContex from '../Component/MangaContex.jsx'
import Slider from "react-slick";
import { NavLink, Link } from 'react-router-dom'
import { assets } from "../assets/fronted/assets.js";
// import {} from '../assets/fronted/asset.js'




const Home = () => {

 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    customPaging: (i) => (
    <div className="text-black text-sm font-bold">
      {i + 1}   {/* show 1, 2, 3 instead of dots */}
    </div>
  ),
  dotsClass: "slick-dots custom-dots", // custom class for styling
  };

  //   const settings2 = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1
  // };

  const gridSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  rows: 3,
  slidesPerRow: 1,
  customPaging: (i) => (
    <div className="text-black text-sm font-bold">
      {i + 1}   {/* show 1, 2, 3 instead of dots */}
    </div>
  ),
  dotsClass: "slick-dots custom-dots", // custom class for styling
};


  const [mangaInfo,setMangaInfo] = useState([])
  const [TopManga,setTopManga] = useState([])
  const [recommended,setRecommended] = useState([])
   
  const {info} = useContext(MangaCon)

  useEffect(()=>{
    const info2 = info
    setMangaInfo(info2)
  },[])

  useEffect(()=>{
    const info3 = info.filter((item)=>item.popular).slice(0,10)
    setTopManga(info3)
    const info4 = info.filter((item)=>item.recommended).slice(0,10)
    setRecommended(info4)
  },[])

  return (
    
    <>
    <div className=''>
      <div>
        <div className='flex text-center justify-between items-center mt-10 mx-22 '>
            <Link to={'/top'}  className='text-2xl font-bold'>Popular Manga</Link>
            <div className="">
              <Link to={'/top'}>
            <img className="hover:scale-120 transition ease-in-out w-20 h-10" src={assets.arrow} alt="hello" />
            </Link>
            </div>
            </div>
           <Slider className='flex mt-10 mx-20 gap-5' {...settings}>
          
          {
            TopManga.map((items,index)=>(
              <MangaContex key={index} title={items.title} chapters={items.chapters} coverImage={items.coverImage} />
            ))
          }
        
        </Slider>
        </div>
        
        
          <div>
            <div className='flex text-center justify-between items-center mt-20 mx-22'>
             <Link   className='text-2xl font-bold'>Latest Chapters</Link>
             <img className="hover:scale-120 transition ease-in-out w-20 h-10" src={assets.arrow} alt="hello" />
             </div>
              <Slider className=' mt-10 mx-20 '  {...gridSettings}>
        {/* <div className='mt-20 mx-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  space-y-4 '> */}
        {
          mangaInfo.map((items,index)=>(
            <div className='px-2'>
            <MangaContex key={index} title={items.title} chapters={items.chapters} coverImage={items.coverImage}/>
            </div>
          ))
        }
        
    {/* </div> */}
    </Slider>
    
    </div>

    <div>
        <div className='flex text-center justify-between items-center mt-20 mx-22'>
            <Link to={'/recommend'}  className='text-2xl font-bold'>Recommended Manga</Link>
            <Link to={'/top'}>
            <img className="hover:scale-120 transition ease-in-out w-20 h-10" src={assets.arrow} alt="hello" />
            </Link>
            </div>
           <Slider className='flex mt-10 mx-20 gap-5' {...settings}>
          
          {
            recommended.map((items,index)=>(
              <MangaContex key={index} title={items.title} chapters={items.chapters} coverImage={items.coverImage} />
            ))
          }
        
        </Slider>
        </div>
     
    </div>
    </>
  )
}

export default Home