import axiosClient from 'api/AxiosClient'

export const getAvailableHeros = () => axiosClient().get('/heros/available')

export const getHeros = () => axiosClient().get('/heros')

export const getAnswersByHeroId = (heroId) => axiosClient().get(`/heros/${heroId}/answers`)
