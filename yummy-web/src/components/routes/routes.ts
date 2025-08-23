import type { FC } from 'react';
import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/MainPage';
import { RoutePath } from './models';

interface Routes {
  path: RoutePath;
  Element: FC;
  name?: string;
}

export const publicRoutes: Routes[] = [
  {
    path: RoutePath.MAIN,
    Element: MainPage,
    name: 'Главная',
  },
  {
    path: RoutePath.LOGIN,
    Element: LoginPage,
    name: 'Авторизация',
  },
];

export const privateRoutes: Routes[] = [];
