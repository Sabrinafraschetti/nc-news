import { useState } from "react"
import { patchVotes } from "./Api"

const Votes = ({ votes, article_id }) => {

    const [updateVotes, setUpdatedVotes] = useState(votes)

    const handleClick = (incVotes) => {
        setUpdatedVotes((currentVotes) => {
            return currentVotes + incVotes
        })
        patchVotes(article_id, incVotes)
        .catch(() => {
            setUpdatedVotes((currentVotes) => {
                return currentVotes - incVotes
            })
        })
    }




    return(
        <>
    <p>Votes: {updateVotes}</p> 
    <button onClick={() => {handleClick(1)}}>+ Vote</button>
    <button onClick={() => {handleClick(-1)}}>- Vote</button>
    </>
    )
}

export default Votes