import NotFoundIcon from '@icons/NotFoundIcon';
import './index.scss';
import { Empty as AntdEmpty, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  description?: string;
}

function Empty({ description }: IProps) {
  const { t } = useTranslation();
  return (
    <AntdEmpty
      className="empty"
      styles={{ image: { height: 200 } }}
      image={<NotFoundIcon />}
      description={
        <Typography.Text type="secondary">{description ?? t('dataNotFound')}</Typography.Text>
      }
    />
  );
}

export default Empty;
