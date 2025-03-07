import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/api";


export const getOrg = createAsyncThunk('org/get/all', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/api/organizations/all`, { withCredentials: true });
        // console.log('org ', data)
        return data;
    } catch (error: any) {
        return rejectWithValue({
            message: error.response?.data?.message,
            status: error?.status,
        });
    }
});

export const updateOrg = createAsyncThunk('org/get/update', async ({id, location, website, name, size,regNo, industry}: any, { rejectWithValue }) => {
    try {

        console.log({id, location, website, name, size,regNo, industry})
        const { data } = await API.put(`/api/organizations/${id}`, {location, website, name, size,regNo, industry}, { withCredentials: true });
        // console.log('org ', data)
        return data;
    } catch (error: any) {
        return rejectWithValue({
            message: error.response?.data?.message,
            status: error?.status,
        });
    }
});

const orgSlice = createSlice({
    name: 'org',
    initialState: {
        org: null,
        loading: false,
        status: null,
        error: null as any,
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Root Org
            .addCase(getOrg.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrg.fulfilled, (state, action: any) => {
                state.org = action.payload?.data;
                state.loading = false;
            })  
            .addCase(getOrg.rejected, (state, action: any) => {
                state.loading = true;
                state.error = {
                    message: action.payload?.message,
                    status: action.payload?.status,
                }
            })
    },
});

export const { resetError } = orgSlice.actions;
export default orgSlice.reducer;
