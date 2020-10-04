import axiosInstance from './httpInterceptor'

export const globalGetService = (url, params) => {
    return new Promise(
      function(resolve, reject){
        axiosInstance({
          method: 'GET',
          url: url,
          params: params
        })
        .then(response => {
          resolve(response);
        }).catch((error) => { reject(error)})
      }
    )
  }
  export const globalPostService = (url, data) => {
    return new Promise(
      function(resolve, reject){
        axiosInstance({
          method: 'POST',
          url: url,
          data: data
        })
        .then(response => {
          resolve(response);
        }).catch((error) => { reject(error)})
      }
    )
}