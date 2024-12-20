import { useParams } from "react-router"
import { fetchArticleById } from "./Api"
import { useState, useEffect } from "react"
import Comments from './Comments'
import Votes from './Votes'
import CommentForm from './CommentForm'

const SingleArticle = () => {
    
    const { article_id } = useParams()

    const [articleById, setArticleById] = useState('')
    const [comments, setComments] = useState([])
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchArticleById(article_id)
          .then((fetchedArticle) => {
            setArticleById(fetchedArticle)
            setIsLoading(false)
            if (Object.keys(fetchedArticle).length === 0) {
              setError(true);
          }
          })
          .catch((err) => {
            setIsLoading(false);
            setError(true);
          });
      }, [article_id])

     const plusCommentCount = () => 
        setArticleById((prevArticle) => ({ 
          ...prevArticle, comment_count: prevArticle.comment_count + 1 
        }))

        const minusCommentCount = () => 
          setArticleById((prevArticle) => ({ 
            ...prevArticle, comment_count: prevArticle.comment_count - 1 
          }))

      if (isloading) {
        return <p>Loading...</p>
      }

    return(
        <>
        <section className='single-article-container'>
        <div className="article-content">
          <ul>
          <h2 className="single-article-title">{articleById.title}</h2>
          <p className="article-topic">Topic: {articleById.topic}</p>
          <img className="article-image" src={articleById.article_img_url} alt='picture missing!' />
          <p className="article-body">{articleById.body}</p>
          <p className="article-author">Written by {articleById.author}</p>
          <Votes votes={articleById.votes} article_id={articleById.article_id}/>
          </ul>
        </div>
        {error ? <p>Sorry, article not found!</p> : null}
      </section>
      <div className="comment-section">
      <CommentForm setComments={setComments} article_id={articleById.article_id} plusCommentCount={plusCommentCount}/>
      <Comments comments={comments} setComments={setComments} commentCount={articleById.comment_count} article_id={articleById.article_id} minusCommentCount={minusCommentCount}/>
      </div>
      </>
    )
}

export default SingleArticle