import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import styles from "./FinishTodoArea.module.scss";
import { useDispatch } from "react-redux";

import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { changeIsDone, deleteTodo } from "../../features/task/taskSlice";

const FinishTodoArea = ({ finishTodos }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Finished</h2>
      <div className={styles.root}>
        {finishTodos.map((todo) => {
          return (
            <div key={todo.id}>
              <div className={styles.todo_content}>
                <Typography className={styles.todo_text}>
                  {todo.content}
                </Typography>
                <IconButton onClick={() => dispatch(changeIsDone(todo.id))}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinishTodoArea;
