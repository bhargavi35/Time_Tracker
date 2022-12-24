import axios from "axios";
import { useState } from "react";
import TodoContext from "./TodoContext";
import { useCookies } from "react-cookie";

const TodoState = (props) => {
    const [cookies, setCookie] = useCookies();

    const [todos, setTodos] = useState([]);
    const headers = {
        "Content-Type": "application/json",
        token: cookies.token,
    };

    // getting todos
    const getTodos = async () => {
        // console.log(headers)//no cookie
        const res = await axios.get(
            // `http://localhost:5000/api/getTodos`,
            // `https://hungry-coat-pike.cyclic.app/api/getTodos`,

            `${process.env.REACT_APP_API}/api/getTodos`,
            {
                headers,
            }
        );
        console.log(res.data.todos);
        setTodos(res.data.todos);
    };

    // adding todo
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
        setTodos(todos.concat(res.data.todo));
    };

    // delete todo
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
        setTodos(todos.filter((e) => e._id !== res.data.deletedTodo._id));
    };

    // edit todo
    const editTodo = async (todoId, update) => {
        const res = await axios.put(
            // `http://localhost:5000/api/updateTodos/${todoId}`, update,
            // `https://hungry-coat-pike.cyclic.app/api/updateTodos/${todoId}`, update,

            `${process.env.REACT_APP_API}/api/updateTodos/${todoId}`,
            update,
            {
                headers,
            }
        );
        // const index = todos.indexOf(res.data.editedTodo);
        const index = todos.indexOf(todos.filter((e) => e._id === todoId)[0]);
        const newTodos = todos.slice();
        newTodos.splice(index, 1, res.data.editedTodo);

        // console.log(todos)
        setTodos(newTodos);
    };

    return (
        <TodoContext.Provider
            value={{
                getTodos,
                setTodos,
                todos,
                createTodo,
                deleteTodo,
                editTodo,
                setCookie,
                cookies,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};

export default TodoState;
