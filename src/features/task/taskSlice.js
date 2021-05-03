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
      state.todos = [...state.todos, newTodo];
      // return { ...initialState, todos: [...state.todos, newTodo] };
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    changeIsDone: (state, action) => {
      state.todos = state.todos.map((todo) => {
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
      state.selectedTodo = { ...action.payload, totalTime: 0 };
    },
    addTime: (state, action) => {
      state.selectedTodo.totalTime += action.payload;
    },
    resetTime: (state) => {
      state.selectedTodo.totalTime = 0;
    },
    totalTimeSum: (state, action) => {
      // state.todosの中から指定のtodosを抜き出す
      const todo = state.todos.find((t) => t.id === action.payload.id);
      // 抜き出したtodoのをtotalTime変更する
      if (todo) {
        todo.totalTime += action.payload.totalTime;
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  changeIsDone,
  handleModalOpen,
  selectTodo,
  addTime,
  resetTime,
  totalTimeSum,
} = todoSlice.actions;

export const selectTodos = (state) => state.todo.todos;

export const selectIsModalOpen = (state) => state.todo.isModalOpen;

export const selectSelectedTodo = (state) => state.todo.selectedTodo;

export default todoSlice.reducer;
