import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import UserContext from "./UserContext";

export const UserState = (props) => {
    const [cookie, setCookie] = useCookies()
    const [user, setUser] = useState([])

    const headers = {
        'Contenet-Type': "application/json",
        "token": cookie.token
    }

    //get User
    const getUsers = async () => {
        const res = await axios.get(
            `http://localhost:5000/api/users/getUser`,

            // `${process.env.REACT_APP_API}/users/getUser`,
            {
                headers
            })
        // console.log(res)
        setUser(res.data.user)
    }


    return (
        <UserContext.Provider value={{ getUsers, user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
