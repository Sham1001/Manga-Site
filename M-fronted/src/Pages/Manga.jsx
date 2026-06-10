import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MangaCon } from "../Context/MangaContex.jsx";
import Comments from "../Component/Comments.jsx"
import ChapterTime from '../Component/dateCalculation.jsx'
import { Link } from "react-router-dom";
import axios from "axios";
import { format, differenceInDays, formatDistanceToNow } from "date-fns"
import { toast } from "react-toastify";
import Comment from '../Component/ChildComment.jsx'
import SuggestManga from "../Component/SuggestManga.jsx"
import MangaContex from "../Component/MangaContex.jsx";


const Manga = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [chapterToShow, setChapterToShow] = useState(1)
  const [chapter, setChapter] = useState([])
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  const [count, setCount] = useState(0)
  const [refreshComments, setRefreshComments] = useState(false)
  
  const { id } = useParams();


  const { backendUrl, token, isFavorite, setClicked } = useContext(MangaCon);
  

  const mangaId = id


  const handleFavorite = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Login to add Favorete")
        ()
    }

    try {
      
      const response = await axios.post(backendUrl + "/api/user/Favorites", { mangaId }, { headers: { Authorization: `Bearer ${token}` } })

      const response2 = await axios.get(backendUrl + `/api/manga/${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {
       
        toast(response.data.message)
        console.log(response.data.user,"This is fav")


        
      

        setClicked(prev => !prev)

      }
      else {
        toast.error(response.data.message)
        
      }

      if (response2.data.success) {
        setCount(response2?.data?.count)
        console.log(response2.data.countDone,"This is count")
        


      }
      else {
        toast.error(response2.data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };


  const handleComment = async (e) => {
    e.preventDefault()
    if (!token) {
      return toast.error("Login to add comment")
    }
    try {
      const response = await axios.post(backendUrl + "/api/comment/add", { text: commentText, contentTypeId: mangaId }, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        toast.success(response.data.message)
        setRefreshComments((prev) => !prev)
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const getComments = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/comment/get/${mangaId}`)
      if (response.data.success) {
        setComments(response.data.rootComments)
      }
      else {
        toast.error(response.data.messsage)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  const showChapter = () => {
    if (show) {
      setShow(prev => !prev)
      setChapterToShow(chapter.length)
    }
    else {
      setChapterToShow(1)
      setShow(prev => !prev)
    }

  }




  const getDate = (releaseDate) => {
    const release = new Date(releaseDate)

    const inDays = differenceInDays(new Date(), release)
    const getDateDiff = formatDistanceToNow(release, { addSuffix: true })

    return inDays > 7
      ? format(release, "d MMM yyyy")
      : getDateDiff

  }

  const getMangaInfo = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/singleManga",
        { params: { mangaId } }
      )

      if (response.data.success) {
        const info = response.data.mangaInfo
        setData(info)
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  const getTotalChapter = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/chapter/${mangaId}`)

      if (response.data.success) {
        setChapter(response?.data?.allChapter)
      }
    }
    catch (error) {
      console.log(error)
    }
  }





  useEffect(() => {
    getComments()
  }, [refreshComments, mangaId])

  useEffect(() => {
    getMangaInfo()
    getTotalChapter()
    // getCount()
    

  }, [mangaId,count])


  
  return (
    <>
      <div className="mt-15 mb-40 ">
        {/* Main Info Section */}

        {data ? (
          <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-md shadow">
            {/* Title */}
            <h1 className="text-xl font-semibold text-blue-600 mb-6 ">
              {data.name}
            </h1>

            {/* Grid Content */}
            <div className="grid shadow-2xl bg-gray-50 grid-cols-1 md:grid-cols-3 gap-6">
             
              <div className="bg-white  flex justify-center items-center rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={data.coverImg}
                    alt={data.name}
                    className="w-full h-[340px] object-contain hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

           
              <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
               
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-sm text-gray-700">
                
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">📅 Release</p>
                    {/* <p>{data.date}</p> */}
                    <p className="text-gray-600">{data?.date ? format(new Date(data?.date), "dd/MM/yyyy") : " - "}</p>

                  </div>

                 
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">📖 Status</p>
                    <p className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${data.ongoing == true ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}> 
                      {data.ongoing == true ? 'Ongoing' : "Completed"}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">✍️ Author(s)</p>
                    <p className="text-gray-600">{data.authorName}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">🎨 Artist(s)</p>
                    <p className="text-gray-600"> {data.artistName}</p>
                  </div>

                  {/* Genres Section */}
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-900 mb-2">🏷️ Genre(s)</p>
                    <div className="flex flex-wrap gap-2">
                      {data?.genres?.map((genre, idx) => (
                        <span key={idx} className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sub-Genres Section */}
                  {data?.subGenres && data.subGenres.length > 0 && (
                    <div className="col-span-2">
                      <p className="font-semibold text-gray-900 mb-2">🔖 Sub-Genre(s)</p>
                      <div className="flex flex-wrap gap-2">
                        {data?.subGenres?.map((subGenre, idx) => (
                          <span key={idx} className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                            {subGenre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">📌 Type</p>
                    <p className="text-gray-600">{data.type}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Link to={`/manga/${id}/${chapter.at(chapter.length - 1)?._id}/${chapter.at(chapter.length - 1)?.chapterNo}`} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
                    📖 Read First
                  </Link>
                  <Link to={`/manga/${id}/${chapter.at(0)?._id}/${chapter.at(0)?.chapterNo}`} className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all border border-gray-200">
                    🔄 Read Last
                  </Link>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center gap-10 mt-6 pt-4 border-t border-gray-100 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-lg">💬</span>
                    <span>Comments</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{comments.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleFavorite} className="text-2xl hover:scale-110 transition-transform">
                      {isFavorite.includes(mangaId) ? '❤️' : '🤍'}
                    </button>
                    
                    <span className="font-medium">{data?.saved?.length}</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-lg text-gray-800 leading-relaxed text-justify">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="whitespace-pre-line">{data.description}</p>
            </div>

            <div className="max-w-6xl mt-10 bg-white rounded-lg shadow p-6 mx-auto ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapters</h2>

              <div className="divide-y">
                {chapter.length > 0 ? chapter.slice(0, chapterToShow).map((item) =>
                (
                  <Link key={item._id} to={`/manga/${id}/${item._id}/${item.chapterNo}`}
                    className="flex justify-between items-center py-3 hover:bg-gray-50 transition cursor-pointer"
                  >

                    <p className="text-gray-800 font-medium">
                      Chapter {item.chapterNo}
                    </p>


                  
                    <p>
                      {
                        getDate(`${item.createdAt}`)
                      }
                    </p>
                  </Link>
                )
                )
                  :
                  <h1 className="text-center text-gray-400 text-lg font-semibold py-12 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                    📭 No chapters yet
                  </h1>
                }

                
              </div>

              {chapter.length > 1 && (
                <button
                  onClick={showChapter}
                  className="mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                  {show ? "Show More" : "Show Less"}
                </button>
              )}
            </div>
            <div className="flex flex-col justify-center  rounded bg-white items-center  mt-10 ">
              <div className="flex justify-center mt-10 w-full px-4 sm:w-3/4 mx-auto">
                <div className="flex items-center gap-3 w-full">
                  <textarea
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    rows={1}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 resize-none overflow-y-auto max-h-28"
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
              <div className="flex items-center gap-3 mb-2 mt-10  ">
                <div className="flex items-center justify-center rounded-full w-8 h-8 bg-black text-white text-sm font-medium">
                  {comments.length}
                </div>
                <span className="text-gray-700 font-medium">Comments</span>

              </div>
              <hr className=" border-black  mb-10" />





              <div className="bg-white rounded-lg w-full sm:w-3/4 px-5 py-4 flex flex-col gap-3">




                {comments.map(comment => (
                 
                     <Comment
                    key={comment._id}
                    comment={comment}
                    depth={0}
                    mangaId={mangaId}
                    setRefreshComments={setRefreshComments}
                  />
                
                 
                ))}


              </div>
            </div>

          </div>
        ) :
          (
            <div className="text-center mt-20 text-gray-500 text-lg">
              Loading manga details...
            </div>
          )
        }

        <div >

          <SuggestManga genres={data?.genres} mangaId={mangaId} />

        </div>



        

      </div>
    </>
  )
  

};

export default Manga;