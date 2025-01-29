// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChatsByUserId = createAsyncThunk('chat/get/user/rooms', async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/chat/get/${userId}/rooms`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: {
    chatRooms: [],
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
      // Get Chat
      .addCase(getChatsByUserId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getChatsByUserId.fulfilled, (state, action) => {
        state.chatRooms = action.payload;
        state.loading = false;
      })
      .addCase(getChatsByUserId.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
  },
});

export const { resetError } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
