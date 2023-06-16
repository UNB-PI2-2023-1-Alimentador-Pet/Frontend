import axios from 'axios';

import {ESP32_API_URL} from '@env';

const esp32 = axios.create({
  baseURL: ESP32_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

esp32.interceptors.response.use(
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

export default esp32;
