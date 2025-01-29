import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const saveChat = createAsyncThunk(
  'chat/save',
  async ({ chatRoomId, userId, sender, content }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/chat/save/${chatRoomId}`, { userId, sender, content }, { withCredentials: true });
      return data; // Assume response includes token and user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getChatByRoomId = createAsyncThunk('chat/get', async (chatRoomId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/chat/get/${chatRoomId}`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteChatByRoomId = createAsyncThunk('chat/remove', async ({ room }, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/chat/get/${room}`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
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
      .addCase(saveChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Chat
      .addCase(getChatByRoomId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getChatByRoomId.fulfilled, (state, action) => {
        state.chat = action.payload;
        state.loading = false;
      })
      .addCase(getChatByRoomId.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })

      // Delete Chat
      .addCase(deleteChatByRoomId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteChatByRoomId.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loading = false;
      })
      .addCase(deleteChatByRoomId.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
  },
});

export const { resetError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
