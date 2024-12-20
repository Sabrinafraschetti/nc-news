import { Link, useNavigate } from "react-router";
import { UserContext } from "../Contexts/UserContext"
import { useContext } from "react"


const Nav = () => {

    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
      logout(); // Clear user state
      navigate("/users"); // Redirect to the login page
    };

    return (
        <nav  className="nav-bar">
            <Link to="/"><p>NC-News Homepage</p></Link>
            {!user.username ? (
        <Link to="/users"><p>Login</p></Link>
      ) : (
        <>
          <Link to={`/users/${user.username}`}>
            <p>{`${user.username}`}</p>
          </Link>
          <p className="logout-link" onClick={handleLogout}>
            Logout
          </p>
        </>
      )}
        </nav>
    )
}

export default Nav