import { baseUrl } from "@/constants/env";
import axios from "axios";

const axiosDynamic = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
  },
});

axiosDynamic.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default axiosDynamic;
