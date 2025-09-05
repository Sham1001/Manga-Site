import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import NavBar from './Component/NavBar.jsx'
import Home from "./Pages/Home.jsx"
import Latest from './Pages/Latest.jsx'
import Top from './Pages/Latest.jsx'
import Profile from './Pages/Profile.jsx'
import Search from './Pages/Search.jsx'
import Manga from './Pages/Manga.jsx'
import Chapter from './Pages/Chapter.jsx'
import Footer from './Component/Footer.jsx'



function App() {

  return (
    <>
    <div className='h-screen'>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/top' element={<Top/>}/>
        <Route path='/latest' element={<Latest/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/manga/id' element={<Manga/>}/>
        <Route path='/mangaName/chapterNo' element={<Chapter/>}/>
        <Route path='/Home' element={<Search/>}/>
      </Routes>

      <Footer/>
      </div>
    </>
  )
}

export default App
