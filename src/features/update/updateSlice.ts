import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ISection {
  workspace: number;
  task: number;
  project: number;
  board: number;
  theme: number;
}

const initialState: ISection = {
  workspace: 0,
  task: 0,
  project: 0,
  board: 0,
  theme: 0,
};

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    workSpaceEvent: (state) => {
      state.workspace += 1;
    },
    themeEvent: (state) => {
      state.task += 1;
    },
    addProject: (state) => {
      state.project += 1;
    },
    addTask: (state) => {
      state.task += 1;
    },
    addBoard: (state) => {
      state.board += 1;
    },
  },
});

export const { workSpaceEvent, addProject, addTask, addBoard, themeEvent } =
  updateSlice.actions;

export const workSpaceStatus = (state: RootState) => state.update.workspace;
export const themeStatus = (state: RootState) => state.update.theme;
export const projectUpdate = (state: RootState) => state.update.project;
export const taskUpdate = (state: RootState) => state.update.task;
export const boardUpdate = (state: RootState) => state.update.board;

export default updateSlice.reducer;
