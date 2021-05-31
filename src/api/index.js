import axios from 'axios'

export default api = axios.create({
    baseURL: 'http://192.168.0.107:8888',
    timeout: 5000,
})