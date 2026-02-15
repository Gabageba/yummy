import type { FC } from 'react';
import LoginPage from '@pages/auth/LoginPage';
import MainPage from '@pages/MainPage';
import RegisterPage from '@pages/auth/RegisterPage';
import SettingsPage from '@pages/SettingsPage';
import ProfilePage from '@pages/ProfilePage';
import CollectionsList from '@pages/collections/List';
import CollectionDetail from '@pages/collections/Detail';
import { RoutePath } from './models';

export interface Routes {
  path: RoutePath;
  Element: FC;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: { [key: string]: any };
}

const collectionRoutes: Routes[] = [
  {
    path: RoutePath.COLLECTIONS,
    Element: CollectionsList,
    name: 'Подборки',
  },
  {
    path: RoutePath.COLLECTION_DETAIL,
    Element: CollectionDetail,
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
  ...collectionRoutes,
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
