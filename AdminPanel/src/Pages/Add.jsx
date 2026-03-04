import React, { useState } from 'react'
import { assest } from '../assets/Admin/asset'
import axios from "axios"
import {toast} from "react-toastify"
import { Backend } from 'firebase/ai'

const Add = ({backendUrl}) => {
  const [genres, setGenres] = useState([])
  const [subGenres, setSubGenres] = useState([])
  const [authName, setAuthName] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("Manga")
  const [popular, setPopular] = useState(false)
  const [isComplete, setComplete] = useState(false)
  const [recommended, setRecommended] = useState(false)
  const [image, setImage] = useState(false)

  const handleForm = async(e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("name", name)
    formData.append("authName", authName)
    formData.append("description", description)
    formData.append("date", date)
    formData.append("popular", popular)
    formData.append("complete", isComplete)
    formData.append("recommended", recommended)
    // formData.append("genres", genres)
    genres.forEach(genres=>formData.append('genres',genres))
    subGenres.forEach(subGenres=>formData.append('subGenres',subGenres))
    // formData.append("subGenres", subGenres)
    formData.append("type", type)


    image && formData.append("image", image)

    console.log(type)

    try{
      const response = await axios.post(backendUrl+"/api/manga/add",formData)
    if(response.data.success){
      toast.success("Added successfully")
    }
    else{
      toast.error(response.data.message)
    }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="p-6 w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          Add New Manga
        </h1>

        <form onSubmit={handleForm} className="grid grid-cols-2 gap-8">
          {/* Left - Cover Image */}
          <div className="flex flex-col items-center border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Cover Image
            </h2>
            <img
              src={image ? URL.createObjectURL(image) : assest.upload}
              alt="cover"
              className="w-48 h-60 object-cover rounded-lg shadow-md border"
            />
            <label className="mt-4 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Upload
              <input
                type="file"
                accept="image/*"
                required

                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* Right - Details */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
          required

                placeholder="Author Name"
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
          required

                placeholder="Manga Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <textarea
              placeholder="Description"
          required

              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                value={type}
          required

                onChange={(e) => setType(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Manga">Manga</option>
                <option value="Manhwa">Manhwa</option>
              </select>
              <input
                type="date"
                value={date}
          required

                onChange={(e) => setDate(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Genres */}
          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">Genres</h3>
            <div className="flex flex-wrap gap-3">
              {["Action", "Romance", "Sci-Fi", "Adventure", "Fighting"].map(
                (g) => (
                  <button
                    key={g}
                    type="button"
          

                    onClick={() =>
                      setGenres((prev) =>
                        prev.includes(g)
                          ? prev.filter((item) => item !== g)
                          : [...prev, g]
                      )
                    }
                    className={`px-4 py-2 rounded-lg shadow-sm transition ${
                      genres.includes(g)
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700"
                    }`}
                  >
                    {g}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Sub-Genres */}
          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">Sub-Genres</h3>
            <div className="flex flex-wrap gap-3">
              {["Girl", "Monster", "Sci-Fi", "Alien"].map((sg) => (
                <button
                  key={sg}
                  type="button"
          

                  onClick={() =>
                    setSubGenres((prev) =>
                      prev.includes(sg)
                        ? prev.filter((item) => item !== sg)
                        : [...prev, sg]
                    )
                  }
                  className={`px-4 py-2 rounded-lg shadow-sm transition ${
                    subGenres.includes(sg)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  {sg}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">Options</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
                <input
                  onChange={() => setPopular((prev) => !prev)}
                  checked={popular}
                  

                  type="checkbox"
                  className="h-4 w-4 accent-indigo-600"
                />
                <span>Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
                <input
                  onChange={() => setComplete((prev) => !prev)}
                  checked={isComplete}
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-600"
                />
                <span>Complete</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
                <input
                  onChange={() => setRecommended((prev) => !prev)}
                  checked={recommended}
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-600"
                />
                <span>Recommended</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add
