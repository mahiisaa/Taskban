import axios from "axios";
import { store } from "../app/store";
import { refresh } from "../features/auth/authSlice";
import Cookies from "js-cookie";
import API_URL from "../constants/api.url";
import { toast } from "react-toastify";
import { login } from "../constants/url";

export const baseAppURL = "https://quera.iran.liara.run/";

export const AXIOS = axios.create({
  baseURL: baseAppURL,
});

AXIOS.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.access;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AXIOS.interceptors.response.use(
  (response) => {
    // if (
    //   response.status === 200 ||
    //   response.status === 201 ||
    //   response.status === 204
    // ) {
    //   toast.info("عملیات با موفقیت انجام شد.");
    // }
    return response;
  },
  async (error) => {
    const request = error.config;

    if ((error.response.status === 401 && request._retry) && request.url !== login.post()) {
      request._retry = true
      try {
        const refreshToken = Cookies.get("refresh");
        const refreshRequest = await AXIOS.post(API_URL.Refresh, {
          refresh: refreshToken,
        });
        const access = refreshRequest.data.access;

        store.dispatch(refresh(access));

        request.headers.Authorization = `Bearer ${access}`;
        return axios(request);
      } catch (error) {
        window.location.href = baseAppURL;
      }
    } else {
      if (error.response.data?.detail) {
        // hande show error as a string
        toast.error(error.response.data.detail);
      } else {
        // handle errors as array of objects
        Object.keys(error.response.data).map((item) => {
          error.response.data[item].map((error) => {
            toast.error(error);
          });
        });
      }
      return Promise.reject(error);
    }
  }
);