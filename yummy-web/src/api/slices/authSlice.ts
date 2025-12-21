import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '@utils/token';

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: Boolean(getToken()),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = authSlice.actions;
export default authSlice;
