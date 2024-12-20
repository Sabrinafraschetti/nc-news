import { useEffect, useState, useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { fetchUsers } from "./Api"
import { useNavigate } from "react-router"

const Login = () => {

    const { setUser } = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [submissionFeedback, setSubmissionFeedback] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        fetchUsers()
            .then((users) => {
                setUsers(users)
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                setError(true)
            })
    }, []) 

    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const foundUser = users.find((user) => user.username === username); 
        if (foundUser) {
          setUser({ username: foundUser.username })
          setUsername('')
          setSubmissionFeedback('Suessfully logged in !')
          navigate(`/users/${foundUser.username}`)
        } else {
            setUsername('')
            setSubmissionFeedback('Login unsucessful, please enter valid username and password')
        }
      };

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
        <h2 className="header">Login to you account below...</h2>
        <form className="login" onSubmit={handleSubmit}>
        <label htmlFor='users-dropdown'>Select a user</label>
        <select
        id='users-dropdown'
        value={username} 
        onChange={handleUserChange} 
        required
        >
            <option value='' disabled>Select user...</option> 
            {users.map((user) => (
                <option key={user.username} value={user.username}>
                    {user.username}
                    </option>
                ))}
            </select>
        <button type="submit">Submit</button>
      </form>
      {submissionFeedback ? <p>{submissionFeedback}</p> : null}
      {error ? <p>{`Sorry, there was an issue logging in!`}</p> : null}
        </>
    )
}

export default Login
