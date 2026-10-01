import React, { useState, useEffect, useRef, useContext } from 'react'
import { MangaCon } from '../Context/MangaContex.jsx'
import MangaContex from '../Component/MangaContex.jsx'
import { Link } from 'react-router-dom'
import { assets } from "../assets/fronted/assets.js"
import axios from "axios"


const HeroSkeleton = () => (
  <div className="h-56 sm:h-72 md:h-80 mx-4 sm:mx-6 rounded-2xl bg-[#0f0a14] border border-[#241834] animate-pulse" />
)

const HeroSlider = ({ items, loading }) => {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const slides = items.slice(0, 5)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const idx = Math.round(track.scrollLeft / track.clientWidth)
        setActive(idx)
        ticking = false
      })
    }
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [slides.length])

  if (loading) return <HeroSkeleton />
  if (!slides.length) return null

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth mx-4 sm:mx-6 rounded-2xl"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
      {slides.map((item, i) => (
  <Link
    key={item?.manga?._id ?? i}
    to={`/manga/${item?.manga?._id}`}
    className="relative flex-shrink-0 snap-start overflow-hidden"
    style={{ minWidth: '100%' }}
  >
    <div className="relative h-80 sm:h-72 md:h-80">
      <img
        src={item?.manga?.coverImg || "https://picsum.photos/800/500"}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end gap-3 sm:gap-4">
        {/* small poster thumbnail */}
        <img
          src={item?.manga?.coverImg || "https://picsum.photos/800/500"}
          alt=""
          className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg object-cover object-top border border-white/15 shadow-xl shadow-black/50 flex-shrink-0"
          loading="lazy"
        />

        <div className="min-w-0 flex-1">
          <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-1.5">
            Popular this week
          </span>
          <h2
            className="text-lg sm:text-2xl md:text-3xl font-black text-white mb-1.5 leading-tight truncate"
            style={{ textShadow: '0 0 16px rgba(185,139,255,0.35)' }}
          >
            {item?.manga?.name}
          </h2>
          <p
            className="text-xs sm:text-sm text-[#c9bcdb] mb-3 max-w-md hidden sm:block"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {item?.manga?.description || "Dive into the story and see what everyone's reading right now."}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8b3fd6] text-white text-xs sm:text-sm font-semibold px-4 py-2 active:bg-[#7a3fd6]">
            Read now
          </span>
        </div>
      </div>
    </div>
  </Link>
))}
      </div>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      {slides.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-[#b98bff]' : 'w-1.5 bg-[#3d2456]'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section header — small violet eyebrow + white title with a faint  */
/*  glow, plus a pill "see all" link. Flat and cheap, no blur filter. */
/* ------------------------------------------------------------------ */
const SectionHeader = ({ eyebrow, title, to }) => (
  <div className="flex justify-between items-end px-4 sm:px-6 mb-3 sm:mb-4">
    <div className="min-w-0">
      <span className="block text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-0.5">
        {eyebrow}
      </span>
      <Link
        to={to}
        className="inline-block text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight active:text-[#b98bff] sm:hover:text-[#b98bff] transition-colors"
        style={{ textShadow: '0 0 14px rgba(185,139,255,0.35)' }}
      >
        {title}
      </Link>
    </div>
    <Link
      to={to}
      className="flex items-center gap-1 shrink-0 rounded-full bg-transparent border border-[#3d2456] px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-[#b98bff] active:bg-[#1a0f26] sm:hover:bg-[#1a0f26] transition-colors"
    >
      See all
      <img className="w-3.5 h-3.5 opacity-80" src={assets.arrow} alt="" />
    </Link>
  </div>
)

/* ------------------------------------------------------------------ */
/*  Skeleton placeholders shown while a section's data is loading     */
/* ------------------------------------------------------------------ */
const CardSkeleton = () => (
  <div className="w-32 sm:w-40 flex-shrink-0 animate-pulse snap-start">
    <div className="w-full aspect-[2/3] rounded-lg bg-[#120d18] border border-[#241834]" />
    <div className="h-2.5 w-4/5 bg-[#120d18] rounded mt-2.5" />
    <div className="h-2.5 w-1/2 bg-[#120d18] rounded mt-2" />
  </div>
)

const RowSkeleton = () => (
  <div className="flex gap-3 px-4 sm:px-6 overflow-hidden">
    {Array.from({ length: 6 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
)

const GridSkeleton = () => (
  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mb-6">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="w-full aspect-[2/3] rounded-lg bg-[#120d18] border border-[#241834]" />
        <div className="h-2.5 w-4/5 bg-[#120d18] rounded mt-2.5" />
        <div className="h-2.5 w-1/2 bg-[#120d18] rounded mt-2" />
      </div>
    ))}
  </div>
)

const EmptyState = ({ label }) => (
  <div className="mx-4 sm:mx-6 rounded-xl border border-dashed border-[#3d2456] bg-[#0f0a14] py-10 text-center">
    <p className="text-[#8a7a9c] text-sm">Nothing in {label} yet — check back soon.</p>
  </div>
)

/* ------------------------------------------------------------------ */
/*  Row — plain horizontally-scrollable row with scroll-snap. No JS   */
/*  animation loop, so it costs nothing on the main thread and a      */
/*  thumb can flick through it naturally.                             */
/* ------------------------------------------------------------------ */
const Row = ({ items, isFavorite, setClicked, loading, emptyLabel }) => {
  if (loading) return <RowSkeleton />
  if (!items.length) return <EmptyState label={emptyLabel} />

  return (
    <div
      className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex gap-3 px-4 sm:px-6 w-max">
        {items.map((item, index) => (
          <div
            key={item?._id ?? index}
            className="w-32 sm:w-40 flex-shrink-0 snap-start"
          >
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
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
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

  const [loadingPopular, setLoadingPopular] = useState(true)
  const [loadingRecommended, setLoadingRecommended] = useState(true)
  const [loadingLatest, setLoadingLatest] = useState(true)

  const { backendUrl, isFavorite, setClicked } = useContext(MangaCon)

  const getPopularManga = async () => {
    try {
      setLoadingPopular(true)
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo", { params: { sort: 'popular' } })
      if (response.data.success) setPopular(response.data.popularManga)
    } catch (error) {
      console.log(error, "Error in popular manga")
    } finally {
      setLoadingPopular(false)
    }
  }

  const getLatestManga = async () => {
    try {
      setLoadingLatest(true)
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo", {
        params: {
          limit: 30,
          page: page,
          sort: 'Latest'
        }
      })
      if (response.data.success) {
        setLatestGrid(response.data.latestChapters)
        setTotalPage(Math.ceil(response.data.latestChapters?.length / 12))
      }
    } catch (error) {
      console.log(error, "Error in latest manga")
    } finally {
      setLoadingLatest(false)
    }
  }

  const getRecommendedManga = async () => {
    try {
      setLoadingRecommended(true)
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo", { params: { sort: 'Recommended' } })
      if (response.data.success) setRecommended(response?.data?.pageInfo)
    } catch (error) {
      console.log(error, "Error in recommended manga")
    } finally {
      setLoadingRecommended(false)
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
    <div className="bg-black min-h-screen pb-16 sm:pb-24">

      {/* Hero */}
      <div className="pt-4 sm:pt-6">
        <HeroSlider items={popular} loading={loadingPopular} />
      </div>

      {/* Popular */}
      <div className="mx-2 mt-8 sm:mt-12">
        <SectionHeader eyebrow="Trending now" title="Popular Manga" to="/top" />
        <Row
          items={popular}
          isFavorite={isFavorite}
          setClicked={setClicked}
          loading={loadingPopular}
          emptyLabel="Popular Manga"
        />
      </div>

      {/* Latest */}
      <div className="mt-10 sm:mt-14">
        <SectionHeader eyebrow="Fresh off the press" title="Latest Chapters" to="/latest" />

        <div className="px-4 sm:px-6">
          {loadingLatest ? (
            <GridSkeleton />
          ) : latestGrid.length === 0 ? (
            <EmptyState label="Latest Chapters" />
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mb-6'>
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
          )}

          {!loadingLatest && latestGrid.length > 0 && (
            <div className='flex justify-center items-center gap-3'>
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`min-w-[44px] min-h-[44px] px-4 rounded-full text-sm font-semibold border transition-colors ${
                  page === 1
                    ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
                    : "border-[#3d2456] text-[#e6d9f7] active:bg-[#8b3fd6] active:border-[#8b3fd6] active:text-white sm:hover:bg-[#1a0f26]"
                }`}
              >
                ← Prev
              </button>
              <span className="text-sm font-semibold text-[#8a7a9c] tabular-nums px-1">
                {page} <span className="text-[#4a4152]">/</span> {totalPage}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPage}
                className={`min-w-[44px] min-h-[44px] px-4 rounded-full text-sm font-semibold border transition-colors ${
                  page === totalPage
                    ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
                    : "border-[#3d2456] text-[#e6d9f7] active:bg-[#8b3fd6] active:border-[#8b3fd6] active:text-white sm:hover:bg-[#1a0f26]"
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recommended */}
      <div className="mt-10 sm:mt-14">
        <SectionHeader eyebrow="Picked for you" title="Recommended Manga" to="/recommend" />
        <Row
          items={recommended}
          isFavorite={isFavorite}
          setClicked={setClicked}
          loading={loadingRecommended}
          emptyLabel="Recommended Manga"
        />
      </div>

    </div>
  )
}

export default Home