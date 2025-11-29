import type { FormItemProps, InputProps } from 'antd';
import { Form, Input } from 'antd';

interface Props extends Omit<FormItemProps, 'validateTrigger'> {
  inputProps?: InputProps;
}

function InputFormItem({ inputProps = {}, ...restProps }: Props) {
  return (
    <Form.Item {...restProps}>
      <Input {...inputProps} />
    </Form.Item>
  );
}

export default InputFormItem;
