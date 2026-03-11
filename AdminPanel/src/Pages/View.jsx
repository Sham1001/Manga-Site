import React, { useEffect, useState } from 'react'
import search2 from '../assets/search2.svg'
import cross from '../assets/cross.svg'
import MangaComponent from '../Component/MangaComponent.jsx'
import axios from 'axios'
import PaginationPage from '../Component/Pagination.jsx'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const View = ({backendUrl}) => {

  const [search, setSearch] = useState("")
  const [mangaInfo, setMangaInfo] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)





  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("chpName", chpName);
  //   formData.append("chapNo", chapNo);
  //   formData.append("mangaId",mangaId)
  //   imageArr && imageArr.forEach((img) => formData.append("imageArr", img));

  //   try{
  //       const response = await axios.post(backendUrl+"/api/chapter/add",formData)
  //       if(response.data.success){
  //         setMangaId('')
  //         setChapNo('')
  //         setChpName('')
  //         setImageArr([])
  //         toast.success("Chapter added")
  //       }
        
  //   }
  //   catch(error){
  //     console.log(error)
  //     toast.error(error)
  //   }
  // };




  const searchManga = async() => {
    // e.preventDefault();

    

    try{
        const response = await axios.get(backendUrl+"/api/manga/mangaInfo",{
          params:{search:search, limit:4, page:page}
        })
        if(response.data.success){
          
          
          setMangaInfo(response?.data?.pageInfo)
          setTotalPage(response?.data?.totalPages)
          // setSearch("")
          
        }
        
    }
    catch(error){
      console.log(error)
   
    }
  };


  // const editManga = ()=>{
  //   setMangaId(item._id)
  // }


  useEffect(()=>{
    searchManga()
  },[search, page])

 return (
  <div className='flex flex-col items-center w-full px-6 py-8'>

      {/* Search */}
      <div className="flex items-center justify-between w-full max-w-lg bg-white border rounded-xl shadow-sm px-4 py-2 mb-8">
          
          <div className="flex items-center gap-2 flex-1">
            <img src={search2} alt="search" className="w-4 h-4 opacity-70" />
            <input
              onChange={(e)=>setSearch(e.target.value)} value={search}
              type="text"
              placeholder="Search to edit..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
      
          <button>
            <img src={cross} alt="close" className="w-4 h-4 hover:scale-110 transition cursor-pointer" />
          </button>
      </div>

      {/* Manga Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-6 w-full justify-center max-w-7xl mr-10'>
          {
            mangaInfo.map((item,index)=>(
              <Link to={`/${item._id}`} className='' key={index}>
                  <MangaComponent 
                    name={item.name} 
                    coverImg={item.coverImg} 
                    id={item.id}
                  />
              </Link>
            ))
          }
      </div>

      {/* Pagination */}
      <div className='mt-10'>
          <PaginationPage page={page} onChange={setPage} totalPage={totalPage}/>
      </div>

  </div>
)
}

export default View