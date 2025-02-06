// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './slices/articleSlice.ts';
import authReducer from './slices/authSlice.ts';
import chatReducer from './slices/chatSlice.ts';
import chatRoomReducer from './slices/chatRoomSlice.ts';
import folderReducer from './slices/folderSlice.ts';
import leadReducer from './slices/leadSlice.ts';
import { persistStore as reduxPersistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import listenerMiddleware from './middleware/listenerMiddleware.ts';


const persistConfig = {
    key: 'root',
    storage, // Saves the Redux state in localStorage
};

const persistedArticleReducer = persistReducer(persistConfig, articleReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedChatReducer = persistReducer(persistConfig, chatReducer);
const persistedChatRoomReducer = persistReducer(persistConfig, chatRoomReducer);
const persistedFolderReducer = persistReducer(persistConfig, folderReducer);

export const store = configureStore({
    reducer: {
        article: persistedArticleReducer,
        auth: persistedAuthReducer,
        chat: persistedChatReducer,
        chatRoom: persistedChatRoomReducer,
        folders: persistedFolderReducer,
        lead: leadReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                immutableCheck: false, // Disable the ImmutableStateInvariantMiddleware
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST'], // Ignore the persist action
                    ignoredPaths: ['register'], // Ignore non-serializable paths
                },
            }
        ).prepend(listenerMiddleware.middleware),
});


export const persistStore = reduxPersistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;