import type { MenuProps } from 'antd';
import { Dropdown, Flex, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import { useGetProfileQuery } from '@api/usersApi';
import SettingsIcon from '@icons/SettingsIcon';
import LogoutIcon from '@icons/LogoutIcon';
import useLogout from '@hooks/useLogout';
import { token } from '@theme/token';
import Avatar from './Avatar';
import './index.scss';

const AvatarButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onLogout, isLoading: isLogoutLoading } = useLogout();

  const { data: user, isLoading: isUserLoading } = useGetProfileQuery();

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
      disabled: isLogoutLoading,
    },
  ];

  if (isUserLoading) {
    return <Skeleton.Avatar active size={token.sizeAvatar} />;
  }

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
      <Flex align="center" gap={token.marginXS} className="avatar__wrap">
        <Avatar user={user} />
      </Flex>
    </Dropdown>
  );
};

export default AvatarButton;
