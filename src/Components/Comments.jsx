import { useState } from "react"


const Comments = ({commentCount}) => {

    const [isHidden, setIsHidden] = useState(true)

   
    const toggleIsHidden = () => {

        setIsHidden(!isHidden)
    }

    return (
        <>
        <h3>Comments: {commentCount}</h3>
        <button onClick={toggleIsHidden}>{isHidden ? 'Show Comments' : 'Hide Comments'}</button>
        </>
    )
}

export default Comments