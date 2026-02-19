import './index.scss';
import { Empty as AntdEmpty } from 'antd';
import { useTranslation } from 'react-i18next';

function Empty() {
  const { t } = useTranslation();

  return <AntdEmpty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} description={t('dataNotFound')} />;
}

export default Empty;
