import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MangaCon } from "../Context/MangaContex.jsx";
import Comments from "../Component/Comments.jsx"
import ChapterTime from '../Component/dateCalculation.jsx'
import { comment } from '../assets/fronted/assets.js'
import { Link } from "react-router-dom";
import axios from "axios";
import {format, differenceInDays, formatDistanceToNow} from "date-fns"


const Manga = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [commentInfo, setCommentInfo] = useState([])
  const [showMore, setShowMore] = useState(5)
  const [commentText, setCommentText] = useState("")
  const [sinManga, setSinManga] = useState({})
  const { id } = useParams();
  // const mangaDate = new Date(data?.date);
  const chapterArray = Array.from({length:20},(_,i)=>20-i)

  const { backendUrl } = useContext(MangaCon);


  const mangaId = id

  const handlePost = (e) => {
    e.preventDefault
    console.log(commentText)
  }

  

  const getDate = (releaseDate)=>{
    const release = new Date(releaseDate)

    const inDays = differenceInDays(new Date(), release )
    const getDateDiff = formatDistanceToNow(release, {addSuffix: true})

    return inDays > 7 
    ? format(release, "d MMM yyyy")
    : getDateDiff

  }

  const getMangaInfo = async()=>{
      try{
        const response = await axios.get(backendUrl+"/api/manga/singleManga",
          {params:{mangaId}}
        )
        
      if(response.data.success){
         const info = response.data.mangaInfo
         setData(info)
      }
      }
      catch(error){
        console.log(error)
      }
      
  }

   


  useEffect(()=>{
    getMangaInfo()
  },[])

  useEffect(()=>{
    console.log(data,"This is data")
  },[data])

  // useEffect(()=>{
  //   const intervel = setInterval(() => {
  //     setData(getDate(releaseDate))
  //   }, 6000);
  // },[])


  // useEffect(() => {
  //   setCommentInfo(comment)
  // }, [])

  // useEffect(() => {
  //   if (info) {
  //     const found = info.find((item) => String(item.id) === String(id));
  //     if (found) {
  //       setData(found);
  //     }
  //   }
  // }, [id, info]);

  // useEffect(() => {
  //   console.log("hello")

  //   // setSinManga(manga.find(one => one._id.toString() === mangaId.toString()))
  //   const found = manga.find(one=>one._id.toString() === mangaId.toString())
  //   setSinManga(found)
  //   if (sinManga) {
  //     console.log("MIl gaya")
  //   }
  //   else {
  //     console.log("Kaha gaya")
  //   }
  //  console.log("THis is :",sinManga)
  // }, [mangaId, manga])

  // useEffect(()=>{
  //   console.log("THis is :",sinManga)
  // },[])

  // const hande
  // lMore = () => {
  //   setShowMore((prev) => prev + 5)
  // }

  // const handlShowLess = () => {
  //   setShowMore(5)
  // }
  return (
    <>
      <div className="mt-40">
        {/* Main Info Section */}
        
            {data ?(
              <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-md shadow">
          {/* Title */}
          <h1 className="text-xl font-semibold text-blue-600 mb-6">
            {data.name}
          </h1>

          {/* Grid Content */}
          <div className="grid shadow-2xl grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Cover */}
            <div className="bg-white rounded-md shadow p-2">
              <img
                src={data.coverImg}
                alt={name.name}
                className="w-full h-[320px] object-fit"
              />
            </div>

            {/* Right: Info */}
            <div className="md:col-span-2 bg-white rounded-md p-6">
              {/* Rating */}
              {/* <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <span className="text-gray-800 font-medium">5</span>
              </div> */}

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-12 text-sm text-gray-700">
                {/* <div>
                  <p className="font-semibold text-gray-900">Rating</p>
                  <p>Average 5 / 5</p>
                </div> */}
                <div>
                  <p className="font-semibold text-gray-900">Release</p>
                  {/* <p>{data.date}</p> */}
                  <p>{ data?.date ? format(new Date(data?.date), "dd/MM/yyyy") : " - "}</p>
                 
                </div>

                {/* <div>
                  <p className="font-semibold text-gray-900">Alternative</p>
                  <p>"N/A"</p>
                </div> */}
                <div>
                  <p className="font-semibold text-gray-900">Status</p>
                  <p className="text-gray-900"> {data.status ? data.status : "-" }</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Author(s)</p>
                  <p>{data.authorName}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Artist(s)</p>
                  <p className=""> {data.artist ? data.artist : "-" }</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Genre(s)</p>
                  {/* <p><div>{
                  data?.genres?.map((items,index)(
                    <p>{items}</p>
                  ))
                  }</div></p> */}
                  {/* <div>
                    {
                      data.genres?.map((item,index)=>(
                        <p key={index}>{item},</p>
                      ))
                    }
                  </div> */}
                  <p>{data?.genres?.join(", ")}</p>

                </div>
                <div>
                  <p className="font-semibold text-gray-900">Type</p>
                  <p>{data.type}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  Read First
                </button>
                <button className="px-4 py-2 rounded bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200">
                  Read Last
                </button>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center gap-10 mt-6 border-t pt-4 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">💬</span>
                  <span>Comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">🔖</span>
                  <span>3.4K Users bookmarked This</span>
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
            {chapterArray.map((item)=>
              (
                <Link to={`/manga/${id}/${item}`}
                  // key={i}
                  className="flex justify-between items-center py-3 hover:bg-gray-50 transition cursor-pointer"
                >
                 
                  <p className="text-gray-800 font-medium">
                    Chapter {item}
                  </p>

                 
                  {/* <p className="text-gray-500 text-sm"><ChapterTime releaseDate={"2025-11-14T08:23:45.000Z"}/></p> */}
                  <p>
                      {
                        getDate("2025-11-14T08:23:45.000Z")
                      }
                  </p>
                </Link>
              )
            )}

            {/* {
              chapterArray.map((item)=>(
                <div key={item} >
                 <p>Chapter {item}</p>
                 <p>{}</p>
                </div>
              ))
            } */}
          </div>

          {data.chapters > 10 && (
            <button
              onClick={() => setShow((prev) => !prev)}
              className="mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              {show ? "Show Less" : "Show More"}
            </button>
          )}
          </div>
          <div className="flex flex-col justify-center m-49 rounded bg-white items-center  mt-10 ">
          <div className="flex justify-center   mt-10 w-3/4 mx-auto">
            <div className="flex items-center gap-3 w-full">
              <input
                onChange={(e)=>setCommentText(e.target.value)}
                type="text"
                value={commentText}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                placeholder="Write a comment..."
              />
              <button
                onClick={handlePost}
                className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Post
              </button>
            </div>


          </div>
          <div className="flex items-center gap-3 mb-2 mt-10  ">
            <div className="flex items-center justify-center rounded-full w-8 h-8 bg-black text-white text-sm font-medium">
              {commentInfo.length}
            </div>
            <span className="text-gray-700 font-medium">Comments</span>
            
          </div>
          <hr className=" border-black  mb-10"/>
          




          <div className="bg-white rounded-lg w-3/4 px-5 py-4 flex flex-col gap-3">



            {
              (commentInfo.slice(0, showMore)).map((items, index) => (

                <Comments key={index} avatar={items.user.avatar} username={items.user.username} text={items.text} />
              ))

            }

            <div>
              {showMore < commentInfo.length ? (
                <button
                  // onClick={handelMore}
                  className="px-4 py-2 rounded my-4 w-30 font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Show more
                </button>
              ) : (
                commentInfo.length > 5 && (
                  <button
                    // onClick={handlShowLess}
                    className="px-4 py-2 rounded my-4 w-30 font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Show less
                  </button>
                )
              )}
            </div>


          </div>
        </div>

        </div> 
            ):
             (
              <div className="text-center mt-20 text-gray-500 text-lg">
            Loading manga details...
          </div>
             )
          }
          
        

        {/* Chapters Section */}

      </div>
    </>
  )
  // : (
  //   <div className="text-center mt-20 text-gray-500 text-lg">No data</div>
  // );

};

export default Manga;
