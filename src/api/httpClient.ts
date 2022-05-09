import axios from 'axios';
import env from '../env';

const httpClient = axios.create({
  baseURL: env.API_ENDPOINT,
});

httpClient.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem('token');
  return config;
});

export default httpClient;
