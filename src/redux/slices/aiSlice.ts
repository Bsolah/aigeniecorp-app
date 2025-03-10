import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";


export const chatAI = createAsyncThunk(
    'ai/chat',
    async ( query : any, { rejectWithValue }) => {
        try {
            console.log({query})
            const { data } = await API.post(`/api/ai/chat`, {  query }, { withCredentials: true });
            console.log({data})
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const askAI = createAsyncThunk(
    'ai/ask',
    async ( {query, file} : any, { rejectWithValue }) => {

        const formData = new FormData();
        formData.append('query', query);
        formData.append('media', file);

        try {
            console.log({query})
            const { data } = await API.post(`/api/ai/ask`, formData, { withCredentials: true });
            console.log({data})
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const aiSlice = createSlice({
    name: 'ai',
    initialState: {
        content: "",
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
            // Post Article
            .addCase(askAI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(askAI.fulfilled, (state, action: any) => {
                state.loading = false;
                state.content = action.payload.result;
            })
            .addCase(askAI.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetError } = aiSlice.actions;
export default aiSlice.reducer;