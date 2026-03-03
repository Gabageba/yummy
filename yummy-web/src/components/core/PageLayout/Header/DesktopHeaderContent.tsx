import { RoutePath } from '@routes/models';
import { useNavigate } from 'react-router-dom';
import type { IUserProfile } from '@api/usersApi';
import LogoHorizontalIcon from '@components/icons/LogoHorizontalIcon';
import NavigationMenu from './NavigationMenu';

import AvatarButton from './AvatarButton';
import '../index.scss';

interface DesktopHeaderContentProps {
  user?: IUserProfile | null;
  onLogout: () => void;
}

function DesktopHeaderContent({ user, onLogout }: DesktopHeaderContentProps) {
  const navigate = useNavigate();

  return (
    <div className="page-layout__header--container page-layout__header--desktop-container">
      <div className="page-layout__header--logo" onClick={() => navigate(RoutePath.MAIN)}>
        <LogoHorizontalIcon size={32} />
      </div>

      <NavigationMenu mode="horizontal" />
      <AvatarButton user={user} onLogout={onLogout} />
    </div>
  );
}

export default DesktopHeaderContent;
