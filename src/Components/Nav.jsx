import { Link } from "react-router";

const Nav = () => {
    return (
        <nav  className="nav-bar">
            <Link to="/"><p>NC-News Homepage</p></Link>
            <Link to="/users"><p>Login</p></Link>
            <Link to="/users/:username"><p>User Profile</p></Link>
        </nav>
    )
}

export default Nav