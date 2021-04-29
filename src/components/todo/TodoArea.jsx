import React from "react";
import styles from "./TodoArea.module.scss";
import {
  useDispatch,
  //  useSelector
} from "react-redux";
import {
  deleteTodo,
  changeIsDone,
  // selectIsModalOpen,
} from "../../features/task/taskSlice";

import {
  Typography,
  IconButton,
  //  Modal
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const TodoArea = ({ notFinishTodos }) => {
  const dispatch = useDispatch();
  // const isModalOpen = useSelector(selectIsModalOpen);

  return (
    <div>
      <h2>Todo</h2>
      <div className={styles.root}>
        {notFinishTodos.map((todo) => {
          return (
            <div key={todo.id}>
              <div className={styles.todo_content}>
                <Typography className={styles.todo_text}>
                  {todo.content}
                </Typography>
                <IconButton onClick={() => console.log("test")}>
                  <QueryBuilderIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(changeIsDone(todo.id))}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
                  <DeleteIcon />
                </IconButton>
              </div>
              {/* <Modal></Modal> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoArea;
