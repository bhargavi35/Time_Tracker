import React from "react";
import axios from "axios";
import { useContext } from "react";
import TodoContext from "../../Context/Todo/TodoContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const todoContext = useContext(TodoContext);
  const { cookieState, setCookieState, setCookie, cookie } = todoContext;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All Feilds are Mandatory");
      return;
    }
    if (password.length < 8) {
      toast.error("Password should be atleast of 8 characters");
      return;
    }
    const res = await axios.post(
      "http://localhost:5000/api/users/loginUser",

      // `${process.env.REACT_APP_API}/users/loginUser`,
      {
        email,
        password,
      }
    );
    console.log(res);

    if (res.data.success) {
      setCookie("token", res.data.token);
      navigate("/");
      toast.success("Logged In");
    } else {
      toast.error("please enter valid credentials");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-full bg-[#191920] text-[#bbbabf]">
      <div className="w-[70%]">
        <h1 className="text-center text-[3rem] font-bold my-6">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 pl-12">
            <div className="flex gap-3">
              <label className="w-[60px] text-[#59ccca]" htmlFor="email">
                Email:
              </label>
              <input
                className="w-9/12 text-[#2c2a2b] py-1 px-2"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
              />
            </div>

            <div className="flex gap-3">
              <label className="w-[60px] text-[#47ce8d]" htmlFor="password">
                Password:
              </label>
              <input
                className="w-9/12 text-[#2c2a2b] py-1 px-2"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
              />
            </div>

            <button className="mt-5 block w-fit mx-auto px-3 py-2 rounded-xl font-bold text-white bg-[#fd77a1]">
              submit
            </button>
          </div>
        </form>
      </div>
      <div className="flex gap-3 text-[18px] mt-10">
        <h4 className="font-bold">New user?</h4>
        <Link className="text-[#fd77a1]" to={"/signup"}>
          Create New Account
        </Link>
        here
      </div>
    </div>
  );
};

export default Login;
