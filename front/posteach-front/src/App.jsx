import 'bootstrap/dist/css/bootstrap.min.css';
import './custom-bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Login from './Pages/Login/Login.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import FooterComponent from './Components/FooterComponent/FooterComponent.jsx'
import Home from './Pages/Home/Home.jsx'
import Administration from './Pages/Administration/Administration.jsx'
import AdministrationCreate from './Pages/Administration/Administration.Create.jsx'
import AdmministrationDetail from './Pages/Administration/Administration.Detail.jsx'
import AdministrationEdit from './Pages/Administration/Administration.Edit.jsx'

import Posts from './Pages/Posts/Posts.jsx'
import PostsCreate from './Pages/Posts/Posts.Create.jsx'
import PostsDetail from './Pages/Posts/Post.Detail.jsx'
import PostsEdit from './Pages/Posts/Posts.Edit.jsx'

import MyPosts from './Pages/MyPosts/MyPosts.jsx';


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
        <Route path="/administration/detail/:id" element={<AdmministrationDetail />} />
        <Route path="/administration/edit/:id" element={<AdministrationEdit />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<PostsCreate />} />
        <Route path="/posts/detail/:id" element={<PostsDetail />} />
        <Route path="/posts/edit/:id" element={<PostsEdit />} />
        <Route path="/myposts" element={<MyPosts />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
   </>
  )
}

export default App
