import { useState, useEffect } from "react"
import ArticleCard from './ArticleCard'
import { fetchArticlesByTopics } from "./Api"
import '../App.css'

const ArticleList = ({topics}) => {

    const [articles, setArticles] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("all")

    useEffect(() => {
        fetchArticlesByTopics(selectedTopic)
          .then((fetchedArticles) => {
            setArticles(fetchedArticles)
          })
          .catch((error) => {
            console.error('Error fetching items:', error)
          })
      }, [selectedTopic])
  
    function handleChange(event) {
      setSelectedTopic(event.target.value)
    }
  
  
  
      return (
          <>
          <h2>
              Browse our Articles 
          </h2>
          <label htmlFor="topics-dropdown">Filter by Topic: </label>
          <select 
          id='topics-dropdown'
          value={selectedTopic} 
          onChange={handleChange}
        >
          <option value="all">All</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>
        <div className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
       </div>
          </>
  
      )
}

export default ArticleList