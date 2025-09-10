import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MangaCon } from "../Context/MangaContex.jsx";

const Manga = () => {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const { info } = useContext(MangaCon);

  useEffect(() => {
    if (info) {
      const found = info.find((item) => String(item.id) === String(id));
      if (found) {
        setData(found);
      }
    }
  }, [id, info]);

  return data ? (
    <>
      {/* Main Info Section */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-md shadow">
        {/* Title */}
        <h1 className="text-xl font-semibold text-blue-600 mb-6">
          {data.title}
        </h1>

        {/* Grid Content */}
        <div className="grid shadow-2xl grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Cover */}
          <div className="bg-white rounded-md shadow p-2">
            <img
              src={data.coverImage}
              alt={data.title}
              className="w-full h-[320px] object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="md:col-span-2 bg-white rounded-md p-6">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="text-gray-800 font-medium">{data.rating}</span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-12 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">Rating</p>
                <p>Average {data.rating} / 5</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Release</p>
                <p>{data.releaseYear}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Alternative</p>
                <p>{data.alternative || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Status</p>
                <p className="text-gray-900">{data.status}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Author(s)</p>
                <p>{data.author}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Artist(s)</p>
                <p>{data.artist || "Unknown"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Genre(s)</p>
                <p>{data.genre}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Type</p>
                <p>{data.type}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                Read First
              </button>
              <button className="px-4 py-2 rounded bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200">
                Read Last
              </button>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center gap-10 mt-6 border-t pt-4 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">💬</span>
                <span>Comments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">🔖</span>
                <span>3.4K Users bookmarked This</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {/* Description */}
<div className="mt-6 p-4 bg-gray-50 rounded-md shadow-lg text-gray-800 leading-relaxed text-justify">
  <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
  <p className="whitespace-pre-line">{data.description}</p>
</div>

      </div>

      {/* Chapters Section */}
      <div className="max-w-6xl mt-10 bg-white rounded-lg shadow p-6 mx-auto ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapters</h2>

        <div className="divide-y">
          {Array.from(
            { length: show ? data.chapters : Math.min(10, data.chapters) },
            (_, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 hover:bg-gray-50 transition cursor-pointer"
              >
                {/* Left: Chapter number */}
                <p className="text-gray-800 font-medium">
                  Chapter {data.chapters - i}
                </p>

                {/* Right: Placeholder (replace with views/date later) */}
                <p className="text-gray-500 text-sm">31/08/25</p>
              </div>
            )
          )}
        </div>

        {data.chapters > 10 && (
          <button
            onClick={() => setShow((prev) => !prev)}
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            {show ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </>
  ) : (
    <div className="text-center mt-20 text-gray-500 text-lg">No data</div>
  );
};

export default Manga;
