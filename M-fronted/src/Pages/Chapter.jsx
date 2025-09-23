import React, { useEffect, useState } from 'react'
import { chapters } from '../assets/fronted/assets.js'
import { useParams, useNavigate } from 'react-router-dom'
import { info } from '../assets/fronted/assets.js'

const Chapter = () => {
  const [chapter, setChapter] = useState(null)
  const [totalChapter, setTotalChapter] = useState(null)
  const { mangaId, chapterNo } = useParams()
  const navigate = useNavigate()
  const pageNumber = parseInt(chapterNo, 10)

  const handleSelectChange = (e) => {
    const selected = e.target.value
    navigate(`/manga/${mangaId}/${selected}`)
  }

  useEffect(() => {
    setTotalChapter(info.find((item) => item.id == mangaId))
  }, [mangaId])

  useEffect(() => {
    const manga = chapters.find((items) => items.mangaId == mangaId)
    if (manga) {
      const selectChapter = manga.chapters.find(
        (items) => items.chapterNumber == chapterNo
      )
      setChapter(selectChapter)
    }
  }, [mangaId, chapterNo])

  if (!chapter || !totalChapter) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      
      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          disabled
          className="px-4 py-2 rounded-md bg-gray-400 text-white cursor-not-allowed"
        >
          Previous
        </button>
        <button
          disabled
          className="px-4 py-2 rounded-md bg-gray-400 text-white cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* No Chapter Available message */}
      <div className="text-gray-500 text-lg font-medium">
        No Chapter Available
      </div>
    </div>
  )
}


  const goNext = () => navigate(`/manga/${mangaId}/${pageNumber + 1}`)
  const goPrevious = () => {
    if (pageNumber > 1) navigate(`/manga/${mangaId}/${pageNumber - 1}`)
  }

  const chapterss = Array.from({ length: totalChapter.chapters }, (_, i) => i + 1)

  return (
    <div className="max-w-5xl mt-20 mx-auto p-4">
      {/* Header */}
      <div className="text-center mt-10 mb-6">
        <p onClick={()=>navigate(`/manga/${mangaId}`)} className='text-4xl mb-4 font-semibold cursor-pointer'>{totalChapter.title}</p>
        <h1 className="text-3xl font-bold mb-4">Chapter {pageNumber}</h1>

        {/* Chapter select */}
        <select
          value={pageNumber}
          onChange={handleSelectChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        >
          {chapterss
            .slice()
            .reverse()
            .map((ch) => (
              <option key={ch} value={ch}>
                Chapter {ch}
              </option>
            ))}
        </select>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={goPrevious}
            disabled={pageNumber === 1}
            className={`px-4 py-2 rounded-md text-white ${
              pageNumber === 1
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
          >
            Next
          </button>
        </div>
      </div>

      {/* Chapter title */}
      <h2 className="text-xl font-semibold mb-4">{chapter.title}</h2>

      {/* Chapter pages */}
      <div className="flex flex-col">
        {chapter.pages.map((page, index) => (
          <img
            key={index}
            src={page}
            alt={`page-${index}`}
            className="w-full block"
          />
        ))}
      </div>
    </div>
  )
}

export default Chapter
