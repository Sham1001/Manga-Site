import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { add, format, formatDate } from "date-fns"
import upload_area from '../assets/upload_area.png'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

// import { editManga } from '../../../Backend/controllers/mangaController'

const RealEdit = ({ backendUrl }) => {

  const { mangaId } = useParams()
  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)
  const [img, setImg] = useState(false)
  const [mangaName, setMangaName] = useState('')
  const [date, setDate] = useState('')
  const [author, setAuthor] = useState('')
  const [artist, setArtist] = useState('')
  const [type, setType] = useState('Manga')
  const [genres, setGenres] = useState([])
  const [showGenres, setShowGenres] = useState(false)
  const [status, setStatus] = useState(false)
  const formData = new FormData()
  

  const [description, setDescription] = useState('')
 


  const getMangaInfo = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/singleManga",
        { params: { mangaId } }
      )

      if (response.data.success) {
        console.log(response?.data?.mangaInfo?.genres)
        const info = response.data.mangaInfo
        setData(info)
        setGenres(response?.data?.mangaInfo?.genres)
      }
    }
    catch (error) {
      console.log(error)
    }

  }


  const handleEdit = async(e)=>{
    e.preventDefault()
    try{

        
        if(mangaName.trim()){
          formData.append("name", mangaName)
        }
        if(author.trim()){
          formData.append("authorName", author)
        }
        if(artist.trim()){
           formData.append("artistName", artist)
        }
        if(date){
           formData.append("date", date)
        }
        if(img){
          formData.append("coverImg", img)
        }
        if(type){
          formData.append("type", type)
        }
        if(description.trim()){
          formData.append('description',description)
        }
        if(genres.length > 0){
           genres.forEach(genres=>formData.append('genres',genres))
        }
        if(genres.length == 0){
            return toast.error("Genres can't be empty")
        }
        if(status){
          formData.append("ongoing",status)
        }
        if(mangaId){
          formData.append("mangaId", mangaId)
        }

        
        const response = await axios.patch(backendUrl+"/api/manga/edit", formData)
        if(response.data.success){
            // const updatedData = response?.data?.update
            // setData(updatedData)
            console.log(response.data.update)
            toast.success("Edited Successfully")
        }
    }
    catch(error){
      console.log(error)
      toast.error("There is some issue, Please try again later")
    }

  }


  const deleteManga = async()=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed)
  {
    try{
        const response = await axios.delete(backendUrl + '/api/manga/delete',
          {
            params:{mangaId}
          }
        )

        if(response.data.success){
          // toast.success("Manga deleted successfully")
          Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
    

        }
    }
    catch(error){
      console.log(error)
      toast.error(error)
    }

  }
  
});
    // alert("Do you really want to delet the manga")
    
  }


  // const genresFilter = (e) => {
  //   const varGenre = genres.filter((items) => items != e)
  //   setGenres(varGenre)
  // }


  const addGenres = (item) => {
    if (genres.includes(item)) {
      toast("It already in the genre")
    }
    else {
      setGenres((prev) => [...prev, item])
    }
  }

  const forStatus=(e)=>{
      if(e.target.value==="false"){
          setStatus(false)
      }
      else{
        setStatus(true)
      }
  }


  useEffect(() => {
    getMangaInfo()
    

    console.log(type, "This is edit")
  }, [])


  useEffect(()=>{
    console.log(genres)
  },[genres])


  // useEffect(()=>{

  //   if(Object.keys(formData).length != 0){
  //     handleEdit()
  //   }
  // },[data])


  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh] mb-10">
      {data ? (
        <div className="max-w-6xl mx-auto mt-6 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">

          {/* Title */}
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>

            {
              edit ?

                <input
                  className='border-2 border-green-500 focus:border-green-600 outline-none px-4 py-2 rounded-xl w-full md:max-w-md text-base sm:text-lg'
                  type="text"
                  value={mangaName}
                  onChange={(e)=>setMangaName(e.target.value)}
                  placeholder='Enter Manga Name...'
                />

                :

                <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
                  {data.name}
                </h1>

            }

            <div className='flex gap-5 text-base sm:text-lg font-semibold'>
              <h1
                onClick={() => setEdit((prev) => !prev)}
                className='text-green-600 cursor-pointer hover:text-green-700 transition'
              >
                {edit == true ? "Back" : "Edit"}
              </h1>

              <h1 onClick={deleteManga} className='text-red-500 cursor-pointer hover:text-red-600 transition'>
                Delete
              </h1>
            </div>

          </div>


          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 bg-gray-50 rounded-xl p-4 sm:p-6 shadow-xl">

            {/* Cover */}
            {
              edit ?

                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-4">

                  <img
                    src={img ? URL.createObjectURL(img) : upload_area}
                    alt="cover"
                    className="w-36 sm:w-44 md:w-48 h-52 sm:h-60 md:h-64 object-cover rounded-lg shadow"
                  />

                  <label className='text-white px-5 py-2 bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer text-sm font-medium transition'>
                    Upload
                    <input
                      type="file"
                      id='Img'
                      accept="image/*"
                      hidden
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </label>

                </div>

                :

                <div className="bg-white rounded-xl shadow p-3 flex justify-center">

                  <img
                    src={data.coverImg}
                    alt={name.name}
                    className="w-36 sm:w-44 md:w-full max-w-[240px] h-52 sm:h-64 md:h-[320px] object-cover rounded-md"
                  />

                </div>
            }


            {/* Info */}
            <div className="md:col-span-2 bg-white rounded-xl shadow p-4 sm:p-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-sm text-gray-700">

                {/* Release */}
                {
                  edit ?

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Release</p>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full"
                      />
                    </div>

                    :

                    <div>
                      <p className="font-semibold text-gray-900">Release</p>
                      <p>{data?.date ? format(new Date(data?.date), "dd/MM/yyyy") : " - "}</p>
                    </div>

                }


                {/* Status */}
                {
                  edit ?

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Status</p>
                      <select
                        onChange={(e)=>forStatus(e)}
                        value={status}
                        className="border rounded-md px-2 py-1 w-full"
                      >
                        <option value="false">Ongoing</option>
                        <option value="true">Completed</option>
                      </select>
                    </div>

                    :

                    <div>
                      <p className="font-semibold text-gray-900">Status</p>
                      <p>{data.status ? data.status : "-"}</p>
                    </div>

                }


                {/* Author */}
                {
                  edit ?

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Author(s)</p>
                      <input
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                        className='border rounded-md px-2 py-1 w-full'
                        type="text"
                      />
                    </div>

                    :

                    <div>
                      <p className="font-semibold text-gray-900">Author(s)</p>
                      <p>{data.authorName}</p>
                    </div>

                }


                {/* Artist */}
                {
                  edit ?

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Artist(s)</p>
                      <input
                        onChange={(e) => setArtist(e.target.value)}
                        value={artist}
                        className='border rounded-md px-2 py-1 w-full'
                        type="text"
                      />
                    </div>

                    :

                    <div>
                      <p className="font-semibold text-gray-900">Artist(s)</p>
                      <p>{data.artist ? data.artist : "-"}</p>
                    </div>

                }


                {/* Genres */}
                {
                  edit ?

                    <div className="sm:col-span-2 w-full">
                      <p className="font-semibold text-gray-900 mb-2">Genre(s)</p>

                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-3'>
                        {
                          genres?.map((item, index) => (
                            <button
                              onClick={() => setGenres(genres.filter((items) => items != item))}
                              className='px-3 py-1.5 text-sm sm:text-base border-2 text-white border-green-400 bg-green-400 rounded-full hover:bg-red-500 hover:border-red-500 transition duration-200 break-words'
                              key={index}
                            >
                              <p className="truncate">{item}</p>
                            </button>
                          ))
                        }
                      </div>

                      <div className='mt-2'>
                        <p
                          onClick={() => setShowGenres((prev) => !prev)}
                          className='text-sm sm:text-base text-blue-500 cursor-pointer hover:underline mb-2'
                        >
                          Add Genres+
                        </p>

                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3'>
                          {
                            showGenres
                              ?
                              ["Action", "Romance", "Sci-Fi", "Adventure", "Fighting"].map((item, index) => (
                                <button
                                  onClick={() => addGenres(item)}
                                  className='px-3 py-1.5 text-sm sm:text-base border-2 text-white border-blue-400 bg-blue-400 rounded-full hover:bg-green-500 hover:border-green-500 transition duration-200 break-words'
                                  key={index}
                                >
                                  <p className="truncate">{item}</p>
                                </button>
                              ))
                              :
                              ""
                          }
                        </div>
                      </div>

                    </div>

                    :

                    <div className="sm:col-span-2">
                      <p className="font-semibold text-gray-900">Genre(s)</p>
                      <p className="break-words text-sm sm:text-base leading-relaxed">
                        {data?.genres?.join(", ")}
                      </p>
                    </div>
                }


                {/* Type */}
                {
                  edit ?

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Type</p>
                      <select
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        className="border rounded-md px-2 py-1 w-full"
                      >
                        <option value="Manga">Manga</option>
                        <option value="Manhwa">Manhwa</option>
                      </select>
                    </div>

                    :

                    <div>
                      <p className="font-semibold text-gray-900">Type</p>
                      <p>{data.type}</p>
                    </div>

                }

              </div>


              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">

                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                  Read First
                </button>

                <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition">
                  Read Last
                </button>

              </div>


              {/* Bottom */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 mt-6 border-t pt-4 text-gray-600 text-sm">

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
            edit ?

              <textarea
                placeholder="Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-6 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />

              :

              <div className="mt-6 p-5 sm:p-6 bg-gray-50 rounded-xl shadow text-gray-800 leading-relaxed text-justify">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="whitespace-pre-line">{data.description}</p>
              </div>
          }


         {
          edit
          ?
           <button onClick={handleEdit}>
            Submit Edit
          </button>
          :
          ""

         }
        </div>

      ) :

        (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
  <div className="bg-green-100 text-green-600 p-4 rounded-full text-3xl mb-4">
    ✅
  </div>

  <h2 className="text-2xl font-semibold text-gray-800">
    Manga Deleted
  </h2>

  <p className="text-gray-500 mt-2">
    The manga has been deleted successfully.
  </p>
</div>
        )

      }

    </div>
  )
}

export default RealEdit