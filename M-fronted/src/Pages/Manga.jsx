import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MangaCon } from "../Context/MangaContex.jsx";
import ChapterTime from '../Component/dateCalculation.jsx'
import { Link } from "react-router-dom";
import axios from "axios";
import { format, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks } from "date-fns"
import { toast } from "react-toastify";
import { Heart, MessageCircle, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import Comment from '../Component/ChildComment.jsx'
import SuggestManga from "../Component/SuggestManga.jsx"
import MangaContex from "../Component/MangaContex.jsx";
import { CommentComposer } from "../Component/CommentComposer.jsx";
import { CommentSort } from "../Component/CommentSort.jsx";
import { ReactionBar } from "../Component/ReactionBar.jsx";


const pluralize = (value, unit) => `${value} ${unit}${value !== 1 ? "s" : ""} ago`;

const Manga = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [chapterToShow, setChapterToShow] = useState(1)
  const [chapter, setChapter] = useState([])
  const [comments, setComments] = useState([])
  const [count, setCount] = useState(0)
  const [refreshComments, setRefreshComments] = useState(false)
  const [sortMode, setSortMode] = useState("new")

  const { id } = useParams();
  const { backendUrl, token, isFavorite, setClicked, currentUserId, bgChanger, setBgChanger } = useContext(MangaCon);
  const mangaId = id

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Login to add Favorete")
    try {
      const response = await axios.post(backendUrl + "/api/user/Favorites", { mangaId }, { headers: { Authorization: `Bearer ${token}` } })
      const response2 = await axios.get(backendUrl + `/api/manga/${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {
        toast(response.data.message)
        setClicked(prev => !prev)
      } else {
        toast.error(response.data.message)
      }

      if (response2.data.success) {
        setCount(response2?.data?.count)
      } else {
        toast.error(response2.data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * CommentComposer's internal state is still called "html" (it's the
   * sanitized spoiler-tagged content), but your backend's field is `text`
   * — mapped here at the call boundary so neither side needed renaming.
   */
  // const handleComment = async ({ html, imageUrl }) => {
  //   if (!token) return toast.error("Login to add comment")
  //   const formData = new FormData()
  //   formData.append("text", html)
  //   formData.append("contentTypeId", mangaId)
  //   if (imageFile) formData.append("image", imageFile)   // the File object itself


  //   try {
  //     // const response = await axios.post(
  //     //   backendUrl + "/api/comment/add",
  //     //   { text: html, imageUrl, contentTypeId: mangaId },
  //     //   { headers: { Authorization: `Bearer ${token}` } }
  //     // )
  //     const response = await axios.post(backendUrl + "/api/comment/add", formData, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     if (response.data.success) {
  //       toast.success(response.data.message)
  //       setRefreshComments((prev) => !prev)
  //     } else {
  //       toast.error(response.data.message)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }



  // Manga.jsx
  const handleComment = async ({ html, imageFile }) => {
    if (!token) return toast.error("Login to add comment");

    const formData = new FormData();
    formData.append("text", html);
    formData.append("contentTypeId", mangaId);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.post(backendUrl + "/api/comment/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {

        toast.success(response.data.message);
        setRefreshComments((prev) => !prev);
      } else {
        console.log(response)
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleReact = async (emoji) => {
    if (!token) return toast.error("Login to react")
    try {
      const response = await axios.post(
        `${backendUrl}/api/manga/react/${mangaId}`,
        { emoji },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        console.log("This is reaction", response.data)
        setData((prev) => ({
          ...prev,
          reactions: response.data.reactions,
          userReaction: response.data.userReaction,
        }))
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getComments = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/comment/get/${mangaId}`, {
        params: { sort: sortMode }
      })
      if (response.data.success) {
        setComments(response.data.rootComments)
      } else {
        toast.error(response.data.messsage)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const showChapter = () => {
    if (show) {
      setShow(prev => !prev)
      setChapterToShow(chapter.length)
    } else {
      setChapterToShow(1)
      setShow(prev => !prev)
    }
  }

  const getDate = (releaseDate) => {
    if (!releaseDate) return "";
    const release = new Date(releaseDate);
    const now = new Date();

    const seconds = differenceInSeconds(now, release);
    const minutes = differenceInMinutes(now, release);
    const hours = differenceInHours(now, release);
    const days = differenceInDays(now, release);
    const weeks = differenceInWeeks(now, release);

    if (seconds < 60) return pluralize(seconds, "sec");
    if (minutes < 60) return pluralize(minutes, "min");
    if (hours < 24) return pluralize(hours, "hour");
    if (days < 7) return pluralize(days, "day");
    if (weeks < 4) return pluralize(weeks, "week");

    return format(release, "d MMM yyyy");
  }

  const getMangaInfo = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/singleManga", { params: { mangaId } })
      if (response.data.success) {
        setData(response.data.mangaInfo)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTotalChapter = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/chapter/${mangaId}`)
      if (response.data.success) {
        setChapter(response?.data?.allChapter)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getComments()
  }, [refreshComments, mangaId, sortMode])

  useEffect(() => {
    getMangaInfo()
    getTotalChapter()
  }, [mangaId, count])

  return (
    <div className="relative bg-black min-h-screen pb-24">
      {
        bgChanger 
        ?
        <img
        src={data.coverImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-110 opacity-20 pointer-events-none "
      />
      :
      ""

      }
      <div className="relative z-10 pt-6 pb-16">
        {/* ...rest unchanged */}
        {data ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 leading-tight"
              style={{ textShadow: '0 0 16px rgba(185,139,255,0.35)' }}
            >
              {data.name}
            </h1>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

              {/* Cover */}
              <div className="relative bg-[#0f0a14] border border-[#241834] flex justify-center items-center rounded-2xl overflow-hidden">

                {/* Blurred background */}
                <img
                  src={data.coverImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-xs scale-110 opacity-70"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Main image */}
                <div className="relative w-full h-[300px] sm:h-[380px] flex justify-center items-center">
                  <img
                    src={data.coverImg}
                    alt={data.name}
                    className="w-full h-full object-contain z-10 rounded-full"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />
                </div>

              </div>

              {/* Details */}
              <div className="md:col-span-2 bg-[#0f0a14] border border-[#241834] rounded-2xl p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-sm">

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-1.5">Release</p>
                    <p className="text-[#e6d9f7]">{data?.date ? format(new Date(data?.date), "dd/MM/yyyy") : " - "}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-1.5">Status</p>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${data.ongoing == true
                      ? 'bg-[#2a4a2e] text-[#7ee08a]'
                      : 'bg-[#241834] text-[#8a7a9c]'
                      }`}>
                      {data.ongoing == true ? 'Ongoing' : "Completed"}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-1.5">Author(s)</p>
                    <Link to={`/search/category/subGenre/${data.authorName}`} className="text-[#e6d9f7]">{data.authorName}</Link>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-1.5">Artist(s)</p>
                    <p className="text-[#e6d9f7]">{data.artistName}</p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-2">Genre(s)</p>
                    <div className="flex flex-wrap gap-2">
                      {data?.genres?.map((genre, idx) => (
                        <Link to={`/search/${genre}`} key={idx} className="inline-block px-3 py-1 bg-[#1a0f26] border border-[#3d2456] text-[#c9bcdb] rounded-full text-xs font-medium">
                          {genre}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {data?.subGenres && data.subGenres.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-2">Sub-Genre(s)</p>
                      <div className="flex flex-wrap gap-2 ">
                        {data?.subGenres?.map((subGenre, idx) => (
                          <Link to={`http://localhost:5173/search/category/${subGenre}`} key={idx} className="inline-block px-3 py-1 bg-[#1a0f26] border border-[#3d2456] text-[#c9bcdb] rounded-full text-xs font-medium">
                            {subGenre}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-1.5">Type</p>
                    <p className="text-[#e6d9f7]">{data.type}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/manga/${id}/${chapter.at(chapter.length - 1)?._id}/${chapter.at(chapter.length - 1)?.chapterNo}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-[#8b3fd6] text-white text-sm font-semibold active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6] transition-colors"
                  >
                    <BookOpen size={15} /> Read First
                  </Link>
                  <Link
                    to={`/manga/${id}/${chapter.at(0)?._id}/${chapter.at(0)?.chapterNo}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-transparent border border-[#3d2456] text-[#e6d9f7] text-sm font-semibold active:bg-[#1a0f26] sm:hover:bg-[#1a0f26] transition-colors"
                  >
                    Read Last
                  </Link>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center gap-8 mt-6 pt-4 border-t border-[#241834] text-sm">
                  <div className="flex items-center gap-2 text-[#8a7a9c]">
                    <MessageCircle size={16} className="text-[#b98bff]" />
                    <span>Comments</span>
                    <span className="bg-[#1a0f26] border border-[#3d2456] px-2 py-0.5 rounded-full text-xs text-[#c9bcdb]">
                      {comments.length}
                    </span>
                  </div>
                  <button onClick={handleFavorite} className="flex items-center gap-2 active:scale-95 transition-transform">
                    <Heart
                      size={20}
                      className={isFavorite.includes(mangaId) ? "text-[#b98bff] fill-[#b98bff]" : "text-[#8a7a9c]"}
                    />
                    <span className="font-medium text-[#c9bcdb]">{data?.saved?.length}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 p-5 sm:p-6 bg-[#0f0a14] border border-[#241834] rounded-2xl">
              <h2 className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-3">Description</h2>
              <p className="text-[#c9bcdb] text-sm leading-relaxed whitespace-pre-line">{data.description}</p>
            </div>

            {/* Chapters */}
            <div className="mt-6 bg-[#0f0a14] border border-[#241834] rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-black text-white mb-4">Chapters</h2>

              <div className="divide-y divide-[#241834]">
                {chapter.length > 0 ? chapter.slice(0, chapterToShow).map((item) => (
                  <Link
                    key={item._id}
                    to={`/manga/${id}/${item._id}/${item.chapterNo}`}
                    className="flex justify-between items-center py-3.5 active:bg-[#1a0f26] sm:hover:bg-[#1a0f26] transition-colors rounded-lg px-2 -mx-2"
                  >
                    <p className="text-[#e6d9f7] font-semibold text-sm">
                      Chapter {item.chapterNo}
                    </p>
                    <p className="text-xs text-[#8a7a9c]">
                      {getDate(item.createdAt)}
                    </p>
                  </Link>
                )) : (
                  <div className="text-center py-12 border border-dashed border-[#3d2456] rounded-xl">
                    <p className="text-[#8a7a9c] text-sm">No chapters yet</p>
                  </div>
                )}
              </div>

              {chapter.length > 1 && (
                <button
                  onClick={showChapter}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent border border-[#3d2456] text-[#b98bff] text-xs font-semibold active:bg-[#1a0f26] sm:hover:bg-[#1a0f26] transition-colors"
                >
                  {show ? <>Show More <ChevronDown size={14} /></> : <>Show Less <ChevronUp size={14} /></>}
                </button>
              )}
            </div>

            {/* Comments */}
            <div className="mt-6 bg-[#0f0a14] border border-[#241834] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center rounded-full w-7 h-7 bg-[#8b3fd6] text-white text-xs font-bold">
                  {comments.length}
                </div>
                <span className="text-white font-semibold text-sm">Comments</span>
              </div>

              {/* Reacts to the manga itself, sits above the comment list/composer */}
              <ReactionBar
                reactions={data?.reactions || {}}
                userReaction={data?.userReaction}
                onReact={handleReact}
              />

              <CommentSort value={sortMode} onChange={setSortMode} />

              <CommentComposer onSubmit={handleComment} />

              <div className="flex flex-col gap-3">
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
        ) : (
          <div className="text-center mt-20 text-[#8a7a9c] text-sm z-50">
            Loading manga details...
          </div>
        )}

        <div className="mt-6">
          <SuggestManga genres={data?.genres} mangaId={mangaId} />
        </div>
      </div>
    </div>

  )
};

export default Manga;