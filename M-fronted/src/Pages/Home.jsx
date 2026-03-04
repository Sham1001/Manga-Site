import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { MangaCon } from '../Context/MangaContex.jsx'
import MangaContex from '../Component/MangaContex.jsx'
import Slider from "react-slick";
import { NavLink, Link } from 'react-router-dom'
import { assets } from "../assets/fronted/assets.js";
import { Backend } from "firebase/ai";
import axios from "axios";
// import {} from '../assets/fronted/asset.js'




const Home = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    slidesToShow: 3,
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

  


  // const [mangaInfo,setMangaInfo] = useState([])
  const [popular, setPopular] = useState([])
  const [recommended, setRecommended] = useState([])
  const [latest, setLatest] = useState([])
  const [page, setPage] = useState(1)

  const { token, PaginatApi, backendUrl } = useContext(MangaCon)



  // useEffect(()=>{
  //   const info2 = info.slice()
  //   setMangaInfo(info2)
  //   console.log(token)
  //   console.log(manga)
  // },[])

  // useEffect(()=>{
  //   const info3 = info.filter((item)=>item.popular).slice(0,10)
  //   setTopManga(info3)
  //   const info4 = info.filter((item)=>item.recommended).slice(0,10)
  //   setRecommended(info4)
  // },[])

  //   useEffect(()=>{
  //     console.log("token is ",token)

  //     const load = async()=>{
  //          const popularManga = await PaginatApi({sort:"popular",page})
  //         // const latestManga = await PaginatApi({page})
  //         // const recommended = await PaginatApi({sort:"Recommended"})

  //         setPopular(popularManga)
  //         // setLatestInfo(latestManga)
  //         // setRecommended(recommended)
  //     }
  //     load()
  //     console.log(popular,"This")
  //     // setRecommended(manga.filter(rec=>rec.Recommended === true))
  //     // setPopular(manga.filter(pop=>pop.popular===true))
  //   },[])
  //   useEffect(() => {
  //   console.log("Popular updated:", popular);
  // }, [popular]);

  const getPopularManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { sort: 'popular' } })
      if (response.data.success) {
        const popularManga = response.data.pageInfo
        setPopular(popularManga)
      }
    }
    catch (error) {
      console.log(error, "Error in popular manga")
    }

    // setPopular(popularManga)
  }


  const getLatestManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { limit: 24 } })
      if (response.data.success) {
        const latestManga = response.data.pageInfo
        setLatest(latestManga)
      }
    }
    catch (error) {
      console.log(error, "Error in popular manga")
    }

    // setPopular(popularManga)
  }


  const getRecommendedManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { sort: 'Recommended' } })
      if (response.data.success) {
        const recommendedManga = response.data.pageInfo
        setRecommended(recommendedManga)

      }
    }
    catch (error) {
      console.log(error, "Error in popular manga")
    }

    // setPopular(popularManga)
  }

  useEffect(() => {
    getPopularManga()
  }, [])

  useEffect(() => {
    getRecommendedManga()
  }, [])

  useEffect(() => {
    getLatestManga()
  }, [])

  return (

    <>
      <div className=''>
        <div>
          <div className='flex text-center justify-between items-center mt-25 mx-22 '>
            <Link to={'/top'} className='text-2xl font-bold'>Popular Manga</Link>
            <div className="">
              <Link to={'/top'}>
                <img className="hover:scale-120 transition ease-in-out w-20 h-10" src={assets.arrow} alt="hello" />
              </Link>
            </div>
          </div>
          <Slider className='flex mx-20 gap-5' {...settings}>

            {
              popular.map((items, index) => (
                <MangaContex key={index} name={items.name} chapters={items.chapters} coverImg={items.coverImg} id={items._id} favorite={items.favorites} />
              ))
            }

          </Slider>
        </div>


        <div>
          <div className='flex text-center justify-between items-center mt-20 mx-22'>
            <Link className='text-2xl font-bold'>Latest Chapters</Link>
            <img className="hover:scale-120 transition ease-in-out w-20 h-10" src={assets.arrow} alt="hello" />
          </div>
          <Slider className='mx-20' {...gridSettings}>
            {latest.map((items) => (
              <div className='px-2' key={items._id}>
                <MangaContex
                  name={items.name}
                  chapters={items.chapters}
                  coverImg={items.coverImg}
                  id={items._id}
                  favorite={items.favorites}
                />
              </div>
            ))}
          </Slider>

        </div>

        <div>
          <div className='flex text-center justify-between items-center mt-20 mx-22'>
            <Link to={'/recommend'} className='text-2xl font-bold'>Recommended Manga</Link>
            <Link to={'/top'}>
              <img className="hover:scale-120 transition ease-in-out w-20 h-10" src={assets.arrow} alt="hello" />
            </Link>
          </div>
          <Slider className='flex  mx-20 gap-5' {...settings}>

            {
              recommended.map((items, index) => (
                <MangaContex key={index} name={items.name} chapters={items.chapters} coverImg={items.coverImg} id={items._id} favorites={items.favorite} />
              ))
            }

          </Slider>
        </div>

      </div>
    </>
  )
}

export default Home