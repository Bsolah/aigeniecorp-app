// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import chatRoomReducer from './slices/chatRoomSlice';
import { persistStore as reduxPersistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
    key: 'root',
    storage, // Saves the Redux state in localStorage
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedChatReducer = persistReducer(persistConfig, chatReducer);
const persistedChatRoomReducer = persistReducer(persistConfig, chatRoomReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        chat: persistedChatReducer,
        chatRoom: persistedChatRoomReducer,
    },
});


export const persistStore = reduxPersistStore(store);