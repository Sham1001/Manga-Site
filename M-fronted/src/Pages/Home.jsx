import React from 'react'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import {MangaCon} from '../Context/MangaContex.jsx'
import MangaContex from '../Component/MangaContex.jsx'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";




const Home = () => {

 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  const [mangaInfo,setMangaInfo] = useState([])
   
  const {info} = useContext(MangaCon)

  useEffect(()=>{
    const info2 = info.slice(0,12)
    setMangaInfo(info2)
  },[])

  return (
    
    <>
    <div className=''>
        
           <Slider className='flex mt-20 mx-20 gap-5' {...settings}>
          
          {
            mangaInfo.map((items,index)=>(
              <MangaContex key={index} title={items.title} chapters={items.chapters} />
            ))
          }
        
        </Slider>
        
        

    <div className='mt-20 mx-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  space-y-4 '>
        {
          mangaInfo.map((items,index)=>(
            <MangaContex key={index} title={items.title} chapters={items.chapters}/>
          ))
        }
    </div>
    </div>
    </>
  )
}

export default Home