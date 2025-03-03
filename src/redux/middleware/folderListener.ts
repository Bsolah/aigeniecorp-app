import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
// import { createArticle } from '../slices/articleSlice.ts';
import {  createFolder, getSubFolders, updateFolder } from '../slices/folderSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(createFolder.fulfilled, updateFolder.fulfilled),
    effect: async (action: any, listenerApi) => {
            const parentId = action.payload.parentId;

             console.log('parentId', parentId);
            
            listenerApi.dispatch(getSubFolders({id: parentId}));
        
        // listenerApi.dispatch(getRootFolders({orgId: orgId}));
    },
});


export default listenerMiddleware;
