import axios from "axios";

const apiService = axios.create({
  baseURL: `https://wholesomebywh.com:3000/api/v1/`,
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(`token`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return error;
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }

    return error;
  }
);

export default apiService;
