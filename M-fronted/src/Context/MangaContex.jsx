import { createContext } from "react";
import  {info}  from "../assets/fronted/assets";

export const MangaCon = createContext()

export const MangaConProvider = ({children})=>{
    const values={
        info
    }
    return(
        <MangaCon.Provider value={values}>
            {children}
        </MangaCon.Provider>
    )
}

export default MangaConProvider