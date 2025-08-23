import InputFormItem from '@components/formItems/InputFormItem';
import { Button, Flex, Form } from 'antd';

function LoginPage() {
  return (
    <Flex>
      LoginPage
      <Form>
        <InputFormItem name="login" />
        <InputFormItem name="password" inputProps={{ type: 'password' }} />
      </Form>
      <Button>login</Button>
    </Flex>
  );
}

export default LoginPage;
