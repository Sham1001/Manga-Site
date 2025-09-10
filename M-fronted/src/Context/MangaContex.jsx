import { createContext } from "react";
import  {info}  from "../assets/fronted/assets";
import { useState } from "react";

export const MangaCon = createContext()

export const MangaConProvider = ({children})=>{
    const [searchResult, setSearchResult]= useState(false);
    const [isSearch, setIsSearch]= useState("");

    const values={
        info,
        searchResult,
        setSearchResult,
        isSearch,
        setIsSearch
    }
    return(
        <MangaCon.Provider value={values}>
            {children}
        </MangaCon.Provider>
    )
}

export default MangaConProvider