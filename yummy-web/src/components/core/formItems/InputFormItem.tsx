import type { FormItemProps, InputProps } from 'antd';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps extends Omit<FormItemProps, 'validateTrigger'> {
  inputProps?: Omit<InputProps, 'placeholder'>;
}

function InputFormItem({ inputProps = {}, ...restProps }: IProps) {
  const { t } = useTranslation();

  return (
    <Form.Item {...restProps}>
      <Input {...inputProps} placeholder={t('typeIn')} />
    </Form.Item>
  );
}

export default InputFormItem;
