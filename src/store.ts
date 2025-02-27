import { combineReducers, configureStore, PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit'

// services
import { usersApi } from './services/users'
import { productsApi } from './services/products'
import { categoryApi } from './services/category'

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
})

export const setupStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                usersApi.middleware,
                productsApi.middleware,
                categoryApi.middleware,
            ),
        preloadedState,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
