import type { RootState } from '@api/store';

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
