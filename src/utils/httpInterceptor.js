import axios from 'axios';
import { DEV_BASE_URL } from '../constants';

var axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = 'http://localhost:6001/api/4';
axiosInstance.defaults.baseURL = DEV_BASE_URL;
axiosInstance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem('idToken')) {
      config['headers']['Authorization'] = JSON.parse(
        localStorage.getItem('idToken')
      );
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // if(response.data.statusCode >= 200 && response.data.statusCode < 300){
    if (response.data.success == true) {
      return response.data;
    } else {
      return response.data;
    }
  },
  function (error) {
    return error.response.data;
  }
);

export default axiosInstance;
