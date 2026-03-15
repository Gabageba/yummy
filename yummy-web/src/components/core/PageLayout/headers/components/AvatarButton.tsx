import type { MenuProps } from 'antd';
import { Dropdown, Flex, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import type { IUserProfile } from '@api/usersApi';
import '../../index.scss';
import SettingsIcon from '@icons/SettingsIcon';
import LogoutIcon from '@icons/LogoutIcon';
import Avatar from './Avatar';

interface AvatarButtonProps {
  user?: IUserProfile | null;
  onLogout: () => void;
}

const AvatarButton = ({ user, onLogout }: AvatarButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: 'settings',
      label: t('settings'),
      icon: <SettingsIcon />,
      onClick: () => navigate(RoutePath.SETTINGS),
    },
    {
      key: 'logout',
      label: t('exit'),
      icon: <LogoutIcon />,
      danger: true,
      onClick: onLogout,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
      <Flex align="center" gap={token.marginXS} className="page-layout__header--avatar-wrap">
        <Avatar user={user} />
      </Flex>
    </Dropdown>
  );
};

export default AvatarButton;
