import React from 'react'
import { assets } from '../assets/fronted/assets'
import { useContext} from 'react'
import { MangaCon } from '../Context/MangaContex'



const SearchBar = () => {

  const {searchResult, setSearchResult,isSearch, setIsSearch} = useContext(MangaCon)
  return searchResult ? (
    <div className="flex items-center justify-between bg-white shadow-md rounded-2xl px-4 py-2 w-full max-w-md">
      {/* Input + search icon */}
      <div className="flex items-center flex-1 gap-2">
        <img src={assets.search2} alt="search" className="w-5 h-5 text-gray-500" />
        <input
        onChange={(e)=>setIsSearch(e.target.value)} value={isSearch}
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Cross icon */}
      <button onClick={()=>setSearchResult(false)}>
        <img src={assets.cross} alt="close" className="w-4 h-4 cursor-pointer hover:scale-110 transition" />
      </button>
    </div>
  ): null
}

export default SearchBar