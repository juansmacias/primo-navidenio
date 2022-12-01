import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default function AxiosClient(token){

  const axiosObj = token?axios.create({
    baseURL: API_URL,
    headers:{'authorization':`Bearer ${token}`}
  }):
  axios.create( { baseURL: API_URL } )

  axiosObj.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        window.location.href = '/signout';
      }
    })

    return axiosObj
}

