import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import TodoContext from "./TodoContext";

export const TodoState = (props) => {
    const [cookie, setCookie] = useCookies()
    const [todo, setTodo] = useState([])

    const headers = {
        'Contenet-Type': "application/json",
        "token": cookie.token
    }

    //get Todo
    const getTodos = async () => {
        const res = await axios.get(
            `http://localhost:5000/api/getTodos`,

            // `${process.env.REACT_APP_API}/getTodos`, 
            {
                headers
            })
        console.log(res.data.todo)
        setTodo(res.data.todo)
    }

    //adding todo
    const createTodo = async (title, color) => {
        const res = await axios.post(
            `http://localhost:5000/api/createTodos`,

            // `${process.env.REACT_APP_API}/createTodos`,
            {
                title, color
            }, {
            headers
        })
        // console.log(res.data.todo)
        setTodo(todo.concat(res.data.todo))
    }

    //edit todo
    const updateTodo = async (todoId, update) => {
        const res = await axios.put(
            `http://localhost:5000/api/updateTodos/${todoId}`, update,

            // `${process.env.REACT_APP_API}/updateTodos/${todoId}`, update, 
            {

                headers
            })
        const index = todo.indexOf(todo.filter(e => e._id === todoId)[0])
        const newTodos = todo.slice()
        newTodos.splice(index, 1, res.data.updatedTodo)
        // console.log(res.data.todo)
        setTodo(newTodos)
    }


    ///delet todo

    const deleteTodo = async (todoId) => {
        const res = await axios.delete(
            `http://localhost:5000/api/deleteTodos/${todoId}`, update,

            // `${process.env.REACT_APP_API}/deleteTodos/${todoId}`,
            {
                headers
            })
        console.log(res)
        setTodo(todo.filter(e => e._id != res.data.deleteTodo._id))
    }

    return (
        <TodoContext.Provider value={{ getTodos, setTodo, todo, createTodo, updateTodo, deleteTodo, setCookie, cookie }}>
            {props.children}
        </TodoContext.Provider>
    )
}
