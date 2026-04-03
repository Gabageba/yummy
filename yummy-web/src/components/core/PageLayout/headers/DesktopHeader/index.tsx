import { Layout, Space } from 'antd';
import { RoutePath } from '@routes/models';
import { useNavigate } from 'react-router-dom';
import LogoHorizontalIcon from '@icons/LogoHorizontalIcon';
import AvatarButton from '@components/avatar/AvatarButton';
import DesktopNavigationMenu from './DesktopNavigationMenu';
import '../../index.scss';
import ThemeButton from './ThemeButton';

function DesktopHeader() {
  const navigate = useNavigate();

  return (
    <Layout.Header className="page-layout__header">
      <div className="page-layout__header--container">
        <div className="page-layout__header--logo" onClick={() => navigate(RoutePath.MAIN)}>
          <LogoHorizontalIcon size={32} />
        </div>
        <DesktopNavigationMenu />
        <Space>
          <ThemeButton />
          <AvatarButton />
        </Space>
      </div>
    </Layout.Header>
  );
}

export default DesktopHeader;
