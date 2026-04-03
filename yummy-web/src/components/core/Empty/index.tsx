import NotFoundIcon from '@icons/NotFoundIcon';
import './index.scss';
import type { ButtonProps } from 'antd';
import { Empty as AntdEmpty, Button, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { token } from '@theme/token';

interface IProps {
  description?: string;
  buttonProps?: ButtonProps;
}

function Empty({ description, buttonProps }: IProps) {
  const { t } = useTranslation();
  return (
    <AntdEmpty
      className="empty"
      styles={{ image: { height: 200 } }}
      image={<NotFoundIcon />}
      description={
        <Flex align="center" gap={token.marginXXS} justify="center">
          <Typography.Text type="secondary">{description ?? t('dataNotFound')}</Typography.Text>
          {buttonProps && <Button {...buttonProps} />}
        </Flex>
      }
    />
  );
}

export default Empty;
