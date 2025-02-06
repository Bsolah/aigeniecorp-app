// src/api/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://aigeniecorp-api.vercel.app'; // Fallback URL in case no env var is set
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
//   (response) => {
//     // Handle responses globally
//     return response;
//   },
//   (error) => {
//     // Handle errors globally (e.g., redirect to login on 401)
//     if (error.response?.status === 401) {
//       // Redirect to login or handle unauthorized access
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default API;
