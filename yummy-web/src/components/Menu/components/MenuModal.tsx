import useValidation from '@hooks/useValidation';
import { Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import InputFormItem from '@components/core/formItems/InputFormItem';
import TextAreaFormItem from '@components/core/formItems/TextAreaFormItem';
import { useCreateMenuMutation } from '../menuApi';
import type { IMenu } from '../models';

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function MenuModal({ open, onCancel }: IProps) {
  const { t } = useTranslation();
  const { required } = useValidation();
  const [form] = Form.useForm<IMenu>();

  const [create] = useCreateMenuMutation();

  const onCreate = () => {
    form.validateFields().then(create).then(onCancel);
  };

  return (
    <Modal
      open={open}
      title={t('createMenu')}
      onCancel={onCancel}
      onOk={onCreate}
      okText={t('create')}
      cancelText={t('cancel')}
    >
      <Form form={form} layout="vertical">
        <InputFormItem
          name="name"
          inputProps={{ placeholder: t('title') }}
          rules={[required]}
          label={t('title')}
        />
        <TextAreaFormItem name="description" label={t('description')} />
      </Form>
    </Modal>
  );
}

export default MenuModal;
