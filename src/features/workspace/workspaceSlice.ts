import { RootState } from "../../app/store";
import { IData, IWorkspace } from "../../interfaces/workspace";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IData = {
  workspaces: [],
};

export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    all: (state, action: PayloadAction<IWorkspace[]>) => {
      state.workspaces = action.payload;
    },
    add: (state, action) => {
      state.workspaces.push({
        ...action.payload,
        projects: [],
      });
    },
    update_color: (state, action) => {
      state.workspaces.forEach((item) => {
        if (item.id === action.payload.id) {
          item.color = action.payload.color;
        }
      });
    },
    update_name: (state, action) => {
      state.workspaces.forEach((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
        }
      });
    },
    removeWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter((item) => {
        return item.id !== action.payload;
      });
    },
    addProjects: (state, action) => {
      state.workspaces.forEach((item) => {
        if (item.id === action.payload.id) {
          item.projects = action.payload.response;
        }
      });
    },
    addNewProject: (state, action) => {
      state.workspaces.forEach((item) => {
        if (item.id === action.payload.id) {
          item.projects?.push(action.payload.response);
        }
      });
    },
    removeProject: (state, action) => {
      state.workspaces.forEach((item) => {
        if (item.id === action.payload.wid) {
          item.projects = item.projects?.filter((pro) => {
            return pro.id !== action.payload.pid;
          });
        }
      });
    },
    project_update_name: (state, action) => {
      state.workspaces.forEach((item) => {
        if (item.id === Number(action.payload.wid)) {
          item.projects?.forEach((pro) => {
            if (pro.id === action.payload.response.id) {
              pro.name = action.payload.response.name;
            }
          });
        }
      });
    },
  },
});

export const {
  all,
  add,
  update_color,
  update_name,
  removeWorkspace,
  addProjects,
  addNewProject,
  removeProject,
  project_update_name,
} = workspaceSlice.actions;
export const selectWorkspace = (state: RootState) => state.workspaces;
export default workspaceSlice.reducer;
