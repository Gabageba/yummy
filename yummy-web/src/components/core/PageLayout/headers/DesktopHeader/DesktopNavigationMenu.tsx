import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDesktopMenuItems, getSelectedKey } from '../utils';

function DesktopNavigationMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = getSelectedKey(location.pathname);
  const menuItems = getDesktopMenuItems(t);

  return (
    <Menu
      mode="horizontal"
      items={menuItems}
      className="page-layout__header--menu"
      selectedKeys={selectedKey ? [String(selectedKey)] : []}
      onClick={({ key }) => navigate(key)}
    />
  );
}

export default DesktopNavigationMenu;
