import axiosClient from 'api/AxiosClient'

export const postAnswersAPI = (data) => axiosClient().post('/answers',data)
export const putAnswersAPI = (data) => axiosClient().put('/answers',data)