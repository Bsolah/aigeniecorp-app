import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";

export const saveChat = createAsyncThunk(
  'chat/save',
  async ({ receiverId, senderId, content, chatRoomId, type }: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/api/chat/save/${senderId}`, { receiverId, chatRoomId, content, type }, { withCredentials: true });
      return data; // Assume response includes token and user data
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue(error);  }
    }
);

export const getChatByRoomId = createAsyncThunk('chat/get', async (chatRoomId, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/chat/get/${chatRoomId}`, { withCredentials: true });
    return data;
  } catch (error) {
    // if (axios.isAxiosError(error) && error.response) {
    //   return rejectWithValue(error.response.data);
    // }
    return rejectWithValue(error);  
  }
});

export const deleteChatByRoomId = createAsyncThunk('chat/remove', async ({ room }: { room: string }, { rejectWithValue }) => {
  try {
    const { data } = await API.delete(`/api/chat/get/${room}`, { withCredentials: true });
    return data;
  } catch (error) {
    // if (axios.isAxiosError(error) && error.response) {
    //   return rejectWithValue(error.response.data);
    // }
    return rejectWithValue(error);  
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chat: [],
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
