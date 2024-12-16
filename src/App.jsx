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
    </Routes>
    <Footer/>
    </>
  )
}

export default App
