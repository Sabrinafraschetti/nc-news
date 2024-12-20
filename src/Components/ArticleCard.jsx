import '../App.css'
import { Link } from "react-router"

const ArticleCard = ({ article }) => {
     
    return(
        <section className="article-list">
        <div className="image-grid">
          <ul>
          <Link to={`/article/${article.article_id}`}><strong className="article-title">{article.title}</strong></Link>
            <img className="image_url" src={article.article_img_url} alt='picture missing!' />
            <p className='text'>{article.topic}</p>
            <p className='text'>{article.votes} Votes</p>
            <p className='text'>{article.comment_count} Comments</p>
          </ul>
        </div>
      </section>
    )
}

export default ArticleCard