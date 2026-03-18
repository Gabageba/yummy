import { Avatar as AntdAvatar } from 'antd';
import type { IUserProfile } from '@api/usersApi';
import UserIcon from '@icons/UserIcon';
import './index.scss';
import { token } from '@theme/token';

interface AvatarProps {
  user?: IUserProfile | null;
  size?: number;
}

function Avatar({ user, size }: AvatarProps) {
  const displayName = user?.username ?? user?.email?.slice(0, 2) ?? '';

  return (
    <AntdAvatar
      icon={!displayName ? <UserIcon /> : undefined}
      size={size ?? token.sizeAvatar}
      className="avatar"
    >
      {displayName ? displayName[0].toUpperCase() : null}
    </AntdAvatar>
  );
}

export default Avatar;
