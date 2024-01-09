import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type Setting = {
  theme:string
};

const initialState: Setting = localStorage.getItem("setting")
  ? JSON.parse(localStorage.getItem("setting") || "{}")
  : {theme:"#208D8E"};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {   
    updateSetting: (state, action: PayloadAction<Setting>) => {
      state.theme= action.payload?.theme;
      localStorage.setItem("setting", JSON.stringify(state));
    },
  },
});

export const {updateSetting} = settingSlice.actions;
export const selectSetting = (state: RootState) => state.setting;

export default settingSlice.reducer;
