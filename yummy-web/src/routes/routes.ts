import type { FC } from 'react';
import LoginPage from '@pages/auth/LoginPage';
import MainPage from '@pages/MainPage';
import RegisterPage from '@pages/auth/RegisterPage';
import SettingsPage from '@pages/SettingsPage';
import ProfilePage from '@pages/ProfilePage';
import MenusList from '@pages/menus/List';
import MenuDetail from '@pages/menus/Detail';
import { RoutePath } from './models';

export interface Routes {
  path: RoutePath;
  Element: FC;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: { [key: string]: any };
}

const menuRoutes: Routes[] = [
  {
    path: RoutePath.MENUS,
    Element: MenusList,
    name: 'Меню',
  },
  {
    path: RoutePath.MENU_DETAIL,
    Element: MenuDetail,
  },
];

export const publicRoutes: Routes[] = [];

export const userRoutes: Routes[] = [
  {
    path: RoutePath.MAIN,
    Element: MainPage,
    name: 'Главная',
  },
  {
    path: RoutePath.SETTINGS,
    Element: SettingsPage,
    name: 'Настройки',
  },
  {
    path: RoutePath.PROFILE,
    Element: ProfilePage,
    name: 'Профиль',
  },
  ...menuRoutes,
];

export const authRoutes: Routes[] = [
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
