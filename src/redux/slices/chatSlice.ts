import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";
import { ObjectId } from "bson";

export const saveChat = createAsyncThunk(
  'chat/save',
  async ({ receiverId, senderId, content, chatRoomId, type, media, internalAI, externalAI }: any, { rejectWithValue }) => {
    try {
      console.log('sending post for chat', media)
      const formData = new FormData();
      formData.append('receiverId', receiverId);
      formData.append('chatRoomId', chatRoomId);
      formData.append('content', content);
      formData.append('type', type);
      formData.append('media', media);
      formData.append('internalAI', internalAI);
      formData.append('externalAI', JSON.stringify(externalAI));

      console.log('formData ',formData);      
      const { data } = await API.post(`/api/chat/save/${senderId}`, formData, { withCredentials: true });
      return data; // Assume response includes token and user data
    } catch (error) {
      return rejectWithValue(error);  }
    }
);

export const startNewChat = createAsyncThunk('chat/startNewChat', async (_, { rejectWithValue }) => {
  try {
    const chatRoomId = new ObjectId().toString(); // Generate BSON ObjectId
    console.log('gotten response for chat', 'data')

    const chat =  {
      chatRoomId,
      receiverId: { _id: "679f70fa087ddee39b7efc5b"},
      }
    return [chat];
  } catch (error) {
    return rejectWithValue(error);  }
});

export const getChatByRoomId = createAsyncThunk('chat/get', async ({chatRoomId}: {chatRoomId: any}, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/chat/get/${chatRoomId}`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error);  
  }
});

export const deleteChatByRoomId = createAsyncThunk('chat/remove', async ({ room }: { room: string }, { rejectWithValue }) => {
  try {
    const { data } = await API.delete(`/api/chat/remove/${room}`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error);  
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chat: [] as any[],
    loading: false,
    status: null,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearChat: (state, action) => {
      state.chat = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Post Chat
      .addCase(saveChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveChat.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;

        // state.chat = 
      })
      .addCase(saveChat.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Chat
      .addCase(getChatByRoomId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatByRoomId.fulfilled, (state, action) => {
        state.chat = action.payload;
        state.loading = false;
      })
      .addCase(getChatByRoomId.rejected, (state, action: any) => {
        state.loading = true;
        state.error = action.payload;
      })


      // Start New Chat
      .addCase(startNewChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startNewChat.fulfilled, (state, action) => {
        console.log('action [atlond ', action.payload)
        state.chat = action.payload;
        state.loading = false;
      })
      .addCase(startNewChat.rejected, (state, action: any) => {
        state.loading = true;
        state.error = action.payload;
      })


      // Delete Chat
      .addCase(deleteChatByRoomId.pending, (state: any) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteChatByRoomId.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loading = false;
      })
      .addCase(deleteChatByRoomId.rejected, (state, action: any) => {
        state.loading = true;
        state.error = action.payload;
      })
  },
});

export const { resetError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
