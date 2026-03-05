import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MangaCon } from "../Context/MangaContex.jsx";
import Comments from "../Component/Comments.jsx"
import { comment } from '../assets/fronted/assets.js'
import { Link } from "react-router-dom";
import axios from "axios";

const Manga = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [commentInfo, setCommentInfo] = useState([])
  const [showMore, setShowMore] = useState(5)
  const [commentText, setCommentText] = useState("")
  const [sinManga, setSinManga] = useState({})
  const { id } = useParams();

  const { info, manga, backendUrl } = useContext(MangaCon);


  const mangaId = id

  const handlePost = (e) => {
    e.preventDefault
    console.log(commentText)
  }



  const getMangaInfo = async()=>{
      try{
        const response = await axios.get(backendUrl+"/api/manga/singleManga")
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
  },[])


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
     
    </>
  )
  // : (
  //   <div className="text-center mt-20 text-gray-500 text-lg">No data</div>
  // );

};

export default Manga;
