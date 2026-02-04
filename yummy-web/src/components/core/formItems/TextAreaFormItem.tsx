import type { FormItemProps } from 'antd';
import { Form, Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

interface Props extends Omit<FormItemProps, 'validateTrigger'> {
  textAreaProps?: TextAreaProps;
}

function TextAreaFormItem({ textAreaProps = {}, ...restProps }: Props) {
  return (
    <Form.Item {...restProps}>
      <Input.TextArea {...textAreaProps} />
    </Form.Item>
  );
}

export default TextAreaFormItem;
