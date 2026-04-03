import { Avatar as AntdAvatar } from 'antd';
import type { IUserProfile } from '@api/usersApi';
import UserIcon from '@icons/UserIcon';
import './index.scss';
import useToken from '@hooks/useToken';

interface AvatarProps {
  user?: IUserProfile | null;
  size?: number;
}

function Avatar({ user, size }: AvatarProps) {
  const token = useToken();

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
