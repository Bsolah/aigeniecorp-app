import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/api"

export const getChatsByCurrentUser = createAsyncThunk('chat/get/rooms', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/chat/get/rooms`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: {
    data: [] as any[],
    loading: false,
    status: null,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearChat: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Chat
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
        state.error = action.payload;
      })
  },
});

export const { resetError } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
