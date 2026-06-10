import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import MangaContex from "../Component/MangaContex.jsx";
import { MangaCon } from "../Context/MangaContex.jsx";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import SearchBar from "../Component/SearchBar.jsx";
import axios from "axios";
import PaginationPage from '../Component/PaginationPage.jsx'

const Search = () => {
  const [sort, setSort] = useState("Relavent");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [totalManga, setTotalManga] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [allManga, setAllManga] = useState([])
  const [page, setPage] = useState(1)

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

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((items) => items !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const togglesubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((items) => items !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row mt-15 gap-8 px-6 py-8">
      <div className="w-full lg:w-1/4 space-y-6">
        <SearchBar />

        <div className="border p-5 rounded-2xl shadow-sm bg-white">
          <p className="pb-3 text-base font-semibold text-gray-800">Category</p>
          <div className="space-y-2 text-sm">
            {["Action", "Sci-Fi", "Romance", "Isekai", "Adventure", "Slice of Life", "Comedy", "Sports", "Tragedy"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-gray-600">
                <input
                  onClick={toggleCategory}
                  type="checkbox"
                  value={cat}
                  className="accent-indigo-500"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="border p-5 rounded-2xl shadow-sm bg-white">
          <p className="pb-3 text-base font-semibold text-gray-800">Sub-Category</p>
          <div className="space-y-2 text-sm">
            {["Alien", "Girl", "Monster"].map((sub) => (
              <label key={sub} className="flex items-center gap-2 text-gray-600">
                <input
                 onClick={togglesubCategory}
                  type="checkbox"
                  value={sub}
                  className="accent-indigo-500"
                />
                {sub}
              </label>
            ))}
          </div>
        </div>

        <select
          onChange={(e) => setSort(e.target.value)}
          className="w-full border text-sm text-gray-700 rounded-2xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Relevant">Sort by: Latest</option>
          <option value="A-Z">Sort by: Title (A → Z)</option>
          <option value="Z-A">Sort by: Title (Z → A)</option>
          <option value="Oldest">Sort by: Oldest</option>
        </select>
      </div>

      <div className="w-full lg:w-3/4">
        <div className="flex items-center justify-between mb-6">
          <Link className="text-2xl font-bold text-indigo-700">Search Manga</Link>
        </div>

        <div className="space-y-6">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {allManga?.length > 0 ? allManga.map((item) => (
              <div key={item.manga._id} className="min-w-0 w-full">
                <MangaContex
                  key={item.manga._id}
                  name={item.manga.name}
                  // chapters={item.chapterNo}
                  chapter1={item.latestChapters[0].chapterNo}
                  chapter2={item?.latestChapters[1]?.chapterNo}
                  coverImg={item.manga.coverImg}
                  id={item.manga._id}
                  // createdAt={item.createdAt}
                  createdAt1={item.latestChapters[0].createdAt}
                  createdAt2={item?.latestChapters[1]?.createdAt}
                  isFavorite={isFavorite}
                  setClicked={setClicked}
                />
              </div>
            )) : (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="bg-zinc-900 border border-zinc-700 px-8 py-6 rounded-2xl shadow-xl text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    No Manga Found
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    No manga with that genre is available.
                  </p>
                </div>
              </div>
            )}
          </div>

          <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>
        </div>
      </div>
    </div>
  );
};

export default Search;