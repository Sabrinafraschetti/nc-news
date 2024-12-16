import '../App.css'

const ArticleCard = ({ article }) => {

    console.log(article)
     
    return(
        <section className="article-list">
        <div className="image-grid">
          <ul>
            <strong className="article-title">{article.title}</strong>
            <img className="image_url" src={article.article_img_url} alt='picture missing!' />
            <p className='text'>{article.topic}</p>
            <p className="text">Written by {article.author}</p>
          </ul>
        </div>
      </section>
    )
}

export default ArticleCard