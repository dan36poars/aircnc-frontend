import axios from 'axios';

const env = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : process.env.REACT_APP_API_URL;

const api = axios.create({
	baseURL: env
});

export default api;