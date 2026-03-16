import type { MenuProps } from 'antd';
import { Dropdown, Flex, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import type { IUserProfile } from '@api/usersApi';
import SettingsIcon from '@icons/SettingsIcon';
import LogoutIcon from '@icons/LogoutIcon';
import useLogout from '@hooks/useLogout';
import Avatar from './Avatar';
import './index.scss';

interface AvatarButtonProps {
  user?: IUserProfile | null;
}

const AvatarButton = ({ user }: AvatarButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { onLogout } = useLogout();

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
      <Flex align="center" gap={token.marginXS} className="avatar__wrap">
        <Avatar user={user} />
      </Flex>
    </Dropdown>
  );
};

export default AvatarButton;
