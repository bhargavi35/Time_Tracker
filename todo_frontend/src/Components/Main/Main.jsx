import React from "react";
import { useState, useRef } from "react";
import EditTodoModal from "../../Modals/EditTodo";
import TodoModal from "../../Modals/TodoModal";
import CardDisplay from "./CardDisplay";

const Main = () => {
  const [todoModal, setTodoModal] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);
  const editTodo = useRef({});

  return (
    <div className="relative">
      <CardDisplay
        editTodo={editTodo}
        setTodoModal={setTodoModal}
        setEditTodoModal={setEditTodoModal}
      />
      {todoModal && <TodoModal todoModal={todoModal} />}
      {editTodoModal && (
        <EditTodoModal
          editTodo={editTodo}
          setEditTodoModal={setEditTodoModal}
        />
      )}
    </div>
  );
};

export default Main;
