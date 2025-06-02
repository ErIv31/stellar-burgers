import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return res.order;
  }
);

type TOrderState = {
  order: TOrder | null;
  request: boolean;
  error?: string | null;
};

const initialState: TOrderState = {
  order: null,
  request: false,
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
      });
  },
  selectors: {
    orderSelector: (state) => state
  }
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
export const { orderSelector } = orderSlice.selectors;
