import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import updateReducer from "../features/update/updateSlice";
import viewReducer from "../features/view/viewSlice";
import workspaceSlice from "../features/workspace/workspaceSlice";
import settingReducer from "../features/setting/settingSlice";
import boardSlice from "../features/board/boardSlice";
import taskSlice from "../features/task/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    update: updateReducer,
    view: viewReducer,
    workspaces: workspaceSlice,
    setting:settingReducer,
    boards: boardSlice,
    tasks: taskSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
