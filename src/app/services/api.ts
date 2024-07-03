// utils/axiosConfig.ts
import axios from 'axios';
import { parseCookies } from 'nookies';

const axiosInstance = axios.create({
  baseURL: 'https://aonde-ir-back.vercel.app/', // Defina sua URL base da API
  headers: {
    'Content-Type': 'application/json',
    Content: 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para incluir token de autenticação em cada requisição, se disponível
axiosInstance.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies['@nextauth.token']; // Assumindo que o token está armazenado nos cookies com a chave 'token'
  

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});



export default axiosInstance;
