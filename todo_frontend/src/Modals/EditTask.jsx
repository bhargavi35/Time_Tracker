import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import SpinnerContext from "../Context/Spinner/SpinnerContext";
import TaskContext from "../Context/Task/TaskContext";

const EditTask = ({ setEditTaskModal, editTask }) => {
  const spinnerContext = useContext(SpinnerContext);
  const { load, setLoad } = spinnerContext;

  const taskContext = useContext(TaskContext);
  const { edit } = taskContext;
  const [task, setTask] = useState(editTask.main);
  const todoId = useParams();

  const handleDone = () => {
    if (!task) {
      alert("enter task add custom alert notification");
      return;
    }

    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 2000);

    setEditTaskModal(false);
    edit(todoId.todoId, editTask._id, {
      main: task,
    });

    toast.success("Task EDITED successfully");
  };

  const handleCancel = () => {
    setEditTaskModal(false);
  };

  const handleOnChange = (e) => {
    setTask(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.code === "Enter") handleDone();
  };

  return (
    <>
      <div
        onClick={handleCancel}
        className="bg-[#161622] opacity-[.85] absolute top-0 h-[95vh] flex justify-center items-center w-full z-[2] "
      ></div>
      <div className="bg-[#191920] absolute mx-auto top-[30%] z-[10] py-10 px-10 sm:px-20 rounded-2xl border-[1px] border-[#A6B2BC]">
        <div>
          <label
            className="text-[20px] sm:text-[2rem] text-white font-bold"
            htmlFor="title"
          >
            Edit Task:
          </label>
          <br />
          <input
            value={task}
            onKeyUp={handleKeyUp}
            onChange={handleOnChange}
            className="w-[230px] sm:w-[650px] mt-10 py-2 pl-3 rounded-xl"
            name="title"
            id="title"
            type="text"
          />
        </div>
        <div className="flex text-white justify-end gap-3 mt-2 text-[14px] sm:text-[18px]">
          <button
            onClick={handleDone}
            className="px-6 py-1 rounded-lg bg-[#FD77A1] duration-200 ease-in-out hover:bg-[#ac2e56]"
          >
            Done
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-1 rounded-lg bg-[#87898b] duration-200 ease-in-out hover:bg-[#363637]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTask;
