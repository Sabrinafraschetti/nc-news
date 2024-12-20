import { useState } from "react"
import { postComment } from "./Api"
import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import '../App.css'
import { Link } from "react-router";


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
            setSubmissionFeedback(<>
        Sorry, failed to post comment - please{" "}
        <Link to="/users" className="homepage-link">login...</Link>.
      </>
    );
        })
    }


  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

    return (
        <div className="comment-form">
            <h3 className="single-article-title">Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea 
          placeholder={`${user.username} add comment here...`} 
          value={commentInput} 
          onChange={handleCommentChange} 
          required 
        />
        <button type="submit">Post comment...</button>
      </form>
      {submissionFeedback ? <p className="submission-feedback">{submissionFeedback}</p> : null}
    </div>
    )
}

export default CommentForm