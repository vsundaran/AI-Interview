import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your backend URL
    withCredentials: true, // Allows cookies to be sent with requests
});

export default API;
