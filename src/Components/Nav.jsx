import { Link } from "react-router";
import { UserContext } from "../Contexts/UserContext"
import { useContext } from "react"


const Nav = () => {

    const { user } = useContext(UserContext)

    return (
        <nav  className="nav-bar">
            <Link to="/"><p>NC-News Homepage</p></Link>
            {!user.username ? (
        <Link to="/users"><p>Login</p></Link>
      ) : (
        <Link to={`/users/${user.username}`}><p>User Profile</p></Link>
      )}
        </nav>
    )
}

export default Nav