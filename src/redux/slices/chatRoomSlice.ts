// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const getChatsByUser = createAsyncThunk('chat/all', async (_, { rejectWithValue }) => {
  console.log('I am in')
  try {
    const { data } = await axios.get(`/api/chat/all`, { withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);  }
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
      state.chatRooms = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Chat
      .addCase(getChatsByUser.pending, (state: any) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getChatsByUser.fulfilled, (state, action) => {
        state.chatRooms = action.payload;
        state.loading = false;
      })
      .addCase(getChatsByUser.rejected, (state, action: any) => {
        state.loading = true;
        state.error = action.payload;
      })
  },
});

export const { resetError } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
