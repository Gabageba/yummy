import { useGetProfileQuery } from '@api/usersApi';
import Avatar from '@components/avatar/Avatar';
import PageLayout from '@components/core/PageLayout';
import useLogout from '@hooks/useLogout';
import LogoutIcon from '@icons/LogoutIcon';
import SettingsIcon from '@icons/SettingsIcon';
import { RoutePath } from '@routes/models';
import toCapitalized from '@utils/toCapitalized';
import { Button, Flex, Grid, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './index.scss';

function MorePage() {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { onLogout } = useLogout();
  const screens = Grid.useBreakpoint();

  const { data: user } = useGetProfileQuery();

  if (screens.md) {
    navigate(RoutePath.NOT_FOUND);
  }

  return (
    <PageLayout>
      <Flex vertical justify="space-between" gap={token.marginLG} className="more-page__content">
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={token.marginXS}>
            <Avatar user={user} size={48} />
            {user?.username && <Typography.Text>{toCapitalized(user.username)}</Typography.Text>}
          </Flex>
          <Button
            icon={<SettingsIcon size={20} />}
            variant="text"
            color="primary"
            onClick={() => navigate(RoutePath.SETTINGS)}
          />
        </Flex>
        <Button icon={<LogoutIcon />} color="danger" variant="filled" block onClick={onLogout}>
          {t('exit')}
        </Button>
      </Flex>
    </PageLayout>
  );
}

export default MorePage;
