import React, { useRef, useState } from "react";
import TodoModal from "../../Modals/TodoModal";
import TodoDisplay from "./TodoDisplay";
import EditTodoModal from "../../Modals/EditTodo";

const MainScreen = () => {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showEditTodoModal, setShowEditTodoModal] = useState(false);
  const todoToEdit = useRef({});

  return (
    <div className="relative">
      <TodoDisplay
        todoToEdit={todoToEdit}
        setShowEditTodoModal={setShowEditTodoModal}
        setShowTodoModal={setShowTodoModal}
      />

      {showTodoModal && <TodoModal setShowTodoModal={setShowTodoModal} />}
      {showEditTodoModal && (
        <EditTodoModal
          todoToEdit={todoToEdit}
          setShowEditTodoModal={setShowEditTodoModal}
        />
      )}
    </div>
  );
};

export default MainScreen;
