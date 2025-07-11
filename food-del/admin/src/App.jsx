import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes , Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const url = "http://localhost:4000"
    return (
      <div>
        <ToastContainer/>
        <Navbar></Navbar>
        <hr />
        <div className="app-content">
          <Sidebar></Sidebar>
          <Routes>
            <Route path="/Add" element={<Add url={url}/>} />
            <Route path="/List" element={<List url={url}/>} />
            <Route path="/Orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    )
}

export default App
