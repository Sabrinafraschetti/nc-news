import { useState, useEffect } from "react"
import { getComments } from './Api'


const Comments = ({commentCount, article_id}) => {

    const [isHidden, setIsHidden] = useState(true)
    const [comments, setComments] = useState([])
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
            <li key={comment.comment_id}><strong>{comment.author} -</strong> {comment.body}</li>
          ))}
        </ul>}
        </>
    )
}

export default Comments