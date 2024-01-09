import { IBoard, IBoardData } from "./../../interfaces/board";
import { RootState } from "../../app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IBoardData = {
  boards: [],
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    all: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
    clearState: (state) => {
      state.boards = [];
    },
    add: (state, action) => {
      state.boards.push({
        ...action.payload
      });
    },
    board_update_name: (state, action) => {
      state.boards.forEach((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
        }
      });
    },
    board_remove: (state, action) => {
      state.boards = state.boards.filter((item) => {
        return item.id !== action.payload.id;
      });
    },
    addNewTask: (state, action) => {
      state.boards.forEach((item) => {
        if (Number(item.id) === Number(action.payload.id)) {
          item.tasks.push(action.payload.response);
        }
      });
    },
    updateTask: (state, action) => {},
    removeTask: (state, action) => {
      state.boards.forEach((item) => {
        if (item.id === action.payload.bid) {
          item.tasks=item.tasks.filter((task) => task.id !== action.payload.tid);
        }
      });
    },
    archiveTask: (state, action) => {},
  },
});

export const {
  all,
  add,
  board_update_name,
  board_remove,
  addNewTask,
  removeTask,
  archiveTask,
  clearState,
  updateTask,
} = boardSlice.actions;
export const selectBoard = (state: RootState) => state.boards;
export default boardSlice.reducer;
