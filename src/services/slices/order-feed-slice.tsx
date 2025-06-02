import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderFeedThunk = createAsyncThunk(
  'orderFeed/getOrderFeed',
  getFeedsApi
);

type TOrderFeedState = {
  orderFeed: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error?: string | null;
};

const initialState: TOrderFeedState = {
  orderFeed: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderFeedThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(getOrderFeedThunk.fulfilled, (state, { payload }) => {
        state.orderFeed = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.loading = false;
      });
  },
  selectors: {
    orderFeedSelector: (state) => state
  }
});

export const orderFeedReducer = orderFeedSlice.reducer;
export const { orderFeedSelector } = orderFeedSlice.selectors;
