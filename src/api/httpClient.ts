import axios from 'axios';
import env from '../env';

const httpClient = axios.create({
  baseURL: env.API_ENDPOINT,
});

httpClient.interceptors.request.use((config) => {
  return config;
});

export default httpClient;
