import { Button, Checkbox, Col, Divider, Flex, Form, Row, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import '../index.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import useApiValidationErrors from '@hooks/useApiValidationErrors';
import useValidation from '@hooks/useValidation';
import InputFormItem from '@components/core/formItems/InputFormItem';
import LogoIcon from '@components/icons/LogoIcon';
import { AppleOutlined, GoogleOutlined, UserOutlined } from '@ant-design/icons';
import PasswordFormItem from '@components/core/formItems/PasswordFormItem';
import VkIcon from '@components/icons/VkIcon';
import { useLoginMutation } from '../authApi';
import type { ILoginResponse } from '../models';
import useAuth from '../../../hooks/useAuth';

function LoginPage() {
  const { t } = useTranslation();
  const { token } = theme.useToken();
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
      <div className="auth-page__container">
        <Flex vertical align="center" gap={24} className="auth-page__content">
          <LogoIcon className="auth-page__icon" />
          <Flex vertical align="center" gap={token.marginXS} className="auth-page__title">
            <Typography.Title level={2}>{t('welcomeBack')}</Typography.Title>
            <Typography.Text type="secondary">{t('signInToAccessAccount')}</Typography.Text>
          </Flex>

          <Form form={form} layout="vertical">
            <InputFormItem
              label={t('username')}
              name="username"
              inputProps={{
                prefix: <UserOutlined />,
              }}
              rules={[required]}
            />
            <PasswordFormItem rules={[required, minLength(6)]} />
            <Flex justify="space-between" className="auth-page__remember-me">
              <Checkbox>{t('rememberMe')}</Checkbox>
              <Typography.Link>{t('forgotPassword')}</Typography.Link>
            </Flex>

            <Button type="primary" block onClick={onLoginClick}>
              {t('signIn')}
            </Button>
          </Form>
          <Divider className="auth-page__divider">{t('orContinueWith')}</Divider>
          <Row className="auth-page__buttons" gutter={token.marginXS}>
            <Col span={8}>
              <Button block icon={<GoogleOutlined />} />
            </Col>
            <Col span={8}>
              <Button block icon={<VkIcon />} />
            </Col>
            <Col span={8}>
              <Button block icon={<AppleOutlined />} />
            </Col>
          </Row>
        </Flex>
        <div className="auth-page__footer">
          <Typography.Text>{t('noAccount')}</Typography.Text>{' '}
          <Typography.Link onClick={() => navigate(RoutePath.REGISTER)}>
            {t('signUp')}
          </Typography.Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
