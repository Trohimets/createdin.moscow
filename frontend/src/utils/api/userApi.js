import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './apiAuth'

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: '/auth/user',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: 'error' })
        },
      },
    }),
    
    getErrorProne: build.query({
      query: () => 'error-prone',
    }),
  }),
})

export const {
  useRegisterMutation,
  useGetErrorProneQuery,
} = postsApi

export const {
  endpoints: { register },
} = postsApi