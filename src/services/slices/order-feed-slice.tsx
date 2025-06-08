import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderFeedThunk = createAsyncThunk(
  'orderFeed/getOrderFeed',
  async () => await getFeedsApi()
);

interface OrderFeedState {
  orderFeed: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error?: string | null;
}

const initialState: OrderFeedState = {
  orderFeed: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderFeedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось загрузить список заказов';
      })
      .addCase(getOrderFeedThunk.fulfilled, (state, action) => {
        state.orderFeed = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      });
  },
  selectors: {
    orderFeedSelector: (state) => ({
      orderFeed: state.orderFeed,
      total: state.total,
      totalToday: state.totalToday,
      loading: state.loading,
      error: state.error
    })
  }
});

export const orderFeedReducer = orderFeedSlice.reducer;
export const { orderFeedSelector } = orderFeedSlice.selectors;
