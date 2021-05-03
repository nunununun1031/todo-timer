import React from "react";
import { useSelector } from "react-redux";
import FinishTodoArea from "./FinishTodoArea";
import InputArea from "./InputArea";
import TodoArea from "./TodoArea";
import styles from "./Todo.module.scss";
import { selectTodos } from "../../features/task/taskSlice";

const Todo = () => {
  // const { todos } = useSelector((state) => state.todo);
  const todos = useSelector(selectTodos);

  const notFinishTodos = todos.filter((todo) => {
    return todo.isDone === false;
  });
  const finishTodos = todos.filter((todo) => {
    return todo.isDone === true;
  });
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1>Todo Redux</h1>
        <InputArea />
        <TodoArea notFinishTodos={notFinishTodos} />
        <FinishTodoArea finishTodos={finishTodos} />
      </div>
    </div>
  );
};

export default Todo;
