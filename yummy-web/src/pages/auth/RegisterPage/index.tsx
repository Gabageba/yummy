import { Button, Flex, Form, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import '../index.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import useValidation from '@hooks/useValidation';
import useApiValidationErrors from '@hooks/useApiValidationErrors';
import InputFormItem from '@components/core/fields/InputFormItem';
import LogoIcon from '@components/icons/LogoIcon';
import PasswordFormItem from '@components/core/fields/PasswordFormItem';
import { useRegisterMutation } from '../authApi';
import type { IRegisterResponse } from '../models';
import useAuth from '../../../hooks/useAuth';

function RegisterPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm<IRegisterResponse>();
  const navigate = useNavigate();
  const { required, isEmail, minLength } = useValidation();
  const { handleValidationErrors } = useApiValidationErrors(form);
  const { onAuthSuccess } = useAuth();
  const { token } = theme.useToken();

  const [register] = useRegisterMutation();

  const onRegisterClick = () =>
    form.validateFields().then(async (values) => {
      await register(values).unwrap().then(onAuthSuccess).catch(handleValidationErrors);
    });

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <Flex vertical align="center" className="auth-page__content" gap={24}>
          <LogoIcon className="auth-page__icon" size={64} />
          <Flex vertical align="center" gap={token.marginXS} className="auth-page__title">
            <Typography.Title level={2}>{t('createAccount')}</Typography.Title>
            <Typography.Text type="secondary">{t('createAccountToStart')}</Typography.Text>
          </Flex>

          <Form form={form} layout="vertical">
            <InputFormItem label={t('username')} name="username" rules={[required]} />
            <InputFormItem label={t('email')} name="email" rules={[required, isEmail]} />
            <PasswordFormItem rules={[required, minLength(6)]} />
            <Button type="primary" block onClick={onRegisterClick}>
              {t('register')}
            </Button>
          </Form>
        </Flex>
        <div className="auth-page__footer">
          <Typography.Text>{t('alreadyHaveAccount')}</Typography.Text>{' '}
          <Typography.Link onClick={() => navigate(RoutePath.LOGIN)}>{t('signIn')}</Typography.Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
