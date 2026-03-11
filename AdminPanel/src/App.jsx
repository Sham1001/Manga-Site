import {Routes,Route} from "react-router-dom"
import NavBar from "./Component/Navbar.jsx"
import { useState } from "react"
import SideBar from './Component/Sidebar.jsx'
import Add from './Pages/Add.jsx'
import Edit from "./Pages/Edit.jsx"
import View from "./Pages/View.jsx"
import RealEdit from "./Pages/RealEdit.jsx"
import Login from "./Pages/Login.jsx" 
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"


function App() {

  const [token, setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token"):'')
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  

  useEffect(()=>{
    localStorage.setItem("token",token)
    console.log(token)
  },[token])
  return (
    <>
    <ToastContainer/>
    {
    token === '' ? <Login setToken={setToken}/> :
   
   <div >

    <NavBar setToken={setToken}/>
    <div className="flex">
      <SideBar/>
        <div className='w-70% mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base mb-30 '>
      <Routes>
        <Route path="/add" element={<Add backendUrl={backendUrl}  token={token}/>} />
        <Route path="/edit" element={<Edit backendUrl={backendUrl}  token={token}/>} />
        <Route path="/view" element={<View backendUrl={backendUrl}  token={token}/>} />
        <Route path="/:mangaId" element={<RealEdit backendUrl={backendUrl}  token={token}/>}/>
      </Routes>
   </div>

   </div>
   
    </div>
    
   
}
    </>
  )
}

export default App
