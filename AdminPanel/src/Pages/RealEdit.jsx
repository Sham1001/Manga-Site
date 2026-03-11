import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {format} from "date-fns"
import upload_area from '../assets/upload_area.png'

const RealEdit = ({backendUrl}) => {

    const {mangaId} = useParams()
    const [data, setData] = useState({}) 
    const [edit, setEdit] = useState(false)
    const [img, setImg] = useState(false)
    const [date, setDate] = useState('')
    const [genres,setGenres] = useState([])
    const [status, setStatus] = useState('Ongoing')
    const [author, setAuthor] = useState('')
    const [artist, setArtist] = useState('')
    const [description, setDescription] = useState('')



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
        console.log(date,"This is edit")
      },[date])


  return (
    <div className="mt-15">
        {/* Main Info Section */}
        
            {data ?(
              <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-md shadow">
          {/* Title */}
          <div className='flex justify-between'>
            {
                edit ?
                
                    <input className='borer border-2 border-green-600 sm:w-60 md:w-100 lg:w-2xl rounded-2xl ' type="text"  placeholder='Enter Manga Name...' />
                        
                :
                <h1 className="text-xl font-semibold text-blue-600 mb-6">
            {data.name}
          </h1>
            }

          <div className='flex gap-5'>
            <h1 onClick={()=>setEdit((prev)=>!prev)} className='text-xl font-semibold text-green-600 mb-6'>
            Edit
          </h1>
          <h1 className='text-xl font-semibold text-red-600 mb-6'>
            Delete
          </h1>
          </div>
          </div>

          {/* Grid Content */}
          <div className="grid shadow-2xl grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Cover */}
           {
            edit ?
             <div className="bg-white rounded-md shadow p-2 space-y-5">
                <img
                              src={img ? URL.createObjectURL(img) :  upload_area}
                              alt="cover"
                              className="w-48 h-60 object-cover rounded-lg shadow-md border"
                            />
                <label className='text-black px-2 py-2 bg-green-600 rounded-2xl' > Upload
              <input 
              type="file"
              id='Img'
              accept="image/*"
              required
              hidden 
              onChange={(e)=>setImg(e.target.files[0])}
              />
              </label>
            </div>
            :
             <div className="bg-white rounded-md shadow p-2">
              <img
                src={data.coverImg}
                alt={name.name}
                className="w-full h-[320px] object-fit"
              />
            </div>
           }

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
              {
                edit ?
                  <div>
                  <p className="font-semibold text-gray-900">Release</p>
                  {/* <p>{data.date}</p> */}
                  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                 
                </div>
                :
                  <div>
                  <p className="font-semibold text-gray-900">Release</p>
                  {/* <p>{data.date}</p> */}
                  <p>{ data?.date ? format(new Date(data?.date), "dd/MM/yyyy") : " - "}</p>
                 
                </div>
              }

                {/* <div>
                  <p className="font-semibold text-gray-900">Alternative</p>
                  <p>"N/A"</p>
                </div> */}
              {
                edit
                ?
                  <div>
                  <p className="font-semibold text-gray-900">Status</p>
                  <select onChange={(e)=>setStatus(e.target.value)} value={status} name="" id="">
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                :
                  <div>
                  <p className="font-semibold text-gray-900">Status</p>
                  <p className="text-gray-900"> {data.status ? data.status : "-" }</p>
                </div>
              }

                {
                    edit
                    ?
                    <div>
                  <p className="font-semibold text-gray-900">Author(s)</p>
                  <input onChange={(e)=>setAuthor(e.target.value)}  value={author} className='border-2 ' type="text" />
                </div>
                :
                <div>
                  <p className="font-semibold text-gray-900">Author(s)</p>
                  <p>{data.authorName}</p>
                </div>
                }
               {
                edit
                ?
                 <div>
                  <p className="font-semibold text-gray-900">Artist(s)</p>
                   <input onChange={(e)=>setArtist(e.target.value)}  value={artist} className='border-2 ' type="text" />
                </div>
                :
                 <div>
                  <p className="font-semibold text-gray-900">Artist(s)</p>
                  <p className=""> {data.artist ? data.artist : "-" }</p>
                </div>
               }

                {
                    edit
                    ?
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
                  {/* <p>{data?.genres?.join(", ")}</p> */}
                  <input type="text" />

                </div>
                :
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
                }
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

          
          {
            edit
            ?
            <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-lg text-gray-800 leading-relaxed text-justify">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <input onChange={(e)=>setDescription(e.target.value)}  value={description} className='border-2 ' type="text" />
          </div>
          :
          <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-lg text-gray-800 leading-relaxed text-justify">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="whitespace-pre-line">{data.description}</p>
          </div>
          }

          

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
  )
}

export default RealEdit