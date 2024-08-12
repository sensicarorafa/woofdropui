import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + "/api/v1",
});

api.interceptors.response.use(
  (response) => response.data,
  (error) =>
    error.response?.data || {
      status: 500,
      success: false,
      message: "Service unavailable at the moment, check back later",
      data: null,
    },
);

export default api;
