import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { getOrg } from '../slices/orgSlice.ts';
import { getRootFolders } from '../slices/folderSlice.ts';
import { getChatsByCurrentUser } from '../slices/chatSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(getOrg.fulfilled),
    effect: async (action: any, listenerApi) => {
            const orgId = action.payload?.data?._id;
            // console.log('I am here ', action)

            
            // console.log({parentId})
            listenerApi.dispatch(getChatsByCurrentUser());
            listenerApi.dispatch(getRootFolders({orgId: orgId}));
        
        // listenerApi.dispatch(getRootFolders({orgId: orgId}));
    },
});


export default listenerMiddleware;
