import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string | null;
}

const initialState: IngredientsState = {
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
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось загрузить ингредиенты';
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      });
  },
  selectors: {
    ingredientsSelector: (state) => ({
      ingredients: state.ingredients,
      loading: state.loading,
      error: state.error
    })
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector } = ingredientsSlice.selectors;
