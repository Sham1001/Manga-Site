import { createContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {toast} from "react-toastify"

export const MangaCon = createContext()

function decodeUserIdFromToken(token) {
    if (!token) return null;
    try {
        const payload = token.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = JSON.parse(atob(base64));
        return decoded.id || null;
    } catch {
        return null;
    }
}

const MangaConProvider = ({children})=>{
    const [searchResult, setSearchResult]= useState(false);
    const [isSearch, setIsSearch]= useState("");
    const [token,setToken] = useState(()=>{ return localStorage.getItem('token') || ''})
    const [clicked, setClicked] = useState(false)
    const [userData,setUsetData] = useState({})
    const [isFavorite, setIsFavorite] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    // const [bgChanger, setBgChanger] = useState(false)

    // Recomputes only when the token actually changes, not on every render.
    const currentUserId = useMemo(() => decodeUserIdFromToken(token), [token]);

    const userFav = async ()=>{
    try{
        const response = await axios.get(backendUrl+"/api/user/userFav",{headers:{ Authorization: `Bearer ${token}` }})

    if(response.data.success){
      setIsFavorite(response?.data?.fav)
    }
    else{
      toast.error(response.data.message)
      console.log("Idher issue hai")
    }


  } 
    
    catch(error){

      console.log(error)
    }
  }

  const [bgChanger, setBgChanger] = useState(true);

const [bgOpacity, setBgOpacity] = useState(() => {
    return Number(localStorage.getItem("bgOpacity")) || 55;
});

const [bgBlur, setBgBlur] = useState(() => {
    return Number(localStorage.getItem("bgBlur")) || 20;
});

useEffect(() => {
    localStorage.setItem("bgOpacity", bgOpacity);
}, [bgOpacity]);

useEffect(() => {
    localStorage.setItem("bgBlur", bgBlur);
}, [bgBlur]);

  useEffect(()=>{
        if(token){
      userFav()
        }
   
    
    },[clicked])

  useEffect(()=>{
    console.log(token,"Is it working")
  },[])
 

    const values={
        searchResult,
        setSearchResult,
        isSearch,
        setIsSearch,
        token,
        setToken,
        navigate,
        backendUrl,
        isFavorite,
        userData,
        setClicked,
        clicked,
        currentUserId,
        bgChanger,
        setBgChanger,



         
    

        bgOpacity,
        setBgOpacity,

        bgBlur,
        setBgBlur,
    }
    return(
        <MangaCon.Provider value={values}>
            {children}
        </MangaCon.Provider>
    )
}

export default MangaConProvider