import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { createArticle, getArticleById, updateArticle } from '../slices/articleSlice.ts';
import { getFolders } from '../slices/folderSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(createArticle.fulfilled),
    effect: async (action: any, listenerApi) => {
        
        const id = action?.payload?.article?._id
        listenerApi.dispatch(getArticleById(id));
        window.location.href = (`/id/repository/${id}?edit=true`)
    },
});

listenerMiddleware.startListening({
    matcher: isAnyOf(createArticle.fulfilled, updateArticle.fulfilled),
    effect: async (_, listenerApi) => {
        
        listenerApi.dispatch(getFolders());
    },
});




export default listenerMiddleware;
