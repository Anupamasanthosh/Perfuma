import {combineReducers,configureStore} from '@reduxjs/toolkit'
import adminReducer from './adminReducer'
import { persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import brandReducer from './brandReducer'
import productReducer from './productReducer'

const rootReducer=combineReducers({Auth:adminReducer,
    User:userReducer,
    Category:categoryReducer,
    Brand:brandReducer,
    Product:productReducer
})

const persistConfig={
    key:'root',
    version:1,
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedReducer
})

export const persistor =persistStore(store)