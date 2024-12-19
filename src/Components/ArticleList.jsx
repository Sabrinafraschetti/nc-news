import { useState, useEffect } from "react"
import ArticleCard from './ArticleCard'
import { fetchArticlesByTopics } from "./Api"
import '../App.css'

const ArticleList = ({topics}) => {

    const [articles, setArticles] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("all")
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')

    useEffect(() => {
        setIsLoading(true)
        fetchArticlesByTopics(selectedTopic, order, sortBy)
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
      }, [selectedTopic, order, sortBy])
  
    function handleChange(event) {
      setSelectedTopic(event.target.value)
    }

    function handleSortByChange(e) {
      setSortBy(e.target.value);
    }
    
    function handleOrderToggle() {
      setOrder(order === 'asc' ? 'desc' : 'asc');
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
        <label htmlFor="sort-by">Sort By:</label>
        <select value={sortBy} onChange={handleSortByChange}>
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
        </select>
        <button onClick={handleOrderToggle}>
        {order === 'desc' ? 'Ascending' : 'Descending'}
      </button>
        <div className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
       </div>
       {error && <p>{`Sorry, no articles matching ${selectedTopic}!`}</p>}
    </>
  
    )
}

export default ArticleList