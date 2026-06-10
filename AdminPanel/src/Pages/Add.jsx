import React, { useState } from 'react'
import { assest } from '../assets/Admin/asset'
import axios from "axios"
import { toast } from "react-toastify"


const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )

const Add = ({ backendUrl }) => {
  const [genres, setGenres] = useState([])
  const [subGenres, setSubGenres] = useState([])
  const [authName, setAuthName] = useState("")
  const [artistName, setArtistName] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("Manga")
  const [popular, setPopular] = useState(false)
  const [isComplete, setComplete] = useState(false)
  const [recommended, setRecommended] = useState(false)
  const [image, setImage] = useState(false)

  const handleForm = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("authName", authName)
    formData.append("artistName", artistName)
    formData.append("description", description)
    formData.append("date", date)
    formData.append("popular", popular)
    formData.append("complete", isComplete)
    formData.append("recommended", recommended)
    genres.forEach(g => formData.append('genres', g))
    subGenres.forEach(sg => formData.append('subGenres', sg))
    formData.append("type", type)
    image && formData.append("image", image)

    try {
      const response = await axios.post(backendUrl + "/api/manga/add", formData)
      if (response.data.success) {
        toast.success("Added successfully")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  
  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white text-gray-800"

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">

        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Add New Manga</h1>
        </div>

        <form onSubmit={handleForm}>

          <div className="flex flex-col sm:flex-row gap-6">

            <div className="flex flex-col items-center gap-3 shrink-0">
              <img
                src={image ? URL.createObjectURL(image) : assest.upload}
                alt="cover"
                className="w-40 h-52 object-cover rounded-xl border border-gray-200 bg-gray-50"
              />
              <label className="w-40 text-center text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg py-1.5 cursor-pointer hover:bg-indigo-100 transition">
                Upload Cover
                <input type="file" accept="image/*" required hidden onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>

            <div className="flex-1 flex flex-col gap-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Manga Name">
                  <input className={inputCls} type="text" required placeholder="e.g. One Piece" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>
                <Field label="Type">
                  <select className={inputCls} required value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Manga">Manga</option>
                    <option value="Manhwa">Manhwa</option>
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Author">
                  <input className={inputCls} type="text" required placeholder="Author name" value={authName} onChange={(e) => setAuthName(e.target.value)} />
                </Field>
                <Field label="Artist">
                  <input className={inputCls} type="text" placeholder="Artist name (if different)" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
                </Field>
              </div>

              <Field label="Release Date">
                <input className={`${inputCls} max-w-[180px]`} type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
              </Field>

              <Field label="Description">
                <textarea className={`${inputCls} resize-none min-h-[90px]`} required placeholder="Write a short synopsis..." value={description} onChange={(e) => setDescription(e.target.value)} />
              </Field>

            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Genres</p>
            <div className="flex flex-wrap gap-2">
              {["Action", "Romance", "Sci-Fi", "Adventure", "Fighting"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenres(prev => prev.includes(g) ? prev.filter(i => i !== g) : [...prev, g])}
                  className={`px-4 py-1.5 rounded-full text-sm border transition ${genres.includes(g) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sub-genres</p>
            <div className="flex flex-wrap gap-2">
              {["Girl", "Monster", "Sci-Fi", "Alien"].map((sg) => (
                <button
                  key={sg}
                  type="button"
                  onClick={() => setSubGenres(prev => prev.includes(sg) ? prev.filter(i => i !== sg) : [...prev, sg])}
                  className={`px-4 py-1.5 rounded-full text-sm border transition ${subGenres.includes(sg) ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50'}`}
                >
                  {sg}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Options</p>
            <div className="flex flex-wrap gap-5">
              {[
                { label: "Popular", state: popular, toggle: () => setPopular(p => !p) },
                { label: "Completed", state: isComplete, toggle: () => setComplete(p => !p) },
                { label: "Recommended", state: recommended, toggle: () => setRecommended(p => !p) },
              ].map(({ label, state, toggle }) => (
                <label key={label} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={state} onChange={toggle} className="w-4 h-4 accent-indigo-600 cursor-pointer" />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 mb-5" />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg transition"
            >
              Add Manga
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Add