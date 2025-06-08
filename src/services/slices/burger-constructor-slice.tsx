import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { nanoid } from 'nanoid';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        item.type === 'bun' ? (state.bun = item) : state.ingredients.push(item);
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    moveIngredient: {
      reducer: (
        state,
        action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
      ) => {
        const { index, direction } = action.payload;
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < state.ingredients.length) {
          [state.ingredients[index], state.ingredients[newIndex]] = [
            state.ingredients[newIndex],
            state.ingredients[index]
          ];
        }
      },
      prepare: (index: number, direction: 'up' | 'down') => ({
        payload: { index, direction }
      })
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    burgerConstructorSelector: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearIngredients
} = burgerConstructorSlice.actions;
export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;
