import { LockOutlined } from '@ant-design/icons';
import type { FormItemProps, InputProps } from 'antd';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps extends Omit<FormItemProps, 'validateTrigger' | 'name' | 'label'> {
  inputProps?: Omit<InputProps, 'placeholder' | 'prefix'>;
}

function PasswordFormItem({ inputProps, ...restProps }: IProps) {
  const { t } = useTranslation();

  return (
    <Form.Item name="password" label={t('password')} {...restProps}>
      <Input.Password {...inputProps} placeholder={t('typeIn')} prefix={<LockOutlined />} />
    </Form.Item>
  );
}

export default PasswordFormItem;
