import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { useLogoutMutation } from '@pages/auth/authApi';
import useAuth from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';

const UserAvatar = () => {
  const { t } = useTranslation();
  const { onLogoutSuccess } = useAuth();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const items: MenuProps['items'] = [
    {
      key: 'settings',
      label: t('settings'),
      icon: <SettingOutlined />,
      onClick: () => navigate(RoutePath.SETTINGS),
    },
    {
      key: 'exit',
      label: t('exit'),
      icon: <LogoutOutlined />,
      onClick: () => logout().unwrap().then(onLogoutSuccess),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottom">
      <Avatar icon={<UserOutlined />} size={45} className="page-layout__header--avatar" />
    </Dropdown>
  );
};

export default UserAvatar;
