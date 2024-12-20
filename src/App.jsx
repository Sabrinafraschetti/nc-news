import { Routes, Route } from 'react-router'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Nav from './Components/Nav'
import ArticleList from './Components/ArticleList'
import SingleArticle from './Components/SingleArticle'
import Login from './Components/Login'
import UserProfile from './Components/UserProfile'


function App() {

  return (
    <>
    <Header/>
    <Nav/>
    <Routes>
      <Route path='/' element={<ArticleList/>}/>
      <Route path="/article/:article_id" element={<SingleArticle/>}/>
      <Route path="/users" element={<Login/>}/>
      <Route path="/users/:username" element={<UserProfile/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
