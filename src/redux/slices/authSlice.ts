// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: { username: string, email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/register', { username, email, password }, { withCredentials: true });
      return data; // Assume response includes token and user data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      return data?.data; // Assume response includes token and user data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.post('/api/auth/logout');
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    status: ''
  },
  reducers: {
    resetError: (state: any) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })


    // Register
    .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(register.fulfilled, (state, action) => {
      console.log({action})
      state.loading = false;
      state.user = action.payload.user;
      state.status = action.payload.message;
    })
    .addCase(register.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

},
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
