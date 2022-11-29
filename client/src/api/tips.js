import axiosClient from 'api/AxiosClient'

export const getTips = () => axiosClient().get('/tips')