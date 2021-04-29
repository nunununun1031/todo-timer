import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import styles from "./InputArea.module.scss";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/task/taskSlice";

const InputArea = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
  };

  const onButtonClick = () => {
    if (text.trim().length === 0) {
      return;
    }
    dispatch(addTodo(text));

    setText("");
  };
  return (
    <div>
      <TextField
        type="text"
        value={text}
        onChange={handleText}
        label="Todoを入力"
      />
      <Button
        className={styles.input_button}
        color="primary"
        variant="contained"
        disabled={text.trim().length === 0}
        onClick={onButtonClick}
      >
        確定
      </Button>
    </div>
  );
};

export default InputArea;
