import InputFormItem from '@components/formItems/InputFormItem';
import { Button, Divider, Flex, Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import './index.scss';

function LoginPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <div className="login-page">
      <Flex vertical align="center" className="login-page__content" gap={24}>
        <Typography.Title level={2} className="login-page__title">
          {t('loginToSystem')}
        </Typography.Title>
        <Form form={form}>
          <InputFormItem name="login" inputProps={{ placeholder: t('login') }} />
          <InputFormItem
            name="password"
            inputProps={{ type: 'password', placeholder: t('password') }}
          />
        </Form>
        <Flex vertical gap={8} className="login-page__buttons" align="center">
          <Button type="primary" block>
            {t('enter')}
          </Button>
          <Typography.Link>{t('forgotPassword')}</Typography.Link>

          <Divider />
          <Button block>{t('register')}</Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default LoginPage;
