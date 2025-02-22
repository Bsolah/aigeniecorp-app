// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import aiReducer from './slices/aiSlice.ts';
import articleReducer from './slices/articleSlice.ts';
import authReducer from './slices/authSlice.ts';
import chatReducer from './slices/chatSlice.ts';
import folderReducer from './slices/folderSlice.ts';
import leadReducer from './slices/leadSlice.ts';
import { persistStore as reduxPersistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatListener from './middleware/chatListener.ts';
import folderListener from './middleware/folderListener.ts';
import articleListener from './middleware/articleListener.ts';


const persistConfig = {
    key: 'root',
    storage, // Saves the Redux state in localStorage
};

const persistedArticleReducer = persistReducer(persistConfig, articleReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedChatReducer = persistReducer(persistConfig, chatReducer);
const persistedFolderReducer = persistReducer(persistConfig, folderReducer);

export const store = configureStore({
    reducer: {
        ai: aiReducer,
        article: persistedArticleReducer,
        auth: persistedAuthReducer,
        chat: persistedChatReducer,
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
        ).prepend(chatListener.middleware,
            folderListener.middleware, 
            articleListener.middleware),
});


export const persistStore = reduxPersistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store.dispatch;