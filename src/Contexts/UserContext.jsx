import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ username: '' })

    const logout = () => {
        setUser({ username: null })
      };

    return (
    <UserContext.Provider value={{ user, setUser, logout }}>
        { children }
    </UserContext.Provider>
    )
}