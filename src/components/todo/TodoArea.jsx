import React from "react";
import styles from "./TodoArea.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  changeIsDone,
  handleModalOpen,
  selectIsModalOpen,
  selectTodo,
  selectSelectedTodo,
} from "../../features/task/taskSlice";

import Timer from "../timer/Timer";
import { Typography, IconButton, Modal } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const TodoArea = ({ notFinishTodos }) => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectSelectedTodo);
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleOpen = (todo) => {
    dispatch(selectTodo(todo));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

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
                <IconButton onClick={() => handleOpen(todo)}>
                  <QueryBuilderIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(changeIsDone(todo.id))}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <Modal
                className={styles.modal}
                open={isModalOpen}
                onClose={handleClose}
              >
                <div className={styles.modal_content}>
                  <Typography>{selectedTodo.content}</Typography>
                  <Timer todo={todo} />
                </div>
              </Modal>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoArea;
