import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/api";

export const createFolder = createAsyncThunk('folder/create', async ({ name, parent }: any, { rejectWithValue }) => {
    try {
        const response = await API.post(`/api/folders/create/`, { name, parent }, { withCredentials: true });
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getFolders = createAsyncThunk('folder/get', async (_, { 
    // rejectWithValue 
}) => {
    // try {
        const {data} = await API.get(`/api/folders/all`, { withCredentials: true });
        return data;
    // } catch (error) {
    //     console.log('inner here ', error)
    //     return rejectWithValue(error);
    // }
});

const folderSlice = createSlice({
    name: 'folder',
    initialState: {
        folder: [],
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
                state.folder = action.payload.folders;
                state.loading = false;
            })
            .addCase(getFolders.rejected, (state, action: any) => {
                state.loading = true;
                state.error = {
                    message: action.payload?.message,
                    status: action.payload?.status,
                    data: action.payload?.response?.data
                  }
            })
    },
});

export const { resetError } = folderSlice.actions;
export default folderSlice.reducer;
