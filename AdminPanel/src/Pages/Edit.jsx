import React, { useState } from "react";
import { assest } from "../assets/Admin/asset";

const Edit = () => {
  const [imageArr, setImageArr] = useState([]);
  const [authName, setAuthName] = useState("");
  const [chapNo, setChapNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("authName", authName);
    formData.append("chapNo", chapNo);
    imageArr && imageArr.forEach((file) => formData.append("imageArr", file));
  };

  const filterImg = (file) => {
    setImageArr((prev) => prev.filter((item) => item !== file));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6"
    >
      {/* Input fields */}
      <div className="space-y-4">
        <input
          onChange={(e) => setAuthName(e.target.value)}
          value={authName}
          type="text"
          required
          placeholder="Enter author name..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          onChange={(e) => setChapNo(e.target.value)}
          value={chapNo}
          required
          type="number"
          placeholder="Chapter no..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Upload area */}
      <label
        htmlFor="imageArr"
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition"
      >
        <img
          src={assest.upload}
          alt="upload"
          className="w-16 h-16 opacity-70"
        />
        <p className="mt-2 text-gray-500">Click or drag to upload pages</p>
        <input
          onChange={(e) =>
            setImageArr((prev) => [...prev, ...Array.from(e.target.files)])
          }
          type="file"
          hidden
          id="imageArr"
          multiple
          accept="image/*"
        />
      </label>

      {/* Preview grid */}
      {imageArr.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {imageArr.map((file, index) => (
            <div key={index} className="relative group">
              <img
                onClick={() => filterImg(file)}
                src={URL.createObjectURL(file)}
                alt={`page-${index}`}
                className="w-full h-32 object-cover rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-[0_0_15px_5px_rgba(239,68,68,0.7)] hover:scale-105"
              />


            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add Chapter
        </button>
        <button
          type="button"
          onClick={() => setImageArr([])}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Remove Chapter
        </button>
      </div>
    </form>
  );
};

export default Edit;
