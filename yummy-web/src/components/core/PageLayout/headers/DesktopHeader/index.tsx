import type { IUserProfile } from '@api/usersApi';
import { Layout } from 'antd';
import { RoutePath } from '@routes/models';
import { useNavigate } from 'react-router-dom';
import LogoHorizontalIcon from '@icons/LogoHorizontalIcon';
import AvatarButton from '../components/AvatarButton';
import DesktopNavigationMenu from './DesktopNavigationMenu';
import '../../index.scss';

interface IProps {
  user?: IUserProfile;
  onLogout: () => void;
}

function DesktopHeader({ user, onLogout }: IProps) {
  const navigate = useNavigate();

  return (
    <Layout.Header className="page-layout__header">
      <div className="page-layout__header--container">
        <div className="page-layout__header--logo" onClick={() => navigate(RoutePath.MAIN)}>
          <LogoHorizontalIcon size={32} />
        </div>
        <DesktopNavigationMenu />
        <AvatarButton user={user} onLogout={onLogout} />
      </div>
    </Layout.Header>
  );
}

export default DesktopHeader;
