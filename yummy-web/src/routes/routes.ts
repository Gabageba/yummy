import type { FC } from 'react';
import LoginPage from '@pages/auth/LoginPage';
import MainPage from '@pages/MainPage';
import RegisterPage from '@pages/auth/RegisterPage';
import { RoutePath } from './models';

export interface Routes {
  path: RoutePath;
  Element: FC;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: { [key: string]: any };
}

export const publicRoutes: Routes[] = [];

export const authRoutes: Routes[] = [
  {
    path: RoutePath.MAIN,
    Element: MainPage,
    name: 'Главная',
  },
];

export const loginRoutes: Routes[] = [
  {
    path: RoutePath.LOGIN,
    Element: LoginPage,
    name: 'Авторизация',
  },
  {
    path: RoutePath.REGISTER,
    Element: RegisterPage,
    name: 'Регистрация',
  },
];
