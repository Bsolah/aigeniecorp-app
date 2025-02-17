import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { createArticle } from '../slices/articleSlice.ts';
import {  createFolder, getFolders } from '../slices/folderSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(createFolder.fulfilled, createArticle.fulfilled),
    effect: async (_, listenerApi) => {
        listenerApi.dispatch(getFolders());
    },
});


export default listenerMiddleware;
