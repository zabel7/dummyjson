import { createApi } from '@reduxjs/toolkit/query/react'

// services
import { axiosBaseQuery } from 'config/axiosBaseQuery'

export const productsApi = createApi({
    baseQuery: axiosBaseQuery(),
    reducerPath: 'productsApi',
    endpoints(build) {
        return {
            getProducts: build.query({
                query: ({ category, ...params }) =>
                    ({ url: `/products/${category ? `/category/${category}` : ''}`, params })
            }),
        }
    },
})

export const { useGetProductsQuery } = productsApi