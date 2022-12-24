import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import UserContext from "./UserContext";

const UserState = (props) => {
    const [cookies, setCookie] = useCookies();
    const [user, setUser] = useState({});
    // const [token , setToken] =

    const headers = {
        "Content-Type": "application/json",
        token: cookies.token,
    };

    const getUser = async () => {
        const res = await axios.get(
            // `http://localhost:5000/api/v1/getUser`,
            `https://hungry-coat-pike.cyclic.app/api/v1/getUser`,
            // `${process.env.REACT_APP_API}/api/v1/getUser`,
            {
                headers,
            });
        // console.log(res)
        setUser(res.data.user);
    };

    return (
        <UserContext.Provider value={{ getUser, user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
