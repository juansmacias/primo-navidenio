import axiosClient from 'api/AxiosClient'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = process.env.REACT_APP_API_URL

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL+'/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: (credentials) => ({
        url: 'authenticate',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation({
      query: () => 'protected',
    }),
  }),
})

export const { useAuthenticateMutation, useProtectedMutation } = api

export const goToLogin = (data) => axiosClient().post('/login',data)
