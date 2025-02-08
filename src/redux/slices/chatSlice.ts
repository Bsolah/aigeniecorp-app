import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from '../../api/api';

export const saveChat = createAsyncThunk(
  'chat/save',
  async (
    {
      receiverId,
      senderId,
      content,
      chatRoomId,
      type,
      media,
    }: {
      receiverId: string | any;
      senderId: string;
      content?: string;
      chatRoomId?: string | null;
      type: string;
      media?: any;
    },
    { rejectWithValue },
  ) => {
    try {
      console.log('got here 2', receiverId, chatRoomId, content, type);
      const { data } = await API.post(
        `/api/chat/save/${senderId}`,
        {
          ...(receiverId && { receiverId }),
          ...(chatRoomId && { chatRoomId }),
          ...(content && { content }),
          ...(type && { type }),
          ...(media && { media }),
        },
        { withCredentials: true },
      );
      getSingleChatInfo({
        id: chatRoomId!,
      });
      return {
        data: data,
        chatRoomId: chatRoomId,
      }; // Assume response includes token and user data
    } catch (error: any) {
      console.log('error trying to send message', error?.response);
      // if (axios.isAxiosError(error) && error.response) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue(error);
    }
  },
);
export const saveChatWithMedia = createAsyncThunk(
  '/api/chat/save/media/',
  async (
    {
      receiverId,
      senderId,
      content,
      chatRoomId,
      type,
      media,
    }: {
      receiverId: string | any;
      senderId: string;
      content?: string;
      chatRoomId?: string | null;
      type: string | 'audio';
      media?: any;
    },
    { rejectWithValue },
  ) => {
    try {
      console.log('got here 2', receiverId, senderId, content, chatRoomId, type, media);

      const formData = new FormData();

      // Append text fields
      formData.append('senderId', senderId);
      if (receiverId) formData.append('receiverId', receiverId);
      if (chatRoomId) formData.append('chatRoomId', chatRoomId);
      if (content) formData.append('content', content);
      if (type) formData.append('type', type);

      // Append media file if available
      if (media) {
        formData.append('media', media);
      }

      const { data } = await API.post(`/api/chat/save/media/${senderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      getSingleChatInfo({
        id: chatRoomId!,
      });
      return {
        data: data,
        chatRoomId: chatRoomId,
      };
    } catch (error: any) {
      console.log('error trying to send message', error?.response);
      alert(error?.response?.data?.message);
      return rejectWithValue(error);
    }
  },
);

export const getChatByRoomId = createAsyncThunk(
  'chat/get',
  async (chatRoomId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/api/chat/get/${chatRoomId}`, { withCredentials: true });
      return data;
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue(error);
    }
  },
);

export const getChatAllRooms = createAsyncThunk(
  'chat/get',
  async (_, { rejectWithValue }) => {
    try {
      // alert('gh');
      const { data } = await API.get(`/api/chat/get/rooms`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue(error);
    }
  },
);

export const deleteChatByRoomId = createAsyncThunk(
  'chat/remove',
  async ({ room }: { room: string }, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/api/chat/get/${room}`, { withCredentials: true });
      return data;
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue(error);
    }
  },
);
export const getSingleChatInfo = createAsyncThunk(
  '/api/chat/get/',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    console.log('he reacg');
    try {
      const res = (
        await API.get(`/api/chat/get/${id}`, {
          withCredentials: true,
        })
      ).data;
      return res.chats;
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue(error);
    }
  },
);

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
    },
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
        state.status = action.payload?.data || null;
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
      });
  },
});

export const { resetError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
