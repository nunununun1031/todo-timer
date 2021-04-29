import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  todos: [
    { id: nanoid(), content: "redux-1", isDone: false, totalTime: 0 },
    { id: nanoid(), content: "redux-2", isDone: false, totalTime: 0 },
    { id: nanoid(), content: "redux-3", isDone: true, totalTime: 0 },
  ],
  selectedTodo: { id: 0, content: "", isDone: false, totalTime: 0 },
  isModalOpen: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        content: action.payload,
        isDone: false,
        totalTime: 0,
      };
      return [...state.todos, newTodo];
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    changeIsDone: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      });
    },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    selectTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  changeIsDone,
  selectTodo,
} = todoSlice.actions;

export const selectTodos = (state) => state.todo.todos;

export const selectIsModalOpen = (state) => state.todo.isModalOpen;

export const selectSelectedTodo = (state) => state.todo.selectedTodo;

export default todoSlice.reducer;
