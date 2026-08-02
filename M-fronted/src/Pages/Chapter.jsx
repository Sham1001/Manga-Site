import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MangaCon } from '../Context/MangaContex.jsx'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import Comment from '../Component/ChildComment.jsx'

const Chapter = () => {
  const [chapter, setChapter] = useState(null)
  const [totalChapter, setTotalChapter] = useState([])
  const [comments, setComments] = useState([])
  const [chapterType, setChamperType] = useState('Scroll')
  const [commentText, setCommentText] = useState("")
  const [refreshComments, setRefreshComments] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const { mangaId, chapterId, chapterNo } = useParams()
  const navigate = useNavigate()
  const [currentChapterNo, setCurrentChapterNo] = useState(null)

  const { backendUrl, token } = useContext(MangaCon)

  const handlePrev = () => {
    setCurrentChapterNo((prev) => prev - 1)
    setPageNo(1)
  }

  const handleNext = () => {
    setCurrentChapterNo((prev) => prev + 1)
    setPageNo(1)
  }

  const handleComment = async(e) => {
    e.preventDefault
    if(!token){
      return toast.error("Login to add comment")
    }
    try{
       const response = await axios.post( backendUrl + "/api/comment/add",{text:commentText,contentTypeId:chapterId},{headers:{ Authorization: `Bearer ${token}` }})
       if(response.data.success){    
        toast.success(response.data.message)
        setRefreshComments((prev)=>!prev)
       }
       else{
        toast.error(response.data.message)
       }
    }
    catch(error){
      console.log(error)
    }
  }

  const getComments = async()=>{
    try{
      const response = await axios.get(backendUrl + `/api/comment/get/${chapterId}`)
      if(response.data.success){
        setComments(response.data.rootComments)
      }
      else{
        toast.error(response.data.messsage)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
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
        navigate(
  `/manga/${mangaId}/${chapter._id}/${chapter.chapterNo}`,
  { replace: true }
)
      }

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getChapter()
  }, [currentChapterNo])

  useEffect(()=>{
    getComments()
    
  },[refreshComments, chapterNo])

  useEffect(() => { document.body.style.overflow = "auto"; return () => { document.body.style.overflow = ""; }; }, []);

  useEffect(() => {
    console.log(chapter?.chapterPage?.length === pageNo, "Chapter no")
  }, [chapter, totalChapter, chapterType, pageNo])

  useEffect(() => { window.scrollTo(0, 0); }, [currentChapterNo]);

  useEffect(() => {
  setCurrentChapterNo(Number(chapterNo))
}, [chapterNo])

  return (
    <div className="mt-10">
      {
        chapterType === "Page"
          ?
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mt-10 mb-8">
              <p
                onClick={() => navigate(`/manga/${mangaId}`)}
                className="text-4xl font-semibold cursor-pointer hover:text-blue-500"
              >
                {chapter?.managaId?.name}
              </p>
              <h1 className="text-2xl font-bold mt-3 mb-3">Chapter {currentChapterNo}</h1>
              <h2 className="text-lg text-gray-600">{chapter?.name}</h2>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <select
                value={currentChapterNo}
                onChange={(e) => setCurrentChapterNo(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                {totalChapter.map((ch, index) => (
                  <option key={index} value={ch.chapterNo}>
                    Chapter {ch.chapterNo}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => setChamperType(e.target.value)}
                value={chapterType}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="Scroll">Scroll</option>
                <option value="Page">Page</option>
              </select>

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

            <div className="flex justify-center">
              <img
                src={chapter?.chapterPage[pageNo - 1]}
                alt=""
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="text-center mt-16 space-y-10">
              <div className='space-x-2'>
                <select
                value={currentChapterNo}
                onChange={(e) => setCurrentChapterNo(Number(e.target.value))}
                className="px-4 py-2 border rounded-md"
              >
                {totalChapter.map((ch, index) => (
                  <option key={index} value={ch.chapterNo}>
                    Chapter {ch.chapterNo}
                  </option>
                ))}
              </select>

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
            </div>
          </div>
          :
          <div className='md:max-w-5xl md:mx-auto md:px-4'>
            <div className="text-center mt-10 mb-6">
              <p onClick={() => navigate(`/manga/${mangaId}`)} className='text-4xl mb-4 font-semibold cursor-pointer'>{chapter?.managaId?.name}</p>
              <h1 className="text-2xl font-bold mb-3">Chapter {currentChapterNo}</h1>
              <h2 className="text-lg text-gray-600 mb-5">{chapter?.name}</h2>

              <div className="flex justify-center items-center gap-4 mb-8">
                <select
                  value={currentChapterNo}
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
                >
                  <option value="Scroll">Scroll</option>
                  <option value="Page">Page</option>
                </select>
              </div>

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
                value={currentChapterNo}
                onChange={(e) => setCurrentChapterNo(e.target.value)}
                className="px-4 py-2 mt-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
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

      <div className="flex flex-col justify-center rounded bg-white items-center mt-10">
        <div className="flex justify-center mt-10 w-full px-4 sm:w-3/4 mx-auto">
          <div className="flex items-center gap-3 w-full">
            <input
              onChange={(e)=>setCommentText(e.target.value)}
              type="text"
              value={commentText}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleComment}
              className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Post
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-2 mt-10">
          <div className="flex items-center justify-center rounded-full w-8 h-8 bg-black text-white text-sm font-medium">
            {comments.length}
          </div>
          <span className="text-gray-700 font-medium">Comments</span>
        </div>

        <hr className="border-black mb-10"/>

        <div className="bg-white rounded-lg w-3/4 px-5 py-4 flex flex-col gap-3">
          {comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              depth={0}
              mangaId={chapterId}
              setRefreshComments={setRefreshComments}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chapter
