import { useState, useEffect } from "react"
import { getComments } from './Api'
import DeleteComments from './DeleteComment'


const Comments = ({comments, setComments, commentCount, article_id, minusCommentCount}) => {

    const [isHidden, setIsHidden] = useState(true)
    const [loading, setLoading] = useState(false)

     if (!article_id) {
            return <p>Loading...</p>;
          } else {
    useEffect(() => {
        setLoading(true)
      getComments(article_id).then((comments) => {
        setComments(comments)
        setLoading(false)
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
        <>
        <h3>Comments: {commentCount}</h3>
        <button onClick={toggleIsHidden}>{isHidden ? 'Show Comments' : 'Hide Comments'}</button>
        {isHidden ? null : <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}><strong>{comment.author} -</strong> {comment.body} <DeleteComments author={comment.author} comment_id={comment.comment_id} setComments={setComments} minusCommentCount={minusCommentCount}/></li>
          ))}
        </ul>}
        </>
    )
}

export default Comments