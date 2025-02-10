// src/api/api.js
const API_URL = import.meta.env.VITE_API_URL; // || "http://localhost:5000" // "https://aigeniecorp-api.vercel.app"; // Fallback URL in case no env var is set
import axios from 'axios';

const API = axios.create({
  baseURL: API_URL, // Update with your backend URL
  withCredentials: true,
});

// API.interceptors.request.use(
//   (config) => {
//     // Perform actions before the request is sent, e.g., adding headers
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       store.dispatch(logout()); // Dispatch logout action
//     }
//     return Promise.reject(error);
//   }
// );

export default API;
