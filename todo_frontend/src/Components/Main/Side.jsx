import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import TaskContext from "../../Context/Task/TaskContext";
import TodoContext from "../../Context/Todo/TodoContext";

const Side = () => {
  const taskContext = useContext(TaskContext);
  const { tasks } = taskContext;
  const todoContext = useContext(TodoContext);
  const { todo, getTodos } = todoContext;

  const navigate = useNavigate();
  const handClick = (todo_id, title) => {
    navigate(`/${todo_id}/${title}`);
  };
  useEffect(() => {
    getTodos();
  }, []);

  console.log(tasks);
  return (
    <div className="hidden sm:block w-[20vw] h-[95vh] bg-[#21212b] border-2 border-[#191920]">
      <h1 className="text-[#bbbabf] font-bold text-[1.4rem] ml-8 mt-8">
        Todo's
      </h1>
      <div className="text-[#c9c9cb] text-[1.2rem] font-[600]  my-6 h-[80vh] overflow-y-scroll">
        {!todo ? (
          <h4 className="text-center mt-20 text-gray-500">
            No <span className="text-pink-600">TODOs</span> yet
          </h4>
        ) : (
          todo.map((el) => {
            return (
              <div
                key={el._id}
                onClick={() => handClick(el._id, el.title)}
                className="hover:bg-[#262632] px-8  py-4 flex justify-between"
              >
                <h4 className="text-[1.4rem]">
                  {el.title.length > 15
                    ? el.title.slice(0, 10).concat("...")
                    : el.title}
                </h4>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Side;
