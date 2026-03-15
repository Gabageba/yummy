import type { IUserProfile } from '@api/usersApi';
import { RoutePath } from '@routes/models';
import { Button, Col, Drawer, Flex, Layout, Row, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import toCapitalized from '@utils/toCapitalized';
import LogoutIcon from '@icons/LogoutIcon';
import SettingsIcon from '@icons/SettingsIcon';
import Avatar from '../components/Avatar';
import '../../index.scss';
import { getMobileMenuItems, getSelectedKey } from '../utils';

interface IProps {
  user?: IUserProfile;
  onLogout: () => void;
}

function MobileHeader({ user, onLogout }: IProps) {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = getMobileMenuItems(t);
  const selectedKey = getSelectedKey(location.pathname);

  return (
    <Layout.Header className="page-layout__header page-layout__header--mobile">
      <Row className="page-layout__header--mobile-menu" gutter={token.margin}>
        {menuItems.map(({ key, icon, label }) => (
          <Col
            key={key}
            span={24 / menuItems.length}
            className={`page-layout__header--mobile-menu-item ${key === selectedKey ? 'page-layout__header--mobile-menu-item-active' : ''}`}
          >
            <Flex
              key={key}
              onClick={() => navigate(key as string)}
              align="center"
              justify="center"
              vertical
            >
              {icon}
              <Typography.Text>{label}</Typography.Text>
            </Flex>
          </Col>
        ))}
      </Row>

      {/* <div className="page-layout__header--container">sdaf</div> */}
      <Drawer className="page-layout__header--drawer" size="80%">
        <Flex
          vertical
          justify="space-between"
          className="page-layout__header--drawer-content"
          gap={token.marginLG}
        >
          <Flex align="center" justify="space-between">
            <Flex className="page-layout__header--profile" align="center" gap={token.marginXS}>
              <Avatar user={user} size={48} />
              {user?.username && <Typography.Text>{toCapitalized(user.username)}</Typography.Text>}
            </Flex>
            <Button
              className="page-layout__header--settings"
              icon={<SettingsIcon />}
              variant="text"
              color="primary"
              onClick={() => navigate(RoutePath.SETTINGS)}
            />
          </Flex>
          <Button icon={<LogoutIcon />} color="danger" variant="filled" block onClick={onLogout}>
            {t('exit')}
          </Button>
        </Flex>
      </Drawer>
    </Layout.Header>
  );
}

export default MobileHeader;
