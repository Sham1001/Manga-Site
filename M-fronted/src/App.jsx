import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import NavBar from './Component/NavBar.jsx'
import Home from "./Pages/Home.jsx"
import Latest from './Pages/Latest.jsx'
import Top from './Pages/Top.jsx'
import Profile from './Pages/Profile.jsx'
import Search from './Pages/Search.jsx'
import Manga from './Pages/Manga.jsx'
import Chapter from './Pages/Chapter.jsx'
import Footer from './Component/Footer.jsx'
import Login from    './Pages/Login.jsx'
import { ToastContainer } from 'react-toastify'
// import Layout from './Component/Layout.jsx'



function App() {

  return (
    <>
    <div className='h-screen '>
      <ToastContainer/>
      <NavBar/>

      <Routes>
       {/* <Route path="/" element={<Layout />}></Route>  */}
        <Route path='/' element={<Home/>}/>
        <Route path='/top' element={<Top/>}/>
        <Route path='/latest' element={<Latest/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/manga/:id' element={<Manga/>}/>
        <Route path='/manga/:mangaId/:chapterNo' element={<Chapter/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

      <Footer/>
      </div>
    </>
  )
}

export default App
