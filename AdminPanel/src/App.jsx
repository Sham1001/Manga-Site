import {Routes,Route} from "react-router-dom"
import NavBar from "./Component/Navbar.jsx"
import { useState } from "react"
import SideBar from './Component/Sidebar.jsx'
import Add from './Pages/Add.jsx'
import Edit from "./Pages/Edit.jsx"
import View from "./Pages/View.jsx"


function App() {

  const [token, setToken] = useState('')
  

  return (
   <div>
    <NavBar setToken={setToken}/>
    <div className="flex">
      <SideBar/>
        <div className='w-70% mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
      <Routes>
        <Route path="/add" element={<Add/>} />
        <Route path="/edit" element={<Edit/>} />
        <Route path="/view" element={<View/>} />
      </Routes>
   </div>

   </div>
    </div>
  )
}

export default App
