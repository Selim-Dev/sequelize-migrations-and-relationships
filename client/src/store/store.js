import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import authSlice from "../features/authSlice";
import storage from '../utils/createWebStorage';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}


const reducers = combineReducers({
  auth: authSlice,
})


const persistedReducer = persistReducer(persistConfig, reducers)



export const store = configureStore({
  reducer: persistedReducer
});

export const persistor  = persistStore(store  )