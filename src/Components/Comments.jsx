import { useState, useEffect } from "react"
import { getComments } from './Api'
import DeleteComments from './DeleteComment'
import '../App.css'


const Comments = ({comments, setComments, commentCount, article_id, minusCommentCount}) => {

    const [isHidden, setIsHidden] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

     if (!article_id) {
            return <p>Loading...</p>;
          } else {
    useEffect(() => {
        setLoading(true)
      getComments(article_id).then((comments) => {
        setComments(comments)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(true)
    })
    }, [article_id])
}
   
    const toggleIsHidden = () => {

        setIsHidden(!isHidden)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="comment-section">
      <div className="comment-header">
        <h3 className="single-article-title">{commentCount === 0 ? 'No comments yet' : `${commentCount} comments`}</h3>
        <button onClick={toggleIsHidden}>
          {isHidden ? 'Show Comments' : 'Hide Comments'}
        </button>
      </div>

      {!isHidden && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <p className="comment-author">{comment.author}</p>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-timestamp">{new Date(comment.created_at).toLocaleString()}</p>
              <DeleteComments 
                author={comment.author} 
                comment_id={comment.comment_id} 
                setComments={setComments} 
                minusCommentCount={minusCommentCount} 
              />
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}

export default Comments


