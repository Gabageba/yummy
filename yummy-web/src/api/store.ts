import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rootApi from './rootApi';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  auth: authSlice.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
