import { useParams } from "react-router"
import { fetchArticleById } from "./Api"
import { useState, useEffect } from "react"
import Comments from './Comments'
import Votes from './Votes'

const SingleArticle = () => {

    const { article_id } = useParams()

    const [articleById, setArticleById] = useState('')
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchArticleById(article_id)
          .then((fetchedArticle) => {
            setArticleById(fetchedArticle)
            setIsLoading(false)
            if (fetchedArticle.length === 0) {
                setError(true);
              }
          })
          .catch((err) => {
            setIsLoading(false);
            setError(true);
          });
      }, [])

      if (isloading) {
        return <p>Loading...</p>
      }

    return(
        <>
        <section>
        <div>
          <ul>
          <h2>{articleById.title}</h2>
          <p>Topic: {articleById.topic}</p>
          <img className="image_single_article" src={articleById.article_img_url} alt='picture missing!' />
          <p>{articleById.body}</p>
          <p>Written by {articleById.author}</p>
          <Votes votes={articleById.votes} article_id={articleById.article_id}/>
          </ul>
        </div>
        {error && <p>Sorry, article not found !</p>}
      </section>
      <Comments commentCount={articleById.comment_count} article_id={articleById.article_id}/>
      </>
    )
}

export default SingleArticle