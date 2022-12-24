import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import TaskContext from "./TaskContext";

export const TaskState = (props) => {
    const [cookie, setCookie] = useCookies();
    const [task, setTask] = useState([]);

    const headers = {
        "Contenet-Type": "application/json",
        token: cookie.token,
    };

    //get task
    const getTasks = async (todoId) => {
        const res = await axios.get(
            // `http://localhost:5000/api/getTasks/${todoId}`,
            `https://hungry-coat-pike.cyclic.app/api/getTasks/${todoId}`,

            // `${process.env.REACT_APP_API}/getTasks/${todoId}`,
            {
                headers,
            }
        );
        // console.log(res.data.task)
        setTask(res.data.task);
    };

    //adding task
    const addTask = async (todoId, task) => {
        const res = await axios.post(
            // `http://localhost:5000/api/addTask/${todoId}`,
            `https://hungry-coat-pike.cyclic.app/api/addTask/${todoId}`,

            // `${process.env.REACT_APP_API}/addTask/${todoId}`,
            {
                main: task,
            },
            {
                headers,
            }
        );
        const newTasks = res.data.todo.task.slice();
        setTask(newTasks);
    };

    // check task
    const checkTask = async (todoId, taskId) => {
        console.log(headers);
        const res = await axios.put(
            // `http://localhost:5000/api/checkTask/${todoId}/${taskId},{}`,
            `https://hungry-coat-pike.cyclic.app/api/checkTask/${todoId}/${taskId},{}`,

            // `${process.env.REACT_APP_API}/checkTask/${todoId}/${taskId}`, {},
            {
                headers,
            }
        );
        console.log(res);
        const newTasks = res.data.todo.task.slice();
        setTask(newTasks);
    };

    //edit task
    const updateTask = async (todoId, taskId, update) => {
        console.log(cookie.token);

        const res = await axios.put(
            // `http://localhost:5000/api/updateTask/${todoId}/${taskId}`, update,
            `https://hungry-coat-pike.cyclic.app/api/updateTask/${todoId}/${taskId}`,
            update,

            // `${ process.env.REACT_APP_API } / updateTask / ${ todoId } / ${ taskId }`, update,
            {
                headers,
            }
        );
        console.log(res);
        const newtasks = res.data.todo.task.slice();
        setTask(newtasks);
    };

    ///delet task

    const deleteTask = async (todoId, taskId) => {
        const res = await axios.delete(
            // `http://localhost:5000/api/deleteTask/${todoId}/${taskId}`,
            `https://hungry-coat-pike.cyclic.app/api/deleteTask/${todoId}/${taskId}`,


            // `${process.env.REACT_APP_API}/deleteTask/${todoId}/${taskId}`,
            {
                headers,
            }
        );
        console.log(res);
        const newtasks = res.data.todo.task.slice();
        setTask(newtasks);
    };

    return (
        <TaskContext.Provider
            value={{
                getTasks,
                setTask,
                task,
                addTask,
                updateTask,
                checkTask,
                deleteTask,
                setCookie,
                cookie,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
};
