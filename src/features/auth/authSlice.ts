import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Cookies from "js-cookie";

type Auth = {
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number:string;
  refresh?: string;
  access: string;
  thumbnail: string;
};

const initialState: Auth = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "{}")
  : {
      user_id: 0,
      first_name: "",
      last_name: "",
      access: "",
      thumbnail: "",
      Phone_number:""
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      state.user_id = action.payload?.user_id;
      state.first_name = action.payload?.first_name;
      state.last_name = action.payload?.last_name;
      state.access = action.payload?.access;
      state.thumbnail = action.payload?.thumbnail;

      // save refresh token in cookie and some user information in localstorage
      Cookies.set("refresh", action.payload?.refresh, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.user_id = 0;
      state.first_name = "";
      state.last_name = "";
      state.access = "";
      state.thumbnail = "";

      Cookies.remove("refresh");
      localStorage.removeItem("user");
    },
    refresh: (state, action: PayloadAction<Auth>) => {
      state = {
        ...state,
        access: action.payload.access,
      };
      localStorage.setItem("user", JSON.stringify(state));
    },
    updateAccount: (state, action: PayloadAction<Auth>) => {
      state = {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        phone_number:action.payload.phone_number,
        thumbnail:action.payload.thumbnail
      };
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { login, logout, refresh,updateAccount } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.access;
export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
