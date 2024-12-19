import { UserContext } from "../Contexts/UserContext"
import { useContext, useState, useEffect } from "react"
import { fetchUsers } from "./Api";
import { Link } from "react-router";

const UserProfile = () => {

    const { user } = useContext(UserContext)

    const [usersArray, setUsersArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)

     
    useEffect(() => {
        fetchUsers()
            .then((fetchedUsers) => {
                setUsersArray(fetchedUsers)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching users:", err)
                setIsLoading(false)
            })
    }, []) 

    if (isLoading) {
        return <p>Loading...</p>
    }

    const foundUser = usersArray.find((u) => u.username === user.username)

   if (foundUser === undefined){
    return <h2>Not logged in</h2>
   } else {
    return (
        <>
        <section className="user-profile-container">
        <h2 className="user-profile-title">User Profile</h2>
        <p className="welcome-message">{`welcome ${foundUser.username} !`}</p>
        <p className="welcome-message">To view articles, navigate to <Link to="/" className="homepage-link">homepage...</Link></p>
        <img  src={foundUser.avatar_url} alt='picture missing!' />
        <p className="user-profile-name">{foundUser.name}</p>
        </section>
        </>
    )
   }

    };



export default UserProfile