import React from "react";
import { assets  } from "../assets/fronted/assets";
import { Link } from "react-router-dom";

const MangaContex = ({ title, chapters, coverImage,id }) => {
  return (
    <Link to ={`/manga/${id}`}>
    < div  className=" max-w-sm hover:scale-105 transition ease-in-out  rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Cover Image */}
      <div className="">
        <img
           
          src={coverImage || "https://picsum.photos/400/250?random=1"}
          alt={title}
          className="w-full h-48 object-cover "
        />
      </div>

      {/* Content */}
      <div className="p-4 card">
        {/* Title */}
        <p className="text-lg font-semibold text-gray-800 mb-2">{title}</p>

        {/* Chapters + Dates */}
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <p>Chapter {chapters}</p>
            <p>Chapter {chapters - 1}</p>
          </div>
          <div className="text-right">
            <p>26/08/2025</p>
            <p>19/08/2025</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default MangaContex;
