import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Login from './Pages/Login/Login.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'

function App() {
  return (
   <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
