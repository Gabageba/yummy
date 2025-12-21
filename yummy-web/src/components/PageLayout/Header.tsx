import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@routes/models';
import logo from '../../assets/logo_horizontal.png';
import './index.scss';
import UserAvatar from './Avatar';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: ItemType[] = [{ label: t('main'), key: RoutePath.MAIN }];

  return (
    <Layout.Header className="page-layout__header">
      <img
        src={logo}
        alt="logo"
        className="page-layout__header--logo"
        onClick={() => navigate(RoutePath.MAIN)}
      />
      <Menu
        items={menuItems}
        mode="horizontal"
        className="page-layout__header--menu"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
      />
      <UserAvatar />
    </Layout.Header>
  );
};

export default Header;
