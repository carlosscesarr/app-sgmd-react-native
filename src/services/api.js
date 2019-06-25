import axios from 'axios';

export default api = axios.create(
    {
        baseURL: 'http://192.168.15.100/api-sgmd',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json'
        }
    },
);