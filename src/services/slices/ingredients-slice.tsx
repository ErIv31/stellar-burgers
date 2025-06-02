import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.loading = false;
      });
  },
  selectors: {
    ingredientsSelector: (state) => state
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector } = ingredientsSlice.selectors;
