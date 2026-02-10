import { RoutePath } from '@routes/models';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  mode: MenuProps['mode'];
}

function NavigationMenu({ mode }: IProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: ItemType[] = [
    { label: t('main'), key: RoutePath.MAIN },
    { label: t('menu'), key: RoutePath.MENUS },
  ];

  const selectedKey =
    menuItems.find(
      (item) =>
        location.pathname === item?.key ||
        (item?.key !== '/' && location.pathname.startsWith(`${item?.key}/`)),
    )?.key ?? location.pathname;

  return (
    <Menu
      items={menuItems}
      mode={mode}
      className="page-layout__header--menu"
      selectedKeys={selectedKey ? [String(selectedKey)] : []}
      onClick={({ key }) => navigate(key)}
    />
  );
}

export default NavigationMenu;
