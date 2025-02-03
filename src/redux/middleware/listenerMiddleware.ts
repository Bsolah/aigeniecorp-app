import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { saveChat } from '../slices/chatSlice.ts';
import { getChatsByUser } from '../slices/chatRoomSlice.ts';

// Create middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(saveChat.fulfilled),
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(getChatsByUser());
  }, 
});

export default listenerMiddleware;
