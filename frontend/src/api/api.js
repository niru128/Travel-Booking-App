import axios from 'axios';

const api = axios.create({
    baseURL: 'https://travel-booking-app-79zg.onrender.com/api',
})

export default api;