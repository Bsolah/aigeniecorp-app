import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import API from "../../api/api";


export const createFolder = createAsyncThunk(
    'folder/create',
    async ({ folderName, folderParentId }: any, { rejectWithValue }) => {
        try {
            const { data } = await API.post(`/api/folder/create/`, {  folderName, folderParentId }, { withCredentials: true });
            
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

export const getFolders = createAsyncThunk('folder/get', async (_, { rejectWithValue }) => {
    try {
        console.log('folders in ')
        const { data } = await API.get(`/api/folders/all`, { withCredentials: true });      
        return data;

    } catch (error) {
        // if (axios.isAxiosError(error) && error.response) {
        //   return rejectWithValue(error.response.data);
        // }
        return rejectWithValue(error);
    }
});

const folderSlice = createSlice({
    name: 'folder',
    initialState: {
        folder: [],
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
            // Post Folder
            .addCase(createFolder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFolder.fulfilled, (state, action: any) => {
                state.loading = false;
                state.status = action.payload;

            })
            .addCase(createFolder.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Folder
            .addCase(getFolders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFolders.fulfilled, (state, action: any) => {
                console.log({action})
                state.folder = action.payload.folders;
                state.loading = false;
            })
            .addCase(getFolders.rejected, (state, action: any) => {
                state.loading = true;
                state.error = action.payload;
            })
    },
});

export const { resetError } = folderSlice.actions;
export default folderSlice.reducer;
