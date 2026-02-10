import { LogoutOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, theme, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { IUserProfile } from '@api/usersApi';
import toCapitalized from '@utils/toCapitalized';
import { RoutePath } from '@routes/models';
import { useNavigate } from 'react-router-dom';
import LogoLongIcon from '@components/icons/LogoLongIcon';
import NavigationMenu from './NavigationMenu';
import '../index.scss';
import Avatar from './Avatar';

interface MobileHeaderContentProps {
  user?: IUserProfile | null;
  onLogout: () => void;
}

function MobileHeaderContent({ user, onLogout }: MobileHeaderContentProps) {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="page-layout__header--mobile-container"
      >
        <LogoLongIcon />
        <Button
          icon={<MenuOutlined />}
          variant="text"
          color="primary"
          onClick={() => setIsMenuOpen(true)}
        />
      </Flex>
      <Drawer
        className="page-layout__header--mobile-drawer"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Flex
          vertical
          justify="space-between"
          className="page-layout__header--mobile-drawer-content"
          gap={token.marginLG}
        >
          <Flex align="center" justify="space-between">
            <Flex
              className="page-layout__header--mobile-profile"
              align="center"
              gap={token.marginXS}
            >
              <Avatar user={user} size={48} />
              {user?.username && <Typography.Text>{toCapitalized(user.username)}</Typography.Text>}
            </Flex>
            <Button
              className="page-layout__header--mobile-settings"
              icon={<SettingOutlined />}
              variant="text"
              color="primary"
              onClick={() => navigate(RoutePath.SETTINGS)}
            />
          </Flex>
          <NavigationMenu mode="vertical" />
          <Button
            icon={<LogoutOutlined />}
            color="danger"
            variant="filled"
            block
            onClick={onLogout}
          >
            {t('exit')}
          </Button>
        </Flex>
      </Drawer>
    </>
  );
}

export default MobileHeaderContent;
