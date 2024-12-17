import { useContext, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import { deleteComment } from "./Api"

const DeleteComments = ({ author, comment_id, setComments, minusCommentCount }) => {

    const { user } = useContext(UserContext)

    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = () => {
        setIsDeleting(true)
        deleteComment(comment_id).then(() => {
            setIsDeleting(false)
            minusCommentCount()
            setComments((prevComments) => 
                prevComments.filter((item) => item.comment_id !== comment_id)
              )
        })
        .catch((err) => {
            setIsDeleting(false);
          })

    }

    if(user.username === author){
        return(
            <>
            <button onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          </>
        )
    }

    return
}

export default DeleteComments