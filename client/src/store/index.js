import thunk from 'redux-thunk'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import promiseMiddleware from 'redux-promise-middleware'
import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'

import { api } from 'api/auth'
import authReducer from 'reducers/auth'
import userReducer from 'reducers/user'
import tipsReducer from 'reducers/tips'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: persistedReducer,
    user: userReducer,
    tips:tipsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }}).concat(logger,promiseMiddleware,api.middleware,thunk),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
