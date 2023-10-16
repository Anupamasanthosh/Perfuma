import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer'
import { persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer=combineReducers({Auth:AuthReducer})

const persistConfig={
    key:'root',
    version:1,
    storage
}
const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedReducer
})

export const persistor=persistStore(store)