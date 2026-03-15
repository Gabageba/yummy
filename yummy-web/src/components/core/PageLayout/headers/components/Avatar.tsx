import { Avatar as AntdAvatar } from 'antd';
import type { IUserProfile } from '@api/usersApi';
import UserIcon from '@icons/UserIcon';

interface AvatarProps {
  user?: IUserProfile | null;
  size?: number;
}

function Avatar({ user, size = 40 }: AvatarProps) {
  const displayName = user?.username ?? user?.email?.slice(0, 2) ?? '';

  return (
    <AntdAvatar
      icon={!displayName ? <UserIcon /> : undefined}
      size={size}
      className="page-layout__header--avatar"
    >
      {displayName ? displayName[0].toUpperCase() : null}
    </AntdAvatar>
  );
}

export default Avatar;
