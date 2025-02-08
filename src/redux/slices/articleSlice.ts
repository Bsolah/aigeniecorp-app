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

export const writeArticleWithAI = createAsyncThunk(
    'article/aiCreate',
    async ({ title, content, parentId, tags, categories}: any, { rejectWithValue }) => {
        try {
            const { data } = await API.post(`/api/article/create/ai`, {  content, title, tags, categories, parentId }, { withCredentials: true });
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

export const publishArticle = createAsyncThunk(
    'article/publish',
    async ({ id, content }: any, { rejectWithValue }) => {
        try {
            const { data } = await API.post(`/api/article/publish/${id}`, {  content }, { withCredentials: true });
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
        console.log("mo ti wo le")
        const { data } = await API.get(`/api/articles/${id}`, { withCredentials: true });    
        console.log("getting article 3 ", data)  
        return data;

    } catch (error) {
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
