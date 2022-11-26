import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default function AxiosClient(token){
    return token?axios.create({
        baseURL: API_URL,
        headers:{'authorization':`Bearer ${token}`}
      }):
      axios.create( { baseURL: API_URL } )
}