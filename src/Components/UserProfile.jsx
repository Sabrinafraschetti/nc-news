import { UserContext } from "../Contexts/UserContext"
import { useContext, useState, useEffect } from "react"
import { fetchUsers } from "./Api";

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
        <h2>User Profile</h2>
        <p>{`welcome ${foundUser.username} !`}</p>
        <img className="image_url" src={foundUser.avatar_url} alt='picture missing!' />
        <p>{foundUser.name}</p>
        </>
    )
   }

    };



export default UserProfile