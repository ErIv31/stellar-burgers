import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { burgerConstructorReducer } from './slices/burger-constructor-slice';
import { ingredientsReducer } from './slices/ingredients-slice';
import { orderReducer } from './slices/order-slice';
import { orderFeedReducer } from './slices/order-feed-slice';
import { orderHistoryReducer } from './slices/order-history-slice';
import { userReducer } from './slices/user-slice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  orderFeed: orderFeedReducer,
  orderHistory: orderHistoryReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
