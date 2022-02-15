import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:25934/'
})

export default api;