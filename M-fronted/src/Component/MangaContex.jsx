import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { MangaCon } from "../Context/MangaContex.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { format, differenceInDays, formatDistanceToNow } from "date-fns";

const MangaContex = ({ name, chapter1,chapter2, coverImg, id, isFavorite, setClicked, createdAt1,createdAt2 }) => {
  const { backendUrl, token } = useContext(MangaCon);
  // const [count, setCount] = useState(0)
  const mangaId = id;

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Login to add Favourite");
    try {
      const response = await axios.post(
        backendUrl + "/api/user/Favorites",
        { mangaId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

       await axios.get(backendUrl + `/api/manga/${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {
        toast(response.data.message);
        setClicked((prev) => !prev);
      } else {
        toast.error(response.data.message);
      }

      
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDate = (releaseDate) => {
    const release = new Date(releaseDate);
    const inDays = differenceInDays(new Date(), release);
    return inDays > 7
      ? format(release, "d MMM yyyy")
      : formatDistanceToNow(release, { addSuffix: true });
  };

  const isNew = differenceInDays(new Date(), new Date(createdAt1)) <= 3;
  // const isNew = differenceInDays(new Date(), new Date(createdAt2)) <= 3;
  const isFav = isFavorite?.includes(mangaId);
  const shortName = name?.length > 22 ? `${name.slice(0, 22)}…` : name;


  // useEffect(()=>{
  //   console.log(createdAt1,"THis is createdAt")
  // },[])

  return (
    <Link to={`/manga/${id}`} className="block min-w-0">
      <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg group min-w-0 w-full">

        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>

          <img
            src={coverImg || "https://picsum.photos/300/450"}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-70"
          />

          <img
            src={coverImg || "https://picsum.photos/300/450"}
            alt={name}
            className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />

          {isNew && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
              New
            </span>
          )}

          <button
            onClick={handleFavorite}
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/85 border border-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white z-10"
          >
            <Heart
              size={15}
              className={isFav ? "text-red-600 fill-red-500" : "text-gray-500 group-hover:text-red-500"}
            />
          </button>
        </div>

        <div className="px-3 pt-2.5 pb-3">
          <div className="relative group/title mb-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate leading-snug">
              {shortName}
            </h3>
            {name?.length > 22 && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-20 opacity-0 group-hover/title:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
                {name}
              </div>
            )}
          </div>

          <div className="h-px bg-gray-100 mb-2" />

          <div className="flex justify-between items-start gap-2 min-w-0">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">Ch. {chapter1}</p>
              {chapter1 > 1 ? (
                <p className="text-xs text-gray-400 truncate">Ch. {chapter2}</p>
              ) : (
                <p className="text-[10px] text-gray-400">First release!</p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-medium text-gray-800">{getDate(createdAt1)}</p>
              {chapter2 ? (
                <p className="text-xs text-gray-400">{getDate(createdAt2)}</p> 
                
              ) : (
                <p className="text-[10px] text-gray-400">Stay tuned</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MangaContex;