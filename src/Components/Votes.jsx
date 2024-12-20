import { useState } from "react"
import { patchVotes } from "./Api"

const Votes = ({ votes, article_id }) => {

  const [updatedVotes, setUpdatedVotes] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false)
  const [voteDirection, setVoteDirection] = useState(null)

  const handleClick = (incVotes) => {
    
    if (hasVoted) {
      if (voteDirection === incVotes) {
        const newVotes = updatedVotes - incVotes;
        setUpdatedVotes(newVotes);
        setHasVoted(false);
        setVoteDirection(null);

        patchVotes(article_id, -incVotes) 
          .catch(() => {
            setUpdatedVotes(updatedVotes)
          });
      } else {
        const newVotes = updatedVotes + (incVotes * 2);
        setUpdatedVotes(newVotes);
        setVoteDirection(incVotes);

        patchVotes(article_id, incVotes * 2) 
          .catch(() => {
            setUpdatedVotes(updatedVotes)
          });
      }
    } else {
      if (incVotes === -1 && updatedVotes === 0) {
        return;
      }

      const newVotes = updatedVotes + incVotes;
      setUpdatedVotes(newVotes);
      setHasVoted(true);
      setVoteDirection(incVotes);

      patchVotes(article_id, incVotes)
        .catch(() => {
          setUpdatedVotes(updatedVotes)
        });
    }
  };

  return (
    <>
      <p className='article-votes'>{updatedVotes === 0 ? 'No votes yet' : `${updatedVotes} votes`}</p>
      <button className={`article-vote ${voteDirection === 1 ? "button-active" : ""}`}
      onClick={() => handleClick(1)}>Up Vote</button>
      <button className={`article-vote ${voteDirection === -1 ? "button-active" : ""}`}
      onClick={() => handleClick(-1)}>Down Vote</button>
    </>
  );
};

export default Votes;
