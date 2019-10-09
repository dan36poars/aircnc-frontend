import axios from 'axios';

const env = process.env.NODE_ENV === 'development' ? 'http://192.168.0.3:3333' : process.env.REACT_APP_API_URL;

console.log(env);
const api = axios.create({
	baseURL: env
});

export default api;