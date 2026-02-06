import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@routes/models';
import './index.scss';
import LogoLongIcon from '@components/icons/LogoLongIcon';
import UserAvatar from './Avatar';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: ItemType[] = [
    { label: t('main'), key: RoutePath.MAIN },
    { label: t('menu'), key: RoutePath.MENU },
  ];

  return (
    <Layout.Header className="page-layout__header">
      <div className="page-layout__header--container">
        <div className="page-layout__header--logo">
          <LogoLongIcon />
        </div>

        <Menu
          items={menuItems}
          mode="horizontal"
          className="page-layout__header--menu"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
        />
        <UserAvatar />
      </div>
    </Layout.Header>
  );
};

export default Header;
