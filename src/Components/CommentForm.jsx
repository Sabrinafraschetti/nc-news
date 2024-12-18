import { useState } from "react"
import { postComment } from "./Api"
import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"


const CommentForm = ({ setComments, article_id, plusCommentCount }) => {

    const { user } = useContext(UserContext)

    const [commentInput, setCommentInput] = useState('')
    const [submissionFeedback, setSubmissionFeedback] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmissionFeedback('Posting comment...')
        postComment(article_id, user.username, commentInput)
        .then((newComment) => {
            setCommentInput('')
            setSubmissionFeedback('Comment was sucessfully posted !')
            setComments((prevComments) => [newComment, ...prevComments])
            plusCommentCount()
        })
        .catch(() => {
            setCommentInput('')
            setSubmissionFeedback('Sorry, failed to post comment - please login.')
        })
    }


  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

    return (
    <>
        <h3>Add a Comment</h3>
        <form onSubmit={handleSubmit}>
            <textarea 
            onChange={handleCommentChange} 
            placeholder={`${user.username} add comment here...`}
            value={commentInput} 
            required>
            </textarea>
            <button type="submit">Submit</button>
        </form>
        {submissionFeedback && <p>{submissionFeedback}</p>}
    </>
    )
}

export default CommentForm