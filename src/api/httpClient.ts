import axios from 'axios';
import env from '../env';

const httpClient = axios.create({
  baseURL: env.API_ENDPOINT,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default httpClient;
