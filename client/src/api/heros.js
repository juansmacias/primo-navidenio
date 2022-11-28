import axiosClient from 'api/AxiosClient'

export const getAvailableHeros = () => axiosClient().get('/heros/available')