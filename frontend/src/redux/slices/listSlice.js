import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchList = createAsyncThunk("list/fetchList", async (search ,_thunkApi) => {
//     try {
//         const response = await axios.get(`http://localhost:8000/api/data?search=${search}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// });

export const fetchList = createAsyncThunk("list/fetchList", async (data,_thunkApi) => {
    try {
        const response = await axios.get('http://localhost:8000/api/list',data);
     return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const uploadFile = createAsyncThunk("list/uploadFile", async (file, _thunkApi) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post('http://localhost:8000/api/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const listSlice = createSlice({
    name: "list",
    initialState: {
        data: [],
        search: "",
    },
    reducers: {
    },
    extraReducers(builder){
    builder
    .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    })
    .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
    })
    .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
    })
    .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload file";
    });
    },
});

export default listSlice.reducer;