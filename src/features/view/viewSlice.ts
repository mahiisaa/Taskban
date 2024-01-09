import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IView {
  type: string;
}

const initialState: IView = {
  type: "column",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    chengeView: (state, action: PayloadAction<IView>) => {
      state.type = action.payload.type;
    },
  },
});

export const { chengeView } = viewSlice.actions;

export const selectView = (state: RootState) => state.view.type;

export default viewSlice.reducer;
