import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import '../index.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import type { IUserProfile } from '@api/usersApi';
import Avatar from './Avatar';

interface AvatarButtonProps {
  user?: IUserProfile | null;
  onLogout: () => void;
}

const AvatarButton = ({ user, onLogout }: AvatarButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      danger: true,
      onClick: onLogout,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
      <span className="page-layout__header--avatar-wrap">
        <Avatar user={user} />
      </span>
    </Dropdown>
  );
};

export default AvatarButton;
