import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PageCard = ({ page, index, pageLabel, isEdit, onReplace, onDelete }) => (
  <div className="relative group">
    <img src={page.url} alt={`page-${index}`} className="w-full block" />

    {isEdit && (
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <label className="cursor-pointer px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-lg">
          🔄 Replace
          <input
            key={page.url}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onReplace(index, e)}
          />
        </label>
        <button
          onClick={() => onDelete(index)}
          className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition shadow-lg"
        >
          🗑 Delete
        </button>
      </div>
    )}

    {isEdit && (
      <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
        {pageLabel}
      </span>
    )}
  </div>
)

const ChapterSelect = ({ currentChapterNo, totalChapter, mangaId, edit, navigate }) => (
  <select
    value={currentChapterNo}
    onChange={(e) => {
      const selected = totalChapter.find(ch => ch.chapterNo === Number(e.target.value))
      if (selected) navigate(`/manga/${mangaId}/${selected._id}/${selected.chapterNo}/chpEdit/${edit}`)
    }}
    className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  >
    {totalChapter?.map((ch, index) => (
      <option key={index} value={ch.chapterNo}>Chapter {ch.chapterNo}</option>
    ))}
  </select>
)

const ViewModeSelect = ({ chapterType, setChamperType }) => (
  <select
    onChange={(e) => setChamperType(e.target.value)}
    value={chapterType}
    className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  >
    <option value="Scroll">Scroll</option>
    <option value="Page">Page</option>
  </select>
)

const PrevNextButtons = ({ currentChapterNo, totalChapter, handlePrev, handleNext }) => (
  <div className="flex justify-center gap-4">
    <button
      onClick={handlePrev}
      disabled={currentChapterNo === 1}
      className={`px-4 py-2 rounded-md text-white ${currentChapterNo === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
    >
      Previous
    </button>
    <button
      onClick={handleNext}
      disabled={currentChapterNo === totalChapter.length}
      className={`px-4 py-2 rounded-md text-white ${currentChapterNo === totalChapter.length ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
    >
      Next
    </button>
  </div>
)

const EditHeader = ({ chapterNoEdit, setChapterNoEdit, chapterName, setChapterName, handleAddPage, handleUpload, uploading }) => (
  <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6 flex flex-col gap-3">
    <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">✏️ Edit Mode</p>
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Chapter No.</label>
        <input
          type="number"
          value={chapterNoEdit}
          onChange={(e) => setChapterNoEdit(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-48">
        <label className="text-xs text-gray-500 font-medium">Chapter Name</label>
        <input
          type="text"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
          placeholder="Enter chapter name..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
    <div className="flex flex-wrap gap-3 items-center mt-1">
      <label className="cursor-pointer px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
        + Add Page
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleAddPage(e.target.files[0])}
        />
      </label>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`px-5 py-2 rounded-md text-white text-sm font-semibold transition ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {uploading ? "Uploading..." : "⬆ Upload Changes"}
      </button>
    </div>
  </div>
)

const ChapterEdit = ({ backendUrl, token }) => {
  const [chapter, setChapter] = useState(null)
  const [totalChapter, setTotalChapter] = useState([])
  const [chapterType, setChamperType] = useState('Scroll')
  const [pageNo, setPageNo] = useState(1)
  const [editedPages, setEditedPages] = useState([])
  const [chapterName, setChapterName] = useState('')
  const [chapterNoEdit, setChapterNoEdit] = useState('')
  const [uploading, setUploading] = useState(false)
  const [currentChapterNo, setCurrentChapterNo] = useState(null)

  const { mangaId, chapterNo, edit } = useParams()
  const navigate = useNavigate()
  const isEdit = edit === 'true'

  const handlePrev = () => {
    const prevCh = totalChapter.find(ch => ch.chapterNo === currentChapterNo - 1)
    if (prevCh) navigate(`/manga/${mangaId}/${prevCh._id}/${prevCh.chapterNo}/chpEdit/${edit}`)
    setPageNo(1)
  }

  const handleNext = () => {
    const nextCh = totalChapter.find(ch => ch.chapterNo === currentChapterNo + 1)
    if (nextCh) navigate(`/manga/${mangaId}/${nextCh._id}/${nextCh.chapterNo}/chpEdit/${edit}`)
    setPageNo(1)
  }

  const getChapter = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/chapter/${mangaId}/${currentChapterNo}`)
      if (response.data.success) {
        const chap = response.data.chapter
        setChapter(chap)
        setTotalChapter(response.data.totalChapters)
        setEditedPages(chap.chapterPage.map(url => ({ url, file: null })))
        setChapterName(chap.name || '')
        setChapterNoEdit(chap.chapterNo || '')
        navigate(`/manga/${mangaId}/${chap._id}/${chap.chapterNo}/chpEdit/${edit}`, { replace: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { if (currentChapterNo) getChapter() }, [currentChapterNo])
  useEffect(() => { document.body.style.overflow = "auto"; return () => { document.body.style.overflow = "" } }, [])
  useEffect(() => { window.scrollTo(0, 0) }, [currentChapterNo])
  useEffect(() => { setCurrentChapterNo(Number(chapterNo)) }, [chapterNo])

  const handleReplace = (index, e) => {
    const file = e.target.files[0]
    if (!file) return
    const newUrl = URL.createObjectURL(file)
    setEditedPages(prev => prev.map((p, i) => i === index ? { url: newUrl, file } : p))
    e.target.value = ""
  }

  const handleAddPage = (file) => {
    if (!file) return
    const newUrl = URL.createObjectURL(file)
    setEditedPages(prev => [...prev, { url: newUrl, file }])
  }

  const handleDeletePage = (index) => {
    setEditedPages(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('chapterName', chapterName)
      formData.append('chapterNo', chapterNoEdit)

      const pageMeta = editedPages.map((p, i) => ({
        index: i,
        isNew: !!p.file,
        existingUrl: p.file ? null : p.url
      }))
      formData.append('pageMeta', JSON.stringify(pageMeta))
      editedPages.forEach(p => { if (p.file) formData.append('pages', p.file) })

      const response = await axios.put(
        backendUrl + `/api/chapter/update/${chapter._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      )

      if (response.data.success) 
        {toast.success("Chapter updated!")

          const chapter = response.data.chapter

          navigate(`/manga/${mangaId}/${chapter?._id}/${chapter?.chapterNo}/chpEdit/:edit`)
        }

      else toast.error(response.data.message)

    } catch (err) {
      console.log(err)
      toast.error("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-5xl mt-10 mx-auto p-4">

      {chapterType === "Page" ? (

        <div className="max-w-5xl mx-auto px-4">

          <div className="text-center mt-10 mb-8">
            <p onClick={() => navigate(`/${mangaId}`)} className="text-4xl font-semibold cursor-pointer hover:text-blue-500">
              {chapter?.managaId?.name}
            </p>
            <h1 className="text-2xl font-bold mt-3 mb-1">Chapter {currentChapterNo}</h1>
            <h2 className="text-lg text-gray-600">{chapter?.name}</h2>
          </div>

          {isEdit && (
            <EditHeader
              chapterNoEdit={chapterNoEdit}
              setChapterNoEdit={setChapterNoEdit}
              chapterName={chapterName}
              setChapterName={setChapterName}
              handleAddPage={handleAddPage}
              handleUpload={handleUpload}
              uploading={uploading}
            />
          )}

          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <ChapterSelect currentChapterNo={currentChapterNo} totalChapter={totalChapter} mangaId={mangaId} edit={edit} navigate={navigate} />
            <ViewModeSelect chapterType={chapterType} setChamperType={setChamperType} />
            <select
              onChange={(e) => setPageNo(Number(e.target.value))}
              value={pageNo}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              {editedPages.map((_, index) => (
                <option key={index} value={index + 1}>{index + 1}/{editedPages.length}</option>
              ))}
            </select>
          </div>

          <PrevNextButtons currentChapterNo={currentChapterNo} totalChapter={totalChapter} handlePrev={handlePrev} handleNext={handleNext} />

          <div className="flex justify-center gap-4 my-6">
            <button onClick={() => setPageNo(p => p - 1)} disabled={pageNo === 1}
              className={`px-4 py-2 rounded-md text-white ${pageNo === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}>
              Prev Page
            </button>
            <button onClick={() => setPageNo(p => p + 1)} disabled={pageNo === editedPages.length}
              className={`px-4 py-2 rounded-md text-white ${pageNo === editedPages.length ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}>
              Next Page
            </button>
          </div>

          <div className="w-full">
            {editedPages[pageNo - 1] && (
              <PageCard
                page={editedPages[pageNo - 1]}
                index={pageNo - 1}
                pageLabel={`${pageNo}/${editedPages.length}`}
                isEdit={isEdit}
                onReplace={handleReplace}
                onDelete={handleDeletePage}
              />
            )}
          </div>

          <div className="text-center mt-16 space-y-6">
            <PrevNextButtons currentChapterNo={currentChapterNo} totalChapter={totalChapter} handlePrev={handlePrev} handleNext={handleNext} />
          </div>

        </div>

      ) : (

        <div className="max-w-5xl mx-auto px-4">

          <div className="text-center mt-10 mb-6">
            <p onClick={() => navigate(`/${mangaId}`)} className="text-4xl mb-4 font-semibold cursor-pointer hover:text-blue-500">
              {chapter?.managaId?.name}
            </p>
            <h1 className="text-2xl font-bold mb-1">Chapter {currentChapterNo}</h1>
            <h2 className="text-lg text-gray-600 mb-5">{chapter?.name}</h2>

            <div className="flex justify-center items-center gap-4 mb-6">
              <ChapterSelect currentChapterNo={currentChapterNo} totalChapter={totalChapter} mangaId={mangaId} edit={edit} navigate={navigate} />
              <ViewModeSelect chapterType={chapterType} setChamperType={setChamperType} />
            </div>

            <PrevNextButtons currentChapterNo={currentChapterNo} totalChapter={totalChapter} handlePrev={handlePrev} handleNext={handleNext} />
          </div>

          {isEdit && (
            <EditHeader
              chapterNoEdit={chapterNoEdit}
              setChapterNoEdit={setChapterNoEdit}
              chapterName={chapterName}
              setChapterName={setChapterName}
              handleAddPage={handleAddPage}
              handleUpload={handleUpload}
              uploading={uploading}
            />
          )}

          <div className="flex flex-col gap-1">
            {editedPages.map((page, index) => (
              <PageCard
                key={index}
                page={page}
                index={index}
                pageLabel={`${index + 1}/${editedPages.length}`}
                isEdit={isEdit}
                onReplace={handleReplace}
                onDelete={handleDeletePage}
              />
            ))}
          </div>

          <div className="text-center mt-16 space-y-6">
            <PrevNextButtons currentChapterNo={currentChapterNo} totalChapter={totalChapter} handlePrev={handlePrev} handleNext={handleNext} />
          </div>

        </div>

      )}
    </div>
  )
}

export default ChapterEdit