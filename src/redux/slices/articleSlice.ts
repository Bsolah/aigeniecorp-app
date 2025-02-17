import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";


export const createArticle = createAsyncThunk(
    'article/create',
    async ({ name, content, parent, tags, categories }: any, { rejectWithValue }) => {
        try {
            const { data } = await API.post(`/api/articles/create/`, { content, name, tags, categories, parent }, { withCredentials: true });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateArticle = createAsyncThunk(
    'article/update',
    async ({ name, content, parentId, tags, categories, id }: any, { rejectWithValue }) => {
        try {
            const { data } = await API.put(`/api/articles/edit/${id}`, { content, name, tags, categories, parentId }, { withCredentials: true });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteArticle = createAsyncThunk(
    'article/delete',
    async ({ id }: any, { rejectWithValue }) => {
        try {
            console.log('about to enter')
            const { data } = await API.delete(`/api/articles/delete/${id}`, { withCredentials: true });
            console.log('I got an answer ', data)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const writeArticleWithAI = createAsyncThunk(
    'article/aiCreate',
    async ({ title, content, parentId, tags, categories }: any, { rejectWithValue }) => {
        try {
            const { data } = await API.post(`/api/article/create/ai`, { content, title, tags, categories, parentId }, { withCredentials: true });
            return data;
            // Assume response includes token and user data
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const publishArticle = createAsyncThunk(
    'article/publish',
    async ({ id, content }: any, { rejectWithValue }) => {
        try {
            const { data } = await API.post(`/api/article/publish/${id}`, { content }, { withCredentials: true });
            return data;
            // Assume response includes token and user data
        } catch (error) {
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

export const getDraftArticles = createAsyncThunk('article/get/draft', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/api/articles/drafts`, { withCredentials: true });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        article: [],
        drafts: [],
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

            // Edit Article
            .addCase(updateArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateArticle.fulfilled, (state, action: any) => {
                state.loading = false;
                state.status = action.payload;


            })
            .addCase(updateArticle.rejected, (state, action: any) => {
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
            
            // List Draft Article
            .addCase(getDraftArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDraftArticles.fulfilled, (state, action: any) => {
                state.drafts = action.payload;
                state.loading = false;
            })
            .addCase(getDraftArticles.rejected, (state, action: any) => {
                state.loading = true;
                state.error = action.payload;
            })
    },
});

export const { resetError } = articleSlice.actions;
export default articleSlice.reducer;
