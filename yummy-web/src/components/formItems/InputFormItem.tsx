import type { FormItemProps, InputProps } from 'antd';
import { Form, Input } from 'antd';

type Props = FormItemProps & {
  inputProps?: InputProps;
};

function InputFormItem({ inputProps = {}, ...restProps }: Props) {
  return (
    <Form.Item {...restProps}>
      <Input {...inputProps} />
    </Form.Item>
  );
}

export default InputFormItem;
