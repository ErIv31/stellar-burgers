import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);
export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);
export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);
export const logoutUserThunk = createAsyncThunk('user/logoutUser', () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error?: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

const commonPendingHandler = (state: TUserState) => {
  state.isLoading = true;
  state.error = null;
};

const commonRejectedHandler = (state: TUserState, action: any) => {
  state.isLoading = false;
  state.error = action.error.message;
};

const commonFulfilledHandler = (state: TUserState) => {
  state.isLoading = false;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, commonPendingHandler)
      .addCase(registerUserThunk.rejected, commonRejectedHandler)
      .addCase(registerUserThunk.fulfilled, commonFulfilledHandler);
    builder
      .addCase(loginUserThunk.pending, commonPendingHandler)
      .addCase(loginUserThunk.rejected, commonRejectedHandler)
      .addCase(loginUserThunk.fulfilled, commonFulfilledHandler);
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthChecked = true;
        commonFulfilledHandler(state);
      });
    builder
      .addCase(updateUserThunk.pending, commonPendingHandler)
      .addCase(updateUserThunk.rejected, commonRejectedHandler)
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        commonFulfilledHandler(state);
      });
    builder
      .addCase(logoutUserThunk.pending, commonPendingHandler)
      .addCase(logoutUserThunk.rejected, commonRejectedHandler)
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        commonFulfilledHandler(state);
      });
  },
  selectors: {
    userSelector: (state) => state
  }
});

export const userReducer = userSlice.reducer;
export const { authCheck } = userSlice.actions;
export const { userSelector } = userSlice.selectors;
