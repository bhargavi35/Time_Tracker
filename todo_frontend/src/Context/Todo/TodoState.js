import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import TodoContext from "./TodoContext";

export const TodoState = (props) => {
    const [cookie, setCookie] = useCookies();
    const [todo, setTodo] = useState([]);

    const headers = {
        "Contenet-Type": "application/json",
        token: cookie.token,
    };

    //get Todo
    const getTodos = async () => {
        const res = await axios.get(
            // `http://localhost:5000/api/getTodos`,
            // `https://hungry-coat-pike.cyclic.app/api/getTodos`,

            `${process.env.REACT_APP_API}/api/getTodos`,
            {
                headers,
            }
        );
        console.log(res.data.todo);
        setTodo(res.data.todo);
    };

    //adding todo
    const createTodo = async (title, color) => {
        const res = await axios.post(
            // `http://localhost:5000/api/createTodos`,
            // `https://hungry-coat-pike.cyclic.app/api/createTodos`,

            `${process.env.REACT_APP_API}/api/createTodos`,
            {
                title,
                color,
            },
            {
                headers,
            }
        );
        // console.log(res.data.todo)
        setTodo(todo.concat(res.data.todo));
    };

    //edit todo
    const updateTodo = async (todoId, update) => {
        const res = await axios.put(
            // `http://localhost:5000/api/updateTodos/${todoId}`, update,
            // `https://hungry-coat-pike.cyclic.app/api/updateTodos/${todoId}`, update,

            `${process.env.REACT_APP_API}/api/updateTodos/${todoId}`,
            update,
            {
                headers,
            }
        );
        const index = todo.indexOf(todo.filter((e) => e._id === todoId)[0]);
        const newTodos = todo.slice();
        newTodos.splice(index, 1, res.data.updatedTodo);
        // console.log(res.data.todo)
        setTodo(newTodos);
    };

    ///delet todo

    const deleteTodo = async (todoId) => {
        const res = await axios.delete(
            // `http://localhost:5000/api/deleteTodos/${todoId}`,
            // `https://hungry-coat-pike.cyclic.app/api/deleteTodos/${todoId}`,

            `${process.env.REACT_APP_API}/api/deleteTodos/${todoId}`,
            {
                headers,
            }
        );
        console.log(res);
        setTodo(todo.filter((e) => e._id != res.data.deleteTodo._id));
    };

    return (
        <TodoContext.Provider
            value={{
                getTodos,
                setTodo,
                todo,
                createTodo,
                updateTodo,
                deleteTodo,
                setCookie,
                cookie,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};
