// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';
import dispatch from '../store';
// import axios from 'axios';

export const register = createAsyncThunk(
  'auth/register',
  async (
    { username, org, email, password }: { username: string; org: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      await API.post(
        '/api/auth/register',
        { username, org, type: "Employee", email, password },
        { withCredentials: true },
      );
      const data = await dispatch(login({ email: email, password: password }));
      return data?.payload;
    } catch (error: any) {

      return rejectWithValue({
        message: error.response?.data,
        status: error.response?.status,
      });
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        '/api/auth/login',
        { email, password },
        { withCredentials: true },
      );

      // Check authentication
      const checkAuth = await API.get("/api/auth/check-auth", {
        withCredentials: true,
      });

      if (checkAuth?.data?.payload?.user?.id === data?.payload?.user?.id) {
        return data; // Assume response includes token and user data
      }
      return;

    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data,
        status: error.response?.status,
      });
    }
  },
);

export const verifyAuth = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      // Check authentication
      const { data } = await API.get("/api/auth/check-auth", {
        withCredentials: true,
      });

      return data;

    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message,
        status: error?.status,
      });
    }
  },
);


export const inviteUser = createAsyncThunk('auth/invite', async ({email}: any, { rejectWithValue }) => {
  try {
    const data = await API.post(
      '/api/auth/invite',
      { email },
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    sessionStorage.clear();
    localStorage.clear();
    await API.post('/api/auth/logout', { withCredentials: true });
    localStorage.clear();
    return true;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    invitations: [],
    token: null,
    loading: false,
    error: null as any,
    status: '',
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
        // console.log('login')
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = {
          message: action.payload?.message,
          status: action.payload?.status,
        }
      })

      // Verify Auth
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        // console.log('verifyAuth')
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(verifyAuth.rejected, (state, action: any) => {
        state.loading = false;
        state.error = {
          message: action.payload?.message,
          status: action.payload?.status,
        }
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        // console.log('logout')
        state.user = null;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: any) => {
        console.log('verifyAuth')
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { resetError } = authSlice.actions;
export default authSlice.reducer;
