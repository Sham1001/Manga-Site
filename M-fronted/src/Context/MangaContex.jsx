import { createContext, useEffect } from "react";
// import  {info}  from "../assets/fronted/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"
// import {toast} from "react-toastify"

export const MangaCon = createContext()

const MangaConProvider = ({children})=>{
    const [searchResult, setSearchResult]= useState(false);
    const [isSearch, setIsSearch]= useState("");
    const [token,setToken] = useState('')
    // const [manga,setManga] = useState([])
    // const [paginatedApi,setPaginatedApi] = useState([])
    const [userData,setUsetData] = useState({})
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()


    // const getData = async () => {
    //     try {
    //       console.log(token)
    //       const response = await axios.get(backendUrl + '/api/user/profile', { headers: { Authorization: `Bearer ${token}` } })
    //       if (response.data.success) {
    //         console.log(response.data.user)
    //         const userData = response.data.user
    
            
    
    //         setUsetData(userData)
    //         // toast.success("ho gaya")
    
    //       }
    //       else {
    //         toast.error(response.data.message)
    //         console.log("error hai kuch to")
    //       }
    //     }
    //     catch (error) {
    //       console.log(error)
    //       toast.error("behncod")
    //     }
    //   }

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])

    // useEffect(()=>{
    //     getData()
    // },[])


    // useEffect(()=>{
    //      mangaData()
    // },[token])

    // useEffect(()=>{
    //     PaginatApi()
    // })

    // const mangaData = async()=>{
    //     const response = await axios.get(backendUrl+"/api/manga/mangaInfo")
    //     try{
    //         if(response.data.success){
    //         setManga(response.data.mangaInfo)
    //     }
    //     }
    //     catch(error){
    //         console.log(error) 
    //         toast.error(error.message)
    //     }
    // }

//     const PaginatApi = async(
//     page,
//     limit,
//     sort='',
//     search=''
    
// )=>{
   
//     try{
//         const response = await axios.get(backendUrl+"/api/manga/mangaInfo",{
//         params:{ page, limit, sort, search },
//     })
//     if(response.data.success){
//         const paginatedData = response.data.pageInfo
//         return paginatedData
       
//     }
     
//     }
//     catch(error){
//          console.log(error) 
//          toast.error(error.message)
//     }
    
// }
    

    const values={
        // info,
        searchResult,
        setSearchResult,
        isSearch,
        setIsSearch,
        token,
        setToken,
        navigate,
        backendUrl,
        // manga,
        // setManga,
        userData,
        // PaginatApi
    }
    return(
        <MangaCon.Provider value={values}>
            {children}
        </MangaCon.Provider>
    )
}

export default MangaConProvider