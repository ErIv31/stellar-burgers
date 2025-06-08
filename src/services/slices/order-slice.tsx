import { orderBurgerApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return res.order;
  }
);

export const getOrderHistoryThunk = createAsyncThunk(
  'order/getOrderHistory',
  getOrdersApi
);

type TOrderState = {
  order: TOrder | null;
  orderHistory: TOrder[];
  request: boolean;
  historyLoading: boolean;
  error?: string | null;
};

const initialState: TOrderState = {
  order: null,
  orderHistory: [],
  request: false,
  historyLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, { error }) => {
        state.request = false;
        state.error = error.message;
      })
      .addCase(postOrder.fulfilled, (state, { payload }) => {
        state.order = payload;
        state.request = false;
      })
      .addCase(getOrderHistoryThunk.pending, (state) => {
        state.historyLoading = true;
        state.error = null;
      })
      .addCase(getOrderHistoryThunk.rejected, (state, { error }) => {
        state.historyLoading = false;
        state.error = error.message;
      })
      .addCase(getOrderHistoryThunk.fulfilled, (state, { payload }) => {
        state.orderHistory = payload;
        state.historyLoading = false;
      });
  },
  selectors: {
    orderSelector: (state) => ({
      order: state.order,
      request: state.request,
      error: state.error
    }),
    orderHistorySelector: (state) => ({
      orderHistory: state.orderHistory,
      loading: state.historyLoading,
      error: state.error
    })
  }
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
export const { orderSelector, orderHistorySelector } = orderSlice.selectors;
