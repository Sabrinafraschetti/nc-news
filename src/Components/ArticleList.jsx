import { useState, useEffect } from "react"
import ArticleCard from './ArticleCard'
import { fetchArticlesByTopics } from "./Api"
import '../App.css'

const ArticleList = ({topics}) => {

    const [articles, setArticles] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("all")
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchArticlesByTopics(selectedTopic)
          .then((fetchedArticles) => {
            setArticles(fetchedArticles)
            setIsLoading(false)
            if (fetchedArticles.length === 0) {
                setError(true);
              }
          })
          .catch((err) => {
            setIsLoading(false);
            setError(true);
          });
      }, [selectedTopic])
  
    function handleChange(event) {
      setSelectedTopic(event.target.value)
    }

    if (isloading) {
        return <p>Loading...</p>
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
       {error && <p>Sorry, no articles matching ${selectedTopic}!</p>}
    </>
  
    )
}

export default ArticleList