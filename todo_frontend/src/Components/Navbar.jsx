import React from "react";
import { useEffect,useContext } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'

import UserContext from "../Context/User/UserContext";
import logoff from "../Assests/logout.png"

const Navbar = () => {
  const userContext = useContext(UserContext);
  const { user, getUsers } = userContext;
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [cookie.token]);
  
  return (
    <>
      <nav className="flex justify-between items-center h-[5vh] px-2 sm:px-10 text-[#bcbcbf] bg-[#21212b]">
        <div className="sm:block hidden">
          <span>{user && user.email}</span>
        </div>
        <div>
          <h1 className="text-[14px] sm:text-[1.3rem] font-bold">To-Do</h1>
        </div>

        <div className="flex gap-8 items-center">
          <Link to="/profile">
            <div className="flex gap-2">
              <h4 className="bg-[#fd77a1] text-white sm:text-base text-[14px] px-4 rounded-xl duration-200 ease-in-out hover:bg-[#ac2e56] font-bold">
                {user && user.name}
              </h4>
            </div>
          </Link>

          <button
            onClick={() => {
              setCookie("token", "");
              navigate("/signup");
              toast.success("Logged Out");
            }}
            className="bg-[#87898b] text-white rounded-xl py-1 px-2"
          >
            <img className="h-[20px]" src={logoff} alt="" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
