import PageLayout from '@components/core/PageLayout';
import { Button, Flex, Space, Typography } from 'antd';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import HomeIcon from '@icons/HomeIcon';
import useToken from '@hooks/useToken';

function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useToken();

  return (
    <PageLayout>
      <Flex className="not-found-page" vertical align="center" gap={token.margin}>
        <Flex vertical align="center" className="not-found-page__title">
          <Typography.Text className="not-found-page__404">404</Typography.Text>
          <Typography.Title level={1}>{t('pageNotFound')}</Typography.Title>
        </Flex>
        <Typography.Text type="secondary" className="not-found-page__description">
          {t('pageNotFoundDescription')}
        </Typography.Text>
        <Space>
          <Button type="primary" onClick={() => navigate(-1)} icon={<ArrowLeftIcon />}>
            {t('goBack')}
          </Button>
          <Button onClick={() => navigate(RoutePath.MAIN)} icon={<HomeIcon />}>
            {t('goToHome')}
          </Button>
        </Space>
      </Flex>
    </PageLayout>
  );
}

export default NotFoundPage;
