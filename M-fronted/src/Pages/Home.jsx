import React, { useState, useEffect, useRef, useContext } from 'react'
import { MangaCon } from '../Context/MangaContex.jsx'
import MangaContex from '../Component/MangaContex.jsx'
import { Link } from 'react-router-dom'
import { assets } from "../assets/fronted/assets.js"
import axios from "axios"


const RowSlider = ({ items, isFavorite, setClicked }) => {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const [clonedItems, setClonedItems] = useState([])

  useEffect(() => {
    if (!items.length) return
    const createClonedItems = () => {
      const clones = []
      for (let i = 0; i < 4; i++) {
        clones.push(...items.map((item, idx) => ({ ...item, cloneId: `${item._id}-${i}-${idx}` })))
      }
      setClonedItems(clones)
    }
    createClonedItems()
  }, [items])

  useEffect(() => {
    if (!clonedItems.length) return
    const track = trackRef.current
    if (!track) return

    const getItemWidth = () => {
      const firstItem = track.querySelector('.slider-item')
      if (firstItem) return firstItem.offsetWidth + 16
      return 180
    }

    let itemWidth = getItemWidth()
    let originalSetWidth = items.length * itemWidth

    const handleResize = () => {
      itemWidth = getItemWidth()
      originalSetWidth = items.length * itemWidth
    }

    window.addEventListener('resize', handleResize)

    const step = () => {
      if (!pausedRef.current && originalSetWidth > 0) {
        posRef.current += 0.8
        if (posRef.current >= originalSetWidth) {
          posRef.current -= originalSetWidth
          track.style.transform = `translateX(-${posRef.current}px)`
        } else {
          track.style.transform = `translateX(-${posRef.current}px)`
        }
      }
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [clonedItems, items.length])

  if (!items.length) return null

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div ref={trackRef} className="flex gap-4 w-max" style={{ willChange: 'transform' }}>
        {clonedItems.map((item, index) => (
          <div key={item.cloneId || `${item?._id}-${index}`} className="w-44 flex-shrink-0 slider-item">
            <MangaContex
              setClicked={setClicked}
              name={item?.manga?.name}
              coverImg={item?.manga?.coverImg}
              id={item?.manga?._id}
              isFavorite={isFavorite}
              // ✅ Support both flat and nested chapter structures
              chapter1={item?.latestChapters?.[0]?.chapterNo ?? item?.chapterNo}
              chapter2={item?.latestChapters?.[1]?.chapterNo ?? item?.chapterNo2}
              createdAt1={item?.latestChapters?.[0]?.createdAt ?? item?.createdAt}
              createdAt2={item?.latestChapters?.[1]?.createdAt ?? item?.createdAt2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  const [popular, setPopular] = useState([])
  const [recommended, setRecommended] = useState([])
  const [latestGrid, setLatestGrid] = useState([])
  const [page, setPage] = useState(1)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(12)
  const [totalPage, setTotalPage] = useState(1)

  const { backendUrl, isFavorite, setClicked } = useContext(MangaCon)

  const getPopularManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo", { params: { sort: 'popular' } })
      console.log("POPULAR DATA:", response.data) 
      if (response.data.success) setPopular(response.data.popularManga)
    } catch (error) {
      console.log(error, "Error in popular manga")
    }
  }

  const getLatestManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo", {
        params: {
          limit: 30,
          page: page,
          sort: 'Latest'
        }
      })
      console.log("LATEST DATA:", response.data) 
      if (response.data.success) {
        
        setLatestGrid(response.data.latestChapters)
        setTotalPage(Math.ceil(response.data.latestChapters?.length / 12))
      }
    } catch (error) {
      console.log(error, "Error in latest manga")
    }
  }

  const getRecommendedManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo", { params: { sort: 'Recommended' } })
      if (response.data.success) setRecommended(response?.data?.pageInfo)
    } catch (error) {
      console.log(error, "Error in recommended manga")
    }
  }

  const handlePrev = () => {
    setPage(prev => prev - 1)
    setStart(prev => prev - 12)
    setEnd(prev => prev - 12)
  }

  const handleNext = () => {
    setPage(prev => prev + 1)
    setStart(prev => prev + 12)
    setEnd(prev => prev + 12)
  }

  useEffect(() => {
    getPopularManga()
    getRecommendedManga()
    getLatestManga()
  }, [])

  return (
    <div className="pb-20">

      {/* Popular */}
      <div className="mt-12">
        <div className="flex justify-between items-center mx-5 mb-4">
          <Link to="/top" className="text-2xl font-bold">Popular Manga</Link>
          <Link to="/top">
            <img className="hover:scale-110 transition ease-in-out w-20 h-10" src={assets.arrow} alt="" />
          </Link>
        </div>
        <RowSlider items={popular} isFavorite={isFavorite} setClicked={setClicked} />
      </div>

      {/* Latest */}
      <div className="mt-16 mx-10">
        <div className="flex justify-between items-center mx-5 mb-4">
          <span className="text-2xl font-bold">Latest Chapters</span>
          <Link to={"/latest"}>
            <img className="hover:scale-110 transition ease-in-out w-20 h-10" src={assets.arrow} alt="" />
          </Link>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mb-6'>
          {latestGrid.slice(start, end).map((item) => (
            <div key={item?.manga?._id}>
              <MangaContex
                setClicked={setClicked}
                name={item?.manga?.name}
                coverImg={item?.manga?.coverImg}
                id={item?.manga?._id}
                isFavorite={isFavorite}
                // ✅ Nested latestChapters array
                chapter1={item?.latestChapters?.[0]?.chapterNo}
                chapter2={item?.latestChapters?.[1]?.chapterNo}
                createdAt1={item?.latestChapters?.[0]?.createdAt}
                createdAt2={item?.latestChapters?.[1]?.createdAt}
              />
            </div>
          ))}
        </div>

        <div className='flex flex-1 justify-center items-center gap-6'>
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-xl font-semibold ${
              page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            Prev
          </button>
          <span className="font-medium text-gray-700">{page} / {totalPage}</span>
          <button
            onClick={handleNext}
            disabled={page === totalPage}
            className={`px-4 py-2 rounded-xl font-semibold ${
              page === totalPage ? "bg-gray-300 cursor-not-allowed" : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Recommended */}
      <div className="mt-16">
        <div className="flex justify-between items-center mx-5 mb-4">
          <Link to="/recommend" className="text-2xl font-bold">Recommended Manga</Link>
          <Link to="/top">
            <img className="hover:scale-110 transition ease-in-out w-20 h-10" src={assets.arrow} alt="" />
          </Link>
        </div>
        <RowSlider items={recommended} isFavorite={isFavorite} setClicked={setClicked} />
      </div>

    </div>
  )
}

export default Home