import InputFormItem from '@components/formItems/InputFormItem';
import { Button, Divider, Flex, Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import '../index.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import useApiValidationErrors from '@hooks/useApiValidationErrors';
import useValidation from '@hooks/useValidation';
import { useLoginMutation } from '../authApi';
import type { ILoginResponse } from '../models';
import useAuth from '../../../hooks/useAuth';

function LoginPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm<ILoginResponse>();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { required, minLength } = useValidation();
  const { handleValidationErrors } = useApiValidationErrors(form);
  const { onAuthSuccess } = useAuth();

  const onLoginClick = () => {
    form
      .validateFields()
      .then((value) => login(value).unwrap().then(onAuthSuccess).catch(handleValidationErrors));
  };

  return (
    <div className="auth-page">
      <Flex vertical align="center" className="auth-page__content" gap={24}>
        <Typography.Title level={2} className="auth-page__title">
          {t('loginToSystem')}
        </Typography.Title>
        <Form form={form}>
          <InputFormItem
            name="username"
            inputProps={{ placeholder: t('username') }}
            rules={[required]}
          />
          <InputFormItem
            name="password"
            inputProps={{ type: 'password', placeholder: t('password') }}
            rules={[required, minLength(6)]}
          />
        </Form>
        <Flex vertical gap={8} className="auth-page__buttons" align="center">
          <Button type="primary" block onClick={onLoginClick}>
            {t('enter')}
          </Button>
          <Typography.Link>{t('forgotPassword')}</Typography.Link>
          <Divider />
          <Button block onClick={() => navigate(RoutePath.REGISTER)}>
            {t('register')}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default LoginPage;
