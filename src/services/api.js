import axios from 'axios';

import {API_URL} from '@env';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return error.response;
    }
    if (error.request) {
      return error.request;
    }
    return Promise.reject(error);
  },
);

export default api;
