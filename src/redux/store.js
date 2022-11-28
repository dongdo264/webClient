import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const persistConfig = {
    key: 'auth',
    storage
}

const reducer = combineReducers({
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store =  configureStore({
    reducer: persistedReducer
})
export const persistor = persistStore(store);
export default store;
