import PageLayout from '@components/core/PageLayout';
import { Button, Flex, Space, Typography } from 'antd';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons';

function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Flex className="not-found-page" vertical align="center" gap={16}>
        <Flex vertical align="center" className="not-found-page__title">
          <Typography.Text className="not-found-page__404">404</Typography.Text>
          <Typography.Title level={1}>{t('pageNotFound')}</Typography.Title>
        </Flex>
        <Typography.Text type="secondary" className="not-found-page__description">
          {t('pageNotFoundDescription')}
        </Typography.Text>
        <Space>
          <Button type="primary" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
            {t('goBack')}
          </Button>
          <Button onClick={() => navigate(RoutePath.MAIN)} icon={<HomeOutlined />}>
            {t('goToHome')}
          </Button>
        </Space>
      </Flex>
    </PageLayout>
  );
}

export default NotFoundPage;
