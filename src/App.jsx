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
    </Routes>
    <Footer/>
    </>
  )
}

export default App
