import LogoLongIcon from '@components/icons/LogoLongIcon';
import { RoutePath } from '@routes/models';
import { useNavigate } from 'react-router-dom';
import type { IUserProfile } from '@api/usersApi';
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
      <div className="page-layout__header--logo">
        <LogoLongIcon
          className="page-layout__header--logo-icon"
          onClick={() => navigate(RoutePath.MAIN)}
        />
      </div>

      <NavigationMenu mode="horizontal" />
      <AvatarButton user={user} onLogout={onLogout} />
    </div>
  );
}

export default DesktopHeaderContent;
