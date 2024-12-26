// axiosConfig.js
import axios from "axios";

// Base URL ve global ayarlar
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Django API'nin base URL'si
});

// Request Interceptor: Authorization header'a JWT access token'ı ekler
instance.interceptors.request.use((config) => {
  // LocalStorage'dan access token'ı al
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Access token'ı header'a ekle
  }
  return config;
});

export default instance;
