import axios from 'axios';

const headers = {
  'Cache-Control': 'no-cache',
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};

const api = axios.create({
  headers,
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
