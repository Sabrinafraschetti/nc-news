import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Nav from './Components/Nav'
import ArticleList from './Components/ArticleList'
import { getTopics } from './Components/Api'
import SingleArticle from './Components/SingleArticle'
import Login from './Components/Login'
import UserProfile from './Components/UserProfile'


function App() {

  const [topics, setTopics] = useState([])

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics)
    })
  }, [])
  

  return (
    <>
    <Header/>
    <Nav/>
    <Routes>
      <Route path='/' element={<ArticleList topics={topics}/>}/>
      <Route path="/article/:article_id" element={<SingleArticle/>}/>
      <Route path="/users" element={<Login/>}/>
      <Route path="/users/:username" element={<UserProfile/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
