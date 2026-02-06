import { MehOutlined } from '@ant-design/icons';
import './index.scss';
import { Flex, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

function Empty() {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <Flex vertical align="center" className="empty" gap={token.marginXS}>
      <MehOutlined />
      <Typography.Text type="secondary">{t('dataNotFound')}</Typography.Text>
    </Flex>
  );
}

export default Empty;
