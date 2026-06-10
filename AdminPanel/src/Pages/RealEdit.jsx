import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import upload_area from '../assets/upload_area.png'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { format, differenceInDays, formatDistanceToNow } from "date-fns"
import { Link } from 'react-router-dom'


const RealEdit = ({ backendUrl }) => {

  const { mangaId } = useParams()
  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)
  const [img, setImg] = useState(false)
  const [refreash, setRefreash] = useState(false)
  const [mangaName, setMangaName] = useState('')
  const [date, setDate] = useState('')
  const [author, setAuthor] = useState('')
  const [artist, setArtist] = useState('')
  const [type, setType] = useState('Manga')
  const [genres, setGenres] = useState([])
  const [subGenres, setSubGenres] = useState([])
  const [chapter, setChapter] = useState([])
  const [comments, setComments] = useState([])
  const [showGenres, setShowGenres] = useState(false)
  const [showSubGenres, setShowSubGenres] = useState(false)
  const [status, setStatus] = useState(null)
  const [popular, setPopular] = useState(null)
  const [recommended, setRecommended] = useState(null)
  const [show, setShow] = useState(true)
  const [chapterToShow, setChapterToShow] = useState(1)
  const formData = new FormData()

  const [description, setDescription] = useState('')

  const getMangaInfo = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/singleManga",
        { params: { mangaId } }
      )

      if (response.data.success) {
        const info = response.data.mangaInfo
        setData(info)
        setChapter(response.data.mangaInfo.chapters)
        setGenres(response?.data?.mangaInfo?.genres)
        setSubGenres(response?.data?.mangaInfo?.subGenres || [])
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      if (mangaName.trim()) {
        formData.append("name", mangaName)
      }
      if (author.trim()) {
        formData.append("authorName", author)
      }
      if (artist.trim()) {
        formData.append("artistName", artist)
      }
      if (date) {
        formData.append("date", date)
      }
      if (img) {
        formData.append("coverImg", img)
      }
      if (type) {
        formData.append("type", type)
      }
      if (description.trim()) {
        formData.append('description', description)
      }
      if (genres.length > 0) {
        genres.forEach(genres => formData.append('genres', genres))
      }
      if (genres.length == 0) {
        return toast.error("Genres can't be empty")
      }
      if (subGenres.length > 0) {
        subGenres.forEach(sg => formData.append('subGenres', sg))
      }
      if (status) {
        formData.append("ongoing", status)
      }
      if (popular !== null) {
        formData.append("popular", popular)
      }
      if (recommended !== null) {
        formData.append("recommended", recommended)
      }
      if (mangaId) {
        formData.append("mangaId", mangaId)
      }

      const response = await axios.patch(backendUrl + "/api/manga/edit", formData)
      if (response.data.success) {
        toast.success("Edited Successfully")
        setAuthor('')
        setArtist('')
        setImg(false)
        setData('')
        setMangaName('')
        setRefreash((prev)=>!prev)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  const deleteManga = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(backendUrl + '/api/manga/delete',
            { params: { mangaId } }
          )
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        }
        catch (error) {
         
          toast.error(error.message)
        }
      }
    });
  }

  const addGenres = (item) => {
    if (genres.includes(item)) {
      toast("It already in the genre")
    } else {
      setGenres((prev) => [...prev, item])
    }
  }

  const addSubGenres = (item) => {
    if (subGenres.includes(item)) {
      toast("It's already in sub-genres")
    } else {
      setSubGenres((prev) => [...prev, item])
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

  const handleChpDelete = async(chpId, chpNo)=>{
    try{
      const response = await axios.delete(backendUrl + `/api/chapter/delete/${chpId}`)
      if(response.data.success){
        toast.success(`Chapter No ${chpNo} is Deleted`)
        setRefreash((prev)=>!prev)
      }
    }
    catch(error){
      console.log(error.message)
    }
  }

  const getDate = (releaseDate) => {
    const release = new Date(releaseDate)
    const inDays = differenceInDays(new Date(), release)
    const getDateDiff = formatDistanceToNow(release, { addSuffix: true })
    return inDays > 7 ? format(release, "d MMM yyyy") : getDateDiff
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

  useEffect(() => {
    getMangaInfo()
    getComments()
  }, [refreash])

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh] mb-10">
      {data ? (
        <div className="max-w-6xl mx-auto mt-6 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">

          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
            {edit ?
              <input
                className='border-2 border-green-500 focus:border-green-600 outline-none px-4 py-2 rounded-xl w-full md:max-w-md text-base sm:text-lg'
                type="text"
                value={mangaName}
                onChange={(e) => setMangaName(e.target.value)}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 bg-gray-50 rounded-xl p-4 sm:p-6 shadow-xl">

            {edit ?
              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-4">
                <img
                  src={img ? URL.createObjectURL(img) : upload_area}
                  alt="cover"
                  className="w-36 sm:w-44 md:w-48 h-52 sm:h-60 md:h-64 object-cover rounded-lg shadow"
                />
                <label className='text-white px-5 py-2 bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer text-sm font-medium transition'>
                  Upload
                  <input type="file" id='Img' accept="image/*" hidden onChange={(e) => setImg(e.target.files[0])} />
                </label>
              </div>
              :
              <div className="bg-white rounded-xl shadow p-3 flex justify-center items-center">
                <img
                  src={data.coverImg}
                  alt={name.name}
                  className="w-36 sm:w-44 md:w-full max-w-[240px] h-52 sm:h-64 md:h-[320px] object-cover rounded-md"
                />
              </div>
            }

            <div className="md:col-span-2 bg-white rounded-xl shadow p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-sm text-gray-700">

                {edit ?
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Author(s)</p>
                    <input onChange={(e) => setAuthor(e.target.value)} value={author} className='border rounded-md px-2 py-1 w-full' type="text" />
                  </div>
                  :
                  <div>
                    <p className="font-semibold text-gray-900">Author(s)</p>
                    <p>{data.authorName}</p>
                  </div>
                }

                {edit ?
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Artist(s)</p>
                    <input onChange={(e) => setArtist(e.target.value)} value={artist} className='border rounded-md px-2 py-1 w-full' type="text" />
                  </div>
                  :
                  <div>
                    <p className="font-semibold text-gray-900">Artist(s)</p>
                    <p>{data.artistName ? data.artistName : "-"}</p>
                  </div>
                }

                {edit ?
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Release</p>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-md px-2 py-1 w-full" />
                  </div>
                  :
                  <div>
                    <p className="font-semibold text-gray-900">Release</p>
                    <p>{data?.date ? format(new Date(data?.date), "dd/MM/yyyy") : " - "}</p>
                  </div>
                }

                {edit ?
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Status</p>
                    <select onChange={(e) => setStatus(e.target.value)} value={status} className="border rounded-md px-2 py-1 w-full">
                      <option>Select Status</option>
                      <option value="true">Ongoing</option>
                      <option value="false">Completed</option>
                    </select>
                  </div>
                  :
                  <div>
                    <p className="font-semibold text-gray-900">Status</p>
                    <p>{data.ongoing === true ? 'Ongoing' : 'Completed'}</p>
                  </div>
                }

                {edit ?
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Popular</p>
                    <select onChange={(e) => setPopular(e.target.value)} value={popular} className="border rounded-md px-2 py-1 w-full">
                      <option>Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  :
                  <div>
                    <p className="font-semibold text-gray-900">Popular</p>
                    <p>{data.popular === true ? 'Yes' : 'No'}</p>
                  </div>
                }

                {edit ?
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Recommended</p>
                    <select onChange={(e) => setRecommended(e.target.value)} value={recommended} className="border rounded-md px-2 py-1 w-full">
                      <option>Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  :
                  <div>
                    <p className="font-semibold text-gray-900">Recommended</p>
                    <p>{data.Recommended === true ? 'Yes' : 'No'}</p>
                  </div>
                }

                {edit ?
                  <div className="sm:col-span-2 w-full">
                    <p className="font-semibold text-gray-900 mb-2">Genre(s)</p>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {genres?.map((item, index) => (
                        <button
                          onClick={() => setGenres(genres.filter((items) => items != item))}
                          className='px-3 py-1.5 text-sm border-2 text-white border-green-400 bg-green-400 rounded-full hover:bg-red-500 hover:border-red-500 transition duration-200'
                          key={index}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className='mt-2'>
                      <p onClick={() => setShowGenres((prev) => !prev)} className='text-sm text-blue-500 cursor-pointer hover:underline mb-2'>
                        Add Genres+
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {showGenres && ["Action", "Romance", "Sci-Fi", "Adventure", "Fighting"].map((item, index) => (
                          <button
                            onClick={() => addGenres(item)}
                            className='px-3 py-1.5 text-sm border-2 text-white border-blue-400 bg-blue-400 rounded-full hover:bg-green-500 hover:border-green-500 transition duration-200'
                            key={index}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  :
                  <div className="sm:col-span-2">
                    <p className="font-semibold text-gray-900">Genre(s)</p>
                    <p className="break-words text-sm sm:text-base leading-relaxed">{data?.genres?.join(", ")}</p>
                  </div>
                }

                {edit ?
                  <div className="sm:col-span-2 w-full">
                    <p className="font-semibold text-gray-900 mb-2">Sub-Genre(s)</p>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {subGenres?.map((item, index) => (
                        <button
                          onClick={() => setSubGenres(subGenres.filter((sg) => sg != item))}
                          className='px-3 py-1.5 text-sm border-2 text-white border-blue-400 bg-blue-400 rounded-full hover:bg-red-500 hover:border-red-500 transition duration-200'
                          key={index}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className='mt-2'>
                      <p onClick={() => setShowSubGenres((prev) => !prev)} className='text-sm text-blue-500 cursor-pointer hover:underline mb-2'>
                        Add Sub-Genres+
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {showSubGenres && ["Girl", "Monster", "Sci-Fi", "Alien"].map((item, index) => (
                          <button
                            onClick={() => addSubGenres(item)}
                            className='px-3 py-1.5 text-sm border-2 text-white border-blue-400 bg-blue-400 rounded-full hover:bg-purple-500 hover:border-purple-500 transition duration-200'
                            key={index}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  :
                  <div className="sm:col-span-2">
                    <p className="font-semibold text-gray-900">Sub-Genre(s)</p>
                    <p className="break-words text-sm sm:text-base leading-relaxed">
                      {data?.subGenres?.length > 0 ? data.subGenres.join(", ") : "-"}
                    </p>
                  </div>
                }

                {edit ?
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Type</p>
                    <select onChange={(e) => setType(e.target.value)} value={type} className="border rounded-md px-2 py-1 w-full">
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

              <div className="flex flex-wrap gap-3 mt-6">
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">Read First</button>
                <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition">Read Last</button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 mt-6 border-t pt-4 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">💬</span>
                  <span>{comments.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">🔖</span>
                  <span>{data?.saved?.length}</span>
                </div>
              </div>
            </div>
          </div>

          {edit ?
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

          {edit ? (
            <div className="max-w-6xl mt-10 bg-white rounded-lg shadow p-6 mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Chapters</h2>
              <p className="text-sm text-gray-500 mb-4">Click to <span className="font-bold text-gray-700">edit chapter</span></p>
              <div className="divide-y">
                {chapter.length > 0 ? (
                  chapter.slice(0, chapterToShow).map((item) => (
                    <div key={item._id} className="flex justify-between items-center py-3 hover:bg-gray-50 transition rounded-lg px-2">
                      <Link to={`/manga/${mangaId}/${item._id}/${item.chapterNo}/chpEdit/${edit}`} className="flex-1 flex justify-between items-center cursor-pointer">
                        <p className="text-gray-800 font-medium">Chapter {item.chapterNo}</p>
                        <p className="text-gray-400 text-sm">{getDate(`${item.createdAt}`)}</p>
                      </Link>
                      <button
                        onClick={()=>handleChpDelete(item._id, item.chapterNo)}
                        className="ml-4 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                        title="Delete chapter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <h1 className="text-center text-gray-400 text-lg font-semibold py-12 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                    📭 No chapters yet
                  </h1>
                )}
              </div>
              {chapter.length > 1 && (
                <button onClick={showChapter} className="mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  {show ? "Show More" : "Show Less"}
                </button>
              )}
            </div>
          ) : (
            <div className="max-w-6xl mt-10 bg-white rounded-lg shadow p-6 mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapters</h2>
              <div className="divide-y">
                {chapter.length > 0 ? chapter.slice(0, chapterToShow).map((item) => (
                  <Link to={`/manga/${mangaId}/${item._id}/${item.chapterNo}/chpEdit/${edit}`} className="flex justify-between items-center py-3 hover:bg-gray-50 transition cursor-pointer">
                    <p className="text-gray-800 font-medium">Chapter {item.chapterNo}</p>
                    <p>{getDate(`${item.createdAt}`)}</p>
                  </Link>
                )) : (
                  <h1 className="text-center text-gray-400 text-lg font-semibold py-12 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                    📭 No chapters yet
                  </h1>
                )}
              </div>
              {chapter.length > 1 && (
                <button onClick={showChapter} className="mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  {show ? "Show More" : "Show Less"}
                </button>
              )}
            </div>
          )}

          {edit &&
            <button onClick={handleEdit} className="mt-6 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition">
              Submit Edit
            </button>
          }

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="bg-green-100 text-green-600 p-4 rounded-full text-3xl mb-4">✅</div>
          <h2 className="text-2xl font-semibold text-gray-800">Manga Deleted</h2>
          <p className="text-gray-500 mt-2">The manga has been deleted successfully.</p>
        </div>
      )}
    </div>
  )
}

export default RealEdit