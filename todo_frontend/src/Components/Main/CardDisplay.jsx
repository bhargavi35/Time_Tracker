import React from "react";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import SpinnerContext from "../../Context/Spinner/SpinnerContext";
import TodoContext from "../../Context/Todo/TodoContext";
import Card from "./Card";
import addLogo from "../../Assests/add-btn.svg";
import Search from "../Search";
import Spinner from "./Spinner";

const CardDisplay = ({ setTodoModal, setEditTodoModal, editTodo }) => {
  const todoContext = useContext(TodoContext);
  const spinnerContext = useContext(SpinnerContext);
  const { getTodos, todo } = todoContext;

  const navigate = useNavigate();
  const { load, setLoad } = spinnerContext;
  const [cookie, setCookie, cookieState] = useCookies();
  const location = useLocation();

  useEffect(() => {
    if (!cookie.token) {
      console.log("first");
      navigate("/signup");
    }
    console.log("In todo display");

    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 500);
    console.log("In todo display...");
    getTodos();
  }, [cookie.token]);

  const handAdd = () => {
    setTodoModal(true);
  };
  return (
    <>
      <div className=" h-[95vh] w-[100vw] sm:w-[80vw] flex flex-col items-center justify-center bg-[#191920] relative">
        <Search />
        <div className="  flex flex-wrap gap-[20px] sm:gap-[80px] my-20 mt-8 mb-10 w-[80%] h-[90vh] justify-center py-10 overflow-y-scroll">
          {load || todo?.length === 0 ? (
            <div className="absolute top-[50%] sm:left-[50%]">
              {todo?.length === 0 && (
                <h1 className="text-[#fd77a1] font-bold">No todos</h1>
              )}

              <Spinner load={true} />
            </div>
          ) : (
            todo.map((el) => {
              return (
                <Card
                  key={el._id}
                  todo={el}
                  setEditTodoModal={setEditTodoModal}
                  editTodo={editTodo}
                />
              );
            })
          )}
        </div>
        <button
          onClick={handAdd}
          className="bg-[#fd77a1] rounded-[50%] px-4 py-4 absolute right-6 sm:right-20 bottom-2 sm:bottom-6 duration-200 ease-in-out hover:bg-[#ac2e56]"
        >
          <img className="invert h-[20px] sm:h-[40px]" src={addLogo} alt="" />
        </button>
      </div>
    </>
  );
};

export default CardDisplay;
