import { createApi } from '@reduxjs/toolkit/query/react'

// services
import { axiosBaseQuery } from 'config/axiosBaseQuery'

export const categoryApi = createApi({
    baseQuery: axiosBaseQuery(),
    reducerPath: 'categoryApi',
    endpoints(build) {
        return {
            getCategoryList: build.query({ query: () => ({ url: '/products/category-list' }) }),
        }
    },
})

export const { useGetCategoryListQuery } = categoryApi