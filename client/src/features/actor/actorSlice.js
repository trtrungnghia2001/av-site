import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "app/apiClient";
import { toast } from "react-toastify";

export const actorGetAllAsync = createAsyncThunk(
  "actor/get-all",
  async ({ searchParams }, thunkAPI) => {
    const url = `actor/get-all?${searchParams}`;
    const res = await apiClient.get(url);
    return res;
  }
);

export const actorGetIdAsync = createAsyncThunk(
  "actor/get-id",
  async ({ id }, thunkAPI) => {
    const url = `actor/get-id/${id}`;
    const res = await apiClient.get(url);
    return res;
  }
);

export const actorAddOneAsync = createAsyncThunk(
  "actor/add-one",
  async ({ data }, thunkAPI) => {
    const url = `actor/add-one`;
    const res = await apiClient.post(url, data);
    return res;
  }
);

export const actorUpdateIdAsync = createAsyncThunk(
  "actor/update-id",
  async ({ id, data }, thunkAPI) => {
    const url = `actor/update-id/${id}`;
    const res = await apiClient.put(url, data);
    return res;
  }
);

export const actorDeleteIdAsync = createAsyncThunk(
  "actor/delete-id",
  async ({ id }, thunkAPI) => {
    const url = `actor/delete-id/${id}`;
    const res = await apiClient.delete(url);
    return res;
  }
);

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    dataList: [],
    total_row: 0,
    data: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      // get all
      .addCase(actorGetAllAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actorGetAllAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.dataList = action.payload.data;
        state.total_row = action.payload.total_row;
      })
      .addCase(actorGetAllAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //get id
      .addCase(actorGetIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actorGetIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(actorGetIdAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //add one
      .addCase(actorAddOneAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actorAddOneAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.dataList.push(action.payload);
        state.total_row++;
        toast.success("Created successfully!");
      })
      .addCase(actorAddOneAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //update id
      .addCase(actorUpdateIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actorUpdateIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dataList.findIndex(
          (actor) => actor._id === action.payload._id
        );
        state.dataList[index] = action.payload;
        toast.success("Updated successfully!");
      })
      .addCase(actorUpdateIdAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      //update id
      .addCase(actorDeleteIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actorDeleteIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newData = state.dataList.filter(
          (actor) => actor._id !== action.payload._id
        );
        state.actorList = [...newData];
        toast.success("Deleted successfully!");
      })
      .addCase(actorDeleteIdAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  },
});

export const getActorAll = (state) => state.actor.dataList;
export const getActorId = (state) => state.actor.data;
export const getActorTotal = (state) => state.actor.total_row;
export const getLoading = (state) => state.actor.loading;

export default actorSlice.reducer;
