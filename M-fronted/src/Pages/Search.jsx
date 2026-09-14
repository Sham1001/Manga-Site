// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import { useContext, useEffect, useState } from "react";
// import MangaContex from "../Component/MangaContex.jsx";
// import { MangaCon } from "../Context/MangaContex.jsx";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import SearchBar from "../Component/SearchBar.jsx";
// import axios from "axios";
// import PaginationPage from '../Component/PaginationPage.jsx'

// const Search = () => {
//   const [sort, setSort] = useState("Relavent");
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [totalManga, setTotalManga] = useState(0)
//   const [totalPage, setTotalPage] = useState(1)
//   const [allManga, setAllManga] = useState([])
//   const [page, setPage] = useState(1)

//   const { backendUrl, isSearch, setClicked, isFavorite } = useContext(MangaCon);

//   const getLatestManga = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
//         { params: { limit:12, page, search : isSearch, sort, category: category.join(","), subCategory: subCategory.join(",") } })
//       if (response.data.success) {
//         const latestManga = response.data.pageInfo
//         setTotalPage(response.data.totalPages)
//         setTotalManga(response.data.total)
//         setAllManga(latestManga)
//       }
//     }
//     catch (error) {
//       console.log(error, "Error in latest manga")
//     }
//   }

//   useEffect(() => {
//     getLatestManga()
//   }, [page, isSearch, sort, category, subCategory])
    
//   useEffect(()=>{
//     console.log(category)
//   },[category])

//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((prev) => prev.filter((items) => items !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const togglesubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((items) => items !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row mt-15 gap-8 px-6 py-8">
//       <div className="w-full lg:w-1/4 space-y-6">
//         <SearchBar />

//         <div className="border p-5 rounded-2xl shadow-sm bg-white">
//           <p className="pb-3 text-base font-semibold text-gray-800">Category</p>
//           <div className="space-y-2 text-sm">
//             {["Action", "Sci-Fi", "Romance", "Isekai", "Adventure", "Slice of Life", "Comedy", "Sports", "Tragedy"].map((cat) => (
//               <label key={cat} className="flex items-center gap-2 text-gray-600">
//                 <input
//                   onClick={toggleCategory}
//                   type="checkbox"
//                   value={cat}
//                   className="accent-indigo-500"
//                 />
//                 {cat}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="border p-5 rounded-2xl shadow-sm bg-white">
//           <p className="pb-3 text-base font-semibold text-gray-800">Sub-Category</p>
//           <div className="space-y-2 text-sm">
//             {["Alien", "Girl", "Monster"].map((sub) => (
//               <label key={sub} className="flex items-center gap-2 text-gray-600">
//                 <input
//                  onClick={togglesubCategory}
//                   type="checkbox"
//                   value={sub}
//                   className="accent-indigo-500"
//                 />
//                 {sub}
//               </label>
//             ))}
//           </div>
//         </div>

//         <select
//           onChange={(e) => setSort(e.target.value)}
//           className="w-full border text-sm text-gray-700 rounded-2xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
//         >
//           <option value="Relevant">Sort by: Latest</option>
//           <option value="A-Z">Sort by: Title (A → Z)</option>
//           <option value="Z-A">Sort by: Title (Z → A)</option>
//           <option value="Oldest">Sort by: Oldest</option>
//         </select>
//       </div>

//       <div className="w-full lg:w-3/4">
//         <div className="flex items-center justify-between mb-6">
//           <Link className="text-2xl font-bold text-indigo-700">Search Manga</Link>
//         </div>

//         <div className="space-y-6">
//           <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//             {allManga?.length > 0 ? allManga.map((item) => (
//               <div key={item.manga._id} className="min-w-0 w-full">
//                 <MangaContex
//                   key={item.manga._id}
//                   name={item.manga.name}
//                   // chapters={item.chapterNo}
//                   chapter1={item.latestChapters[0].chapterNo}
//                   chapter2={item?.latestChapters[1]?.chapterNo}
//                   coverImg={item.manga.coverImg}
//                   id={item.manga._id}
//                   // createdAt={item.createdAt}
//                   createdAt1={item.latestChapters[0].createdAt}
//                   createdAt2={item?.latestChapters[1]?.createdAt}
//                   isFavorite={isFavorite}
//                   setClicked={setClicked}
//                 />
//               </div>
//             )) : (
//               <div className="col-span-full flex justify-center items-center py-20">
//                 <div className="bg-zinc-900 border border-zinc-700 px-8 py-6 rounded-2xl shadow-xl text-center">
//                   <h2 className="text-2xl font-bold text-white mb-2">
//                     No Manga Found
//                   </h2>
//                   <p className="text-zinc-400 text-sm">
//                     No manga with that genre is available.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;






//Simple One

// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import { useContext, useEffect, useState } from "react";
// import MangaContex from "../Component/MangaContex.jsx";
// import { MangaCon } from "../Context/MangaContex.jsx";
// import { Link } from "react-router-dom";
// import SearchBar from "../Component/SearchBar.jsx";
// import axios from "axios";
// import PaginationPage from '../Component/PaginationPage.jsx'

// const Search = () => {
//   const [sort, setSort] = useState("Relavent");
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [totalManga, setTotalManga] = useState(0)
//   const [totalPage, setTotalPage] = useState(1)
//   const [allManga, setAllManga] = useState([])
//   const [page, setPage] = useState(1)

//   const { backendUrl, isSearch, setClicked, isFavorite } = useContext(MangaCon);

//   const getLatestManga = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
//         { params: { limit:12, page, search : isSearch, sort, category: category.join(","), subCategory: subCategory.join(",") } })
//       if (response.data.success) {
//         const latestManga = response.data.pageInfo
//         setTotalPage(response.data.totalPages)
//         setTotalManga(response.data.total)
//         setAllManga(latestManga)
//       }
//     }
//     catch (error) {
//       console.log(error, "Error in latest manga")
//     }
//   }

//   useEffect(() => {
//     getLatestManga()
//   }, [page, isSearch, sort, category, subCategory])
    
//   useEffect(()=>{
//     console.log(category)
//   },[category])

//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((prev) => prev.filter((items) => items !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const togglesubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((items) => items !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   return (
//     <div className="bg-black min-h-screen pb-24">
//       <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 pt-8">

//         {/* Sidebar */}
//         <div className="w-full lg:w-1/4 space-y-4">
//           <SearchBar />

//           <div className="bg-[#0f0a14] border border-[#241834] p-5 rounded-2xl">
//             <p className="pb-3 text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase">Category</p>
//             <div className="space-y-2.5 text-sm">
//               {["Action", "Sci-Fi", "Romance", "Isekai", "Adventure", "Slice of Life", "Comedy", "Sports", "Tragedy"].map((cat) => (
//                 <label key={cat} className="flex items-center gap-2.5 text-[#c9bcdb] cursor-pointer">
//                   <input
//                     onClick={toggleCategory}
//                     type="checkbox"
//                     value={cat}
//                     className="accent-[#8b3fd6] w-4 h-4"
//                   />
//                   {cat}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="bg-[#0f0a14] border border-[#241834] p-5 rounded-2xl">
//             <p className="pb-3 text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase">Sub-Category</p>
//             <div className="space-y-2.5 text-sm">
//               {["Alien", "Girl", "Monster"].map((sub) => (
//                 <label key={sub} className="flex items-center gap-2.5 text-[#c9bcdb] cursor-pointer">
//                   <input
//                    onClick={togglesubCategory}
//                     type="checkbox"
//                     value={sub}
//                     className="accent-[#8b3fd6] w-4 h-4"
//                   />
//                   {sub}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <select
//             onChange={(e) => setSort(e.target.value)}
//             className="w-full bg-[#0f0a14] border border-[#241834] text-sm text-[#e6d9f7] rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8b3fd6]"
//           >
//             <option value="Relevant">Sort by: Latest</option>
//             <option value="A-Z">Sort by: Title (A → Z)</option>
//             <option value="Z-A">Sort by: Title (Z → A)</option>
//             <option value="Oldest">Sort by: Oldest</option>
//           </select>
//         </div>

//         {/* Results */}
//         <div className="w-full lg:w-3/4">
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <span className="block text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-0.5">Discover</span>
//               <h1
//                 className="text-xl sm:text-2xl font-black text-white"
//                 style={{ textShadow: '0 0 14px rgba(185,139,255,0.35)' }}
//               >
//                 Search Manga
//               </h1>
//             </div>
//             {totalManga > 0 && (
//               <span className="text-xs font-semibold text-[#c9bcdb] bg-[#1a0f26] border border-[#3d2456] px-3 py-1.5 rounded-full">
//                 {totalManga} Results
//               </span>
//             )}
//           </div>

//           <div className="space-y-6">
//             <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
//               {allManga?.length > 0 ? allManga.map((item) => (
//                 <MangaContex
//                   key={item.manga._id}
//                   name={item.manga.name}
//                   chapter1={item.latestChapters[0].chapterNo}
//                   chapter2={item?.latestChapters[1]?.chapterNo}
//                   coverImg={item.manga.coverImg}
//                   id={item.manga._id}
//                   createdAt1={item.latestChapters[0].createdAt}
//                   createdAt2={item?.latestChapters[1]?.createdAt}
//                   isFavorite={isFavorite}
//                   setClicked={setClicked}
//                 />
//               )) : (
//                 <div className="col-span-full flex justify-center items-center py-20">
//                   <div className="bg-[#0f0a14] border border-dashed border-[#3d2456] px-8 py-8 rounded-2xl text-center">
//                     <h2 className="text-lg font-bold text-white mb-1.5">
//                       No Manga Found
//                     </h2>
//                     <p className="text-[#8a7a9c] text-sm">
//                       No manga with that genre is available.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {allManga?.length > 0 && (
//               <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;






import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import MangaContex from "../Component/MangaContex.jsx";
import { MangaCon } from "../Context/MangaContex.jsx";
import SearchBar from "../Component/SearchBar.jsx";
import axios from "axios";
import PaginationPage from '../Component/PaginationPage.jsx'
import { SlidersHorizontal, X } from "lucide-react";

const Search = () => {
  const [sort, setSort] = useState("Relavent");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [totalManga, setTotalManga] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [allManga, setAllManga] = useState([])
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const { backendUrl, isSearch, setClicked, isFavorite } = useContext(MangaCon);

  const getLatestManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { limit:12, page, search : isSearch, sort, category: category.join(","), subCategory: subCategory.join(",") } })
      if (response.data.success) {
        const latestManga = response.data.pageInfo
        setTotalPage(response.data.totalPages)
        setTotalManga(response.data.total)
        setAllManga(latestManga)
      }
    }
    catch (error) {
      console.log(error, "Error in latest manga")
    }
  }

  useEffect(() => {
    getLatestManga()
  }, [page, isSearch, sort, category, subCategory])
    
  useEffect(()=>{
    console.log(category)
  },[category])

  const toggleCategory = (val) => {
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((items) => items !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const togglesubCategory = (val) => {
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((items) => items !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  const categories = ["Action", "Sci-Fi", "Romance", "Isekai", "Adventure", "Slice of Life", "Comedy", "Sports", "Tragedy"]
  const subCategories = ["Alien", "Girl", "Monster"]

  const chipClass = (active) => `px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
    active
      ? "bg-[#8b3fd6] border-[#8b3fd6] text-white"
      : "bg-[#0f0a14] border-[#241834] text-[#c9bcdb] active:border-[#7a3fd6] sm:hover:border-[#7a3fd6]"
  }`

  const activeFilterCount = category.length + subCategory.length

  return (
    <div className="bg-black min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="block text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-0.5">Discover</span>
            <h1
              className="text-xl sm:text-2xl font-black text-white"
              style={{ textShadow: '0 0 14px rgba(185,139,255,0.35)' }}
            >
              Search Manga
            </h1>
          </div>
          {totalManga > 0 && (
            <span className="text-xs font-semibold text-[#c9bcdb] bg-[#1a0f26] border border-[#3d2456] px-3 py-1.5 rounded-full">
              {totalManga} Results
            </span>
          )}
        </div>

        <div className="mb-5">
          <SearchBar />
        </div>

        {/* Filter toggle + sort, inline */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f0a14] border border-[#3d2456] text-[#e6d9f7] text-sm font-semibold active:bg-[#1a0f26] sm:hover:bg-[#1a0f26] transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#8b3fd6] text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#0f0a14] border border-[#241834] text-sm text-[#e6d9f7] rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#8b3fd6]"
          >
            <option value="Relevant">Latest</option>
            <option value="A-Z">Title (A → Z)</option>
            <option value="Z-A">Title (Z → A)</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-[#0f0a14] border border-[#241834] rounded-2xl p-5 mb-6 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98bff] uppercase">Genres</p>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setCategory([]); setSubCategory([]); }}
                  className="text-xs text-[#8a7a9c] active:text-white sm:hover:text-white flex items-center gap-1"
                >
                  <X size={12} /> Clear all
                </button>
              )}
            </div>

            <div>
              <p className="text-xs text-[#6b5a80] mb-2.5">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => toggleCategory(cat)} className={chipClass(category.includes(cat))}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-[#6b5a80] mb-2.5">Sub-Category</p>
              <div className="flex flex-wrap gap-2">
                {subCategories.map((sub) => (
                  <button key={sub} onClick={() => togglesubCategory(sub)} className={chipClass(subCategory.includes(sub))}>
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results grid */}
        <div className="space-y-6">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {allManga?.length > 0 ? allManga.map((item) => (
              <MangaContex
                key={item.manga._id}
                name={item.manga.name}
                chapter1={item.latestChapters[0].chapterNo}
                chapter2={item?.latestChapters[1]?.chapterNo}
                coverImg={item.manga.coverImg}
                id={item.manga._id}
                createdAt1={item.latestChapters[0].createdAt}
                createdAt2={item?.latestChapters[1]?.createdAt}
                isFavorite={isFavorite}
                setClicked={setClicked}
              />
            )) : (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="bg-[#0f0a14] border border-dashed border-[#3d2456] px-8 py-8 rounded-2xl text-center">
                  <h2 className="text-lg font-bold text-white mb-1.5">
                    No Manga Found
                  </h2>
                  <p className="text-[#8a7a9c] text-sm">
                    No manga with that genre is available.
                  </p>
                </div>
              </div>
            )}
          </div>

          {allManga?.length > 0 && (
            <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;