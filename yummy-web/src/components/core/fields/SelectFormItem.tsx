import type { FormItemProps, SelectProps } from 'antd';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps extends Omit<FormItemProps, 'validateTrigger'> {
  selectProps?: Omit<SelectProps, 'placeholder'>;
}

function SelectFormItem({ selectProps = {}, ...restProps }: IProps) {
  const { t } = useTranslation();

  return (
    <Form.Item {...restProps}>
      <Select {...selectProps} placeholder={t('select')} />
    </Form.Item>
  );
}

export default SelectFormItem;
