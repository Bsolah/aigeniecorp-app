import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { getChatsByUser } from '../slices/chatRoomSlice.ts';
import { saveChat, saveChatWithMedia } from '../slices/chatSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(saveChat.fulfilled, saveChatWithMedia.fulfilled),

  effect: async (_, listenerApi) => {
    listenerApi.dispatch(getChatsByUser());
    // listenerApi.dispatch(getChatAllRooms());
  },
});

export default listenerMiddleware;
