import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";
import { ObjectId } from "bson";

export const saveChat = createAsyncThunk(
  'chat/save',
  async ({ receiverId, senderId, content, chatRoomId, type, media, internalAI, externalAI }: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('receiverId', receiverId);
      formData.append('chatRoomId', chatRoomId);
      formData.append('content', content);
      formData.append('type', type);
      formData.append('media', media);
      formData.append('internalAI', internalAI);
      formData.append('externalAI', JSON.stringify(externalAI));

      const {data} = await API.post(`/api/chat/save/${senderId}`, formData, { withCredentials: true });
      return data; // Assume response includes token and user data
    } catch (error) {
      return rejectWithValue(error);  }
    }
);

export const startNewChat = createAsyncThunk('chat/startNewChat', async (_, { rejectWithValue }) => {
  try {
    const chatRoomId = new ObjectId().toString(); // Generate BSON ObjectId

    const chat =  {
      chatRoomId,
      receiverId: { _id: "679f70fa087ddee39b7efc5b"},
      }
    return [chat];
  } catch (error) {
    return rejectWithValue(error);  }
});

export const getChatByRoomId = createAsyncThunk('chat/get', async ({chatRoomId}: {chatRoomId: any}, { }) => {
  // try {
    const {data} = await API.get(`/api/chat/get/${chatRoomId}`, { withCredentials: true });
    return data;
  // } catch (error) {
    // return rejectWithValue({
    //   message: error?.message,
    //   status: error.status,
    //   data: action.payload?.response?.data
    // });  
  // }
});

export const getChatsByCurrentUser = createAsyncThunk('chat/get/rooms', async (_, { }) => {
  // try {
    const {data} = await API.get(`/api/chat/get/rooms`, { withCredentials: true });
    return data;
  // } catch (error) {
  //   return rejectWithValue(error);
  // }
});

export const deleteChatByRoomId = createAsyncThunk('chat/remove', async ({ room }: { room: string }, { rejectWithValue }) => {
  try {
    const {data} = await API.delete(`/api/chat/remove/${room}`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error);  
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedChat: [] as any[],
    data: [] as any[],
    loading: false,
    status: null,
    error: null as any,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearChat: (state, action) => {
      state.selectedChat = action.payload;
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
      })
      .addCase(saveChat.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get Chat
      .addCase(getChatByRoomId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatByRoomId.fulfilled, (state, action) => {
        state.selectedChat = action.payload;
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
        state.selectedChat = action.payload;
        state.loading = false;
      })
      .addCase(startNewChat.rejected, (state, action: any) => {
        state.loading = true;
        state.error = action.payload;
      })

       // Get Chat Room
       .addCase(getChatsByCurrentUser.pending, (state: any) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getChatsByCurrentUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getChatsByCurrentUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = {
          message: action.payload?.message,
          status: action.payload?.status,
          data: action.payload?.response?.data
        }
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
