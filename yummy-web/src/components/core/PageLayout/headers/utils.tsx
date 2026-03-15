import FolderIcon from '@icons/FolderIcon';
import HomeIcon from '@icons/HomeIcon';
import MenuIcon from '@icons/MenuIcon';
import TrayIcon from '@icons/TrayIcon';
import { RoutePath } from '@routes/models';
import type { MenuItemType } from 'antd/es/menu/interface';
import type { TFunction } from 'i18next';

enum MenuItemsKey {
  MAIN = 'main',
  COLLECTIONS = 'collections',
  DISHES = 'dishes',
  MORE = 'more',
}

const getIconByMenuKey = (key: MenuItemsKey): React.ReactNode => {
  const ICON_SIZE = 24;

  switch (key) {
    case MenuItemsKey.MAIN:
      return <HomeIcon size={ICON_SIZE} />;
    case MenuItemsKey.COLLECTIONS:
      return <FolderIcon size={ICON_SIZE} />;
    case MenuItemsKey.DISHES:
      return <TrayIcon size={ICON_SIZE} />;
    case MenuItemsKey.MORE:
      return <MenuIcon size={ICON_SIZE} />;
    default:
      return null;
  }
};

const MENU_ITEMS = [
  {
    key: MenuItemsKey.MAIN,
    routePath: RoutePath.MAIN,
  },
  {
    key: MenuItemsKey.COLLECTIONS,
    routePath: RoutePath.COLLECTIONS,
  },
  {
    key: MenuItemsKey.DISHES,
    routePath: RoutePath.DISHES,
  },
  {
    key: MenuItemsKey.MORE,
    routePath: RoutePath.MORE,
  },
];

const DESKTOP_MENU_ITEMS = MENU_ITEMS.filter((item) => item.key !== MenuItemsKey.MORE);
const MOBILE_MENU_ITEMS = MENU_ITEMS;

export const getDesktopMenuItems = (t: TFunction): MenuItemType[] =>
  DESKTOP_MENU_ITEMS.map((item) => ({
    key: item.routePath,
    label: t(item.key),
  }));

export const getMobileMenuItems = (t: TFunction): MenuItemType[] =>
  MOBILE_MENU_ITEMS.map((item) => ({
    key: item.routePath,
    label: t(item.key),
    icon: getIconByMenuKey(item.key),
  }));

export const getSelectedKey = (pathname: string): string =>
  MENU_ITEMS.find(
    (item) =>
      pathname === item?.routePath ||
      (item?.routePath !== '/' && pathname.startsWith(`${item?.routePath}/`)),
  )?.routePath ?? pathname;
