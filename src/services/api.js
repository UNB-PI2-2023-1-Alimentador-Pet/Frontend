import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.timeout = 60 * 1000;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.response.use(
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

export default axios;
