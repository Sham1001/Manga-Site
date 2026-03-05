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
  const [collection, setCollection] = useState([]);
  const [sort, setSort] = useState("Relavent");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [search, setSearch] = useState([]);
  const [totalManga, setTotalManga] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [allManga, setAllManga] = useState([])
  const [page, setPage] = useState(1)

  const { backendUrl, isSearch } = useContext(MangaCon);

  // useEffect(() => {
  //   applyFilter();
  // }, [category, subCategory, isSearch, search,manga]);

  // useEffect(() => {
  //   sortCollection();
  // }, [sort]);



  // const gridSettings = {
  //   dots: true,
  //   arrows: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   rows: 3,
  //   slidesPerRow: 1,
  //   customPaging: (i) => (
  //     <div className="text-black text-xs font-semibold">{i + 1}</div>
  //   ),
  //   dotsClass: "slick-dots custom-dots",
  // };

    const getLatestManga = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/manga/mangaInfo",
        { params: { limit:8, page, search : isSearch, sort, category: category.join(",") } })
      // console.log(response.data.total)
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

           
          }, [page, isSearch, sort, category])
    
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

//   const toggleCategory = (e) => {
//   const value = e.target.value;

//   setCategory((prev) =>
//     prev.includes(value)
//       ? prev.filter((item) => item !== value)
//       : [...prev, value]
//   );
// };

  // const toggleSubCategory = (e) => {
  //   if (subCategory.includes(e.target.value)) {
  //     setSubCategory((prev) =>
  //       prev.filter((items) => items !== e.target.value)
  //     );
  //   } else {
  //     setSubCategory((prev) => [...prev, e.target.value]);
  //   }
  // };

  // const applyFilter = () => {
  //   let productCopy = manga.slice();

  //   if (isSearch) {
  //     productCopy = productCopy.filter((items) =>
  //       items.name.toLowerCase().includes(isSearch.toLowerCase())
  //     );
  //   }

  //   if (category.length > 0) {
  //     productCopy = productCopy.filter((items) =>
  //       items.genres.some((g) => category.includes(g))
  //     );
  //   }

  //   if (subCategory.length > 0) {
  //     productCopy = productCopy.filter((items) =>
  //       items.subGenres.some((g) => subCategory.includes(g))
  //     );
  //   }

  //   setCollection(productCopy);
  // };

  // const sortCollection = () => {
  //   let sortCollectionCopy = collection.slice();

  //   switch (sort) {
  //     case "Low-High":
  //       setCollection(sortCollectionCopy.sort((a, b) => a.price - b.price));
  //       break;

  //     case "High-Low":
  //       setCollection(sortCollectionCopy.sort((a, b) => b.price - a.price));
  //       break;

  //     case "A-Z":
  //       setCollection(
  //         sortCollectionCopy.sort((a, b) => a.name.localeCompare(b.name))
  //       );
  //       break;

  //     case "Z-A":
  //       setCollection(
  //         sortCollectionCopy.sort((a, b) => b.title.localeCompare(a.title))
  //       );
  //       break;

  //     case "Latest":
  //       setCollection(
  //         sortCollectionCopy.sort((a, b) => b.releaseYear - a.releaseYear)
  //       );
  //       break;

  //     case "Oldest":
  //       setCollection(
  //         sortCollectionCopy.sort((a, b) => a.releaseYear - b.releaseYear)
  //       );
  //       break;

  //     default:
  //       applyFilter();
  //       break;
  //   }
  // };

  return (
    <div className="flex flex-col lg:flex-row mt-20 gap-8 px-6 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 space-y-6">
        {/* Search Bar */}
        <SearchBar />

        {/* Categories */}
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

        {/* Sub-Categories */}
        <div className="border p-5 rounded-2xl shadow-sm bg-white">
          <p className="pb-3 text-base font-semibold text-gray-800">Sub-Category</p>
          <div className="space-y-2 text-sm">
            {["Alien", "Girl", "Monster"].map((sub) => (
              <label key={sub} className="flex items-center gap-2 text-gray-600">
                <input
                  // onClick={toggleSubCategory}
                  type="checkbox"
                  value={sub}
                  className="accent-indigo-500"
                />
                {sub}
              </label>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="w-full border text-sm text-gray-700 rounded-2xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Relevant">Sort by: Relevant</option>
          <option value="Low-High">Sort by: Price (Low → High)</option>
          <option value="High-Low">Sort by: Price (High → Low)</option>
          <option value="A-Z">Sort by: Title (A → Z)</option>
          <option value="Z-A">Sort by: Title (Z → A)</option>
          <option value="Latest">Sort by: Latest</option>
          <option value="Oldest">Sort by: Oldest</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4">
        <div className="flex items-center justify-between mb-6">
          <Link className="text-2xl font-bold text-indigo-700">Search Manga</Link>
        </div>

      <div className="space-y-6">
  <div className="w-full grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6" >
    {/* <Slider {...gridSettings}> */}
      {allManga.map((item) => (
        <MangaContex
          key={item._id}
          name={item.name}
          chapters={item.chapters}
          coverImg={item.coverImg}
          id={item._id}
        />
      ))}
      </div>
   

  
  <PaginationPage page={page} totalPage={totalPage} onChange={setPage}/>


    </div>
      
      </div>
    </div>
  );
};

export default Search;
