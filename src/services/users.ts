import { createApi } from '@reduxjs/toolkit/query/react'

// services
import { axiosBaseQuery } from 'config/axiosBaseQuery'

export const usersApi = createApi({
    baseQuery: axiosBaseQuery(),
    reducerPath: 'usersApi',
    endpoints(build) {
        return {
            getUsers: build.query({
                query: ({ hasFilters, ...params }) =>
                    ({ url: `/users/${hasFilters ? '/filter' : ''}`, params })
            }),
        }
    },
})

export const { useGetUsersQuery } = usersApi