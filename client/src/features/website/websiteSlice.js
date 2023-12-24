import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "app/apiClient";
import { toast } from "react-toastify";

export const websiteGetAllAsync = createAsyncThunk(
  "website/get-all",
  async ({ searchParams }, thunkAPI) => {
    const url = `website/get-all?${searchParams}`;
    const res = await apiClient.get(url);
    return res;
  }
);

export const websiteGetIdAsync = createAsyncThunk(
  "website/get-id",
  async ({ id }, thunkAPI) => {
    const url = `website/get-id/${id}`;
    const res = await apiClient.get(url);
    return res;
  }
);

export const websiteAddOneAsync = createAsyncThunk(
  "website/add-one",
  async ({ data }, thunkAPI) => {
    const url = `website/add-one`;
    const res = await apiClient.post(url, data);
    return res;
  }
);

export const websiteUpdateIdAsync = createAsyncThunk(
  "website/update-id",
  async ({ id, data }, thunkAPI) => {
    const url = `website/update-id/${id}`;
    const res = await apiClient.put(url, data);
    return res;
  }
);

export const websiteDeleteIdAsync = createAsyncThunk(
  "website/delete-id",
  async ({ id }, thunkAPI) => {
    const url = `website/delete-id/${id}`;
    const res = await apiClient.delete(url);
    return res;
  }
);

const websiteSlice = createSlice({
  name: "website",
  initialState: {
    dataList: [],
    total_row: 0,
    data: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      // get all
      .addCase(websiteGetAllAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(websiteGetAllAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.dataList = action.payload.data;
        state.total_row = action.payload.total_row;
      })
      .addCase(websiteGetAllAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //get id
      .addCase(websiteGetIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(websiteGetIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(websiteGetIdAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //add one
      .addCase(websiteAddOneAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(websiteAddOneAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.dataList.push(action.payload);
        state.total_row++;
        toast.success("Created successfully!");
      })
      .addCase(websiteAddOneAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //update id
      .addCase(websiteUpdateIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(websiteUpdateIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dataList.findIndex(
          (website) => website._id === action.payload._id
        );
        state.dataList[index] = action.payload;
        toast.success("Updated successfully!");
      })
      .addCase(websiteUpdateIdAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //update id
      .addCase(websiteDeleteIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(websiteDeleteIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newData = state.dataList.filter(
          (website) => website._id !== action.payload._id
        );
        state.websiteList = [...newData];
        toast.success("Deleted successfully!");
      })
      .addCase(websiteDeleteIdAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  },
});

export const getWebsiteAll = (state) => state.website.dataList;
export const getWebsiteId = (state) => state.website.data;
export const getWebsiteTotal = (state) => state.website.total_row;
export const getLoading = (state) => state.website.loading;

export default websiteSlice.reducer;
