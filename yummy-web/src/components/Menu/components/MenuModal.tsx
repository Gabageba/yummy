import useValidation from '@hooks/useValidation';
import { Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import InputFormItem from '@components/core/formItems/InputFormItem';
import TextAreaFormItem from '@components/core/formItems/TextAreaFormItem';
import { useCreateMenuMutation, useUpdateMenuMutation } from '../menuApi';
import type { IMenu } from '../models';

interface IProps {
  initialValue?: IMenu;
  open: boolean;
  onCancel: () => void;
}

function MenuModal({ initialValue, open, onCancel }: IProps) {
  const { t } = useTranslation();
  const { required } = useValidation();
  const [form] = Form.useForm<IMenu>();

  const [create] = useCreateMenuMutation();
  const [update] = useUpdateMenuMutation();

  const onCreate = () => {
    form
      .validateFields()
      .then((menu) => (initialValue?.id ? update({ ...menu, id: initialValue.id }) : create(menu)))
      .then(onCancel);
  };

  return (
    <Modal
      open={open}
      title={t('createMenu')}
      onCancel={onCancel}
      onOk={onCreate}
      okText={initialValue?.id ? t('save') : t('create')}
      cancelText={t('cancel')}
    >
      <Form form={form} layout="vertical" initialValues={initialValue}>
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
