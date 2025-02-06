import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";

export const createLead = createAsyncThunk(
  'lead/create',
  async ({ firstName, lastName, email, phoneNumber }: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/api/lead/create/`, { firstName, lastName, email, phoneNumber }, { withCredentials: true });
      return data; // Assume response includes token and user data
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue(error);
    }
  }
);

export const getLeads = createAsyncThunk('lead/get', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/lead/get/`, { withCredentials: true });
    return data;
  } catch (error) {
    // if (axios.isAxiosError(error) && error.response) {
    //   return rejectWithValue(error.response.data);
    // }
    return rejectWithValue(error);
  }
});

const leadSlice = createSlice({
  name: 'lead',
  initialState: {
    lead: [],
    loading: false,
    status: null,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Post Lead
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;


      })
      .addCase(createLead.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Lead
      .addCase(getLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.lead = action.payload;
        state.loading = false;
      })
      .addCase(getLeads.rejected, (state, action: any) => {
        state.loading = true;
        state.error = action.payload;
      })
  },
});

export const { resetError } = leadSlice.actions;
export default leadSlice.reducer;
