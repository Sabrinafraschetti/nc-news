import { useState } from "react"
import { postComment } from "./Api"


const CommentForm = ({ setComments, article_id, updateCommentCount }) => {

    const [commentInput, setCommentInput] = useState('')
    const [usernameInput, setUsernameInput] = useState('')
    const [submissionFeedback, setSubmissionFeedback] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmissionFeedback('Posting comment...')
        postComment(article_id, usernameInput, commentInput)
        .then((newComment) => {
            setCommentInput('')
            setUsernameInput('')
            setSubmissionFeedback('Comment was sucessfully posted !')
            setComments((prevComments) => [newComment, ...prevComments])
            updateCommentCount()
        })
        .catch(() => {
            setCommentInput('')
            setUsernameInput('')
            setSubmissionFeedback('Sorry, failed to post comment. Please try again.')
        })
    }

   
  const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

    return (
    <>
        <h3>Add a Comment</h3>
        <form onSubmit={handleSubmit}>
            <input
              type='text' 
              onChange={handleUsernameChange} 
              placeholder="Type in username..." 
              value={usernameInput} 
              required>
            </input>
            <textarea 
            onChange={handleCommentChange} 
            placeholder="Add comment here..." 
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