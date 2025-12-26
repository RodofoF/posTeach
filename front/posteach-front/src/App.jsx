import 'bootstrap/dist/css/bootstrap.min.css';
import './custom-bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Login from './Pages/Login/Login.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import FooterComponent from './Components/FooterComponent/FooterComponent.jsx'
import Home from './Pages/Home/Home.jsx'
import Administration from './Pages/Administration/Administration.jsx'
import AdministrationCreate from './Pages/Administration/Administration.Create.jsx'


function App() {
  return (
   <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/administration/create" element={<AdministrationCreate />} />
        {/* <Route path="/administration/edit/:id" element={<AdministrationEdit />} />
        <Route path="/administration/detail/:id" element={<AdministrationDetail />} /> */}
      </Routes>
      <FooterComponent />
    </BrowserRouter>
   </>
  )
}

export default App
