import axios from 'axios';

const axiosServices = axios.create();

// const axiosServices = axios.create({
//     baseURL: '/', // Update with your backend URL
//     // withCredentials: true,
//   });

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;


// const axiosServices = axios.create({
//     baseURL: '/api', // Update with your backend URL
//     withCredentials: true,
//   });

