import { useState, useEffect } from "react"
import ArticleCard from './ArticleCard'
import { fetchArticlesByTopics } from "./Api"
import '../App.css'
import { getTopics } from "./Api"
import ArticleTopics from './ArticleTopics'
import ArticleSortBy from "./ArticleSortBy"
import ArticleOrder from "./ArticleOrder"

const ArticleList = () => {

    const [articles, setArticles] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("all")
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')
    const [topics, setTopics] = useState([])

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics)
    })
  }, [])

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

    if (isloading) {
        return (<> 
        <h2 className="header">
              Browse our Articles 
          </h2>
          <ArticleTopics selectedTopics={selectedTopic} setSelectedTopic={setSelectedTopic} topics={topics}/>
          <ArticleSortBy sortBy={sortBy} setSortBy={setSortBy}/>
          <ArticleOrder order={order} setOrder={setOrder}/>
        <p>Loading...</p>
        </>
        )
    }
      return (
          <>
          <h2 className="header">
              Browse our Articles 
          </h2>
          <ArticleTopics selectedTopics={selectedTopic} setSelectedTopic={setSelectedTopic} topics={topics}/>
          <ArticleSortBy sortBy={sortBy} setSortBy={setSortBy}/>
          <ArticleOrder order={order} setOrder={setOrder}/>
        <div className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
       </div>
       {error ? <p>{`Sorry, no articles matching ${selectedTopic}!`}</p> : null}
    </>
  
    )
}

export default ArticleList