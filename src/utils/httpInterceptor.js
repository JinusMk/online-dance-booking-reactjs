import axios from 'axios';
import {toastFlashMessage} from '../utils';
var axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://18.222.113.177/api/';
axiosInstance.interceptors.request.use(function(config){
    if(localStorage.getItem('idToken')){
      config['headers']['Authorization'] = JSON.parse(localStorage.getItem('idToken'));
    }
    return config
  },function(error){
    return Promise.reject(error)
  })

  axiosInstance.interceptors.response.use(function(response){
    // if(response.data.statusCode >= 200 && response.data.statusCode < 300){
    if(response.data.success == true){
      return response.data;
    }else{
      return response.data;
    }
  },function(error){
    return Promise.reject(error)
  })

  export default axiosInstance