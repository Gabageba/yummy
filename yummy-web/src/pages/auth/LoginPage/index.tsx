import { Button, Checkbox, Col, Divider, Flex, Form, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import '../index.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import useApiValidationErrors from '@hooks/useApiValidationErrors';
import useValidation from '@hooks/useValidation';
import InputFormItem from '@components/core/fields/InputFormItem';
import { AppleOutlined, GoogleOutlined } from '@ant-design/icons';
import PasswordFormItem from '@components/core/fields/PasswordFormItem';
import VkIcon from '@icons/VkIcon';
import UserIcon from '@icons/UserIcon';
import LogoIcon from '@icons/LogoIcon';
import { token } from '@theme/token';
import { useLoginMutation } from '../authApi';
import type { ILoginResponse } from '../models';
import useAuth from '../../../hooks/useAuth';

function LoginPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm<ILoginResponse>();
  const navigate = useNavigate();
  const { required, minLength } = useValidation();
  const { handleValidationErrors } = useApiValidationErrors(form);
  const { onAuthSuccess } = useAuth();
  const isDevMode = import.meta.env.DEV;

  const [login, { isLoading: isLogging }] = useLoginMutation();

  const onLoginClick = () => {
    form
      .validateFields()
      .then((value) => login(value).unwrap().then(onAuthSuccess).catch(handleValidationErrors));
  };

  const loginAsAdmin = () => {
    login({ username: 'admin', password: '123456' }).unwrap().then(onAuthSuccess);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <Flex vertical align="center" gap={24} className="auth-page__content">
          <LogoIcon className="auth-page__icon" size={64} />
          <Flex vertical align="center" gap={token.marginXS} className="auth-page__title">
            <Typography.Title level={2}>{t('welcomeBack')}</Typography.Title>
            <Typography.Text type="secondary">{t('signInToAccessAccount')}</Typography.Text>
          </Flex>

          <Form form={form} layout="vertical">
            <InputFormItem label={t('username')} name="username" rules={[required]} />
            <PasswordFormItem rules={[required, minLength(6)]} />
            <Flex justify="space-between" className="auth-page__remember-me">
              <Checkbox>{t('rememberMe')}</Checkbox>
              <Typography.Link>{t('forgotPassword')}</Typography.Link>
            </Flex>

            <Button type="primary" block onClick={onLoginClick} loading={isLogging}>
              {t('signIn')}
            </Button>
          </Form>
          <Divider className="auth-page__divider">{t('orContinueWith')}</Divider>
          <Row className="auth-page__buttons" gutter={[token.marginXS, token.marginXS]}>
            <Col span={token.marginXS}>
              <Button block icon={<GoogleOutlined />} loading={isLogging} />
            </Col>
            <Col span={token.marginXS}>
              <Button block icon={<VkIcon />} loading={isLogging} />
            </Col>
            <Col span={token.marginXS}>
              <Button block icon={<AppleOutlined />} loading={isLogging} />
            </Col>
            {isDevMode && (
              <Col span={token.marginLG}>
                <Button block icon={<UserIcon />} onClick={loginAsAdmin} loading={isLogging} />
              </Col>
            )}
          </Row>
        </Flex>
        <div className="auth-page__footer">
          <Typography.Text>{t('noAccount')}</Typography.Text>{' '}
          <Typography.Link onClick={() => navigate(RoutePath.REGISTER)} disabled={isLogging}>
            {t('signUp')}
          </Typography.Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
