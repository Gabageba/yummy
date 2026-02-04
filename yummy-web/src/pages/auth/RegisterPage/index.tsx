import { Button, Divider, Flex, Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import '../index.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import useValidation from '@hooks/useValidation';
import useApiValidationErrors from '@hooks/useApiValidationErrors';
import InputFormItem from '@components/core/formItems/InputFormItem';
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

  const [register] = useRegisterMutation();

  const onRegisterClick = () =>
    form.validateFields().then(async (values) => {
      await register(values).unwrap().then(onAuthSuccess).catch(handleValidationErrors);
    });

  return (
    <div className="auth-page">
      <Flex vertical align="center" className="auth-page__content" gap={24}>
        <Typography.Title level={2} className="auth-page__title">
          {t('registerToSystem')}
        </Typography.Title>
        <Form form={form}>
          <InputFormItem
            name="username"
            inputProps={{ placeholder: t('username') }}
            rules={[required]}
          />
          <InputFormItem
            name="email"
            inputProps={{ placeholder: t('email') }}
            rules={[required, isEmail]}
          />
          <InputFormItem
            name="password"
            inputProps={{ type: 'password', placeholder: t('password') }}
            rules={[required, minLength(6)]}
          />
        </Form>
        <Flex vertical gap={8} className="auth-page__buttons" align="center">
          <Button type="primary" block onClick={onRegisterClick}>
            {t('register')}
          </Button>
          <Divider />
          <Button block onClick={() => navigate(RoutePath.LOGIN)}>
            {t('enter')}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default RegisterPage;
