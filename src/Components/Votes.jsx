import { useState } from "react"
import { patchVotes } from "./Api"

const Votes = ({ votes, article_id }) => {

    const [updatedVotes, setUpdatedVotes] = useState(votes);
    const [hasVoted, setHasVoted] = useState(false)
    const [voteDirection, setVoteDirection] = useState(null)
  
    const handleClick = (incVotes) => {
      if (hasVoted) {
        if (voteDirection === incVotes) {
          setUpdatedVotes(updatedVotes - incVotes)
          patchVotes(article_id, -incVotes) 
            .catch(() => {
              setUpdatedVotes(updatedVotes)
            });
          setHasVoted(false)
          setVoteDirection(null)
        } else {
          setUpdatedVotes(updatedVotes + (incVotes * 2))
          patchVotes(article_id, incVotes * 2) 
            .catch(() => {
              setUpdatedVotes(updatedVotes)
            });
          setVoteDirection(incVotes)
        }
      } else {
        if (incVotes === -1 && updatedVotes === 0) {
          return
        }
        
        setUpdatedVotes(updatedVotes + incVotes)
        patchVotes(article_id, incVotes)
          .then(() => {
            setHasVoted(true)
            setVoteDirection(incVotes)
          })
          .catch(() => {
            setUpdatedVotes(updatedVotes)
          });
      }
    };
  
    return (
      <>
        <p>Votes: {updatedVotes}</p>
        <button onClick={() => handleClick(1)}>Up Vote</button>
        <button onClick={() => handleClick(-1)}>Down Vote</button>
      </>
    );
  };
  
  export default Votes;
