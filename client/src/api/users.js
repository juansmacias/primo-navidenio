import axiosClient from 'api/AxiosClient'

export const getUser = (token,userId) => axiosClient(token).get('/users/'+userId)