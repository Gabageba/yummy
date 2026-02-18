import { Grid, Layout } from 'antd';
import '../index.scss';

import { useGetProfileQuery } from '@api/usersApi';
import useAuth from '@hooks/useAuth';
import { useLogoutMutation } from '@pages/auth/authApi';
import DesktopHeaderContent from './DesktopHeaderContent';
import MobileHeaderContent from './MobileHeaderContent';

const Header = () => {
  const screens = Grid.useBreakpoint();
  const { data: user } = useGetProfileQuery();
  const { onLogoutSuccess } = useAuth();

  const [logout] = useLogoutMutation();

  const onLogout = () => {
    logout().unwrap().then(onLogoutSuccess);
  };

  return (
    <Layout.Header className="page-layout__header">
      {screens?.xs ? (
        <MobileHeaderContent user={user} onLogout={onLogout} />
      ) : (
        <DesktopHeaderContent user={user} onLogout={onLogout} />
      )}
    </Layout.Header>
  );
};

export default Header;
