import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderHistoryThunk = createAsyncThunk(
  'orderHistory/getOrderHistory',
  getOrdersApi
);

type TOrderHistoryState = {
  orderHistory: TOrder[];
  loading: boolean;
  error?: string | null;
};

const initialState: TOrderHistoryState = {
  orderHistory: [],
  loading: false,
  error: null
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistoryThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(getOrderHistoryThunk.fulfilled, (state, { payload }) => {
        state.orderHistory = payload;
        state.loading = false;
      });
  },
  selectors: {
    orderHistorySelector: (state) => state
  }
});

export const orderHistoryReducer = orderHistorySlice.reducer;
export const { orderHistorySelector } = orderHistorySlice.selectors;
