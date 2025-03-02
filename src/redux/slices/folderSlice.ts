import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/api";
import { findKeyAndUpdate, findKeyAndDelete } from 'src/utils/commonFunctions';

export const createFolder = createAsyncThunk('folder/create', async ({ name, parent, orgId }: any, { rejectWithValue }) => {
    try {
        const {data} = await API.post(`/api/folders/create/`, { name, parent, organizationId: orgId }, { withCredentials: true });
        return {
            data,
            parentId: parent
        };
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateFolder = createAsyncThunk('folder/edit', async ({ id, name, parent, orgId }: any, { rejectWithValue }) => {
    try {
        const {data} = await API.put(`/api/folders/edit/${id}`, { name, parent, organizationId: orgId }, { withCredentials: true });
        return {
            data,
            parentId: parent
        };
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getRootFolders = createAsyncThunk('folder/get/root', async ({orgId}: any, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/api/folders/all?organizationId=${orgId}`, { withCredentials: true });
        return data;
    } catch (error: any) {
        return rejectWithValue({
            message: error.response?.data?.message,
            status: error?.status,
        });
    }
});

export const deleteFolder = createAsyncThunk(
    'folder/delete',
    async ({ id }: any, { rejectWithValue, getState}: any) => {
        try {
            await API.delete(`/api/folders/delete/${id}`, { withCredentials: true });
            
            const clonedFolderState = JSON.parse(JSON.stringify(getState()?.folders?.folder));
            const updatedFolderData = findKeyAndDelete(clonedFolderState, id);
    
            
            return updatedFolderData
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getSubFolders = createAsyncThunk('folder/get', async ({id}: any, { rejectWithValue , getState}: any) => {
    try {
        const { data } = await API.get(`/api/folders/${id}`, { withCredentials: true });

        console.log('data', data);

        const clonedFolderState = JSON.parse(JSON.stringify(getState()?.folders?.folder));
        const updatedFolderData = findKeyAndUpdate(clonedFolderState, data.folder);

        return updatedFolderData;
    } catch (error: any) {
        return rejectWithValue({
            message: error.response?.data?.message,
            status: error?.status,
        });
    }
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

            // Get Root Folder
            .addCase(getRootFolders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRootFolders.fulfilled, (state, action: any) => {
                state.folder = action.payload.folder;
                state.loading = false;
            })
            .addCase(getRootFolders.rejected, (state, action: any) => {
                state.loading = true;
                state.error = {
                    message: action.payload?.message,
                    status: action.payload?.status,
                }
            })
            
            // Get Sub Folder
            .addCase(getSubFolders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubFolders.fulfilled, (state: any, action: any) => {
                state.folder = action.payload;
                state.loading = false;
            })
            .addCase(getSubFolders.rejected, (state, action: any) => {
                state.loading = true;
                state.error = {
                    message: action.payload?.message,
                    status: action.payload?.status,
                }
            })
     
            // Get Deleted Folder
            .addCase(deleteFolder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFolder.fulfilled, (state: any, action: any) => {
                state.folder = action.payload;
                state.loading = false;
            })
            .addCase(deleteFolder.rejected, (state, action: any) => {
                state.loading = true;
                state.error = {
                    message: action.payload?.message,
                    status: action.payload?.status,
                }
            })
    },
});

export const { resetError } = folderSlice.actions;
export default folderSlice.reducer;
