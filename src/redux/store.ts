// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import chatReducer from './slices/chatSlice.ts';
import leadReducer from './slices/leadSlice.ts';
import chatRoomReducer from './slices/chatRoomSlice.ts';
import { persistStore as reduxPersistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import listenerMiddleware from './middleware/listenerMiddleware.ts';


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
        lead: leadReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware), 
});


export const persistStore = reduxPersistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;