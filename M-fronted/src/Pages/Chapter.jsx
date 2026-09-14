// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { MangaCon } from '../Context/MangaContex.jsx'
// import { useContext } from 'react'
// import { toast } from 'react-toastify'
// import Comment from '../Component/ChildComment.jsx'

// const Chapter = () => {
//   const [chapter, setChapter] = useState(null)
//   const [totalChapter, setTotalChapter] = useState([])
//   const [comments, setComments] = useState([])
//   const [chapterType, setChamperType] = useState('Scroll')
//   const [commentText, setCommentText] = useState("")
//   const [refreshComments, setRefreshComments] = useState(false)
//   const [pageNo, setPageNo] = useState(1)
//   const { mangaId, chapterId, chapterNo } = useParams()
//   const navigate = useNavigate()
//   const [currentChapterNo, setCurrentChapterNo] = useState(null)

//   const { backendUrl, token } = useContext(MangaCon)

//   const handlePrev = () => {
//     setCurrentChapterNo((prev) => prev - 1)
//     setPageNo(1)
//   }

//   const handleNext = () => {
//     setCurrentChapterNo((prev) => prev + 1)
//     setPageNo(1)
//   }

//   const handleComment = async(e) => {
//     e.preventDefault
//     if(!token){
//       return toast.error("Login to add comment")
//     }
//     try{
//        const response = await axios.post( backendUrl + "/api/comment/add",{text:commentText,contentTypeId:chapterId},{headers:{ Authorization: `Bearer ${token}` }})
//        if(response.data.success){    
//         toast.success(response.data.message)
//         setRefreshComments((prev)=>!prev)
//        }
//        else{
//         toast.error(response.data.message)
//        }
//     }
//     catch(error){
//       console.log(error)
//     }
//   }

//   const getComments = async()=>{
//     try{
//       const response = await axios.get(backendUrl + `/api/comment/get/${chapterId}`)
//       if(response.data.success){
//         setComments(response.data.rootComments)
//       }
//       else{
//         toast.error(response.data.messsage)
//       }
//     }
//     catch(error){
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const getChapter = async () => {
//     try {
//       const response = await axios.get(backendUrl + `/api/chapter/${mangaId}/${currentChapterNo}`)
//       if (response.data.success) {
//         console.log(response, "This is response")
//         const chapter = response.data.chapter
//         const allChapter = response.data.totalChapters
//         setChapter(chapter)
//         setTotalChapter(allChapter)
//         navigate(
//   `/manga/${mangaId}/${chapter._id}/${chapter.chapterNo}`,
//   { replace: true }
// )
//       }

//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     getChapter()
//   }, [currentChapterNo])

//   useEffect(()=>{
//     getComments()
    
//   },[refreshComments, chapterNo])

//   useEffect(() => { document.body.style.overflow = "auto"; return () => { document.body.style.overflow = ""; }; }, []);

//   useEffect(() => {
//     console.log(chapter?.chapterPage?.length === pageNo, "Chapter no")
//   }, [chapter, totalChapter, chapterType, pageNo])

//   useEffect(() => { window.scrollTo(0, 0); }, [currentChapterNo]);

//   useEffect(() => {
//   setCurrentChapterNo(Number(chapterNo))
// }, [chapterNo])

//   return (
//     <div className="mt-10">
//       {
//         chapterType === "Page"
//           ?
//           <div className="max-w-5xl mx-auto px-4">
//             <div className="text-center mt-10 mb-8">
//               <p
//                 onClick={() => navigate(`/manga/${mangaId}`)}
//                 className="text-4xl font-semibold cursor-pointer hover:text-blue-500"
//               >
//                 {chapter?.managaId?.name}
//               </p>
//               <h1 className="text-2xl font-bold mt-3 mb-3">Chapter {currentChapterNo}</h1>
//               <h2 className="text-lg text-gray-600">{chapter?.name}</h2>
//             </div>

//             <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
//               <select
//                 value={currentChapterNo}
//                 onChange={(e) => setCurrentChapterNo(Number(e.target.value))}
//                 className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               >
//                 {totalChapter.map((ch, index) => (
//                   <option key={index} value={ch.chapterNo}>
//                     Chapter {ch.chapterNo}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 onChange={(e) => setChamperType(e.target.value)}
//                 value={chapterType}
//                 className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               >
//                 <option value="Scroll">Scroll</option>
//                 <option value="Page">Page</option>
//               </select>

//               <select
//                 onChange={(e) => setPageNo(Number(e.target.value))}
//                 value={pageNo}
//                 className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               >
//                 {chapter?.chapterPage.map((item, index) => (
//                   <option key={index} value={index + 1}>
//                     {index + 1}/{chapter?.chapterPage?.length}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex justify-center gap-4 mb-6">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentChapterNo === 1}
//                 className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//                   }`}
//               >
//                 Previous Chapter
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={currentChapterNo === totalChapter.length}
//                 className={`px-4 py-2 rounded-md text-white ${currentChapterNo === totalChapter.length
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//                   }`}
//               >
//                 Next Chapter
//               </button>
//             </div>

//             <div className="flex justify-center gap-4 mb-8">
//               <button
//                 onClick={() => setPageNo((prev) => prev - 1)}
//                 disabled={pageNo === 1}
//                 className={`px-4 py-2 rounded-md text-white ${pageNo === 1
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//                   }`}
//               >
//                 Previous Page
//               </button>

//               <button
//                 onClick={() => setPageNo((prev) => prev + 1)}
//                 disabled={pageNo === chapter?.chapterPage?.length}
//                 className={`px-4 py-2 rounded-md text-white ${pageNo === chapter?.chapterPage?.length
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//                   }`}
//               >
//                 Next Page
//               </button>
//             </div>

//             <div className="flex justify-center">
//               <img
//                 src={chapter?.chapterPage[pageNo - 1]}
//                 alt=""
//                 className="max-w-full rounded-lg shadow-lg"
//               />
//             </div>

//             <div className="text-center mt-16 space-y-10">
//               <div className='space-x-2'>
//                 <select
//                 value={currentChapterNo}
//                 onChange={(e) => setCurrentChapterNo(Number(e.target.value))}
//                 className="px-4 py-2 border rounded-md"
//               >
//                 {totalChapter.map((ch, index) => (
//                   <option key={index} value={ch.chapterNo}>
//                     Chapter {ch.chapterNo}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 onChange={(e) => setPageNo(Number(e.target.value))}
//                 value={pageNo}
//                 className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               >
//                 {chapter?.chapterPage.map((item, index) => (
//                   <option key={index} value={index + 1}>
//                     {index + 1}/{chapter?.chapterPage?.length}
//                   </option>
//                 ))}
//               </select>
//               </div>

//               <div className="flex justify-center gap-4 mb-6">
//                 <button
//                   onClick={handlePrev}
//                   disabled={currentChapterNo === 1}
//                   className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600"
//                     }`}
//                 >
//                   Previous Chapter
//                 </button>

//                 <button
//                   onClick={handleNext}
//                   disabled={currentChapterNo === totalChapter.length}
//                   className={`px-4 py-2 rounded-md text-white ${currentChapterNo === totalChapter.length
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600"
//                     }`}
//                 >
//                   Next Chapter
//                 </button>
//               </div>

//               <div className="flex justify-center gap-4 mb-8">
//               <button
//                 onClick={() => setPageNo((prev) => prev - 1)}
//                 disabled={pageNo === 1}
//                 className={`px-4 py-2 rounded-md text-white ${pageNo === 1
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//                   }`}
//               >
//                 Previous Page
//               </button>

//               <button
//                 onClick={() => setPageNo((prev) => prev + 1)}
//                 disabled={pageNo === chapter?.chapterPage?.length}
//                 className={`px-4 py-2 rounded-md text-white ${pageNo === chapter?.chapterPage?.length
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//                   }`}
//               >
//                 Next Page
//               </button>
//             </div>
//             </div>
//           </div>
//           :
//           <div className='md:max-w-5xl md:mx-auto md:px-4'>
//             <div className="text-center mt-10 mb-6">
//               <p onClick={() => navigate(`/manga/${mangaId}`)} className='text-4xl mb-4 font-semibold cursor-pointer'>{chapter?.managaId?.name}</p>
//               <h1 className="text-2xl font-bold mb-3">Chapter {currentChapterNo}</h1>
//               <h2 className="text-lg text-gray-600 mb-5">{chapter?.name}</h2>

//               <div className="flex justify-center items-center gap-4 mb-8">
//                 <select
//                   value={currentChapterNo}
//                   onChange={(e) => setCurrentChapterNo(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 >
//                   {totalChapter?.map((ch, index) => (
//                     <option key={index} value={ch.chapterNo}>
//                       Chapter {ch.chapterNo}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                   onChange={(e) => setChamperType(e.target.value)}
//                   value={chapterType}
//                 >
//                   <option value="Scroll">Scroll</option>
//                   <option value="Page">Page</option>
//                 </select>
//               </div>

//               <div className="flex justify-center gap-4 mt-2">
//                 <button
//                   onClick={() => setCurrentChapterNo((prev) => prev - 1)}
//                   disabled={currentChapterNo === 1}
//                   className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-blue-500 hover:bg-blue-600'
//                     }`}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentChapterNo((prev) => prev + 1)}
//                   disabled={currentChapterNo === totalChapter?.length}
//                   className={`px-4 py-2 rounded-md ${currentChapterNo === totalChapter?.length ?
//                     "bg-gray-400 cursor-not-allowed" :
//                     "bg-blue-500 hover:bg-blue-600 text-white"
//                     } `}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col">
//               {chapter?.chapterPage?.map((page, index) => (
//                 <img
//                   key={index}
//                   src={page}
//                   alt={`page-${index}`}
//                   className="w-full block"
//                 />
//               ))}
//             </div>

//             <div className=' text-center'>
//               <select
//                 value={currentChapterNo}
//                 onChange={(e) => setCurrentChapterNo(e.target.value)}
//                 className="px-4 py-2 mt-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
//               >
//                 {totalChapter && totalChapter
//                   .map((ch, index) => (
//                     <option key={index} value={ch.chapterNo}>
//                       Chapter {ch.chapterNo}
//                     </option>
//                   ))}
//               </select>

//               <div className="flex justify-center gap-4 mt-5">
//                 <button
//                   onClick={() => setCurrentChapterNo((prev) => prev - 1)}
//                   disabled={currentChapterNo === 1}
//                   className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-blue-500 hover:bg-blue-600'
//                     }`}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentChapterNo((prev) => prev + 1)}
//                   disabled={currentChapterNo === totalChapter?.length}
//                   className={`px-4 py-2 rounded-md ${currentChapterNo === totalChapter?.length ?
//                     "bg-gray-400 cursor-not-allowed" :
//                     "bg-blue-500 hover:bg-blue-600 text-white"
//                     } `}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//       }

//       <div className="flex flex-col justify-center rounded bg-white items-center mt-10">
//         <div className="flex justify-center mt-10 w-full px-4 sm:w-3/4 mx-auto">
//           <div className="flex items-center gap-3 w-full">
//             <input
//               onChange={(e)=>setCommentText(e.target.value)}
//               type="text"
//               value={commentText}
//               className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
//               placeholder="Write a comment..."
//             />
//             <button
//               onClick={handleComment}
//               className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//             >
//               Post
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 mb-2 mt-10">
//           <div className="flex items-center justify-center rounded-full w-8 h-8 bg-black text-white text-sm font-medium">
//             {comments.length}
//           </div>
//           <span className="text-gray-700 font-medium">Comments</span>
//         </div>

//         <hr className="border-black mb-10"/>

//         <div className="bg-white rounded-lg w-3/4 px-5 py-4 flex flex-col gap-3">
//           {comments.map(comment => (
//             <Comment
//               key={comment._id}
//               comment={comment}
//               depth={0}
//               mangaId={chapterId}
//               setRefreshComments={setRefreshComments}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Chapter























import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MangaCon } from '../Context/MangaContex.jsx'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import Comment from '../Component/ChildComment.jsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

  const selectClass = "px-4 py-2.5 rounded-full bg-[#1a0f26] border border-[#3d2456] text-[#e6d9f7] text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#8b3fd6] sm:hover:border-[#7a3fd6] transition-colors"

  const navBtnClass = (disabled) => `inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
    disabled
      ? "bg-[#1a0f26] text-[#4a4152] cursor-not-allowed"
      : "bg-[#8b3fd6] text-white active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6]"
  }`

  return (
    <div className="bg-black min-h-screen pb-24 ">
      {
        chapterType === "Page"
          ?
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center pt-6 mb-8">
              <p
                onClick={() => navigate(`/manga/${mangaId}`)}
                className="text-3xl sm:text-4xl font-black text-white cursor-pointer active:text-[#b98bff] sm:hover:text-[#b98bff] transition-colors"
                style={{ textShadow: '0 0 16px rgba(185,139,255,0.35)' }}
              >
                {chapter?.managaId?.name}
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-2">Chapter {currentChapterNo}</h1>
              <h2 className="text-sm sm:text-base text-[#8a7a9c]">{chapter?.name}</h2>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
              <select
                value={currentChapterNo}
                onChange={(e) => setCurrentChapterNo(Number(e.target.value))}
                className={selectClass}
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
                className={selectClass}
              >
                <option value="Scroll">Scroll</option>
                <option value="Page">Page</option>
              </select>

              <select
                onChange={(e) => setPageNo(Number(e.target.value))}
                value={pageNo}
                className={selectClass}
              >
                {chapter?.chapterPage.map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}/{chapter?.chapterPage?.length}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={handlePrev}
                disabled={currentChapterNo === 1}
                className={navBtnClass(currentChapterNo === 1)}
              >
                <ChevronLeft size={16} /> Previous Chapter
              </button>

              <button
                onClick={handleNext}
                disabled={currentChapterNo === totalChapter.length}
                className={navBtnClass(currentChapterNo === totalChapter.length)}
              >
                Next Chapter <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => setPageNo((prev) => prev - 1)}
                disabled={pageNo === 1}
                className={navBtnClass(pageNo === 1)}
              >
                <ChevronLeft size={16} /> Previous Page
              </button>

              <button
                onClick={() => setPageNo((prev) => prev + 1)}
                disabled={pageNo === chapter?.chapterPage?.length}
                className={navBtnClass(pageNo === chapter?.chapterPage?.length)}
              >
                Next Page <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={chapter?.chapterPage[pageNo - 1]}
                alt=""
                className="max-w-full rounded-xl border border-[#241834]"
              />
            </div>

            <div className="text-center mt-16 space-y-8">
              <div className='flex flex-wrap justify-center gap-3'>
                <select
                value={currentChapterNo}
                onChange={(e) => setCurrentChapterNo(Number(e.target.value))}
                className={selectClass}
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
                className={selectClass}
              >
                {chapter?.chapterPage.map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}/{chapter?.chapterPage?.length}
                  </option>
                ))}
              </select>
              </div>

              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={handlePrev}
                  disabled={currentChapterNo === 1}
                  className={navBtnClass(currentChapterNo === 1)}
                >
                  <ChevronLeft size={16} /> Previous Chapter
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentChapterNo === totalChapter.length}
                  className={navBtnClass(currentChapterNo === totalChapter.length)}
                >
                  Next Chapter <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => setPageNo((prev) => prev - 1)}
                disabled={pageNo === 1}
                className={navBtnClass(pageNo === 1)}
              >
                <ChevronLeft size={16} /> Previous Page
              </button>

              <button
                onClick={() => setPageNo((prev) => prev + 1)}
                disabled={pageNo === chapter?.chapterPage?.length}
                className={navBtnClass(pageNo === chapter?.chapterPage?.length)}
              >
                Next Page <ChevronRight size={16} />
              </button>
            </div>
            </div>
          </div>
          :
          <div className='md:max-w-5xl md:mx-auto md:px-4'>
            <div className="text-center pt-6 mb-6">
              <p onClick={() => navigate(`/manga/${mangaId}`)} className='text-3xl sm:text-4xl mb-4 font-black text-white cursor-pointer active:text-[#b98bff] sm:hover:text-[#b98bff] transition-colors' style={{ textShadow: '0 0 16px rgba(185,139,255,0.35)' }}>{chapter?.managaId?.name}</p>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Chapter {currentChapterNo}</h1>
              <h2 className="text-sm sm:text-base text-[#8a7a9c] mb-5">{chapter?.name}</h2>

              <div className="flex justify-center items-center gap-3 mb-8">
                <select
                  value={currentChapterNo}
                  onChange={(e) => setCurrentChapterNo(e.target.value)}
                  className={selectClass}
                >
                  {totalChapter?.map((ch, index) => (
                    <option key={index} value={ch.chapterNo}>
                      Chapter {ch.chapterNo}
                    </option>
                  ))}
                </select>

                <select
                  className={selectClass}
                  onChange={(e) => setChamperType(e.target.value)}
                  value={chapterType}
                >
                  <option value="Scroll">Scroll</option>
                  <option value="Page">Page</option>
                </select>
              </div>

              <div className="flex justify-center gap-3 mt-2">
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev - 1)}
                  disabled={currentChapterNo === 1}
                  className={navBtnClass(currentChapterNo === 1)}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev + 1)}
                  disabled={currentChapterNo === totalChapter?.length}
                  className={navBtnClass(currentChapterNo === totalChapter?.length)}
                >
                  Next <ChevronRight size={16} />
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

            <div className='text-center'>
              <select
                value={currentChapterNo}
                onChange={(e) => setCurrentChapterNo(e.target.value)}
                className={`${selectClass} mt-20 mb-4`}
              >
                {totalChapter && totalChapter
                  .map((ch, index) => (
                    <option key={index} value={ch.chapterNo}>
                      Chapter {ch.chapterNo}
                    </option>
                  ))}
              </select>

              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev - 1)}
                  disabled={currentChapterNo === 1}
                  className={navBtnClass(currentChapterNo === 1)}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  onClick={() => setCurrentChapterNo((prev) => prev + 1)}
                  disabled={currentChapterNo === totalChapter?.length}
                  className={navBtnClass(currentChapterNo === totalChapter?.length)}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
      }

      <div className="flex flex-col justify-center rounded-2xl bg-[#0f0a14] border border-[#241834] items-center mt-10 mx-4 sm:mx-6 p-5 sm:p-6">
        <div className="flex justify-center w-full sm:w-3/4 mx-auto">
          <div className="flex items-center gap-3 w-full">
            <input
              onChange={(e)=>setCommentText(e.target.value)}
              type="text"
              value={commentText}
              className="flex-1 px-4 py-3 rounded-xl bg-[#1a0f26] border border-[#3d2456] focus:ring-1 focus:ring-[#8b3fd6] focus:outline-none text-[#e6d9f7] placeholder-[#6b5a80] text-sm"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleComment}
              className="px-5 py-3 rounded-xl bg-[#8b3fd6] text-white text-sm font-semibold active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6] transition-colors flex-shrink-0"
            >
              Post
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 mt-8">
          <div className="flex items-center justify-center rounded-full w-7 h-7 bg-[#8b3fd6] text-white text-xs font-bold">
            {comments.length}
          </div>
          <span className="text-white font-semibold text-sm">Comments</span>
        </div>

        <div className="w-full sm:w-3/4 flex flex-col gap-3">
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