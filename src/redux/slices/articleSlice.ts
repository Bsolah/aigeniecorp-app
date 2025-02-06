import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";


export const createArticle = createAsyncThunk(
    'article/create',
    async ({ title, content, parentId, tags, categories}: any, { rejectWithValue }) => {
        try {
            const { data } = await API.post(`/api/article/create/`, {  content, title, tags, categories, parentId }, { withCredentials: true });
            return data;
            // Assume response includes token and user data
        } catch (error) {
            // if (axios.isAxiosError(error) && error.response) {
            //   return rejectWithValue(error.response.data);
            // }
            return rejectWithValue(error);
        }
    }
);

export const getArticleById = createAsyncThunk('article/get', async (id: any, { rejectWithValue }) => {
    try {
        console.log('mo wa ni bi')
        const { data } = await API.get(`/api/article/get/${id}`, { withCredentials: true });      
        return data;

    } catch (error) {
        // if (axios.isAxiosError(error) && error.response) {
        //   return rejectWithValue(error.response.data);
        // }
        return rejectWithValue(error);
    }
});

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        article: [],
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
            .addCase(createArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createArticle.fulfilled, (state, action: any) => {
                state.loading = false;
                state.status = action.payload;


            })
            .addCase(createArticle.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Article
            .addCase(getArticleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArticleById.fulfilled, (state, action: any) => {
                state.article = action.payload;
                state.loading = false;
            })
            .addCase(getArticleById.rejected, (state, action: any) => {
                state.loading = true;
                state.error = action.payload;
            })
    },
});

export const { resetError } = articleSlice.actions;
export default articleSlice.reducer;
