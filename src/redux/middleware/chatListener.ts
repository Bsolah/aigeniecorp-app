import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { getChatByRoomId, saveChat, deleteChatByRoomId, getChatsByCurrentUser } from '../slices/chatSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(saveChat.fulfilled),
    effect: async (action: any, listenerApi) => {
        listenerApi.dispatch(getChatsByCurrentUser());
        
        const regex = /chatRoomId\s([a-f0-9]{24})/;
        const match = action.payload?.match(regex);
        // Get the chat id from action.payload and dispatch getChatById to fetch specific chat
        const chatId = match[1];
        if (chatId) {
            listenerApi.dispatch(getChatByRoomId({ chatRoomId: chatId })); // Dispatch getChatById with the chatId
        }
    },
});

listenerMiddleware.startListening({
    matcher: isAnyOf(deleteChatByRoomId.fulfilled),
    effect: async (_, listenerApi) => {
        listenerApi.dispatch(getChatsByCurrentUser());
    },
});


export default listenerMiddleware;
