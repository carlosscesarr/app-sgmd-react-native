import axios from 'axios';

export default api = axios.create(
    {
        baseURL: 'http://192.168.25.22/api-sgmd',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    },
);