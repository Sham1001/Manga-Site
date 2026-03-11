import React, { useEffect, useState } from 'react'
import { chapters } from '../assets/fronted/assets.js'
import { useParams, useNavigate } from 'react-router-dom'
import { info } from '../assets/fronted/assets.js'
import axios from 'axios'
import { MangaCon } from '../Context/MangaContex.jsx'
import { useContext } from 'react'

const Chapter = () => {
  const [chapter, setChapter] = useState(null)
  const [totalChapter, setTotalChapter] = useState([])
  const [chapterType, setChamperType] = useState('Scroll')
  const [pageNo, setPageNo] = useState(1)
  const { mangaId, chapterNo } = useParams()
  const navigate = useNavigate()
  const chpNo = parseInt(chapterNo, 10)
  const [currentChapterNo, setCurrentChapterNo] = useState(chpNo)
  // let puraChaptere = totalChapter.length

  const { backendUrl } = useContext(MangaCon)


  const handlePrev = () => {
    setCurrentChapterNo((prev) => prev - 1)
    setPageNo(1)
  }

  const handleNext = () => {
    setCurrentChapterNo((prev) => prev + 1)
    setPageNo(1)
  }




  const getChapter = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/chapter/${mangaId}/${currentChapterNo}`)
      if (response.data.success) {
        console.log(response, "This is response")
        const chapter = response.data.chapter
        const allChapter = response.data.totalChapters
        setChapter(chapter)
        setTotalChapter(allChapter)
        navigate(`/manga/${mangaId}/${currentChapterNo}`)
      }

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getChapter()
    }, 200)
  }, [currentChapterNo, chapterType])

  useEffect(() => { document.body.style.overflow = "auto"; return () => { document.body.style.overflow = ""; }; }, []);

  useEffect(() => {
    // console.log(chapter,'This is chapter')
    // console.log(totalChapter,"This is total")
    // console.log(chapterType,"Type of chater")
    console.log(chapter?.chapterPage?.length === pageNo, "Chapter no")
  }, [chapter, totalChapter, chapterType, pageNo])

  useEffect(() => { window.scrollTo(0, 0); }, [currentChapterNo]);


  // const handleSelectChange = (e) => {
  //    setCurrentChapterNo(e.target.value)
  //   //  navigate(`/manga/${mangaId}/${currentChapterNo}`)


  // }

  // useEffect(() => {
  //   setTotalChapter(info.find((item) => item.id == mangaId))
  // }, [mangaId])

  // useEffect(() => {
  //   const manga = chapters.find((items) => items.mangaId == mangaId)
  //   if (manga) {
  //     const selectChapter = manga.chapters.find(
  //       (items) => items.chapterNumber == chapterNo
  //     )
  //     setChapter(selectChapter)
  //   }
  // }, [mangaId, chapterNo])

  //   if (!chapter.length === 0 || !totalChapter === 0) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-full p-4">

  //       {/* Navigation buttons */}
  //       <div className="flex justify-center gap-4 mb-6">
  //         <button
  //           disabled
  //           className="px-4 py-2 rounded-md bg-gray-400 text-white cursor-not-allowed"
  //         >
  //           Previous
  //         </button>
  //         <button
  //           disabled
  //           className="px-4 py-2 rounded-md bg-gray-400 text-white cursor-not-allowed"
  //         >
  //           Next
  //         </button>
  //       </div>

  //       {/* No Chapter Available message */}
  //       <div className="text-gray-500 text-lg font-medium">
  //         No Chapter Available
  //       </div>
  //     </div>
  //   )
  // }


  // const goNext = () => navigate(`/manga/${mangaId}/${pageNumber + 1}`)
  // const goPrevious = () => {
  //   if (pageNumber > 1) navigate(`/manga/${mangaId}/${pageNumber - 1}`)
  // }

  // const chapterss = Array.from({ length: totalChapter.chapters }, (_, i) => i + 1)

  return (




    <div className="max-w-5xl mt-10 mx-auto p-4">

      {
        chapterType === "Page"

          ?

          <div className="max-w-5xl mx-auto px-4">

            {/* Header */}
            <div className="text-center mt-10 mb-8">
              <p
                onClick={() => navigate(`/manga/${mangaId}`)}
                className="text-4xl font-semibold cursor-pointer hover:text-blue-500"
              >
                {chapter?.managaId?.name}
              </p>

              <h1 className="text-2xl font-bold mt-3 mb-3">Chapter {chpNo}</h1>
              <h2 className="text-lg text-gray-600">{chapter?.name}</h2>
            </div>


            {/* Controls */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">

              {/* Chapter select */}
              <select
                value={chpNo}
                onChange={(e) => setCurrentChapterNo(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                {totalChapter.map((ch, index) => (
                  <option key={index} value={ch.chapterNo}>
                    Chapter {ch.chapterNo}
                  </option>
                ))}
              </select>


              {/* View Mode */}
              <select
                onChange={(e) => setChamperType(e.target.value)}
                value={chapterType}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="Scroll">Scroll</option>
                <option value="Page">Page</option>
              </select>


              {/* Page select */}
              <select
                onChange={(e) => setPageNo(Number(e.target.value))}
                value={pageNo}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                {chapter?.chapterPage.map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}/{chapter?.chapterPage?.length}
                  </option>
                ))}
              </select>

            </div>


            {/* Chapter Navigation */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={handlePrev}
                disabled={currentChapterNo === 1}
                className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                Previous Chapter
              </button>

              <button
                onClick={handleNext}
                disabled={currentChapterNo === totalChapter.length}
                className={`px-4 py-2 rounded-md text-white ${currentChapterNo === totalChapter.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                Next Chapter
              </button>
            </div>


            {/* Page Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setPageNo((prev) => prev - 1)}
                disabled={pageNo === 1}
                className={`px-4 py-2 rounded-md text-white ${pageNo === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                Previous Page
              </button>

              <button
                onClick={() => setPageNo((prev) => prev + 1)}
                disabled={pageNo === chapter?.chapterPage?.length}
                className={`px-4 py-2 rounded-md text-white ${pageNo === chapter?.chapterPage?.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                Next Page
              </button>
            </div>


            {/* Manga Image */}
            <div className="flex justify-center">
              <img
                src={chapter?.chapterPage[pageNo - 1]}
                alt=""
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>


            {/* Bottom Chapter Navigation */}
            <div className="text-center mt-16 space-y-10">

              <select
                value={chpNo}
                onChange={(e) => setCurrentChapterNo(e.target.value)}
                className="px-4 py-2 border rounded-md"
              >
                {totalChapter.map((ch, index) => (
                  <option key={index} value={ch.chapterNo}>
                    Chapter {ch.chapterNo}
                  </option>
                ))}
              </select>

              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={handlePrev}
                  disabled={currentChapterNo === 1}
                  className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                  Previous Chapter
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentChapterNo === totalChapter.length}
                  className={`px-4 py-2 rounded-md text-white ${currentChapterNo === totalChapter.length
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                  Next Chapter
                </button>
              </div>

            </div>

          </div>
          :
          <div className='max-w-5xl mx-auto px-4'>
            <div className="text-center mt-10 mb-6">
              <p onClick={() => navigate(`/manga/${mangaId}`)} className='text-4xl mb-4 font-semibold cursor-pointer'>{chapter?.managaId?.name}</p>
              <h1 className="text-2xl font-bold mb-3">Chapter {chpNo}</h1>
              <h2 className="text-lg text-gray-600 mb-5">{chapter?.name}</h2>

              {/* Chapter select */}

              <div className="flex justify-center items-center gap-4 mb-8">

                <select
                  value={chpNo}
                  onChange={(e) => setCurrentChapterNo(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  {totalChapter?.map((ch, index) => (
                    <option key={index} value={ch.chapterNo}>
                      Chapter {ch.chapterNo}
                    </option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  onChange={(e) => setChamperType(e.target.value)}
                  value={chapterType}
                  name=""
                  id=""
                >
                  <option value="Scroll">Scroll</option>
                  <option value="Page">Page</option>
                </select>

              </div>




              {/* {   chapterType === "Scroll" ? */}

              {/* Navigation buttons */}
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev - 1)}
                  disabled={currentChapterNo === 1}
                  className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev + 1)}
                  disabled={currentChapterNo === totalChapter?.length}
                  className={`px-4 py-2 rounded-md ${currentChapterNo === totalChapter?.length ?
                    "bg-gray-400 cursor-not-allowed" :
                    "bg-blue-500 hover:bg-blue-600 text-white"

                    } `}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Chapter title */}


            {/* Chapter pages */}


            <div className="flex flex-col">
              {chapter?.chapterPage?.map((page, index) => (
                <img
                  key={index}
                  src={page}
                  alt={`page-${index}`}
                  className="w-full block"
                />
              ))}
            </div>













            <div className=' text-center'>
              <select
                value={chpNo}
                onChange={(e) => setCurrentChapterNo(e.target.value)}
                className="px-4 py-2 mt-20 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              >
                {totalChapter && totalChapter
                  .map((ch, index) => (
                    <option key={index} value={ch.chapterNo}>
                      Chapter {ch.chapterNo}
                    </option>
                  ))}

              </select>



              <div className="flex justify-center gap-4 mt-5">
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev - 1)}
                  disabled={currentChapterNo === 1}
                  className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev + 1)}
                  disabled={currentChapterNo === totalChapter?.length}
                  className={`px-4 py-2 rounded-md ${currentChapterNo === totalChapter?.length ?
                    "bg-gray-400 cursor-not-allowed" :
                    "bg-blue-500 hover:bg-blue-600 text-white"

                    } `}
                >
                  Next
                </button>
              </div>
            </div>
          </div>


      }









    </div>
  )
}

export default Chapter
