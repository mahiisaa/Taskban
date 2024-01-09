import { RootState } from "../../app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskData } from "../../interfaces/task";

const initialState: ITaskData = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    allTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    }   
  },
});

export const { allTasks } = taskSlice.actions;
export const selectTask = (state: RootState) => state.tasks;
export default taskSlice.reducer;
