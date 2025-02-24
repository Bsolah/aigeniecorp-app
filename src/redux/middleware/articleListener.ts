import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { createArticle, deleteArticle, getArticleById } from '../slices/articleSlice.ts';
import { getSubFolders } from '../slices/folderSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(createArticle.fulfilled),
    effect: async (action: any, listenerApi) => {
        
        const id = action?.payload?.data?.article?._id

        listenerApi.dispatch(getArticleById(id));
        // window.location.href = (`/id/repository/${id}?edit=true`)
    },
});

listenerMiddleware.startListening({
    matcher: isAnyOf(createArticle.fulfilled, deleteArticle.fulfilled),
    effect: async (action: any, listenerApi) => {

        // const state: any = listenerApi.getState();
        let parentId = action?.payload?.parentId;

        
        listenerApi.dispatch(getSubFolders({id: parentId}));
    },
});




export default listenerMiddleware;
